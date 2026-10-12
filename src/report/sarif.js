"use strict";
const LVL = { high: "error", medium: "warning", low: "note", info: "none" };
module.exports = function sarif(r) {
  const results = []; const rules = new Map();
  for (const g of r.groups) for (const f of g.findings) {
    rules.set(f.rule, { id: f.rule, shortDescription: { text: f.rule } });
    const loc = f.line > 0 ? [{ physicalLocation: { artifactLocation: { uri: f.file }, region: { startLine: f.line } } }] : [{ physicalLocation: { artifactLocation: { uri: f.file.startsWith("(") ? "." : f.file } } }];
    results.push({ ruleId: f.rule, level: LVL[f.severity] || "note", message: { text: f.message }, locations: loc });
  }
  return JSON.stringify({ $schema: "https://json.schemastore.org/sarif-2.1.0.json", version: "2.1.0", runs: [{ tool: { driver: { name: "agent-ops-check", version: r.version, informationUri: "https://github.com/ultimatixarup/agent-ops-check", rules: [...rules.values()] } }, results }] }, null, 2);
};
