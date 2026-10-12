"use strict";
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

function loadRules(name, dir) {
  const d = dir || path.join(__dirname, "..", "rules");
  return yaml.load(fs.readFileSync(path.join(d, name + ".yaml"), "utf8"));
}
const reCache = new Map();
function re(src, flags) {
  const k = src + "/" + (flags || "i");
  if (!reCache.has(k)) reCache.set(k, new RegExp(src, flags || "i"));
  return reCache.get(k);
}
function lineOf(text, idx) { let n = 1; for (let i = 0; i < idx && i < text.length; i++) if (text.charCodeAt(i) === 10) n++; return n; }
function allMatches(text, src) {
  const r = re(src, "gi"); const out = []; let m;
  r.lastIndex = 0;
  while ((m = r.exec(text))) { out.push({ match: m[0], index: m.index, line: lineOf(text, m.index) }); if (m[0] === "") r.lastIndex++; if (out.length > 200) break; }
  return out;
}
function mask(s) { s = String(s); return s.length <= 8 ? "****" : s.slice(0, 4) + "…" + s.slice(-2) + " (masked)"; }
function lines(text) { return text.split(/\r?\n/); }
// Strip comment lines so "# TODO: add approval" never counts as a safeguard.
function code(text) { return lines(text).map((l) => (/^\s*(#|\/\/)/.test(l) ? "" : l)).join("\n"); }
function finding(o) { return Object.assign({ severity: "medium" }, o); }
module.exports = { loadRules, re, allMatches, lineOf, mask, lines, code, finding };
