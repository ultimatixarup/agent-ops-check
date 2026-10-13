# Campaign: vendor agent samples (October 2026)

We ran agent-ops-check on 5 popular, free, open-source agent sample repos from major AI vendors. The results are **flags to review**: heuristic, static pattern matches. They are **not** confirmed vulnerabilities. These repos are demos and teaching material, and many flags are expected false positives in that kind of code. A low score does not mean a repo is unsafe. It means the tool found many patterns for a person to look at.

> Not affiliated with or endorsed by Microsoft, Anthropic, Google, OpenAI, AWS or any other vendor named here. Personal project built on my own time. Not affiliated with or endorsed by my employer; views are my own.

## Selection

| # | Repo (pinned commit) | Vendor org | License | Stars | Forks | Path scanned |
|---|---|---|---|---|---|---|
| 1 | [microsoft/ai-agents-for-beginners @ 92d833e](https://github.com/microsoft/ai-agents-for-beginners/tree/92d833e9df9a38a5071169b17c07ad134e549ec5) | Microsoft | MIT | 77,030 | 25,310 | repo root, excluding `translations/`, `translated_images/`, `images/` |
| 2 | [google-gemini/gemini-fullstack-langgraph-quickstart @ e34e569](https://github.com/google-gemini/gemini-fullstack-langgraph-quickstart/tree/e34e569de465340e42f36cd3cab4fac0c3ce7036) | Google | Apache-2.0 | 18,345 | 3,061 | repo root |
| 3 | [anthropics/claude-quickstarts @ 9ec32b9](https://github.com/anthropics/claude-quickstarts/tree/9ec32b91df50b0d4906cae64b13c6298055ff40d) | Anthropic | MIT | 17,953 | 3,090 | repo root |
| 4 | [openai/openai-cs-agents-demo @ bd7bfca](https://github.com/openai/openai-cs-agents-demo/tree/bd7bfca0f5abf50529370814c3e7c88542011925) | OpenAI | MIT | 6,588 | 1,021 | repo root |
| 5 | [awslabs/agentcore-samples @ f33b4f1](https://github.com/awslabs/agentcore-samples/tree/f33b4f14ea46cae2379196948073a6bb4d0e21cf) | AWS | Apache-2.0 | 3,445 | 1,353 | `05-blueprints/` (5 end-to-end agent blueprints) |

Commit dates (CT): Microsoft 2026-10-13, Google 2025-06-18, Anthropic 2026-10-07, OpenAI 2025-12-11, AWS 2026-10-09. Stars, forks and licenses come from the GitHub REST API (`gh api repos/<org>/<repo>`), fetched 2026-10-13 at about 03:08 CT (08:08 UTC). Star counts change daily.

**Metric.** GitHub does not publish download counts for repos, so "top downloaded" can't be measured. We ranked by GitHub stars, with forks as the tiebreaker. Stars measure attention, not usage.

**Rules.**
- Eligible repos are purpose-built agent sample, quickstart or course repos in an official vendor GitHub org, with an OSI-approved license.
- At most one repo per vendor. We took the most-starred eligible repo for each vendor, then ranked the vendors.
- General cookbooks (anthropics/claude-cookbooks, openai/openai-cookbook), framework or SDK repos (langchain-ai/langgraph, openai/openai-agents-python, huggingface/smolagents) and non-agent courses (microsoft/generative-ai-for-beginners) were out of scope.
- microsoft/autogen was also excluded because its repo license is CC-BY-4.0, which is not an OSI license.
- We checked google/adk-samples, but it now redirects to google/adk-recipes (10,443 stars). The Gemini quickstart has more stars.
- awslabs/agentcore-samples is a large monorepo, so we scanned one defined subfolder, `05-blueprints/`. `00-getting-started/` held only 2 scannable files, because most of its content is notebooks.

## Results

Score is 0–100, and higher means fewer flags. Cells show high/medium/low flag counts.

| Repo | Score | Files | Data crossover | Irreversible actions | Governance + cost | Health + Labs | Prompt injection (ADSF) | STE (style) |
|---|---|---|---|---|---|---|---|---|
| [microsoft__ai-agents-for-beginners](microsoft__ai-agents-for-beginners/report.md) | 16 | 103 | 5/0/2 | 18/39/0 | 3/71/50 | 15/21/1 | 22/5/0 | 0/763/1577 |
| [anthropics__claude-quickstarts](anthropics__claude-quickstarts/report.md) | 7 | 533 | 2/0/58 | 64/477/0 | 7/35/52 | 12/16/1 | 45/7/0 | 0/590/861 |
| [google-gemini__gemini-fullstack-langgraph-quickstart](google-gemini__gemini-fullstack-langgraph-quickstart/report.md) | 45 | 39 | 1/0/1 | 1/62/0 | 0/11/9 | 0/0/3 | 0/0/0 | 0/15/17 |
| [openai__openai-cs-agents-demo](openai__openai-cs-agents-demo/report.md) | 41 | 38 | 0/0/0 | 5/28/0 | 1/15/7 | 0/0/3 | 2/0/0 | 0/12/16 |
| [awslabs__agentcore-samples](awslabs__agentcore-samples/report.md) | 8 | 359 | 16/0/0 | 50/433/0 | 2/12/8 | 17/13/2 | 38/1/0 | 0/246/580 |

Each folder has `report.md`, `report.json` and `report.sarif`. The two small repos also have `report.html`. HTML, evals, STE and red-team outputs were left out of the large repos to keep the repo small. You can regenerate them with the commands below.

## Hand review: top 3 high flags per repo

We picked 3 representative high flags from each repo and read the source around each one. Labels are judgment calls made from reading the code. We did not run the code.

**microsoft/ai-agents-for-beginners**
1. `actions.irreversible_tool`, `02-explore-agentic-frameworks/README.md:82` `book_flight`: **likely false positive.** It's a teaching snippet in lesson prose that returns a string. No booking happens.
2. `governance.unbounded_loop`, `11-agentic-protocols/code_samples/mcp-agents/client/client.py:176`: **likely false positive.** The `while True` is a console y/n prompt that returns when the user answers. It's a human-in-the-loop prompt, not an agent loop.
3. `actions.irreversible_tool`, `11-agentic-protocols/.../client/utils.py:109` `delete_tokens`: **likely false positive.** It deletes a local resumption-token file. This is housekeeping, not an action the agent takes.

**anthropics/claude-quickstarts**
1. `governance.unbounded_loop`, `agents/agent.py:100`: **unclear.** The loop returns when the model stops calling tools (line 151), but there's no explicit max-steps cap. Worth noting for production use, and fine for a quickstart.
2. `injection.fake_system`, `agents/agent.py:35`: **likely false positive.** It matches a Python parameter named `system:` in a constructor signature, not a role marker inside content.
3. `crossover.source_to_sink`, `managed-agents/` (`reducer.ts:251`): **likely false positive.** The inferred "personal sources" and "work sinks" come from keywords across a UI sample. The cited line is a text-comparison helper.

**google-gemini/gemini-fullstack-langgraph-quickstart**
1. `actions.browser_write`, `frontend/src/App.tsx:137` `thread.submit(`: **likely false positive.** This is the app's own SDK call that sends the user's chat message. The agent isn't submitting a web form.
2. `crossover.shared_credential`, `GEMINI_API_KEY` across `backend` and the repo root: **likely false positive.** It's the same app, with the root `.env.example` and the backend. There is only one agent, so it isn't two agents sharing a key.
3. This repo has no other high flags.

**openai/openai-cs-agents-demo**
1. `actions.irreversible_tool`, `python-backend/airline/tools.py:342` `cancel_flight`: **likely true positive (in demo context).** The tool cancels with no confirmation step. It's mock airline data, but a real deployment would want a confirm step.
2. `injection.ignore_previous`, `python-backend/airline/guardrails.py:64`: **likely false positive.** The text is the jailbreak guardrail's own instructions describing attacks to detect.
3. `governance.unbounded_loop`, `python-backend/main.py:89`: **likely false positive.** It's a server-sent-events stream loop that waits on a queue and ends when the client disconnects. No LLM calls happen inside it.

**awslabs/agentcore-samples (05-blueprints)**
1. `actions.irreversible_tool`, `customer-support-agent-with-agentcore/cdk/lib/stacks/agentcore-stack.ts:260` `process_refund`: **likely true positive (in demo context).** It's a refund tool schema with no visible approval step. The sample backend is mock data.
2. `crossover.pii.bank_account`, `customer-support-agent-with-agentcore/cdk/bin/cdk.ts:22`: **likely false positive.** It matched AWS's documented placeholder account ID `123456789012` in a commented-out line. The tool already masks it in the report.
3. `governance.unbounded_loop`, `multitenant-agentic-platform/src/lambda_functions/token_usage/handler.py:17`: **likely false positive.** It's a DynamoDB pagination loop that breaks when `LastEvaluatedKey` is absent, and it makes no LLM calls.

In this sample, 2 of 14 reviewed high flags look like likely true positives, 1 is unclear and 11 look like likely false positives. That's a small, hand-picked sample, not a precision measurement.

## False-positive patterns (tool-improvement ideas; rules unchanged in this PR)

- **Read-only tools flagged as irreversible.** For example, `get_order` was flagged in AWS, apparently from a nearby refund or cancel context. The rule should look only at the tool's own name and verb.
- **Every `while True` treated as an agent loop.** Pagination loops, SSE stream loops and input-prompt loops get flagged. Require an LLM or tool call inside the loop body, and treat a `break` or `return` on a pagination key as a stop.
- **Guardrail and detector prompts matched as injection.** Text that *describes* an attack ("override system instructions") is flagged. Suppress matches inside guardrail or classifier instructions.
- **`system:` as a code parameter or YAML key** is matched as a fake role marker. Restrict the rule to prose or message content.
- **Documentation tool-call JSON** (`"function": {"name"`) in API reference docs is matched by the LLMail tool-call-syntax rule. Down-weight it in `references/` and `docs/` markdown.
- **Templated URLs in infrastructure code** (CDK `${region}`) were flagged as high. Skip them in IaC files.
- **The Health checks run per file.** "No retries" and "no tracing" fire on CI YAML, `devcontainer.json` and catalog JSON. They should be evaluated per agent, not per config file.
- **Placeholder IDs** such as AWS `123456789012` match the bank-account PII rule. Add a known-placeholder allowlist.
- **"Agents" are inferred from folders**, so one app splits into several "agents" and shared-credential flags fire.
- **STE runs on all README and lesson prose**, which produces very large counts in course repos. STE is a style check and shouldn't be read as risk.

## Methodology and limits

- **Tool:** agent-ops-check 0.1.0, rules 2026.10.13, run from this repo's `main` at the PR's base commit.
- **Offline:** no `--llm`, and the CLI reported no network calls. Repos were cloned shallow at the pinned SHAs above.
- **Command:** `node bin/agent-ops-check.js <path> --out <dir> --format html,json,md,sarif`, plus `--ignore 'translations/**' --ignore 'translated_images/**' --ignore 'images/**'` for the Microsoft repo.
- **Static and heuristic only.** Nothing was executed, and there's no data flow or reachability analysis. The CLI does not read `.ipynb` notebooks, which leaves much of the Microsoft course's code (about 40 notebooks) unscanned.
- **Not comparable across repos.** Scores depend on repo size: more files means more flags. They should not be read as a ranking of vendor quality.
- **Secrets:** we searched the reports for real-looking keys (`sk-`, `sk-ant-`, `AKIA`, `AIza`, `ghp_`, `xox`) and found none. The only match was the word "sk-management-framework". The tool already masks PII-like strings.
- The standards mappings in the reports say "maps to", not compliance.

Scanned code stays under each vendor's own license. Only our generated reports are committed here, with short quoted snippets for reference.
