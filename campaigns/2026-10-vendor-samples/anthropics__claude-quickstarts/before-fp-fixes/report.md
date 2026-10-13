# Agent ops audit memo (self-run)

_Generated locally by agent-ops-check 0.1.0 on 2026-10-13T08:09:40.127Z. No network calls were made. Nothing left this machine._

> Heuristic regex and static checks, not a security audit. It can miss problems and can flag harmless code.

Rules 2026.10.13 (2026-10-13). Rules are 0 day(s) old.

**Overall score:** 7/100 · files scanned: 533 · agents: .github, anthropics__claude-quickstarts, agents, autonomous-coding, browser-toolset, browser-use-demo, computer-toolset, computer-use-best-practices, computer-use-demo, customer-support-agent, financial-data-analyst, managed-agents

| Area | Score | High | Medium | Low |
|---|---|---|---|---|
| Personal-to-work data crossover | 22 | 2 | 0 | 58 |
| Irreversible actions | 0 | 64 | 477 | 0 |
| Governance + cost | 0 | 7 | 35 | 52 |
| Agent Health Checker + Labs tools | 0 | 12 | 16 | 1 |
| Prompt-injection scan (ADSF) | 0 | 45 | 7 | 0 |
| Simplified Technical English (STE) | 0 | 0 | 590 | 861 |

## 1. Agent and connector inventory

| Agent | Connectors | Credentials (names only) | Scopes |
|---|---|---|---|
| .github | - | - | - |
| anthropics__claude-quickstarts | - | - | - |
| agents | - | ANTHROPIC_API_KEY | - |
| autonomous-coding | - | ANTHROPIC_API_KEY | - |
| browser-toolset | - | - | - |
| browser-use-demo | - | ANTHROPIC_API_KEY | - |
| computer-toolset | - | - | - |
| computer-use-best-practices | - | ANTHROPIC_API_KEY | - |
| computer-use-demo | - | TOKEN_EFFICIENT | https://www.googleapis.com/auth/cloud |
| customer-support-agent | tax_paths | ANTHROPIC_API_KEY, BAWS_ACCESS_KEY_ID, BAWS_SECRET_ACCESS_KEY | - |
| financial-data-analyst | tax_paths | ANTHROPIC_API_KEY | - |
| managed-agents | discord, finance, generic_webhook, personal_calendar_contacts, slack, tax_paths | ALLOW_ENVIRONMENT_KEY_IN_SANDBOX, ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN, ANTHROPIC_ENVIRONMENT_KEY, ANTHROPIC_WEBHOOK_SECRET, ANTHROPIC_WEBHOOK_SIGNING_KEY, ANTHROPIC_WORK_SECRET, ARCHIL_API_KEY, ARCHIL_MOUNT_TOKEN, GITHUB_TOKEN, KV_REST_API_TOKEN, LINEAR_CLIENT_SECRET, LINEAR_WEBHOOK_SIGNING_SECRET, MANAGED_AGENTS_MCP_TOKEN, MIN_TOKEN_CHARS, NATIONAL_PARK_SERVICE_API_KEY, SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET, TOKEN, TOKEN_FILE, WINDY_API_KEY | channels:history, chat:write, groups:history, im:history |

### Source-to-sink matrix (personal data → work destinations)

| Agent | Personal source | Work sink |
|---|---|---|
| managed-agents | personal_calendar_contacts (anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:31) | slack (anthropics__claude-quickstarts/managed-agents/assistant-ui/lib/managed-agents/reducer.ts:251) |
| managed-agents | personal_calendar_contacts (anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:31) | discord (anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:31) |
| managed-agents | personal_calendar_contacts (anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:31) | generic_webhook (anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:31) |
| managed-agents | finance (anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:140) | slack (anthropics__claude-quickstarts/managed-agents/assistant-ui/lib/managed-agents/reducer.ts:251) |
| managed-agents | finance (anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:140) | discord (anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:31) |
| managed-agents | finance (anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:140) | generic_webhook (anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:31) |
| managed-agents | tax_paths (anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/agents/financial-assistant.md:40) | slack (anthropics__claude-quickstarts/managed-agents/assistant-ui/lib/managed-agents/reducer.ts:251) |
| managed-agents | tax_paths (anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/agents/financial-assistant.md:40) | discord (anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:31) |
| managed-agents | tax_paths (anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/agents/financial-assistant.md:40) | generic_webhook (anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:31) |

## 2. Human-in-the-loop gate map

| Agent | Action | Where | Approval | Dry-run | Rate limit | Domain allowlist |
|---|---|---|---|---|---|---|
| agents | `remove_message_pair` | anthropics__claude-quickstarts/agents/utils/history_util.py:85 | **no** | **no** | **no** | yes |
| browser-toolset | `_send` | anthropics__claude-quickstarts/browser-toolset/python/cdp_browser.py:156 | **no** | **no** | **no** | yes |
| browser-toolset | `removeProfile` | anthropics__claude-quickstarts/browser-toolset/typescript/cdp-browser.ts:351 | **no** | **no** | **no** | yes |
| browser-use-demo | `.click(` | anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/tools/browser.py:519 | **no** | **no** | yes | yes |
| browser-use-demo | `.type(` | anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/tools/browser.py:564 | **no** | **no** | yes | yes |
| browser-use-demo | `.press(` | anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/tools/browser.py:592 | **no** | **no** | yes | yes |
| computer-toolset | `.click(` | anthropics__claude-quickstarts/computer-toolset/typescript/vnc-computer.ts:265 | **no** | **no** | **no** | **no** |
| computer-use-best-practices | `.click(` | anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/browser.py:179 | **no** | **no** | yes | **no** |
| computer-use-best-practices | `.type(` | anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/browser.py:202 | **no** | **no** | yes | **no** |
| computer-use-best-practices | `.press(` | anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/browser.py:207 | **no** | **no** | yes | **no** |
| computer-use-best-practices | `.press(` | anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/computer.py:145 | **no** | **no** | yes | **no** |
| computer-use-best-practices | `.click(` | anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/computer.py:322 | **no** | **no** | yes | **no** |
| computer-use-best-practices | `__post_init__` | anthropics__claude-quickstarts/computer-use-best-practices/constants.py:219 | **no** | **no** | yes | **no** |
| computer-use-best-practices | `method: 'POST` | anthropics__claude-quickstarts/computer-use-best-practices/dev_ui/localization_demo/static/index.html:301 | **no** | **no** | yes | **no** |
| computer-use-best-practices | `method: 'POST` | anthropics__claude-quickstarts/computer-use-best-practices/dev_ui/tool_panel/static/index.html:118 | **no** | **no** | yes | **no** |
| computer-use-best-practices | `test_delete_key_maps_to_backspace_on_mac` | anthropics__claude-quickstarts/computer-use-best-practices/tests/test_base.py:56 | **no** | **no** | yes | **no** |
| computer-use-best-practices | `test_drag_and_scroll_accept_modifiers` | anthropics__claude-quickstarts/computer-use-best-practices/tests/test_computer.py:129 | **no** | **no** | yes | **no** |
| computer-use-best-practices | `test_execute_runs_members_in_order_and_stops_after_the_first_failure` | anthropics__claude-quickstarts/computer-use-best-practices/tests/test_loop.py:184 | **no** | **no** | yes | **no** |
| computer-use-demo | `.fill(` | anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md:81 | **no** | **no** | yes | yes |
| computer-use-demo | `.press(` | anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md:82 | **no** | **no** | yes | yes |
| computer-use-demo | `.click(` | anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md:85 | **no** | **no** | yes | yes |
| customer-support-agent | `POST` | anthropics__claude-quickstarts/customer-support-agent/app/api/chat/route.ts:64 | **no** | **no** | **no** | **no** |
| customer-support-agent | `method: "POST` | anthropics__claude-quickstarts/customer-support-agent/components/ChatArea.tsx:448 | **no** | **no** | **no** | **no** |
| financial-data-analyst | `POST` | anthropics__claude-quickstarts/financial-data-analyst/app/api/finance/route.ts:103 | **no** | **no** | **no** | **no** |
| financial-data-analyst | `method: "POST` | anthropics__claude-quickstarts/financial-data-analyst/app/finance/page.tsx:438 | **no** | **no** | **no** | **no** |
| financial-data-analyst | `.click(` | anthropics__claude-quickstarts/financial-data-analyst/app/finance/page.tsx:642 | **no** | **no** | **no** | **no** |
| managed-agents | `POST` | anthropics__claude-quickstarts/managed-agents/assistant-ui/app/api/sessions/[id]/archive/route.ts:13 | **no** | **no** | yes | yes |
| managed-agents | `POST` | anthropics__claude-quickstarts/managed-agents/assistant-ui/app/api/sessions/[id]/confirm/route.ts:28 | **no** | **no** | yes | yes |
| managed-agents | `POST` | anthropics__claude-quickstarts/managed-agents/assistant-ui/app/api/sessions/[id]/files/route.ts:26 | **no** | **no** | yes | yes |
| managed-agents | `POST` | anthropics__claude-quickstarts/managed-agents/assistant-ui/app/api/sessions/[id]/interrupt/route.ts:13 | **no** | **no** | yes | yes |
| managed-agents | `POST` | anthropics__claude-quickstarts/managed-agents/assistant-ui/app/api/sessions/[id]/messages/route.ts:20 | **no** | **no** | yes | yes |
| managed-agents | `DELETE` | anthropics__claude-quickstarts/managed-agents/assistant-ui/app/api/sessions/[id]/route.ts:45 | **no** | **no** | yes | yes |
| managed-agents | `POST` | anthropics__claude-quickstarts/managed-agents/assistant-ui/app/api/sessions/[id]/tool-results/route.ts:21 | **no** | **no** | yes | yes |
| managed-agents | `POST` | anthropics__claude-quickstarts/managed-agents/assistant-ui/app/api/sessions/route.ts:55 | **no** | **no** | yes | yes |
| managed-agents | `.click(` | anthropics__claude-quickstarts/managed-agents/assistant-ui/components/assistant-ui/image.tsx:76 | **no** | **no** | yes | yes |
| managed-agents | `method: "POST` | anthropics__claude-quickstarts/managed-agents/assistant-ui/lib/managed-agents/api.ts:33 | **no** | **no** | yes | yes |
| managed-agents | `deleteSession` | anthropics__claude-quickstarts/managed-agents/assistant-ui/lib/managed-agents/api.ts:58 | **no** | **no** | yes | yes |
| managed-agents | `method: "POST` | anthropics__claude-quickstarts/managed-agents/assistant-ui/lib/managed-agents/session-controller.ts:336 | **no** | **no** | yes | yes |
| managed-agents | `dropSessionController` | anthropics__claude-quickstarts/managed-agents/assistant-ui/lib/managed-agents/session-controller.ts:500 | **no** | **no** | yes | yes |
| managed-agents | `publishActivity` | anthropics__claude-quickstarts/managed-agents/chat-sdk/src/activity.ts:13 | **no** | **no** | yes | yes |
| managed-agents | `streamingPost` | anthropics__claude-quickstarts/managed-agents/chat-sdk/src/managed-agents.ts:155 | **no** | **no** | yes | yes |
| managed-agents | `method: "POST` | anthropics__claude-quickstarts/managed-agents/chat-sdk/web/app.tsx:284 | **no** | **no** | yes | yes |
| managed-agents | `.fill(` | anthropics__claude-quickstarts/managed-agents/knowledge-wiki/utilities.py:118 | **no** | **no** | yes | yes |
| managed-agents | `postReply` | anthropics__claude-quickstarts/managed-agents/linear/src/managed-agents-webhook.ts:63 | **no** | **no** | yes | yes |
| managed-agents | `postActivity` | anthropics__claude-quickstarts/managed-agents/linear/src/managed-agents-webhook.ts:191 | **no** | **no** | yes | yes |
| managed-agents | `method: "POST` | anthropics__claude-quickstarts/managed-agents/linear/src/oauth.ts:226 | **no** | **no** | yes | yes |
| managed-agents | `signRoute` | anthropics__claude-quickstarts/managed-agents/linear/src/route-signature.ts:29 | **no** | **no** | yes | yes |
| managed-agents | `sendMessage` | anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/src/managed-agents.ts:73 | **no** | **no** | yes | yes |
| managed-agents | `POST` | anthropics__claude-quickstarts/managed-agents/roadtrip-planner/src/app/api/chat/route.ts:13 | **no** | **no** | yes | yes |
| managed-agents | `POST` | anthropics__claude-quickstarts/managed-agents/roadtrip-planner/src/app/api/interrupt/route.ts:10 | **no** | **no** | yes | yes |
| managed-agents | `POST` | anthropics__claude-quickstarts/managed-agents/roadtrip-planner/src/app/api/session/route.ts:22 | **no** | **no** | yes | yes |
| managed-agents | `method: "POST` | anthropics__claude-quickstarts/managed-agents/roadtrip-planner/src/app/page.tsx:56 | **no** | **no** | yes | yes |
| managed-agents | `mergeLog` | anthropics__claude-quickstarts/managed-agents/roadtrip-planner/src/lib/use-managed-agent-session.ts:33 | **no** | **no** | yes | yes |
| managed-agents | `method: "POST` | anthropics__claude-quickstarts/managed-agents/roadtrip-planner/src/lib/use-managed-agent-session.ts:145 | **no** | **no** | yes | yes |
| managed-agents | `destroy` | anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/sandboxes.py:87 | **no** | **no** | yes | yes |
| managed-agents | `method="POST` | anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/modal/modal_sandbox_webhook.py:324 | **no** | **no** | yes | yes |
| managed-agents | `POST` | anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/vercel/api/webhook.ts:387 | **no** | **no** | yes | yes |
| managed-agents | `postReply` | anthropics__claude-quickstarts/managed-agents/slack/src/managed-agents-webhook.ts:56 | **no** | **no** | yes | yes |
| managed-agents | `post` | anthropics__claude-quickstarts/managed-agents/slack/src/managed-agents-webhook.ts:189 | **no** | **no** | yes | yes |
| managed-agents | `signRoute` | anthropics__claude-quickstarts/managed-agents/slack/src/route-signature.ts:29 | **no** | **no** | yes | yes |

## 3. AI inventory

- Providers: anthropic, aws_bedrock, openai, groq
- Frameworks/SDKs: mcp, vercel_ai_sdk, langchain, langgraph
- Models: `claude-quickstarts`, `claude-cookbooks`, `claude-code`, `claude-sonnet-5-5`, `Claude-powered`, `claude-code-sdk`, `claude-progress.txt`, `claude-sonnet-4-5-20250929`, `claude-haiku-4-5-20251001`, `claude-opus-4-1-20250805`, `claude-style`, `claude-3-5-sonnet-20241022`, `claude-quickstarts.git`, `claude-opus-4-5-20251101`, `claude-sonnet-4-5-20250929-v1`, `claude-sonnet-4-5`, `claude-haiku-4-5`, `claude-sonnet-4-6`, `claude-opus-4-6`, `claude-opus-4-7`, `claude-experimental-v2`, `claude-sonnet-5`, `claude-opus-4-8`, `claude-3-5-sonnet-20241022-v2`, `claude-3-5-sonnet-v2`, `claude-opus-4-1`, `claude-sonnet-4-20250514`, `claude-opus-4-20250514`, `claude-haiku-4-5-20251001-v1`, `claude-opus-4-5`, `claude-3-haiku-20240307`, `claude-3-5-sonnet-20240620`, `claude-icon.svg`, `claude-managed-agents`, `claude-api`, `claude-lock.json`, `claude-opus-5`, `claude-managed-agents-vercel-services`, `claude-research-analyst`, `claude-managed-agents-chat-sdk`, `claude-fable-5`, `claude-managed-agents-0.0.1.tgz`, `O4`, `claude-opus-5-5`, `claude-plugins-official`, `claude-quickstarts-sentry-oauth`

## STE (Simplified Technical English) style

_Style checks inspired by ASD-STE100 writing rules. Not a certified ASD-STE100 checker; no specification text or dictionary is included._

- anthropics__claude-quickstarts/.github/pull_request_template.md: 12 sentences, 0 findings
- anthropics__claude-quickstarts/CLAUDE.md: 42 sentences, 9 findings
- anthropics__claude-quickstarts/README.md: 79 sentences, 35 findings
- anthropics__claude-quickstarts/agents/README.md: 15 sentences, 1 findings
- anthropics__claude-quickstarts/autonomous-coding/README.md: 46 sentences, 20 findings
- anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt: 520 sentences, 29 findings
- anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md: 90 sentences, 20 findings
- anthropics__claude-quickstarts/autonomous-coding/prompts/initializer_prompt.md: 54 sentences, 13 findings
- anthropics__claude-quickstarts/autonomous-coding/requirements.txt: 0 sentences, 0 findings
- anthropics__claude-quickstarts/browser-toolset/README.md: 50 sentences, 23 findings
- anthropics__claude-quickstarts/browser-toolset/python/requirements.txt: 1 sentences, 0 findings
- anthropics__claude-quickstarts/browser-use-demo/CHANGELOG.md: 38 sentences, 9 findings
- anthropics__claude-quickstarts/browser-use-demo/README.md: 121 sentences, 45 findings
- anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/requirements.txt: 1 sentences, 0 findings
- anthropics__claude-quickstarts/browser-use-demo/test-requirements.txt: 0 sentences, 0 findings
- anthropics__claude-quickstarts/browser-use-demo/tests/README.md: 71 sentences, 10 findings
- anthropics__claude-quickstarts/computer-toolset/README.md: 49 sentences, 25 findings
- anthropics__claude-quickstarts/computer-toolset/python/requirements.txt: 1 sentences, 0 findings
- anthropics__claude-quickstarts/computer-use-best-practices/.claude/skills/first-run/SKILL.md: 44 sentences, 10 findings
- anthropics__claude-quickstarts/computer-use-best-practices/.vscode/launch.json: 1 sentences, 0 findings
- anthropics__claude-quickstarts/computer-use-best-practices/README.md: 315 sentences, 68 findings
- anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt: 70 sentences, 70 findings
- anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md: 27 sentences, 10 findings
- anthropics__claude-quickstarts/computer-use-demo/CONTRIBUTING.md: 73 sentences, 11 findings
- anthropics__claude-quickstarts/computer-use-demo/README.md: 61 sentences, 40 findings
- anthropics__claude-quickstarts/computer-use-demo/computer_use_demo/requirements.txt: 1 sentences, 0 findings
- anthropics__claude-quickstarts/computer-use-demo/dev-requirements.txt: 1 sentences, 0 findings
- anthropics__claude-quickstarts/customer-support-agent/README.md: 119 sentences, 46 findings
- anthropics__claude-quickstarts/financial-data-analyst/README.md: 63 sentences, 16 findings
- anthropics__claude-quickstarts/managed-agents/README.md: 128 sentences, 12 findings
- anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md: 31 sentences, 18 findings
- anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md: 66 sentences, 43 findings
- anthropics__claude-quickstarts/managed-agents/assistant-ui/agents/spreadsheet-analyst.md: 56 sentences, 5 findings
- anthropics__claude-quickstarts/managed-agents/assistant-ui/components/NOTICE.md: 8 sentences, 3 findings
- anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md: 74 sentences, 42 findings
- anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md: 21 sentences, 19 findings
- anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md: 39 sentences, 16 findings
- anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md: 127 sentences, 90 findings
- anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/.claude/skills/verify/SKILL.md: 17 sentences, 2 findings
- anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md: 54 sentences, 39 findings
- anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/README.md: 59 sentences, 10 findings
- anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/agents/financial-assistant.md: 49 sentences, 8 findings
- anthropics__claude-quickstarts/managed-agents/daily-brief/CLAUDE.md: 32 sentences, 10 findings
- anthropics__claude-quickstarts/managed-agents/daily-brief/README.md: 64 sentences, 40 findings
- anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md: 73 sentences, 52 findings
- anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/deployment.md: 25 sentences, 2 findings
- anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/memory_store_preferences.yaml: 3 sentences, 1 findings
- anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/memory_store_state.yaml: 1 sentences, 1 findings
- anthropics__claude-quickstarts/managed-agents/daily-brief/preferences.example.md: 22 sentences, 2 findings
- anthropics__claude-quickstarts/managed-agents/daily-brief/slack/manifest.yaml: 1 sentences, 0 findings
- anthropics__claude-quickstarts/managed-agents/knowledge-wiki/CLAUDE.md: 13 sentences, 5 findings
- anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md: 91 sentences, 21 findings
- anthropics__claude-quickstarts/managed-agents/knowledge-wiki/example_data/analyst_note_synthetic.md: 18 sentences, 5 findings
- anthropics__claude-quickstarts/managed-agents/knowledge-wiki/requirements.txt: 0 sentences, 0 findings
- anthropics__claude-quickstarts/managed-agents/knowledge-wiki/skill.md: 50 sentences, 16 findings
- anthropics__claude-quickstarts/managed-agents/linear/CLAUDE.md: 20 sentences, 15 findings
- anthropics__claude-quickstarts/managed-agents/linear/README.md: 15 sentences, 5 findings
- anthropics__claude-quickstarts/managed-agents/linear/agents/linear-assistant.md: 16 sentences, 3 findings
- anthropics__claude-quickstarts/managed-agents/linear/skill.md: 144 sentences, 53 findings
- anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/CLAUDE.md: 16 sentences, 1 findings
- anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/README.md: 25 sentences, 7 findings
- anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md: 93 sentences, 23 findings
- anthropics__claude-quickstarts/managed-agents/roadtrip-planner/CLAUDE.md: 94 sentences, 11 findings
- anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md: 124 sentences, 47 findings
- anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/plan-reviewer.md: 24 sentences, 5 findings
- anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/roadtrip-planner.md: 87 sentences, 15 findings
- anthropics__claude-quickstarts/managed-agents/roadtrip-planner/environments/roadtrip-planner.yaml: 1 sentences, 1 findings
- anthropics__claude-quickstarts/managed-agents/roadtrip-planner/skill.md: 29 sentences, 11 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/CLAUDE.md: 131 sentences, 6 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/README.md: 91 sentences, 13 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/README.md: 94 sentences, 4 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/agents/edgar-analyst.md: 68 sentences, 14 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/requirements.txt: 0 sentences, 0 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/cloudflare-containers/README.md: 59 sentences, 3 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/cloudflare-worker/README.md: 46 sentences, 3 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/daytona/README.md: 69 sentences, 9 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker/README.md: 57 sentences, 2 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker/agents/sandbox-demo.md: 10 sentences, 0 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker-memory/README.md: 97 sentences, 6 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker-memory/agents/memory-demo.md: 13 sentences, 1 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker-memory/memory_stores/user-preferences.yaml: 1 sentences, 1 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/modal/README.md: 91 sentences, 13 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md: 232 sentences, 24 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/agents/openshell-demo.md: 20 sentences, 3 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md: 180 sentences, 24 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/vercel/README.md: 96 sentences, 11 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/webhook-demo/README.md: 28 sentences, 4 findings
- anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/webhook-demo/agents/webhook-demo.md: 12 sentences, 2 findings
- anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md: 26 sentences, 18 findings
- anthropics__claude-quickstarts/managed-agents/sentry/README.md: 133 sentences, 18 findings
- anthropics__claude-quickstarts/managed-agents/sentry/agents/sentry-triage.md: 82 sentences, 5 findings
- anthropics__claude-quickstarts/managed-agents/sentry/skill.md: 154 sentences, 30 findings
- anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md: 20 sentences, 16 findings
- anthropics__claude-quickstarts/managed-agents/slack/README.md: 12 sentences, 3 findings
- anthropics__claude-quickstarts/managed-agents/slack/agents/slack-assistant.md: 16 sentences, 5 findings
- anthropics__claude-quickstarts/managed-agents/slack/skill.md: 117 sentences, 44 findings

## Document-wide prompt-injection scan (ADSF)

_Regex and Unicode checks over every file. It flags suspicious content; a clean result does not prove a file is safe._

533 files scanned, 52 findings.

## Standards map (maps to, not compliance)

✅ covered by a check · 🟡 partly · ⬜ not checked. Numbers = findings in this scan that map to the item.

### Anthropic / Claude agent guidance (summarized)

_Practices summarized from Anthropic's public docs and engineering posts on building and securing agents._ (7 ✅ · 1 🟡 · 0 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| AN-CONFIRM Ask a human before consequential or irreversible actions | ✅ | 541 (64 high) | Gate map |
| AN-LEASTPRIV Least-privilege tools and credentials | ✅ | 440 (2 high) | Shared tokens, reach, wildcards |
| AN-UNTRUSTED Treat tool results and web/doc content as untrusted (prompt injection) | ✅ | 53 (45 high) | Injection scan |
| AN-SANDBOX Run in a sandbox / isolated environment | 🟡 | 2 (2 high) | Real browser profile use |
| AN-PROMPT Clear system prompt with explicit constraints | ✅ | 1490 | Deny-list check, STE clarity |
| AN-EVALS Build evaluations with test cases | ✅ | - | Generates functional + security eval sets (not run) |
| AN-LIMITS Limit cost and steps | ✅ | 21 | Caps and budgets |
| AN-OBSERVE Log and monitor agent actions | ✅ | 9 | Tracing |

### Microsoft Copilot Studio governance areas (summarized)

_Areas summarized from Microsoft's public documentation. This tool scans exported agent files/configs only; it does not read your tenant._ (2 ✅ · 5 🟡 · 2 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| CS-DLP Data policies for connectors | 🟡 | 1 (1 high) | Source-to-sink reach in exported configs |
| CS-AUTH Agent authentication | 🟡 | 1 (1 high) | Credentials in files |
| CS-SHARE Maker permissions and sharing | ⬜ | - | Not checked (tenant setting) |
| CS-ENV Environment strategy (dev/test/prod) | ⬜ | - | Not checked |
| CS-AUDIT Audit logging and monitoring | 🟡 | 9 | Tracing references |
| CS-KNOW Knowledge sources for generative answers | 🟡 | 52 (45 high) | Injection scan over knowledge files you point it at |
| CS-MOD Content moderation and instructions | 🟡 | 80 (57 high) | Prompt checks |
| CS-HANDOFF Escalation / human handoff | ✅ | 1 | Handoff rules and transcripts |
| CS-ACTIONS Actions and flows that change data | ✅ | 541 (64 high) | Gate map |

### CSA AI Controls Matrix (AICM) domains

_Domain names only._ (3 ✅ · 9 🟡 · 6 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| A&A Audit & Assurance | 🟡 | - | Audit memo + SARIF |
| AIS Application & Interface Security | 🟡 | 593 (109 high) | Gates, injection |
| BCR Business Continuity & Operational Resilience | 🟡 | 2 | Single-LLM fallback |
| CCC Change Control & Configuration | 🟡 | 34 | Pinning, review record |
| CEK Cryptography, Encryption & Key Management | 🟡 | - | Hardcoded keys |
| DCS Datacenter Security | ⬜ | - | Not checked |
| DSP Data Security & Privacy Lifecycle | ✅ | 60 (2 high) | PII, secrets, data paths |
| GRC Governance, Risk & Compliance | 🟡 | - | Owner, inventory |
| HRS Human Resources | ⬜ | - | Not checked |
| IAM Identity & Access Management | ✅ | 4 (4 high) | Shared credentials, scopes, profiles |
| IPY Interoperability & Portability | ⬜ | - | Not checked |
| I&S Infrastructure Security | ⬜ | - | Not checked |
| LOG Logging & Monitoring | ✅ | 10 | Tracing, observability gaps |
| MDS Model Security | 🟡 | 86 (45 high) | Injection, pinning |
| SEF Security Incident Management & Forensics | ⬜ | - | Not checked |
| STA Supply Chain, Transparency & Accountability | 🟡 | 95 (7 high) | Inventory, disclosure |
| TVM Threat & Vulnerability Management | 🟡 | 593 (109 high) | Static findings |
| UEM Universal Endpoint Management | ⬜ | - | Not checked |

### EU AI Act basics (selected articles)

_Selected articles for orientation. Not legal advice; maps to, not compliant with._ (3 ✅ · 4 🟡 · 2 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| Art.4 AI literacy | ⬜ | - | Not checked |
| Art.5 Prohibited practices | ⬜ | - | Not checked |
| Art.9 Risk management system (high-risk) | 🟡 | - | Audit memo is an input |
| Art.10 Data and data governance | 🟡 | - | Personal data in agent files |
| Art.12 Record-keeping (logging) | ✅ | 10 | Tracing/logging checks |
| Art.13 Transparency and information to deployers | 🟡 | - | Owner docs |
| Art.14 Human oversight | ✅ | 542 (64 high) | Approval gates, handoff |
| Art.15 Accuracy, robustness and cybersecurity | 🟡 | 53 (45 high) | Injection, secrets, grounding |
| Art.50 Transparency: tell people they are talking to AI | ✅ | 1 | Bot disclosure checks |

### ISO/IEC 42001:2023 Annex A control areas

_Annex A area names only (the standard text is copyrighted and not included). Maps to, not compliant with._ (2 ✅ · 6 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| A.2 Policies related to AI | ⬜ | - | Not checked |
| A.3 Internal organization (roles, responsibilities) | 🟡 | - | Owner/maintainer recorded |
| A.4 Resources for AI systems (inventory of tools, data, compute) | ✅ | 154 (9 high) | AI and connector inventory |
| A.5 Assessing impacts of AI systems | 🟡 | - | Audit memo is a starting input |
| A.6 AI system life cycle (verification, deployment, operation, monitoring) | 🟡 | 44 | Tracing, pinning; generated eval sets |
| A.7 Data for AI systems | 🟡 | 1 (1 high) | Personal data reach |
| A.8 Information for interested parties | 🟡 | 1 | Bot disclosure |
| A.9 Use of AI systems (responsible use, human oversight) | ✅ | 542 (64 high) | Approval gates, handoff rules |
| A.10 Third-party and customer relationships | 🟡 | 94 (7 high) | Provider inventory |

### MITRE ATLAS (selected techniques)

_Selected agent techniques; IDs/names per ATLAS data (via framework-pitch research)._ (9 ✅ · 4 🟡 · 0 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| AML.T0051 LLM Prompt Injection (direct and indirect) | ✅ | 53 (45 high) | Injection scan + untrusted-input rules + eval cases |
| AML.T0054 LLM Jailbreak | 🟡 | - | Obeyed overrides in transcripts; jailbreak eval cases |
| AML.T0056 LLM Meta Prompt Extraction | ✅ | - | Secrets in prompts, leaks in transcripts |
| AML.T0057 LLM Data Leakage | ✅ | 60 (2 high) | Personal-to-work paths, other customers' data |
| AML.T0053 AI Agent Tool Invocation | ✅ | 542 (65 high) | Tool gates and credential sharing |
| AML.T0034 Cost Harvesting | ✅ | 18 (7 high) | Caps and budgets |
| AML.T0029 Denial of ML Service | 🟡 | 15 | Timeouts and step caps |
| AML.T0055 Unsecured Credentials | ✅ | - | Hardcoded secrets |
| AML.T0010 ML Supply Chain Compromise | 🟡 | 34 | Pinning only |
| AML.T0083 Credentials from AI Agent Configuration | ✅ | - | Secrets in agent/MCP configs, .env present |
| AML.T0086 Exfiltration via AI Agent Tool Invocation | ✅ | 1 (1 high) | Source-to-sink paths, hardcoded webhooks, exfil instructions/links in docs |
| AML.T0101 Data Destruction via AI Agent Tool Invocation | ✅ | 34 (34 high) | Ungated delete/drop/destroy/purge tools |
| AML.T0100 AI Agent Clickbait | 🟡 | 464 (26 high) | Browser writes, shorteners, allowlists |

### NIST AI RMF 1.0 (functions) + Generative AI Profile (NIST AI 600-1) risks

_Function names from AI RMF 1.0; risk names from the GenAI Profile. This tool supports a few outcomes; it does not implement the framework._ (4 ✅ · 6 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| GOVERN Govern: policies, accountability, oversight | 🟡 | - | Owner and review records; AI inventory |
| MAP Map: context, components, third parties | ✅ | 154 (9 high) | AI inventory (providers, SDKs, models), connector inventory and source-to-sink map |
| MEASURE Measure: test and evaluate | 🟡 | 10 | Generates eval sets (functional + security) from the source; does not run them |
| MANAGE Manage: prioritize and respond to risks | 🟡 | - | P0–P2 audit memo and SARIF for CI; no incident workflow |
| GAI-Confabulation GenAI risk: Confabulation | 🟡 | 1 | Grounding rule checks |
| GAI-DataPrivacy GenAI risk: Data Privacy | ✅ | 60 (2 high) | PII, secrets, personal-to-work paths |
| GAI-HumanAI GenAI risk: Human-AI Configuration | ✅ | 543 (64 high) | Approval gates, disclosure, handoff |
| GAI-InfoIntegrity GenAI risk: Information Integrity | 🟡 | - | FAQ grounding; STE information-loss compare |
| GAI-InfoSecurity GenAI risk: Information Security | ✅ | 54 (47 high) | Injection scan, secrets, token lifting |
| GAI-ValueChain GenAI risk: Value Chain and Component Integration | 🟡 | 34 | Provider/SDK/model inventory and pinning |
| GAI-Harmful GenAI risks: CBRN, violent/hateful, obscene, bias, IP, environmental | ⬜ | - | Not checked |

### OWASP Top 10 for Agentic Applications 2026 (ASI01–ASI10)

_Item names as listed in the OWASP GenAI Security Project document (via framework-pitch research)._ (3 ✅ · 6 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| ASI01 Agent Goal Hijack | ✅ | 92 (45 high) | ADSF injection scan over all docs, untrusted-input rule, deny-list check |
| ASI02 Tool Misuse and Exploitation | ✅ | 541 (64 high) | Gate map, rate limits, allowlists, wildcard domains, URL shorteners |
| ASI03 Identity and Privilege Abuse | ✅ | 5 (5 high) | Shared credentials, scopes, browser profiles, cookie reads |
| ASI04 Agentic Supply Chain Vulnerabilities | 🟡 | 34 | MCP/provider inventory, unpinned models; no registry integrity check |
| ASI05 Unexpected Code Execution | 🟡 | - | Free-form shell/exec/SQL tools |
| ASI06 Memory and Context Poisoning | 🟡 | 52 (45 high) | ADSF scan of knowledge/memory files you point it at; no runtime memory check |
| ASI07 Insecure Inter-Agent Communication | ⬜ | - | Not checked |
| ASI08 Cascading Failures | 🟡 | 32 (7 high) | Step, loop and retry caps, timeouts, single-provider fallback |
| ASI09 Human-Agent Trust Exploitation | 🟡 | 1 | Bot disclosure, human claims, unrecorded handoffs |
| ASI10 Rogue Agents | 🟡 | 10 | Tracing, owner, observability; no stop-switch check |

### OWASP Agentic AI – Threats and Mitigations (T1–T15)

_Threat names from the OWASP Agentic Security Initiative taxonomy._ (5 ✅ · 7 🟡 · 3 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| T1 Memory Poisoning | 🟡 | 52 (45 high) | Hidden instructions in files an agent may load as memory/knowledge |
| T2 Tool Misuse | ✅ | 541 (64 high) | Gate map: approval, dry-run, rate limit, allowlist per tool |
| T3 Privilege Compromise | ✅ | 5 (5 high) | Shared tokens, broad reach, real browser profiles, cookie reads |
| T4 Resource Overload | ✅ | 33 (7 high) | Caps, timeouts, loops, budgets |
| T5 Cascading Hallucination Attacks | 🟡 | 1 | Grounding rules only |
| T6 Intent Breaking & Goal Manipulation | ✅ | 53 (45 high) | Injection scan, untrusted-input rule, obeyed overrides |
| T7 Misaligned & Deceptive Behaviors | 🟡 | 1 | Bot-disclosure / human-persona checks |
| T8 Repudiation & Untraceability | ✅ | 10 | Tracing and logging checks |
| T9 Identity Spoofing & Impersonation | 🟡 | 1 (1 high) | Shared credentials; claims to be human |
| T10 Overwhelming Human in the Loop | ⬜ | - | Not checked |
| T11 Unexpected RCE and Code Attacks | 🟡 | - | Shell/exec/SQL tools fed by model output |
| T12 Agent Communication Poisoning | 🟡 | 52 (45 high) | Injection patterns in shared files only; no runtime message checks |
| T13 Rogue Agents in Multi-Agent Systems | ⬜ | - | Not checked |
| T14 Human Attacks on Multi-Agent Systems | ⬜ | - | Not checked |
| T15 Human Manipulation | 🟡 | 2 (1 high) | Persona, unsafe advice |

### OWASP Top 10 for LLM Applications 2025

_Item names from the OWASP 2025 list. Status = what this tool checks statically, not whether your app is safe._ (5 ✅ · 4 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| LLM01 Prompt Injection | ✅ | 92 (45 high) | Document-wide injection scan (ADSF tab), untrusted-input rule in prompts, obeyed overrides in transcripts, injection eval cases |
| LLM02 Sensitive Information Disclosure | ✅ | 60 (2 high) | Secrets/PII in files, personal-to-work source-to-sink paths, confidential text in prompts, leaks in transcripts |
| LLM03 Supply Chain | 🟡 | 34 | Model pinning and SDK inventory only; no dependency or model-provenance scan |
| LLM04 Data and Model Poisoning | 🟡 | 52 (45 high) | Poisoned instructions hidden in docs/knowledge files; no training-data checks |
| LLM05 Improper Output Handling | 🟡 | 34 (34 high) | Shell/SQL/exec tools and ungated actions that consume model output; no taint tracking |
| LLM06 Excessive Agency | ✅ | 543 (66 high) | Gate map for irreversible tools and browser actions, shared credentials, scopes |
| LLM07 System Prompt Leakage | ✅ | - | Secrets and internal notes in prompts; leaked prompt text in transcripts |
| LLM08 Vector and Embedding Weaknesses | ⬜ | - | Not checked |
| LLM09 Misinformation | 🟡 | 1452 | 'I don't know' rule, made-up prices/policies vs your FAQ; STE clarity checks |
| LLM10 Unbounded Consumption | ✅ | 41 (7 high) | Token caps, timeouts, retry/step caps, infinite loops, budget alerts, bill smells |


## Generated eval sets

45 functional and 137 security test cases in `evals/` (JSONL + README.md). Generated from the source; not run.

## 4. Findings (P0 = fix before real traffic)

### Personal-to-work data crossover

- **P0** `crossover.shared_credential` (across agents) — Credential ANTHROPIC_API_KEY is used by 7 agents: agents, autonomous-coding, browser-use-demo, computer-use-best-practices, customer-support-agent, financial-data-analyst, managed-agents. They are not really separate agents if they share connections. Give each its own scoped token. (`ANTHROPIC_API_KEY`)
- **P0** `crossover.source_to_sink` anthropics__claude-quickstarts/managed-agents/assistant-ui/lib/managed-agents/reducer.ts:251 — Agent 'managed-agents' can read personal sources (personal_calendar_contacts, finance, tax_paths) and write to work sinks (slack, discord, generic_webhook). Split the connections, scope tokens read-only, and allowlist output channels. (`managed-agents`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:650 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:652 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:658 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:672 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:674 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:679 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:680 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:681 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:682 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:686 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:688 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:694 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:695 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:706 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:715 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:717 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:723 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:724 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:735 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:748 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:772 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:784 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:790 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:799 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:805 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:851 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:869 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:878 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:890 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:899 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:908 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:917 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:929 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:938 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:944 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:953 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:968 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:992 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:1007 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:1020 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:1029 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:1031 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:1119 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:1120 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`copilotkit`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:43 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`credentials`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/daily-brief/CLAUDE.md:3 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`container`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/daily-brief/CLAUDE.md:3 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`credentials`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/daily-brief/CLAUDE.md:3 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`credentials`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/daily-brief/CLAUDE.md:25 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`credential`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:58 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`credential`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/README.md:23 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`credentials`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md:13 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`coordinator`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md:13 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`coordinator`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/slack/README.md:32 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`checklist`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/slack/skill.md:72 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`credentials`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/slack/skill.md:74 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`credentials`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/slack/skill.md:78 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`credentials`)
- **P2** `crossover.slack_channel_id` anthropics__claude-quickstarts/managed-agents/slack/src/route-signature.ts:22 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`createHmac`)

### Irreversible actions

- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/agents/utils/history_util.py:85 — Irreversible tool remove_message_pair has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def remove_message_pair():`)
- **P0** `actions.browser_profile` anthropics__claude-quickstarts/browser-toolset/python/cdp_browser.py:92 — Uses a real browser profile, so the agent acts with your logged-in sessions. (`user-data-dir`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/browser-toolset/python/cdp_browser.py:156 — Irreversible tool _send has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def _send(self, method: str, params: dict[str, Any] | None = None) -> dict[str, Any]:`)
- **P0** `actions.browser_profile` anthropics__claude-quickstarts/browser-toolset/typescript/cdp-browser.ts:124 — Uses a real browser profile, so the agent acts with your logged-in sessions. (`user-data-dir`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/browser-toolset/typescript/cdp-browser.ts:351 — Irreversible tool removeProfile has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`async function removeProfile(dir: string): Promise<void> {`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/tools/browser.py:519 — Browser write action .click( has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`await self._page.mouse.click(`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/tools/browser.py:564 — Browser write action .type( has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`await self._page.keyboard.type(text)`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/tools/browser.py:592 — Browser write action .press( has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`await self._page.keyboard.press(mapped_key)`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/computer-toolset/typescript/vnc-computer.ts:265 — Browser write action .click( has no approval gate or dry-run mode. Add a human confirm step before it runs. (`await this.click(input, 1, 1);`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/browser.py:179 — Browser write action .click( has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`page.mouse.click(`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/browser.py:202 — Browser write action .type( has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`page.keyboard.type(kwargs["text"])`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/browser.py:207 — Browser write action .press( has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`page.keyboard.press(chord)`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/computer.py:145 — Browser write action .press( has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`pyautogui.press(key)`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/computer.py:322 — Browser write action .click( has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`pyautogui.click(clicks=clicks, interval=0.05, button=button)`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/computer-use-best-practices/constants.py:219 — Irreversible tool __post_init__ has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def __post_init__(self) -> None:`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/computer-use-best-practices/dev_ui/localization_demo/static/index.html:301 — Browser write action method: 'POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`const res = await fetch('/localize', {method: 'POST', body: fd});`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/computer-use-best-practices/dev_ui/tool_panel/static/index.html:118 — Browser write action method: 'POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`method: 'POST', headers: {'content-type': 'application/json'},`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/computer-use-best-practices/tests/test_base.py:56 — Irreversible tool test_delete_key_maps_to_backspace_on_mac has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def test_delete_key_maps_to_backspace_on_mac():`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/computer-use-best-practices/tests/test_computer.py:129 — Irreversible tool test_drag_and_scroll_accept_modifiers has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def test_drag_and_scroll_accept_modifiers(gui):`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/computer-use-best-practices/tests/test_loop.py:184 — Irreversible tool test_execute_runs_members_in_order_and_stops_after_the_first_failure has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def test_execute_runs_members_in_order_and_stops_after_the_first_failure(tools):`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md:81 — Browser write action .fill( has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`model_input.fill(model)`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md:82 — Browser write action .press( has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`model_input.press("Enter")  # commits the text_input and fires on_change`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md:85 — Browser write action .click( has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`sidebar.get_by_text(tool_version, exact=True).click()`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/customer-support-agent/app/api/chat/route.ts:64 — Irreversible tool POST has no approval gate or dry-run mode. Add a human confirm step before it runs. (`export async function POST(req: Request) {`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/customer-support-agent/components/ChatArea.tsx:448 — Browser write action method: "POST has no approval gate or dry-run mode. Add a human confirm step before it runs. (`method: "POST",`)
- **P0** `actions.storage_read` anthropics__claude-quickstarts/customer-support-agent/components/TopNavBar.tsx:54 — Reads a site's browser storage or the config the site sends to browsers. (`localStorage.getItem`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/financial-data-analyst/app/api/finance/route.ts:103 — Irreversible tool POST has no approval gate or dry-run mode. Add a human confirm step before it runs. (`export async function POST(req: NextRequest) {`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/financial-data-analyst/app/finance/page.tsx:438 — Browser write action method: "POST has no approval gate or dry-run mode. Add a human confirm step before it runs. (`method: "POST",`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/financial-data-analyst/app/finance/page.tsx:642 — Browser write action .click( has no approval gate or dry-run mode. Add a human confirm step before it runs. (`onClick={() => fileInputRef.current?.click()}`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/assistant-ui/app/api/sessions/[id]/archive/route.ts:13 — Irreversible tool POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`export async function POST(_request: Request, { params }: Ctx) {`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/assistant-ui/app/api/sessions/[id]/confirm/route.ts:28 — Irreversible tool POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`export async function POST(request: Request, { params }: Ctx) {`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/assistant-ui/app/api/sessions/[id]/files/route.ts:26 — Irreversible tool POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`export async function POST(request: Request, { params }: Ctx) {`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/assistant-ui/app/api/sessions/[id]/interrupt/route.ts:13 — Irreversible tool POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`export async function POST(_request: Request, { params }: Ctx) {`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/assistant-ui/app/api/sessions/[id]/messages/route.ts:20 — Irreversible tool POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`export async function POST(request: Request, { params }: Ctx) {`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/assistant-ui/app/api/sessions/[id]/route.ts:45 — Irreversible tool DELETE has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`export async function DELETE(_request: Request, { params }: Ctx) {`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/assistant-ui/app/api/sessions/[id]/tool-results/route.ts:21 — Irreversible tool POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`export async function POST(request: Request, { params }: Ctx) {`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/assistant-ui/app/api/sessions/route.ts:55 — Irreversible tool POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`export async function POST(request: Request) {`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/managed-agents/assistant-ui/components/assistant-ui/image.tsx:76 — Browser write action .click( has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`a.click();`)
- **P0** `actions.cookie_read` anthropics__claude-quickstarts/managed-agents/assistant-ui/components/ui/sidebar.tsx:85 — Reads browser cookies. Agents have lifted working tokens this way. (`document.cookie`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/managed-agents/assistant-ui/lib/managed-agents/api.ts:33 — Browser write action method: "POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`method: "POST",`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/assistant-ui/lib/managed-agents/api.ts:58 — Irreversible tool deleteSession has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`export async function deleteSession(id: string): Promise<void> {`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/managed-agents/assistant-ui/lib/managed-agents/session-controller.ts:336 — Browser write action method: "POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`method: "POST",`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/assistant-ui/lib/managed-agents/session-controller.ts:500 — Irreversible tool dropSessionController has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`export function dropSessionController(sessionId: string): void {`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/chat-sdk/src/activity.ts:13 — Irreversible tool publishActivity has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`export function publishActivity(threadId: string, item: ActivityItem): void {`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/chat-sdk/src/managed-agents.ts:155 — Irreversible tool streamingPost has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`function streamingPost(thread: BotThread): StreamingPost {`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/managed-agents/chat-sdk/web/app.tsx:284 — Browser write action method: "POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`const response = await fetch("/api/sessions", { method: "POST" });`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/utilities.py:118 — Browser write action .fill( has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`print(textwrap.fill(block.text, width=100))`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/linear/src/managed-agents-webhook.ts:63 — Irreversible tool postReply has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`async function postReply(event: Anthropic.Beta.BetaWebhookEvent): Promise<Response> {`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/linear/src/managed-agents-webhook.ts:191 — Irreversible tool postActivity has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`async function postActivity(`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/managed-agents/linear/src/oauth.ts:226 — Browser write action method: "POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`method: "POST",`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/linear/src/route-signature.ts:29 — Irreversible tool signRoute has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`export function signRoute(sessionId: string, a: string, b: string, issuedAt: string): string {`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/src/managed-agents.ts:73 — Irreversible tool sendMessage has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`export async function sendMessage(session_id: string, text: string) {`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/src/app/api/chat/route.ts:13 — Irreversible tool POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`export async function POST(request: Request) {`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/src/app/api/interrupt/route.ts:10 — Irreversible tool POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`export async function POST() {`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/src/app/api/session/route.ts:22 — Irreversible tool POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`export async function POST(request: Request) {`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/src/app/page.tsx:56 — Browser write action method: "POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`if (fresh) await fetch("/api/interrupt", { method: "POST" }).catch(() => {});`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/src/lib/use-managed-agent-session.ts:33 — Irreversible tool mergeLog has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`function mergeLog(authoritative: ManagedAgentEvent[], current: ManagedAgentEvent[]) {`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/src/lib/use-managed-agent-session.ts:145 — Browser write action method: "POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`method: "POST",`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/sandboxes.py:87 — Irreversible tool destroy has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def destroy(sandbox: archil.Sandbox) -> None:`)
- **P0** `actions.browser_write` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/modal/modal_sandbox_webhook.py:324 — Browser write action method="POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`@modal.fastapi_endpoint(method="POST")`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/vercel/api/webhook.ts:387 — Irreversible tool POST has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`export async function POST(req: Request): Promise<Response> {`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/slack/src/managed-agents-webhook.ts:56 — Irreversible tool postReply has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`async function postReply(event: Anthropic.Beta.BetaWebhookEvent): Promise<Response> {`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/slack/src/managed-agents-webhook.ts:189 — Irreversible tool post has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`async function post(`)
- **P0** `actions.irreversible_tool` anthropics__claude-quickstarts/managed-agents/slack/src/route-signature.ts:29 — Irreversible tool signRoute has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`export function signRoute(sessionId: string, a: string, b: string, issuedAt: string): string {`)
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/agents/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/agents/test_message_params.py:42 — Wildcard domain or host permission. (`'*60}"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/agents/test_message_params.py:44 — Wildcard domain or host permission. (`'*60)
        
        try:
            test_func()
            self.passed += 1`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/agents/test_message_params.py:226 — Wildcard domain or host permission. (`"*60)
        
        tests = [
            ("`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/agents/test_message_params.py:242 — Wildcard domain or host permission. (`'*60}"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/agents/test_message_params.py:244 — Wildcard domain or host permission. (`"*60)
        
        return self.failed == 0


def main():
    "`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/agents/tools/calculator_mcp.py:30 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/agents/tools/file_tools.py:54 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/agents/tools/file_tools.py:104 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:108 — Wildcard domain or host permission. (`"**

After thorough verification, change:
'''json
"`)
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/autonomous-coding/prompts/initializer_prompt.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/autonomous-coding/README.md:152 — Wildcard domain or host permission. (`"**
This is normal. The initializer agent is generating 200 detailed test cases,`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/autonomous-coding/README.md:155 — Wildcard domain or host permission. (`"**
The agent tried to run a command not in the allowlist. This is the security `)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/browser-toolset/python/run.py:67 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/browser-toolset/typescript/tsconfig.json:2 — Wildcard domain or host permission. (`"*.ts"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/browser_tool_utils/browser_key_map.py:88 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/browser_tool_utils/browser_key_map.py:88 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/browser_tool_utils/browser_key_map.py:88 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/browser_tool_utils/browser_key_map.py:172 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/tools/browser.py:1029 — Wildcard domain or host permission. (`"*:has-text('`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-toolset/python/run.py:43 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-toolset/typescript/tsconfig.json:2 — Wildcard domain or host permission. (`"*.ts"`)
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/computer-use-best-practices/.claude/skills/first-run/SKILL.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/computer.py:169 — Wildcard domain or host permission. (`"* screenshot: capture the screen.\n"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/computer.py:170 — Wildcard domain or host permission. (`"* left_click / double_click / triple_click / right_click / "`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/computer.py:174 — Wildcard domain or host permission. (`"* mouse_move: move cursor to 'coordinate'.\n"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/computer.py:175 — Wildcard domain or host permission. (`"* left_click_drag: drag from 'start_coordinate' to 'coordinate'; "`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/computer.py:177 — Wildcard domain or host permission. (`"* scroll: scroll at 'coordinate' (or the current cursor position) "`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/computer.py:180 — Wildcard domain or host permission. (`"* type: type literal 'text' at the current focus.\n"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/computer.py:181 — Wildcard domain or host permission. (`"* key: press a chord like '`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/computer.py:183 — Wildcard domain or host permission. (`"* hold_key: hold the chord in 'text' for 'duration' seconds.\n"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/computer.py:184 — Wildcard domain or host permission. (`"* left_mouse_down / left_mouse_up: press or release the left "`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/computer.py:187 — Wildcard domain or host permission. (`"* cursor_position: return the current cursor x,y.\n"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/computer.py:188 — Wildcard domain or host permission. (`"* read_clipboard / write_clipboard: get/set clipboard 'text'.\n"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/computer.py:189 — Wildcard domain or host permission. (`"* wait: sleep 'duration' seconds.\n"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/computer.py:190 — Wildcard domain or host permission. (`"* zoom: return a cropped, higher-detail view of the screen "`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/editor.py:43 — Wildcard domain or host permission. (`"* view: show a file (text with line numbers, image as an "`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/editor.py:46 — Wildcard domain or host permission. (`"* create: create or overwrite a file with 'file_text'.\n"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/editor.py:47 — Wildcard domain or host permission. (`"* str_replace: replace the single occurrence of 'old_str' "`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/tools/editor.py:50 — Wildcard domain or host permission. (`"* insert: insert 'new_str' after line 'insert_line' "`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/dev_ui/trajectory_viewer/app.py:33 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/computer-use-best-practices/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-best-practices/README.md:120 — Wildcard domain or host permission. (`"** dialog the first time the agent takes a
screenshot, and roughly once a month`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-demo/computer_use_demo/streamlit.py:612 — Wildcard domain or host permission. (`"**{error.__class__.__name__}**\n\n{body}"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/computer-use-demo/computer_use_demo/tools/edit.py:122 — Wildcard domain or host permission. (`'*/\.*'`)
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/computer-use-demo/CONTRIBUTING.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/computer-use-demo/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/amplify.yml:17 — Wildcard domain or host permission. (`"**/*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/app/api/chat/route.ts:81 — Wildcard domain or host permission. (`"****"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1544 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1545 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1570 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1571 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1596 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1597 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1616 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1631 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1662 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1663 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1682 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1704 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1705 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1733 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1734 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1753 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1773 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1774 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1796 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1831 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1832 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1863 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1864 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1887 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1888 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1911 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1912 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1934 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1935 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1965 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1966 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:1988 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:2003 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:2021 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:2039 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:2054 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:2072 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:2090 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:2889 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:2910 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:2919 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:2935 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:2959 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:2975 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:2986 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:4678 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:4679 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:6200 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:7304 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:8461 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/package-lock.json:9639 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/README.md:186 — Wildcard domain or host permission. (`"**/*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/tsconfig.json:24 — Wildcard domain or host permission. (`"**/*.ts"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/customer-support-agent/tsconfig.json:24 — Wildcard domain or host permission. (`"**/*.tsx"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:573 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:574 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:599 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:600 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:625 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:626 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:645 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:660 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:675 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:690 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:712 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:713 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:741 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:742 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:761 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:781 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:782 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:813 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:848 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:849 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:880 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:881 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:900 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:919 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:920 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:943 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:944 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:966 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:967 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:997 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:998 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:1017 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:1035 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:1064 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:1065 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:1084 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:1102 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:1120 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:1135 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:1153 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:1171 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:1189 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:1190 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:1263 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:1278 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:1287 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:1324 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:1342 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:1353 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:3009 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:3010 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:3011 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:4805 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/package-lock.json:5958 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/tsconfig.json:24 — Wildcard domain or host permission. (`"**/*.ts"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/financial-data-analyst/tsconfig.json:24 — Wildcard domain or host permission. (`"**/*.tsx"`)
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/assistant-ui/agents/spreadsheet-analyst.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:93 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:140 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:141 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:167 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:186 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:201 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:1930 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:1931 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:1961 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:1962 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:1988 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:1989 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2011 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2012 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2034 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2035 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2062 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2063 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2091 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2092 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2121 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2122 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2147 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2148 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2167 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2182 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2204 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2205 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2241 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2242 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2261 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2283 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2284 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2312 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2313 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2332 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2352 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2353 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2380 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2381 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2411 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2412 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2434 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2452 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2453 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2492 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2493 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2524 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2525 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2560 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2561 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2594 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2595 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2624 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2625 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2662 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2663 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2694 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2695 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2718 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2719 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2741 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2742 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2764 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2765 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2788 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2789 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2819 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2820 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2852 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2853 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2883 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2884 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2927 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2928 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2950 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2951 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2983 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:2984 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3007 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3030 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3031 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3060 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3061 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3094 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3095 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3119 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3120 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3148 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3149 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3177 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3178 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3212 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3213 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3232 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3252 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3270 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3288 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3303 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3318 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3333 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3351 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3369 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3387 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3388 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3823 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3838 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3847 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:3870 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:5754 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:5846 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:5847 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:5848 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:8658 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:8751 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:9339 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:9340 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:9424 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:9446 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:9495 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:10852 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/package-lock.json:10928 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:99 — Wildcard domain or host permission. (`"** Claude reads ['skill.md'](./skill.md) and drives the whole thing. Or by hand`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:109 — Wildcard domain or host permission. (`"* You'`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:73 — Wildcard domain or host permission. (`"* Expect a 'show_chart' card to render inline.
8. **Confirm persistence**: relo`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/tsconfig.json:33 — Wildcard domain or host permission. (`"**/*.ts"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/assistant-ui/tsconfig.json:34 — Wildcard domain or host permission. (`"**/*.tsx"`)
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/agents/financial-assistant.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:2749 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:2750 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:2775 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:2776 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:2795 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:2810 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:2825 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:2847 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:2848 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:2876 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:2877 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:2896 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:2916 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:2917 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:2939 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:2974 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:2975 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3006 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3007 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3030 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3031 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3053 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3054 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3076 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3077 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3109 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3110 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3132 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3162 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3163 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3182 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3202 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3220 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3235 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3250 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3268 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3286 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3304 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3305 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3673 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3731 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3959 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3960 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3969 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3978 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3979 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3980 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3981 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3982 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3983 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3984 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3985 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3986 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3987 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3988 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3989 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3990 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3991 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3992 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3993 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3994 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3995 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3996 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3997 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3998 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:3999 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4000 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4001 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4002 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4003 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4004 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4005 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4006 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4007 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4022 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4031 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4052 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4053 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4074 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4095 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4116 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4131 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4164 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4185 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4212 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4221 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4222 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4231 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4246 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4255 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4266 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4267 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4268 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4269 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4305 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4306 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4394 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4403 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4404 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4437 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:4813 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:5777 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:6755 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:6798 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:6807 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:6856 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:6908 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:6930 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:6964 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:6973 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:7155 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:7206 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:7215 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:7432 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:7502 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:7537 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:7579 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:8068 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:8069 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:8070 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:8071 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:8592 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:8661 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:8739 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:9261 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:9785 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:10308 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:10815 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:11341 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:11350 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:11875 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:11884 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:12415 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:12424 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:12949 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:12958 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:13479 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:13529 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:15994 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:16016 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:16038 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:16157 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:16201 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:16244 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:16271 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:16843 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:16937 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:17268 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:17440 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:17449 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:18465 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:18795 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:18817 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/web/src/viz/renderers.tsx:145 — Wildcard domain or host permission. (`'*'`)
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/linear/agents/linear-assistant.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/linear/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/linear/skill.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/linear/skill.md:121 — Wildcard domain or host permission. (`"** after approving → the server log has Linear'`)
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:59 — Wildcard domain or host permission. (`"*

---



Same tools, but the server runs at a public URL and claude.ai connect`)
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/roadtrip-planner.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/tsconfig.json:33 — Wildcard domain or host permission. (`"**/*.ts"`)
- **P1** `actions.wildcard_domain` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/tsconfig.json:34 — Wildcard domain or host permission. (`"**/*.tsx"`)
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/agents/edgar-analyst.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker-memory/agents/memory-demo.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker-memory/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker/agents/sandbox-demo.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/agents/openshell-demo.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/webhook-demo/agents/webhook-demo.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/webhook-demo/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/sentry/agents/sentry-triage.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/sentry/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/slack/agents/slack-assistant.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/slack/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` anthropics__claude-quickstarts/managed-agents/slack/skill.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.

### Governance + cost

- **P0** `governance.unbounded_loop` anthropics__claude-quickstarts/agents/agent.py:100 — Infinite loop with no step cap or break nearby. A stuck agent here burns tokens until someone notices.
- **P0** `governance.unbounded_loop` anthropics__claude-quickstarts/browser-toolset/python/cdp_browser.py:167 — Infinite loop with no step cap or break nearby. A stuck agent here burns tokens until someone notices.
- **P0** `governance.unbounded_loop` anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/loop.py:101 — Infinite loop with no step cap or break nearby. A stuck agent here burns tokens until someone notices.
- **P0** `governance.unbounded_loop` anthropics__claude-quickstarts/computer-toolset/typescript/vnc-computer.ts:170 — Infinite loop with no step cap or break nearby. A stuck agent here burns tokens until someone notices.
- **P0** `governance.unbounded_loop` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/image.py:67 — Infinite loop with no step cap or break nearby. A stuck agent here burns tokens until someone notices.
- **P0** `governance.unbounded_loop` anthropics__claude-quickstarts/computer-use-demo/computer_use_demo/loop.py:118 — Infinite loop with no step cap or break nearby. A stuck agent here burns tokens until someone notices.
- **P0** `governance.unbounded_loop` anthropics__claude-quickstarts/managed-agents/chat-sdk/src/managed-agents.ts:161 — Infinite loop with no step cap or break nearby. A stuck agent here burns tokens until someone notices.
- **P1** `governance.no_max_tokens` anthropics__claude-quickstarts/.github/pull_request_template.md:1 — [.github] No max_tokens / output cap set on model calls.
- **P1** `governance.no_recursion_cap` anthropics__claude-quickstarts/.github/pull_request_template.md:1 — [.github] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` anthropics__claude-quickstarts/.github/pull_request_template.md:1 — [.github] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_tracing` anthropics__claude-quickstarts/.github/pull_request_template.md:1 — [.github] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_max_tokens` anthropics__claude-quickstarts/.pre-commit-config.yaml:1 — [anthropics__claude-quickstarts] No max_tokens / output cap set on model calls.
- **P1** `governance.no_timeout` anthropics__claude-quickstarts/.pre-commit-config.yaml:1 — [anthropics__claude-quickstarts] No timeout on model or tool calls.
- **P1** `governance.no_recursion_cap` anthropics__claude-quickstarts/.pre-commit-config.yaml:1 — [anthropics__claude-quickstarts] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` anthropics__claude-quickstarts/.pre-commit-config.yaml:1 — [anthropics__claude-quickstarts] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_tracing` anthropics__claude-quickstarts/.pre-commit-config.yaml:1 — [anthropics__claude-quickstarts] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_timeout` anthropics__claude-quickstarts/agents/agent.py:54 — [agents] No timeout on model or tool calls.
- **P1** `governance.no_recursion_cap` anthropics__claude-quickstarts/agents/agent.py:54 — [agents] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` anthropics__claude-quickstarts/agents/agent.py:54 — [agents] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_tracing` anthropics__claude-quickstarts/agents/agent.py:54 — [agents] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_timeout` anthropics__claude-quickstarts/autonomous-coding/README.md:1 — [autonomous-coding] No timeout on model or tool calls.
- **P1** `governance.no_tracing` anthropics__claude-quickstarts/autonomous-coding/README.md:1 — [autonomous-coding] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_recursion_cap` anthropics__claude-quickstarts/browser-toolset/README.md:1 — [browser-toolset] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` anthropics__claude-quickstarts/browser-toolset/README.md:1 — [browser-toolset] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_tracing` anthropics__claude-quickstarts/browser-toolset/README.md:1 — [browser-toolset] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_timeout` anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/loop.py:137 — [browser-use-demo] No timeout on model or tool calls.
- **P1** `governance.no_recursion_cap` anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/loop.py:137 — [browser-use-demo] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/loop.py:137 — [browser-use-demo] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_tracing` anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/loop.py:137 — [browser-use-demo] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_recursion_cap` anthropics__claude-quickstarts/computer-toolset/README.md:1 — [computer-toolset] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` anthropics__claude-quickstarts/computer-toolset/README.md:1 — [computer-toolset] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_tracing` anthropics__claude-quickstarts/computer-toolset/README.md:1 — [computer-toolset] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_recursion_cap` anthropics__claude-quickstarts/computer-use-best-practices/dev_ui/localization_demo/server.py:128 — [computer-use-best-practices] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_tracing` anthropics__claude-quickstarts/computer-use-best-practices/dev_ui/localization_demo/server.py:128 — [computer-use-best-practices] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_tracing` anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md:1 — [computer-use-demo] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_timeout` anthropics__claude-quickstarts/customer-support-agent/app/api/chat/route.ts:226 — [customer-support-agent] No timeout on model or tool calls.
- **P1** `governance.no_recursion_cap` anthropics__claude-quickstarts/customer-support-agent/app/api/chat/route.ts:226 — [customer-support-agent] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` anthropics__claude-quickstarts/customer-support-agent/app/api/chat/route.ts:226 — [customer-support-agent] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_recursion_cap` anthropics__claude-quickstarts/financial-data-analyst/app/api/finance/route.ts:214 — [financial-data-analyst] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` anthropics__claude-quickstarts/financial-data-analyst/app/api/finance/route.ts:214 — [financial-data-analyst] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_max_tokens` anthropics__claude-quickstarts/managed-agents/README.md:1 — [managed-agents] No max_tokens / output cap set on model calls.
- **P1** `governance.no_recursion_cap` anthropics__claude-quickstarts/managed-agents/README.md:1 — [managed-agents] No step / iteration / recursion cap for the agent loop.
- **P2** `governance.no_retry_cap` anthropics__claude-quickstarts/.github/pull_request_template.md:1 — [.github] No explicit retry limit or backoff.
- **P2** `governance.no_retry_cap` anthropics__claude-quickstarts/.pre-commit-config.yaml:1 — [anthropics__claude-quickstarts] No explicit retry limit or backoff.
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/agents/agent.py:25 — Model 'claude-sonnet-5-5' is not pinned to a dated version, so behavior and price can change under you. (`claude-sonnet-5-5`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/agents/agent.py:31 — Model 'Claude-powered' is not pinned to a dated version, so behavior and price can change under you. (`Claude-powered`)
- **P2** `governance.no_retry_cap` anthropics__claude-quickstarts/agents/agent.py:54 — [agents] No explicit retry limit or backoff.
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/agents/README.md:9 — Model 'claude-code' is not pinned to a dated version, so behavior and price can change under you. (`claude-code`)
- **P2** `governance.expensive_model` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:106 — Premium model 'claude-opus-4-1-20250805'. Check it isn't used for simple routing or classification calls. (`claude-opus-4-1-20250805`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:437 — Model 'claude-style' is not pinned to a dated version, so behavior and price can change under you. (`claude-style`)
- **P2** `governance.no_retry_cap` anthropics__claude-quickstarts/autonomous-coding/README.md:1 — [autonomous-coding] No explicit retry limit or backoff.
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/autonomous-coding/README.md:20 — Model 'claude-code-sdk' is not pinned to a dated version, so behavior and price can change under you. (`claude-code-sdk`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/autonomous-coding/README.md:106 — Model 'claude-progress.txt' is not pinned to a dated version, so behavior and price can change under you. (`claude-progress.txt`)
- **P2** `governance.no_retry_cap` anthropics__claude-quickstarts/browser-toolset/README.md:1 — [browser-toolset] No explicit retry limit or backoff.
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/streamlit.py:27 — Model 'claude-sonnet-4-5' is not pinned to a dated version, so behavior and price can change under you. (`claude-sonnet-4-5`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/browser-use-demo/README.md:38 — Model 'claude-quickstarts.git' is not pinned to a dated version, so behavior and price can change under you. (`claude-quickstarts.git`)
- **P2** `governance.expensive_model` anthropics__claude-quickstarts/browser-use-demo/README.md:234 — Premium model 'claude-opus-4-5-20251101'. Check it isn't used for simple routing or classification calls. (`claude-opus-4-5-20251101`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/CLAUDE.md:7 — Model 'claude-quickstarts' is not pinned to a dated version, so behavior and price can change under you. (`claude-quickstarts`)
- **P2** `governance.no_retry_cap` anthropics__claude-quickstarts/computer-toolset/README.md:1 — [computer-toolset] No explicit retry limit or backoff.
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/computer-use-best-practices/.vscode/launch.json:13 — Model 'claude-haiku-4-5' is not pinned to a dated version, so behavior and price can change under you. (`claude-haiku-4-5`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/computer-use-best-practices/.vscode/launch.json:13 — Model 'claude-sonnet-4-6' is not pinned to a dated version, so behavior and price can change under you. (`claude-sonnet-4-6`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/computer-use-best-practices/.vscode/launch.json:13 — Model 'claude-opus-4-6' is not pinned to a dated version, so behavior and price can change under you. (`claude-opus-4-6`)
- **P2** `governance.expensive_model` anthropics__claude-quickstarts/computer-use-best-practices/.vscode/launch.json:13 — Premium model 'claude-opus-4-6'. Check it isn't used for simple routing or classification calls. (`claude-opus-4-6`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/computer-use-best-practices/.vscode/launch.json:13 — Model 'claude-opus-4-7' is not pinned to a dated version, so behavior and price can change under you. (`claude-opus-4-7`)
- **P2** `governance.expensive_model` anthropics__claude-quickstarts/computer-use-best-practices/.vscode/launch.json:13 — Premium model 'claude-opus-4-7'. Check it isn't used for simple routing or classification calls. (`claude-opus-4-7`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/computer-use-best-practices/tests/test_config.py:59 — Model 'claude-experimental-v2' is not pinned to a dated version, so behavior and price can change under you. (`claude-experimental-v2`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md:36 — Model 'claude-sonnet-5' is not pinned to a dated version, so behavior and price can change under you. (`claude-sonnet-5`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/computer-use-demo/computer_use_demo/streamlit.py:39 — Model 'claude-3-5-sonnet-v2' is not pinned to a dated version, so behavior and price can change under you. (`claude-3-5-sonnet-v2`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/computer-use-demo/computer_use_demo/streamlit.py:113 — Model 'claude-opus-4-1' is not pinned to a dated version, so behavior and price can change under you. (`claude-opus-4-1`)
- **P2** `governance.expensive_model` anthropics__claude-quickstarts/computer-use-demo/computer_use_demo/streamlit.py:113 — Premium model 'claude-opus-4-1'. Check it isn't used for simple routing or classification calls. (`claude-opus-4-1`)
- **P2** `governance.expensive_model` anthropics__claude-quickstarts/computer-use-demo/computer_use_demo/streamlit.py:115 — Premium model 'claude-opus-4-20250514'. Check it isn't used for simple routing or classification calls. (`claude-opus-4-20250514`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/computer-use-demo/computer_use_demo/streamlit.py:125 — Model 'claude-opus-4-5' is not pinned to a dated version, so behavior and price can change under you. (`claude-opus-4-5`)
- **P2** `governance.expensive_model` anthropics__claude-quickstarts/computer-use-demo/computer_use_demo/streamlit.py:125 — Premium model 'claude-opus-4-5'. Check it isn't used for simple routing or classification calls. (`claude-opus-4-5`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/computer-use-demo/README.md:4 — Model 'claude-opus-4-8' is not pinned to a dated version, so behavior and price can change under you. (`claude-opus-4-8`)
- **P2** `governance.expensive_model` anthropics__claude-quickstarts/computer-use-demo/README.md:4 — Premium model 'claude-opus-4-8'. Check it isn't used for simple routing or classification calls. (`claude-opus-4-8`)
- **P2** `governance.no_retry_cap` anthropics__claude-quickstarts/customer-support-agent/app/api/chat/route.ts:226 — [customer-support-agent] No explicit retry limit or backoff.
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/customer-support-agent/components/ChatArea.tsx:696 — Model 'claude-icon.svg' is not pinned to a dated version, so behavior and price can change under you. (`claude-icon.svg`)
- **P2** `governance.no_retry_cap` anthropics__claude-quickstarts/financial-data-analyst/app/api/finance/route.ts:214 — [financial-data-analyst] No explicit retry limit or backoff.
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/managed-agents/assistant-ui/agents/spreadsheet-analyst.md:8 — Model 'claude-opus-5' is not pinned to a dated version, so behavior and price can change under you. (`claude-opus-5`)
- **P2** `governance.expensive_model` anthropics__claude-quickstarts/managed-agents/assistant-ui/agents/spreadsheet-analyst.md:8 — Premium model 'claude-opus-5'. Check it isn't used for simple routing or classification calls. (`claude-opus-5`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:7 — Model 'claude-api' is not pinned to a dated version, so behavior and price can change under you. (`claude-api`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:20 — Model 'claude-lock.json' is not pinned to a dated version, so behavior and price can change under you. (`claude-lock.json`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:57 — Model 'claude-managed-agents-vercel-services' is not pinned to a dated version, so behavior and price can change under you. (`claude-managed-agents-vercel-services`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:70 — Model 'claude-research-analyst' is not pinned to a dated version, so behavior and price can change under you. (`claude-research-analyst`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:96 — Model 'claude-managed-agents-chat-sdk' is not pinned to a dated version, so behavior and price can change under you. (`claude-managed-agents-chat-sdk`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:19 — Model 'claude-fable-5' is not pinned to a dated version, so behavior and price can change under you. (`claude-fable-5`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:75 — Model 'claude-managed-agents-0.0.1.tgz' is not pinned to a dated version, so behavior and price can change under you. (`claude-managed-agents-0.0.1.tgz`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/package-lock.json:18853 — Model 'O4' is not pinned to a dated version, so behavior and price can change under you. (`O4`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/managed-agents/README.md:28 — Model 'claude-managed-agents' is not pinned to a dated version, so behavior and price can change under you. (`claude-managed-agents`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/agents/edgar-analyst.md:8 — Model 'claude-opus-5-5' is not pinned to a dated version, so behavior and price can change under you. (`claude-opus-5-5`)
- **P2** `governance.expensive_model` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/agents/edgar-analyst.md:8 — Premium model 'claude-opus-5-5'. Check it isn't used for simple routing or classification calls. (`claude-opus-5-5`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/managed-agents/sentry/.claude/settings.json:3 — Model 'claude-plugins-official' is not pinned to a dated version, so behavior and price can change under you. (`claude-plugins-official`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/managed-agents/sentry/oauth_setup.py:53 — Model 'claude-quickstarts-sentry-oauth' is not pinned to a dated version, so behavior and price can change under you. (`claude-quickstarts-sentry-oauth`)
- **P2** `governance.unpinned_model` anthropics__claude-quickstarts/README.md:128 — Model 'claude-cookbooks' is not pinned to a dated version, so behavior and price can change under you. (`claude-cookbooks`)

### Agent Health Checker + Labs tools

- **P0** `health.retries_backoff` anthropics__claude-quickstarts/.github/workflows/build.yaml — Retries / backoff: No retry or backoff configuration detected.
- **P0** `health.tracing_hooks` anthropics__claude-quickstarts/.github/workflows/build.yaml — Tracing hooks (Langfuse / OTel): No tracing / observability hooks detected (Langfuse, OTel, callbacks, etc.).
- **P0** `health.regulated_advice` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt — Medical / dosing / legal / financial advice: Looks like a health business, but the prompt never says not to give medical or dosing advice.
- **P0** `health.retries_backoff` anthropics__claude-quickstarts/computer-use-best-practices/.vscode/launch.json — Retries / backoff: No retry or backoff configuration detected.
- **P0** `health.tracing_hooks` anthropics__claude-quickstarts/computer-use-best-practices/.vscode/launch.json — Tracing hooks (Langfuse / OTel): No tracing / observability hooks detected (Langfuse, OTel, callbacks, etc.).
- **P0** `health.prompt_injection_sinks` anthropics__claude-quickstarts/computer-use-best-practices/.vscode/launch.json — Prompt-injection sinks: Tools that execute free-form text detected without clear guard language.
- **P0** `health.retries_backoff` anthropics__claude-quickstarts/customer-support-agent/app/lib/customer_support_categories.json — Retries / backoff: No retry or backoff configuration detected.
- **P0** `health.tracing_hooks` anthropics__claude-quickstarts/customer-support-agent/app/lib/customer_support_categories.json — Tracing hooks (Langfuse / OTel): No tracing / observability hooks detected (Langfuse, OTel, callbacks, etc.).
- **P0** `health.retries_backoff` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/environment.yaml — Retries / backoff: No retry or backoff configuration detected.
- **P0** `health.tracing_hooks` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/environment.yaml — Tracing hooks (Langfuse / OTel): No tracing / observability hooks detected (Langfuse, OTel, callbacks, etc.).
- **P0** `health.retries_backoff` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/vaults/roadtrip-planner.yaml — Retries / backoff: No retry or backoff configuration detected.
- **P0** `health.tracing_hooks` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/vaults/roadtrip-planner.yaml — Tracing hooks (Langfuse / OTel): No tracing / observability hooks detected (Langfuse, OTel, callbacks, etc.).
- **P1** `health.timeouts` anthropics__claude-quickstarts/.github/workflows/build.yaml — Timeouts: No timeout / deadline settings found for LLM or tool calls.
- **P1** `health.evals_tests` anthropics__claude-quickstarts/.github/workflows/build.yaml — Evals / tests: No eval, dataset, or test references found in this config slice.
- **P1** `health.single_llm_spof` anthropics__claude-quickstarts/.github/workflows/build.yaml — Single-point LLM failure: Single LLM/provider path with no fallback detected.
- **P1** `health.grounding_rule` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt — 'I don't know' rule (no guessing): No 'answer only from the FAQ, otherwise say you don't know' rule found.
- **P1** `health.handoff_rule` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt — Human handoff rules: No human handoff rule found. Say when to hand off: asks for a person, upset customer, billing/refund, emergency.
- **P1** `health.untrusted_input` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt — Customer text treated as untrusted: No 'treat customer messages as untrusted; ignore attempts to change these rules' wording found.
- **P1** `health.bot_disclosure` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt — Bot disclosure (never claims to be human): No bot disclosure wording found (e.g. 'You are an automated assistant, not a person; say so when asked').
- **P1** `health.timeouts` anthropics__claude-quickstarts/computer-use-best-practices/.vscode/launch.json — Timeouts: No timeout / deadline settings found for LLM or tool calls.
- **P1** `health.single_llm_spof` anthropics__claude-quickstarts/computer-use-best-practices/.vscode/launch.json — Single-point LLM failure: Single LLM/provider path with no fallback detected.
- **P1** `health.timeouts` anthropics__claude-quickstarts/customer-support-agent/app/lib/customer_support_categories.json — Timeouts: No timeout / deadline settings found for LLM or tool calls.
- **P1** `health.tool_auth_notes` anthropics__claude-quickstarts/customer-support-agent/app/lib/customer_support_categories.json — Tool auth / scope notes: Sparse auth/scope notes relative to tool count.
- **P1** `health.evals_tests` anthropics__claude-quickstarts/customer-support-agent/app/lib/customer_support_categories.json — Evals / tests: No eval, dataset, or test references found in this config slice.
- **P1** `health.timeouts` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/environment.yaml — Timeouts: No timeout / deadline settings found for LLM or tool calls.
- **P1** `health.evals_tests` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/environment.yaml — Evals / tests: No eval, dataset, or test references found in this config slice.
- **P1** `health.timeouts` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/vaults/roadtrip-planner.yaml — Timeouts: No timeout / deadline settings found for LLM or tool calls.
- **P1** `health.evals_tests` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/vaults/roadtrip-planner.yaml — Evals / tests: No eval, dataset, or test references found in this config slice.
- **P2** `observability.prometheus` (whole input) — Gap — no clear signal for Prometheus metrics / alerts.

### Prompt-injection scan (ADSF)

- **P0** `injection.fake_system` anthropics__claude-quickstarts/agents/agent.py:35 — Fake system/assistant marker inside content. (`
        system:`)
- **P0** `injection.fake_system` anthropics__claude-quickstarts/agents/agent.py:47 — Fake system/assistant marker inside content. (`
            system:`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/agents/test_message_params.py:107 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API call`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/agents/tools/mcp_tool.py:28 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`call_tool`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/agents/utils/connections.py:55 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`call_tool`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/agents/utils/connections.py:59 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`call_tool`)
- **P0** `injection.fake_system` anthropics__claude-quickstarts/agents/utils/history_util.py:11 — Fake system/assistant marker inside content. (`
        system:`)
- **P0** `injection.templated_url` anthropics__claude-quickstarts/browser-toolset/typescript/cdp-browser.ts:274 — URL with a template slot for the agent to fill in. (`https://${input.url}`)
- **P0** `injection.templated_url` anthropics__claude-quickstarts/browser-toolset/typescript/exercise.ts:98 — URL with a template slot for the agent to fill in. (`http://localhost:${port}`)
- **P0** `injection.templated_url` anthropics__claude-quickstarts/browser-toolset/typescript/exercise.ts:117 — URL with a template slot for the agent to fill in. (`http://127.0.0.1:${port}`)
- **P0** `injection.templated_url` anthropics__claude-quickstarts/browser-toolset/typescript/run.ts:41 — URL with a template slot for the agent to fill in. (`https://${text}`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/loop.py:125 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API call`)
- **P0** `injection.fake_system` anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/tools/base.py:29 — Fake system/assistant marker inside content. (`
    system:`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/formatters.py:2 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API call`)
- **P0** `injection.fake_system` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/loop.py:246 — Fake system/assistant marker inside content. (`
    system:`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/loop.py:302 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`tool_call(`)
- **P0** `injection.fake_system` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/loop.py:399 — Fake system/assistant marker inside content. (`
    system:`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/computer-use-best-practices/computer_use/render.py:67 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`tool_call(`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/computer-use-best-practices/README.md:39 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API call`)
- **P0** `injection.fake_system` anthropics__claude-quickstarts/computer-use-demo/computer_use_demo/tools/base.py:29 — Fake system/assistant marker inside content. (`
    system:`)
- **P0** `injection.fake_system` anthropics__claude-quickstarts/customer-support-agent/app/api/chat/route.ts:229 — Fake system/assistant marker inside content. (`
      system:`)
- **P0** `injection.fake_system` anthropics__claude-quickstarts/financial-data-analyst/app/api/finance/route.ts:219 — Fake system/assistant marker inside content. (`
      system:`)
- **P0** `injection.templated_url` anthropics__claude-quickstarts/managed-agents/assistant-ui/components/assistant-ui/sources.tsx:19 — URL with a template slot for the agent to fill in. (`https://icons.duckduckgo.com/ip3/${domain}`)
- **P0** `injection.fake_system` anthropics__claude-quickstarts/managed-agents/chat-sdk/setup/create-agent.ts:42 — Fake system/assistant marker inside content. (`
  system:`)
- **P0** `injection.fake_system` anthropics__claude-quickstarts/managed-agents/chat-sdk/setup/update-agent.ts:24 — Fake system/assistant marker inside content. (`
  system:`)
- **P0** `injection.templated_url` anthropics__claude-quickstarts/managed-agents/chat-sdk/src/brief.ts:15 — URL with a template slot for the agent to fill in. (`https://platform.claude.com/workspaces/default/sessions/${sessionId}`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/managed-agents/chat-sdk/src/brief.ts:34 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`ToolCall =`)
- **P0** `injection.templated_url` anthropics__claude-quickstarts/managed-agents/chat-sdk/src/main.ts:70 — URL with a template slot for the agent to fill in. (`http://${HOST}:${PORT}`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/managed-agents/chat-sdk/src/managed-agents.ts:306 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`ToolCall>`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/managed-agents/chat-sdk/src/sessions.ts:87 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`ToolCall>`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/managed-agents/chat-sdk/web/app.tsx:73 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`ToolCall>`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/.claude/skills/verify/SKILL.md:23 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API call`)
- **P0** `injection.templated_url` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/server/src/index.ts:38 — URL with a template slot for the agent to fill in. (`https://platform.claude.com/workspaces/default/sessions/${record.sessionId}`)
- **P0** `injection.templated_url` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/server/src/index.ts:85 — URL with a template slot for the agent to fill in. (`http://localhost:${PORT}`)
- **P0** `injection.templated_url` anthropics__claude-quickstarts/managed-agents/linear/src/main.ts:8 — URL with a template slot for the agent to fill in. (`http://localhost:${PORT}`)
- **P0** `injection.templated_url` anthropics__claude-quickstarts/managed-agents/linear/src/oauth.ts:7 — URL with a template slot for the agent to fill in. (`http://localhost:${process.env.PORT || 3000}`)
- **P0** `injection.templated_url` anthropics__claude-quickstarts/managed-agents/linear/src/oauth.ts:97 — URL with a template slot for the agent to fill in. (`https://linear.app/oauth/authorize?${params}`)
- **P0** `injection.templated_url` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/src/server-http.ts:115 — URL with a template slot for the agent to fill in. (`http://${HOST}:${PORT}`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/CLAUDE.md:54 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API call`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/src/lib/client.ts:9 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API call`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/src/lib/transcript.ts:16 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`ToolCall =`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/src/lib/transcript.ts:97 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`ToolCall>`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/src/lib/transcript.ts:131 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`ToolCall =`)
- **P0** `injection.llmail_tool_call_syntax` anthropics__claude-quickstarts/managed-agents/sentry/README.md:170 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API call`)
- **P0** `injection.templated_url` anthropics__claude-quickstarts/managed-agents/slack/src/main.ts:6 — URL with a template slot for the agent to fill in. (`http://localhost:${PORT}`)
- **P1** `injection.css_hidden` anthropics__claude-quickstarts/browser-use-demo/browser_use_demo/streamlit.py:37 — CSS that hides text from people but not from an agent. (`visibility: hidden`)
- **P1** `injection.css_hidden` anthropics__claude-quickstarts/computer-use-best-practices/dev_ui/localization_demo/static/index.html:31 — CSS that hides text from people but not from an agent. (`display: none`)
- **P1** `injection.css_hidden` anthropics__claude-quickstarts/computer-use-best-practices/dev_ui/localization_demo/static/index.html:35 — CSS that hides text from people but not from an agent. (`display: none`)
- **P1** `injection.css_hidden` anthropics__claude-quickstarts/computer-use-best-practices/dev_ui/localization_demo/static/index.html:38 — CSS that hides text from people but not from an agent. (`display: none`)
- **P1** `injection.css_hidden` anthropics__claude-quickstarts/computer-use-best-practices/dev_ui/localization_demo/static/index.html:39 — CSS that hides text from people but not from an agent. (`display: none`)
- **P1** `injection.css_hidden` anthropics__claude-quickstarts/computer-use-best-practices/dev_ui/tool_panel/static/index.html:25 — CSS that hides text from people but not from an agent. (`display: none`)
- **P1** `injection.css_hidden` anthropics__claude-quickstarts/computer-use-demo/computer_use_demo/streamlit.py:167 — CSS that hides text from people but not from an agent. (`visibility: hidden`)

### Simplified Technical English (STE)

- **P1** `ste.sentence_length` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:53 — Procedural sentence has 21 words (limit 20). Split it. (`Run 1-2 of the feature tests marked as CODE that are most core to the app's functionality to verify they still work.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/autonomous-coding/prompts/initializer_prompt.md:16 — Passive voice. Say who does the action (active voice). (`be built`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/autonomous-coding/prompts/initializer_prompt.md:55 — Passive voice. Say who does the action (active voice). (`be marked`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/autonomous-coding/prompts/initializer_prompt.md:57 — Passive voice. Say who does the action (active voice). (`is missed`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/autonomous-coding/prompts/initializer_prompt.md:62 — More than one instruction in one sentence. Write one instruction per sentence. (`set up and run the development environment.`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/autonomous-coding/prompts/initializer_prompt.md:72 — More than one instruction in one sentence. Write one instruction per sentence. (`Create a git repository and make your first commit with:`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/autonomous-coding/README.md:49 — Passive voice. Say who does the action (active voice). (`is designed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/autonomous-coding/README.md:62 — Passive voice. Say who does the action (active voice). (`is persisted`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/autonomous-coding/README.md:72 — Passive voice. Say who does the action (active voice). (`are permitted`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/autonomous-coding/README.md:78 — Passive voice. Say who does the action (active voice). (`are blocked`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/autonomous-coding/README.md:159 — Passive voice. Say who does the action (active voice). (`is exported`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/browser-toolset/README.md:47 — Descriptive sentence has 32 words (limit 25). Split it. (`CODE uses only the SDK's abstract toolset, so another driver works the same way: build it, pass it in CODE, loop over the tool runner, and close it when the loo`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/browser-toolset/README.md:49 — Descriptive sentence has 31 words (limit 25). Split it. (`CODE passes the toolset an example URL policy (CODE in CODE, CODE in CODE) that admits only http(s) pages on the hosts in CODE, subdomains included, and the emp`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/browser-toolset/README.md:69 — Passive voice. Say who does the action (active voice). (`are answered`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/browser-toolset/README.md:69 — Passive voice. Say who does the action (active voice). (`are refused`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/browser-toolset/README.md:73 — Descriptive sentence has 39 words (limit 25). Split it. (`Implemented: CODE (to a URL; returns once the document is parsed), CODE (headings, links, buttons and form controls, each with a CODE), CODE (by ref or by coord`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/browser-toolset/README.md:73 — Passive voice. Say who does the action (active voice). (`is parsed`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/browser-toolset/README.md:73 — Descriptive sentence has 27 words (limit 25). Split it. (`The SDK supplies the rest: the tool schemas, the URL checks that wrap your policy, the refusal of tools the driver doesn't implement, and the tool runner.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/browser-toolset/README.md:81 — Descriptive sentence has 26 words (limit 25). Split it. (`a page that replaces itself by script before its document is parsed: CODE then waits for a document that never arrives and gives up after 30 seconds;`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/browser-toolset/README.md:81 — Passive voice. Say who does the action (active voice). (`is parsed`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/browser-toolset/README.md:82 — Descriptive sentence has 28 words (limit 25). Split it. (`a click, or a page script, that starts a navigation: the next read can fail once or read the old page, and the model reads again or waits;`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/browser-toolset/README.md:83 — Passive voice. Say who does the action (active voice). (`is left`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/browser-use-demo/CHANGELOG.md:35 — Descriptive sentence has 39 words (limit 25). Split it. (`Added clarifying comment in the CODE property explaining that this implementation uses fixed 1920x1080 dimensions with empirical coordinate correction, and dire`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/browser-use-demo/CHANGELOG.md:38 — Passive voice. Say who does the action (active voice). (`was swallowed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/browser-use-demo/CHANGELOG.md:39 — Passive voice. Say who does the action (active voice). (`was swallowed`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/browser-use-demo/README.md:3 — Descriptive sentence has 26 words (limit 25). Split it. (`This demo provides a containerized Streamlit interface showcasing how to give Claude the ability to navigate websites, interact with DOM elements, extract conte`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/browser-use-demo/README.md:6 — Descriptive sentence has 68 words (limit 25). Split it. (`If you want to see common patterns for making computer- and browser-use agents more reliable and cost-effective — explicit tool definitions, image sizing and pr`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/browser-use-demo/README.md:48 — Passive voice. Say who does the action (active voice). (`is set`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/browser-use-demo/README.md:81 — Passive voice. Say who does the action (active voice). (`are heightened`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/browser-use-demo/README.md:83 — Procedural sentence has 21 words (limit 20). Split it. (`Run the browser in an isolated virtual machine or container environment with minimal privileges to prevent direct system attacks or accidents.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/browser-use-demo/README.md:86 — Procedural sentence has 34 words (limit 20). Split it. (`Ask a human to confirm decisions that may result in meaningful real-world consequences as well as any tasks requiring affirmative consent, such as accepting coo`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/browser-use-demo/README.md:100 — Descriptive sentence has 27 words (limit 25). Split it. (`All browser actions (navigate, click, type, scroll, form_input, etc.) are implemented as methods in [browser.py](browser_use_demo/tools/browser.py) using Playwr`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/browser-use-demo/README.md:100 — Passive voice. Say who does the action (active voice). (`are implemented`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/browser-use-demo/README.md:130 — Passive voice. Say who does the action (active voice). (`is fixed`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/browser-use-demo/README.md:137 — Descriptive sentence has 31 words (limit 25). Split it. (`The CODE and CODE constants in [browser.py](browser_use_demo/tools/browser.py) provide a complete example you can use as a starting point for your own browser a`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/browser-use-demo/README.md:181 — Passive voice. Say who does the action (active voice). (`is specifically optimized`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/browser-use-demo/README.md:181 — Descriptive sentence has 28 words (limit 25). Split it. (`While it shares many capabilities with the [computer use demo](../computer-use-demo), browser automation adds web-specific actions and the ability to target ele`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/browser-use-demo/README.md:233 — Passive voice. Say who does the action (active voice). (`is set`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/browser-use-demo/tests/README.md:128 — Passive voice. Say who does the action (active voice). (`are mocked`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/browser-use-demo/tests/README.md:171 — Passive voice. Say who does the action (active voice). (`are covered`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/CLAUDE.md:6 — Procedural sentence has 24 words (limit 20). Split it. (`Write "Managed Agents" or "Claude Managed Agents" in prose and comments, and spell it out in identifiers, file names, and log prefixes (e.g.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/CLAUDE.md:7 — Procedural sentence has 24 words (limit 20). Split it. (`Use lowercase letters, digits, and hyphens only, because a value in any other shape is ignored for attribution, with no error to warn you.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/CLAUDE.md:7 — Passive voice. Say who does the action (active voice). (`is ignored`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/CLAUDE.md:11 — Passive voice. Say who does the action (active voice). (`are made`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-toolset/README.md:16 — Descriptive sentence has 28 words (limit 25). Split it. (`> The server runs without a password, so keep it on localhost (CODE, in both commands below); from a container, publish its port to the host's loopback only (CO`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-toolset/README.md:34 — Descriptive sentence has 30 words (limit 25). Split it. (`It polls the screen, so a screenshot taken right after an input can show the screen from before it, and the model then repeats the action or takes another scree`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-toolset/README.md:56 — Descriptive sentence has 32 words (limit 25). Split it. (`CODE uses only the SDK's abstract toolset, so another driver works the same way: build it, pass it in CODE, loop over the tool runner, and close it when the loo`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-toolset/README.md:75 — Descriptive sentence has 27 words (limit 25). Split it. (`Six calls are answered: CODE, a CODE at the screen's centre, CODE, CODE, CODE and a second CODE (retried for a few seconds if the server lags).`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-toolset/README.md:75 — Passive voice. Say who does the action (active voice). (`are answered`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-toolset/README.md:75 — Passive voice. Say who does the action (active voice). (`are refused`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-toolset/README.md:81 — Descriptive sentence has 34 words (limit 25). Split it. (`Implemented: CODE (the whole screen, as it is), CODE, CODE, CODE, CODE, CODE, CODE, CODE, CODE (a name such as CODE or CODE, a single character, or a chord such`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-toolset/README.md:83 — Passive voice. Say who does the action (active voice). (`is held`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-toolset/README.md:88 — Passive voice. Say who does the action (active voice). (`is sent`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-toolset/README.md:91 — Passive voice. Say who does the action (active voice). (`is connected`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-best-practices/.claude/skills/first-run/SKILL.md:24 — Passive voice. Say who does the action (active voice). (`are installed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-best-practices/.claude/skills/first-run/SKILL.md:27 — Passive voice. Say who does the action (active voice). (`is set`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/computer-use-best-practices/.claude/skills/first-run/SKILL.md:29 — More than one instruction in one sentence. Write one instruction per sentence. (`If missing, copy CODE to CODE and ask the user to open it in`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-best-practices/.claude/skills/first-run/SKILL.md:34 — Passive voice. Say who does the action (active voice). (`are only needed`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/computer-use-best-practices/.claude/skills/first-run/SKILL.md:41 — More than one instruction in one sentence. Write one instruction per sentence. (`Then run:`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-best-practices/.claude/skills/first-run/SKILL.md:51 — Passive voice. Say who does the action (active voice). (`was printed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-best-practices/.claude/skills/first-run/SKILL.md:60 — Passive voice. Say who does the action (active voice). (`was told`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-best-practices/README.md:14 — Passive voice. Say who does the action (active voice). (`are not affiliated`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-best-practices/README.md:21 — Passive voice. Say who does the action (active voice). (`be read`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-best-practices/README.md:25 — Passive voice. Say who does the action (active voice). (`are intended`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-best-practices/README.md:25 — Passive voice. Say who does the action (active voice). (`be read`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-best-practices/README.md:38 — Passive voice. Say who does the action (active voice). (`is fully specified`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-best-practices/README.md:263 — Passive voice. Say who does the action (active voice). (`are coerced`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-best-practices/README.md:316 — Passive voice. Say who does the action (active voice). (`is implemented`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-best-practices/README.md:318 — Passive voice. Say who does the action (active voice). (`are answered`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-best-practices/README.md:405 — Passive voice. Say who does the action (active voice). (`been read`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-best-practices/README.md:418 — Passive voice. Say who does the action (active voice). (`are tuned`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-best-practices/README.md:438 — Passive voice. Say who does the action (active voice). (`is appended`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-best-practices/README.md:447 — Passive voice. Say who does the action (active voice). (`are billed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md:21 — Passive voice. Say who does the action (active voice). (`is cached`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md:33 — More than one instruction in one sentence. Write one instruction per sentence. (`Install Playwright in any venv (CODE) and run the script below.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md:33 — Descriptive sentence has 42 words (limit 25). Split it. (`It sets the model, picks a tool version, optionally sets the thinking mode, sends a prompt, waits for the loop to go idle, then dumps the chat transcript and ev`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md:48 — Descriptive sentence has 32 words (limit 25). Split it. (`Useful probes: an older model with a newer tool version (expect a clean 400 in the error box, not a crash), toggling Thinking to Off before the first message, a`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md:136 — Passive voice. Say who does the action (active voice). (`is set`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-demo/CONTRIBUTING.md:12 — Passive voice. Say who does the action (active voice). (`are accepted`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-demo/CONTRIBUTING.md:12 — Passive voice. Say who does the action (active voice). (`be submitted`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-use-demo/CONTRIBUTING.md:20 — Procedural sentence has 22 words (limit 20). Split it. (`Please open a github issue if you are need clarification on this policy or you want to discuss a new feature addition.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-demo/CONTRIBUTING.md:20 — Passive voice. Say who does the action (active voice). (`are need`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-use-demo/README.md:4 — Descriptive sentence has 27 words (limit 25). Split it. (`> The demo now defaults to Claude Opus 4.8 (claude-opus-4-8), the latest model, with adaptive thinking — the model decides how much to reason, steered by a sele`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-use-demo/README.md:4 — Descriptive sentence has 34 words (limit 25). Split it. (`Claude Opus 4.7, Opus 4.6, and Sonnet 4.6 are also supported with adaptive thinking, while older models (Claude Opus 4.5, Sonnet 4.5, Sonnet 4, Opus 4, and Haik`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-demo/README.md:7 — Passive voice. Say who does the action (active voice). (`are heightened`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-use-demo/README.md:12 — Procedural sentence has 34 words (limit 20). Split it. (`Ask a human to confirm decisions that may result in meaningful real-world consequences as well as any tasks requiring affirmative consent, such as accepting coo`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-use-demo/README.md:21 — Descriptive sentence has 30 words (limit 25). Split it. (`A computer use agent loop using the Claude API, Bedrock, or Vertex to access Claude Opus 4.5, Claude Sonnet 4.5, Claude Sonnet 4, Claude Opus 4, Claude Haiku 4.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-use-demo/README.md:26 — Descriptive sentence has 28 words (limit 25). Split it. (`> **Looking for production-readiness patterns?** This demo is a deliberately minimal, containerized reference: it shows the essential agent loop running against`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-use-demo/README.md:26 — Descriptive sentence has 58 words (limit 25). Split it. (`If you want to see common patterns for making computer-use agents more reliable and cost-effective — explicit tool definitions, image sizing and pruning, prompt`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-use-demo/README.md:28 — Procedural sentence has 31 words (limit 20). Split it. (`Please use [this form](URL to provide feedback on the quality of the model responses, the API itself, or the quality of the documentation - we cannot wait to he`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-use-demo/README.md:34 — Descriptive sentence has 36 words (limit 25). Split it. (`> The components are weakly separated: the agent loop runs in the container being controlled by Claude, can only be used by one session at a time, and must be r`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-demo/README.md:34 — Passive voice. Say who does the action (active voice). (`are weakly separated`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-demo/README.md:34 — Passive voice. Say who does the action (active voice). (`being controlled`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-use-demo/README.md:40 — Descriptive sentence has 26 words (limit 25). Split it. (`The most recent shape, CODE, declares the computer tool as a *toolset*: a single nameless entry in CODE that declares one member tool per computer action.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-use-demo/README.md:40 — Descriptive sentence has 32 words (limit 25). Split it. (`The model then calls each action as its own tool — CODE is the member name (CODE, CODE, ...), the block carries CODE, and the input is that action's parameters `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-use-demo/README.md:40 — Descriptive sentence has 30 words (limit 25). Split it. (`Every CODE answering a member call carries the same CODE, member calls in a turn run sequentially and stop on the first failure, and the toolset requires no COD`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-use-demo/README.md:40 — Descriptive sentence has 29 words (limit 25). Split it. (`Earlier dated versions of the tool (API types CODE through CODE, the sidebar's CODE entries) keep the single CODE tool with an CODE parameter and their respecti`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-use-demo/README.md:40 — Descriptive sentence has 26 words (limit 25). Split it. (`A model supports either the toolset or the earlier dated versions it was trained with — check the [computer use documentation](URL for each model's supported ve`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/computer-use-demo/README.md:40 — Passive voice. Say who does the action (active voice). (`was trained`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/computer-use-demo/README.md:172 — Descriptive sentence has 28 words (limit 25). Split it. (`For higher resolutions: Scale the image down to XGA and let the model interact with this scaled version, then map the coordinates back to the original resolutio`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/customer-support-agent/README.md:53 — More than one instruction in one sentence. Write one instruction per sentence. (`Click "Create user" and follow the prompts to create a new user`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/customer-support-agent/README.md:61 — More than one instruction in one sentence. Write one instruction per sentence. (`Then select "Application running on an AWS compute service".`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/customer-support-agent/README.md:61 — More than one instruction in one sentence. Write one instruction per sentence. (`Add a description if desired, then click "Create".`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/customer-support-agent/README.md:131 — Passive voice. Say who does the action (active voice). (`is used`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/customer-support-agent/README.md:164 — Passive voice. Say who does the action (active voice). (`be added`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/customer-support-agent/README.md:194 — More than one instruction in one sentence. Write one instruction per sentence. (`Click on "Advanced settings" and add your environmental variables:`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/customer-support-agent/README.md:205 — Passive voice. Say who does the action (active voice). (`be deployed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/customer-support-agent/README.md:210 — Passive voice. Say who does the action (active voice). (`is deployed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/customer-support-agent/README.md:224 — Passive voice. Say who does the action (active voice). (`is controlled`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/customer-support-agent/README.md:271 — Passive voice. Say who does the action (active voice). (`is provided`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/customer-support-agent/README.md:271 — Passive voice. Say who does the action (active voice). (`is not intended`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/customer-support-agent/README.md:272 — Passive voice. Say who does the action (active voice). (`is provided`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/customer-support-agent/README.md:275 — Passive voice. Say who does the action (active voice). (`are provided`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/financial-data-analyst/README.md:117 — Descriptive sentence has 26 words (limit 25). Split it. (`You can even use charts and images to create interesting results, like the ability to see what's most common inside a picture using a pie chart.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/assistant-ui/agents/spreadsheet-analyst.md:37 — Passive voice. Say who does the action (active voice). (`was displayed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/assistant-ui/agents/spreadsheet-analyst.md:68 — Passive voice. Say who does the action (active voice). (`are mounted`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/assistant-ui/agents/spreadsheet-analyst.md:69 — Passive voice. Say who does the action (active voice). (`is installed`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:3 — Descriptive sentence has 29 words (limit 25). Split it. (`A Next.js chat app. assistant-ui renders everything; one Managed Agents session per conversation runs the analyst, and CODE folds each session's event log into `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:7 — Descriptive sentence has 28 words (limit 25). Split it. (`**Invoke CODE first.** It is the source of truth for every SDK call in CODE and every field in CODE and CODE (agents, environments, sessions, events, files, res`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:8 — Procedural sentence has 24 words (limit 20). Split it. (`**Read CODE** and walk the user through its Setup checklist step by step, then use its Gotchas and debugging table when something is off.`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:8 — More than one instruction in one sentence. Write one instruction per sentence. (`**Read CODE** and walk the user through its Setup checklist step by step, then use its Gotchas and debugging table when something is off.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:9 — Descriptive sentence has 34 words (limit 25). Split it. (`**After the base app works, offer extensions.** Ask which (if any) they want, then edit CODE and run a bare CODE, which publishes the edit as a new version the `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:20 — Descriptive sentence has 33 words (limit 25). Split it. (`CODE — one-time provisioning of the agent + environment into CODE (ant 1.30 or later; CODE because you have no terminal for its prompt; it needs CODE or an expo`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:22 — Passive voice. Say who does the action (active voice). (`are ignored`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/assistant-ui/components/NOTICE.md:9 — Passive voice. Say who does the action (active voice). (`are distributed`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:3 — Descriptive sentence has 29 words (limit 25). Split it. (`One [Managed Agent](URL session per conversation is the whole backend: it holds the transcript, runs CODE with pandas in a sandbox, and streams every step back `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:27 — Descriptive sentence has 32 words (limit 25). Split it. (`The chat UI wants a message array to render and callbacks to fire: assistant-ui gives you the primitives (composer, thread, tool cards, an approval gate) and as`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:27 — Descriptive sentence has 34 words (limit 25). Split it. (`The agent wants a durable place to think, a sandbox to run code, and a loop that survives your tab closing: Managed Agents gives you the session and asks you to`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:29 — Descriptive sentence has 62 words (limit 25). Split it. (`The join is one file. [CODE](lib/managed-agents/reducer.ts) is a pure function from a session's event log to assistant-ui's message model, and the same function`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:31 — Descriptive sentence has 26 words (limit 25). Split it. (`And an CODE tool call is a session that has *stopped and is waiting for a click*, which is exactly what assistant-ui's approval gate is for.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:42 — Descriptive sentence has 44 words (limit 25). Split it. (`Because a session id arrives from the browser and becomes an API path parameter, every route under CODE first passes it through [CODE](lib/owned-session.ts): th`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:42 — Passive voice. Say who does the action (active voice). (`be archived`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:42 — Descriptive sentence has 27 words (limit 25). Split it. (`Files never exist outside a session either: uploads post to CODE and downloads check the file id against that session's own file set before a byte moves.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:59 — Descriptive sentence has 31 words (limit 25). Split it. (`The CODE is the *event* id of the tool-use, and confirmations are batched into one send (two clicks in the same beat ride together, because racing sends can be `)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:59 — Passive voice. Say who does the action (active voice). (`are batched`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:61 — Descriptive sentence has 36 words (limit 25). Split it. (`CODE belongs here because there is a human at a keyboard to answer it; a scheduled or headless deployment wants CODE (or bash off), or the session parks forever`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:65 — Descriptive sentence has 47 words (limit 25). Split it. (`As the model writes, the session sends CODE, then CODE text fragments, then the buffered CODE that was always there; the reducer folds the fragments into the te`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:67 — Descriptive sentence has 32 words (limit 25). Split it. (`CODE is a progress signal with no reasoning text in the current API, so it renders as an empty reasoning part: assistant-ui's chain-of-thought group shows "thin`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:83 — Descriptive sentence has 38 words (limit 25). Split it. (`Managed Agents doesn't run it: the session parks on it, the card draws the chart from the tool's input, and the session controller answers with a CODE ("Rendere`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:87 — Descriptive sentence has 45 words (limit 25). Split it. (`Dropping a CSV on the composer runs the attachment adapter ([CODE](lib/managed-agents/attachments.ts)): it awaits CODE so a session exists, uploads to the Files`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:87 — Passive voice. Say who does the action (active voice). (`is sent`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:89 — Descriptive sentence has 43 words (limit 25). Split it. (`That query parameter is newer than the rest of the API and is not enabled on every organization yet; where it isn't, the call returns CODE, [CODE](lib/managed-a`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:89 — Passive voice. Say who does the action (active voice). (`is not enabled`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:89 — Passive voice. Say who does the action (active voice). (`are written`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:99 — More than one instruction in one sentence. Write one instruction per sentence. (`Then ask: **"walk me through setting this up."** Claude reads [CODE](./skill.md) and drives the whole thing.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:107 — Descriptive sentence has 39 words (limit 25). Split it. (`[CODE](URL (the [CODE CLI](URL 1.30 or later, CODE) reads the agent from [CODE](agents/spreadsheet-analyst.md), whose frontmatter holds the model and tools and `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:107 — Descriptive sentence has 27 words (limit 25). Split it. (`To change the agent, edit its file and run a bare CODE: that publishes a new version of the same agent, and the next session uses it.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:109 — Descriptive sentence has 36 words (limit 25). Split it. (`Try: *"Summarize this file, then chart revenue by month."* You'll see a file card, a search or two if you ask it to cross-check, an Allow/Deny gate on every COD`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:111 — Passive voice. Say who does the action (active voice). (`are gated`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:131 — Descriptive sentence has 32 words (limit 25). Split it. (`CODE 0.14.27 is the first line with the CODE / CODE API and the approval gate on CODE; the copy-in components under CODE were generated against it (CODE) and ar`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:131 — Passive voice. Say who does the action (active voice). (`were generated`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:13 — Passive voice. Say who does the action (active voice). (`is answered`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:22 — Descriptive sentence has 32 words (limit 25). Split it. (`CODE in CODE is the gate every session-touching route goes through: the ID must look like an ID, resolve, belong to this quickstart's agent, carry the metadata `)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:22 — Passive voice. Say who does the action (active voice). (`be archived`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:29 — Passive voice. Say who does the action (active voice). (`is silently ignored`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:35 — Procedural sentence has 32 words (limit 20). Split it. (`If several tools block at once, answer them in **one** CODE; the controller debounces clicks into a batch for exactly this reason, because a second racing send `)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:38 — Passive voice. Say who does the action (active voice). (`is answered`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:41 — Descriptive sentence has 49 words (limit 25). Split it. (`Leave a CODE approval sitting for several minutes and the first execution after Allow can come back as CODE This is expected: the tool result carries the error,`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:41 — Passive voice. Say who does the action (active voice). (`is expected`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:44 — Descriptive sentence has 27 words (limit 25). Split it. (`Closing the tab or navigating away only drops the SSE response; the agent keeps working server-side and the reply is waiting in history when you come back.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:47 — Descriptive sentence has 46 words (limit 25). Split it. (`The composer mounts an attachment at CODE — the file id keeps repeat uploads of the same filename from colliding, the basename keeps it readable — and the messa`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:56 — Passive voice. Say who does the action (active voice). (`were left`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:57 — Descriptive sentence has 34 words (limit 25). Split it. (`If a chat's very first history fetch fails while the live tail stays healthy, the transcript can sit empty behind an error banner until the next send (or a tail`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:61 — Descriptive sentence has 34 words (limit 25). Split it. (`There's no auth in this demo, so don't tunnel it to the public internet without adding real authentication and per-user session scoping (put a user id in sessio`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:70 — Descriptive sentence has 31 words (limit 25). Split it. (`It creates one environment (cloud, pandas preinstalled) and one agent (opus, spreadsheet-analyst prompt, bash set to CODE, the CODE custom tool) and writes thei`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:3 — Descriptive sentence has 79 words (limit 25). Split it. (`Long-running Node server (Hono): browser chat with a sessions sidebar (CODE → CODE) → Chat SDK web adapter CODE → one Managed Agents session per conversation, w`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:3 — Descriptive sentence has 27 words (limit 25). Split it. (`Each research turn closes with a kept tool-call trace (a fenced CODECODEtools CODEtoolsFenceCODEsrc/brief.tsCODEsrc/card.tsx') whose web fallback the page rende`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:19 — Descriptive sentence has 26 words (limit 25). Split it. (`Needs CODE ≥ 0.109.0 (the first release with CODE and CODE); streaming is gated per org while the 2026-07-01 update rolls out (CODE, "Token previews are gated p`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:19 — Passive voice. Say who does the action (active voice). (`is gated`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:19 — Passive voice. Say who does the action (active voice). (`are gated`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:24 — Descriptive sentence has 58 words (limit 25). Split it. (`It has the ordered checklist, every gotcha (the awaited handler and why fire-and-forget breaks here, preview reconciliation, sessions-as-state and the CODE chec`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:26 — Descriptive sentence has 43 words (limit 25). Split it. (`**Multiagent red-team pass**: a second toolless reviewer agent on the analyst's roster (CODE) that critiques every draft brief in a session thread; the handoff `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:31 — Descriptive sentence has 73 words (limit 25). Split it. (`The bridge doesn't change (the JSX card starts rendering natively, though the fenced tool-call trace stays raw text -- filter or restyle it per surface), but th`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:36 — More than one instruction in one sentence. Write one instruction per sentence. (`Run the server with CODE and open CODE.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:3 — Descriptive sentence has 27 words (limit 25). Split it. (`One persistent [Managed Agents](URL session per conversation owns the research, streaming its reply token by token while a live feed shows the tool calls it mak`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:5 — Descriptive sentence has 33 words (limit 25). Split it. (`This demo uses its web adapter, so there is no chat platform to register with: no Slack or WhatsApp app, no webhook to verify, no tunnel, and the only credentia`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:9 — Descriptive sentence has 33 words (limit 25). Split it. (`Swapping a few lines in CODE moves the analyst to another surface: set up the platform's app following the [adapter docs](URL then see the porting notes (CODE, `)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:29 — Passive voice. Say who does the action (active voice). (`are gated`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:55 — Procedural sentence has 22 words (limit 20). Split it. (`Replace it with your real session lookup before setting CODE, and keep platform-level access protection on any deploy that ships before it.`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:55 — More than one instruction in one sentence. Write one instruction per sentence. (`Replace it with your real session lookup before setting CODE, and keep platform-level access protection on any deploy that ships before it.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:57 — Descriptive sentence has 27 words (limit 25). Split it. (`The CODE routes are one platform-neutral [Hono](URL app (CODE), so this runs anywhere that can host a Hono app: mount CODE and serve the page statically.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:57 — Descriptive sentence has 46 words (limit 25). Split it. (`The [Vercel Services guide](URL works that through end to end: the page and the API as two [services](URL in one project, CODE rewrites for CODE, the function m`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:11 — Descriptive sentence has 27 words (limit 25). Split it. (`The page creates the session first (CODE → CODE), hands the returned ID to CODE as its CODE, and every message in that conversation lands in that session.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:17 — Descriptive sentence has 37 words (limit 25). Split it. (`The first message of a fresh conversation doubles as its title: it travels as CODE message metadata and the bridge writes it with CODE, so the sidebar and the C`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:19 — Descriptive sentence has 34 words (limit 25). Split it. (`CODE in CODE holds only Chat SDK internals (message dedup, locks), and CODE keeps the adapter from caching message bodies there too -- the browser holds the liv`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:23 — Descriptive sentence has 28 words (limit 25). Split it. (`CODE in CODE is the gate every session-touching route goes through: the ID must look like an ID, resolve, belong to this quickstart's agent, and not be archived`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:23 — Passive voice. Say who does the action (active voice). (`be archived`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:27 — Descriptive sentence has 33 words (limit 25). Split it. (`Inside the handler, the bridge holds an Anthropic SSE stream open for the same turn and forwards each CODE with CODE, which the adapter writes onto the response`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:29 — Descriptive sentence has 32 words (limit 25). Split it. (`The Slack and WhatsApp adapters need the opposite (ack the platform webhook in seconds, post through their API later); on web, returning early closes the only c`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:31 — Descriptive sentence has 42 words (limit 25). Split it. (`There is no browser to create one, so the handler creates a session for each new platform thread and keeps the mapping (thread metadata, or a small table) -- th`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:35 — Descriptive sentence has 35 words (limit 25). Split it. (`With it, three things arrive for every agent message instead of one: CODE (the id a buffered CODE will carry), a run of CODE text fragments while the model writ`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:35 — Passive voice. Say who does the action (active voice). (`is pushed`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:39 — Descriptive sentence has 26 words (limit 25). Split it. (`**The buffered event is the truth.** Previews are best-effort, never persisted, and always a verbatim prefix of the final text, so reconciliation is CODE then e`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:39 — Passive voice. Say who does the action (active voice). (`is closed`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:40 — Descriptive sentence has 30 words (limit 25). Split it. (`**No previews must mean no change.** In an org without session streaming, or on an CODE without CODE, the same loop sees only buffered events and posts each one`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:44 — Descriptive sentence has 41 words (limit 25). Split it. (`Instead the bridge reports every interesting event -- CODE with a short input hint, CODE, CODE (start-only: Managed Agents says that the model is reasoning, not`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:46 — Descriptive sentence has 26 words (limit 25). Split it. (`The bridge collects every CODE (name plus input hint, failures marked from CODE) and posts the list as a fenced CODECODEtools CODE/api/historyCODEtoolsFenceCODE`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:46 — Descriptive sentence has 32 words (limit 25). Split it. (`One porting caveat: unlike the card, the trace is a plain text post, so a non-web adapter shows the raw fence -- filter it out or re-render it per surface befor`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:50 — Descriptive sentence has 31 words (limit 25). Split it. (`CODE closes every research turn (any turn that called CODE) with a Chat SDK **card** built in CODE: JSX (CODE) with a CODE to the session's Console trace, plus `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:50 — Descriptive sentence has 30 words (limit 25). Split it. (`The web adapter has no card renderer in v1 and sends CODE instead, so the fallback is a fenced CODECODEcard CODEweb/app.tsx' renders that fence as a styled card`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:54 — Descriptive sentence has 33 words (limit 25). Split it. (`**The page validates the fence strictly** (numeric stats, session ID shape) before the JSON becomes a link, because agent-authored text flows through the same r`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:55 — Descriptive sentence has 30 words (limit 25). Split it. (`CODE re-derives it from the log instead -- CODE events and CODE timestamps per turn -- which is a nice proof that the event log really is the single source of t`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:63 — Descriptive sentence has 39 words (limit 25). Split it. (`CODE derives CODE from the response itself: it sits at CODE from the moment the adapter opens the stream until the turn ends, so the page shows a working indica`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:67 — Descriptive sentence has 39 words (limit 25). Split it. (`The CODE function in CODE is where identity comes from, for every route that exposes a conversation: the web adapter calls it on each CODE POST, and CODE runs t`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:67 — Descriptive sentence has 41 words (limit 25). Split it. (`The demo's CODE accepts everyone as the same CODE user, which is exactly right on CODE and exactly wrong anywhere else: anyone who can reach the port can run re`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:67 — Procedural sentence has 45 words (limit 20). Split it. (`Before exposing it, replace CODE with your real session lookup (NextAuth, Clerk, a session cookie) -- and scope the session routes to the resolved user, e.g. by`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:73 — Descriptive sentence has 27 words (limit 25). Split it. (`The agent writes short scripts that compose the tools you did enable (CODE in a loop, for example), and the scripts run inside the same session sandbox.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:83 — Passive voice. Say who does the action (active voice). (`is silently ignored`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:87 — Descriptive sentence has 55 words (limit 25). Split it. (`The bridge does not watch that signal: the Managed Agents turn keeps running server-side, its replies go nowhere, and a message you send right afterwards queues`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:95 — Descriptive sentence has 35 words (limit 25). Split it. (`The system prompt still bans headings, tables, and code fences, not because they'd break, but because the output is a chat bubble and the analyst should read li`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:99 — Descriptive sentence has 49 words (limit 25). Split it. (`CODE disables Node's own request timeout (CODE; the socket inactivity timeout is already off by default), but a reverse proxy or load balancer in front will rea`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:108 — Descriptive sentence has 42 words (limit 25). Split it. (`Expect the acknowledgment within seconds, the activity feed filling with searches for a minute or three, the brief typing itself out, then a collapsed tool-call`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:114 — Descriptive sentence has 54 words (limit 25). Split it. (`CODE is the shipped host (the local Node server, which also builds the page on request); any host that can run a fetch handler can mount the same app: use CODE `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:118 — Descriptive sentence has 37 words (limit 25). Split it. (`CLI credentials (CODE) only exist on your machine, which is why a deployed host mounts CODE: it 500s with a named variable when config is missing, instead of fa`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:118 — Descriptive sentence has 32 words (limit 25). Split it. (`One requirement on the host: the Anthropic client reads CODE at module scope (CODE), so secrets must be in CODE before imports run -- on non-Node runtimes, enab`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:120 — Descriptive sentence has 26 words (limit 25). Split it. (`**Gate the deploy before it exists.** The demo CODE trusts every caller, so an unprotected URL lets anyone research on your bill and read every transcript.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:121 — Passive voice. Say who does the action (active voice). (`is unaffected`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:148 — Descriptive sentence has 29 words (limit 25). Split it. (`It pushes the new name, model, and system prompt onto the existing agent as a new version (CODE): running sessions keep their pinned version, new chats use the `)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:149 — More than one instruction in one sentence. Write one instruction per sentence. (`Replace the demo CODE with your real session lookup and return CODE for anonymous requests.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:149 — Descriptive sentence has 31 words (limit 25). Split it. (`Then scope sessions per user: write the resolved user ID into session CODE on create and filter on it in CODE/CODE, so one user cannot list or replay another's `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:150 — Descriptive sentence has 33 words (limit 25). Split it. (`Deploy anywhere that lets a response stream stay open for minutes: a VM or container running CODE works once you set CODE to your bind address (the default CODE`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:151 — Descriptive sentence has 53 words (limit 25). Split it. (`Multiple server instances need two things: swap CODE for CODE (set CODE) so the Chat SDK's message dedup holds across instances, and route each conversation to `)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:154 — More than one instruction in one sentence. Write one instruction per sentence. (`Keep it that way if you add logging, and give the sink a retention policy.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/.claude/skills/verify/SKILL.md:30 — Descriptive sentence has 27 words (limit 25). Split it. (`CODE once, CODE, open URL send a prompt that triggers a visual tool ("show me a growth projection for $500/month at 7%") and confirm the chart renders inline.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:19 — Descriptive sentence has 31 words (limit 25). Split it. (`**A Claude Managed Agent.** One CODE agent on CODE with the built-in toolset (bash, files, web search), so it can pull current rates and run real calculations i`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:20 — Descriptive sentence has 43 words (limit 25). Split it. (`**The upstream AG-UI adapter.** [CODE](URL does the whole Managed Agents ↔ AG-UI translation: one AG-UI thread per managed session, live text previews via event`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:22 — Descriptive sentence has 46 words (limit 25). Split it. (`**Generative UI.** Four visual tools (payoff timeline, growth projection, budget breakdown, scenario comparison) are passed to the adapter as CODE; it registers`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:22 — Passive voice. Say who does the action (active voice). (`are passed`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:44 — Descriptive sentence has 35 words (limit 25). Split it. (`CODE pins one CODE version via CODE so the whole workspace shares a single copy: the AG-UI client and the CopilotKit runtime exchange RxJS observables, and two `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:45 — Descriptive sentence has 26 words (limit 25). Split it. (`The visual tools are render-only: their result is the rendering itself, so each CODE handler ignores its input and returns a "rendered to the user" ack.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:48 — Descriptive sentence has 26 words (limit 25). Split it. (`CopilotKit's runtime delivers tool args in version-dependent shapes: a typed object, an object with every number stringified, or one whose nested arrays arrive `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:49 — Descriptive sentence has 38 words (limit 25). Split it. (`The agent's system prompt tells it to call visual tools directly, never from inside repl scripts: a repl-wrapped custom tool call parks the session on the repl `)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:50 — Passive voice. Say who does the action (active voice). (`are not deleted`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:54 — Descriptive sentence has 30 words (limit 25). Split it. (`When the user asks to be walked through setting up this demo, go step by step, run the commands for them where possible, and check each result before moving on:`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:54 — Passive voice. Say who does the action (active voice). (`be walked`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:57 — Passive voice. Say who does the action (active voice). (`is set`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:59 — Passive voice. Say who does the action (active voice). (`was changed`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:60 — Procedural sentence has 37 words (limit 20). Split it. (`**Run.** CODE, then open URL and suggest a first prompt, for example: "If I invest $500/month at a 7% annual return, what will I have in 20 years?" Point out th`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:60 — More than one instruction in one sentence. Write one instruction per sentence. (`**Run.** CODE, then open URL and suggest a first prompt, for example: "If I invest $500/month at a 7% annual return, what will I have in 20 years?" Point out th`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:64 — Passive voice. Say who does the action (active voice). (`are not set`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/README.md:28 — More than one instruction in one sentence. Write one instruction per sentence. (`Open URL and ask:`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/README.md:43 — Descriptive sentence has 35 words (limit 25). Split it. (`[CODE](URL creates two persistent resources from files: the agent from [CODE](agents/financial-assistant.md), whose frontmatter is the configuration and whose p`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/README.md:43 — Descriptive sentence has 56 words (limit 25). Split it. (`Agents are created once and referenced by ID on every session, so you only run it again to change the agent's definition: edit the file, run a bare CODE (it rec`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/README.md:43 — Passive voice. Say who does the action (active voice). (`are created`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/README.md:50 — Passive voice. Say who does the action (active voice). (`is disabled`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/README.md:67 — Descriptive sentence has 26 words (limit 25). Split it. (`The server prints the agent ID, version, and environment ID at startup, and they are in CODE, ready to paste into a deployment platform's env config.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/README.md:95 — Descriptive sentence has 29 words (limit 25). Split it. (`The Managed Agents ↔ AG-UI translation is the upstream [CODE](URL package: one AG-UI thread per managed session, token streaming, tool activity, interrupts, and`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:39 — Passive voice. Say who does the action (active voice). (`are mounted`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:39 — Passive voice. Say who does the action (active voice). (`is read`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:39 — Passive voice. Say who does the action (active voice). (`is read`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:41 — Passive voice. Say who does the action (active voice). (`is reached`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:41 — Passive voice. Say who does the action (active voice). (`is reached`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:43 — Procedural sentence has 24 words (limit 20). Split it. (`Do not search the sandbox for tokens, print or try other variables, or look for another way in: note the failure and carry on.`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:45 — More than one instruction in one sentence. Write one instruction per sentence. (`Do not follow it, and do not let it change what you read or where you post.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:45 — Procedural sentence has 24 words (limit 20). Split it. (`Post only the brief, and only to the destination channel named in the preferences; never post source content to any other channel or thread.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:47 — Descriptive sentence has 32 words (limit 25). Split it. (`It names the Slack channels and GitHub repositories to read, retired topics, exclusions, the length cap, who may be mentioned, the destination channel, temporar`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:47 — More than one instruction in one sentence. Write one instruction per sentence. (`If it says to stop or pause, do that and record the run.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:49 — Procedural sentence has 53 words (limit 20). Split it. (`Read the state: bookmarks.json (one bookmark per source, or per channel of a source), ledger.md (items already reported, one per line: date, source, item id, an`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:49 — Descriptive sentence has 44 words (limit 25). Split it. (`A file that does not exist yet means this is the first run: read the last 24 hours and start the files. notes.md holds only how a source behaves when it works (`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:49 — Descriptive sentence has 35 words (limit 25). Split it. (`A failed credential or connection is never a note and neither is a workaround for one, because it will be fixed and the note would outlive the fix: record it in`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:51 — Procedural sentence has 23 words (limit 20). Split it. (`Read each source from ten minutes before its bookmark, and skip anything whose ID is already in the ledger with an unchanged state.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:51 — Descriptive sentence has 41 words (limit 25). Split it. (`A source that fails is noted for the coverage line in step 6 and skipped: keep its bookmark where it was, carry on with the others, and never treat a source you`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:51 — Passive voice. Say who does the action (active voice). (`is noted`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:53 — Passive voice. Say who does the action (active voice). (`are blocked`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:53 — Descriptive sentence has 27 words (limit 25). Split it. (`An item already in the ledger and still open is carried as one marked line ("still waiting, day 3"), not re-reported; a closed item is dropped without comment.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:53 — Passive voice. Say who does the action (active voice). (`is carried`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:53 — Passive voice. Say who does the action (active voice). (`is dropped`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:55 — Descriptive sentence has 39 words (limit 25). Split it. (`For every item you will report, re-check its live source just before posting: resolved since you read it, drop it; still open but changed, fix the line; cannot `)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:55 — Passive voice. Say who does the action (active voice). (`is copied`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:57 — Descriptive sentence has 31 words (limit 25). Split it. (`Mention gaps once, in one line at the end: a source that could not be read is unreadable, not empty, and a missing number is stated as missing, never filled in.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:57 — Passive voice. Say who does the action (active voice). (`is stated`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:57 — Descriptive sentence has 32 words (limit 25). Split it. (`If there is nothing to report and every source was read, say so in one line; if the preferences allow silence, post nothing and go to step 8 as a deliberate qui`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:57 — Passive voice. Say who does the action (active voice). (`was read`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:59 — Passive voice. Say who does the action (active voice). (`is read`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:59 — Descriptive sentence has 34 words (limit 25). Split it. (`Otherwise, before posting, look for today's edition in the destination by its title (read the channel's recent history with CODE; a bot token cannot use search)`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:59 — Descriptive sentence has 30 words (limit 25). Split it. (`If the post cannot reach its destination (not_in_channel, invalid_auth, channel_not_found), set "status: held", keep the brief text in the run record, and chang`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:61 — Descriptive sentence has 72 words (limit 25). Split it. (`Bookkeeping, only after the post is confirmed (or after a deliberate silence): set the run record to "status: posted" with the message ID; then one ledger line `)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:61 — Passive voice. Say who does the action (active voice). (`is confirmed`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:61 — Descriptive sentence has 34 words (limit 25). Split it. (`If the preferences store proposes nothing, leave proposals.md alone; if the reader's replies in the destination suggest a preference change, add it there for th`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/deployment.md:31 — Passive voice. Say who does the action (active voice). (`is titled`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/memory_store_preferences.yaml:1 — Passive voice. Say who does the action (active voice). (`is read`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/memory_store_state.yaml:1 — Descriptive sentence has 44 words (limit 25). Split it. (`Your own record between runs. bookmarks.json (where each source was last read), ledger.md (items already reported and their last status), notes.md (what you lea`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/CLAUDE.md:3 — Descriptive sentence has 34 words (limit 25). Split it. (`CODE manages the vault container but never its contents, so CODE adds the two credentials with CODE and writes the vault's ID into CODE's CODE (a deployment tak`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/CLAUDE.md:3 — Descriptive sentence has 44 words (limit 25). Split it. (`Each scheduled run is a fresh session: it reads CODE (read-only store), reads and writes CODE (bookmarks, ledger, notes, run records), calls Slack with CODE and`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/CLAUDE.md:34 — Passive voice. Say who does the action (active voice). (`are commented`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/preferences.example.md:8 — Passive voice. Say who does the action (active voice). (`are blocked`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:3 — Descriptive sentence has 26 words (limit 25). Split it. (`It reads your Slack channels and GitHub pull requests, works out what you would act on today, and posts one short brief to a Slack channel.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:3 — Descriptive sentence has 42 words (limit 25). Split it. (`It runs on [Claude Managed Agents](URL as a [scheduled deployment](URL so there is no server to keep alive: the agent, its sandbox, its schedule, its memory, it`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:5 — Passive voice. Say who does the action (active voice). (`is reported`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:5 — Passive voice. Say who does the action (active voice). (`is confirmed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:5 — Passive voice. Say who does the action (active voice). (`is recorded`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:11 — More than one instruction in one sentence. Write one instruction per sentence. (`**Create the Slack app** (one click, then Install to Workspace):`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:19 — Procedural sentence has 24 words (limit 20). Split it. (`**Create a GitHub token**: a [fine-grained personal access token](URL with read-only access (Contents: read, Pull requests: read) to the repositories you want c`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:28 — Descriptive sentence has 40 words (limit 25). Split it. (`One CODE creates the agent, environment, memory stores, vault and deployment in your workspace; the script then adds the two credentials to the vault (no secret`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:30 — Procedural sentence has 27 words (limit 20). Split it. (`**Write your preferences**: the agent reads CODE from the read-only CODE store at the start of every run, and CODE creates the store but not the file.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:39 — Descriptive sentence has 26 words (limit 25). Split it. (`**Try a run**: CODE starts one now, waits, and prints the agent's last message, any source it could not read, and the run record it wrote.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:50 — Procedural sentence has 21 words (limit 20). Split it. (`Read the state: CODE (where each source was last read), CODE (what was already reported), CODE, and the last run record.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:51 — Passive voice. Say who does the action (active voice). (`is named`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:56 — More than one instruction in one sentence. Write one instruction per sentence. (`Only then move the bookmarks, add ledger lines, and write CODE.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:58 — Passive voice. Say who does the action (active voice). (`is called`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:58 — Descriptive sentence has 28 words (limit 25). Split it. (`The bot token is a [vault](URL credential: the agent sees a placeholder in CODE, and the real token is substituted at egress on requests to CODE only.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:58 — Passive voice. Say who does the action (active voice). (`is substituted`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:81 — Descriptive sentence has 42 words (limit 25). Split it. (`**Cost.** On a busy day (two channels and two repositories with around 140 messages and 25 pull requests between them) a run cost about $1.50 on Claude Opus 5 a`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:81 — Passive voice. Say who does the action (active voice). (`were run`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:82 — Descriptive sentence has 29 words (limit 25). Split it. (`A run that reaches it pauses rather than fails, which from the channel looks like silence, so check the deployment's runs in the Console if a brief goes missing`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:84 — Passive voice. Say who does the action (active voice). (`are done`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:91 — Descriptive sentence has 28 words (limit 25). Split it. (`**The GitHub token is the control on GitHub.** It is read-only, so a planted instruction cannot write to a repository even though every GitHub tool runs without`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:91 — Passive voice. Say who does the action (active voice). (`is read`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:92 — Passive voice. Say who does the action (active voice). (`is mounted`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:93 — Descriptive sentence has 33 words (limit 25). Split it. (`**Slack posting is limited by membership, not by scope.** The bot token can post to any channel the bot is in, and it has to be in your source channels to read `)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:93 — Passive voice. Say who does the action (active voice). (`is limited`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:93 — Procedural sentence has 39 words (limit 20). Split it. (`Keep the bot out of channels it does not need, and if your source channels are sensitive, use two Slack apps: a read-only one for sources and a CODE one invited`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:94 — Descriptive sentence has 33 words (limit 25). Split it. (`**The sandbox reaches only CODE and the GitHub MCP server** (CODE), and the toolset's CODE and CODE, which run outside the sandbox and are not bound by that all`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:94 — Passive voice. Say who does the action (active voice). (`are disabled`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/CLAUDE.md:9 — More than one instruction in one sentence. Write one instruction per sentence. (`read CODE in this directory and follow it step by step.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/CLAUDE.md:13 — Passive voice. Say who does the action (active voice). (`is edited`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:27 — Passive voice. Say who does the action (active voice). (`was chosen`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:32 — Passive voice. Say who does the action (active voice). (`is fetched`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:33 — Passive voice. Say who does the action (active voice). (`is redistributed`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:66 — More than one instruction in one sentence. Write one instruction per sentence. (`Put the note schema on the store's attachment instructions, and give every`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:105 — Passive voice. Say who does the action (active voice). (`is enrolled`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/skill.md:28 — Passive voice. Say who does the action (active voice). (`is enrolled`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/skill.md:29 — Passive voice. Say who does the action (active voice). (`is enrolled`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/skill.md:58 — Passive voice. Say who does the action (active voice). (`is required`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/agents/linear-assistant.md:24 — Passive voice. Say who does the action (active voice). (`are posted`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/agents/linear-assistant.md:26 — Passive voice. Say who does the action (active voice). (`was written`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/CLAUDE.md:9 — Descriptive sentence has 40 words (limit 25). Split it. (`**After the base bridge works, offer extensions.** Ask the user which (if any) they want, then edit CODE and run a bare CODE, which publishes the edit as a new `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/CLAUDE.md:9 — Descriptive sentence has 33 words (limit 25). Split it. (`A new resource is one more file (CODE, CODE, another CODE) that CODE (name whichever directories exist) creates and records in CODE; read its ID in CODE the way`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/CLAUDE.md:9 — Passive voice. Say who does the action (active voice). (`is read`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/CLAUDE.md:11 — Descriptive sentence has 31 words (limit 25). Split it. (`Linear or GitHub MCP so the agent can act, not only reply (CODE + CODE in CODE, a CODE for the credential, which CODE manages from ant 1.34, then CODE on the se`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/CLAUDE.md:19 — Descriptive sentence has 63 words (limit 25). Split it. (`Agent provisioning is CODE from this directory (ant 1.30 or later; name the directories rather than CODE, and pass CODE because you have no terminal for its con`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/CLAUDE.md:19 — Passive voice. Say who does the action (active voice). (`was changed`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/README.md:17 — Descriptive sentence has 37 words (limit 25). Split it. (`Needs [Bun](URL the [CODE CLI](URL 1.30 or later (CODE), a public HTTPS tunnel such as ngrok, admin rights on a Linear workspace, and Anthropic auth: CODE once,`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/README.md:36 — Descriptive sentence has 30 words (limit 25). Split it. (`[CODE](URL reads the agent from [CODE](agents/linear-assistant.md), whose frontmatter is the configuration and whose prose is the system prompt, and the environ`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/README.md:36 — Descriptive sentence has 31 words (limit 25). Split it. (`To change the agent (model, prompt, tools), edit its file and run a bare CODE, which reconciles every file the lockfile tracks and publishes a new version of th`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/README.md:40 — Passive voice. Say who does the action (active voice). (`are refused`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/README.md:40 — Passive voice. Say who does the action (active voice). (`is untrusted`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:15 — Descriptive sentence has 26 words (limit 25). Split it. (`Something has to translate "Linear @mention" → "CODE" on the way in, and "session idle" → "Linear comment" on the way out, while holding both sets of keys.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:30 — Descriptive sentence has 33 words (limit 25). Split it. (`When the idle webhook arrives later with only a session ID, the bridge retrieves the session, reads those keys back, and knows exactly where to reply, with noth`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/skill.md:42 — Passive voice. Say who does the action (active voice). (`is shared`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:42 — Descriptive sentence has 26 words (limit 25). Split it. (`Sessions created under other API keys in the same workspace aren't readable by yours, but a 429 or 5xx is a real failure that should be retried.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/skill.md:50 — Passive voice. Say who does the action (active voice). (`is required`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:62 — Descriptive sentence has 31 words (limit 25). Split it. (`Anyone who can reach the server could install the agent into a Linear workspace they administer, and from then on every mention there would run a session on you`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:62 — Descriptive sentence has 36 words (limit 25). Split it. (`With CODE unset, the first workspace to install is the only one the bridge serves: a later install from a different workspace gets a 403 and its token is revoke`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/skill.md:62 — Passive voice. Say who does the action (active voice). (`is revoked`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/skill.md:62 — Passive voice. Say who does the action (active voice). (`are ignored`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/linear/skill.md:62 — More than one instruction in one sentence. Write one instruction per sentence. (`Install your own workspace right after you start the server, and check the log line names it.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:72 — Descriptive sentence has 33 words (limit 25). Split it. (`So at kickoff CODE stores CODE, an HMAC over the Claude session ID, the Linear session ID, and the organization ID, keyed by a secret derived from CODE, which n`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:72 — Descriptive sentence has 36 words (limit 25). Split it. (`The Claude session ID is part of the signed text on purpose: metadata is readable by the same people who can forge it, so a signature over the route alone could`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:72 — Descriptive sentence has 28 words (limit 25). Split it. (`A signed session is still a session that anyone with workspace credentials can send another message to, and its next idle would post their text into the issue.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/skill.md:72 — Passive voice. Say who does the action (active voice). (`are refused`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:72 — Descriptive sentence has 33 words (limit 25). Split it. (`The bridge also remembers delivered sessions in memory and takes a per-session lock right after verifying, because the remote delete can fail and two idle event`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:72 — Descriptive sentence has 28 words (limit 25). Split it. (`And the signed text includes an issued-at time: a route older than 24 hours is refused, so one whose delivery keeps failing does not stay live with no end.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/skill.md:72 — Passive voice. Say who does the action (active voice). (`is refused`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:72 — Procedural sentence has 24 words (limit 20). Split it. (`If you fork this, keep the verify call between the metadata read and the first Linear call, and keep the delete after the delivery.`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/linear/skill.md:72 — More than one instruction in one sentence. Write one instruction per sentence. (`If you fork this, keep the verify call between the metadata read and the first Linear call, and keep the delete after the delivery.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/skill.md:72 — Passive voice. Say who does the action (active voice). (`are dropped`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/skill.md:76 — Passive voice. Say who does the action (active voice). (`is followed`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:76 — Descriptive sentence has 38 words (limit 25). Split it. (`Treat it like running a script a stranger wrote: keep secrets out of the sandbox, and if you mount a repo or add MCP tools, scope their credentials to what a ho`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/skill.md:84 — Passive voice. Say who does the action (active voice). (`be processed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/skill.md:84 — Passive voice. Say who does the action (active voice). (`is lost`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:84 — Descriptive sentence has 28 words (limit 25). Split it. (`A duplicate that arrives while the first attempt is still running gets a 503, not a 204: acking it would mark the event delivered while the outcome is still unk`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:84 — Descriptive sentence has 36 words (limit 25). Split it. (`That is why a Linear error a retry can't fix (no token for the org, a revoked install or a refused token refresh, an agent session Linear has closed) is logged `)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/skill.md:84 — Passive voice. Say who does the action (active voice). (`is logged`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:88 — Descriptive sentence has 28 words (limit 25). Split it. (`CODE remembers which Claude session is working on each Linear session, sends that session CODE, posts "Stopped.", and the idle webhook then skips the interrupte`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:90 — Descriptive sentence has 27 words (limit 25). Split it. (`After a restart the bridge has no record of runs started before it, so Stop says exactly that instead of claiming a stop that did not happen.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:117 — Descriptive sentence has 34 words (limit 25). Split it. (`**CODE** → CODE hasn't run in this directory yet, so there is no CODE beside CODE, or it stopped partway and the lockfile lacks one of the two (run it again and`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:118 — Descriptive sentence has 27 words (limit 25). Split it. (`**CODE fails with 409 on the environment** → environment names are unique per workspace and someone already created CODE there (an earlier run of this quickstar`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/skill.md:118 — Passive voice. Say who does the action (active voice). (`is created`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/linear/skill.md:118 — Passive voice. Say who does the action (active voice). (`was not created`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/linear/skill.md:119 — Descriptive sentence has 32 words (limit 25). Split it. (`CODE means there is no CODE entry and an ID from CODE is in use (an older setup of this bridge wrote IDs there): run CODE here, or delete the stale lines.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/CLAUDE.md:8 — Passive voice. Say who does the action (active voice). (`is deployed`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/README.md:3 — Descriptive sentence has 38 words (limit 25). Split it. (`A thin [MCP](URL server that wraps the Claude [Managed Agents](URL Sessions API, so Claude Desktop, Claude Code, **or** claude.ai can start and chat with the ag`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/README.md:13 — Descriptive sentence has 28 words (limit 25). Split it. (`The other common shape publishes one agent as a purpose-built tool, such as CODE, with per-caller keys and a continuation token for turns that outlast the clien`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/README.md:41 — Procedural sentence has 21 words (limit 20). Split it. (`If the workspace has no agents yet, run CODE in a sibling quickstart such as [CODE](../slack) or [CODE](../chat-sdk) first.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/README.md:45 — Descriptive sentence has 30 words (limit 25). Split it. (`The HTTP server's bearer token lets its holder list, read, and run **every agent in the workspace** the server's Anthropic credentials belong to, and the bill g`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/README.md:47 — Descriptive sentence has 29 words (limit 25). Split it. (`When set, CODE returns only those, CODE and CODE refuse anything else, and every tool that takes a CODE first checks that the session belongs to one of them.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/README.md:48 — Passive voice. Say who does the action (active voice). (`is set`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/README.md:77 — Passive voice. Say who does the action (active voice). (`is committed`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:15 — Descriptive sentence has 26 words (limit 25). Split it. (`CODE is the only editorial: MCP is request/response and a Managed Agents turn completes over SSE, so something has to stream-to-idle inside a tool call.`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:27 — More than one instruction in one sentence. Write one instruction per sentence. (`Create and update them with the CODE CLI, the Console, or another quickstart's CODE.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:59 — Procedural sentence has 24 words (limit 20). Split it. (`**Test**: in a new chat, ask *"list my managed agents, start a session with the first one, and relay this message to it: hello."*`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:95 — More than one instruction in one sentence. Write one instruction per sentence. (`Do not answer from your own knowledge, and do not paraphrase the backend's reply.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:95 — Procedural sentence has 21 words (limit 20). Split it. (`If it returns any status other than CODE or CODE, tell the user the turn stopped early and give the status.`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:95 — More than one instruction in one sentence. Write one instruction per sentence. (`If it returns any status other than CODE or CODE, tell the user the turn stopped early and give the status.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:103 — Descriptive sentence has 42 words (limit 25). Split it. (`With no allowlist, so can the caller: CODE enumerates them, CODE returns their full system prompts and tool configs, CODE runs any of them on your bill, and any`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:114 — Descriptive sentence has 32 words (limit 25). Split it. (`Two more layers, both independent of the allowlist: every ID is matched against CODE / CODE / CODE before it reaches the API, so a model-supplied string never b`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:114 — Passive voice. Say who does the action (active voice). (`is matched`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:122 — Passive voice. Say who does the action (active voice). (`was told`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:122 — Descriptive sentence has 30 words (limit 25). Split it. (`Together they close DNS rebinding against a server running on your laptop, where a web page you visit resolves its own hostname to CODE and talks to your local `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:126 — Descriptive sentence has 30 words (limit 25). Split it. (`The tools return it inside a JSON text block, the tool descriptions are fixed strings, and CODE clips each field at 4,000 characters and returns a page of at mo`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:126 — Passive voice. Say who does the action (active voice). (`are fixed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:130 — Passive voice. Say who does the action (active voice). (`is parked`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:136 — Passive voice. Say who does the action (active voice). (`is written`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/README.md:16 — Passive voice. Say who does the action (active voice). (`is sent`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/README.md:40 — Passive voice. Say who does the action (active voice). (`are written`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/roadtrip-planner.md:81 — Passive voice. Say who does the action (active voice). (`are swapped`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/CLAUDE.md:23 — Passive voice. Say who does the action (active voice). (`is set`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/CLAUDE.md:35 — Passive voice. Say who does the action (active voice). (`was changed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/CLAUDE.md:49 — Passive voice. Say who does the action (active voice). (`is dropped`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/CLAUDE.md:61 — Passive voice. Say who does the action (active voice). (`is checked`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:3 — Descriptive sentence has 59 words (limit 25). Split it. (`A Next.js chat built directly on a [Claude Managed Agent](URL [session](URL There is no chat framework and no database: the session's event log is the message l`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:7 — Passive voice. Say who does the action (active voice). (`is created`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:8 — Procedural sentence has 22 words (limit 20). Split it. (`**Hand the draft to a second agent.** The planner is a CODE coordinator with one roster entry: a reviewer agent running Opus.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:8 — Descriptive sentence has 28 words (limit 25). Split it. (`The whole exchange is ordinary session events (CODE, CODE, CODE) on the same stream the chat already renders, so you watch the two agents talk to each other.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:43 — Descriptive sentence has 40 words (limit 25). Split it. (`Needs Node 20 or later, the [CODE CLI](URL 1.34 or later (CODE), CODE, and Anthropic auth for an organization with Managed Agents access: CODE once, or an API k`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:63 — Descriptive sentence has 46 words (limit 25). Split it. (`CODE runs [CODE](URL on four files: the planner in [CODE](./agents/roadtrip-planner.md) and the reviewer in [CODE](./agents/plan-reviewer.md) (frontmatter is th`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:78 — Descriptive sentence has 35 words (limit 25). Split it. (`**Every route checks that the session belongs to this app.** The cookie value comes from the browser and becomes an API path parameter, and the server's Anthrop`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:78 — Passive voice. Say who does the action (active voice). (`was created`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:79 — Descriptive sentence has 37 words (limit 25). Split it. (`**Every CODE request has to come from this app's own page.** A web page open in the same browser can POST to CODE with no preflight, and a DNS rebinding page ca`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:79 — Descriptive sentence has 37 words (limit 25). Split it. (`Either one could create sessions on your Anthropic credentials. [CODE](./src/proxy.ts) refuses a request whose CODE is not loopback or listed in CODE, whose COD`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:80 — Descriptive sentence has 32 words (limit 25). Split it. (`**The CODE override is checked against the picker's list** ([CODE](./src/lib/models.ts)) before it reaches CODE, so a caller cannot run your agent on a model yo`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:80 — Passive voice. Say who does the action (active voice). (`is checked`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:90 — Descriptive sentence has 31 words (limit 25). Split it. (`"Plan a 5 day road trip split between Zion and Bryce Canyon for the first week of October." The agent resolves the parks first (CODE), then plans from what the `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:90 — Descriptive sentence has 26 words (limit 25). Split it. (`The status line flips to "thinking..." the moment the model starts reasoning: that is the CODE preview, where the buffered event only lands when thinking ends.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:90 — Descriptive sentence has 32 words (limit 25). Split it. (`The right rail shows each CODE the agent runs in its sandbox (it budgets itself to five per question), each against an allowed host, each authenticated with a k`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:105 — Procedural sentence has 48 words (limit 20). Split it. (`Ask "is anything closed at the park right now" and watch the 4xx land in the tool rail: the agent shows the status and body, retries the documented header locat`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:127 — Descriptive sentence has 27 words (limit 25). Split it. (`The header shows the model from the session's resolved CODE snapshot (CODE), so what you read is what the API resolved, not what the client asked for.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:131 — Descriptive sentence has 29 words (limit 25). Split it. (`After the draft is written, the status line flips to "waiting on Plan reviewer...": the planner spawned its roster agent as a session thread and messaged it the`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:131 — Passive voice. Say who does the action (active voice). (`is written`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:156 — Descriptive sentence has 28 words (limit 25). Split it. (`The roster grants the capability, and the planner's own system prompt decides when to use it: a new day-by-day itinerary gets reviewed, a quick factual answer d`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:158 — Descriptive sentence has 31 words (limit 25). Split it. (`The reviewer's toolset is deny-by-default, which is both a security boundary (a poisoned draft has no tool to reach) and what keeps the review fast: it judges t`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:162 — Descriptive sentence has 34 words (limit 25). Split it. (`The thread lives inside the session, its lifecycle events cross-post to the stream the page already holds open, and the agent-to-agent messages are persisted ev`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:162 — Passive voice. Say who does the action (active voice). (`are persisted`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:166 — Descriptive sentence has 29 words (limit 25). Split it. (`A Managed Agents session already is a resumable chat backend, so the client is three pieces, all in [CODE](./src/lib/use-managed-agent-session.ts) and [CODE](./`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:169 — Passive voice. Say who does the action (active voice). (`is dropped`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:172 — Descriptive sentence has 48 words (limit 25). Split it. (`Everything else on the stream is a status signal: thinking starts drive the activity line, CODE drive the working state and token stats, CODE flips the activity`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:172 — Procedural sentence has 25 words (limit 20). Split it. (`Stop is a real API verb: the button POSTs CODE, the agent winds down, and the CODE that follows flips the UI back to ready.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:177 — Descriptive sentence has 26 words (limit 25). Split it. (`APIs that only accept query-param auth can't use environment variable credentials, and if the agent falls back to NPS's CODE form the request carries the placeh`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:178 — Passive voice. Say who does the action (active voice). (`be substituted`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:181 — Descriptive sentence has 34 words (limit 25). Split it. (`You can update a credential in a vault a running session already holds, but a different vault or a different model means a new session, which is why the picker `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/skill.md:36 — Descriptive sentence has 52 words (limit 25). Split it. (`CODE (which setup runs with CODE; needs CODE 1.34 or later and CODE) creates the environment (networking limited to CODE and CODE), the vault, the reviewer agen`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/skill.md:38 — Passive voice. Say who does the action (active voice). (`are created`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/skill.md:48 — Procedural sentence has 22 words (limit 20). Split it. (`Open <URL The page creates one session per browser on load (cookie CODE), so the sandbox is warm before the first question.`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/skill.md:48 — More than one instruction in one sentence. Write one instruction per sentence. (`Then do the four steps in [README.md](./README.md#four-things-to-do-with-it), in order.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/skill.md:54 — Descriptive sentence has 29 words (limit 25). Split it. (`CODE in CODE is why a pasted ID from another app gets a 403: the session has to resolve, belong to the planner agent in CODE, and still be live.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/skill.md:58 — Descriptive sentence has 34 words (limit 25). Split it. (`CODE and friends in CODE, CODE, or your shell count only where the lockfile has no entry, so IDs left over from an older copy of this app cannot point it at arc`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/skill.md:58 — Passive voice. Say who does the action (active voice). (`is interpolated`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/skill.md:90 — Passive voice. Say who does the action (active voice). (`are archived`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/agents/edgar-analyst.md:64 — Passive voice. Say who does the action (active voice). (`is installed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/agents/edgar-analyst.md:65 — Passive voice. Say who does the action (active voice). (`are inconsistently written`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/agents/edgar-analyst.md:67 — Passive voice. Say who does the action (active voice). (`is shared`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/agents/edgar-analyst.md:68 — More than one instruction in one sentence. Write one instruction per sentence. (`Keep scratch files in /tmp and write`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/README.md:117 — Passive voice. Say who does the action (active voice). (`is checked`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/CLAUDE.md:21 — Passive voice. Say who does the action (active voice). (`is mounted`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/CLAUDE.md:60 — Passive voice. Say who does the action (active voice). (`was changed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/CLAUDE.md:66 — Passive voice. Say who does the action (active voice). (`is commented`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/cloudflare-containers/README.md:13 — Passive voice. Say who does the action (active voice). (`were missed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/cloudflare-containers/README.md:97 — Passive voice. Say who does the action (active voice). (`are deduplicated`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/cloudflare-worker/README.md:21 — Passive voice. Say who does the action (active voice). (`is involved`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/cloudflare-worker/README.md:87 — Passive voice. Say who does the action (active voice). (`are deduplicated`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/cloudflare-worker/README.md:93 — Passive voice. Say who does the action (active voice). (`is evicted`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/daytona/README.md:17 — Passive voice. Say who does the action (active voice). (`were missed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/daytona/README.md:24 — Passive voice. Say who does the action (active voice). (`is scoped`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/daytona/README.md:29 — Passive voice. Say who does the action (active voice). (`are not downloaded`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/daytona/README.md:31 — Passive voice. Say who does the action (active voice). (`is refused`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/daytona/README.md:103 — Passive voice. Say who does the action (active voice). (`is interpolated`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/daytona/README.md:106 — Passive voice. Say who does the action (active voice). (`are deduplicated`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/daytona/README.md:108 — Passive voice. Say who does the action (active voice). (`is processed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker-memory/agents/memory-demo.md:23 — Passive voice. Say who does the action (active voice). (`is mounted`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker/README.md:9 — Passive voice. Say who does the action (active voice). (`is exposed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/modal/README.md:10 — Passive voice. Say who does the action (active voice). (`is mounted`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/modal/README.md:21 — Passive voice. Say who does the action (active voice). (`were missed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/modal/README.md:28 — Passive voice. Say who does the action (active voice). (`is scoped`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/modal/README.md:33 — Passive voice. Say who does the action (active voice). (`are not downloaded`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/modal/README.md:35 — Passive voice. Say who does the action (active voice). (`is refused`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/modal/README.md:86 — Passive voice. Say who does the action (active voice). (`is needed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/modal/README.md:86 — Passive voice. Say who does the action (active voice). (`are read`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/modal/README.md:170 — Passive voice. Say who does the action (active voice). (`are deduplicated`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/agents/openshell-demo.md:34 — Passive voice. Say who does the action (active voice). (`are denied`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/agents/openshell-demo.md:35 — Passive voice. Say who does the action (active voice). (`is read`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:34 — Passive voice. Say who does the action (active voice). (`was tested`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:44 — More than one instruction in one sentence. Write one instruction per sentence. (`Then let Claude Code run the rest:`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:136 — Passive voice. Say who does the action (active voice). (`is not listed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:136 — Passive voice. Say who does the action (active voice). (`be read`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:213 — Passive voice. Say who does the action (active voice). (`is deleted`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:216 — Passive voice. Say who does the action (active voice). (`are not logged`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:220 — Passive voice. Say who does the action (active voice). (`is created`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:222 — More than one instruction in one sentence. Write one instruction per sentence. (`then send the session a message, which restarts the sandbox:`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:315 — Passive voice. Say who does the action (active voice). (`is left`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:319 — Passive voice. Say who does the action (active voice). (`been run`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:3 — Descriptive sentence has 27 words (limit 25). Split it. (`Covers the host check, installing OpenShell, creating the agent and environment, running a first session, confirming the policy held, and changing policy.yaml f`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:3 — Procedural sentence has 21 words (limit 20). Split it. (`Use when someone asks to set up, run, adapt, or debug this quickstart, or asks where the OpenShell policy reference is.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:20 — Passive voice. Say who does the action (active voice). (`are supposed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:106 — Passive voice. Say who does the action (active voice). (`is given`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:164 — Passive voice. Say who does the action (active voice). (`is expected`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:193 — More than one instruction in one sentence. Write one instruction per sentence. (`Then read OpenShell's own record, which does not depend on what the agent says:`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:212 — Passive voice. Say who does the action (active voice). (`was blocked`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:217 — Passive voice. Say who does the action (active voice). (`are not logged`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:219 — Passive voice. Say who does the action (active voice). (`is done`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:311 — Passive voice. Say who does the action (active voice). (`are set`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:338 — Passive voice. Say who does the action (active voice). (`are done`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:343 — Passive voice. Say who does the action (active voice). (`is tested`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/README.md:38 — Passive voice. Say who does the action (active voice). (`are started`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/README.md:44 — Passive voice. Say who does the action (active voice). (`is given`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/README.md:46 — Passive voice. Say who does the action (active voice). (`is run`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/README.md:73 — Passive voice. Say who does the action (active voice). (`is attached`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/vercel/README.md:13 — Passive voice. Say who does the action (active voice). (`were missed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/vercel/README.md:21 — Passive voice. Say who does the action (active voice). (`is scoped`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/vercel/README.md:24 — Passive voice. Say who does the action (active voice). (`is refused`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/vercel/README.md:148 — Passive voice. Say who does the action (active voice). (`is detached`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/vercel/README.md:166 — Passive voice. Say who does the action (active voice). (`are deduplicated`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/webhook-demo/README.md:5 — Passive voice. Say who does the action (active voice). (`are declared`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/webhook-demo/README.md:21 — More than one instruction in one sentence. Write one instruction per sentence. (`Then follow the README of the provider you are deploying.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/webhook-demo/README.md:32 — Passive voice. Say who does the action (active voice). (`is given`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/agents/sentry-triage.md:67 — Passive voice. Say who does the action (active voice). (`are untrusted`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/agents/sentry-triage.md:78 — Passive voice. Say who does the action (active voice). (`was resolved`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md:11 — Procedural sentence has 22 words (limit 20). Split it. (`**Use the installed Sentry plugin** to list the organizations and projects the user can access, and ask them to pick the target.`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md:11 — More than one instruction in one sentence. Write one instruction per sentence. (`**Use the installed Sentry plugin** to list the organizations and projects the user can access, and ask them to pick the target.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md:11 — Passive voice. Say who does the action (active voice). (`is not authenticated`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md:12 — Descriptive sentence has 28 words (limit 25). Split it. (`**Explain the two OAuth grants** before the second browser window opens: Claude Code's plugin credential serves this conversation; the grant CODE saves to the v`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md:12 — Procedural sentence has 23 words (limit 20). Split it. (`Never inspect or copy Claude Code's credential storage, and never put a Sentry token in CODE, a shell variable, or the agent prompt.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md:13 — Procedural sentence has 29 words (limit 20). Split it. (`**Run the flow**: CODE, then CODE (stop while the user approves in the browser; on Sentry's screen only **Inspect Issues & Events** and **Seer** stay checked), `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md:14 — Descriptive sentence has 41 words (limit 25). Split it. (`**Recognize the SSO limitation.** If validation says CODE, or the first run fails with CODE or 403s inside tool results, the organization is rejecting the user-`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md:17 — Descriptive sentence has 41 words (limit 25). Split it. (`Provisioning is CODE (ant 1.34 or later, CODE, CODE): it records the slugs in ignored CODE, runs CODE, which creates the agent, environment, and vault and recor`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md:19 — Descriptive sentence has 30 words (limit 25). Split it. (`A new resource is one more file (CODE, another CODE) added to the CODE line in CODE; its ID lands in CODE, read it with CODE the way CODE does.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/README.md:52 — Passive voice. Say who does the action (active voice). (`is expected`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/README.md:132 — Passive voice. Say who does the action (active voice). (`is involved`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/README.md:135 — Passive voice. Say who does the action (active voice). (`is needed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/README.md:137 — Passive voice. Say who does the action (active voice). (`was rejected`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/README.md:181 — Passive voice. Say who does the action (active voice). (`is not tied`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/README.md:190 — Passive voice. Say who does the action (active voice). (`is unaffected`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:38 — Passive voice. Say who does the action (active voice). (`is keyed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:46 — Passive voice. Say who does the action (active voice). (`are read`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:90 — Passive voice. Say who does the action (active voice). (`are not listed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:112 — Passive voice. Say who does the action (active voice). (`was created`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:119 — Passive voice. Say who does the action (active voice). (`are skipped`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:134 — Passive voice. Say who does the action (active voice). (`was produced`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:140 — Passive voice. Say who does the action (active voice). (`are not backfilled`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:152 — Passive voice. Say who does the action (active voice). (`is not supported`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:160 — Passive voice. Say who does the action (active voice). (`are installed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:165 — Passive voice. Say who does the action (active voice). (`is not authenticated`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:181 — Passive voice. Say who does the action (active voice). (`are constrained`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:182 — Passive voice. Say who does the action (active voice). (`are ranked`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:184 — Passive voice. Say who does the action (active voice). (`was changed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/slack/agents/slack-assistant.md:24 — Passive voice. Say who does the action (active voice). (`are posted`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/slack/agents/slack-assistant.md:24 — More than one instruction in one sentence. Write one instruction per sentence. (`Use plain text or Slack mrkdwn (e.g. *bold*, CODE), and avoid Markdown headers.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/slack/agents/slack-assistant.md:26 — Passive voice. Say who does the action (active voice). (`was written`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md:9 — Descriptive sentence has 40 words (limit 25). Split it. (`**After the base bridge works, offer extensions.** Ask the user which (if any) they want, then edit CODE and run a bare CODE, which publishes the edit as a new `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md:9 — Descriptive sentence has 33 words (limit 25). Split it. (`A new resource is one more file (CODE, CODE, another CODE) that CODE (name whichever directories exist) creates and records in CODE; read its ID in CODE the way`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md:9 — Passive voice. Say who does the action (active voice). (`is read`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md:11 — Descriptive sentence has 31 words (limit 25). Split it. (`Slack or GitHub MCP so the agent can act, not only reply (CODE + CODE in CODE, a CODE for the credential, which CODE manages from ant 1.34, then CODE on the ses`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md:19 — Descriptive sentence has 63 words (limit 25). Split it. (`Agent provisioning is CODE from this directory (ant 1.30 or later; name the directories rather than CODE, and pass CODE because you have no terminal for its con`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md:19 — Passive voice. Say who does the action (active voice). (`was changed`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/README.md:17 — Descriptive sentence has 31 words (limit 25). Split it. (`Needs [Bun](URL the [CODE CLI](URL 1.30 or later (CODE), a public HTTPS tunnel such as ngrok, and Anthropic auth: CODE once, or an API key from [platform.claude`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/README.md:36 — Descriptive sentence has 30 words (limit 25). Split it. (`[CODE](URL reads the agent from [CODE](agents/slack-assistant.md), whose frontmatter is the configuration and whose prose is the system prompt, and the environm`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/README.md:36 — Descriptive sentence has 31 words (limit 25). Split it. (`To change the agent (model, prompt, tools), edit its file and run a bare CODE, which reconciles every file the lockfile tracks and publishes a new version of th`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/skill.md:22 — Descriptive sentence has 32 words (limit 25). Split it. (`When the idle webhook arrives later with only a session ID, retrieve the session, read those keys back, and CODE to exactly the right thread, with nothing store`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/skill.md:34 — Descriptive sentence has 29 words (limit 25). Split it. (`Slack's [Developer Program sandboxes](URL give you a free Enterprise Grid org to test in: admin rights, fake users/channels, no risk of installing a half-built `)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/slack/skill.md:64 — Passive voice. Say who does the action (active voice). (`is shared`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/skill.md:74 — Descriptive sentence has 27 words (limit 25). Split it. (`So at kickoff CODE stores CODE, an HMAC over the session ID, channel, and thread, keyed by a secret derived from CODE, which never leaves the bridge.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/skill.md:74 — Descriptive sentence has 35 words (limit 25). Split it. (`The session ID is part of the signed text on purpose: metadata is readable by the same people who can forge it, so a signature over the route alone could be cop`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/skill.md:74 — Descriptive sentence has 28 words (limit 25). Split it. (`A signed session is still a session that anyone with workspace credentials can send another message to, and its next idle would post their text into the channel`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/slack/skill.md:74 — Passive voice. Say who does the action (active voice). (`are refused`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/skill.md:74 — Descriptive sentence has 33 words (limit 25). Split it. (`The bridge also remembers delivered sessions in memory and takes a per-session lock right after verifying, because the remote delete can fail and two idle event`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/skill.md:74 — Descriptive sentence has 28 words (limit 25). Split it. (`And the signed text includes an issued-at time: a route older than 24 hours is refused, so one whose delivery keeps failing does not stay live with no end.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/slack/skill.md:74 — Passive voice. Say who does the action (active voice). (`is refused`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/skill.md:74 — Procedural sentence has 24 words (limit 20). Split it. (`If you fork this, keep the verify call between the metadata read and the first Slack call, and keep the delete after the delivery.`)
- **P1** `ste.multiple_instructions` anthropics__claude-quickstarts/managed-agents/slack/skill.md:74 — More than one instruction in one sentence. Write one instruction per sentence. (`If you fork this, keep the verify call between the metadata read and the first Slack call, and keep the delete after the delivery.`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/slack/skill.md:74 — Passive voice. Say who does the action (active voice). (`are dropped`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/slack/skill.md:78 — Passive voice. Say who does the action (active voice). (`is followed`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/skill.md:78 — Procedural sentence has 34 words (limit 20). Split it. (`Keep secrets out of the sandbox, scope any repo or MCP credentials you add to what a hostile message should be able to touch, and consider switching CODE to COD`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/slack/skill.md:86 — Passive voice. Say who does the action (active voice). (`be processed`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/slack/skill.md:86 — Passive voice. Say who does the action (active voice). (`is lost`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/skill.md:86 — Descriptive sentence has 28 words (limit 25). Split it. (`A duplicate that arrives while the first attempt is still running gets a 503, not a 204: acking it would mark the event delivered while the outcome is still unk`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/skill.md:90 — Descriptive sentence has 27 words (limit 25). Split it. (`The bridge reads the idle event's CODE, so it posts a warning that the agent is waiting on an approval nobody can give, not the half-finished preamble.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/skill.md:102 — Descriptive sentence has 28 words (limit 25). Split it. (`Slack app → **Event Subscriptions** → On → Request URL CODE → Verified ✓ → add bot event CODE (+ CODE for DMs, and turn on **App Home → Messages Tab**) → **Save`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/skill.md:109 — Descriptive sentence has 34 words (limit 25). Split it. (`**CODE** → CODE hasn't run in this directory yet, so there is no CODE beside CODE, or it stopped partway and the lockfile lacks one of the two (run it again and`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/skill.md:110 — Descriptive sentence has 27 words (limit 25). Split it. (`**CODE fails with 409 on the environment** → environment names are unique per workspace and someone already created CODE there (an earlier run of this quickstar`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/slack/skill.md:110 — Passive voice. Say who does the action (active voice). (`is created`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/managed-agents/slack/skill.md:110 — Passive voice. Say who does the action (active voice). (`was not created`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/managed-agents/slack/skill.md:111 — Descriptive sentence has 38 words (limit 25). Split it. (`CODE means there is no CODE entry and an ID from CODE or CODE is in use (Bun loads both, and an older setup of this bridge wrote IDs there): run CODE here, or d`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/README.md:13 — Descriptive sentence has 26 words (limit 25). Split it. (`This project demonstrates how to leverage Claude's natural language understanding and generation capabilities to create an AI-assisted customer support system w`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/README.md:25 — Descriptive sentence has 33 words (limit 25). Split it. (`This project demonstrates how to leverage the computer use capabilities of Claude, including support for the latest CODE toolset shape, where each computer acti`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/README.md:31 — Descriptive sentence has 52 words (limit 25). Split it. (`Unlike the containerized Computer Use Demo, this project runs directly against the macOS desktop (run it in a VM!) and demonstrates common patterns for building`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/README.md:37 — Descriptive sentence has 29 words (limit 25). Split it. (`This project demonstrates how to give Claude the ability to navigate websites, inspect and interact with DOM elements, extract content, and fill forms using a c`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/README.md:43 — Descriptive sentence has 33 words (limit 25). Split it. (`It has a small driver for one Chromium tab over the Chrome DevTools Protocol, a script that runs the driver with the tool runner, and a script that exercises it`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/README.md:49 — Descriptive sentence has 35 words (limit 25). Split it. (`It has a small driver for one desktop over VNC (the RFB protocol, no VNC library), a script that runs the driver with the tool runner, and a script that exercis`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/README.md:55 — Descriptive sentence has 32 words (limit 25). Split it. (`This project demonstrates a two-agent pattern (initializer + coding agent) that can build complete applications over multiple sessions, with progress persisted `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/README.md:61 — Descriptive sentence has 39 words (limit 25). Split it. (`This project demonstrates how to pair a persistent Managed Agents session per conversation with a chat surface: a research analyst researches with web search an`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/README.md:67 — Descriptive sentence has 34 words (limit 25). Split it. (`This project demonstrates how to bridge a managed-agent session to the AG-UI protocol, stream replies token by token with event deltas, and render agent tool ca`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/README.md:73 — Descriptive sentence has 26 words (limit 25). Split it. (`A scheduled agent that reads your Slack channels and GitHub pull requests each weekday and posts one short brief to Slack, built on Claude Managed Agents.`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/README.md:73 — Descriptive sentence has 61 words (limit 25). Split it. (`This project demonstrates a deployment defined entirely as files applied with CODE (agent, environment, two memory stores, vault, cron deployment), a read-only `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/README.md:79 — Descriptive sentence has 52 words (limit 25). Split it. (`This project demonstrates how to distill a document corpus once into a versioned memory-store knowledge wiki — using parallel extraction sessions, a resolve pas`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/README.md:85 — Descriptive sentence has 44 words (limit 25). Split it. (`This project demonstrates a stateless webhook bridge on Linear's Agent Platform: an CODE creates a Managed Agents session with the Linear session and organizati`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/README.md:91 — Descriptive sentence has 38 words (limit 25). Split it. (`This project demonstrates how to let Claude Desktop, Claude Code, or claude.ai drive the agents already in your workspace: list them, start a session, send a me`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/README.md:97 — Descriptive sentence has 49 words (limit 25). Split it. (`This project demonstrates four API features on one screen: token-by-token streaming with CODE on the session event stream, vault credentials injected at a speci`)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/README.md:103 — Descriptive sentence has 40 words (limit 25). Split it. (`This project demonstrates a deployment that starts a session on a cron schedule with no host process, Sentry's Agent Plugin for guided setup, and a refreshable `)
- **P1** `ste.sentence_length` anthropics__claude-quickstarts/README.md:109 — Descriptive sentence has 36 words (limit 25). Split it. (`This project demonstrates a stateless webhook bridge: an CODE creates a Managed Agents session with the channel and thread stored in session metadata, and the C`)
- **P1** `ste.passive_voice` anthropics__claude-quickstarts/README.md:142 — Passive voice. Say who does the action (active voice). (`is licensed`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/agents/README.md:41 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`implement custom response handling`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:6 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:14 — Modal + be + past participle. Use an active verb. (`will not be allowed`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:18 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:41 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:43 — Vague word "as needed". Give the exact condition, value or action. (`as needed`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:57 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`generation button during streaming`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:93 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Project knowledge base upload documents`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:99 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Project analytics usage stats`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:109 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Model-specific pricing info display`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:149 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:149 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Share conversation via link`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:167 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Token usage display per message`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:206 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:221 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:395 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:446 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Sans-serif system font stack Inter`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:499 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:502 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`indicator shows while waiting`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:537 — Phrasal verb "Set up". Try: prepare / install. (`Set up`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:540 — Phrasal verb "Set up". Try: prepare / install. (`Set up`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:552 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`code block syntax highlighting`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:564 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Build conversation rename functionality`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:576 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Implement code artifact viewer`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:578 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Build artifact editing interface`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:580 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Implement full-screen artifact view`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:589 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Implement project-specific custom instructions`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:592 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Build project settings panel`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:601 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Build image upload functionality`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt:665 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Proper error handling throughout`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:3 — Progressive tense (be + -ing). Use simple present. (`are continuing`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:33 — "Understanding" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Understanding the`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:50 — Perfect tense. Use simple past or present. (`have introduced`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:54 — "perform" → do (plain-word hint). (`perform`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:79 — Vague word "as needed". Give the exact condition, value or action. (`as needed`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:80 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`browser automation see Step`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:98 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`complete user workflows end-to-end`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:101 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`curl commands backend testing alone`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:104 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Mark tests passing without thorough verification`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:108 — "MODIFY" → change (plain-word hint). (`MODIFY`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:122 — "Modify" → change (plain-word hint). (`Modify`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:148 — Modal + be + past participle. Use an active verb. (`should be worked`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:149 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:157 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:184 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Priority Fix broken tests`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:189 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`features work end-to-end through`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:192 — Perfect tense. Use simple past or present. (`have unlimited`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:192 — Vague word "as needed". Give the exact condition, value or action. (`as needed`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md:193 — "terminating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before terminating the`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/autonomous-coding/prompts/initializer_prompt.md:4 — Phrasal verb "set up". Try: prepare / install. (`set up`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/autonomous-coding/prompts/initializer_prompt.md:56 — "modify" → change (plain-word hint). (`modify`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/autonomous-coding/prompts/initializer_prompt.md:62 — Phrasal verb "set up". Try: prepare / install. (`set up`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/autonomous-coding/prompts/initializer_prompt.md:81 — Phrasal verb "Set up". Try: prepare / install. (`Set up`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/autonomous-coding/prompts/initializer_prompt.md:82 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/autonomous-coding/prompts/initializer_prompt.md:98 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/autonomous-coding/prompts/initializer_prompt.md:105 — Perfect tense. Use simple past or present. (`have unlimited`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/prompts/initializer_prompt.md:105 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`time across many sessions`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/autonomous-coding/README.md:43 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/autonomous-coding/README.md:43 — Progressive tense (be + -ing). Use simple present. (`is writing`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/autonomous-coding/README.md:47 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/README.md:47 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`runtime across multiple sessions`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/autonomous-coding/README.md:49 — "modify" → change (plain-word hint). (`modify`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/autonomous-coding/README.md:49 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/autonomous-coding/README.md:62 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/README.md:63 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent auto-continues between sessions`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/autonomous-coding/README.md:64 — Semicolon. Use two sentences. (`Press CODE to pause; run the same command to resume`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/README.md:68 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`defense-in-depth security approach see`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/autonomous-coding/README.md:71 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Filesystem Restrictions File operations`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/autonomous-coding/README.md:126 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/autonomous-coding/README.md:153 — Progressive tense (be + -ing). Use simple present. (`is generating`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/autonomous-coding/README.md:153 — Progressive tense (be + -ing). Use simple present. (`is working`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/autonomous-coding/README.md:159 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/browser-toolset/README.md:5 — Vague word "a few". Give the exact condition, value or action. (`a few`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-toolset/README.md:14 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`throwaway browser profile inside`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/browser-toolset/README.md:22 — Semicolon. Use two sentences. (`an Anthropic API key in CODE;`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/browser-toolset/README.md:23 — Semicolon. Use two sentences. (`an Anthropic SDK version with the browser toolset helpers (CODE in Python, CODE in TypeScript);`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/browser-toolset/README.md:24 — Semicolon. Use two sentences. (`Python 3.10+ or Node.js 20+;`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/browser-toolset/README.md:73 — Semicolon. Use two sentences. (`Implemented: CODE (to a URL; returns once the document is parsed), CODE (headings, links, buttons and form controls, each with a CODE), CODE (by ref or by coord`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/browser-toolset/README.md:77 — Semicolon. Use two sentences. (`every other tool: screenshots, scrolling, typing, form input, find, tabs, uploads and downloads, console and network reads, JavaScript execution;`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/browser-toolset/README.md:78 — Semicolon. Use two sentences. (`modifier keys on clicks and more than one tab;`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/browser-toolset/README.md:79 — Semicolon. Use two sentences. (`a page that stops answering, including one that opens a dialog (alert, confirm, prompt): every later call, navigate included, fails after 60 seconds;`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/browser-toolset/README.md:80 — Semicolon. Use two sentences. (`Block those with egress rules;`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/browser-toolset/README.md:81 — Semicolon. Use two sentences. (`a page that replaces itself by script before its document is parsed: CODE then waits for a document that never arrives and gives up after 30 seconds;`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/browser-toolset/README.md:82 — Semicolon. Use two sentences. (`a click, or a page script, that starts a navigation: the next read can fail once or read the old page, and the model reads again or waits;`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/CHANGELOG.md:3 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Microsoft Playwright source code`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/CHANGELOG.md:14 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Microsoft Playwright element interaction patterns`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/browser-use-demo/CHANGELOG.md:20 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/CHANGELOG.md:20 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Playwright source code during debugging`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/CHANGELOG.md:31 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`mouse cursor without clicking using`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/CHANGELOG.md:35 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Handle coordinate scaling section`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/browser-use-demo/README.md:16 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/browser-use-demo/README.md:23 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/README.md:23 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`parameter works across different screen sizes`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/browser-use-demo/README.md:70 — Progressive tense (be + -ing). Use simple present. (`is running`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/README.md:77 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`current Playwright implementation hits`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/README.md:81 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Browser automation poses unique risks`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/browser-use-demo/README.md:81 — "using" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`when using the`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/README.md:81 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`consider taking precautions such`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/README.md:83 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`prevent direct system attacks`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/browser-use-demo/README.md:90 — "obtain" → get (plain-word hint). (`obtain`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/browser-use-demo/README.md:90 — "prior to" → before (plain-word hint). (`prior to`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/README.md:90 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`please inform end users`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/browser-use-demo/README.md:100 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/README.md:111 — Possible noun cluster of 9 words. Break it up with "of", "for" or a verb. (`element targeting across screen sizes replacing brittle pixel coordinates`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/browser-use-demo/README.md:127 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/README.md:127 — Possible noun cluster of 7 words. Break it up with "of", "for" or a verb. (`browser tools implementation includes automatic coordinate scaling`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/README.md:137 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`own browser automation tools`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/browser-use-demo/README.md:142 — "modify" → change (plain-word hint). (`modify`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/README.md:144 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Docker image volume mount allows`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/README.md:181 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`features like element targeting`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/README.md:181 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`browser automation adds web-specific actions`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/README.md:181 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`while browser automation focuses`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/browser-use-demo/README.md:188 — Semicolon. Use two sentences. (`**read_page**: Get DOM tree with element refs; use text="interactive" to filter`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/README.md:190 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`highlight matches requires text`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/README.md:193 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`page context requires text`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/README.md:197 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`browser automation allows targeting`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/README.md:199 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Mouse Actions accept either`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/browser-use-demo/README.md:222 — "replacing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, replacing the`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/browser-use-demo/README.md:230 — Vague word "sufficient". Give the exact condition, value or action. (`sufficient`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/browser-use-demo/README.md:230 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/browser-use-demo/README.md:230 — "sufficient" → enough (plain-word hint). (`sufficient`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/README.md:238 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Try simpler websites first`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/browser-use-demo/tests/README.md:67 — "Rendering" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Rendering all`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/tests/README.md:84 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Complete message rendering pipeline`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/tests/README.md:87 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Error propagation across components`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/tests/README.md:88 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Full user interaction workflow`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/tests/README.md:97 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Maximum size inputs k character messages`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/browser-use-demo/tests/README.md:137 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/browser-use-demo/tests/README.md:143 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Complete Streamlit mocking setup`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/browser-use-demo/tests/README.md:171 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/CLAUDE.md:5 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/CLAUDE.md:6 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/CLAUDE.md:6 — Semicolon. Use two sentences. (`CODE, not CODE; CODE, not CODE).`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/CLAUDE.md:7 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/CLAUDE.md:7 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`session metadata needs nothing`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/computer-toolset/README.md:5 — Vague word "a few". Give the exact condition, value or action. (`a few`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-toolset/README.md:16 — Semicolon. Use two sentences. (`> The server runs without a password, so keep it on localhost (CODE, in both commands below); from a container, publish its port to the host's loopback only (CO`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-toolset/README.md:24 — Semicolon. Use two sentences. (`an Anthropic API key in CODE;`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-toolset/README.md:25 — Semicolon. Use two sentences. (`an Anthropic SDK version with the computer toolset helpers (CODE in Python, CODE in TypeScript);`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-toolset/README.md:26 — Semicolon. Use two sentences. (`Python 3.10+ or Node.js 20+;`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-toolset/README.md:27 — Semicolon. Use two sentences. (`TigerVNC's CODE is one process and needs nothing else (CODE); CODE turns off the password it asks for by default:`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/computer-toolset/README.md:75 — Vague word "a few". Give the exact condition, value or action. (`a few`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-toolset/README.md:87 — Semicolon. Use two sentences. (`every other tool: CODE, CODE, CODE, CODE, CODE, CODE and CODE;`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-toolset/README.md:88 — Semicolon. Use two sentences. (`A larger screen may need scaling to fit the model's image limits, and then the coordinates scaled back;`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-toolset/README.md:89 — Semicolon. Use two sentences. (`a VNC password and servers older than RFB 3.7: the driver speaks RFB 3.7 or newer to a server that offers the CODE security type;`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-toolset/README.md:90 — Semicolon. Use two sentences. (`an encoding other than Raw: each screenshot moves the whole screen uncompressed, about 4 MB at 1280×800, which is fine on localhost and slow elsewhere;`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-toolset/README.md:91 — Semicolon. Use two sentences. (`a screen that changes size while the driver is connected;`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-toolset/README.md:92 — Semicolon. Use two sentences. (`a letter under a held shift: CODE types CODE;`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-toolset/README.md:93 — Semicolon. Use two sentences. (`a bound on CODE: the driver sleeps for whatever duration the model asks;`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/computer-toolset/README.md:94 — "building" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by building a`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/.claude/skills/first-run/SKILL.md:9 — Semicolon. Use two sentences. (`and pause for confirmation between phases; the goal is that they understand`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-best-practices/.claude/skills/first-run/SKILL.md:49 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`output means dim thinking text`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/computer-use-best-practices/.claude/skills/first-run/SKILL.md:51 — Phrasal verb "point out". Try: show. (`point out`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:13 — Semicolon. Use two sentences. (`> [Parallels](URL both support macOS guests; we use`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/computer-use-best-practices/README.md:18 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/computer-use-best-practices/README.md:22 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:28 — Semicolon. Use two sentences. (`CODE are all Mac-specific; a containerized or Linux variant is`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/computer-use-best-practices/README.md:45 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:46 — Semicolon. Use two sentences. (`ahead; the demo nudges toward it via the CODE appended after a`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/computer-use-best-practices/README.md:46 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/computer-use-best-practices/README.md:48 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:66 — Semicolon. Use two sentences. (`> This task will move your real mouse and keyboard; read the`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/computer-use-best-practices/README.md:68 — "running" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before running it`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:74 — Semicolon. Use two sentences. (`will not work; install a newer interpreter first (for example`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:99 — Semicolon. Use two sentences. (`The rest of this README shows plain CODE commands; with uv installed`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:106 — Semicolon. Use two sentences. (`The agent's preflight will open these panes for you on the first run;`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:115 — Semicolon. Use two sentences. (`<img src="docs/images/screen-recording-permissions.jpg" alt="Screen &amp; System Audio Recording pane in System Settings" width="49%">`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-best-practices/README.md:115 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`System Audio Recording pane`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-best-practices/README.md:120 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`system private window picker dialog`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:123 — Semicolon. Use two sentences. (`toggle above; click **Allow**.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:140 — Semicolon. Use two sentences. (`desktop; this disables the CODE tool entirely):`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/computer-use-best-practices/README.md:148 — "printing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`After printing the`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/computer-use-best-practices/README.md:155 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-best-practices/README.md:159 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`model stops calling tools`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:161 — Semicolon. Use two sentences. (`interrupt the current turn and drop to that prompt; an empty line exits.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:220 — Semicolon. Use two sentences. (`Each tool gets a form auto-generated from its CODE; fill in the`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/computer-use-best-practices/README.md:220 — Phrasal verb "fill in". Try: write / enter. (`fill in`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/computer-use-best-practices/README.md:227 — Progressive tense (be + -ing). Use simple present. (`are missing`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:236 — Semicolon. Use two sentences. (`instance is CODE; the rest of the codebase reads CODE so`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/computer-use-best-practices/README.md:237 — "editing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`without editing the`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:280 — Semicolon. Use two sentences. (`viewport size, advisor caps, etc.); see the comments on each field in`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/computer-use-best-practices/README.md:280 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-best-practices/README.md:292 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`safety classifiers including prompt-injection detection`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:301 — Semicolon. Use two sentences. (`Only the CODE tool's *declaration* changes; CODE, CODE,`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-best-practices/README.md:302 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`tool still executes here`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-best-practices/README.md:306 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`member tool per action`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-best-practices/README.md:307 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`screenshot pixels either way`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/computer-use-best-practices/README.md:317 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:318 — Semicolon. Use two sentences. (`order; after the first failure the rest are answered with`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/computer-use-best-practices/README.md:319 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:323 — Semicolon. Use two sentences. (`CODE; results for ordinary tools must not.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:328 — Semicolon. Use two sentences. (`(CODE picks); the model then calls it as CODE`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/computer-use-best-practices/README.md:334 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/computer-use-best-practices/README.md:334 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:345 — Semicolon. Use two sentences. (`at startup that names the conflicting setting; set it to CODE (or switch`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-best-practices/README.md:362 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Image pruning Prompt caching`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/computer-use-best-practices/README.md:369 — "letting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by letting the`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-best-practices/README.md:385 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`summarization both bound context size`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:397 — Semicolon. Use two sentences. (`account of what happened; pruning just deletes old screenshots outright.`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/computer-use-best-practices/README.md:402 — "carrying" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`carrying an`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/computer-use-best-practices/README.md:403 — "dropping" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`while dropping it`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/computer-use-best-practices/README.md:405 — Perfect tense. Use simple past or present. (`have been read`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:421 — Semicolon. Use two sentences. (`CODE and let summarization act as a rare safety net;`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:427 — Semicolon. Use two sentences. (`This is not a general recommendation; try it on your own`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/computer-use-best-practices/README.md:429 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-best-practices/README.md:435 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`system prompt timing guidance plus`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/README.md:443 — Semicolon. Use two sentences. (`results), CODE (advisor-side prompt caching; breaks even at`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-best-practices/README.md:444 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`advisor calls per conversation`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-best-practices/README.md:446 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`extra row per advisor`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:3 — Semicolon. Use two sentences. (`altair==6.0.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:5 — Semicolon. Use two sentences. (`annotated-doc==0.0.4 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:7 — Semicolon. Use two sentences. (`annotated-types==0.7.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:9 — Semicolon. Use two sentences. (`anthropic==0.93.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:11 — Semicolon. Use two sentences. (`anyio==4.12.1 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:16 — Semicolon. Use two sentences. (`attrs==26.1.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:20 — Semicolon. Use two sentences. (`blinker==1.9.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:22 — Semicolon. Use two sentences. (`cachetools==7.0.5 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:24 — Semicolon. Use two sentences. (`certifi==2026.2.25 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:29 — Semicolon. Use two sentences. (`charset-normalizer==3.4.6 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:31 — Semicolon. Use two sentences. (`click==8.3.1 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:35 — Semicolon. Use two sentences. (`distro==1.9.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:37 — Semicolon. Use two sentences. (`docstring-parser==0.17.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:39 — Semicolon. Use two sentences. (`fastapi==0.135.1 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:41 — Semicolon. Use two sentences. (`gitdb==4.0.12 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:43 — Semicolon. Use two sentences. (`gitpython==3.1.46 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:45 — Semicolon. Use two sentences. (`greenlet==3.3.2 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:47 — Semicolon. Use two sentences. (`h11==0.16.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:51 — Semicolon. Use two sentences. (`httpcore==1.0.9 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:53 — Semicolon. Use two sentences. (`httpx==0.28.1 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:55 — Semicolon. Use two sentences. (`idna==3.11 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:60 — Semicolon. Use two sentences. (`jinja2==3.1.6 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:64 — Semicolon. Use two sentences. (`jiter==0.13.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:66 — Semicolon. Use two sentences. (`jsonschema==4.26.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:68 — Semicolon. Use two sentences. (`jsonschema-specifications==2025.9.1 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:70 — Semicolon. Use two sentences. (`markupsafe==3.0.3 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:72 — Semicolon. Use two sentences. (`mouseinfo==0.1.3 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:74 — Semicolon. Use two sentences. (`narwhals==2.18.1 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:76 — Semicolon. Use two sentences. (`numpy==2.4.3 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:81 — Semicolon. Use two sentences. (`packaging==26.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:85 — Semicolon. Use two sentences. (`pandas==2.3.3 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:87 — Semicolon. Use two sentences. (`pillow==12.1.1 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:92 — Semicolon. Use two sentences. (`playwright==1.58.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:94 — Semicolon. Use two sentences. (`protobuf==6.33.6 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:96 — Semicolon. Use two sentences. (`pyarrow==23.0.1 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:98 — Semicolon. Use two sentences. (`pyautogui==0.9.54 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:100 — Semicolon. Use two sentences. (`pydantic==2.12.5 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:104 — Semicolon. Use two sentences. (`pydantic-core==2.41.5 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:106 — Semicolon. Use two sentences. (`pydeck==0.9.1 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:108 — Semicolon. Use two sentences. (`pyee==13.0.1 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:110 — Semicolon. Use two sentences. (`pygetwindow==0.0.9 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:112 — Semicolon. Use two sentences. (`pymsgbox==1.0.9 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:114 — Semicolon. Use two sentences. (`pyobjc-core==12.1 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:119 — Semicolon. Use two sentences. (`pyobjc-framework-cocoa==12.1 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:121 — Semicolon. Use two sentences. (`pyobjc-framework-quartz==12.1 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:123 — Semicolon. Use two sentences. (`pyperclip==1.11.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:125 — Semicolon. Use two sentences. (`pyrect==0.2.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:127 — Semicolon. Use two sentences. (`pyscreeze==0.1.30 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:129 — Semicolon. Use two sentences. (`python-dateutil==2.9.0.post0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:131 — Semicolon. Use two sentences. (`python-dotenv==1.2.2 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:133 — Semicolon. Use two sentences. (`python-multipart==0.0.22 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:135 — Semicolon. Use two sentences. (`pytweening==1.2.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:137 — Semicolon. Use two sentences. (`pytz==2026.1.post1 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:139 — Semicolon. Use two sentences. (`referencing==0.37.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:143 — Semicolon. Use two sentences. (`requests==2.32.5 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:145 — Semicolon. Use two sentences. (`rpds-py==0.30.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:149 — Semicolon. Use two sentences. (`rubicon-objc==0.5.3 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:151 — Semicolon. Use two sentences. (`six==1.17.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:153 — Semicolon. Use two sentences. (`smmap==5.0.3 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:155 — Semicolon. Use two sentences. (`sniffio==1.3.1 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:157 — Semicolon. Use two sentences. (`starlette==0.52.1 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:159 — Semicolon. Use two sentences. (`streamlit==1.55.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:161 — Semicolon. Use two sentences. (`tenacity==9.1.4 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:163 — Semicolon. Use two sentences. (`toml==0.10.2 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:165 — Semicolon. Use two sentences. (`tornado==6.5.5 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:167 — Semicolon. Use two sentences. (`typing-extensions==4.15.0 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:180 — Semicolon. Use two sentences. (`typing-inspection==0.4.2 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:184 — Semicolon. Use two sentences. (`tzdata==2025.3 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:186 — Semicolon. Use two sentences. (`urllib3==2.6.3 ; sys_platform == 'darwin'`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/computer-use-best-practices/requirements.txt:188 — Semicolon. Use two sentences. (`uvicorn==0.42.0 ; sys_platform == 'darwin'`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md:21 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md:23 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`first browser session compiles`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md:29 — Perfect tense. Use simple past or present. (`has run`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md:45 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-demo/.claude/skills/verify/SKILL.md:48 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`newer tool version expect`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/computer-use-demo/CONTRIBUTING.md:12 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/computer-use-demo/CONTRIBUTING.md:64 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/computer-use-demo/CONTRIBUTING.md:78 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/computer-use-demo/CONTRIBUTING.md:87 — Modal + be + past participle. Use an active verb. (`MUST be signed`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/computer-use-demo/CONTRIBUTING.md:94 — Vague word "as needed". Give the exact condition, value or action. (`as needed`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/computer-use-demo/CONTRIBUTING.md:96 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/computer-use-demo/CONTRIBUTING.md:110 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-demo/README.md:4 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`while older models Claude Opus`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-demo/README.md:7 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`consider taking precautions such`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-demo/README.md:9 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`prevent direct system attacks`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/computer-use-demo/README.md:16 — "obtain" → get (plain-word hint). (`obtain`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/computer-use-demo/README.md:16 — "prior to" → before (plain-word hint). (`prior to`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-demo/README.md:16 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`please inform end users`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-demo/README.md:26 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent loop running against`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/computer-use-demo/README.md:34 — Modal + be + past participle. Use an active verb. (`must be restarted`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-demo/README.md:40 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`member tool per computer action`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/computer-use-demo/README.md:61 — Progressive tense (be + -ing). Use simple present. (`is running`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/computer-use-demo/README.md:68 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/computer-use-demo/README.md:69 — Vague word "a few". Give the exact condition, value or action. (`a few`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/computer-use-demo/README.md:88 — Progressive tense (be + -ing). Use simple present. (`is running`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/computer-use-demo/README.md:110 — Progressive tense (be + -ing). Use simple present. (`is running`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/computer-use-demo/README.md:114 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/computer-use-demo/README.md:133 — Progressive tense (be + -ing). Use simple present. (`is running`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-demo/README.md:135 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Google Cloud Application Default Credentials`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/computer-use-demo/README.md:140 — Progressive tense (be + -ing). Use simple present. (`is running`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-demo/README.md:142 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`container stores settings like`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/computer-use-demo/README.md:142 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`settings between container runs`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/computer-use-demo/README.md:152 — Modal + be + past participle. Use an active verb. (`can be used`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/computer-use-demo/README.md:173 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/customer-support-agent/README.md:3 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`customer support chat interface`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/customer-support-agent/README.md:3 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Amazon Bedrock Knowledge Bases`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/customer-support-agent/README.md:11 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Knowledge base source visualization`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/customer-support-agent/README.md:12 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/customer-support-agent/README.md:19 — Phrasal verb "Set up". Try: prepare / install. (`Set up`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/customer-support-agent/README.md:19 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`environment variables see Configuration section`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/customer-support-agent/README.md:33 — Modal + be + past participle. Use an active verb. (`will be discussed`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/customer-support-agent/README.md:33 — Progressive tense (be + -ing). Use simple present. (`are adding`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/customer-support-agent/README.md:46 — "obtain" → get (plain-word hint). (`obtain`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/customer-support-agent/README.md:66 — Phrasal verb "Make sure". Try: verify / ensure. (`Make sure`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/customer-support-agent/README.md:71 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`project utilizes Amazon Bedrock`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/customer-support-agent/README.md:71 — Phrasal verb "set up". Try: prepare / install. (`set up`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/customer-support-agent/README.md:73 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/customer-support-agent/README.md:75 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Own Knowledge Base section`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/customer-support-agent/README.md:97 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Amazon S storage service`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/customer-support-agent/README.md:108 — Perfect tense. Use simple past or present. (`have done`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/customer-support-agent/README.md:113 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`project supports multiple Claude models`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/customer-support-agent/README.md:136 — "offering" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, offering a`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/customer-support-agent/README.md:138 — "Modify" → change (plain-word hint). (`Modify`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/customer-support-agent/README.md:141 — "editing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by editing the`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/customer-support-agent/README.md:141 — "Modify" → change (plain-word hint). (`Modify`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/customer-support-agent/README.md:157 — "adjusting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by adjusting the`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/customer-support-agent/README.md:157 — "modify" → change (plain-word hint). (`modify`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/customer-support-agent/README.md:201 — Progressive tense (be + -ing). Use simple present. (`are adding`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/customer-support-agent/README.md:222 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`exclude specific components left sidebar`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/customer-support-agent/README.md:245 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/customer-support-agent/README.md:263 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/customer-support-agent/README.md:264 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/customer-support-agent/README.md:266 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/customer-support-agent/README.md:266 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`switch between different configurations`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/customer-support-agent/README.md:271 — "using" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`By using this`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/customer-support-agent/README.md:276 — Modal + be + past participle. Use an active verb. (`may be limited`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/customer-support-agent/README.md:277 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`help improve future versions`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/financial-data-analyst/README.md:5 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/financial-data-analyst/README.md:9 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Claude Using Claude Haiku`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/financial-data-analyst/README.md:11 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/financial-data-analyst/README.md:15 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Line Charts Time series data`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/financial-data-analyst/README.md:16 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Bar Charts Single metric comparisons`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/financial-data-analyst/README.md:17 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Charts Multiple metrics comparison`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/financial-data-analyst/README.md:19 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Area Charts Component breakdowns`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/financial-data-analyst/README.md:20 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Pie Charts Distribution analysis`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/financial-data-analyst/README.md:90 — Modal + be + past participle. Use an active verb. (`can be adapted`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/financial-data-analyst/README.md:93 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Analyze climate change trends`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/financial-data-analyst/README.md:95 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`energy adoption across regions`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/financial-data-analyst/README.md:98 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Upload athlete performance data`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/financial-data-analyst/README.md:104 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`charts showing follower growth`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/financial-data-analyst/README.md:108 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Upload student performance data`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/financial-data-analyst/README.md:115 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Analyze long-term health trends`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/assistant-ui/agents/spreadsheet-analyst.md:69 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`thorough script per question`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/assistant-ui/agents/spreadsheet-analyst.md:70 — "running" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Before running a`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:3 — Semicolon. Use two sentences. (`A Next.js chat app. assistant-ui renders everything; one Managed Agents session per conversation runs the analyst, and CODE folds each session's event log into `)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:3 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Agents session per conversation runs`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:7 — Semicolon. Use two sentences. (`Don't guess field names; the beta surface moves.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:10 — Semicolon. Use two sentences. (`The handoff events (CODE, CODE) already arrive on the stream; the reducer currently ignores them, so this needs a rendering branch too.`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:11 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`analyst remembers per-dataset conventions across chats`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:13 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`custom tool whose card renders buttons`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:20 — Semicolon. Use two sentences. (`CODE — one-time provisioning of the agent + environment into CODE (ant 1.30 or later; CODE because you have no terminal for its prompt; it needs CODE or an expo`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:23 — Semicolon. Use two sentences. (`CODE — the reducer's golden-turn test; run it whenever the event mapping changes`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:29 — "touching" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before touching the`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:31 — Semicolon. Use two sentences. (`Regenerate them rather than hand-editing; put quickstart UI in CODE and CODE.`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/assistant-ui/CLAUDE.md:31 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/assistant-ui/components/NOTICE.md:5 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`assistant-ui app adds them`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/assistant-ui/components/NOTICE.md:6 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:29 — Semicolon. Use two sentences. (`The join is one file. [CODE](lib/managed-agents/reducer.ts) is a pure function from a session's event log to assistant-ui's message model, and the same function`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:31 — Progressive tense (be + -ing). Use simple present. (`is waiting`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:42 — Semicolon. Use two sentences. (`The server key can see the whole workspace; the gate is what keeps a guessed id from reading it.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:52 — Semicolon. Use two sentences. (`The terminal card shows the exact command with Allow and Deny under it; Deny takes an optional note.`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:59 — Modal + be + past participle. Use an active verb. (`can be rejected`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:61 — Semicolon. Use two sentences. (`CODE belongs here because there is a human at a keyboard to answer it; a scheduled or headless deployment wants CODE (or bash off), or the session parks forever`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:61 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`belongs here because there`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:61 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`session parks forever waiting`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:65 — Semicolon. Use two sentences. (`As the model writes, the session sends CODE, then CODE text fragments, then the buffered CODE that was always there; the reducer folds the fragments into the te`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:67 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`chain-of-thought group shows thinking activity without`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:67 — Semicolon. Use two sentences. (`Don't promise streamed reasoning text; the API doesn't send it.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:83 — Semicolon. Use two sentences. (`Custom tools take a *result*, never a confirmation; sending CODE for one is a 400.`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:87 — "Dropping" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Dropping a`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:89 — Semicolon. Use two sentences. (`That query parameter is newer than the rest of the API and is not enabled on every organization yet; where it isn't, the call returns CODE, [CODE](lib/managed-a`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:99 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`walk me through setting`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:111 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`gate everything still works`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/README.md:131 — Semicolon. Use two sentences. (`CODE 0.14.27 is the first line with the CODE / CODE API and the approval gate on CODE; the copy-in components under CODE were generated against it (CODE) and ar`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:13 — Semicolon. Use two sentences. (`The unit test (CODE) folds the golden turn from the wire protocol; when the mapping changes, change the test first.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:16 — Semicolon. Use two sentences. (`CODE enforces this order; don't move the send in front of the attach.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:29 — Semicolon. Use two sentences. (`That is not a bug; the same code path handles it.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:32 — Semicolon. Use two sentences. (`Don't wire a component that displays CODE; there isn't one.`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:35 — Modal + be + past participle. Use an active verb. (`can be rejected`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:35 — Semicolon. Use two sentences. (`If several tools block at once, answer them in **one** CODE; the controller debounces clicks into a batch for exactly this reason, because a second racing send `)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:35 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:38 — Semicolon. Use two sentences. (`The controller answers CODE automatically the moment it renders; a tab closed mid-turn just means the answer goes out when the session is next opened.`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:41 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:41 — "attempt" → try (plain-word hint). (`attempt`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:41 — Semicolon. Use two sentences. (`Don't paper over it; do point demo audiences at it as the recovery path working.`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:44 — Progressive tense (be + -ing). Use simple present. (`is waiting`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:44 — "Closing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Closing the`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:44 — Semicolon. Use two sentences. (`Closing the tab or navigating away only drops the SSE response; the agent keeps working server-side and the reply is waiting in history when you come back.`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:44 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent keeps working server-side`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:44 — "resending" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by resending the`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:44 — Semicolon. Use two sentences. (`Don't "fix" a slow turn by resending the message; you'll queue a duplicate.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:47 — Semicolon. Use two sentences. (`The composer mounts an attachment at CODE — the file id keeps repeat uploads of the same filename from colliding, the basename keeps it readable — and the messa`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:47 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`file id keeps repeat uploads`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:50 — "Listing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Listing a`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:53 — Semicolon. Use two sentences. (`Kill strays with CODE (the CODE matters; without it lsof also matches unrelated processes).`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:56 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`since fixing them costs`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:57 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`first history fetch fails while`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:57 — "Sending" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Sending a`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:58 — Semicolon. Use two sentences. (`Each success or failure re-sweeps the pending set, so they converge; a hard stall needs one of them to silently exhaust all its attempts first.`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:61 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`public internet without adding`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:93 — Semicolon. Use two sentences. (`The agent and environment are durable and reused; keep them.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/assistant-ui/skill.md:101 — Semicolon. Use two sentences. (`Sessions are cheap; archive them from the sidebar, or leave them.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:3 — Semicolon. Use two sentences. (`Long-running Node server (Hono): browser chat with a sessions sidebar (CODE → CODE) → Chat SDK web adapter CODE → one Managed Agents session per conversation, w`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:3 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Agents session per conversation`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:3 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`held session event stream`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:19 — Semicolon. Use two sentences. (`Needs CODE ≥ 0.109.0 (the first release with CODE and CODE); streaming is gated per org while the 2026-07-01 update rolls out (CODE, "Token previews are gated p`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:24 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`why fire-and-forget breaks here`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:26 — Semicolon. Use two sentences. (`**Multiagent red-team pass**: a second toolless reviewer agent on the analyst's roster (CODE) that critiques every draft brief in a session thread; the handoff `)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:26 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`second toolless reviewer agent`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:27 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`past briefs across sessions`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:30 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/CLAUDE.md:31 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`tool-call trace stays raw text`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:3 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`session per conversation owns`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:7 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`prompt caching happen inside`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:9 — "Swapping" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Swapping a`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:9 — Phrasal verb "set up". Try: prepare / install. (`set up`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:9 — Vague word "a few". Give the exact condition, value or action. (`a few`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:33 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:51 — "editing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`After editing it`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/chat-sdk/README.md:57 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:16 — "Opening" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Opening an`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:16 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`events become bubbles again`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:19 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`message bodies there too`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:23 — Semicolon. Use two sentences. (`CODE 404s without it; CODE refuses the turn.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:29 — Semicolon. Use two sentences. (`The Slack and WhatsApp adapters need the opposite (ack the platform webhook in seconds, post through their API later); on web, returning early closes the only c`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:35 — Semicolon. Use two sentences. (`On CODE the bridge opens a streamed CODE so the bubble appears immediately; each fragment is pushed straight through; the buffered event closes it.`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:40 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`org without session streaming`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:40 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:44 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`web adapter v carries message text`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:44 — Progressive tense (be + -ing). Use simple present. (`is reasoning`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:44 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`chat lane stays pure Chat`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:46 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`name plus input hint`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:67 — Semicolon. Use two sentences. (`Slack and WhatsApp sign every webhook; a browser request proves nothing.`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:67 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`browser request proves nothing`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:67 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:67 — "exposing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Before exposing it`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:67 — "writing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by writing the`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:67 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:73 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`built-in programmatic tool calling`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:73 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent writes short scripts`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:75 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`egress because networking posture follows`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:87 — Semicolon. Use two sentences. (`The bridge does not watch that signal: the Managed Agents turn keeps running server-side, its replies go nowhere, and a message you send right afterwards queues`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:87 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:87 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`right afterwards queues behind`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:87 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`event log keeps them`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:87 — "Picking" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Picking the`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:87 — "including" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, including the`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:87 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`event log kept them`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:91 — Semicolon. Use two sentences. (`The session finishes the turn server-side anyway; reopen the chat from the sidebar and the replies are there.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:95 — Semicolon. Use two sentences. (`On Slack or WhatsApp the Chat SDK converts it to the platform's markup; on web it passes through and CODE renders it with CODE.`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:95 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`system prompt still bans headings`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:99 — Semicolon. Use two sentences. (`CODE disables Node's own request timeout (CODE; the socket inactivity timeout is already off by default), but a reverse proxy or load balancer in front will rea`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:99 — Semicolon. Use two sentences. (`Locally there is nothing in between; when you deploy, raise the proxy's idle/read timeout for this route.`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:105 — Phrasal verb "fill in". Try: write / enter. (`fill in`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:105 — Semicolon. Use two sentences. (`Token previews are part of the 2026-07-01 Managed Agents update; use an org that has it.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:106 — Semicolon. Use two sentences. (`CODE (needs Node ≥ 22.9 and CODE ≥ 0.109.0; CODE already says so).`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:114 — Semicolon. Use two sentences. (`CODE is the shipped host (the local Node server, which also builds the page on request); any host that can run a fetch handler can mount the same app: use CODE `)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:118 — Progressive tense (be + -ing). Use simple present. (`is missing`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:119 — Semicolon. Use two sentences. (`Serverless synchronous function limits are often seconds; verify the platform allows long streaming responses before relying on it, or move the turn into a queu`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:119 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`platform allows long streaming responses`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:120 — Phrasal verb "Turn on". Try: start / energize. (`Turn on`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:122 — Semicolon. Use two sentences. (`CODE sends each message once, so this matters when you add retries or a second surface; CODE is the fix (see the multi-instance note below).`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:149 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`scope sessions per user`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:151 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`message dedup holds across instances`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:152 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Gate spend even behind auth`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:153 — Progressive tense (be + -ing). Use simple present. (`is answering`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:154 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`server log carries event types`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:155 — "archiving" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`; archiving the`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/chat-sdk/skill.md:155 — Semicolon. Use two sentences. (`Cleanup when you're done with the demo (archive is permanent; archiving the agent also hides its sessions from the sidebar):`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/.claude/skills/verify/SKILL.md:34 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Boot requires agent identity`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/agents/financial-assistant.md:33 — Progressive tense (be + -ing). Use simple present. (`are missing`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/agents/financial-assistant.md:33 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/agents/financial-assistant.md:34 — Phrasal verb "Point out". Try: show. (`Point out`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/agents/financial-assistant.md:37 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`situation weigh X against Y`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/agents/financial-assistant.md:42 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/agents/financial-assistant.md:43 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`quick calculations compound interest`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/agents/financial-assistant.md:55 — Vague word "generally". Give the exact condition, value or action. (`generally`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/agents/financial-assistant.md:56 — Semicolon. Use two sentences. (`tight; one short disclaimer at most, and only where genuinely warranted.`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:3 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`finance assistant chat app wiring`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:20 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:20 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`text previews via event delta streaming`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:22 — Semicolon. Use two sentences. (`**Generative UI.** Four visual tools (payoff timeline, growth projection, budget breakdown, scenario comparison) are passed to the adapter as CODE; it registers`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:38 — Semicolon. Use two sentences. (`CODE, then CODE once (ant 1.30 or later; CODE because you have no terminal for its confirmation prompt), then CODE (server on :8787, web on :5173).`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:38 — Semicolon. Use two sentences. (`After editing CODE, a bare CODE publishes the new version; restart the server to pin it.`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:40 — "running" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by running the`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:44 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:45 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent supplies starting numbers`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:45 — Possible noun cluster of 7 words. Break it up with "of", "for" or a verb. (`sliders recompute everything client-side without another agent`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:48 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`runtime delivers tool args`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:48 — "mounting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before mounting a`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:48 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`parses args through coercing zod schemas`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:49 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`adapter handles repl suspension`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:50 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`server restart starts fresh sessions`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:50 — Semicolon. Use two sentences. (`Fine for a demo, not for production; the adapter accepts a persistent CODE when it matters.`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:54 — Vague word "where possible". Give the exact condition, value or action. (`where possible`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:57 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`needs day data retention`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:59 — Semicolon. Use two sentences. (`It needs CODE or an exported CODE; it does not read CODE.`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:60 — Phrasal verb "Point out". Try: show. (`Point out`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:60 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`server logs per session`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:64 — Perfect tense. Use simple past or present. (`has not run`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/CLAUDE.md:68 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Vite dev proxy forwards`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/README.md:32 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`raw agent activity side`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/README.md:51 — "sharing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before sharing it`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/copilot-kit-ag-ui/README.md:88 — Vague word "a few". Give the exact condition, value or action. (`a few`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:37 — Progressive tense (be + -ing). Use simple present. (`is watching`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:41 — Semicolon. Use two sentences. (`Every request sends CODE; the variable holds a placeholder and the platform swaps in the real token on requests to slack.com.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:45 — Semicolon. Use two sentences. (`Post only the brief, and only to the destination channel named in the preferences; never post source content to any other channel or thread.`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:47 — Modal + be + past participle. Use an active verb. (`may be mentioned`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:49 — "reading" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before reading the`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:49 — Semicolon. Use two sentences. (`Read the state: bookmarks.json (one bookmark per source, or per channel of a source), ledger.md (items already reported, one per line: date, source, item id, an`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:49 — Modal + be + past participle. Use an active verb. (`will be fixed`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:53 — Vague word "a few". Give the exact condition, value or action. (`a few`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:53 — Semicolon. Use two sentences. (`A count ("12 open reviews") is not an item; link the ones that are blocked.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:53 — Semicolon. Use two sentences. (`An item already in the ledger and still open is carried as one marked line ("still waiting, day 3"), not re-reported; a closed item is dropped without comment.`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:53 — Perfect tense. Use simple past or present. (`has retired`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:55 — Semicolon. Use two sentences. (`For every item you will report, re-check its live source just before posting: resolved since you read it, drop it; still open but changed, fix the line; cannot `)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:57 — Modal + be + past participle. Use an active verb. (`could not be read`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:57 — Semicolon. Use two sentences. (`If there is nothing to report and every source was read, say so in one line; if the preferences allow silence, post nothing and go to step 8 as a deliberate qui`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:59 — Semicolon. Use two sentences. (`Otherwise, before posting, look for today's edition in the destination by its title (read the channel's recent history with CODE; a bot token cannot use search)`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:59 — Vague word "maybe". Give the exact condition, value or action. (`maybe`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:61 — Semicolon. Use two sentences. (`Bookkeeping, only after the post is confirmed (or after a deliberate silence): set the run record to "status: posted" with the message ID; then one ledger line `)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:61 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`ledger line per item`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:61 — Semicolon. Use two sentences. (`If the preferences store proposes nothing, leave proposals.md alone; if the reader's replies in the destination suggest a preference change, add it there for th`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/agent.md:61 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`preferences store proposes nothing`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/deployment.md:10 — Semicolon. Use two sentences. (`timezone: America/New_York # when it fires; the body tells the agent which zone to use for dates`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/daily-brief/CLAUDE.md:3 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`holds six resource files`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/daily-brief/CLAUDE.md:20 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/daily-brief/CLAUDE.md:25 — Semicolon. Use two sentences. (`Slack CODE: no vault attached (CODE empty in CODE; re-run CODE) or the credential's CODE does not include CODE.`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/daily-brief/CLAUDE.md:26 — Vague word "kind of". Give the exact condition, value or action. (`kind of`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/daily-brief/CLAUDE.md:30 — Semicolon. Use two sentences. (`**Keep the deployment paused while testing** (CODE pauses it on creation; manual runs work while paused).`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/daily-brief/CLAUDE.md:30 — Semicolon. Use two sentences. (`CODE empties the state store afterwards; CODE removes all six resources.`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/daily-brief/CLAUDE.md:35 — "editing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`After editing the`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/daily-brief/preferences.example.md:3 — Semicolon. Use two sentences. (`Edit it in the Console or with CODE; the next run follows the change.`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:5 — Progressive tense (be + -ing). Use simple present. (`is watching`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:21 — Phrasal verb "Set up". Try: prepare / install. (`Set up`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:28 — Semicolon. Use two sentences. (`One CODE creates the agent, environment, memory stores, vault and deployment in your workspace; the script then adds the two credentials to the vault (no secret`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:28 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`secret ever passes through`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:37 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Later edits take effect`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:55 — "counting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before counting it`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:81 — Semicolon. Use two sentences. (`**Cost.** On a busy day (two channels and two repositories with around 140 messages and 25 pull requests between them) a run cost about $1.50 on Claude Opus 5 a`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:81 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`pull requests between them`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:81 — "Doubling" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Doubling the`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:82 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:82 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`channel looks like silence`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/daily-brief/README.md:89 — Vague word "try to". Give the exact condition, value or action. (`try to`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/CLAUDE.md:5 — Semicolon. Use two sentences. (`The runnable artifact is CODE;`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/CLAUDE.md:8 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`walk them through setting`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/CLAUDE.md:15 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`match later source changes`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/example_data/analyst_note_synthetic.md:8 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`share all-cash offer values`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/example_data/analyst_note_synthetic.md:10 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/example_data/analyst_note_synthetic.md:15 — "approximately" → about (plain-word hint). (`approximately`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/example_data/analyst_note_synthetic.md:21 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Investors comparing leverage math across sources`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/example_data/analyst_note_synthetic.md:22 — "quoting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before quoting a`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:3 — "searching" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by searching a`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:19 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`preview see Access below`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:21 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`case study without running anything`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:32 — Semicolon. Use two sentences. (`Every document is fetched live from SEC EDGAR by accession number; nothing`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:54 — Semicolon. Use two sentences. (`the main steps, in order; the notebook walks through each one.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:58 — Semicolon. Use two sentences. (`worked example fetches a real M&amp;A data room from public filings.`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:64 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent session per batch`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:71 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:79 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`fresh session per question`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:80 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:90 — Semicolon. Use two sentences. (`does not ship a grading harness or a tuning loop; it is the natural next`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:95 — Modal + be + past participle. Use an active verb. (`must be enabled`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:99 — Semicolon. Use two sentences. (`returns 404 and the notebook stops at step 5; everything before that still`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:103 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:134 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Workload Identity Federation applies`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/README.md:148 — "searching" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by searching the`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/skill.md:3 — Phrasal verb "set up". Try: prepare / install. (`set up`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/skill.md:8 — Modal + be + past participle. Use an active verb. (`must be enabled`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/skill.md:17 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/skill.md:27 — Vague word "try to". Give the exact condition, value or action. (`try to`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/skill.md:29 — Semicolon. Use two sentences. (`is enrolled, ask them to install it per those instructions; confirm with:`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/skill.md:64 — Modal + be + past participle. Use an active verb. (`will be refused`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/skill.md:64 — Progressive tense (be + -ing). Use simple present. (`is missing`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/skill.md:78 — Semicolon. Use two sentences. (`CODE; the user's run will vary with model choice and API`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/skill.md:102 — Vague word "a few". Give the exact condition, value or action. (`a few`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/skill.md:107 — Semicolon. Use two sentences. (`The dream step can take 20–60 minutes; tell the user to kick it off`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/skill.md:108 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/skill.md:111 — Vague word "reasonable". Give the exact condition, value or action. (`reasonable`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/knowledge-wiki/skill.md:113 — Perfect tense. Use simple past or present. (`have Managed`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/linear/agents/linear-assistant.md:26 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`environment details because text inside`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/linear/CLAUDE.md:9 — Semicolon. Use two sentences. (`A new resource is one more file (CODE, CODE, another CODE) that CODE (name whichever directories exist) creates and records in CODE; read its ID in CODE the way`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/linear/CLAUDE.md:9 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`name whichever directories exist`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/linear/CLAUDE.md:11 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/linear/CLAUDE.md:13 — Semicolon. Use two sentences. (`**Multiagent**: coordinator + subagent roster (CODE in CODE; CODE resolves the path and pins the version)`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/linear/CLAUDE.md:15 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/linear/CLAUDE.md:19 — Semicolon. Use two sentences. (`Agent provisioning is CODE from this directory (ant 1.30 or later; name the directories rather than CODE, and pass CODE because you have no terminal for its con`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/linear/CLAUDE.md:19 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/linear/CLAUDE.md:19 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`re-runs pushes file edits onto`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/linear/CLAUDE.md:19 — Semicolon. Use two sentences. (`It needs CODE or an exported CODE; it does not read CODE.`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/linear/skill.md:15 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`while holding both sets`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/linear/skill.md:30 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`idle webhook arrives later`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/linear/skill.md:42 — Modal + be + past participle. Use an active verb. (`should be retried`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/linear/skill.md:50 — "creating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`When creating the`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/linear/skill.md:54 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/linear/skill.md:66 — "Restarting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Restarting the`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/linear/skill.md:66 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`server forgets pending states`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/linear/skill.md:72 — Modal + be + past participle. Use an active verb. (`could be copied`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/linear/skill.md:72 — Perfect tense. Use simple past or present. (`has delivered`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/linear/skill.md:72 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`session carry different event ids`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/linear/skill.md:72 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`whose delivery keeps failing`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/linear/skill.md:84 — "acking" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`: acking it`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/linear/skill.md:84 — "attempt" → try (plain-word hint). (`attempt`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/linear/skill.md:84 — Perfect tense. Use simple past or present. (`has closed`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/linear/skill.md:88 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`event whose activity carries`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/linear/skill.md:88 — Progressive tense (be + -ing). Use simple present. (`is working`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/linear/skill.md:115 — Vague word "usually". Give the exact condition, value or action. (`usually`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/linear/skill.md:118 — Vague word "usually". Give the exact condition, value or action. (`usually`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/linear/skill.md:128 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:76 — "Terminate" → stop (plain-word hint). (`Terminate`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:85 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:93 — Vague word "try to". Give the exact condition, value or action. (`try to`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:103 — Modal + be + past participle. Use an active verb. (`can be read`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:126 — Perfect tense. Use simple past or present. (`have read`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:134 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`minutes big repo clone`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:136 — Perfect tense. Use simple past or present. (`has been`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/mcp-server-typescript/skill.md:136 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`deploy still cuts long calls`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/README.md:19 — Semicolon. Use two sentences. (`persistent session (the conversation ID is the session ID); the`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/README.md:24 — "swapping" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by swapping the`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/README.md:41 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`bookmark per source instead`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/README.md:42 — Modal + be + past participle. Use an active verb. (`could not be read`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/README.md:43 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/README.md:58 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`stateless Bun webhook bridge`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/README.md:89 — Semicolon. Use two sentences. (`all-CLI baseline; CODE runs the Python SDK worker in the`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/README.md:94 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`parallel analyst sessions work`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/README.md:114 — Semicolon. Use two sentences. (`and refreshes; the sandbox never holds a token.`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/README.md:117 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`stateless Bun webhook bridge`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/plan-reviewer.md:9 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`road trip planner drafts`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/plan-reviewer.md:25 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`review road trip itineraries`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/plan-reviewer.md:26 — Semicolon. Use two sentences. (`a draft plan as a message; reply with a quick review and nothing else.`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/plan-reviewer.md:28 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`verdict line first Solid plan`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/plan-reviewer.md:31 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`between full activity days`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/roadtrip-planner.md:14 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Plans national-park road trips`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/roadtrip-planner.md:46 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`plan road trips around`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/roadtrip-planner.md:47 — Semicolon. Use two sentences. (`destination; you supply the facts.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/roadtrip-planner.md:57 — Semicolon. Use two sentences. (`Resolve the park first; its parkCode and coordinates drive everything else:`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/roadtrip-planner.md:63 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`parks campgrounds alerts thingstodo events`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/roadtrip-planner.md:69 — Semicolon. Use two sentences. (`JSON REQUEST BODY; there is no header alternative.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/roadtrip-planner.md:78 — Semicolon. Use two sentences. (`Timestamps are unix milliseconds; temperatures are Kelvin - convert.`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/roadtrip-planner.md:87 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/roadtrip-planner.md:90 — Semicolon. Use two sentences. (`Tight day-by-day lines, no padding;`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/roadtrip-planner.md:92 — Semicolon. Use two sentences. (`Pipe curls through jq to keep only the fields you need; print what you`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/roadtrip-planner.md:92 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Pipe curls through jq`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/roadtrip-planner.md:100 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`plan changes swap day`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/roadtrip-planner.md:109 — "answering" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before answering the`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/agents/roadtrip-planner.md:114 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`review round per itinerary`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/CLAUDE.md:4 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Teaches session event streaming`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/CLAUDE.md:33 — "skipping" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, skipping any`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/CLAUDE.md:34 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`publishes file edits onto`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/CLAUDE.md:44 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/CLAUDE.md:45 — "trusting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before trusting the`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/CLAUDE.md:53 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`session cookie goes through`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/CLAUDE.md:64 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`vault demo proves nothing`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/environments/roadtrip-planner.yaml:1 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Road trip planner sandbox`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:3 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`agent plans road trips around`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:6 — Modal + be + past participle. Use an active verb. (`may be swapped`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:7 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Override agent settings per session`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:7 — "rerunning" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, rerunning the`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:8 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`reviewer agent running Opus`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:63 — Phrasal verb "pick up". Try: take. (`pick up`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:63 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`change either agent model`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:82 — "exposing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before exposing the`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:90 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`day road trip split between Zion`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:105 — Progressive tense (be + -ing). Use simple present. (`is rejecting`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:105 — "setting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by setting the`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:131 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`full multi-day itinerary step s Zion`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:131 — "creating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, creating the`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:156 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`own system prompt decides`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:162 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`reload like everything else`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:178 — Modal + be + past participle. Use an active verb. (`may be substituted`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/README.md:182 — Phrasal verb "set up". Try: prepare / install. (`set up`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/skill.md:17 — "involving" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before involving the`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/skill.md:36 — Semicolon. Use two sentences. (`CODE (which setup runs with CODE; needs CODE 1.34 or later and CODE) creates the environment (networking limited to CODE and CODE), the vault, the reviewer agen`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/managed-agents/roadtrip-planner/skill.md:38 — Phrasal verb "pick up". Try: take. (`pick up`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/agents/edgar-analyst.md:24 — Semicolon. Use two sentences. (`it first; the series can start anywhere from 2006q1), as tab-separated`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/agents/edgar-analyst.md:43 — Semicolon. Use two sentences. (`adsh. num.txt runs to hundreds of MB per quarter; filter by adsh or cik`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/agents/edgar-analyst.md:44 — "loading" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before loading it`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/agents/edgar-analyst.md:45 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Form D private-offering filings`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/agents/edgar-analyst.md:51 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`bulk indexes sit beside`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/agents/edgar-analyst.md:53 — Semicolon. Use two sentences. (`numbers, primary document names; older filings continue in the`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/agents/edgar-analyst.md:57 — Modal + be + past participle. Use an active verb. (`can be fetched`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/agents/edgar-analyst.md:63 — Semicolon. Use two sentences. (`grep by CIK across quarters; CIKs are zero-padded to 10 digits in the`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/agents/edgar-analyst.md:65 — Semicolon. Use two sentences. (`Names are inconsistently written; match on CIK whenever you can.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/agents/edgar-analyst.md:80 — Semicolon. Use two sentences. (`with its related persons, and those people may file at public companies;`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/README.md:88 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`private companies raising money`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/README.md:124 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`environment key claims work`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/archil/README.md:125 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Archil mount token goes`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/CLAUDE.md:51 — Progressive tense (be + -ing). Use simple present. (`is missing`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/CLAUDE.md:78 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`own log tool calls`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/CLAUDE.md:121 — "Restarting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Restarting the`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/cloudflare-containers/README.md:18 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent runs arbitrary bash`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/daytona/README.md:22 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`sandbox runs arbitrary bash`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/daytona/README.md:109 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker-memory/memory_stores/user-preferences.yaml:1 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`assistant keeps across sessions`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker-memory/README.md:7 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`syncs memory edits back while`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker-memory/README.md:80 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`store per end user`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker-memory/README.md:86 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`spreads sessions across them`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker-memory/README.md:105 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`runs without them here`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker-memory/README.md:121 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker-memory/README.md:128 — Perfect tense. Use simple past or present. (`has stayed`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/docker/README.md:71 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`spreads sessions across them`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/modal/README.md:106 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`either Python file needs`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/modal/README.md:114 — "heartbeating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`heartbeating the`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/modal/README.md:135 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`work item something else already`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/modal/README.md:163 — Perfect tense. Use simple past or present. (`has accepted`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/modal/README.md:164 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`per-session work secret since`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/agents/openshell-demo.md:29 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`demo assistant whose tools`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:7 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`demo adds another layer`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:16 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`own machines claim sessions`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:31 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Apple silicon Macs through Docker Desktop`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:101 — "losing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`without losing a`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:101 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`worker reconnects without losing`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:127 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`spreads sessions across them`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:129 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`another host claims starts`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:137 — Perfect tense. Use simple past or present. (`has started`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:163 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent runs arbitrary bash`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:207 — Perfect tense. Use simple past or present. (`has decrypted`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:220 — Progressive tense (be + -ing). Use simple present. (`is running`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:244 — Perfect tense. Use simple past or present. (`has drifted`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:292 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`skills runs without them here`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/README.md:305 — "killing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`killing that`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:3 — Phrasal verb "Set up". Try: prepare / install. (`Set up`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:3 — "creating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, creating the`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:3 — "running" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, running a`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:3 — "confirming" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, confirming the`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:3 — Phrasal verb "set up". Try: prepare / install. (`set up`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:9 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`healthy result looks like`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:120 — "reading" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`without reading the`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:163 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`tool line per tool`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:225 — Perfect tense. Use simple past or present. (`has stopped`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:265 — Perfect tense. Use simple past or present. (`has started`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:267 — Perfect tense. Use simple past or present. (`has not drifted`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/openshell/setup-skill.md:312 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Rootless Docker without cgroup`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/README.md:6 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/README.md:9 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`uses Archil persistent sandboxes`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/README.md:22 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`session cannot reach another`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/README.md:45 — "running" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`running it`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/README.md:60 — "passing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for passing your`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/README.md:62 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`sandbox per session running`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/README.md:64 — "running" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, running the`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/README.md:73 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`session per host once memory`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/README.md:81 — "running" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, running it`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/vercel/README.md:96 — "heartbeating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`heartbeating the`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/vercel/README.md:118 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`work item something else already`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/vercel/README.md:144 — Perfect tense. Use simple past or present. (`has accepted`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/vercel/README.md:145 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`per-session work secret since`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/vercel/README.md:151 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Sandbox reuse Vercel Sandbox`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/vercel/README.md:169 — "claiming" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`claiming a`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/webhook-demo/agents/webhook-demo.md:8 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`sandbox demo webhook providers`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/webhook-demo/agents/webhook-demo.md:24 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`demo assistant whose tools`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/self-hosted-sandboxes/webhook-demo/README.md:21 — Progressive tense (be + -ing). Use simple present. (`are deploying`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/agents/sentry-triage.md:63 — Semicolon. Use two sentences. (`refreshable OAuth credential; never look for credentials in the sandbox.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/agents/sentry-triage.md:87 — Semicolon. Use two sentences. (`direction; never ask Seer to create a pull request or modify issue state.`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/sentry/agents/sentry-triage.md:87 — "modify" → change (plain-word hint). (`modify`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md:5 — Semicolon. Use two sentences. (`refreshable CODE vault credential; the sandbox never holds a token.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md:12 — Semicolon. Use two sentences. (`**Explain the two OAuth grants** before the second browser window opens: Claude Code's plugin credential serves this conversation; the grant CODE saves to the v`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md:12 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`second browser window opens`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md:13 — Semicolon. Use two sentences. (`**Run the flow**: CODE, then CODE (stop while the user approves in the browser; on Sentry's screen only **Inspect Issues & Events** and **Seer** stay checked), `)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md:14 — Progressive tense (be + -ing). Use simple present. (`is rejecting`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md:14 — Semicolon. Use two sentences. (`**Recognize the SSO limitation.** If validation says CODE, or the first run fails with CODE or 403s inside tool results, the organization is rejecting the user-`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md:14 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`s inside tool results`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md:17 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Re-runs publish file edits`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/CLAUDE.md:19 — Semicolon. Use two sentences. (`A new resource is one more file (CODE, another CODE) added to the CODE line in CODE; its ID lands in CODE, read it with CODE the way CODE does.`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/sentry/README.md:6 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`host process stays running`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/README.md:49 — Semicolon. Use two sentences. (`server as unauthenticated, run CODE inside Claude Code and sign in; that is`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/README.md:58 — Semicolon. Use two sentences. (`**Inspect Issues & Events** and **Seer** checked; untick **Triage Issues** and`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/sentry/README.md:107 — "modify" → change (plain-word hint). (`modify`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/sentry/README.md:131 — Perfect tense. Use simple past or present. (`has expired`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/sentry/README.md:136 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`upstream Sentry session behind`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/sentry/README.md:139 — Perfect tense. Use simple past or present. (`have registered`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/README.md:140 — Semicolon. Use two sentences. (`setup; the vault no longer lists an active credential for the MCP URL, so`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/README.md:171 — Semicolon. Use two sentences. (`this as HTTP 403 on all calls after a successful consent; the exact response`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/sentry/README.md:176 — "saving" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`after saving the`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/README.md:184 — Semicolon. Use two sentences. (`the only way to hand an org-issued token to the remote server; it is not`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/sentry/README.md:190 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`because Claude Code holds`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:31 — Semicolon. Use two sentences. (`Claude Code owns the plugin's credential and does not expose it; the vault owns`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:47 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`consent screen Inspect Issues`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:64 — Semicolon. Use two sentences. (`CODE; there is no field for another scheme.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:68 — Semicolon. Use two sentences. (`token on every call (seen as 403s on Sentry's own org; assume any SSO org may`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:75 — Semicolon. Use two sentences. (`is no in-vault workaround; the README's "Known limitations" has the details and`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:101 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:120 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`fall-back day fire twice`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:132 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Transient failures rate limits`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:139 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`runs still work while`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:146 — Vague word "a few". Give the exact condition, value or action. (`a few`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:150 — Perfect tense. Use simple past or present. (`has not enabled`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:152 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent tries once per`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:166 — Semicolon. Use two sentences. (`Ask them to choose the target; do not`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:173 — Semicolon. Use two sentences. (`Read back the CODE line; CODE`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:183 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`issue labels either Seer`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:185 — "leaving" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before leaving the`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/sentry/skill.md:218 — Semicolon. Use two sentences. (`read what the on-call engineer could; with **Triage Issues** approved it`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/slack/agents/slack-assistant.md:24 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/slack/agents/slack-assistant.md:26 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`behave because text inside`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md:8 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`gotcha scope vs event-subscription`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md:9 — Semicolon. Use two sentences. (`A new resource is one more file (CODE, CODE, another CODE) that CODE (name whichever directories exist) creates and records in CODE; read its ID in CODE the way`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md:9 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`name whichever directories exist`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md:11 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md:13 — Semicolon. Use two sentences. (`**Multiagent**: coordinator + subagent roster (CODE in CODE; CODE resolves the path and pins the version)`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md:15 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md:19 — Semicolon. Use two sentences. (`Agent provisioning is CODE from this directory (ant 1.30 or later; name the directories rather than CODE, and pass CODE because you have no terminal for its con`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md:19 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md:19 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`re-runs pushes file edits onto`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/slack/CLAUDE.md:19 — Semicolon. Use two sentences. (`It needs CODE or an exported CODE; it does not read CODE.`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/slack/skill.md:22 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`idle webhook arrives later`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/slack/skill.md:26 — "awaiting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`without awaiting it`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/slack/skill.md:34 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`free Enterprise Grid org`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/slack/skill.md:36 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/slack/skill.md:38 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`become Primary Org Owner`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/slack/skill.md:43 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Bot Token Scopes grants permission`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/slack/skill.md:56 — "Saving" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Saving the`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/slack/skill.md:56 — Progressive tense (be + -ing). Use simple present. (`is listening`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/slack/skill.md:74 — Modal + be + past participle. Use an active verb. (`could be copied`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/slack/skill.md:74 — Perfect tense. Use simple past or present. (`has delivered`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/slack/skill.md:74 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`session carry different event ids`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/managed-agents/slack/skill.md:74 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`whose delivery keeps failing`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/managed-agents/slack/skill.md:86 — "acking" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`: acking it`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/slack/skill.md:86 — "attempt" → try (plain-word hint). (`attempt`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/managed-agents/slack/skill.md:90 — Progressive tense (be + -ing). Use simple present. (`is waiting`)
- **P2** `ste.semicolon` anthropics__claude-quickstarts/managed-agents/slack/skill.md:97 — Semicolon. Use two sentences. (`Nothing to paste into CODE for them; CODE for the Slack secrets below.`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/managed-agents/slack/skill.md:102 — Phrasal verb "turn on". Try: start / energize. (`turn on`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/managed-agents/slack/skill.md:110 — Vague word "usually". Give the exact condition, value or action. (`usually`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/managed-agents/slack/skill.md:121 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/README.md:19 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/README.md:55 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/README.md:61 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Agents session per conversation`)
- **P2** `ste.ing_verb` anthropics__claude-quickstarts/README.md:61 — "swapping" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by swapping the`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/README.md:67 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`finance assistant chat app built`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/README.md:67 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`render agent tool calls`)
- **P2** `ste.complex_tense` anthropics__claude-quickstarts/README.md:73 — Modal + be + past participle. Use an active verb. (`could not be read`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/README.md:73 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/README.md:79 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`deal-room knowledge wiki built`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/README.md:97 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`national-park road trip planner built`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/README.md:99 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Agents Road Trip Planner`)
- **P2** `ste.noun_cluster` anthropics__claude-quickstarts/README.md:103 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Sentry triage agent built`)
- **P2** `ste.hedge` anthropics__claude-quickstarts/README.md:115 — Vague word "Generally". Give the exact condition, value or action. (`Generally`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/README.md:120 — Phrasal verb "Set up". Try: prepare / install. (`Set up`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/README.md:125 — Phrasal verb "check out". Try: examine. (`check out`)
- **P2** `ste.phrasal_verb` anthropics__claude-quickstarts/README.md:138 — Phrasal verb "Check out". Try: examine. (`Check out`)
- **P2** `ste.word_hint` anthropics__claude-quickstarts/README.md:138 — "additional" → more (plain-word hint). (`additional`)

## 5. Labs tool runs

- Agent Health Checker · anthropics__claude-quickstarts/.github/workflows/build.yaml · score 33 · Shippable prototype, not production-ready.
- Agent Health Checker · anthropics__claude-quickstarts/autonomous-coding/prompts/app_spec.txt · score 40 · Not safe for customer traffic — 1 high-severity customer-safety finding.
- Agent Health Checker · anthropics__claude-quickstarts/autonomous-coding/prompts/coding_prompt.md · score 36 · Shippable prototype, not production-ready.
- Agent Health Checker · anthropics__claude-quickstarts/autonomous-coding/prompts/initializer_prompt.md · score 33 · Shippable prototype, not production-ready.
- Agent Health Checker · anthropics__claude-quickstarts/computer-use-best-practices/.vscode/launch.json · score 29 · Shippable prototype, not production-ready.
- Agent Health Checker · anthropics__claude-quickstarts/customer-support-agent/app/lib/customer_support_categories.json · score 39 · Shippable prototype, not production-ready.
- Agent Health Checker · anthropics__claude-quickstarts/managed-agents/daily-brief/agents/daily-brief/environment.yaml · score 38 · Shippable prototype, not production-ready.
- Agent Health Checker · anthropics__claude-quickstarts/managed-agents/roadtrip-planner/vaults/roadtrip-planner.yaml · score 38 · Shippable prototype, not production-ready.
- Observability Gap Finder · (whole input) · score 84 · Strong signals — verify collectors actually receive data.

