"use strict";
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const http = require("http");
const { execFileSync } = require("child_process");
const { audit } = require("../src/scanners/config-audit");
const ua = require("../src/scanners/claude-ua");
const { parseToml } = require("../src/toml-lite");
const sharing = require("../src/data-sharing");
const { analyze } = require("../src");
const ROOT = path.join(__dirname, "..");
const HOME = path.join(ROOT, "test", "fixtures", "config-audit", "home");
const PROJECT = path.join(ROOT, "test", "fixtures", "config-audit", "project");
const BIN = path.join(ROOT, "bin", "agent-ops-check.js");

function hashTree(dir) {
  const out = [];
  const walk = (p) => {
    for (const name of fs.readdirSync(p).sort()) {
      const a = path.join(p, name);
      const st = fs.statSync(a);
      if (st.isDirectory()) walk(a);
      else out.push(path.relative(dir, a) + " " + st.size + " " + fs.readFileSync(a).toString("base64"));
    }
  };
  walk(dir);
  return out.join("\n");
}

test("toml parser reads quoted keys, inline tables, and hook arrays", () => {
  const parsed = parseToml(fs.readFileSync(path.join(HOME, ".codex", "config.toml"), "utf8"));
  assert.strictEqual(parsed.data.plugins["postman@postman"].enabled, true);
  assert.strictEqual(parsed.data.mcp_servers.postman.url.includes("token="), true);
  assert.strictEqual(parsed.data.mcp_servers.secretish.env.API_KEY, "sk-testFIXTUREsecretvalue12345");
  assert.strictEqual(parsed.data.hooks.SessionStart[0].hooks[0].type, "command");
  assert.ok(parsed.data.hooks.state["postman@postman:hooks/codex-hooks.json:session_start:0:0"].trusted_hash.startsWith("sha256:"));
});

test("config audit lists entries, flags the Postman-shaped ones, and prints no secrets", () => {
  const before = hashTree(HOME) + hashTree(PROJECT);
  const saved = process.env.CODEX_HOME;
  process.env.CODEX_HOME = path.join(os.tmpdir(), "not-the-fixture");
  let g;
  try { g = audit({ home: HOME, project: PROJECT }); }
  finally { if (saved == null) delete process.env.CODEX_HOME; else process.env.CODEX_HOME = saved; }
  assert.strictEqual(hashTree(HOME) + hashTree(PROJECT), before);
  const names = g.inventory.map((it) => it.tool + " " + it.kind + " " + it.name);
  for (const n of [
    "codex mcp local-docs", "codex mcp postman", "codex plugin postman@postman", "codex plugin notes@local",
    "codex marketplace marketplace postman", "codex marketplace marketplace mine",
    "codex hook PreToolUse matcher Bash", "claude-code plugin my-linter@local",
    "claude-code marketplace marketplace claude-plugins-official", "claude-code mcp hubspot",
    "claude-code mcp local-http", "cursor mcp docs", "cursor hook afterFileEdit",
    "cursor plugin notes", "codex mcp repo-docs", "claude-code mcp playwright"
  ]) assert.ok(names.includes(n), "missing " + n);

  const rules = (file) => g.findings.filter((f) => f.file === file).map((f) => f.rule);
  assert.ok(rules("~/.codex/config.toml").includes("configaudit.installed_by_other_app"));
  assert.ok(rules("~/.codex/config.toml").includes("configaudit.remote_mcp"));
  assert.ok(rules("~/.codex/config.toml").includes("configaudit.auto_approved_hook"));
  assert.ok(rules("~/.claude/settings.json").includes("configaudit.installed_by_other_app"));
  assert.ok(rules("~/.cursor/hooks.json").includes("configaudit.auto_approved_hook"));
  assert.ok(g.findings.some((f) => f.rule === "configaudit.remote_mcp" && f.severity === "high" && f.file === ".cursor/mcp.json"));
  assert.ok(!g.findings.some((f) => /check\.py/.test(f.message + (f.evidence || ""))));
  const pre = g.inventory.find((it) => it.name.startsWith("PreToolUse"));
  assert.deepStrictEqual(pre.flags, []);
  const loop = g.inventory.find((it) => it.name === "local-http");
  assert.deepStrictEqual(loop.flags, []);
  const official = g.inventory.find((it) => it.name === "marketplace claude-plugins-official");
  assert.deepStrictEqual(official.flags, []);
  const blob = JSON.stringify(g);
  for (const secret of ["should-not-appear", "sk-testFIXTURE", "user:leak", "secretvalue"]) assert.ok(!blob.includes(secret), secret);
  assert.ok(blob.includes("API_KEY"));
  assert.ok(g.files.some((f) => f.path === "~/.codex/config.toml" && f.status === "read"));
  assert.ok(g.checklist.entries.some((e) => e.vendor === "Google" && /72 hours/.test(e.controls)));
  assert.ok(g.findings.some((f) => f.rule === "configaudit.claude_ua_version" && f.severity === "info"));
});

test("clean home scores 100 and a broken file is reported without hiding the rest", () => {
  const clean = audit({ home: path.join(ROOT, "test", "fixtures", "config-audit", "clean-home") });
  assert.strictEqual(clean.score, 100);
  assert.strictEqual(clean.findings.length, 0);
  assert.strictEqual(clean.inventory.length, 1);
  const broken = audit({ home: path.join(ROOT, "test", "fixtures", "config-audit", "broken-home") });
  assert.ok(broken.findings.some((f) => f.rule === "configaudit.unparsed"));
  assert.ok(broken.inventory.some((it) => it.name === "docs"));
  const empty = fs.mkdtempSync(path.join(os.tmpdir(), "aoc-home-"));
  const none = audit({ home: empty });
  assert.strictEqual(none.score, 100);
  assert.ok(none.findings.some((f) => f.rule === "configaudit.none"));
});

test("a normal project scan does not read the home config audit", () => {
  const r = analyze([path.join(ROOT, "examples", "good-agent")], { noLabs: true });
  assert.ok(!r.groups.some((g) => g.id === "configaudit"));
});

test("CLI writes the report and makes no network calls", () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), "aoc-audit-"));
  const outText = execFileSync(process.execPath, ["--require", path.join(__dirname, "no-network.js"), BIN, "config-audit", "--home", HOME, "--project", PROJECT, "--out", out, "--format", "json,md,html"], { encoding: "utf8" });
  assert.match(outText, /config-audit: score/);
  const html = fs.readFileSync(path.join(out, "index.html"), "utf8");
  assert.match(html, /postman@postman/);
  assert.match(html, /Improve the model for everyone/);
  assert.match(html, /Keep Activity/);
  assert.doesNotMatch(html, /should-not-appear|sk-testFIXTURE/);
  const md = fs.readFileSync(path.join(out, "report.md"), "utf8");
  assert.match(md, /AI coding-tool config audit/);
  assert.doesNotMatch(md, /should-not-appear/);
});

test("data-sharing page cites only the checked vendor docs and leaves unknown defaults blank", () => {
  const doc = sharing.load();
  const md = sharing.toMarkdown(doc);
  const officialHosts = new Set(["help.openai.com", "privacy.claude.com", "code.claude.com", "support.google.com", "help.mistral.ai", "docs.github.com", "cursor.com"]);
  for (const e of doc.entries) {
    assert.ok(e.vendor && e.product && e.where && e.controls, e.vendor);
    for (const u of e.official) {
      const host = new URL(u).host;
      assert.ok(officialHosts.has(host), u);
      assert.ok(md.includes(u), u);
    }
    if (e.report_url) assert.strictEqual(new URL(e.report_url).host, "news.ycombinator.com");
  }
  const by = Object.fromEntries(doc.entries.map((e) => [e.vendor, e]));
  assert.strictEqual(by.Anthropic.default, "");
  assert.strictEqual(by.Google.default, "");
  assert.strictEqual(by.GitHub.default, "");
  assert.match(by.Google.controls, /72 hours/);
  assert.match(by.Google.controls, /Keep Activity/);
  assert.match(by.OpenAI.report, /turned back on/);
  assert.match(by.Mistral.report, /turned back on/);
  assert.match(by.Cursor.default, /Teams: Privacy Mode is on by default/);
  assert.match(by.Cursor.notes, /individual account/);
  assert.doesNotMatch(md, /\bLe Chat\b|TODO|probably|I guess/);
  assert.strictEqual(fs.readFileSync(path.join(ROOT, "docs", "DATA-SHARING.md"), "utf8"), md);
});

test("Claude Code User-Agent check uses the install folder, a disabled privacy mod, and local log lines", () => {
  assert.strictEqual(ua.cmpSemver("2.1.316", "2.1.317"), -1);
  assert.strictEqual(ua.cmpSemver("2.1.317", "2.1.317"), 0);
  assert.strictEqual(ua.highestVersion(["2.1.300", "2.1.400", "notes"]), "2.1.400");
  assert.strictEqual(ua.parseVersion("2.1.211 (Claude Code)\n"), "2.1.211");
  const old = audit({ home: path.join(ROOT, "test", "fixtures", "config-audit", "ua-old") });
  const blob = JSON.stringify(old);
  assert.ok(!blob.includes("person@example.com") && !blob.includes("other@example.com"));
  assert.ok(old.findings.some((f) => f.rule === "configaudit.claude_ua_version" && f.severity === "high" && f.message.includes("2.1.300")));
  assert.ok(old.findings.some((f) => f.rule === "configaudit.claude_ua_privacy" && f.message.includes("cc-plugin-privacy@builtin")));
  const emails = old.findings.filter((f) => f.rule === "configaudit.claude_ua_email");
  assert.strictEqual(emails.length, 2);
  assert.ok(emails.every((f) => f.evidence.includes("***@*** (masked)")));
  const fixed = audit({ home: path.join(ROOT, "test", "fixtures", "config-audit", "ua-fixed") });
  assert.ok(!fixed.findings.some((f) => f.rule === "configaudit.claude_ua_version" && f.severity === "high"));
  assert.ok(!fixed.findings.some((f) => f.rule === "configaudit.claude_ua_privacy" || f.rule === "configaudit.claude_ua_email"));
  assert.ok(!JSON.stringify(fixed).includes("other@example.com"));
  let called = false;
  audit({ home: path.join(ROOT, "test", "fixtures", "config-audit", "ua-fixed"), cli: false, cliRun: () => { called = true; return "1.0.0 (Claude Code)"; } });
  assert.strictEqual(called, false);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "aoc-ua-"));
  fs.mkdirSync(path.join(tmp, ".claude"), { recursive: true });
  fs.writeFileSync(path.join(tmp, ".claude", "settings.json"), "{}\n");
  const viaCli = audit({ home: tmp, cli: true, cliRun: () => "2.1.100 (Claude Code)\n" });
  assert.ok(viaCli.findings.some((f) => f.rule === "configaudit.claude_ua_version" && f.severity === "high" && f.message.includes("2.1.100")));
});

test("launch page shows the checklist and audits the fixture home", async () => {
  let srv, base;
  const started = new Promise((res) => require("../src/ui-server").start({ configHome: HOME, onListen: (s, u) => { srv = s; base = u; res(); } }));
  const log = console.log; console.log = () => {};
  await started; console.log = log;
  const req = (method, p, body, type) => new Promise((res, rej) => {
    const r = http.request(base + p.slice(1), { method, headers: type ? { "content-type": type } : {} }, (x) => {
      let d = ""; x.on("data", (c) => (d += c)); x.on("end", () => res({ status: x.statusCode, body: d }));
    });
    r.on("error", rej); if (body) r.write(body); r.end();
  });
  const home = await req("GET", "/");
  assert.match(home.body, /name=path/);
  assert.match(home.body, /action=\/config-audit/);
  assert.match(home.body, /Allow GitHub to use my data for AI model training/);
  assert.match(home.body, /Help Improve our AI models/);
  assert.match(home.body, /2\.1\.317/);
  const auditPage = await req("POST", "/config-audit", "project=" + encodeURIComponent(PROJECT), "application/x-www-form-urlencoded");
  assert.strictEqual(auditPage.status, 303);
  const report = await req("GET", "/report/index.html");
  assert.match(report.body, /postman@claude-plugins-official/);
  assert.doesNotMatch(report.body, /sk-testFIXTURE/);
  const missing = await req("POST", "/config-audit", "project=" + encodeURIComponent("/no/such/project"), "application/x-www-form-urlencoded");
  assert.strictEqual(missing.status, 400);
  srv.closeAllConnections(); srv.close();
});
