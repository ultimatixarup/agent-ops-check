"use strict";
// Markdown "audit memo" in the SMB Agent Ops format: P0/P1/P2 findings, inventory, gate map.
const P = { high: "P0", medium: "P1", low: "P2", info: "OK" };
module.exports = function md(r) {
  const L = [];
  L.push("# Agent ops audit memo (self-run)", "", "_Generated locally by agent-ops-check " + r.version + " on " + r.generatedAt + ". " + r.network + "_", "", "> " + r.disclaimer, "");
  if (r.rules) L.push("Rules " + r.rules.version + " (" + r.rules.date + "). " + r.rules.hint, "");
  L.push("**Overall score:** " + r.score + "/100 · files scanned: " + r.filesScanned + " · agents: " + r.agents.join(", "), "");
  L.push("| Area | Score | High | Medium | Low |", "|---|---|---|---|---|");
  r.groups.forEach((g) => L.push("| " + g.title + " | " + g.score + " | " + g.counts.high + " | " + g.counts.medium + " | " + g.counts.low + " |"));
  const x = r.groups.find((g) => g.id === "crossover");
  if (x) {
  L.push("", "## 1. Agent and connector inventory", "", "| Agent | Connectors | Credentials (names only) | Scopes |", "|---|---|---|---|");
  x.inventory.forEach((a) => L.push("| " + a.agent + " | " + (a.connectors.join(", ") || "-") + " | " + (a.credentials.join(", ") || "-") + " | " + (a.scopes.join(", ") || "-") + " |"));
  L.push("", "### Source-to-sink matrix (personal data → work destinations)", "");
  if (x.matrix.length) { L.push("| Agent | Personal source | Work sink |", "|---|---|---|"); x.matrix.forEach((m) => L.push("| " + m.agent + " | " + m.source + " (" + m.sourceAt + ") | " + m.sink + " (" + m.sinkAt + ") |")); }
  else L.push("No agent both reads a personal source and writes to a work sink.");
  const a = r.groups.find((g) => g.id === "actions");
  L.push("", "## 2. Human-in-the-loop gate map", "", "| Agent | Action | Where | Approval | Dry-run | Rate limit | Domain allowlist |", "|---|---|---|---|---|---|---|");
  a.actions.forEach((t) => L.push("| " + t.agent + " | `" + t.action + "` | " + t.file + ":" + t.line + " | " + ["approval", "dry_run", "rate_limit", "domain_allowlist"].map((k) => (t.gates[k] ? "yes" : "**no**")).join(" | ") + " |"));
  const gv = r.groups.find((g) => g.id === "governance");
  L.push("", "## 3. AI inventory", "", "- Providers: " + (Object.keys(gv.inventory.providers).join(", ") || "none found"), "- Frameworks/SDKs: " + (Object.keys(gv.inventory.frameworks).join(", ") || "none found"), "- Models: " + (Object.keys(gv.inventory.models).map((m) => "`" + m + "`").join(", ") || "none found"));
  }
  const st = r.groups.find((g) => g.id === "ste");
  if (st) {
    L.push("", "## STE (Simplified Technical English) style", "", "_" + st.note + "_", "");
    if (st.dictionary) L.push("Approved-word list: " + st.dictionary, "");
    st.docs.forEach((d) => L.push("- " + d.file + ": " + d.sentences + " sentences, " + d.findings + " findings"));
    if (st.compare) L.push("", "**Information-loss check:** " + st.compare.original + " → " + st.compare.rewrite + ": " + st.compare.missing.length + " item(s) missing from the rewrite (of " + st.compare.originalFacts + " facts found in the original).");
  }
  const inj = r.groups.find((g) => g.id === "injection");
  if (inj) L.push("", "## Document-wide prompt-injection scan (ADSF)", "", "_" + inj.note + "_", "", inj.docsScanned + " files scanned, " + inj.findings.length + " findings.");
  if (r.standards) {
    L.push("", "## Standards map (maps to, not compliance)", "", "✅ covered by a check · 🟡 partly · ⬜ not checked. Numbers = findings in this scan that map to the item.", "");
    for (const fw of r.standards) {
      L.push("### " + fw.name, "", "_" + fw.note + "_ (" + fw.summary.covered + " ✅ · " + fw.summary.partial + " 🟡 · " + fw.summary.none + " ⬜)", "", "| Item | Status | Findings here | What the tool checks |", "|---|---|---|---|");
      fw.items.forEach((i) => L.push("| " + i.id + " " + i.title + " | " + i.icon + " | " + (i.findings ? i.findings + (i.high ? " (" + i.high + " high)" : "") : "-") + " | " + i.how + " |"));
      L.push("");
    }
  }
  if (r.evals) L.push("", "## Generated eval sets", "", r.evals.functional.length + " functional and " + r.evals.security.length + " security test cases in `evals/` (JSONL + README.md). Generated from the source; not run.");
  L.push("", "## 4. Findings (P0 = fix before real traffic)", "");
  for (const g of r.groups) {
    L.push("### " + g.title, "");
    if (!g.findings.length) L.push("No findings.", "");
    g.findings.forEach((f) => L.push("- **" + P[f.severity] + "** `" + f.rule + "` " + f.file + (f.line > 0 ? ":" + f.line : "") + " — " + f.message + (f.evidence ? " (`" + String(f.evidence).replace(/`/g, "'") + "`)" : "")));
    L.push("");
  }
  const lb = r.groups.find((g) => g.id === "labs");
  if (lb) { L.push("## 5. Labs tool runs", ""); lb.runs.forEach((x) => L.push("- " + x.tool + " · " + x.file + " · score " + x.score + " · " + x.verdict)); L.push(""); }
  if (r.llm) L.push("## LLM review (" + r.llm.provider + ")", "", r.llm.text || r.llm.error, "");
  return L.join("\n") + "\n";
};
