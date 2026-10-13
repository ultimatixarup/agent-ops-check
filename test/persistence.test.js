"use strict";
// Background daemon / sidecar (daemon.*) and skill artifact provenance (skills.*) checks: positive and
// negative regression tests on test/fixtures/persistence/{bad,good} (fictional files) and on short snippets.
const test = require("node:test"), assert = require("node:assert"), fs = require("fs"), os = require("os"), path = require("path");
const { analyze } = require("../src");
const { collect, keep } = require("../src/files");
const FX = path.join(__dirname, "fixtures", "persistence");
const run = (dir) => analyze([dir], { noLabs: true, noEvals: true });
const G = (r, id) => r.groups.find((g) => g.id === id);
const rules = (r, id) => G(r, id).findings.map((f) => f.rule);
const has = (r, id, rule, fileRe, sev) => G(r, id).findings.some((f) => f.rule === rule && fileRe.test(f.file) && (!sev || f.severity === sev));
function tmp(files) {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "aoc-persist-"));
  for (const [rel, text] of Object.entries(files)) { fs.mkdirSync(path.dirname(path.join(d, rel)), { recursive: true }); fs.writeFileSync(path.join(d, rel), text); }
  return d;
}

test("bad fixture: every daemon rule fires", () => {
  const r = run(path.join(FX, "bad"));
  for (const id of ["launchd_register", "systemd_register", "cron_register", "windows_task_register", "auto_update", "daemon_mode", "unpinned_latest_install", "pipe_to_shell"])
    assert.ok(rules(r, "daemon").includes("daemon." + id), "missing daemon." + id);
  assert.ok(has(r, "daemon", "daemon.pipe_to_shell", /install\.sh$/, "medium"));
  assert.ok(has(r, "daemon", "daemon.pipe_to_shell", /README\.md$/, "low"), "docs are lowered to low");
  assert.ok(G(r, "daemon").findings.every((f) => /Verify on your install/.test(f.message) && f.family && f.source === "codex_daemon_report"));
});
test("bad fixture: every skills rule fires", () => {
  const r = run(path.join(FX, "bad"));
  assert.ok(has(r, "skills", "skills.orphan_pyc", /helper\.cpython-312\.pyc$/, "high"));
  assert.ok(!has(r, "skills", "skills.orphan_pyc", /save\.cpython-312\.pyc$/), "save.py exists, so its .pyc is not orphaned");
  assert.strictEqual(rules(r, "skills").filter((x) => x === "skills.committed_pycache").length, 2, "one finding per __pycache__ folder");
  assert.ok(has(r, "skills", "skills.persistent_write", /save\.py$/));
  assert.ok(has(r, "skills", "skills.persistent_write", /SKILL\.md$/));
  assert.ok(has(r, "skills", "skills.session_hook", /settings\.json$/, "medium"));
  assert.ok(has(r, "skills", "skills.unpinned_source", /\.mcp\.json$/, "medium"));
  assert.ok(G(r, "skills").findings.some((f) => f.rule === "skills.unpinned_source" && /docker/.test(f.evidence)));
  assert.strictEqual(G(r, "skills").findings.filter((f) => /notes-mcp/.test(f.evidence)).length, 1, "git source reported once");
  assert.ok(has(r, "skills", "skills.no_hashes", /SKILL\.md$/, "low"));
  assert.ok(G(r, "skills").findings.every((f) => ["skillrelaybench", "pycache_trap", "supply_chain"].includes(f.source)));
});
test("good fixture: no daemon or skills findings", () => {
  const r = run(path.join(FX, "good"));
  assert.deepStrictEqual(G(r, "daemon").findings, []);
  assert.deepStrictEqual(G(r, "skills").findings, []);
});
test("new tabs never change the overall score; good-agent stays 100", () => {
  const ex = path.join(__dirname, "..", "examples");
  assert.strictEqual(analyze([path.join(ex, "good-agent")], {}).score, 100);
  const a = analyze([path.join(FX, "bad")], {}), b = analyze([path.join(FX, "bad")], { noPersistence: true });
  assert.strictEqual(a.score, b.score);
});
test("extra files (.sh, .pyc) are invisible to the other checks", () => {
  const files = collect([path.join(FX, "bad")]);
  assert.ok(!files.some((f) => /\.(sh|ps1|plist|service|pyc)$/.test(f.rel)));
  assert.ok(files.extras.some((f) => f.kind === "pyc") && files.extras.some((f) => f.kind === "script"));
  assert.ok(keep("a/__pycache__/x.cpython-312.pyc") && keep("install.sh") && keep("a.py") && !keep("a.png"));
});
test("negatives: listing, disabling and pinned forms are not flagged", () => {
  const d = tmp({
    "ops.sh": "crontab -l\nsystemctl --user disable relay.service\nnpm install -g relay@2.3.1\nnpx relay@2.3.1 run\n# curl https://x | sh (comment)\ncurl -fsSLO https://example.invalid/r-1.0.tar.gz\n",
    "cfg.json": "{\n  \"autoUpdate\": false,\n  \"keepAlive\": true,\n  \"daemon\": false\n}\n",
    "server.js": "const agent = new http.Agent({ keepAlive: true });\nchild.unref();\n"
  });
  const r = run(d);
  assert.deepStrictEqual(G(r, "daemon").findings.map((f) => f.rule + ":" + f.evidence), []);
});
test("negatives: skill rules stay inside skill scope and accept pins", () => {
  const d = tmp({
    "app/writer.py": "open('AGENTS.md', 'a').write(x)\n", // not a skill folder
    "skills/pinned/SKILL.md": "Run `npx -y tool@1.2.3` and install github:example/tool#3f2c1ab.\n",
    "skills/pinned/run.py": "print('ok')\n",
    "skills/pinned/uv.lock": "version = 1\n",
    "skills/reader/SKILL.md": "Read CLAUDE.md for context before you start.\n"
  });
  const r = run(d);
  assert.deepStrictEqual(G(r, "skills").findings.map((f) => f.rule + ":" + f.file), []);
});
test("pyc outside a skill folder is lower severity", () => {
  const d = tmp({ "lib/__pycache__/util.cpython-311.pyc": "x", "lib/other.py": "x = 1\n" });
  const r = run(d);
  assert.ok(has(r, "skills", "skills.committed_pycache", /util/, "low"));
  assert.ok(has(r, "skills", "skills.orphan_pyc", /util/, "medium"));
});
test("campaign false positives stay fixed: Python daemon threads, lowercase skill.md tips docs, docs-only mentions", () => {
  const d = tmp({
    // Pattern from anthropics/claude-quickstarts browser-toolset (a local HTTP server in a daemon thread).
    "tool/server.py": "threading.Thread(target=server.serve_forever, daemon=True).start()\nworker = Process(target=f, daemon=True)\n",
    // A "skill.md" that is a setup-tips document (no front matter), not a skill definition.
    "demo/skill.md": "# Setup tips\n\nRun `npx some-cli@latest add thread` to copy components.\n",
    "demo/agent-config.ts": "export const x = 1;\n",
    "demo/README.md": "Generated with `npx assistant-ui add thread`.\n"
  });
  const r = run(d);
  assert.deepStrictEqual(G(r, "skills").findings.map((f) => f.rule), []);
  const dm = G(r, "daemon").findings;
  assert.ok(!dm.some((f) => f.rule === "daemon.daemon_mode"), "Python daemon threads are not background services");
  assert.ok(dm.every((f) => f.severity === "low"), "docs-only mentions are low");
});
