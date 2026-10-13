"use strict";
const fs = require("fs");
const path = require("path");

const EXT = new Set([".html", ".htm", ".xml", ".svg", ".js", ".mjs", ".cjs", ".ts", ".tsx", ".py", ".json", ".jsonl", ".yaml", ".yml", ".toml", ".md", ".txt", ".csv", ".env", ".example", ".ipynb"]);
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "build", ".venv", "venv", "__pycache__", "report", ".next"]);
const MAX_BYTES = 2 * 1024 * 1024;
// Notebooks often carry large outputs, which we drop; the raw .ipynb may be up to 8 MB, and the
// extracted cell text is still capped at MAX_BYTES.
const MAX_NOTEBOOK_BYTES = 8 * 1024 * 1024;

// Turns a Jupyter notebook into scan text: code and markdown cells only (outputs are ignored),
// separated by a blank line. cells[] maps each text line back to "cell N, line M" (1-based).
function notebookText(raw) {
  let nb; try { nb = JSON.parse(raw); } catch (_) { return null; }
  const cells = Array.isArray(nb && nb.cells) ? nb.cells : null;
  if (!cells) return null;
  const out = []; const map = [];
  cells.forEach((c, ci) => {
    if (!c || (c.cell_type !== "code" && c.cell_type !== "markdown")) return;
    const src = Array.isArray(c.source) ? c.source.join("") : String(c.source || "");
    src.split(/\r?\n/).forEach((ln, li) => { out.push(ln); map.push({ cell: ci + 1, line: li + 1, type: c.cell_type }); });
    out.push(""); map.push(null);
  });
  const text = out.join("\n");
  if (text.length > MAX_BYTES) return null;
  return { text, map };
}
function notebookLoc(map, line) { const m = map && map[line - 1]; return m ? "cell " + m.cell + ", line " + m.line : null; }

const APP_PART = /^\.(github|devcontainer|vscode|agents?|claude|cursor)$|^((python|node|py|js|ts)[-_])?(backend|frontend|server|client|ui|web|webapp|app|api|src|lib|docs?|tests?|scripts|infra|cdk|deploy(ment)?|assets|static|public|config|shared|common)$/i;

// Extra files read ONLY by the daemon/sidecar and skill-provenance checks (src/scanners/persistence.js):
// install/startup scripts and unit files (text), and compiled Python (.pyc, path only: never decoded or run).
// They are kept out of the main file list so the other checks see exactly what they saw before.
const SCRIPT_EXT = new Set([".sh", ".bash", ".zsh", ".fish", ".ps1", ".psm1", ".bat", ".cmd", ".plist", ".service", ".timer", ".socket", ".desktop"]);
const SCRIPT_NAMES = /^(dockerfile|containerfile|makefile|justfile|crontab|procfile)$|^(install|setup|bootstrap|postinstall|entrypoint)(\.[\w-]+)?$/;
const MAX_SCRIPT_BYTES = 512 * 1024;
function extraKind(file) {
  const base = path.basename(file).toLowerCase(), ext = path.extname(base);
  if (ext === ".pyc" || ext === ".pyo") return "pyc";
  if (wanted(file)) return null;
  if (/^(uv\.lock|poetry\.lock|pipfile\.lock|yarn\.lock|bun\.lockb?|cargo\.lock|go\.sum)$|^requirements[\w.-]*\.lock$/.test(base)) return "lock";
  if (SCRIPT_EXT.has(ext) || SCRIPT_NAMES.test(base)) return "script";
  return null;
}
// Same filter the browser uses for zips and picked folders: main scan files plus the extra files above.
function keep(file) { return wanted(file) || !!extraKind(file); }

function globToRe(g) {
  const s = g.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*\/?/g, "\u0000").replace(/\*/g, "[^/]*").replace(/\?/g, "[^/]").replace(/\u0000/g, ".*");
  return new RegExp("(^|/)" + s + "($|/)");
}

function wanted(file) {
  const base = path.basename(file).toLowerCase();
  if (base === ".env") return false; // never read real .env files; .env.example only
  if (base.startsWith(".env.") && !/example|sample|template/.test(base)) return false;
  return EXT.has(path.extname(base)) || /\.env\.(example|sample|template)$/.test(base);
}

function collect(inputs, ignore, labels) {
  const ig = (ignore || []).map(globToRe);
  const out = [];
  const extras = [];
  const roots = [];
  function walk(p, root) {
    const rel = path.relative(root, p).split(path.sep).join("/") || path.basename(p);
    if (ig.some((re) => re.test(rel))) return;
    let st; try { st = fs.statSync(p); } catch (_) { return; }
    if (st.isDirectory()) {
      // __pycache__ is skipped by the main scan, but its file NAMES matter to the skill-provenance check.
      if (path.basename(p) === "__pycache__") { for (const e of fs.readdirSync(p).sort()) { const a = path.join(p, e); const r2 = path.relative(root, a).split(path.sep).join("/"); if (!ig.some((re) => re.test(r2)) && extraKind(a) === "pyc") extras.push({ abs: a, rel: r2, root, kind: "pyc", text: "" }); } return; }
      if (SKIP_DIRS.has(path.basename(p))) return;
      for (const e of fs.readdirSync(p).sort()) walk(path.join(p, e), root);
    } else if (st.isFile() && wanted(p) && /\.ipynb$/i.test(p)) {
      if (st.size > MAX_NOTEBOOK_BYTES) return;
      const nb = notebookText(fs.readFileSync(p, "utf8"));
      if (nb) out.push({ abs: p, rel, root, text: nb.text, notebook: nb.map });
    } else if (st.isFile() && wanted(p) && st.size <= MAX_BYTES) {
      out.push({ abs: p, rel, root, text: fs.readFileSync(p, "utf8") });
    } else if (st.isFile() && extraKind(p) === "pyc") {
      extras.push({ abs: p, rel, root, kind: "pyc", text: "" });
    } else if (st.isFile() && extraKind(p) === "lock") {
      extras.push({ abs: p, rel, root, kind: "lock", text: "" }); // name only: proves a lockfile exists
    } else if (st.isFile() && extraKind(p) === "script" && st.size <= MAX_SCRIPT_BYTES) {
      extras.push({ abs: p, rel, root, kind: "script", text: fs.readFileSync(p, "utf8") });
    }
  }
  for (const inp of inputs) {
    const abs = path.resolve(inp);
    if (!fs.existsSync(abs)) throw new Error("Not found: " + inp);
    const st = fs.statSync(abs);
    const root = st.isDirectory() ? abs : path.dirname(abs);
    roots.push(root);
    walk(abs, root);
  }
  // Agent = first path segment under the input dir (a subfolder per agent), else the root name.
  // Folders that are parts of ONE app (backend/frontend/ui/server/docs/.github ...) belong to the root
  // app, so a single full-stack sample is not split into several "agents".
  for (const f of out.concat(extras)) {
    const parts = f.rel.split("/");
    f.agent = parts.length > 1 && !APP_PART.test(parts[0]) ? parts[0] : path.basename(f.root);
    f.atRoot = parts.length === 1;
    const label = labels && labels[f.root];
    f.display = label ? label + "!/" + f.rel : path.relative(process.cwd(), f.abs).split(path.sep).join("/");
  }
  // Not enumerable: other checks iterate the array and never see these.
  Object.defineProperty(out, "extras", { value: extras, enumerable: false });
  return out;
}

module.exports = { collect, globToRe, wanted, keep, extraKind, notebookText, notebookLoc, APP_PART, MAX_BYTES, MAX_NOTEBOOK_BYTES };
