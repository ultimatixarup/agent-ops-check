"use strict";
const { collect } = require("./files");
const crossover = require("./scanners/crossover");
const actions = require("./scanners/actions");
const governance = require("./scanners/governance");
const labs = require("./labs");

const W = { high: 10, medium: 4, low: 1, info: 0 };
function groupScore(findings) { return Math.max(0, 100 - findings.reduce((s, f) => s + (W[f.severity] ?? 1), 0)); }

function analyze(inputs, opts) {
  const o = opts || {};
  const files = collect(inputs, o.ignore);
  const groups = [crossover.scan(files, o), actions.scan(files, o), governance.scan(files, o)];
  if (!o.noLabs) groups.push(labs.scan(files));
  for (const g of groups) {
    g.findings.sort((a, b) => (W[b.severity] - W[a.severity]) || String(a.file).localeCompare(b.file) || a.line - b.line);
    g.score = groupScore(g.findings);
    g.counts = { high: 0, medium: 0, low: 0, info: 0 };
    g.findings.forEach((f) => g.counts[f.severity]++);
  }
  const core = groups.slice(0, 3);
  const score = Math.round(core.reduce((s, g) => s + g.score, 0) / core.length);
  return {
    tool: "agent-ops-check", version: require("../package.json").version,
    generatedAt: new Date().toISOString(), inputs, filesScanned: files.length,
    agents: [...new Set(files.map((f) => f.agent))],
    score, groups,
    network: o.llm ? "LLM review enabled: snippets were sent to " + o.llm + " using your key" : "No network calls were made. Nothing left this machine.",
    disclaimer: "Heuristic regex and static checks, not a security audit. It can miss problems and can flag harmless code."
  };
}
module.exports = { analyze, groupScore };
