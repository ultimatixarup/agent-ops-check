"use strict";
const { loadRules, re, allMatches, lines, code, finding } = require("../util");

// A leading read-only verb (get_order, list_bookings, read_post) names a lookup, not an action, unless
// the name also has a strong action verb (get_and_delete_file, fetch_then_pay).
const READ_ONLY = /^_*(get|list|read|fetch|search|find|lookup|look_up|describe|query|check|view|show|is|has|count|load|retrieve|preview|validate|verify)(_|$)/;
const STRONG = /(^|_)(delete|remove|drop|destroy|purge|pay|refund|cancel|submit|wire|purchase|buy|checkout|send|transfer|publish|deploy|merge)(_|$)/;
function isIrreversible(name, verbs) {
  const snake = name.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
  if (READ_ONLY.test(snake) && !STRONG.test(snake.replace(READ_ONLY, ""))) return false;
  return new RegExp("(^|[_.-])(" + verbs + ")([_.-]|$)").test(snake);
}

function scan(files, opts) {
  const R = loadRules("actions", opts && opts.rulesDir);
  const findings = [];
  const actions = [];
  // Gates are judged per agent (all of its files), so a gate in a wrapper module still counts.
  const agentCode = {};
  for (const f of files) agentCode[f.agent] = (agentCode[f.agent] || "") + "\n" + code(f.text);
  const gateOf = (agent, local) => {
    const out = {};
    for (const [g, src] of Object.entries(R.gates)) out[g] = re(src).test(local) || re(src).test(agentCode[agent]);
    return out;
  };
  for (const f of files) {
    const c = code(f.text);
    const L = lines(c);
    const seen = new Set();
    L.forEach((ln, i) => {
      if (!re(R.tool_def_context).test(ln) && !re(R.browser_actions).test(ln)) return;
      const kind = re(R.browser_actions).test(ln) ? "browser" : "tool";
      let name;
      if (kind === "browser") name = ln.match(re(R.browser_actions))[0].replace(/\s*\($/, "(");
      else {
        // Judge the tool's NAME only, not its description text.
        const nm = ln.match(/name["']?\s*[:=]\s*["']([\w.-]+)["']|def\s+(\w+)|function\s+(\w+)|(?:@tool|tool)\(\s*["']([\w.-]+)["']/);
        name = nm && nm.slice(1).find(Boolean);
        if (!name || !isIrreversible(name, R.irreversible_verbs)) return;
      }
      const key = name + ":" + kind;
      if (seen.has(key)) return; seen.add(key);
      const window = L.slice(Math.max(0, i - 6), i + 12).join("\n");
      const gates = gateOf(f.agent, window);
      // The nearby code (6 lines up, 12 down) decides approval/dry-run for this action; agent-wide text only counts for rate limit/allowlist.
      gates.approval = re(R.gates.approval).test(window);
      gates.dry_run = re(R.gates.dry_run).test(window);
      if (gates.domain_allowlist && /\b(allowed|allow)[_ -]?(domains|hosts|urls|origins)\b\s*[:=]\s*\[?\s*["']\*/i.test(agentCode[f.agent])) gates.domain_allowlist = false;
      const any = gates.approval || gates.dry_run;
      actions.push({ agent: f.agent, action: name, kind, file: f.display, line: i + 1, gates });
      findings.push(finding({ rule: "actions." + (kind === "browser" ? "browser_write" : "irreversible_tool"), severity: any ? "info" : "high", file: f.display, line: i + 1,
        message: (kind === "browser" ? "Browser write action " : "Irreversible tool ") + name + (any ? " has a gate (" + Object.keys(gates).filter((k) => gates[k]).join(", ") + ")." : " has no approval gate or dry-run mode" + (gates.rate_limit || gates.domain_allowlist ? " (rate limit/allowlist only)" : "") + ". Add a human confirm step before it runs."), evidence: ln.trim().slice(0, 120) }));
    });
    for (const r of R.risky_reads) for (const x of allMatches(c, r.pattern))
      findings.push(finding({ rule: "actions." + r.id, severity: r.severity, file: f.display, line: x.line, message: r.message, evidence: x.match.slice(0, 80) }));
    const isPrompt = /\.(md|txt)$/i.test(f.rel) || /prompt|instruction/i.test(f.rel);
    if (isPrompt && re(R.prompt_markers).test(f.text) && !re(R.deny_list).test(f.text))
      findings.push(finding({ rule: "actions.no_deny_list", severity: "medium", file: f.display, line: 1, message: "Prompt has no explicit deny-list such as \"never submit, pay or send without asking me first\". Agents treat what isn't forbidden as allowed." }));
  }
  return { id: "actions", title: "Irreversible actions", findings, actions };
}
module.exports = { scan, isIrreversible, READ_ONLY };
