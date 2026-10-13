"use strict";
// The browser engine (web-dist/agent-ops-check.js, built by `npm run build:web`) must give the same findings
// and scores as the CLI on the sample agents. The bundle runs in a bare vm context with no fetch/XHR.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { spawnSync } = require("child_process");
const JSZip = require("jszip");
const { analyze } = require("../src");
const ROOT = path.join(__dirname, "..");
const EX = path.join(ROOT, "examples");

const b = spawnSync(process.execPath, [path.join(ROOT, "scripts", "build-web.js")], { encoding: "utf8" });
if (b.status !== 0) throw new Error("build:web failed\n" + b.stderr);
const ctx = vm.createContext({ console, TextEncoder, TextDecoder, URL, setTimeout, clearTimeout });
vm.runInContext(fs.readFileSync(path.join(ROOT, "web-dist", "agent-ops-check.js"), "utf8"), ctx);
const WEB = ctx.AgentOpsCheck;

function folderEntries(dir) {
  const out = [];
  const walk = (p, rel) => { for (const e of fs.readdirSync(p).sort()) { const a = path.join(p, e); fs.statSync(a).isDirectory() ? walk(a, rel + e + "/") : out.push({ path: rel + e, text: fs.readFileSync(a, "utf8") }); } };
  walk(dir, ""); return out;
}
function cli(cwd, inputs, o) { const prev = process.cwd(); process.chdir(cwd); try { return analyze(inputs, o); } finally { process.chdir(prev); } }
const strip = (r) => ({
  score: r.score, filesScanned: r.filesScanned, agents: r.agents, steOnly: r.steOnly,
  groups: r.groups.map((g) => ({ id: g.id, score: g.score, counts: g.counts, findings: g.findings.map((f) => [f.rule, f.severity, f.file, f.line, f.message, f.evidence]) })),
  standards: r.standards.map((s) => [s.id, s.items.map((i) => [i.id, i.coverage, i.findings, i.high])]),
  evals: r.evals && { functional: r.evals.functional, security: r.evals.security }
});
const same = (web, cliR) => assert.deepStrictEqual(JSON.parse(JSON.stringify(strip(web))), JSON.parse(JSON.stringify(strip(cliR))));

test("web = CLI: bad-agent folder", () => {
  same(WEB.scan({ inputs: [{ name: "bad-agent", kind: "folder", entries: folderEntries(path.join(EX, "bad-agent")) }] }), cli(EX, [path.join(EX, "bad-agent")]));
});
test("web = CLI: good-agent folder", () => {
  same(WEB.scan({ inputs: [{ name: "good-agent", kind: "folder", entries: folderEntries(path.join(EX, "good-agent")) }] }), cli(EX, [path.join(EX, "good-agent")]));
});
test("web = CLI: bad-agent.zip (JSZip in the browser vs the CLI's own unzip)", async () => {
  const zp = path.join(ROOT, "test", "fixtures", "bad-agent.zip");
  const entries = await WEB.readZip(JSZip, fs.readFileSync(zp));
  const w = WEB.scan({ inputs: [{ name: "bad-agent.zip", kind: "zip", entries }] });
  same(w, cli(ROOT, [zp]));
  assert.ok(w.groups[0].findings.some((f) => f.file.startsWith("bad-agent.zip!/")));
});
test("web = CLI: ADSF scan of a poisoned doc", () => {
  const d = path.join(EX, "bad-agent", "finance-cfo", "knowledge");
  same(WEB.scan({ inputs: [{ name: "knowledge", kind: "file", entries: [{ path: "vendor-faq.md", text: fs.readFileSync(path.join(d, "vendor-faq.md"), "utf8") }] }] }), cli(path.dirname(d), [path.join(d, "vendor-faq.md")]));
});
test("web = CLI: STE text + approved-word list, and info-loss compare", () => {
  const d = path.join(EX, "ste"); const rd = (f) => fs.readFileSync(path.join(d, f), "utf8");
  const texts = ["original.txt", "rewrite.txt"].map((n) => ({ name: n, text: rd(n) }));
  const w1 = WEB.scan({ steTexts: texts, steDict: { path: "approved-words.txt", text: rd("approved-words.txt") } });
  const c1 = cli(d, [], { steInputs: texts, steDict: "approved-words.txt" });
  same(w1, c1);
  const w2 = WEB.scan({ steCompare: [{ path: "original.txt", text: rd("original.txt") }, { path: "rewrite.txt", text: rd("rewrite.txt") }] });
  same(w2, cli(d, [], { steCompare: ["original.txt", "rewrite.txt"] }));
  assert.ok(w2.groups[0].compare.missing.length > 0);
});
test("web: every report format renders and nothing names a network option", () => {
  const r = WEB.scan({ inputs: [{ name: "bad-agent", kind: "folder", entries: folderEntries(path.join(EX, "bad-agent")) }], options: { llm: "openai" } });
  assert.match(r.network, /No network calls/);
  const out = WEB.outputs(r);
  for (const f of ["index.html", "report.json", "report.md", "report.sarif", "evals/functional.jsonl", "evals/security.jsonl", "evals/README.md"]) assert.ok(out[f] && out[f].length > 20, f);
  assert.equal(JSON.parse(out["report.sarif"]).version, "2.1.0");
  assert.equal(r.standards.length, 10);
});
test("web bundle contains no network calls of its own", () => {
  const src = fs.readFileSync(path.join(ROOT, "web-dist", "agent-ops-check.js"), "utf8");
  assert.doesNotMatch(src, /\bnew XMLHttpRequest\b|navigator\.sendBeacon|new WebSocket|\bimportScripts\b/);
  assert.doesNotMatch(src, /\bfetch\(\s*["'`]http/);
});

test("web = CLI: false-positive regression fixtures incl. a notebook", () => {
  const d = path.join(ROOT, "test", "fixtures", "fp");
  const w = WEB.scan({ inputs: [{ name: "fp", kind: "folder", entries: folderEntries(d) }] });
  same(w, cli(path.dirname(d), [d]));
  assert.ok(w.groups.some((g) => g.findings.some((f) => f.notebookCell)));
});
