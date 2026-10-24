"use strict";
// execconfig.*: agent code and settings that let a run change files a LATER run reads or executes
// (MCP configs, IDE settings and tasks, CI workflows, git hooks, shell startup files, agent instruction files).
// STATIC ONLY. It reads files in the scanned folder. It cannot see what an agent writes at runtime.
const { loadRules, re, lines } = require("../util");

const DOC = /\.(md|markdown|mdx|txt|rst|adoc)$/i;
const TEST = /(^|\/)(tests?|__tests__|spec|fixtures?)\/|(^|\/)(test_[^/]*|[^/]*_test\.py|[^/]*\.(test|spec)\.[jt]sx?)$/i;
const isComment = (ln) => /^\s*(#(?!!)|\/\/|\*|\/\*)/.test(ln);
const NB_MD = (f, line) => f.notebook && f.notebook[line - 1] && f.notebook[line - 1].type === "markdown";
const LIMITS = "Static check of files in the scanned folder only. It cannot see what an agent writes at runtime, files outside this folder, or settings stored in your home directory. A clean result does not mean your agent can't change its own config.";

function lowerFor(f, line) {
  if (DOC.test(f.rel) || NB_MD(f, line)) return "documentation";
  if (TEST.test(f.rel)) return "test file";
  return null;
}

function scan(files, opts) {
  const R = loadRules("execconfig", opts && opts.rulesDir);
  const findings = [];
  const add = (f, line, o) => {
    const why = lowerFor(f, line);
    if (why && o.severity !== "low") { o.severity = "low"; o.message += " (" + why + ": lowered)"; }
    findings.push(Object.assign({ file: f.display || f.rel, line }, o));
  };
  const EXEC = re(R.exec_targets), INSTR = re(R.instruction_targets), WRITE = re(R.write_verbs);
  for (const f of files || []) {
    const L = lines(f.text || ""), doc = DOC.test(f.rel);
    // 1-2. Writes to execution-config / instruction files (same line, or a variable assigned the path then written).
    const vars = []; // {name, target, kind, line}
    L.forEach((ln, i) => {
      if (ln.length > 2000 || (!doc && isComment(ln))) return;
      const ex = ln.match(EXEC), ins = !ex && ln.match(INSTR);
      const hit = ex || ins;
      if (hit && !doc) {
        const v = ln.match(/^\s*(?:const|let|var|final)?\s*([A-Za-z_]\w*)\s*(?::\s*[\w\[\]]+\s*)?=(?!=)/);
        if (v && !WRITE.test(ln)) vars.push({ name: v[1], target: hit[0], kind: ex ? "exec" : "instr", line: i + 1 });
      }
      let target = hit ? hit[0] : null, kind = ex ? "exec" : "instr";
      if (!hit && WRITE.test(ln)) {
        const v = vars.find((x) => i + 1 - x.line <= 25 && re("\\b" + x.name + "\\b").test(ln));
        if (v) { target = v.target; kind = v.kind; }
      }
      if (!target || !WRITE.test(ln)) return;
      if (kind === "exec")
        add(f, i + 1, { rule: "execconfig.exec_target_write", severity: "high", family: "writes to execution config", source: "ms_cve_2026_103572",
          message: "Code writes to " + target.replace(/^[^\w.]/, "") + ", a file that an IDE, agent harness, CI, git or the shell reads or runs later. If an agent can reach this write, it can change what runs next time without a new approval. Remove the write, or require a person to approve it, and hash the file with --lock.", evidence: ln.trim().slice(0, 140) });
      else
        add(f, i + 1, { rule: "execconfig.instruction_write", severity: "medium", family: "writes to agent instructions", source: "arxiv_2610_15137",
          message: "Code writes to " + target + ", an instruction/prompt file that later agent sessions load. Text written here acts as instructions next time. Keep agent output out of instruction files, or review each change; hash them with --lock.", evidence: ln.trim().slice(0, 140) });
    });
    // 3. Write tools with no path limit. File level: a write-tool definition, a write call, and no path guard anywhere in the file.
    if (!doc && (WRITE.test(f.text || "") || /\.write\s*\(/.test(f.text || "")) && !re(R.path_guards).test(f.text || "")) {
      const NAME = re(R.write_tool_names);
      const i = L.findIndex((ln, k) => {
        if (ln.length > 2000 || isComment(ln)) return false;
        const nm = ln.match(NAME); if (!nm) return false;
        const py = /^\s*(async\s+)?def\s+\w+\s*\(/.test(ln) && L.slice(Math.max(0, k - 4), k).some((x) => /^\s*@(\w+\.)*(tool|function_tool)\b/.test(x));
        return py || (re("[\"'`]" + nm[0] + "[\"'`]").test(ln) && re(R.tool_markers).test(ln));
      });
      if (i >= 0) add(f, i + 1, { rule: "execconfig.unrestricted_write_tool", severity: "medium", family: "write tools with no path limit", source: "ms_cve_2026_103572",
        message: "Write tool " + L[i].match(NAME)[0] + " writes to a path it is given, and this file has no allowlist or base-folder check. It can overwrite MCP configs, IDE settings, hooks or instruction files. Resolve the path, require it to be inside one work folder, and refuse execution-config names.", evidence: L[i].trim().slice(0, 140) });
    }
    // 4. Filesystem MCP servers with a home- or root-wide scope.
    if (/\.json$/i.test(f.rel) && /server-filesystem/.test(f.text || "")) L.forEach((ln, i) => {
      if (/^\s*"(\/|~|~\/|\$HOME|\$\{HOME\}|C:\\\\|\$\{userHome\}|\.\.)\/?"\s*,?\s*$/.test(ln) && L.slice(Math.max(0, i - 6), i).some((x) => /server-filesystem/.test(x)))
        add(f, i + 1, { rule: "execconfig.broad_fs_server", severity: "medium", family: "write tools with no path limit", source: "ms_cve_2026_103572",
          message: "Filesystem MCP server is given your home folder, the drive root or a parent folder. The agent can then write shell startup files, IDE settings and MCP configs outside the project. Give it only the project folder.", evidence: ln.trim().slice(0, 140) });
    });
    // 5. Settings that run tools/servers/tasks without asking.
    for (const r of R.rules) L.forEach((ln, i) => {
      if (ln.length > 2000 || (!doc && isComment(ln))) return;
      if (re(r.pattern).test(ln)) add(f, i + 1, { rule: "execconfig." + r.id, severity: r.severity, family: r.family, source: r.source, message: r.message, evidence: ln.trim().slice(0, 140) });
    });
  }
  return { id: "execconfig", title: "Execution-config writes", findings,
    note: "Looks for code that writes files a later run reads or executes (MCP configs, IDE settings and tasks, CI workflows, git hooks, shell startup files, agent instruction files), write tools with no path limit, and settings that auto-run tools. Background (their findings, not ours): Microsoft CVE-2026-103572 (Embrace The Red, Oct 13, 2026); arXiv 2610.15137, where 296 of 542 commits that changed a file the run reads left the approved file untouched. On the CLI, --lock records SHA-256 hashes of these files and later scans report changes. " + LIMITS };
}
module.exports = { scan, LIMITS };
