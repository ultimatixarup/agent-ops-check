#!/usr/bin/env node
// Golden-result check: runs the CLI (network blocked) on the examples and compares scores and
// rule-ID counts with test/golden/*.json. Usage: node scripts/golden.js [--update] [--keep <dir>]
"use strict";
const fs = require("fs"), path = require("path"), os = require("os"), { spawnSync } = require("child_process");
const ROOT = path.join(__dirname, ".."), GOLD = path.join(ROOT, "test", "golden");
const CASES = {
  "bad-agent": ["examples/bad-agent"],
  "good-agent": ["examples/good-agent"],
  "bad-agent-zip": ["test/fixtures/bad-agent.zip"],
  "adsf-poisoned-doc": ["examples/bad-agent/finance-cfo/knowledge/vendor-faq.md"],
  "ste-samples": ["--ste", "examples/ste/original.txt", "--ste", "examples/ste/rewrite.txt", "--ste-dict", "examples/ste/approved-words.txt"],
  "ste-compare": ["--ste-compare", "examples/ste/original.txt", "examples/ste/rewrite.txt"],
  "execconfig-bad": ["test/fixtures/execconfig/bad"],
  "execconfig-good": ["test/fixtures/execconfig/good"],
};
const update = process.argv.includes("--update");
const ki = process.argv.indexOf("--keep"), keep = ki > 0 ? path.resolve(process.argv[ki + 1]) : null;

function summarize(r) {
  const groups = {};
  for (const g of r.groups) {
    const rules = {};
    for (const f of g.findings) rules[f.rule] = (rules[f.rule] || 0) + 1;
    groups[g.id] = { score: g.score, findings: g.findings.length, rules: Object.fromEntries(Object.entries(rules).sort()) };
  }
  return { score: r.score, filesScanned: r.filesScanned, groups };
}
function run(name, args) {
  const out = keep ? path.join(keep, name) : fs.mkdtempSync(path.join(os.tmpdir(), "golden-"));
  const p = spawnSync(process.execPath, ["-r", path.join(ROOT, "test", "no-network.js"), path.join(ROOT, "bin", "agent-ops-check.js"), ...args, "--out", out, "--format", keep ? "json,html" : "json"], { cwd: ROOT, encoding: "utf8" });
  if (p.status !== 0) throw new Error(name + ": CLI exited " + p.status + "\n" + p.stderr);
  return summarize(JSON.parse(fs.readFileSync(path.join(out, "report.json"), "utf8")));
}

let failed = 0; const results = {};
fs.mkdirSync(GOLD, { recursive: true });
for (const [name, args] of Object.entries(CASES)) {
  const got = results[name] = run(name, args), file = path.join(GOLD, name + ".json");
  if (update) { fs.writeFileSync(file, JSON.stringify(got, null, 2) + "\n"); console.log("updated " + name); continue; }
  if (!fs.existsSync(file)) { console.error("MISSING " + file + " (run npm run golden:update)"); failed++; continue; }
  const want = JSON.parse(fs.readFileSync(file, "utf8"));
  if (JSON.stringify(want) !== JSON.stringify(got)) {
    failed++; console.error("DRIFT " + name);
    console.error("  expected: " + JSON.stringify(want)); console.error("  actual:   " + JSON.stringify(got));
  } else console.log("ok " + name + " (score " + got.score + ")");
}
const g = (n) => JSON.stringify(results[n].groups);
if (g("bad-agent") !== g("bad-agent-zip")) { failed++; console.error("DRIFT bad-agent-zip differs from bad-agent: rebuild test/fixtures/bad-agent.zip"); }
if (failed) { console.error(failed + " golden check(s) failed. If the change is intended, run npm run golden:update and commit."); process.exit(1); }
