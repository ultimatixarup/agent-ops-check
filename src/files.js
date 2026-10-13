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
  const roots = [];
  function walk(p, root) {
    const rel = path.relative(root, p).split(path.sep).join("/") || path.basename(p);
    if (ig.some((re) => re.test(rel))) return;
    let st; try { st = fs.statSync(p); } catch (_) { return; }
    if (st.isDirectory()) {
      if (SKIP_DIRS.has(path.basename(p))) return;
      for (const e of fs.readdirSync(p).sort()) walk(path.join(p, e), root);
    } else if (st.isFile() && wanted(p) && /\.ipynb$/i.test(p)) {
      if (st.size > MAX_NOTEBOOK_BYTES) return;
      const nb = notebookText(fs.readFileSync(p, "utf8"));
      if (nb) out.push({ abs: p, rel, root, text: nb.text, notebook: nb.map });
    } else if (st.isFile() && wanted(p) && st.size <= MAX_BYTES) {
      out.push({ abs: p, rel, root, text: fs.readFileSync(p, "utf8") });
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
  for (const f of out) {
    const parts = f.rel.split("/");
    f.agent = parts.length > 1 && !APP_PART.test(parts[0]) ? parts[0] : path.basename(f.root);
    f.atRoot = parts.length === 1;
    const label = labels && labels[f.root];
    f.display = label ? label + "!/" + f.rel : path.relative(process.cwd(), f.abs).split(path.sep).join("/");
  }
  return out;
}

module.exports = { collect, globToRe, wanted, notebookText, notebookLoc, APP_PART, MAX_BYTES, MAX_NOTEBOOK_BYTES };
