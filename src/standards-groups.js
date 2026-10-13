"use strict";
// Which standards items each check group maps to, computed from data/standards/*.yaml (offline data).
// "Maps to" describes what this tool checks statically; it is never a compliance claim.
const { load, ICON } = require("./standards");

const matches = (check, prefix) => check.startsWith(prefix) || (check.endsWith(".") && prefix.startsWith(check));

const ORDER = ["owasp-llm-2025", "owasp-agentic-2026", "owasp-agentic", "mitre-atlas", "nist-ai-rmf", "iso-42001", "csa-aicm", "eu-ai-act", "anthropic-agents", "copilot-studio"];
const rank = (id) => (ORDER.indexOf(id) < 0 ? ORDER.length : ORDER.indexOf(id));

function groupStandards(groups, frameworks) {
  const fws = (frameworks || load()).slice().sort((a, b) => rank(a.id) - rank(b.id));
  return groups.map((g) => ({
    id: g.id, title: g.title,
    frameworks: fws.map((fw) => ({
      id: fw.id, name: fw.name, source: fw.source,
      items: fw.items.filter((it) => (it.checks || []).some((c) => g.prefixes.some((p) => matches(c, p))))
        .map((it) => ({ id: it.id, title: it.title, coverage: it.coverage, icon: ICON[it.coverage] }))
    })).filter((f) => f.items.length)
  }));
}
module.exports = { groupStandards };
