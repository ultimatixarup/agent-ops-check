"use strict";
const { loadRules, re, allMatches, code, finding } = require("../util");

function scan(files, opts) {
  const R = loadRules("governance", opts && opts.rulesDir);
  const findings = [];
  const inv = { providers: {}, frameworks: {}, models: {} };
  const perAgent = {};
  for (const f of files) {
    const c = code(f.text);
    const a = (perAgent[f.agent] = perAgent[f.agent] || { text: "", files: [], llmCalls: [] });
    a.text += "\n" + c; a.files.push(f);
    for (const [k, src] of Object.entries(R.providers)) if (re(src).test(c)) (inv.providers[k] = inv.providers[k] || new Set()).add(f.display);
    for (const [k, src] of Object.entries(R.frameworks)) if (/\.(js|mjs|cjs|ts|tsx|py|json|toml)$/i.test(f.rel) && re(src).test(c)) (inv.frameworks[k] = inv.frameworks[k] || new Set()).add(f.display);
    for (const x of allMatches(c, R.model_ref)) {
      const name = x.match;
      (inv.models[name] = inv.models[name] || []).push(f.display + ":" + x.line);
    }
    for (const x of allMatches(c, R.llm_call)) a.llmCalls.push({ file: f.display, line: x.line });
    for (const x of allMatches(c, R.loop_risk)) {
      const after = c.slice(x.index, x.index + 1500);
      if (!re(R.recursion_cap).test(after) && !/\bbreak\b/.test(after.slice(0, 600)))
        findings.push(finding({ rule: "governance.unbounded_loop", severity: "high", file: f.display, line: x.line, message: "Infinite loop with no step cap or break nearby. A stuck agent here burns tokens until someone notices." }));
    }
  }
  for (const [name, where] of Object.entries(inv.models)) {
    const [file, line] = where[0].split(/:(?=\d+$)/);
    if (!re(R.pinned_model).test(name)) findings.push(finding({ rule: "governance.unpinned_model", severity: "low", file, line: +line, message: "Model '" + name + "' is not pinned to a dated version, so behavior and price can change under you.", evidence: name }));
    if (re(R.expensive_model).test(name)) findings.push(finding({ rule: "governance.expensive_model", severity: "low", file, line: +line, message: "Premium model '" + name + "'. Check it isn't used for simple routing or classification calls.", evidence: name }));
  }
  const all = Object.values(perAgent).map((a) => a.text).join("\n");
  const docs = files.filter((f) => /readme|owners|codeowners|agent\.md|\.md$/i.test(f.rel)).map((f) => f.text).join("\n");
  for (const [agent, a] of Object.entries(perAgent)) {
    const where = a.llmCalls[0] || { file: a.files[0].display, line: 1 };
    const usesLLM = a.llmCalls.length > 0 || Object.values(R.providers).some((s) => re(s).test(a.text));
    if (!usesLLM) continue;
    const miss = (rule, sev, pat, msg) => { if (!re(pat).test(a.text)) findings.push(finding({ rule, severity: sev, file: where.file, line: where.line, message: "[" + agent + "] " + msg })); };
    miss("governance.no_max_tokens", "medium", R.max_tokens, "No max_tokens / output cap set on model calls.");
    miss("governance.no_timeout", "medium", R.timeout, "No timeout on model or tool calls.");
    miss("governance.no_retry_cap", "low", R.retry_cap, "No explicit retry limit or backoff.");
    miss("governance.no_recursion_cap", "medium", R.recursion_cap, "No step / iteration / recursion cap for the agent loop.");
    miss("governance.no_budget", "medium", R.budget, "No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.");
    miss("governance.no_tracing", "medium", R.tracing, "No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.");
  }
  if (!re(R.owner_doc).test(docs + "\n" + all)) findings.push(finding({ rule: "governance.no_owner", severity: "medium", file: "(project)", line: 0, message: "No owner/maintainer documented. Every agent needs a named person who answers for it." }));
  if (!re(R.review_doc).test(docs)) findings.push(finding({ rule: "governance.no_review_record", severity: "low", file: "(project)", line: 0, message: "No documented review (reviewed-by / review date / changelog)." }));
  const inventory = {
    providers: Object.fromEntries(Object.entries(inv.providers).map(([k, v]) => [k, [...v]])),
    frameworks: Object.fromEntries(Object.entries(inv.frameworks).map(([k, v]) => [k, [...v]])),
    models: inv.models
  };
  return { id: "governance", title: "Governance + cost", findings, inventory };
}
module.exports = { scan };
