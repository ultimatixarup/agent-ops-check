"use strict";
// Read-only Claude Code User-Agent / account-email check.
// Incident: https://github.com/anthropics/claude-code/issues/107757
// and https://news.ycombinator.com/item?id=50385272
// Partial fix in 2.1.317: built-in cc-plugin-privacy asks before a shell or web
// tool call sends the account email. It does not cover every path.
// Native install layout: https://code.claude.com/docs/en/setup
//   ~/.local/share/claude/versions/<version> and launcher ~/.local/bin/claude
// Plugin on/off: enabledPlugins in settings.json
//   https://code.claude.com/docs/en/plugins/install
// This module never writes a file and never opens a network connection.
const fs = require("fs");
const path = require("path");

const FIX = "2.1.317";
const ISSUE = "https://github.com/anthropics/claude-code/issues/107757";
const HN = "https://news.ycombinator.com/item?id=50385272";
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const SEMVER = /^\d+\.\d+\.\d+$/;

function cmpSemver(a, b) {
  const pa = String(a).split(".").map((n) => parseInt(n, 10) || 0);
  const pb = String(b).split(".").map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < 3; i++) {
    if (pa[i] !== pb[i]) return pa[i] - pb[i];
  }
  return 0;
}

function parseVersion(text) {
  const m = String(text || "").match(/\b(\d+\.\d+\.\d+)\b/);
  return m ? m[1] : "";
}

function maskEmails(s) {
  return String(s == null ? "" : s).replace(EMAIL, "***@*** (masked)");
}

function isUaLine(line) {
  if (/user-agent\s*:/i.test(line)) return true;
  return /\bcurl\b/i.test(line) && /(?:\s-A(?:\s|=)|--user-agent(?:\s|=))/i.test(line);
}

function uaEmailLines(text) {
  const out = [];
  String(text || "").split(/\r?\n/).forEach((line, i) => {
    if (!isUaLine(line)) return;
    EMAIL.lastIndex = 0;
    if (!EMAIL.test(line)) return;
    out.push({ line: i + 1, evidence: maskEmails(line).slice(0, 180) });
  });
  return out;
}

function highestVersion(list) {
  return list.filter((v) => SEMVER.test(v)).sort(cmpSemver).pop() || "";
}

function versionFromPath(target) {
  const m = String(target || "").match(/versions[\\/](\d+\.\d+\.\d+)(?:[\\/]|$)/);
  return m ? m[1] : "";
}

function readLauncherVersion(home) {
  const bin = path.join(home, ".local", "bin");
  for (const name of ["claude", "claude.exe"]) {
    const file = path.join(bin, name);
    try {
      const target = fs.readlinkSync(file);
      const v = versionFromPath(target) || versionFromPath(path.resolve(bin, target));
      if (v) return { version: v, how: "launcher symlink " + name };
    } catch (_) { /* not a symlink, or absent */ }
  }
  return null;
}

function readVersionsDir(home) {
  const dir = path.join(home, ".local", "share", "claude", "versions");
  if (!fs.existsSync(dir)) return [];
  try { return fs.readdirSync(dir).filter((n) => SEMVER.test(n)); }
  catch (_) { return []; }
}

function defaultCliRun() {
  const { spawnSync } = require("child_process");
  const names = process.platform === "win32" ? ["claude.cmd", "claude.exe", "claude"] : ["claude"];
  for (const name of names) {
    let r;
    try { r = spawnSync(name, ["--version"], { encoding: "utf8", timeout: 3000, windowsHide: true }); }
    catch (_) { continue; }
    if (!r || (r.error && r.error.code === "ENOENT")) continue;
    const text = (r.stdout || "") + "\n" + (r.stderr || "");
    if (parseVersion(text)) return text;
  }
  return "";
}

function readJson(file) {
  try {
    const buf = fs.readFileSync(file);
    if (buf.length > 1024 * 1024 || buf.includes(0)) return null;
    return JSON.parse(buf.toString("utf8"));
  } catch (_) { return null; }
}

function privacyOffEntries(data) {
  const hits = [];
  const ep = data && data.enabledPlugins;
  if (ep && typeof ep === "object" && !Array.isArray(ep)) {
    for (const [k, v] of Object.entries(ep)) if (/cc-plugin-privacy/i.test(k) && v === false) hits.push(k);
  }
  const plugins = data && data.plugins;
  if (plugins && typeof plugins === "object" && !Array.isArray(plugins)) {
    for (const [k, v] of Object.entries(plugins)) {
      const rows = Array.isArray(v) ? v : [v];
      if (/cc-plugin-privacy/i.test(k) && rows.some((row) => row && row.enabled === false)) hits.push(k);
    }
  }
  return hits;
}

function probeFiles(claudeDir) {
  const out = [];
  const take = (file) => {
    const base = path.basename(file);
    if (/^(settings\.json|settings\.local\.json|installed_plugins\.json)$/i.test(base)) return;
    if (!/ua-probe|user-agent|\.log$/i.test(base)) return;
    out.push(file);
  };
  if (!fs.existsSync(claudeDir)) return out;
  let ents = [];
  try { ents = fs.readdirSync(claudeDir, { withFileTypes: true }); } catch (_) { return out; }
  for (const ent of ents) {
    const p = path.join(claudeDir, ent.name);
    if (ent.isFile()) take(p);
  }
  const debug = path.join(claudeDir, "debug");
  if (fs.existsSync(debug)) {
    let logs = [];
    try { logs = fs.readdirSync(debug); } catch (_) { logs = []; }
    for (const name of logs) {
      if (!/\.(txt|log)$/i.test(name)) continue;
      out.push(path.join(debug, name));
      if (out.length >= 20) break;
    }
  }
  return out.slice(0, 20);
}

function readProbe(file) {
  try {
    const st = fs.statSync(file);
    if (!st.isFile() || st.size > 256 * 1024) return "";
    const buf = fs.readFileSync(file);
    if (buf.includes(0)) return "";
    return buf.toString("utf8");
  } catch (_) { return ""; }
}

function claudePresent(home, project, claudeDir) {
  const candidates = [
    claudeDir,
    path.join(home, ".claude.json"),
    path.join(home, ".local", "share", "claude"),
    path.join(home, ".local", "bin", "claude"),
    path.join(home, ".local", "bin", "claude.exe")
  ];
  if (project) candidates.push(path.join(project, ".claude"), path.join(project, ".mcp.json"));
  return candidates.some((p) => {
    try { return fs.existsSync(p); } catch (_) { return false; }
  });
}

function check(opts) {
  const o = opts || {};
  const home = o.home;
  const project = o.project || "";
  const claudeDir = o.claudeDir || path.join(home, ".claude");
  const disp = o.display || ((f) => f);
  const findings = [];
  if (!home) return findings;

  const linked = readLauncherVersion(home);
  const listed = readVersionsDir(home);
  let version = "";
  let how = "";
  if (linked) { version = linked.version; how = linked.how; }
  else if (listed.length) {
    version = highestVersion(listed);
    how = "highest folder under ~/.local/share/claude/versions (launcher symlink not found, so this may not be the binary that runs)";
  } else if (o.cli) {
    const text = (o.cliRun || defaultCliRun)();
    version = parseVersion(text);
    if (version) how = "claude --version";
  }

  if (version && cmpSemver(version, FIX) < 0) {
    findings.push({
      rule: "configaudit.claude_ua_version", severity: "high",
      file: disp(path.join(home, ".local", "share", "claude", "versions")), line: 0,
      message: "Claude Code " + version + " is older than " + FIX + " (" + how + "). " + FIX + " added the built-in cc-plugin-privacy mod, on by default, which asks before a shell or web tool call sends the account email in a User-Agent. The mod is a partial check. Issue " + ISSUE + " and " + HN + ".",
      evidence: version
    });
  } else if (!version && claudePresent(home, project, claudeDir)) {
    findings.push({
      rule: "configaudit.claude_ua_version", severity: "info",
      file: disp(claudeDir), line: 0,
      message: "Claude Code files are present, but no install version was read from ~/.local/share/claude/versions" + (o.cli ? " or from claude --version" : " (claude --version is not run for a --home fixture)") + ". The comparison with " + FIX + " did not run.",
      evidence: ""
    });
  }

  const settings = [
    path.join(claudeDir, "settings.json"),
    project ? path.join(project, ".claude", "settings.json") : "",
    project ? path.join(project, ".claude", "settings.local.json") : "",
    path.join(claudeDir, "plugins", "installed_plugins.json")
  ].filter(Boolean);
  for (const file of settings) {
    if (!fs.existsSync(file)) continue;
    const data = readJson(file);
    if (!data) continue;
    for (const id of privacyOffEntries(data)) {
      findings.push({
        rule: "configaudit.claude_ua_privacy", severity: "high",
        file: disp(file), line: 0,
        message: id + " is disabled. cc-plugin-privacy is the 2.1.317 mod that asks before a shell or web tool call sends the account email in a User-Agent. It is on by default; a false enabledPlugins entry turns that prompt off. " + ISSUE,
        evidence: id
      });
    }
  }

  const dirs = [claudeDir];
  if (project) dirs.push(path.join(project, ".claude"));
  for (const dir of dirs) {
    for (const file of probeFiles(dir)) {
      const text = readProbe(file);
      if (!text) continue;
      for (const hit of uaEmailLines(text)) {
        findings.push({
          rule: "configaudit.claude_ua_email", severity: "high",
          file: disp(file), line: hit.line,
          message: "A local log line has an email-like address in a User-Agent or a curl -A value. The address is not printed. Claude Code has put the signed-in account email in User-Agent headers sent to sites (" + ISSUE + ", " + HN + ").",
          evidence: hit.evidence
        });
      }
    }
  }
  return findings;
}

module.exports = { check, cmpSemver, parseVersion, maskEmails, isUaLine, uaEmailLines, highestVersion, FIX };
