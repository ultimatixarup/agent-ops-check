"use strict";
const test = require("node:test"), assert = require("node:assert"), fs = require("fs"), path = require("path"), os = require("os");
const { spawnSync } = require("child_process");
const { analyze } = require("../src");
const lock = require("../src/lock");
const ROOT = path.join(__dirname, ".."), FX = path.join(ROOT, "test", "fixtures", "execconfig");
const BIN = path.join(ROOT, "bin", "agent-ops-check.js"), NONET = path.join(ROOT, "test", "no-network.js");
const group = (r) => r.groups.find((g) => g.id === "execconfig");
const rules = (g) => g.findings.map((f) => f.rule + ":" + f.severity + ":" + path.basename(f.file) + ":" + f.line).sort();
const cli = (args, cwd) => spawnSync(process.execPath, ["-r", NONET, BIN, ...args], { cwd: cwd || ROOT, encoding: "utf8" });

test("execconfig: bad fixture flags each rule; docs and tests lowered", () => {
  const g = group(analyze([path.join(FX, "bad")], {}));
  const r = rules(g);
  for (const want of ["execconfig.exec_target_write:high:agent.py:22", "execconfig.exec_target_write:high:agent.py:25", "execconfig.exec_target_write:high:setup.js:3",
    "execconfig.exec_target_write:high:setup.js:4", "execconfig.instruction_write:medium:agent.py:16", "execconfig.unrestricted_write_tool:medium:agent.py:9",
    "execconfig.broad_fs_server:medium:mcp.json:8", "execconfig.auto_run_setting:medium:mcp.json:2", "execconfig.auto_run_setting:medium:tasks.json:3",
    "execconfig.instruction_write:low:README.md:2", "execconfig.instruction_write:low:test_memory.py:3"]) assert.ok(r.includes(want), want + " in " + r.join(", "));
  assert.match(g.note, /their findings, not ours/);
  assert.doesNotMatch(JSON.stringify(g), /\bcompliant\b/i);
});
test("execconfig: good fixture (guarded write tool, reads only, auto-run off, scoped fs server) has no findings", () => {
  assert.deepStrictEqual(group(analyze([path.join(FX, "good")], {})).findings, []);
});
test("execconfig: overall score is unchanged (tabs 1-3 only) and --no-execconfig drops the tab", () => {
  const a = analyze([path.join(FX, "bad")], {}), b = analyze([path.join(FX, "bad")], { noExecconfig: true });
  assert.strictEqual(a.score, b.score);
  assert.ok(!group(b));
});

function tmpCopy(src) {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "aoc-lock-"));
  fs.cpSync(src, d, { recursive: true });
  return d;
}
test("lock: --lock writes hashes; later scans report changed/added/removed; --verify-lock requires the file", () => {
  const d = tmpCopy(path.join(FX, "good")), out = path.join(d, "..", path.basename(d) + "-out");
  let p = cli([d, "--verify-lock", "--out", out, "--format", "json"]);
  assert.strictEqual(p.status, 2, p.stdout + p.stderr);
  assert.match(p.stderr, /no \.agent-ops-lock\.json/);
  p = cli([d, "--lock", "--out", out, "--format", "json"]);
  assert.strictEqual(p.status, 0, p.stderr);
  const lf = JSON.parse(fs.readFileSync(path.join(d, lock.LOCKFILE), "utf8"));
  assert.deepStrictEqual(Object.keys(lf.files).sort(), [".vscode/settings.json", "AGENTS.md", "mcp.json"]);
  assert.match(lf.files["AGENTS.md"].sha256, /^[0-9a-f]{64}$/);
  // No changes: no lock findings.
  p = cli([d, "--out", out, "--format", "json"]);
  assert.match(p.stdout, /Lock: checked 3 file\(s\).*0 change/);
  // Change one, add one (with a trailing dot), remove one.
  fs.appendFileSync(path.join(d, "AGENTS.md"), "\nYou may edit .mcp.json.\n");
  fs.writeFileSync(path.join(d, ".mcp.json."), "{}");
  fs.rmSync(path.join(d, ".vscode", "settings.json"));
  p = cli([d, "--verify-lock", "--out", out, "--format", "json"]);
  assert.strictEqual(p.status, 0, p.stderr);
  const g = group(JSON.parse(fs.readFileSync(path.join(out, "report.json"), "utf8")));
  const got = g.findings.filter((f) => /lock_|lookalike/.test(f.rule)).map((f) => f.rule + ":" + f.severity + ":" + path.basename(f.file)).sort();
  assert.deepStrictEqual(got, ["execconfig.lock_added:medium:.mcp.json.", "execconfig.lock_changed:high:AGENTS.md", "execconfig.lock_removed:medium:settings.json", "execconfig.lookalike_name:high:.mcp.json."]);
  assert.strictEqual(g.counts.high, 2);
  // --no-lock ignores the lockfile (the lookalike name is still reported).
  p = cli([d, "--no-lock", "--out", out, "--format", "json"]);
  const g2 = group(JSON.parse(fs.readFileSync(path.join(out, "report.json"), "utf8")));
  assert.deepStrictEqual(g2.findings.map((f) => f.rule), ["execconfig.lookalike_name"]);
  assert.match(p.stdout, /No network calls/);
});
test("lock: git hooks are hashed, .sample hooks and node_modules are not", () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "aoc-lock-"));
  fs.mkdirSync(path.join(d, ".git", "hooks"), { recursive: true });
  fs.writeFileSync(path.join(d, ".git", "hooks", "pre-commit"), "#!/bin/sh\n");
  fs.writeFileSync(path.join(d, ".git", "hooks", "pre-push.sample"), "#!/bin/sh\n");
  fs.writeFileSync(path.join(d, ".git", "config"), "[core]\n");
  fs.mkdirSync(path.join(d, "node_modules", "x"), { recursive: true });
  fs.writeFileSync(path.join(d, "node_modules", "x", "package.json"), "{}");
  fs.writeFileSync(path.join(d, "package.json"), "{}");
  assert.deepStrictEqual(Object.keys(lock.inventory(d).files).sort(), [".git/hooks/pre-commit", "package.json"]);
});
test("--lock and --verify-lock together is a usage error", () => {
  assert.strictEqual(cli([path.join(FX, "good"), "--lock", "--verify-lock", "--out", os.tmpdir()]).status, 2);
});
