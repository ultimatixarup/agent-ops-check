"use strict";
// Runs the existing Arup Banerjee Labs browser tools (Agent Health Checker, Cloud Bill Smell Detector,
// Observability Gap Finder) unchanged, inside a Node sandbox with stub browser globals and NO network.
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const plus = require("./health-plus");

function load(file) {
  const noop = () => {};
  const el = new Proxy({}, { get: (t, k) => (k === "addEventListener" ? noop : k === "value" ? "" : undefined) });
  const document = { readyState: "loading", addEventListener: noop, getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], createElement: () => el, body: el };
  const storage = { getItem: () => null, setItem: noop, removeItem: noop };
  const window = { document, localStorage: storage, location: { href: "file:///", origin: "null" }, addEventListener: noop, LABS_PRIVATE_REPORT_LINE: "_Private report generated locally by agent-ops-check._" };
  const blocked = () => { throw new Error("network disabled in agent-ops-check"); };
  const ctx = { window, document, localStorage: storage, navigator: { clipboard: {} }, console, setTimeout, clearTimeout, fetch: blocked, XMLHttpRequest: blocked, URL, Blob: function () {} };
  ctx.self = window; Object.assign(window, { fetch: blocked });
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(__dirname, "vendor", file), "utf8"), ctx, { filename: file });
  return window;
}

let W;
function tools() {
  if (!W) W = { hc: load("agent-health-checker.js"), bill: load("cloud-bill-smell.js"), obs: load("observability-gap-finder.js") };
  return { health: W.hc.__ABL_ANALYZE__, healthMd: W.hc.__ABL_REPORT_MD__, bill: W.bill.__ABL_BILL__, obs: W.obs.__ABL_OBS__, redteam: W.hc.__ABL_REDTEAM__ };
}

const SEV = { high: "high", medium: "medium", low: "low" };
function healthTarget(f) {
  if (/\.jsonl$/i.test(f.rel)) return "transcript";
  if (/transcript|chat[-_]?log|conversations?/i.test(f.rel)) return "transcript";
  if (/\.(json|ya?ml)$/i.test(f.rel) && /tools|system_prompt|instructions|prompt|llm|model/i.test(f.text) && !/mcpServers/.test(f.text) && !/^\s*\{\s*"name"\s*:\s*"[^"]+"\s*,\s*"version"/.test(f.text)) return "config";
  if (/\.(md|txt)$/i.test(f.rel) && /prompt|instruction|system/i.test(f.rel)) return "config";
  return null;
}

function scan(files) {
  const T = tools();
  const findings = []; const runs = [];
  const kbFile = files.find((f) => /(^|\/)(kb|faq|price[-_]?list|knowledge)[^/]*\.(json|md|txt|csv)$/i.test(f.rel));
  for (const f of files) {
    const mode = healthTarget(f);
    if (!mode) continue;
    const r = T.health(f.text, { mode, kb: mode === "transcript" && kbFile && kbFile.agent === f.agent ? kbFile.text : "" });
    if (!r || r.error) continue;
    findings.push(...plus.check(f, mode));
    runs.push({ tool: "Agent Health Checker", file: f.display, mode: r.mode, score: r.score, verdict: r.headline, subscores: r.subscores });
    // Engineering-hygiene checks only make sense on JSON/YAML configs; on code the governance scanner covers them.
    const engOK = /\.(json|ya?ml)$/i.test(f.rel);
    for (const c of r.results) if ((c.status === "fail" || c.status === "partial") && (c.safety || engOK))
      findings.push({ rule: "health." + c.id, severity: SEV[c.severity] || (c.status === "fail" ? "medium" : "low"), file: f.display, line: 0, message: c.title + ": " + (c.message || ""), evidence: Array.isArray(c.evidence) ? c.evidence.slice(0, 2).join(" | ").slice(0, 160) : (c.evidence ? String(c.evidence).slice(0, 160) : undefined) });
  }
  for (const f of files) {
    if (!/\.(csv|json)$/i.test(f.rel) || !/(cost|amount|unblended|charge|spend)/i.test(f.text.split(/\r?\n/)[0] + (f.rel.match(/bill|cost|invoice|usage/i) ? " cost" : ""))) continue;
    if (/\.json$/i.test(f.rel) && !/bill|cost|invoice|usage/i.test(f.rel)) continue;
    const r = T.bill(f.text);
    if (!r || r.error) continue;
    runs.push({ tool: "Cloud Bill Smell Detector", file: f.display, score: r.score, verdict: r.headline });
    for (const s of (r.smells || [])) findings.push({ rule: "bill." + (s.id || "smell"), severity: s.severity === "high" ? "high" : "medium", file: f.display, line: 0, message: (s.title || s.label || "Bill smell") + (s.message ? ": " + s.message : ""), evidence: s.evidence });
  }
  const obsText = files.filter((f) => /\.(js|mjs|cjs|ts|py|ya?ml|toml|json|md)$/i.test(f.rel)).map((f) => f.text).join("\n");
  if (obsText.trim()) {
    const r = T.obs(obsText, {});
    runs.push({ tool: "Observability Gap Finder", file: "(whole input)", score: r.score, verdict: r.headline });
    for (const x of r.findings) if (x.status === "fail") findings.push({ rule: "observability." + x.id, severity: "low", file: "(whole input)", line: 0, message: x.message });
  }
  return { id: "labs", title: "Agent Health Checker + Labs tools", findings, runs, redteam: T.redteam ? T.redteam() : "" };
}
module.exports = { scan, tools };
