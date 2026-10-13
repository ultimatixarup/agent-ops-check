"use strict";
const test = require("node:test"), assert = require("node:assert");
const { bench, render } = require("../scripts/bench-llmail.js");
const fs = require("fs"), path = require("path");
const { loadRules } = require("../src/util.js");

test("LLMail benchmark doc is up to date (run npm run bench:llmail)", () => {
  assert.strictEqual(fs.readFileSync(path.join(__dirname, "..", "docs", "LLMAIL_BENCHMARK.md"), "utf8"), render(bench()));
});
test("LLMail rules: no medium+ false positives on the benign sets, and they add detections", () => {
  const b = bench();
  assert.strictEqual(b.benign.after.any, 0);
  assert.strictEqual(b.hard.after.medPlus, 0);
  assert.ok(b.heldout.after.any > b.heldout.before.any);
});
test("every LLMail rule carries provenance metadata", () => {
  for (const r of loadRules("injection").llmail) { assert.match(r.source, /LLMail-Inject/); assert.ok(r.family); }
});
