"use strict";
// OPTIONAL. Only runs with --llm <provider>. Uses YOUR key from an env var. Sends finding summaries
// (rule, file:line, message; evidence is already masked) — never whole files.
const PROVIDERS = {
  openai: { env: "OPENAI_API_KEY", url: "https://api.openai.com/v1/chat/completions", model: "gpt-4o-mini-2024-07-18",
    req: (k, m, p) => ({ headers: { authorization: "Bearer " + k }, body: { model: m, max_tokens: 1200, messages: [{ role: "user", content: p }] } }), out: (j) => j.choices[0].message.content },
  anthropic: { env: "ANTHROPIC_API_KEY", url: "https://api.anthropic.com/v1/messages", model: "claude-3-5-haiku-20241022",
    req: (k, m, p) => ({ headers: { "x-api-key": k, "anthropic-version": "2023-06-01" }, body: { model: m, max_tokens: 1200, messages: [{ role: "user", content: p }] } }), out: (j) => j.content[0].text },
  openrouter: { env: "OPENROUTER_API_KEY", url: "https://openrouter.ai/api/v1/chat/completions", model: "openai/gpt-4o-mini",
    req: (k, m, p) => ({ headers: { authorization: "Bearer " + k }, body: { model: m, max_tokens: 1200, messages: [{ role: "user", content: p }] } }), out: (j) => j.choices[0].message.content }
};
async function review(report, provider, model) {
  const P = PROVIDERS[provider];
  if (!P) return { provider, error: "Unknown provider. Use: " + Object.keys(PROVIDERS).join(", ") };
  const key = process.env.LLM_API_KEY || process.env[P.env];
  if (!key) return { provider, error: "No key found. Set " + P.env + " (or LLM_API_KEY). Nothing was sent." };
  const items = report.groups.flatMap((g) => g.findings.slice(0, 40).map((f) => "- [" + f.severity + "] " + f.rule + " " + f.file + ":" + f.line + " " + f.message));
  const prompt = "You are reviewing static-analysis findings for an AI agent project. Group them, call out likely false positives, and list the 5 fixes that matter most. Findings:\n" + items.join("\n");
  const r = P.req(key, process.env.LLM_MODEL || model || P.model, prompt);
  try {
    const res = await fetch(P.url, { method: "POST", headers: Object.assign({ "content-type": "application/json" }, r.headers), body: JSON.stringify(r.body), signal: AbortSignal.timeout(60000) });
    const j = await res.json();
    if (!res.ok) return { provider, error: "Provider returned " + res.status };
    return { provider, text: P.out(j) };
  } catch (e) { return { provider, error: "LLM call failed: " + e.message }; }
}
module.exports = { review, PROVIDERS };
