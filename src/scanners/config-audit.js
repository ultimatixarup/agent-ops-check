"use strict";
// Read-only inventory of Codex, Claude Code, and Cursor plugins, hooks, and MCP servers.
// Locations, from the vendor docs checked for this file:
//   Codex user:  ~/.codex/config.toml and ~/.codex/hooks.json
//                https://developers.openai.com/codex/config-reference
//                https://learn.chatgpt.com/docs/hooks
//   Codex project: <project>/.codex/config.toml and <project>/.codex/hooks.json
//   Plugin hooks: hooks/hooks.json or the path in .codex-plugin/plugin.json, under a plugin root.
//   Claude Code user settings: ~/.claude/settings.json
//   Claude Code project: <project>/.claude/settings.json and <project>/.claude/settings.local.json
//                https://code.claude.com/docs/en/settings
//                https://code.claude.com/docs/en/hooks
//   Claude Code MCP: ~/.claude.json (user mcpServers, and projects.<path>.mcpServers) and <project>/.mcp.json
//                https://code.claude.com/docs/en/mcp
//   Claude Code plugins: ~/.claude/plugins/ and enabledPlugins in settings.json
//   Cursor MCP: ~/.cursor/mcp.json and <project>/.cursor/mcp.json
//                https://cursor.com/docs/mcp
//   Cursor hooks: ~/.cursor/hooks.json and <project>/.cursor/hooks.json
//                https://cursor.com/docs/hooks
//   Cursor plugins: ~/.cursor/plugins/local/<name>/
//                https://cursor.com/docs/plugins
//   Cursor managed hooks, only when auditing the real machine (not a --home fixture):
//     macOS /Library/Application Support/Cursor/hooks.json
//     Linux /etc/cursor/hooks.json
//     Windows C:\ProgramData\Cursor\hooks.json
// CODEX_HOME and CLAUDE_CONFIG_DIR are honored only when opts.env is true.
// This module never writes a config file and never opens a network connection.
const fs = require("fs");
const path = require("path");
const { parseToml, lineAt } = require("../toml-lite");
const sharing = require("../data-sharing");

const MAX_BYTES = 8 * 1024 * 1024;
const POSTMAN = "https://github.com/postmanlabs/postman-app-support/issues/14370";
const W = { high: 10, medium: 4, low: 1, info: 0 };
const STARTUP = /^(sessionstart|setup|startup|userpromptsubmit|beforesubmitprompt|workspaceopen)$/i;

function display(home, project, file) {
  const abs = path.resolve(file);
  const h = path.resolve(home);
  if (abs === h || abs.startsWith(h + path.sep)) return "~/" + path.relative(h, abs).split(path.sep).join("/");
  if (project) {
    const p = path.resolve(project);
    if (abs === p || abs.startsWith(p + path.sep)) return path.relative(p, abs).split(path.sep).join("/");
  }
  return abs;
}

function mask(s) {
  return String(s == null ? "" : s)
    .replace(/\b(sk-[A-Za-z0-9_-]{6,})/g, "sk-…(masked)")
    .replace(/\b(ghp_[A-Za-z0-9]{6,})/g, "ghp_…(masked)")
    .replace(/\b(github_pat_[A-Za-z0-9_]{6,})/g, "github_pat_…(masked)")
    .replace(/\b(AKIA[0-9A-Z]{8,})/g, "AKIA…(masked)")
    .replace(/(Bearer\s+)\S+/gi, "$1(masked)");
}

function redactUrl(raw) {
  const s = String(raw || "").trim();
  if (!s) return "";
  try {
    const u = new URL(s);
    u.username = "";
    u.password = "";
    u.search = "";
    u.hash = "";
    return u.toString();
  } catch (_) {
    return s.replace(/[?#].*$/, "").replace(/\/\/[^/@]+@/, "//");
  }
}

function remoteOf(url) {
  if (!url) return null;
  let u;
  try { u = new URL(url); } catch (_) { return null; }
  if (!/^https?:$/.test(u.protocol) && !/^wss?:$/.test(u.protocol)) return null;
  const host = u.hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (host === "localhost" || host === "127.0.0.1" || host === "::1") return null;
  return { host, cleartext: u.protocol === "http:" || u.protocol === "ws:" };
}

function foreignApp(command) {
  const c = String(command || "");
  let m = c.match(/[\\/]Applications[\\/]([^\\/]+)\.app[\\/]/i);
  if (m && !/^(codex|claude|cursor)/i.test(m[1])) return m[0];
  m = c.match(/Application Support[\\/]([^\\/]+)[\\/]/i);
  if (m && !/^(codex|claude|cursor|claudecode)/i.test(m[1])) return m[0];
  m = c.match(/Program Files(?: \(x86\))?[\\/]([^\\/]+)[\\/]/i);
  if (m && !/^(codex|claude|cursor)/i.test(m[1])) return m[0];
  return "";
}

function postmanBlob(item) {
  return [item.name, item.id, item.url, item.command, item.source, item.detail, item.file].filter(Boolean).join("\n");
}

function isPostman(item) {
  const b = postmanBlob(item);
  return /mcp\.postman\.com/i.test(b)
    || /postmanlabs\/postman-plugin/i.test(b)
    || /postman@postman\b/i.test(b)
    || /postman@claude-plugins-official/i.test(b)
    || /@postman\/postman-plugin/i.test(b)
    || /[\\/]Postman\.app[\\/]/i.test(b)
    || /Application Support[\\/]Postman[\\/]/i.test(b)
    || /[\\/](marketplaces|plugins|cache)[\\/]postman[\\/]/i.test(b);
}

function norm(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9]/g, ""); }

function hookEvents(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return [];
  const out = [];
  for (const [event, groups] of Object.entries(obj)) {
    if (event === "state" || !Array.isArray(groups)) continue;
    for (const g of groups) {
      if (!g || typeof g !== "object") continue;
      const nested = Array.isArray(g.hooks) ? g.hooks : [g];
      for (const h of nested) {
        if (!h || typeof h !== "object") continue;
        if (!h.command && !h.command_windows && !h.commandWindows && h.type !== "mcp_tool" && !h.tool) continue;
        out.push({
          event,
          matcher: g.matcher || h.matcher || "",
          type: h.type || (h.command || h.command_windows || h.commandWindows ? "command" : ""),
          command: h.command || h.command_windows || h.commandWindows || (h.type === "mcp_tool" ? (h.server || "") + " " + (h.tool || "") : ""),
          server: h.server || "",
          tool: h.tool || ""
        });
      }
    }
  }
  return out;
}

function hookRoot(data) {
  if (data && data.hooks && typeof data.hooks === "object" && !Array.isArray(data.hooks)) {
    const inner = Object.assign({}, data.hooks);
    return inner;
  }
  return data && typeof data === "object" ? data : {};
}

function trustList(state) {
  if (!state || typeof state !== "object" || Array.isArray(state)) return [];
  return Object.entries(state).map(([key, val]) => ({
    key,
    hash: val && typeof val === "object" ? String(val.trusted_hash || val.trustedHash || "") : "",
    enabled: !(val && typeof val === "object" && val.enabled === false)
  })).filter((r) => r.hash || r.key);
}

function envNames(env) {
  if (!env || typeof env !== "object" || Array.isArray(env)) return [];
  return Object.keys(env);
}

function argList(args) {
  if (!Array.isArray(args)) return "";
  return args.map((a) => mask(typeof a === "string" ? a : JSON.stringify(a))).join(" ");
}

function serverUrl(spec) {
  if (!spec || typeof spec !== "object") return "";
  return redactUrl(spec.url || spec.serverUrl || spec.httpUrl || "");
}

function serverCommand(spec) {
  if (!spec || typeof spec !== "object") return "";
  const cmd = spec.command || "";
  const args = argList(spec.args);
  return mask([cmd, args].filter(Boolean).join(" ")).slice(0, 300);
}

function inside(root, target) {
  const r = path.resolve(root);
  const t = path.resolve(target);
  return t === r || t.startsWith(r + path.sep);
}

function audit(opts) {
  const o = opts || {};
  if (!o.home) throw new Error("config audit needs a home directory");
  const home = path.resolve(o.home);
  const project = o.project ? path.resolve(o.project) : "";
  const useEnv = !!o.env;
  const codexDir = useEnv && process.env.CODEX_HOME ? path.resolve(process.env.CODEX_HOME) : path.join(home, ".codex");
  const claudeDir = useEnv && process.env.CLAUDE_CONFIG_DIR ? path.resolve(process.env.CLAUDE_CONFIG_DIR) : path.join(home, ".claude");
  const claudeJsonPath = useEnv && process.env.CLAUDE_CONFIG_DIR ? path.join(path.resolve(process.env.CLAUDE_CONFIG_DIR), ".claude.json") : path.join(home, ".claude.json");
  const cursorDir = path.join(home, ".cursor");

  const files = [];
  const items = [];
  const findings = [];
  const seen = new Set();
  let sharingDoc = null;
  try { sharingDoc = sharing.load(); } catch (_) { sharingDoc = null; }

  function disp(file) { return display(home, project, file); }
  function addFile(file, status, error) {
    files.push({ path: disp(file), status, error: error || "" });
  }
  function addItem(it) { items.push(it); }

  function readRaw(file, recordAbsent) {
    const key = path.resolve(file);
    if (seen.has(key)) return null;
    seen.add(key);
    let st;
    try { st = fs.statSync(file); }
    catch (e) {
      if (recordAbsent && e.code === "ENOENT") addFile(file, "absent");
      else if (e.code !== "ENOENT") { addFile(file, "error", e.code || e.message); findings.push(unparsed(file, 0, "Could not read this file (" + (e.code || "error") + "). Entries in it were not listed.", "low")); }
      return null;
    }
    if (!st.isFile()) { addFile(file, "error", "not a file"); return null; }
    if (st.size > MAX_BYTES) {
      addFile(file, "error", "larger than 8 MB");
      findings.push(unparsed(file, 0, "File is larger than 8 MB, so it was not read. Entries in it were not listed.", "medium"));
      return null;
    }
    let buf;
    try { buf = fs.readFileSync(file); }
    catch (e) {
      addFile(file, "error", e.code || e.message);
      findings.push(unparsed(file, 0, "Could not read this file (" + (e.code || "error") + "). Entries in it were not listed.", "low"));
      return null;
    }
    if (buf.includes(0)) { addFile(file, "error", "binary"); return null; }
    addFile(file, "read");
    return buf.toString("utf8");
  }

  function unparsed(file, line, message, severity) {
    return { rule: "configaudit.unparsed", severity: severity || "medium", file: disp(file), line: line || 0, message, evidence: "" };
  }

  function readJson(file, recordAbsent) {
    const text = readRaw(file, recordAbsent);
    if (text == null) return null;
    try { return { data: JSON.parse(text), text }; }
    catch (e) {
      findings.push(unparsed(file, 0, "Could not parse JSON (" + e.message + "). Entries in this file were not listed.", "medium"));
      return null;
    }
  }
  function readToml(file, recordAbsent) {
    const text = readRaw(file, recordAbsent);
    if (text == null) return null;
    try { const parsed = parseToml(text); parsed.text = text; return parsed; }
    catch (e) {
      findings.push(unparsed(file, e.line || 0, "Could not parse TOML (" + e.message + "). Entries in this file were not listed.", "medium"));
      return null;
    }
  }

  function lineOf(text, needle) {
    if (!text || !needle) return 0;
    const i = text.indexOf(needle);
    if (i < 0) return 0;
    let n = 1;
    for (let k = 0; k < i; k++) if (text[k] === "\n") n++;
    return n;
  }

  function addMcp(tool, scope, file, name, spec, line) {
    if (!spec || typeof spec !== "object" || Array.isArray(spec)) return;
    const url = serverUrl(spec);
    const command = serverCommand(spec);
    const names = envNames(spec.env);
    const enabled = spec.enabled !== false && spec.disabled !== true;
    const bits = [];
    if (url) bits.push("url " + url);
    if (command) bits.push("command " + command);
    if (names.length) bits.push("env names " + names.join(", "));
    if (!enabled) bits.push("disabled");
    addItem({
      tool, kind: "mcp", name: String(name), scope, file: disp(file), line: line || 0,
      detail: bits.join("; ") || "no command or url",
      url, command, source: "", id: String(name), event: "", matcher: "",
      trusted: false, trustedHash: "", enabled, startup: false
    });
  }

  function addHooks(tool, scope, file, events, text, trust) {
    const list = hookEvents(events);
    const trusts = trust || [];
    const used = new Set();
    for (const h of list) {
      const command = mask(h.command).slice(0, 300);
      const startup = STARTUP.test(h.event);
      const match = trusts.find((t) => !used.has(t.key) && norm(t.key).includes(norm(path.basename(file))) && norm(t.key).includes(norm(h.event)));
      if (match) used.add(match.key);
      const line = lineOf(text, h.command) || lineOf(text, h.event) || 0;
      addItem({
        tool, kind: "hook", name: h.event + (h.matcher ? " matcher " + h.matcher : ""),
        scope, file: disp(file), line,
        detail: [h.type, command, match && match.hash ? "trusted_hash " + match.hash : ""].filter(Boolean).join("; "),
        url: "", command, source: "", id: "", event: h.event, matcher: String(h.matcher || ""),
        trusted: !!(match && match.hash), trustedHash: match && match.hash || "", enabled: true, startup
      });
    }
    for (const t of trusts) {
      if (used.has(t.key)) continue;
      const startup = /sessionstart|startup|userpromptsubmit/i.test(t.key);
      addItem({
        tool, kind: "hook", name: t.key, scope, file: disp(file), line: lineOf(text, t.key) || 0,
        detail: "trusted_hash " + (t.hash || "(none)") + (t.enabled ? "" : "; disabled"),
        url: "", command: "", source: "", id: t.key, event: startup ? "SessionStart" : "", matcher: "",
        trusted: !!t.hash, trustedHash: t.hash || "", enabled: t.enabled, startup
      });
    }
  }

  function addPlugin(tool, scope, file, name, detail, extra) {
    const x = extra || {};
    addItem({
      tool, kind: x.kind || "plugin", name, scope, file: disp(file), line: x.line || 0,
      detail, url: x.url || "", command: x.command || "", source: x.source || "", id: x.id || name,
      event: "", matcher: "", trusted: false, trustedHash: "", enabled: x.enabled !== false, startup: false
    });
  }

  function codexConfig(file, parsed, scope) {
    if (!parsed) return;
    const data = parsed.data || {};
    const marks = parsed.marks || [];
    const servers = data.mcp_servers;
    if (servers && typeof servers === "object") {
      for (const [name, spec] of Object.entries(servers)) addMcp("codex", scope, file, name, spec, lineAt(marks, [name, "url"]) || lineAt(marks, [name, "command"]) || lineAt(marks, [name]));
    }
    const plugins = data.plugins;
    if (plugins && typeof plugins === "object") {
      for (const [id, spec] of Object.entries(plugins)) {
        if (id === "_default") continue;
        const enabled = !spec || typeof spec !== "object" || spec.enabled !== false;
        addPlugin("codex", scope, file, id, (enabled ? "enabled" : "disabled") + " plugin", { id, enabled, line: lineAt(marks, [id]) });
      }
    }
    const markets = data.marketplaces;
    if (markets && typeof markets === "object") {
      for (const [name, spec] of Object.entries(markets)) {
        if (!spec || typeof spec !== "object" || Array.isArray(spec)) continue;
        const source = String(spec.source || spec.url || "");
        addPlugin("codex", scope, file, "marketplace " + name, ["source " + source, spec.source_type || spec.sourceType || "", spec.ref ? "ref " + spec.ref : ""].filter(Boolean).join("; "), { kind: "marketplace", source, id: name, line: lineAt(marks, [name]) });
      }
    }
    const hooks = data.hooks && typeof data.hooks === "object" ? data.hooks : {};
    const state = hooks.state;
    const events = Object.assign({}, hooks);
    delete events.state;
    addHooks("codex", scope, file, events, parsed.text || "", trustList(state));
  }

  function jsonMcpMap(tool, scope, file, data, text, key) {
    const map = data && data[key || "mcpServers"];
    if (!map || typeof map !== "object" || Array.isArray(map)) return;
    for (const [name, spec] of Object.entries(map)) addMcp(tool, scope, file, name, spec, lineOf(text, '"' + name + '"'));
  }

  function claudeSettings(file, parsed, scope) {
    if (!parsed) return;
    const data = parsed.data;
    const text = parsed.text;
    const enabled = data.enabledPlugins;
    if (enabled && typeof enabled === "object") {
      for (const [id, on] of Object.entries(enabled)) addPlugin("claude-code", scope, file, id, on === false ? "disabled in enabledPlugins" : "enabled in enabledPlugins", { id, enabled: on !== false, line: lineOf(text, id) });
    }
    const markets = data.extraKnownMarketplaces;
    if (markets && typeof markets === "object") {
      for (const [name, spec] of Object.entries(markets)) {
        const src = spec && spec.source;
        const repo = src && (src.repo || src.url) || "";
        addPlugin("claude-code", scope, file, "marketplace " + name, "source " + (repo || (src && src.source) || ""), { kind: "marketplace", source: String(repo), id: name, line: lineOf(text, name) });
      }
    }
    if (data.hooks) addHooks("claude-code", scope, file, hookRoot({ hooks: data.hooks }), text, []);
    jsonMcpMap("claude-code", scope, file, data, text);
  }

  function claudeJson(file, parsed) {
    if (!parsed) return;
    const data = parsed.data;
    const text = parsed.text;
    jsonMcpMap("claude-code", "user", file, data, text);
    const projects = data.projects;
    if (projects && typeof projects === "object") {
      for (const [proj, body] of Object.entries(projects)) {
        if (!body || typeof body !== "object") continue;
        const map = body.mcpServers;
        if (!map || typeof map !== "object") continue;
        for (const [name, spec] of Object.entries(map)) addMcp("claude-code", "local", file, name + " (" + proj + ")", spec, lineOf(text, '"' + name + '"'));
      }
    }
  }

  function cursorMcp(file, parsed, scope) {
    if (!parsed) return;
    jsonMcpMap("cursor", scope, file, parsed.data, parsed.text);
  }
  function cursorHooks(file, parsed, scope) {
    if (!parsed) return;
    addHooks("cursor", scope, file, hookRoot(parsed.data), parsed.text, []);
  }

  function pluginManifest(tool, file, parsed) {
    if (!parsed) return;
    const data = parsed.data;
    const name = data.name || data.displayName || path.basename(path.dirname(file));
    addPlugin(tool, "plugin", file, name, "plugin manifest", { id: name, line: lineOf(parsed.text, name) });
    if (typeof data.hooks === "string") {
      const root = path.dirname(file);
      const rel = data.hooks.replace(/^\.\//, "");
      const target = path.resolve(root, rel);
      if (inside(root, target)) {
        const hooks = readJson(target, false);
        if (hooks) addHooks(tool, "plugin", target, hookRoot(hooks.data), hooks.text, []);
      }
    } else if (data.hooks && typeof data.hooks === "object") addHooks(tool, "plugin", file, hookRoot({ hooks: data.hooks }), parsed.text, []);
    jsonMcpMap(tool, "plugin", file, data, parsed.text);
  }

  function installedPlugins(file, parsed) {
    if (!parsed) return;
    const data = parsed.data;
    const text = parsed.text;
    const map = data.plugins || data;
    if (!map || typeof map !== "object") return;
    const entries = Array.isArray(map) ? map.map((p) => [p && (p.name || p.id) || "plugin", p]) : Object.entries(map);
    for (const [id, val] of entries) {
      const rows = Array.isArray(val) ? val : [val];
      for (const row of rows) {
        if (id === "plugins" && row === data.plugins) continue;
        const version = row && row.version ? "version " + row.version : "";
        const scope = row && row.scope ? String(row.scope) : "user";
        addPlugin("claude-code", scope, file, String(id), ["installed plugin", version, scope].filter(Boolean).join("; "), { id: String(id), line: lineOf(text, String(id)) });
        const installPath = row && (row.installPath || row.path);
        if (typeof installPath === "string" && installPath && !installPath.includes("\0")) readPluginDir("claude-code", installPath);
      }
    }
  }

  const PLUGIN_FILES = new Set(["plugin.json", "hooks.json", "codex-hooks.json", "mcp.json", "mcp.codex.json", ".mcp.json"]);

  function takePluginFile(tool, file) {
    const base = path.basename(file);
    if (base === "plugin.json") {
      const parsed = readJson(file, false);
      if (parsed) pluginManifest(tool, file, parsed);
      return;
    }
    if (base === "hooks.json" || base === "codex-hooks.json") {
      const parsed = readJson(file, false);
      if (parsed) addHooks(tool, "plugin", file, hookRoot(parsed.data), parsed.text, []);
      return;
    }
    const parsed = readJson(file, false);
    if (!parsed) return;
    if (parsed.data.mcpServers) jsonMcpMap(tool, "plugin", file, parsed.data, parsed.text);
    else if (parsed.data.url || parsed.data.command) addMcp(tool, "plugin", file, path.basename(path.dirname(file)), parsed.data, lineOf(parsed.text, parsed.data.url || parsed.data.command));
  }

  function walk(root, tool) {
    if (!root || !fs.existsSync(root)) return;
    const stack = [{ dir: root, depth: 0 }];
    let n = 0;
    while (stack.length) {
      const { dir, depth } = stack.pop();
      if (depth > 8 || n > 200) return;
      let ents;
      try { ents = fs.readdirSync(dir, { withFileTypes: true }); }
      catch (_) { continue; }
      for (const ent of ents) {
        if (ent.name === "node_modules" || ent.name === ".git" || ent.name === "sessions" || ent.name === "session") continue;
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) stack.push({ dir: p, depth: depth + 1 });
        else if (PLUGIN_FILES.has(ent.name) || ent.name === ".mcp.json") { n++; takePluginFile(tool, p); }
      }
    }
  }

  function readPluginDir(tool, root) {
    if (!root || !fs.existsSync(root)) return;
    let st;
    try { st = fs.statSync(root); } catch (_) { return; }
    if (!st.isDirectory()) return;
    for (const rel of ["hooks/hooks.json", "hooks/codex-hooks.json", ".mcp.json", "mcp.json", "mcp.codex.json", "plugin.json", ".codex-plugin/plugin.json", ".cursor-plugin/plugin.json"]) {
      const p = path.join(root, rel);
      if (fs.existsSync(p)) takePluginFile(tool, p);
    }
  }

  // Explicit config files. Absent paths are listed so the report shows what was looked for.
  const codexToml = readToml(path.join(codexDir, "config.toml"), true);
  codexConfig(path.join(codexDir, "config.toml"), codexToml, "user");
  const codexHooks = readJson(path.join(codexDir, "hooks.json"), true);
  if (codexHooks) addHooks("codex", "user", path.join(codexDir, "hooks.json"), hookRoot(codexHooks.data), codexHooks.text, []);
  walk(path.join(codexDir, "plugins"), "codex");
  walk(path.join(codexDir, ".tmp", "marketplaces"), "codex");

  const claudeUser = readJson(path.join(claudeDir, "settings.json"), true);
  claudeSettings(path.join(claudeDir, "settings.json"), claudeUser, "user");
  const claudeState = readJson(claudeJsonPath, true);
  claudeJson(claudeJsonPath, claudeState);
  const installed = readJson(path.join(claudeDir, "plugins", "installed_plugins.json"), true);
  installedPlugins(path.join(claudeDir, "plugins", "installed_plugins.json"), installed);
  walk(path.join(claudeDir, "plugins"), "claude-code");

  const cursorMcpFile = path.join(cursorDir, "mcp.json");
  cursorMcp(cursorMcpFile, readJson(cursorMcpFile, true), "user");
  const cursorHooksFile = path.join(cursorDir, "hooks.json");
  cursorHooks(cursorHooksFile, readJson(cursorHooksFile, true), "user");
  walk(path.join(cursorDir, "plugins"), "cursor");

  if (project) {
    const pairs = [
      [path.join(project, ".codex", "config.toml"), "toml", "codex"],
      [path.join(project, ".codex", "hooks.json"), "codex-hooks"],
      [path.join(project, ".claude", "settings.json"), "claude"],
      [path.join(project, ".claude", "settings.local.json"), "claude-local"],
      [path.join(project, ".mcp.json"), "mcp"],
      [path.join(project, ".cursor", "mcp.json"), "cursor-mcp"],
      [path.join(project, ".cursor", "hooks.json"), "cursor-hooks"]
    ];
    for (const [file, kind] of pairs) {
      if (kind === "toml") codexConfig(file, readToml(file, true), "project");
      else if (kind === "codex-hooks") {
        const parsed = readJson(file, true);
        if (parsed) addHooks("codex", "project", file, hookRoot(parsed.data), parsed.text, []);
      } else if (kind === "claude" || kind === "claude-local") claudeSettings(file, readJson(file, true), kind === "claude-local" ? "local" : "project");
      else if (kind === "mcp") {
        const parsed = readJson(file, true);
        if (parsed) jsonMcpMap("claude-code", "project", file, parsed.data, parsed.text);
      } else if (kind === "cursor-mcp") cursorMcp(file, readJson(file, true), "project");
      else if (kind === "cursor-hooks") cursorHooks(file, readJson(file, true), "project");
    }
    walk(path.join(project, ".claude", "plugins"), "claude-code");
    walk(path.join(project, ".cursor", "plugins"), "cursor");
    walk(path.join(project, ".codex"), "codex");
  }

  if (o.system) {
    const managed = [
      "/Library/Application Support/Cursor/hooks.json",
      "/etc/cursor/hooks.json",
      "C:\\ProgramData\\Cursor\\hooks.json"
    ];
    for (const file of managed) {
      if (!fs.existsSync(file)) { addFile(file, "absent"); continue; }
      cursorHooks(file, readJson(file, false), "managed");
    }
  }

  // Join Codex trust records onto plugin hooks that were read from another file.
  const trustItems = items.filter((it) => it.tool === "codex" && it.kind === "hook" && it.trustedHash && !it.command);
  for (const hook of items) {
    if (hook.tool !== "codex" || hook.kind !== "hook" || hook.trusted) continue;
    const hit = trustItems.find((t) => norm(t.name).includes(norm(path.basename(hook.file))) && hook.event && norm(t.name).includes(norm(hook.event)));
    if (!hit) continue;
    hook.trusted = true;
    hook.trustedHash = hit.trustedHash;
    hook.detail = [hook.detail, "trusted_hash " + hit.trustedHash].filter(Boolean).join("; ");
    hit._merged = true;
  }

  const kept = [];
  const seenFinding = new Set();
  function pushFinding(f) {
    const k = [f.rule, f.file, f.message].join("|");
    if (seenFinding.has(k)) return;
    seenFinding.add(k);
    findings.push(f);
  }

  for (const it of items) {
    if (it._merged) continue;
    kept.push(it);
    const labels = [];
    const post = isPostman(it);
    const foreign = foreignApp(it.command);
    if (post || foreign) {
      labels.push(post ? "other app (Postman fingerprint)" : "other app path");
      const sev = post && it.enabled !== false ? "high" : "medium";
      const why = post
        ? "This entry matches the Postman desktop install fingerprint (plugin id, marketplace, mcp.postman.com, or a Postman application path). Postman's app has written a plugin, a pre-trusted startup hook, and a remote MCP server into Codex and Claude Code (" + POSTMAN + "). This check did not see who wrote the file."
        : "The hook command points at another application's files (" + foreign + "). Another app may have added it. This check did not see who wrote the file.";
      pushFinding({ rule: "configaudit.installed_by_other_app", severity: sev, file: it.file, line: it.line, message: it.tool + " " + it.kind + " '" + it.name + "'. " + why + " Confirm you added it before you trust it.", evidence: mask(it.url || it.command || it.source || it.name).slice(0, 180) });
    }
    if (it.kind === "mcp") {
      const remote = remoteOf(it.url);
      if (remote) {
        labels.push(remote.cleartext ? "remote MCP (not https)" : "remote MCP");
        pushFinding({
          rule: "configaudit.remote_mcp",
          severity: remote.cleartext ? "high" : "medium",
          file: it.file, line: it.line,
          message: it.tool + " MCP server '" + it.name + "' calls " + it.url + (it.enabled === false ? " (disabled)" : "") + ". The server is not on this machine" + (remote.cleartext ? ", and the URL is not https or wss" : "") + ". This check cannot see who added it.",
          evidence: it.url
        });
      }
    }
    if (it.kind === "hook" && (it.startup || it.trusted)) {
      const strong = it.trusted || post || !!foreign;
      labels.push(it.trusted ? "pre-approved hook" : "startup hook");
      const bits = [];
      if (it.startup) bits.push(it.event + " runs when a session or prompt starts");
      if (it.trusted) bits.push("a trusted_hash is stored (" + it.trustedHash + "), so Codex can run this hook without asking you to approve the current definition");
      if (!it.trusted) bits.push("no trusted_hash for this hook was found in the files that were read");
      pushFinding({
        rule: "configaudit.auto_approved_hook",
        severity: strong ? "high" : "medium",
        file: it.file, line: it.line,
        message: it.tool + " hook '" + it.name + "'. " + bits.join("; ") + ". Confirm you added it.",
        evidence: mask(it.command || it.trustedHash || it.name).slice(0, 180)
      });
    }
    it.flags = labels;
  }

  const opened = files.filter((f) => f.status === "read").length;
  if (!kept.length && !findings.some((f) => f.rule === "configaudit.unparsed")) {
    findings.push({
      rule: "configaudit.none", severity: "info", file: "(config audit)", line: 0,
      message: opened ? "Config files were opened. None of them listed a plugin, hook, or MCP server." : "No Codex, Claude Code, or Cursor config files were found under this home directory.",
      evidence: ""
    });
  }

  findings.sort((a, b) => (W[b.severity] - W[a.severity]) || String(a.file).localeCompare(String(b.file)) || a.line - b.line);
  const counts = { high: 0, medium: 0, low: 0, info: 0 };
  findings.forEach((f) => { if (counts[f.severity] != null) counts[f.severity]++; });
  const score = Math.max(0, 100 - findings.reduce((s, f) => s + (W[f.severity] ?? 1), 0));
  const tools = [...new Set(kept.map((it) => it.tool))];
  return {
    id: "configaudit",
    title: "AI coding-tool config audit",
    findings, counts, score,
    inventory: kept,
    files,
    checklist: sharingDoc,
    tools,
    note: "Read-only. The files below were opened and not modified, and nothing was sent. Every plugin, hook, and MCP server that was parsed is listed. A flag means the entry matches a fingerprint another app has used, calls a remote MCP server, or is a startup hook or a hook Codex has already trusted. A flag does not prove you did not add the entry. Confirm a flag before you delete anything. Managed Claude Code settings that arrive by MDM or the claude.ai console are not a file this check knows how to open."
  };
}

function buildReport(opts) {
  const g = audit(opts);
  let rules = null;
  try { rules = require("../index").rulesInfo(); } catch (_) { rules = null; }
  return {
    tool: "agent-ops-check",
    version: require("../../package.json").version,
    generatedAt: new Date().toISOString(),
    inputs: ["config-audit"],
    configAudit: true,
    filesScanned: g.files.filter((f) => f.status === "read").length,
    agents: g.tools,
    rules,
    score: g.score,
    groups: [g],
    evals: null,
    standards: null,
    network: "No network calls were made. Nothing left this machine. Config files were read and not modified.",
    disclaimer: "Read-only inventory of local coding-tool config. It can miss files and it can flag something you added yourself."
  };
}

module.exports = { audit, buildReport, display, mask, redactUrl, remoteOf };
