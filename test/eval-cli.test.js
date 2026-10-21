"use strict";
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { main } = require("../src/cli");
const { MISSING } = require("../src/eval-cli");

function quiet(fn) {
  const log = console.log, err = console.error;
  const out = [], errors = [];
  console.log = (m) => out.push(String(m));
  console.error = (m) => errors.push(String(m));
  return fn().finally(() => { console.log = log; console.error = err; }).then((code) => ({ out, errors, code }));
}

test("eval --help works with no Python and describes dry-run", async () => {
  const saved = process.env.AGENT_OPS_EVALS_RUNNER;
  process.env.AGENT_OPS_EVALS_RUNNER = "missing";
  try {
    const { out, errors, code } = await quiet(() => Promise.resolve(main(["eval", "--help"])));
    assert.strictEqual(code, 0);
    assert.strictEqual(errors.length, 0);
    const text = out.join("\n");
    assert.match(text, /--live/);
    assert.match(text, /Dry-run is the default/);
    assert.match(text, /optional Python package/);
  } finally {
    if (saved === undefined) delete process.env.AGENT_OPS_EVALS_RUNNER;
    else process.env.AGENT_OPS_EVALS_RUNNER = saved;
  }
});

test("eval without Python prints the install hint and does not scan", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aoc-eval-"));
  const config = path.join(dir, "agent-evals.yaml");
  fs.writeFileSync(config, "version: 1\n");
  const saved = process.env.AGENT_OPS_EVALS_RUNNER;
  process.env.AGENT_OPS_EVALS_RUNNER = "missing";
  try {
    const { errors, code } = await quiet(() => Promise.resolve(main(["eval", config])));
    assert.strictEqual(code, 2);
    const text = errors.join("\n");
    assert.match(text, /optional Python package agent-ops-evals/);
    assert.ok(text.includes(MISSING.split("\n")[0]));
    assert.ok(!fs.existsSync(path.join(dir, "report.json")));
  } finally {
    if (saved === undefined) delete process.env.AGENT_OPS_EVALS_RUNNER;
    else process.env.AGENT_OPS_EVALS_RUNNER = saved;
  }
});

test("eval rejects --live together with --dry-run before starting Python", async () => {
  const saved = process.env.AGENT_OPS_EVALS_RUNNER;
  process.env.AGENT_OPS_EVALS_RUNNER = "missing";
  try {
    const result = await quiet(() => Promise.resolve(main(["eval", "--live", "--dry-run", "x.yaml"])));
    assert.strictEqual(result.code, 2);
    assert.match(result.errors.join("\n"), /only one of --live and --dry-run/);
  } finally {
    if (saved === undefined) delete process.env.AGENT_OPS_EVALS_RUNNER;
    else process.env.AGENT_OPS_EVALS_RUNNER = saved;
  }
});

test("scan help mentions eval and still describes a local scan", async () => {
  const { out } = await quiet(() => Promise.resolve(main(["--help"])));
  const text = out.join("\n");
  assert.match(text, /agent-ops-check eval/);
  assert.match(text, /The scan makes no network calls unless you pass --llm/);
});
