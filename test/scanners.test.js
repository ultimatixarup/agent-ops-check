"use strict";
const test = require("node:test");
const assert = require("node:assert");
const path = require("path");
const fs = require("fs");
const os = require("os");
const { analyze } = require("../src");
const { isIrreversible } = require("../src/scanners/actions");
const BAD = path.join(__dirname, "..", "examples", "bad-agent");
const GOOD = path.join(__dirname, "..", "examples", "good-agent");
const rules = (r, g) => r.groups.find((x) => x.id === g).findings.map((f) => f.rule);

test("crossover: bad example — shared credential, source-to-sink, secret, PII", () => {
  const r = analyze([BAD], { noLabs: true });
  const x = r.groups.find((g) => g.id === "crossover");
  const rs = rules(r, "crossover");
  assert.ok(rs.includes("crossover.shared_credential"));
  assert.ok(rs.includes("crossover.secret.generic_assignment"));
  assert.ok(rs.includes("crossover.pii.ssn"));
  assert.ok(rs.includes("crossover.pii.bank_account"));
  assert.ok(x.matrix.some((m) => m.agent === "finance-cfo" && m.source === "tax_paths" && m.sink === "slack"));
  assert.ok(x.matrix.some((m) => m.agent === "work-assistant" && m.source === "gmail"));
  assert.ok(!x.matrix.some((m) => m.agent === "bad-agent"), "README docs must not count as an agent");
  const cfo = x.inventory.find((a) => a.agent === "finance-cfo");
  assert.ok(cfo.scopes.some((s) => /gmail\.readonly/.test(s)));
});

test("crossover: secrets are masked in output", () => {
  const r = analyze([BAD], { noLabs: true });
  assert.ok(!JSON.stringify(r).includes("Zq81mWp4Lr7Tn2Vx9Bc6Hd3Kf0Js5Ga"));
  assert.ok(!JSON.stringify(r).includes("123-45-6789"));
});

test("crossover: hardcoded Slack webhook (built at runtime, never stored)", () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "aoc-"));
  fs.writeFileSync(path.join(d, "a.js"), "const u = 'https://hooks.slack.com/services/" + "T0AAAAAAA/B0BBBBBBB/" + "c".repeat(24) + "';");
  assert.ok(rules(analyze([d], { noLabs: true }), "crossover").includes("crossover.slack_webhook"));
});

test("actions: ungated irreversible tools and browser writes are high; risky reads flagged", () => {
  const r = analyze([BAD], { noLabs: true });
  const a = r.groups.find((g) => g.id === "actions");
  const names = a.actions.map((t) => t.action);
  for (const n of ["submit_form", "purchase_item", "post_message", "send_slack_message", "delete_jira_issue", ".click(", ".fill("]) assert.ok(names.includes(n), n);
  assert.ok(!names.includes("search_docs"));
  const rs = rules(r, "actions");
  for (const id of ["cookie_read", "storage_read", "browser_profile", "url_shortener", "wildcard_domain", "no_deny_list"]) assert.ok(rs.includes("actions." + id), id);
  assert.ok(a.actions.every((t) => !t.gates.approval));
});

test("actions: tool name verbs", () => {
  assert.ok(isIrreversible("sendEmail", "send|pay"));
  assert.ok(isIrreversible("slack.post_message", "send|post"));
  assert.ok(!isIrreversible("resend_count_reader", "send"));
  assert.ok(!isIrreversible("search_docs", "send|post|delete"));
});

test("governance: inventory and missing controls", () => {
  const r = analyze([BAD], { noLabs: true });
  const g = r.groups.find((x) => x.id === "governance");
  assert.deepStrictEqual(Object.keys(g.inventory.providers).sort(), ["anthropic", "openai"]);
  const rs = rules(r, "governance");
  for (const id of ["unbounded_loop", "no_max_tokens", "no_timeout", "no_recursion_cap", "no_budget", "no_tracing", "unpinned_model", "no_owner"]) assert.ok(rs.includes("governance." + id), id);
});

test("good example: no high or medium findings in the three core scanners", () => {
  const r = analyze([GOOD], { noLabs: true });
  const bad = r.groups.flatMap((g) => g.findings).filter((f) => f.severity === "high" || f.severity === "medium");
  assert.deepStrictEqual(bad, []);
  assert.strictEqual(r.score, 100);
});

test("real .env files are never read", () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "aoc-"));
  fs.writeFileSync(path.join(d, ".env"), "OPENAI_API_KEY=sk-proj-" + "a".repeat(40));
  fs.writeFileSync(path.join(d, "x.py"), "print(1)\n# filler line for scan");
  const r = analyze([d], { noLabs: true });
  assert.strictEqual(r.filesScanned, 1);
});

test("--ignore skips paths", () => {
  const r = analyze([BAD], { noLabs: true, ignore: ["browser-bot/**"] });
  assert.ok(!r.agents.includes("browser-bot"));
});
