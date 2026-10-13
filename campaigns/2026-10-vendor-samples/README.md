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
- awslabs/agentcore-samples is a large monorepo, so we scanned one defined subfolder, `05-blueprints/`. `00-getting-started/` holds only 2 scannable files (1 `.py`, 1 `.md`, plus images).

## Results (rules after the false-positive fixes)

Score is 0–100, and higher means fewer flags. Cells show high/medium/low flag counts. These runs use the engine from the fp-fixes-notebooks PR, on the same pinned commits as the first run. The Microsoft scan now includes its 40 notebooks (`.ipynb` code and markdown cells; outputs ignored).

| Repo | Score | Files | Agents | Data crossover | Irreversible actions | Governance + cost | Health + Labs | Prompt injection (ADSF) | STE (style) |
|---|---|---|---|---|---|---|---|---|---|
| [microsoft__ai-agents-for-beginners](microsoft__ai-agents-for-beginners/report.md) | 19 | 143 | 20 | 4/0/2 | 28/50/0 | 0/69/53 | 9/11/1 | 19/11/9 | 0/362/860 |
| [google-gemini__gemini-fullstack-langgraph-quickstart](google-gemini__gemini-fullstack-langgraph-quickstart/report.md) | 60 | 40 | 1 | 0/0/1 | 1/62/0 | 0/3/7 | 0/0/3 | 0/0/0 | 0/0/0 |
| [anthropics__claude-quickstarts](anthropics__claude-quickstarts/report.md) | 7 | 535 | 11 | 2/0/58 | 64/485/0 | 4/29/51 | 1/4/1 | 36/7/0 | 0/493/586 |
| [openai__openai-cs-agents-demo](openai__openai-cs-agents-demo/report.md) | 58 | 38 | 1 | 0/0/0 | 5/28/0 | 0/5/5 | 0/0/3 | 0/0/2 | 0/0/0 |
| [awslabs__agentcore-samples](awslabs__agentcore-samples/report.md) | 28 | 360 | 5 | 6/0/0 | 47/433/0 | 0/12/8 | 0/0/2 | 27/1/11 | 0/237/562 |

Each folder has `report.md`, `report.json` and `report.sarif` from this run, plus `before-fp-fixes/` with the first run's reports. The two small repos also have `report.html`. HTML, evals, STE and red-team outputs were left out of the large repos to keep the repo small.

## Before vs after the false-positive fixes

Same commits, same paths, same command. "Before" = rules as of the first run; "after" = the fp-fixes-notebooks engine. STE counts are left out of the high/medium columns because STE is a style check.

| Repo | Score before → after | Files | Agents | High flags (tabs 1–5) before → after | Medium before → after |
|---|---|---|---|---|---|
| microsoft__ai-agents-for-beginners | 16 → 19 | 103 → 143 | 25 → 20 | 63 → 60 | 136 → 141 |
| google-gemini__gemini-fullstack-langgraph-quickstart | 45 → 60 | 39 → 40 | 3 → 1 | 2 → 1 | 73 → 65 |
| anthropics__claude-quickstarts | 7 → 7 | 533 → 535 | 12 → 11 | 130 → 107 | 535 → 525 |
| openai__openai-cs-agents-demo | 41 → 58 | 38 → 38 | 3 → 1 | 8 → 5 | 43 → 33 |
| awslabs__agentcore-samples | 8 → 28 | 359 → 360 | 5 → 5 | 123 → 80 | 459 → 446 |
| microsoft (same 103 files, notebooks excluded, new rules) | 16 → 23 | 103 → 103 | 25 → 20 | 63 → 43 | 136 → 135 |

- The Microsoft row grew in files (103 → 143) because notebooks are now scanned, so its "after" row is not like-for-like. The last row is the like-for-like comparison: the same 103 files with the new rules (notebooks excluded with `--ignore '**/*.ipynb'`).
- AWS `00-getting-started/` was checked again. It still has only 2 scannable files (1 `.py`, 1 `.md`; no notebooks), so the AWS row keeps `05-blueprints/` for a consistent comparison.
- Most of the drop comes from: agent loops needing a model/tool call in the body, Health checks skipping CI/devcontainer/tooling files, read-only tool names (`get_order`, `list_orders`), app folders (`backend/`, `ui/`) no longer split one app into several agents, and context-based lowering in the injection scan (lowered, not removed: those flags now show as low).
- Irreversible-action highs barely moved. That tab's flags are dominated by real action names (`delete_*`, `send_*`, `cancel_*`) in sample code, which the tool is meant to surface.

## Hand review (after the fixes): seeded random sample

We drew up to 5 high flags per repo at random with Python `random.Random(20261013)`, in the order the repos are listed, from each `report.json` (the Gemini repo has only 1 high flag). We read the source around each one. Labels are judgment calls from reading the code; nothing was executed.

| Repo | Flag | Label | Reason |
|---|---|---|---|
| Microsoft | `health.tracing_hooks`, `tests/lesson-16-smoke-tests.json` | likely FP | A smoke-test JSON file, not an agent config. |
| Microsoft | `actions.irreversible_tool` `sign_receipt`, `18-signed-receipts.ipynb` cell 12, line 1 | likely FP | Cryptographic signing of a local receipt, not an external action. |
| Microsoft | `actions.browser_write` `.fill(`, `15-browser-use/llms.txt:1396` | likely FP | Library documentation text (llms.txt), not sample code. |
| Microsoft | `health.retries_backoff`, `tests/lesson-05-smoke-tests.json` | likely FP | Same as above: test JSON. |
| Microsoft | `injection.llmail_tool_call_syntax`, `17-local-agent-foundry-local.ipynb` cell 13, line 2 | likely FP | The notebook's own tool definition JSON in a code cell. |
| Google | `actions.browser_write` `thread.submit(`, `frontend/src/App.tsx:137` | likely FP | SDK call that sends the user's chat message. |
| Anthropic | `actions.irreversible_tool` `destroy`, `managed-agents/self-hosted-sandboxes/archil/sandboxes.py:87` | unclear | Stops and deletes a sandbox VM with no confirm. It's destructive but it's setup code, not an agent tool. |
| Anthropic | `actions.browser_write` `.type(`, `computer-use-best-practices/computer_use/tools/browser.py:202` | unclear | The agent really types into a browser here; whether a gate is needed depends on deployment. |
| Anthropic | `actions.irreversible_tool` `sendMessage`, `managed-agents/mcp-server-typescript/src/managed-agents.ts:73` | likely FP | Sends a chat turn to an agent session, not an outbound message to a person. |
| Anthropic | `injection.llmail_tool_call_syntax`, `browser-use-demo/browser_use_demo/loop.py:125` | likely FP | Matches the code comment "# Make API call". |
| Anthropic | `injection.llmail_tool_call_syntax`, `managed-agents/chat-sdk/src/sessions.ts:87` | likely FP | Matches a TypeScript type name (`ToolCall>`). |
| OpenAI | `actions.irreversible_tool` `delete_attachment`, `python-backend/memory_store.py:173` | likely FP | A storage-interface method called by the framework, not an agent tool. |
| OpenAI | `actions.irreversible_tool` `book_new_flight`, `python-backend/airline/tools.py:208` | likely TP (demo) | An agent tool that books with no confirm step; mock data. |
| OpenAI | `actions.irreversible_tool` `delete_thread`, `python-backend/memory_store.py:89` | likely FP | Storage-interface method, as above. |
| OpenAI | `actions.irreversible_tool` `delete_thread_item`, `python-backend/memory_store.py:148` | likely FP | Storage-interface method, as above. |
| OpenAI | `actions.irreversible_tool` `cancel_flight`, `python-backend/airline/tools.py:342` | likely TP (demo) | An agent tool that cancels with no confirm step; mock data. |
| AWS | `crossover.pii.card_number`, `shopping-concierge-agent/concierge_agent/local-visa-server/server.py:181` | likely FP | A card number in a request-body docstring example for a local sandbox server (masked in the report). |
| AWS | `actions.irreversible_tool` `send_purchase_confirmation_email`, `shopping-concierge-agent/concierge_agent/mcp_cart_tools/server.py:343` | likely TP (demo) | An MCP tool that sends email via SES to a given recipient with no confirm. |
| AWS | `injection.llmail_tool_call_syntax`, `travel-concierge-agent/docs/VISA_SECRETS_SETUP.md:74` | likely FP | Setup docs that say "API call". |
| AWS | `injection.templated_url`, `travel-concierge-agent/concierge_agent/supervisor_agent/prompt_manager.py:80` | likely FP | A prompt template telling the agent how to build product links (`amazon.com/dp/{{ASIN}}`). |
| AWS | `actions.irreversible_tool` `send_message`, `end-to-end-customer-service-agent/cx-agent-frontend/src/services/agentcore_client.py:21` | likely FP | A frontend client sending the user's message to the agent. |

**Precision on this sample:** 3 of 21 likely true positives (14%), 2 unclear, 16 likely false positives. Counting the unclear ones as true gives at most 5 of 21 (24%). The first run's hand-picked review was 2 of 14 (14%). So the fixes cut the number of high flags (for example AWS 123 → 80, Anthropic 130 → 107), but **precision of the high flags that remain is still low**. The sample is small, so treat these as rough numbers.

The three true positives from the first run's review stay flagged: OpenAI `cancel_flight`, AWS `process_refund` (and the bad-agent sample score is unchanged at 27).

## Remaining false-positive patterns (ideas for the next round)

- **Storage and framework interface methods** (`delete_thread`, `delete_attachment` on a memory store) are read as agent tools. Only count functions registered as tools (`@function_tool`, `@mcp.tool`, tool schemas).
- **`sign` as a verb** fires on cryptographic signing. Treat `sign_receipt`/`sign_payload` as not irreversible unless it's e-signature.
- **Code comments and type names trip `llmail_tool_call_syntax`** ("# Make API call", `ToolCall>`). Restrict it to string literals and prose.
- **Tool-definition JSON in notebook code cells** looks like injected tool calls. Lower it in code cells, as in markdown code blocks.
- **Health checks on `tests/*.json`** fixtures that contain a prompt key. Skip `tests/`/`fixtures/` by default.
- **Library docs bundled as `.txt`** (`llms.txt`) are scanned like code for browser actions.
- **Client calls to the agent** (`send_message` in a frontend client, `thread.submit`) are read as agent actions.
- **Sandbox test card numbers** in docstrings (Visa sandbox examples) aren't on the placeholder list.
- **Templated URLs in prompt templates** for legitimate links are high. They need a reviewer either way.

## Methodology and limits

- **Tool:** agent-ops-check 0.1.0, rules 2026.10.13. The first run (`before-fp-fixes/`) used `main` at 6b310d8; the current reports use the engine from the fp-fixes-notebooks PR (same rules version, second same-day update; see `rules/CHANGELOG.md`).
- **Offline:** no `--llm`, and the CLI reported no network calls. Repos were cloned shallow at the pinned SHAs above.
- **Command:** `node bin/agent-ops-check.js <path> --out <dir> --format html,json,md,sarif`, plus `--ignore 'translations/**' --ignore 'translated_images/**' --ignore 'images/**'` for the Microsoft repo.
- **Static and heuristic only.** Nothing was executed, and there's no data flow or reachability analysis. Notebooks are now scanned (code and markdown cells; outputs ignored). Other formats such as images and PDFs are not.
- **Not comparable across repos.** Scores depend on repo size: more files means more flags. They should not be read as a ranking of vendor quality.
- **Secrets:** we searched the reports for real-looking keys (`sk-`, `sk-ant-`, `AKIA`, `AIza`, `ghp_`, `xox`) and found none. The only match was the word "sk-management-framework". The tool already masks PII-like strings.
- The standards mappings in the reports say "maps to", not compliance.

Scanned code stays under each vendor's own license. Only our generated reports are committed here, with short quoted snippets for reference.
