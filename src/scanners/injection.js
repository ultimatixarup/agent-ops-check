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

// Context that turns a match into a DESCRIPTION of an attack (a guardrail, a detector prompt, a
// "never follow ... " rule) rather than an attack. Checked on the matched line and the 2 lines above.
const DEFENSIVE = /\b(detect(s|ed|ing)?|guardrail|jailbreak|classif(y|ier|ies)|attempts? to|tries to|trying to|is_safe|refuse|reject|flag (it|this|them)|block(ed)?|do not (follow|obey|comply)|don'?t (follow|obey|comply)|never (follow|obey|comply)|ignore any (request|instruction)s? (to|that)|if (the )?(user|message|input|document|email) (asks?|tries|says|contains))\b/i;
const CODE_EXT = /\.(py|ipynb|js|mjs|cjs|ts|tsx)$/i;
const IAC = /(^|\/)(cdk|infra|infrastructure|terraform|cloudformation|iac|stacks?|bicep|pulumi|helm)(\/|$)|\.(tf|bicep)$|(^|\/)(cdk\.json|template\.ya?ml|serverless\.ya?ml)$/i;
const IAC_TEXT = /from ["']aws-cdk-lib|require\(["']aws-cdk-lib|from aws_cdk|import \* as cdk|AWSTemplateFormatVersion|@pulumi\//;
// A Python/TS parameter or annotation such as `system: str`, `system: str | None = None`.
const TYPED_PARAM = /^\s*(system|assistant)\s*:\s*(str|string|Optional|list|List|dict|Dict|Any|bool|int|None|Union|[A-Z][\w.]*(\[|\s*[|=,)]|$))/;
// A docstring "Args:" block entry such as `    system: System prompt for the agent`.
function inArgsDoc(L, line) {
  if (!/^\s+(system|assistant)\s*:\s*\w/.test(L[line - 1] || "")) return false;
  for (let i = line - 2; i >= 0 && i >= line - 25; i--) {
    if (/^\s*(Args|Arguments|Parameters|Params|Attributes|Keyword Args)\s*:\s*$/.test(L[i])) return true;
    if (/"""|'''/.test(L[i])) return false;
  }
  return false;
}
function fencedLines(text) {
  const set = new Set(); let inF = false;
  text.split(/\r?\n/).forEach((ln, i) => { if (/^\s*(```|~~~)/.test(ln)) { inF = !inF; set.add(i + 1); } else if (inF) set.add(i + 1); });
  return set;
}
// True when the matched text sits inside a `backtick span` on its line (odd number of backticks before it).
function inInlineCode(ln, ev) {
  const i = ev ? ln.indexOf(ev) : -1;
  return i >= 0 && (ln.slice(0, i).match(/`/g) || []).length % 2 === 1;
}
function adjust(F, text, file) {
  const L = text.split(/\r?\n/);
  const isMd = /\.(md|markdown|mdx|rst|txt)$/i.test(file);
  const fenced = isMd ? fencedLines(text) : null;
  const iac = IAC.test(file) || IAC_TEXT.test(text);
  const out = [];
  for (const f of F) {
    // Patterns anchored on "(^|\n)" start their match on the previous line; point at the real line.
    const lead = /^\n+/.exec(f.evidence || ""); if (lead) { f.line += lead[0].length; f.evidence = f.evidence.slice(lead[0].length); }
    const ln = L[f.line - 1] || "";
    const ctx = L.slice(Math.max(0, f.line - 3), f.line).join("\n");
    if (f.rule === "injection.fake_system" && CODE_EXT.test(file) && (TYPED_PARAM.test(ln) || inArgsDoc(L, f.line))) continue;
    if (f.rule === "injection.templated_url" && iac) { f.severity = "low"; f.message += " (infrastructure-as-code template: lowered)"; }
    else if (/^injection\.(llmail_tool_call_syntax|tool_call_injection)$/.test(f.rule) && fenced && (fenced.has(f.line) || inInlineCode(ln, f.evidence))) { f.severity = "low"; f.message += " (inside a docs code block: lowered)"; }
    else if (/^injection\.(ignore_previous|role_reassign|fake_system|hidden_task|secrecy|exfil_instruction|tool_call_injection)$/.test(f.rule) && DEFENSIVE.test(ctx)) { f.severity = "low"; f.message += " (defensive context, e.g. a guardrail describing attacks: lowered)"; }
    out.push(f);
  }
  return out;
}

function scanText(text, file, R) {
  return adjust(scanRaw(text, file, R), text, String(file || ""));
}
function scanRaw(text, file, R) {
  const F = [];
  const add = (rule, severity, line, message, evidence) => F.push({ rule: "injection." + rule, severity, file, line, message, evidence: String(evidence || "").replace(/[\u200B-\u200D\u2060\uFEFF\u202A-\u202E\u2066-\u2069]/g, "�").slice(0, 160) });
  for (const grp of ["instructions", "exfil_links", "hidden_text", "llmail"]) for (const r of R[grp] || [])
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
    const inner = scanRaw(dec, file, { instructions: R.instructions, exfil_links: R.exfil_links, hidden_text: [] });
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
module.exports = { scan, scanText, DEFENSIVE };
