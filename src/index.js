"use strict";
const path = require("path");
const { collect } = require("./files");
const crossover = require("./scanners/crossover");
const actions = require("./scanners/actions");
const governance = require("./scanners/governance");
const labs = require("./labs");
const ste = require("./scanners/ste");
const injection = require("./scanners/injection");
const evals = require("./evals");
const standards = require("./standards");

const W = { high: 10, medium: 4, low: 1, info: 0 };
function groupScore(findings) { return Math.max(0, 100 - findings.reduce((s, f) => s + (W[f.severity] ?? 1), 0)); }

// Local-only freshness hint. No network check: updates come from git pull / re-running npx.
function rulesInfo(now) {
  const v = JSON.parse(require("fs").readFileSync(path.join(__dirname, "..", "rules", "VERSION.json"), "utf8"));
  const days = Math.floor(((now || Date.now()) - Date.parse(v.date + "T00:00:00Z")) / 86400000);
  return { version: v.version, date: v.date, ageDays: days, hint: days > 30 ? "Rules are " + days + " days old. Run git pull (or re-run npx from GitHub) to get new checks." : "Rules are " + days + " day(s) old." };
}

function analyze(inputs, opts) {
  const o = Object.assign({}, opts || {});
  // .zip inputs are extracted locally to a temp folder, scanned, then deleted.
  const zips = [];
  inputs = (inputs || []).map((p) => {
    if (!/\.zip$/i.test(p)) return p;
    const z = require("./unzip").extract(p);
    zips.push(z);
    o.labels = Object.assign({}, o.labels, { [z.root]: path.basename(p) });
    return z.root;
  });
  try { return run(inputs, o, opts); } finally { zips.forEach((z) => z.cleanup()); }
}

function run(inputs, o, orig) {
  const files = inputs && inputs.length ? collect(inputs, o.ignore, o.labels) : [];
  const steOnly = !files.length && (o.steInputs?.length || o.steCompare || o.docs?.length);
  const groups = steOnly ? [] : [crossover.scan(files, o), actions.scan(files, o), governance.scan(files, o)];
  if (!o.noLabs && !steOnly) groups.push(labs.scan(files));
  if (!o.noInjection && (files.length || (o.docs && o.docs.length))) groups.push(injection.scan(files, o));
  if (!o.noSte) groups.push(ste.scan(files, o));
  for (const g of groups) {
    g.findings.sort((a, b) => (W[b.severity] - W[a.severity]) || String(a.file).localeCompare(b.file) || a.line - b.line);
    g.score = groupScore(g.findings);
    g.counts = { high: 0, medium: 0, low: 0, info: 0 };
    g.findings.forEach((f) => g.counts[f.severity]++);
  }
  // Overall score = tabs 1–3 only (or the STE tab when that is all that ran).
  const core = steOnly ? groups : groups.slice(0, 3);
  const score = Math.round(core.reduce((s, g) => s + g.score, 0) / core.length);
  return {
    tool: "agent-ops-check", version: require("../package.json").version,
    generatedAt: new Date().toISOString(), inputs: (orig && orig.inputsLabel) || inputs || [], steOnly: !!steOnly, filesScanned: files.length,
    agents: [...new Set(files.map((f) => f.agent))],
    rules: rulesInfo(),
    score, groups,
    evals: steOnly || o.noEvals ? null : evals.generate(files, groups),
    standards: standards.map(groups),
    network: o.llm ? "LLM review enabled: snippets were sent to " + o.llm + " using your key" : "No network calls were made. Nothing left this machine.",
    disclaimer: "Heuristic regex and static checks, not a security audit. It can miss problems and can flag harmless code."
  };
}
module.exports = { analyze, groupScore, rulesInfo };
