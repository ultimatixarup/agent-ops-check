"use strict";
const test = require("node:test");
const assert = require("node:assert");
const path = require("path");
const fs = require("fs");
const os = require("os");
const { main } = require("../src/cli");
const BAD = path.join(__dirname, "..", "examples", "bad-agent");
const GOOD = path.join(__dirname, "..", "examples", "good-agent");

function quiet(fn) { const l = console.log; console.log = () => {}; return fn().finally(() => { console.log = l; }); }

test("writes html, json, md and sarif; makes no network calls", async () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), "aoc-out-"));
  const calls = []; const realFetch = global.fetch;
  global.fetch = (...a) => { calls.push(a); throw new Error("network used"); };
  const http = require("http"), https = require("https"), net = require("net");
  const saved = [http.request, https.request, net.connect];
  http.request = https.request = net.connect = (...a) => { calls.push(a); throw new Error("network used"); };
  try {
    const code = await quiet(() => main([BAD, "--out", out]));
    assert.strictEqual(code, 0);
  } finally { global.fetch = realFetch; [http.request, https.request, net.connect] = saved; }
  assert.strictEqual(calls.length, 0);
  for (const f of ["index.html", "report.json", "report.md", "report.sarif"]) assert.ok(fs.existsSync(path.join(out, f)), f);
  const html = fs.readFileSync(path.join(out, "index.html"), "utf8");
  assert.match(html, /default-src 'none'/);
  assert.match(html, /Source-to-sink matrix/);
  assert.match(html, /bot\.ts:13/);
  const sarif = JSON.parse(fs.readFileSync(path.join(out, "report.sarif"), "utf8"));
  assert.strictEqual(sarif.version, "2.1.0");
  assert.ok(sarif.runs[0].results.length > 20);
});

test("--fail-on high exits 1 on the bad agent and 0 on the good one", async () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), "aoc-out-"));
  assert.strictEqual(await quiet(() => main([BAD, "--out", out, "--format", "json", "--fail-on", "high"])), 1);
  assert.strictEqual(await quiet(() => main([GOOD, "--out", out, "--format", "json", "--fail-on", "high", "--no-labs"])), 0);
});

test("--llm without a key sends nothing and says so", async () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), "aoc-out-"));
  const saved = { a: process.env.OPENAI_API_KEY, b: process.env.LLM_API_KEY };
  delete process.env.OPENAI_API_KEY; delete process.env.LLM_API_KEY;
  let called = false; const realFetch = global.fetch; global.fetch = () => { called = true; throw new Error("x"); };
  try { await quiet(() => main([GOOD, "--out", out, "--format", "json", "--llm", "openai", "--no-labs"])); }
  finally { global.fetch = realFetch; if (saved.a) process.env.OPENAI_API_KEY = saved.a; if (saved.b) process.env.LLM_API_KEY = saved.b; }
  assert.strictEqual(called, false);
  const r = JSON.parse(fs.readFileSync(path.join(out, "report.json"), "utf8"));
  assert.match(r.llm.error, /No key found/);
});
