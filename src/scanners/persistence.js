"use strict";
// Two static check families (rules/persistence.yaml):
//  - daemon.*  Background daemon / sidecar: configs, install scripts and code that register persistent or
//              self-updating background processes, or install unpinned "latest" builds.
//  - skills.*  Skill artifact provenance: compiled Python in skill folders, skills that write files later
//              sessions load, session hooks, unpinned skill/MCP sources, skill code with no hashes or lockfile.
// STATIC ONLY. It reads files in the scanned folder. It cannot see running processes, installed binaries, what a
// CLI does at runtime, what a .pyc contains (it is never decoded or run), or files written outside the folder.
const path = require("path");
const { loadRules, re, lines } = require("../util");

const DOC = /\.(md|markdown|mdx|txt|rst|adoc)$/i;
const NB_MD = (f, line) => f.notebook && f.notebook[line - 1] && f.notebook[line - 1].type === "markdown";
const isComment = (ln) => /^\s*(#(?!!)|\/\/|;|REM\s|::)/i.test(ln);

function textFiles(files) { return (files || []).concat((files && files.extras || []).filter((e) => e.kind === "script")); }
function display(f) { return f.display || f.rel; }

function scanDaemon(files, R) {
  const findings = [];
  for (const f of textFiles(files)) {
    const L = lines(f.text), doc = DOC.test(f.rel);
    const seen = new Set();
    L.forEach((ln, i) => {
      if (ln.length > 2000) return; // minified/generated line
      if (!doc && isComment(ln)) return;
      for (const r of R.daemon) {
        const m = ln.match(re(r.pattern));
        if (!m || (r.exclude && re(r.exclude).test(ln))) continue;
        const key = r.id + ":" + (i + 1); if (seen.has(key)) continue; seen.add(key);
        const inDoc = doc || NB_MD(f, i + 1);
        findings.push({ rule: "daemon." + r.id, severity: inDoc ? "low" : r.severity, file: display(f), line: i + 1, family: r.family, source: r.source,
          message: r.message + (inDoc ? " (documentation: lowered)" : "") + " " + R.verify_hint, evidence: ln.trim().slice(0, 140) });
      }
    });
  }
  return findings;
}

// Skill roots: folders that contain a SKILL.md, or a plugin manifest (plugin.json / .claude-plugin/plugin.json).
function skillRoots(all) {
  const roots = new Set();
  for (const f of all) {
    const b = path.posix.basename(f.rel);
    // A real skill definition: SKILL.md with YAML front matter that names the skill (not a "skill.md" tips doc).
    if (/^skill\.md$/i.test(b) && /^\uFEFF?---\s*\n[\s\S]{0,2000}?^name\s*:/m.test(f.text || "")) roots.add(path.posix.dirname(f.rel));
    if (b === "plugin.json") { const d = path.posix.dirname(f.rel); roots.add(path.posix.basename(d) === ".claude-plugin" ? path.posix.dirname(d) : d); }
  }
  return [...roots].map((r) => (r === "." ? "" : r));
}
const under = (rel, root) => root === "" || rel === root || rel.startsWith(root + "/");

function inScope(f, S, roots) {
  return re(S.scope_path).test(f.rel) || re(S.mcp_config).test(f.rel) || roots.some((r) => under(f.rel, r) && f.root);
}

function pkgOf(args) {
  // First non-flag argument after npx/uvx/bunx/dlx is the package.
  for (const a of args) { if (typeof a !== "string") continue; if (/^-/.test(a)) continue; return a; }
  return null;
}
function mcpServers(text) {
  let j; try { j = JSON.parse(text); } catch (_) { return null; }
  const out = [];
  const visit = (o) => {
    if (!o || typeof o !== "object") return;
    for (const k of ["mcpServers", "servers", "mcp_servers"]) if (o[k] && typeof o[k] === "object") for (const [name, s] of Object.entries(o[k])) if (s && typeof s === "object") out.push({ name, s });
    for (const v of Object.values(o)) if (v && typeof v === "object") visit(v);
  };
  visit(j);
  return out;
}
function lineOfStr(L, needle) { const i = L.findIndex((l) => l.includes(needle)); return i < 0 ? 1 : i + 1; }

function scanSkills(files, R) {
  const S = R.skills, findings = [];
  const extras = (files && files.extras) || [];
  const all = (files || []).concat(extras);
  const roots = skillRoots(all);
  const add = (o) => findings.push(Object.assign({ family: "skill artifact provenance" }, o));

  // 1. Compiled Python: __pycache__/.pyc present, and .pyc with no matching .py source.
  const pyc = extras.filter((e) => e.kind === "pyc");
  const pySet = new Set(all.filter((f) => /\.py$/i.test(f.rel)).map((f) => f.rel));
  const byDir = {};
  for (const p of pyc) (byDir[path.posix.dirname(p.rel)] = byDir[path.posix.dirname(p.rel)] || []).push(p);
  for (const [dir, list] of Object.entries(byDir)) {
    const scoped = inScope(list[0], S, roots);
    add({ rule: "skills.committed_pycache", severity: scoped ? "medium" : "low", file: display(list[0]), line: 0, source: "pycache_trap",
      message: list.length + " compiled Python file(s) in " + dir + "/" + (scoped ? " inside a skill/plugin folder" : "") + ". Python can run a .pyc instead of the .py you reviewed, and source-reading scanners (this one included) don't check what it does. Delete it and add __pycache__/ and *.pyc to .gitignore. Static check: it may also be local build output; check git ls-files.",
      evidence: list.slice(0, 3).map((p) => path.posix.basename(p.rel)).join(", ") + (list.length > 3 ? ", …" : "") });
    for (const p of list) {
      const base = path.posix.basename(p.rel).replace(/\.(cpython|pypy|py)[\w-]*(\.opt-\d)?\.py[co]$/i, "").replace(/\.py[co]$/i, "");
      const inCache = path.posix.basename(dir) === "__pycache__";
      const srcDir = inCache ? path.posix.dirname(dir) : dir;
      const src = (srcDir === "." ? "" : srcDir + "/") + base + ".py";
      if (pySet.has(src)) continue;
      add({ rule: "skills.orphan_pyc", severity: scoped ? "high" : "medium", file: display(p), line: 0, source: "pycache_trap",
        message: "Compiled Python with no matching source file (" + src + " not found). Nobody can review what it runs. Remove it, or ship the source and rebuild from it.", evidence: path.posix.basename(p.rel) });
    }
  }

  // 2-4. Text checks in skill scope.
  for (const f of textFiles(files)) {
    if (!inScope(f, S, roots)) continue;
    const L = lines(f.text), isJson = /\.json$/i.test(f.rel);
    const doc = DOC.test(f.rel) && !/(^|\/)SKILL\.md$/i.test(f.rel); // SKILL.md is the skill itself, not documentation
    const lower = (o) => (doc && o.severity !== "low" ? Object.assign(o, { severity: "low", message: o.message + " (documentation: lowered)" }) : o);
    L.forEach((ln, i) => {
      if (ln.length > 2000 || (!doc && isComment(ln))) return;
      // Writes to files that later sessions load (memory, CLAUDE.md/AGENTS.md, hooks, shell startup).
      if (!isJson && re(S.persistent_targets).test(ln) && re(S.write_verbs).test(ln))
        add(lower({ rule: "skills.persistent_write", severity: "medium", file: display(f), line: i + 1, source: "skillrelaybench",
          message: "Skill writes to a file that later sessions load automatically (" + ln.match(re(S.persistent_targets))[0].trim() + "). Text it leaves there can act as instructions in a new session. Keep skill output out of memory/instruction/hook files, or review each write.", evidence: ln.trim().slice(0, 140) }));
      if (isJson && re(S.hook_events).test(ln)) {
        const ev = ln.match(re(S.hook_events))[1];
        const startup = re("^(" + S.hook_events_startup + ")$").test(ev);
        add({ rule: "skills.session_hook", severity: startup ? "medium" : "low", file: display(f), line: i + 1, source: "skillrelaybench",
          message: "Hook " + ev + " runs a command automatically" + (startup ? " at the start of a session or prompt" : "") + ". Verify what it runs and that it does not write files later sessions load.", evidence: ln.trim().slice(0, 140) });
      }
      for (const m of ln.match(re(S.git_source, "gi")) || []) {
        if (re(S.pinned_git).test(m)) continue;
        add(lower({ rule: "skills.unpinned_source", severity: "medium", file: display(f), line: i + 1, source: "supply_chain",
          message: "Skill or plugin source points at a git repo with no commit pin, so a later install can fetch different code than you reviewed. Pin a commit SHA.", evidence: m.slice(0, 140) }));
      }
      if (!isJson) {
        const m = ln.match(/\b(npx|bunx|uvx|pnpm\s+dlx|pipx\s+run)\s+((?:-{1,2}[\w-]+\s+)*)([@\w][\w@.\/:=+-]*)/);
        if (m && !/^-/.test(m[3]) && !re(S.pinned_pkg).test(m[3]) && !/\.(js|py|sh)$/.test(m[3]))
          add(lower({ rule: "skills.unpinned_source", severity: /@latest$/.test(m[3]) ? "medium" : "low", file: display(f), line: i + 1, source: "supply_chain",
            message: "Skill/MCP command runs package " + m[3] + " without a version pin, so each run can fetch new code. Pin an exact version.", evidence: ln.trim().slice(0, 140) }));
      }
    });
    // MCP server definitions (JSON): command + args.
    if (isJson) for (const { name, s } of mcpServers(f.text) || []) {
      const cmd = String(s.command || ""), args = Array.isArray(s.args) ? s.args : [];
      if (/^(npx|bunx|uvx|pipx)$/.test(path.posix.basename(cmd)) || (/pnpm$/.test(cmd) && args[0] === "dlx")) {
        const pkg = pkgOf(cmd.endsWith("pnpm") ? args.slice(1) : args);
        if (pkg && !re(S.pinned_pkg).test(pkg) && !/\.(js|py|sh)$/.test(pkg) && !re(S.git_source).test(pkg)) // git sources: reported by the line check above
          add({ rule: "skills.unpinned_source", severity: /@latest$/.test(pkg) ? "medium" : "low", file: display(f), line: lineOfStr(L, JSON.stringify(pkg)), source: "supply_chain",
            message: "MCP server '" + name + "' runs " + cmd + " " + pkg + " with no version pin, so each start can fetch new code. Pin an exact version (pkg@1.2.3).", evidence: (cmd + " " + args.join(" ")).slice(0, 140) });
      }
      if (/docker$/.test(cmd)) {
        const img = args.find((a, k) => k > 0 && typeof a === "string" && !/^-/.test(a) && /[/:]|^[\w.-]+$/.test(a) && args[k - 1] !== "-e" && args[k - 1] !== "--env" && args[k - 1] !== "-v" && args[k - 1] !== "--name" && a !== "run");
        if (img && !/@sha256:[0-9a-f]{64}/.test(img))
          add({ rule: "skills.unpinned_source", severity: "low", file: display(f), line: lineOfStr(L, JSON.stringify(img)), source: "supply_chain",
            message: "MCP server '" + name + "' runs Docker image " + img + " with no @sha256 digest. Tags can move; pin the digest.", evidence: (cmd + " " + args.join(" ")).slice(0, 140) });
      }
    }
  }

  // 5. Skill folders that ship code with no lockfile and no hashes anywhere in the folder.
  for (const r of roots) {
    const inRoot = all.filter((f) => under(f.rel, r) && f.rel !== r);
    const codeFiles = inRoot.filter((f) => /\.(py|js|mjs|cjs|ts|sh|bash|ps1)$/i.test(f.rel) || f.kind === "pyc");
    if (!codeFiles.length) continue;
    if (inRoot.some((f) => re(S.lockfiles).test(f.rel)) || inRoot.some((f) => f.text && re(S.hash_markers).test(f.text))) continue;
    const anchor = inRoot.find((f) => /(^|\/)(SKILL\.md|plugin\.json)$/i.test(f.rel)) || inRoot[0];
    add({ rule: "skills.no_hashes", severity: "low", file: display(anchor), line: 0, source: "supply_chain",
      message: "Skill/plugin folder " + (r || ".") + "/ ships " + codeFiles.length + " code file(s) but no lockfile or hashes (sha256/integrity), so you can't check that what you install matches what was reviewed.", evidence: codeFiles.slice(0, 3).map((f) => path.posix.basename(f.rel)).join(", ") });
  }
  return findings;
}

const LIMITS = "Static check of files in the scanned folder only. It cannot see running processes, installed binaries, what a CLI or skill does at runtime, files written outside this folder, or what a .pyc contains (never decoded or run). A clean result does not mean nothing persists or nothing was swapped. Verify on your install.";

function scan(files, opts) {
  const R = loadRules("persistence", opts && opts.rulesDir);
  return [
    { id: "daemon", title: "Background daemons + self-update", findings: scanDaemon(files, R),
      note: "Looks for launchd/systemd/cron/scheduled-task registration, auto-update flags, daemon modes, \"latest\" installs and curl|sh installers. Prompted by a single, unreproduced report about a coding-agent CLI (HN, Oct 12, 2026; Groundy audit guide); this tool does not confirm that report. " + LIMITS },
    { id: "skills", title: "Skill artifact provenance", findings: scanSkills(files, R),
      note: "Looks at skill/plugin folders (SKILL.md, .claude/, .codex/, .gemini/, plugin and MCP configs) for compiled Python, writes to files later sessions load, session hooks, unpinned sources and missing hashes. Background research (their findings, not ours): SkillRelayBench (arXiv 2610.13227) saw 46.7-77.4% attack success through files left for later sessions; PyCache Trap (arXiv 2610.10612) saw 94-100% success against 7 skill scanners with swapped .pyc files. " + LIMITS }
  ];
}
module.exports = { scan, LIMITS };
