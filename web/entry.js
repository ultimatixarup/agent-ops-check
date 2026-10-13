"use strict";
// Browser entry for agent-ops-check. Same scanners, rules and reports as the CLI, over an in-memory fs.
const fs = require("fs");
const ASSETS = require("aoc-assets");
for (const [p, t] of Object.entries(ASSETS)) fs.__put(p, t);
const { analyze, rulesInfo } = require("../src/index");
const evals = require("../src/evals");
const html = require("../src/report/html");
const md = require("../src/report/md");
const sarif = require("../src/report/sarif");
const steUi = require("../src/ste/ui");
const steCore = require("../src/ste/core");
const { loadRules } = require("../src/util");
const pkg = require("../package.json");

// User input lives under /in (the fake cwd), so report paths read like the CLI's: "bad-agent/x.js".
const used = new Set();
function uniq(name) { name = String(name || "input").replace(/[\\/]/g, "_"); let n = name, i = 2; while (used.has(n)) n = name + "-" + i++; used.add(n); return n; }
function mount(name, entries) {
  const root = "/in/" + uniq(name);
  for (const e of entries) fs.__put(root + "/" + String(e.path).replace(/^\/+/, ""), e.text);
  return root;
}
// A zip (or picked folder) with one top-level folder: scan that folder so each sub-folder is still one agent (as src/unzip.js).
function stripTop(entries) {
  const tops = new Set(entries.map((e) => e.path.split("/")[0]));
  if (tops.size !== 1 || !entries.every((e) => e.path.includes("/"))) return { top: null, entries };
  const t = [...tops][0] + "/";
  return { top: t.slice(0, -1), entries: entries.map((e) => ({ path: e.path.slice(t.length), text: e.text })) };
}
function put(e) { const n = uniq(e.path.split("/").pop()); fs.__put("/in/" + n, e.text); return n; }
function unmountAll() { fs.__clear("/in"); used.clear(); }

/**
 * scan({ inputs: [{name, kind: "folder"|"zip"|"file", entries:[{path,text}]}], docs, steTexts, steDict, steCompare, options })
 */
function scan(req) {
  unmountAll();
  const o = Object.assign({ docs: [], steInputs: [], labels: {} }, req.options || {});
  delete o.llm; // never in the browser
  const inputs = [];
  for (const inp of req.inputs || []) {
    if (inp.kind === "file") { const root = mount(inp.name || "files", inp.entries); for (const e of inp.entries) inputs.push(root + "/" + e.path); continue; }
    const z = inp.kind === "zip" ? stripTop(inp.entries) : null;
    const root = z ? mount(z.top || inp.name.replace(/\.zip$/i, ""), z.entries) : mount(inp.name, inp.entries);
    if (inp.kind === "zip") o.labels[root] = inp.name; // shows as name.zip!/path, like the CLI
    inputs.push(root);
  }
  for (const d of req.docs || []) o.docs.push(put(d));
  for (const t of req.steTexts || []) o.steInputs.push({ name: t.name, text: t.text });
  if (req.steDict) o.steDict = put(req.steDict);
  if (req.steCompare) o.steCompare = req.steCompare.map(put);
  o.inputsLabel = (req.inputs || []).map((i) => i.name);
  return analyze(inputs, o);
}
// Read a .zip with JSZip (vendored, passed in) using the same safety rules as src/unzip.js.
const { wanted, MAX_BYTES, MAX_NOTEBOOK_BYTES } = require("../src/files");
const maxBytes = (p) => (/\.ipynb$/i.test(p) ? MAX_NOTEBOOK_BYTES : MAX_BYTES); // same limits as the CLI
async function readZip(JSZip, data) {
  const z = await JSZip.loadAsync(data);
  const all = Object.values(z.files);
  if (all.length > 5000) throw new Error("Zip has too many entries (" + all.length + ")");
  const out = []; let total = 0;
  for (const f of all) {
    const name = f.name.replace(/\\/g, "/");
    const norm = require("path").posix.normalize(name);
    if (norm.startsWith("/") || norm.startsWith("../") || norm === ".." || /^[A-Za-z]:/.test(norm)) throw new Error("Unsafe path in zip: " + name);
    if (f.dir || /(^|\/)__MACOSX\//.test(norm)) continue;
    if (f.unixPermissions && ((f.unixPermissions & 0o170000) === 0o120000)) continue; // symlink: skip
    const size = f._data && f._data.uncompressedSize || 0;
    total += size; if (total > 200 * 1024 * 1024) throw new Error("Zip expands to more than 200 MB");
    if (!wanted(norm) || size > maxBytes(norm)) continue; // never decoded; the CLI would skip it too
    out.push({ path: norm, text: await f.async("string") });
  }
  return out;
}
function jsonl(a) { return a.map((x) => JSON.stringify(x)).join("\n") + (a.length ? "\n" : ""); }
function outputs(r) {
  const out = { "index.html": html(r), "report.json": JSON.stringify(r, null, 2), "report.md": md(r), "report.sarif": sarif(r) };
  if (r.evals) { out["evals/functional.jsonl"] = jsonl(r.evals.functional); out["evals/security.jsonl"] = jsonl(r.evals.security); out["evals/README.md"] = evals.toMarkdown(r.evals); }
  if (r.groups.some((g) => g.id === "ste")) out["ste.html"] = steUi();
  const lb = r.groups.find((g) => g.id === "labs");
  if (lb && lb.redteam) out["redteam-pack.txt"] = lb.redteam;
  return out;
}
const ste = { check: (text, name, dict) => steCore.check(text, loadRules("ste"), { file: name || "(pasted)", dict: dict || null }), compare: (a, b) => steCore.compare(a, b) };
module.exports = { scan, outputs, readZip, wanted, MAX_BYTES, MAX_NOTEBOOK_BYTES, maxBytes, ste, rulesInfo, version: pkg.version };
