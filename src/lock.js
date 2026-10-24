"use strict";
// --lock / --verify-lock: SHA-256 hashes of execution-config files (rules/execconfig.yaml lock_files).
// Fully offline: reads files in the scanned folder and writes/reads one JSON lockfile there.
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const { loadRules, re } = require("./util");

const LOCKFILE = ".agent-ops-lock.json";
// Windows and some file APIs drop trailing dots/spaces from names, so ".mcp.json." can open as ".mcp.json".
const normName = (rel) => rel.split("/").map((p) => (p === "." || p === ".." ? p : p.replace(/[. ]+$/, ""))).join("/");

function inventory(root, rulesDir, ignore) {
  const ig = (ignore || []).map(require("./files").globToRe);
  const R = loadRules("execconfig", rulesDir), want = re(R.lock_files), skip = re(R.lock_skip);
  const files = {}, lookalikes = [];
  const walk = (dir) => {
    let ents; try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch (_) { return; }
    for (const e of ents.sort((a, b) => a.name.localeCompare(b.name))) {
      const abs = path.join(dir, e.name), rel = path.relative(root, abs).split(path.sep).join("/");
      if (ig.some((x) => x.test(rel))) continue; // same --ignore globs as the scan
      if (e.isSymbolicLink()) continue;
      if (e.isDirectory()) {
        if (/^(node_modules|\.venv|venv|dist|build|__pycache__)$/.test(e.name)) continue;
        if (e.name === ".git") { walk(path.join(abs, "hooks")); continue; } // only git hooks inside .git
        walk(abs); continue;
      }
      if (!e.isFile() || rel === LOCKFILE) continue;
      const n = normName(rel);
      if (skip.test(n) || !want.test(n)) continue;
      if (n !== rel) lookalikes.push({ rel, as: n });
      const st = fs.statSync(abs);
      files[rel] = { sha256: crypto.createHash("sha256").update(fs.readFileSync(abs)).digest("hex"), bytes: st.size };
    }
  };
  walk(root);
  return { files, lookalikes };
}

function write(root, rulesDir, ignore) {
  const inv = inventory(root, rulesDir, ignore);
  const rv = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "rules", "VERSION.json"), "utf8"));
  const doc = { tool: "agent-ops-check", lockVersion: 1, rules: rv.version, algorithm: "sha256", createdAt: new Date().toISOString(),
    note: "Hashes of files an agent harness, IDE, CI, git or the shell reads or runs later. Re-run agent-ops-check on this folder to see changes; run --lock again after you review and approve them.",
    files: inv.files };
  fs.writeFileSync(path.join(root, LOCKFILE), JSON.stringify(doc, null, 2) + "\n");
  return { path: path.join(root, LOCKFILE), count: Object.keys(inv.files).length, lookalikes: inv.lookalikes };
}

function load(root) {
  const p = path.join(root, LOCKFILE);
  if (!fs.existsSync(p)) return null;
  const j = JSON.parse(fs.readFileSync(p, "utf8"));
  if (!j || typeof j.files !== "object") throw new Error(p + " is not an agent-ops-check lockfile");
  return j;
}

// Findings for one scanned folder. `display` turns a relative path into the path shown in reports.
function verify(root, lock, display, rulesDir, ignore) {
  const inv = inventory(root, rulesDir, ignore), out = [];
  const shown = (rel) => (display ? display(rel) : rel);
  for (const l of inv.lookalikes)
    out.push({ rule: "execconfig.lookalike_name", severity: "high", file: shown(l.rel), line: 0, family: "lookalike file names", source: "ms_cve_2026_103572",
      message: "File name ends in a dot or space, so some tools open it as " + l.as + " while exact-name checks miss it. Rename or delete it and check who created it.", evidence: l.rel });
  if (!lock) return out;
  const old = lock.files || {};
  for (const [rel, v] of Object.entries(inv.files)) {
    if (!old[rel]) out.push({ rule: "execconfig.lock_added", severity: "medium", file: shown(rel), line: 0, family: "execution-config lock", source: "arxiv_2610_15137",
      message: "Execution-config file is not in " + LOCKFILE + ". Review it, then run --lock again to approve it.", evidence: "sha256 " + v.sha256.slice(0, 12) });
    else if (old[rel].sha256 !== v.sha256) out.push({ rule: "execconfig.lock_changed", severity: "high", file: shown(rel), line: 0, family: "execution-config lock", source: "arxiv_2610_15137",
      message: "Execution-config file changed since " + LOCKFILE + " was written (" + (lock.createdAt || "unknown date") + "). Review the diff before the next agent run; run --lock again to approve it.", evidence: "sha256 " + old[rel].sha256.slice(0, 12) + " → " + v.sha256.slice(0, 12) });
  }
  for (const rel of Object.keys(old)) if (!inv.files[rel])
    out.push({ rule: "execconfig.lock_removed", severity: "medium", file: shown(rel), line: 0, family: "execution-config lock", source: "arxiv_2610_15137",
      message: "File listed in " + LOCKFILE + " is gone. If it held a safety setting (an approval, a deny-list), check why it was removed.", evidence: "sha256 " + old[rel].sha256.slice(0, 12) });
  return out;
}
module.exports = { inventory, write, load, verify, LOCKFILE, normName };
