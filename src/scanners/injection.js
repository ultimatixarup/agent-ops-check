"use strict";
// ADSF: all-document prompt-injection scan over every file the user points at (code, prompts, docs, knowledge
// files, transcripts). Offline regex + Unicode checks. It flags suspicious content; it cannot prove a file is safe.
const fs = require("fs");
const path = require("path");
const { loadRules, allMatches, lineOf } = require("../util");

const INVISIBLE = [
  { id: "zero_width", re: /[\u200B-\u200D\u2060\uFEFF\u180E]/g, name: "zero-width characters" },
  { id: "bidi_control", re: /[\u202A-\u202E\u2066-\u2069]/g, name: "bidirectional override characters" },
  { id: "unicode_tags", re: /[\u{E0000}-\u{E007F}]/gu, name: "Unicode tag characters (invisible ASCII smuggling)" },
  { id: "private_use", re: /[\uE000-\uF8FF]/g, name: "private-use characters" }
];
const TAG_DECODE = (s) => [...s].map((c) => { const cp = c.codePointAt(0); return cp >= 0xE0020 && cp <= 0xE007E ? String.fromCharCode(cp - 0xE0000) : ""; }).join("");

function decodeB64(s) {
  try { const t = Buffer.from(s, "base64").toString("utf8"); return /^[\x09\x0A\x0D\x20-\x7E]{12,}$/.test(t) ? t : null; } catch (_) { return null; }
}

function scanText(text, file, R) {
  const F = [];
  const add = (rule, severity, line, message, evidence) => F.push({ rule: "injection." + rule, severity, file, line, message, evidence: String(evidence || "").replace(/[\u200B-\u200D\u2060\uFEFF\u202A-\u202E\u2066-\u2069]/g, "�").slice(0, 160) });
  for (const grp of ["instructions", "exfil_links", "hidden_text"]) for (const r of R[grp] || [])
    for (const m of allMatches(text, r.pattern)) add(r.id, r.severity, m.line, r.message, m.match);
  for (const iv of INVISIBLE) {
    const ms = [...text.matchAll(iv.re)];
    if (!ms.length) continue;
    // A lone BOM at the very start of a file is normal.
    if (iv.id === "zero_width" && ms.length === 1 && ms[0].index === 0 && ms[0][0] === "\uFEFF") continue;
    const hidden = iv.id === "unicode_tags" ? TAG_DECODE(ms.map((m) => m[0]).join("")) : "";
    add(iv.id, iv.id === "private_use" ? "low" : "high", lineOf(text, ms[0].index), ms.length + " " + iv.name + (hidden ? ". Decoded hidden text: \"" + hidden.slice(0, 80) + "\"" : "") + ".", hidden || ("U+" + ms[0][0].codePointAt(0).toString(16).toUpperCase()));
  }
  for (const m of allMatches(text, "[A-Za-z0-9+/]{40,}={0,2}")) {
    const dec = decodeB64(m.match);
    if (!dec) continue;
    const inner = scanText(dec, file, { instructions: R.instructions, exfil_links: R.exfil_links, hidden_text: [] });
    if (inner.length || /\b(ignore|instruction|system|assistant|send|password|token)\b/i.test(dec))
      add("base64_instruction", "high", m.line, "Base64 blob decodes to text with instructions: \"" + dec.slice(0, 80) + "\"", m.match.slice(0, 40) + "…");
  }
  return F;
}

const DOC_EXT = /\.(md|markdown|txt|html?|xml|json|jsonl|ya?ml|toml|csv|js|mjs|cjs|ts|tsx|py|rst|adoc|ini|cfg|prompt|eml|svg)$/i;
function readDocs(paths) {
  const out = [];
  const walk = (p) => {
    const st = fs.statSync(p);
    if (st.isDirectory()) { for (const e of fs.readdirSync(p).sort()) if (!["node_modules", ".git"].includes(e)) walk(path.join(p, e)); }
    else if ((DOC_EXT.test(p) || !path.extname(p)) && st.size <= 5 * 1024 * 1024) out.push({ display: path.relative(process.cwd(), p) || p, text: fs.readFileSync(p, "utf8") });
  };
  for (const p of paths || []) walk(p);
  return out;
}

function scan(files, opts) {
  const o = opts || {};
  const R = loadRules("injection", o.rulesDir);
  const docs = (files || []).map((f) => ({ display: f.display, text: f.text })).concat(readDocs(o.docs));
  const findings = [];
  for (const d of docs) findings.push(...scanText(d.text, d.display, R));
  return { id: "injection", title: "Prompt-injection scan (ADSF)", findings, docsScanned: docs.length,
    note: "Regex and Unicode checks over every file. It flags suspicious content; a clean result does not prove a file is safe." };
}
module.exports = { scan, scanText };
