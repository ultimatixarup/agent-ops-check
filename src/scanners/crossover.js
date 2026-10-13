"use strict";
const { loadRules, re, allMatches, mask, code, finding } = require("../util");

const ENV_REF = /process\.env\.([A-Z][A-Z0-9_]{2,})|process\.env\[["']([A-Z][A-Z0-9_]{2,})["']\]|os\.environ(?:\.get)?\(?\[?["']([A-Z][A-Z0-9_]{2,})["']|getenv\(["']([A-Z][A-Z0-9_]{2,})["']|\$\{([A-Z][A-Z0-9_]{2,})\}|^([A-Z][A-Z0-9_]*(?:TOKEN|KEY|SECRET|PASSWORD|CREDENTIALS?))\s*=/gm;
const CRED_NAME = /TOKEN|KEY|SECRET|PASSWORD|CREDENTIAL|OAUTH|AUTH/;
const SCOPE = /https:\/\/www\.googleapis\.com\/auth\/[\w.]+|\b(?:gmail|drive|calendar|chat|channels|files|users|im|groups)[.:](?:readonly|read|write|send|modify|history|metadata|file)\b/g;

function scan(files, opts) {
  const R = loadRules("crossover", opts && opts.rulesDir);
  const findings = [];
  const agents = {};
  const credUse = {}; // credential -> Set(agent)
  const A = (name) => (agents[name] = agents[name] || { agent: name, files: [], connectors: new Set(), credentials: new Set(), scopes: new Set(), sources: {}, sinks: {} });

  // A file at the input root (README, .env.example) is shared setup for the sub-projects when there
  // are several, not a separate agent sharing their keys.
  const multi = new Set(files.filter((f) => !f.atRoot).map((f) => f.agent)).size > 1;
  const sharedRoot = (f) => multi && f.atRoot;
  for (const f of files) {
    const a = A(f.agent);
    a.files.push(f.display);
    const c = code(f.text);
    // MCP config servers
    if (/mcpServers|"servers"\s*:/.test(f.text) && /\.json$/i.test(f.rel)) {
      try {
        const j = JSON.parse(f.text);
        const servers = j.mcpServers || j.servers || {};
        for (const [k, v] of Object.entries(servers)) {
          a.connectors.add("mcp:" + k);
          for (const ek of Object.keys((v && v.env) || {})) if (CRED_NAME.test(ek)) { a.credentials.add(ek); (credUse[ek] = credUse[ek] || new Set()).add(f.agent); }
        }
      } catch (_) { /* not JSON */ }
    }
    let m; ENV_REF.lastIndex = 0;
    while ((m = ENV_REF.exec(c))) {
      const n = m.slice(1).find(Boolean);
      if (n && CRED_NAME.test(n)) { a.credentials.add(n); if (!sharedRoot(f)) (credUse[n] = credUse[n] || new Set()).add(f.agent); }
    }
    const isDoc = /(^|\/)(readme|changelog|contributing|license|docs?\/|knowledge\/|kb\/)/i.test(f.rel);
    (c.match(SCOPE) || []).forEach((s) => a.scopes.add(s));
    if (!isDoc) for (const [k, src] of Object.entries(R.personal_sources)) {
      const hit = allMatches(c, src)[0];
      if (hit) { (a.sources[k] = a.sources[k] || []).push(f.display + ":" + hit.line); a.connectors.add(k); }
    }
    if (!isDoc) for (const [k, src] of Object.entries(R.work_sinks)) {
      const hit = allMatches(c, src)[0];
      if (hit) { (a.sinks[k] = a.sinks[k] || []).push(f.display + ":" + hit.line); a.connectors.add(k); }
    }
    const ph = (m) => R.placeholders && re(R.placeholders).test(m);
    for (const h of R.hardcoded) for (const x of allMatches(f.text, h.pattern))
      findings.push(finding({ rule: "crossover." + h.id, severity: h.severity, file: f.display, line: x.line, message: h.message, evidence: h.severity === "high" ? mask(x.match) : x.match.slice(0, 80) }));
    for (const s of R.secrets) for (const x of allMatches(f.text, s.pattern)) {
      if (ph(x.match) || /example|placeholder|your[-_]|xxxx|<|\$\{|changeme|dummy|fake|not[-_]?a[-_]?real/i.test(x.match)) continue;
      findings.push(finding({ rule: "crossover.secret." + s.id, severity: "high", file: f.display, line: x.line, message: "Possible hardcoded secret (" + s.id + "). Move it to an env var and rotate it.", evidence: mask(x.match) }));
    }
    for (const p of R.pii) for (const x of allMatches(f.text, p.pattern)) if (!ph(x.match))
      findings.push(finding({ rule: "crossover.pii." + p.id, severity: p.id === "email_address" ? "low" : "high", file: f.display, line: x.line, message: "Possible personal data (" + p.id + ") in agent code, prompt or fixture.", evidence: mask(x.match) }));
    if (/(^|\/)\.env$/.test(f.rel)) findings.push(finding({ rule: "crossover.env_committed", severity: "high", file: f.display, line: 1, message: ".env file present in the agent folder." }));
  }

  for (const [cred, set] of Object.entries(credUse)) if (set.size > 1)
    findings.push(finding({ rule: "crossover.shared_credential", severity: "high", file: "(across agents)", line: 0, message: "Credential " + cred + " is used by " + set.size + " agents: " + [...set].join(", ") + ". They are not really separate agents if they share connections. Give each its own scoped token.", evidence: cred }));

  const matrix = [];
  for (const a of Object.values(agents)) {
    for (const s of Object.keys(a.sources)) for (const k of Object.keys(a.sinks)) {
      matrix.push({ agent: a.agent, source: s, sink: k, sourceAt: a.sources[s][0], sinkAt: a.sinks[k][0] });
    }
    if (Object.keys(a.sources).length && Object.keys(a.sinks).length) {
      const [file, line] = Object.values(a.sinks)[0][0].split(/:(?=\d+$)/);
      findings.push(finding({ rule: "crossover.source_to_sink", severity: "high", file, line: +line, message: "Agent '" + a.agent + "' can read personal sources (" + Object.keys(a.sources).join(", ") + ") and write to work sinks (" + Object.keys(a.sinks).join(", ") + "). Split the connections, scope tokens read-only, and allowlist output channels.", evidence: a.agent }));
    }
  }
  const inventory = Object.values(agents).map((a) => ({ agent: a.agent, files: a.files.length, connectors: [...a.connectors].sort(), credentials: [...a.credentials].sort(), scopes: [...a.scopes].sort(), personal_sources: Object.keys(a.sources), work_sinks: Object.keys(a.sinks) }));
  return { id: "crossover", title: "Personal-to-work data crossover", findings, inventory, matrix };
}
module.exports = { scan };
