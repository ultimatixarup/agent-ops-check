"use strict";
// Simplified Technical English (STE) style scanner. Inspired by ASD-STE100 writing rules.
// NOT a certified ASD-STE100 checker; no specification text or dictionary is bundled.
const fs = require("fs");
const { loadRules } = require("../util");
const core = require("../ste/core");

const PROMPT_KEYS = /^(system_prompt|system|prompt|instructions?|description|content|template)$/i;
function promptStrings(obj, out) {
  if (Array.isArray(obj)) obj.forEach((x) => promptStrings(x, out));
  else if (obj && typeof obj === "object") for (const [k, v] of Object.entries(obj)) { if (typeof v === "string" && PROMPT_KEYS.test(k) && v.split(/\s+/).length >= 6) out.push(v); else promptStrings(v, out); }
  return out;
}
// Which scanned files are prose for STE: .md/.txt docs and prompts, plus prompt strings inside JSON/YAML configs.
// By default only prompt/instruction files are checked (STE is about text the agent follows), not
// every README or lesson. --ste-all restores the old "all .md/.txt" behaviour.
const PROMPT_FILE = /(^|\/|[-_.])(prompts?|instructions?|system|persona|agents?|claude|copilot-instructions|rules|policy|playbook|sop|runbook|guidelines?)([-_.]|\/|$)|\.prompt(\.md)?$/i;
function proseOf(f, all) {
  if (/\.(md|txt)$/i.test(f.rel)) return all || PROMPT_FILE.test(f.rel) ? f.text : null;
  if (/\.(json|ya?ml)$/i.test(f.rel) && /prompt|instruction|agent|system/i.test(f.rel + f.text.slice(0, 2000))) {
    try {
      const obj = /\.json$/i.test(f.rel) ? JSON.parse(f.text) : require("js-yaml").load(f.text);
      const s = promptStrings(obj, []);
      return s.length ? s.join("\n") : null;
    } catch (_) { return null; }
  }
  return null;
}

function loadDict(p) {
  if (!p) return null;
  return fs.readFileSync(p, "utf8").split(/[\s,]+/).map((w) => w.replace(/[^A-Za-z'-]/g, "")).filter(Boolean);
}

function scan(files, opts) {
  const o = opts || {};
  const R = loadRules("ste", o.rulesDir);
  const dict = o.steDict ? loadDict(o.steDict) : null;
  const findings = []; const docs = [];
  const run = (text, file) => { const r = core.check(text, R, { file, dict }); docs.push({ file, sentences: r.sentences, findings: r.findings.length }); findings.push(...r.findings); };
  for (const f of files || []) { const t = proseOf(f, o.steAll); if (t) run(t, f.display); }
  for (const x of o.steInputs || []) run(x.text, x.name);
  let compare = null;
  if (o.steCompare) {
    const [a, b] = o.steCompare;
    const res = core.compare(fs.readFileSync(a, "utf8"), fs.readFileSync(b, "utf8"));
    compare = Object.assign({ original: a, rewrite: b }, res);
    for (const m of res.missing) findings.push({ rule: "ste.info_loss." + m.kind.replace(/\W/g, "_"), severity: m.severity, file: b, line: 0, message: "Missing from the STE version: " + m.kind + " \"" + m.value + "\"" + (m.kind === "constraint" ? " (original has " + m.count + ", rewrite has " + m.found + ")" : "") + ".", evidence: m.value });
  }
  return { id: "ste", title: "Simplified Technical English (STE)", findings, docs, compare, dictionary: dict ? o.steDict + " (" + dict.length + " words)" : null,
    note: "Style checks inspired by ASD-STE100 writing rules. Not a certified ASD-STE100 checker; no specification text or dictionary is included." };
}
module.exports = { scan, proseOf, loadDict, PROMPT_FILE };
