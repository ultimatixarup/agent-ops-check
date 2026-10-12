"use strict";
const fs = require("fs");
const path = require("path");

const EXT = new Set([".html", ".htm", ".xml", ".svg", ".js", ".mjs", ".cjs", ".ts", ".tsx", ".py", ".json", ".jsonl", ".yaml", ".yml", ".toml", ".md", ".txt", ".csv", ".env", ".example"]);
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "build", ".venv", "venv", "__pycache__", "report", ".next"]);
const MAX_BYTES = 2 * 1024 * 1024;

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
  for (const f of out) {
    const parts = f.rel.split("/");
    f.agent = parts.length > 1 ? parts[0] : path.basename(f.root);
    const label = labels && labels[f.root];
    f.display = label ? label + "!/" + f.rel : path.relative(process.cwd(), f.abs).split(path.sep).join("/");
  }
  return out;
}

module.exports = { collect, globToRe };
