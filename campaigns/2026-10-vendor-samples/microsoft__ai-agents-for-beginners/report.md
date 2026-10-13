# Agent ops audit memo (self-run)

_Generated locally by agent-ops-check 0.1.0 on 2026-10-13T08:21:52.646Z. No network calls were made. Nothing left this machine._

> Heuristic regex and static checks, not a security audit. It can miss problems and can flag harmless code.

Rules 2026.10.13 (2026-10-13). Rules are 0 day(s) old.

**Overall score:** 19/100 · files scanned: 143 · agents: microsoft__ai-agents-for-beginners, 00-course-setup, 01-intro-to-ai-agents, 02-explore-agentic-frameworks, 03-agentic-design-patterns, 04-tool-use, 05-agentic-rag, 06-building-trustworthy-agents, 07-planning-design, 08-multi-agent, 09-metacognition, 10-ai-agents-production, 11-agentic-protocols, 12-context-engineering, 13-agent-memory, 14-microsoft-agent-framework, 15-browser-use, 16-deploying-scalable-agents, 17-creating-local-ai-agents, 18-securing-ai-agents

| Area | Score | High | Medium | Low |
|---|---|---|---|---|
| Personal-to-work data crossover | 58 | 4 | 0 | 2 |
| Irreversible actions | 0 | 28 | 50 | 0 |
| Governance + cost | 0 | 0 | 69 | 53 |
| Agent Health Checker + Labs tools | 0 | 9 | 11 | 1 |
| Prompt-injection scan (ADSF) | 0 | 19 | 11 | 9 |
| Simplified Technical English (STE) | 0 | 0 | 362 | 860 |

## 1. Agent and connector inventory

| Agent | Connectors | Credentials (names only) | Scopes |
|---|---|---|---|
| microsoft__ai-agents-for-beginners | discord | AZURE_OPENAI_API_KEY, AZURE_SEARCH_API_KEY, MINIMAX_API_KEY, NOVITA_API_KEY | - |
| 00-course-setup | - | - | - |
| 01-intro-to-ai-agents | - | - | - |
| 02-explore-agentic-frameworks | discord | - | - |
| 03-agentic-design-patterns | - | - | - |
| 04-tool-use | - | AZURE_OPENAI_API_KEY | - |
| 05-agentic-rag | - | - | - |
| 06-building-trustworthy-agents | - | - | - |
| 07-planning-design | - | - | - |
| 08-multi-agent | - | - | - |
| 09-metacognition | - | - | - |
| 10-ai-agents-production | - | - | - |
| 11-agentic-protocols | discord | AZURE_SEARCH_API_KEY, GITHUB_TOKEN | - |
| 12-context-engineering | - | - | - |
| 13-agent-memory | - | LLM_API_KEY | - |
| 14-microsoft-agent-framework | slack | MINIMAX_API_KEY, OPENAI_API_KEY | - |
| 15-browser-use | discord, generic_webhook, gmail, personal_calendar_contacts, slack | ANTHROPIC_API_KEY, API_KEY, AWS_SECRET_ACCESS_KEY, AZURE_OPENAI_API_KEY, AZURE_OPENAI_KEY, BROWSER_USE_API_KEY, GOOGLE_API_KEY, GROQ_API_KEY, MODELSCOPE_API_KEY, OPENAI_API_KEY, SECRET_KEY | - |
| 16-deploying-scalable-agents | - | AZURE_SEARCH_API_KEY | - |
| 17-creating-local-ai-agents | - | - | - |
| 18-securing-ai-agents | - | - | - |

### Source-to-sink matrix (personal data → work destinations)

| Agent | Personal source | Work sink |
|---|---|---|
| 15-browser-use | gmail (microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:647) | slack (microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:539) |
| 15-browser-use | gmail (microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:647) | discord (microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:326) |
| 15-browser-use | gmail (microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:647) | generic_webhook (microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:530) |
| 15-browser-use | personal_calendar_contacts (microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:3202) | slack (microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:539) |
| 15-browser-use | personal_calendar_contacts (microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:3202) | discord (microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:326) |
| 15-browser-use | personal_calendar_contacts (microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:3202) | generic_webhook (microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:530) |

## 2. Human-in-the-loop gate map

| Agent | Action | Where | Approval | Dry-run | Rate limit | Domain allowlist |
|---|---|---|---|---|---|---|
| 02-explore-agentic-frameworks | `book_flight` | microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/README.md:82 | **no** | **no** | yes | **no** |
| 04-tool-use | `book_flight` | microsoft__ai-agents-for-beginners/04-tool-use/code_samples/04-python-agent-framework.ipynb:166 | **no** | **no** | yes | **no** |
| 07-planning-design | `book_flight` | microsoft__ai-agents-for-beginners/07-planning-design/code_samples/07-python-agent-framework.ipynb:109 | **no** | **no** | **no** | **no** |
| 07-planning-design | `book_activity` | microsoft__ai-agents-for-beginners/07-planning-design/code_samples/07-python-agent-framework.ipynb:130 | **no** | **no** | **no** | **no** |
| 11-agentic-protocols | `delete_tokens` | microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/client/utils.py:109 | **no** | **no** | **no** | yes |
| 15-browser-use | `.fill(` | microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1396 | **no** | **no** | yes | **no** |
| 15-browser-use | `.click(` | microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1449 | **no** | **no** | yes | **no** |
| 15-browser-use | `.press(` | microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1454 | **no** | **no** | yes | **no** |
| 16-deploying-scalable-agents | `refund_needs_approval` | microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb:99 | **no** | **no** | yes | **no** |
| 16-deploying-scalable-agents | `issue_refund` | microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb:105 | **no** | **no** | yes | **no** |
| 18-securing-ai-agents | `sign_receipt` | microsoft__ai-agents-for-beginners/18-securing-ai-agents/code_samples/18-signed-receipts.ipynb:107 | **no** | **no** | yes | **no** |
| 18-securing-ai-agents | `sign_receipt` | microsoft__ai-agents-for-beginners/18-securing-ai-agents/code_samples/human-authorization-receipts.ipynb:64 | **no** | **no** | yes | **no** |
| 18-securing-ai-agents | `sign_receipt` | microsoft__ai-agents-for-beginners/18-securing-ai-agents/code_samples/sample_receipts/generate_fixtures.py:36 | **no** | **no** | yes | **no** |

## 3. AI inventory

- Providers: openai, azure_openai, ollama_local, mistral, cohere, anthropic, google_gemini, aws_bedrock, groq, openrouter
- Frameworks/SDKs: langchain, autogen, langgraph, mcp
- Models: `gpt-5`, `GPT-5`, `gpt-5.1`, `gpt-5.2`, `gpt-4.1`, `o4-mini`, `o1`, `o3-mini`, `o3`, `GPT-5-mini`, `gpt-5-mini`, `gpt-5-nano`, `Llama-3.1`, `GPT-4`, `O3`, `GPT-4.1`, `O4`, `gpt-4.1-mini`, `llama4`, `gemini-flash-latest`, `claude-sonnet-4-0`, `claude-3-5-sonnet-20240620-v1`, `llama-4-maverick-17b-128e-instruct`, `llama3.1`, `gemini-api-key-here`, `gemini-flash-lite-latest`, `gpt-4o`, `gpt-4o-mini`, `gpt-5.x`

## STE (Simplified Technical English) style

_Style checks inspired by ASD-STE100 writing rules. Not a certified ASD-STE100 checker; no specification text or dictionary is included._

- microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md: 183 sentences, 54 findings
- microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md: 87 sentences, 14 findings
- microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/test-migration.md: 17 sentences, 5 findings
- microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md: 58 sentences, 29 findings
- microsoft__ai-agents-for-beginners/.agents/skills/deploying-scalable-agents/SKILL.md: 68 sentences, 13 findings
- microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt: 181 sentences, 49 findings
- microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/SKILL.md: 49 sentences, 6 findings
- microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/references/experiment-patterns.md: 7 sentences, 0 findings
- microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/references/notebook-structure.md: 10 sentences, 1 findings
- microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/references/quality-checklist.md: 10 sentences, 4 findings
- microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/references/tutorial-patterns.md: 6 sentences, 1 findings
- microsoft__ai-agents-for-beginners/.agents/skills/local-ai-agents/SKILL.md: 54 sentences, 15 findings
- microsoft__ai-agents-for-beginners/.agents/skills/microsoft-docs/SKILL.md: 28 sentences, 7 findings
- microsoft__ai-agents-for-beginners/.agents/skills/testing-course-samples/SKILL.md: 42 sentences, 10 findings
- microsoft__ai-agents-for-beginners/.github/agents/dotnet-notebook-migration.agent.md: 49 sentences, 14 findings
- microsoft__ai-agents-for-beginners/.github/prompts/git-cherrypicking.prompt.md: 11 sentences, 3 findings
- microsoft__ai-agents-for-beginners/.github/workflows/smoke-test.yml: 2 sentences, 1 findings
- microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md: 71 sentences, 22 findings
- microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.md: 28 sentences, 4 findings
- microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md: 47 sentences, 21 findings
- microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.md: 38 sentences, 6 findings
- microsoft__ai-agents-for-beginners/03-agentic-design-patterns/code_samples/03-dotnet-agent-framework.md: 64 sentences, 5 findings
- microsoft__ai-agents-for-beginners/04-tool-use/code_samples/04-dotnet-agent-framework.md: 37 sentences, 4 findings
- microsoft__ai-agents-for-beginners/05-agentic-rag/code_samples/05-dotnet-agent-framework.md: 96 sentences, 15 findings
- microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md: 70 sentences, 38 findings
- microsoft__ai-agents-for-beginners/07-planning-design/code_samples/07-dotnet-agent-framework.md: 28 sentences, 9 findings
- microsoft__ai-agents-for-beginners/08-multi-agent/README.md: 145 sentences, 87 findings
- microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/08-dotnet-agent-framework.md: 30 sentences, 8 findings
- microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md: 92 sentences, 54 findings
- microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md: 56 sentences, 13 findings
- microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md: 69 sentences, 15 findings
- microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md: 85 sentences, 18 findings
- microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md: 101 sentences, 24 findings
- microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution-quiz.md: 6 sentences, 8 findings
- microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution.md: 16 sentences, 11 findings
- microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md: 125 sentences, 84 findings
- microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md: 105 sentences, 86 findings
- microsoft__ai-agents-for-beginners/12-context-engineering/code_samples/vacation_agent_scratchpad.md: 5 sentences, 0 findings
- microsoft__ai-agents-for-beginners/13-agent-memory/README.md: 96 sentences, 70 findings
- microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md: 127 sentences, 69 findings
- microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md: 180 sentences, 82 findings
- microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md: 144 sentences, 64 findings
- microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md: 219 sentences, 124 findings
- microsoft__ai-agents-for-beginners/18-securing-ai-agents/code_samples/requirements.txt: 2 sentences, 0 findings
- microsoft__ai-agents-for-beginners/18-securing-ai-agents/code_samples/sample_receipts/README.md: 23 sentences, 9 findings
- microsoft__ai-agents-for-beginners/AGENTS.md: 152 sentences, 39 findings
- microsoft__ai-agents-for-beginners/tests/lesson-01-smoke-tests.json: 9 sentences, 1 findings
- microsoft__ai-agents-for-beginners/tests/lesson-04-smoke-tests.json: 7 sentences, 1 findings
- microsoft__ai-agents-for-beginners/tests/lesson-05-smoke-tests.json: 10 sentences, 1 findings
- microsoft__ai-agents-for-beginners/tests/lesson-16-smoke-tests.json: 15 sentences, 4 findings

## Document-wide prompt-injection scan (ADSF)

_Regex and Unicode checks over every file. It flags suspicious content; a clean result does not prove a file is safe._

143 files scanned, 39 findings.

## Standards map (maps to, not compliance)

✅ covered by a check · 🟡 partly · ⬜ not checked. Numbers = findings in this scan that map to the item.

### Anthropic / Claude agent guidance (summarized)

_Practices summarized from Anthropic's public docs and engineering posts on building and securing agents._ (7 ✅ · 1 🟡 · 0 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| AN-CONFIRM Ask a human before consequential or irreversible actions | ✅ | 78 (28 high) | Gate map |
| AN-LEASTPRIV Least-privilege tools and credentials | ✅ | 29 (4 high) | Shared tokens, reach, wildcards |
| AN-UNTRUSTED Treat tool results and web/doc content as untrusted (prompt injection) | ✅ | 40 (19 high) | Injection scan |
| AN-SANDBOX Run in a sandbox / isolated environment | 🟡 | 15 (15 high) | Real browser profile use |
| AN-PROMPT Clear system prompt with explicit constraints | ✅ | 1247 | Deny-list check, STE clarity |
| AN-EVALS Build evaluations with test cases | ✅ | - | Generates functional + security eval sets (not run) |
| AN-LIMITS Limit cost and steps | ✅ | 41 | Caps and budgets |
| AN-OBSERVE Log and monitor agent actions | ✅ | 14 | Tracing |

### Microsoft Copilot Studio governance areas (summarized)

_Areas summarized from Microsoft's public documentation. This tool scans exported agent files/configs only; it does not read your tenant._ (2 ✅ · 5 🟡 · 2 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| CS-DLP Data policies for connectors | 🟡 | 1 (1 high) | Source-to-sink reach in exported configs |
| CS-AUTH Agent authentication | 🟡 | 3 (3 high) | Credentials in files |
| CS-SHARE Maker permissions and sharing | ⬜ | - | Not checked (tenant setting) |
| CS-ENV Environment strategy (dev/test/prod) | ⬜ | - | Not checked |
| CS-AUDIT Audit logging and monitoring | 🟡 | 14 | Tracing references |
| CS-KNOW Knowledge sources for generative answers | 🟡 | 39 (19 high) | Injection scan over knowledge files you point it at |
| CS-MOD Content moderation and instructions | 🟡 | 59 (28 high) | Prompt checks |
| CS-HANDOFF Escalation / human handoff | ✅ | 1 | Handoff rules and transcripts |
| CS-ACTIONS Actions and flows that change data | ✅ | 78 (28 high) | Gate map |

### CSA AI Controls Matrix (AICM) domains

_Domain names only._ (3 ✅ · 9 🟡 · 6 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| A&A Audit & Assurance | 🟡 | - | Audit memo + SARIF |
| AIS Application & Interface Security | 🟡 | 117 (47 high) | Gates, injection |
| BCR Business Continuity & Operational Resilience | 🟡 | - | Single-LLM fallback |
| CCC Change Control & Configuration | 🟡 | 28 | Pinning, review record |
| CEK Cryptography, Encryption & Key Management | 🟡 | - | Hardcoded keys |
| DCS Datacenter Security | ⬜ | - | Not checked |
| DSP Data Security & Privacy Lifecycle | ✅ | 6 (4 high) | PII, secrets, data paths |
| GRC Governance, Risk & Compliance | 🟡 | - | Owner, inventory |
| HRS Human Resources | ⬜ | - | Not checked |
| IAM Identity & Access Management | ✅ | 19 (19 high) | Shared credentials, scopes, profiles |
| IPY Interoperability & Portability | ⬜ | - | Not checked |
| I&S Infrastructure Security | ⬜ | - | Not checked |
| LOG Logging & Monitoring | ✅ | 15 | Tracing, observability gaps |
| MDS Model Security | 🟡 | 67 (19 high) | Injection, pinning |
| SEF Security Incident Management & Forensics | ⬜ | - | Not checked |
| STA Supply Chain, Transparency & Accountability | 🟡 | 123 | Inventory, disclosure |
| TVM Threat & Vulnerability Management | 🟡 | 117 (47 high) | Static findings |
| UEM Universal Endpoint Management | ⬜ | - | Not checked |

### EU AI Act basics (selected articles)

_Selected articles for orientation. Not legal advice; maps to, not compliant with._ (3 ✅ · 4 🟡 · 2 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| Art.4 AI literacy | ⬜ | - | Not checked |
| Art.5 Prohibited practices | ⬜ | - | Not checked |
| Art.9 Risk management system (high-risk) | 🟡 | - | Audit memo is an input |
| Art.10 Data and data governance | 🟡 | 1 | Personal data in agent files |
| Art.12 Record-keeping (logging) | ✅ | 15 | Tracing/logging checks |
| Art.13 Transparency and information to deployers | 🟡 | - | Owner docs |
| Art.14 Human oversight | ✅ | 79 (28 high) | Approval gates, handoff |
| Art.15 Accuracy, robustness and cybersecurity | 🟡 | 40 (19 high) | Injection, secrets, grounding |
| Art.50 Transparency: tell people they are talking to AI | ✅ | 1 | Bot disclosure checks |

### ISO/IEC 42001:2023 Annex A control areas

_Annex A area names only (the standard text is copyrighted and not included). Maps to, not compliant with._ (2 ✅ · 6 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| A.2 Policies related to AI | ⬜ | - | Not checked |
| A.3 Internal organization (roles, responsibilities) | 🟡 | - | Owner/maintainer recorded |
| A.4 Resources for AI systems (inventory of tools, data, compute) | ✅ | 128 (4 high) | AI and connector inventory |
| A.5 Assessing impacts of AI systems | 🟡 | - | Audit memo is a starting input |
| A.6 AI system life cycle (verification, deployment, operation, monitoring) | 🟡 | 43 | Tracing, pinning; generated eval sets |
| A.7 Data for AI systems | 🟡 | 2 (1 high) | Personal data reach |
| A.8 Information for interested parties | 🟡 | 1 | Bot disclosure |
| A.9 Use of AI systems (responsible use, human oversight) | ✅ | 79 (28 high) | Approval gates, handoff rules |
| A.10 Third-party and customer relationships | 🟡 | 122 | Provider inventory |

### MITRE ATLAS (selected techniques)

_Selected agent techniques; IDs/names per ATLAS data (via framework-pitch research)._ (9 ✅ · 4 🟡 · 0 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| AML.T0051 LLM Prompt Injection (direct and indirect) | ✅ | 40 (19 high) | Injection scan + untrusted-input rules + eval cases |
| AML.T0054 LLM Jailbreak | 🟡 | - | Obeyed overrides in transcripts; jailbreak eval cases |
| AML.T0056 LLM Meta Prompt Extraction | ✅ | - | Secrets in prompts, leaks in transcripts |
| AML.T0057 LLM Data Leakage | ✅ | 6 (4 high) | Personal-to-work paths, other customers' data |
| AML.T0053 AI Agent Tool Invocation | ✅ | 81 (31 high) | Tool gates and credential sharing |
| AML.T0034 Cost Harvesting | ✅ | 24 | Caps and budgets |
| AML.T0029 Denial of ML Service | 🟡 | 31 | Timeouts and step caps |
| AML.T0055 Unsecured Credentials | ✅ | - | Hardcoded secrets |
| AML.T0010 ML Supply Chain Compromise | 🟡 | 28 | Pinning only |
| AML.T0083 Credentials from AI Agent Configuration | ✅ | - | Secrets in agent/MCP configs, .env present |
| AML.T0086 Exfiltration via AI Agent Tool Invocation | ✅ | 2 (2 high) | Source-to-sink paths, hardcoded webhooks, exfil instructions/links in docs |
| AML.T0101 Data Destruction via AI Agent Tool Invocation | ✅ | 10 (10 high) | Ungated delete/drop/destroy/purge tools |
| AML.T0100 AI Agent Clickbait | 🟡 | 28 (3 high) | Browser writes, shorteners, allowlists |

### NIST AI RMF 1.0 (functions) + Generative AI Profile (NIST AI 600-1) risks

_Function names from AI RMF 1.0; risk names from the GenAI Profile. This tool supports a few outcomes; it does not implement the framework._ (4 ✅ · 6 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| GOVERN Govern: policies, accountability, oversight | 🟡 | - | Owner and review records; AI inventory |
| MAP Map: context, components, third parties | ✅ | 128 (4 high) | AI inventory (providers, SDKs, models), connector inventory and source-to-sink map |
| MEASURE Measure: test and evaluate | 🟡 | 15 | Generates eval sets (functional + security) from the source; does not run them |
| MANAGE Manage: prioritize and respond to risks | 🟡 | - | P0–P2 audit memo and SARIF for CI; no incident workflow |
| GAI-Confabulation GenAI risk: Confabulation | 🟡 | 1 | Grounding rule checks |
| GAI-DataPrivacy GenAI risk: Data Privacy | ✅ | 6 (4 high) | PII, secrets, personal-to-work paths |
| GAI-HumanAI GenAI risk: Human-AI Configuration | ✅ | 80 (28 high) | Approval gates, disclosure, handoff |
| GAI-InfoIntegrity GenAI risk: Information Integrity | 🟡 | - | FAQ grounding; STE information-loss compare |
| GAI-InfoSecurity GenAI risk: Information Security | ✅ | 39 (19 high) | Injection scan, secrets, token lifting |
| GAI-ValueChain GenAI risk: Value Chain and Component Integration | 🟡 | 28 | Provider/SDK/model inventory and pinning |
| GAI-Harmful GenAI risks: CBRN, violent/hateful, obscene, bias, IP, environmental | ⬜ | - | Not checked |

### OWASP Top 10 for Agentic Applications 2026 (ASI01–ASI10)

_Item names as listed in the OWASP GenAI Security Project document (via framework-pitch research)._ (3 ✅ · 6 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| ASI01 Agent Goal Hijack | ✅ | 65 (19 high) | ADSF injection scan over all docs, untrusted-input rule, deny-list check |
| ASI02 Tool Misuse and Exploitation | ✅ | 78 (28 high) | Gate map, rate limits, allowlists, wildcard domains, URL shorteners |
| ASI03 Identity and Privilege Abuse | ✅ | 19 (19 high) | Shared credentials, scopes, browser profiles, cookie reads |
| ASI04 Agentic Supply Chain Vulnerabilities | 🟡 | 28 | MCP/provider inventory, unpinned models; no registry integrity check |
| ASI05 Unexpected Code Execution | 🟡 | - | Free-form shell/exec/SQL tools |
| ASI06 Memory and Context Poisoning | 🟡 | 39 (19 high) | ADSF scan of knowledge/memory files you point it at; no runtime memory check |
| ASI07 Insecure Inter-Agent Communication | ⬜ | - | Not checked |
| ASI08 Cascading Failures | 🟡 | 48 | Step, loop and retry caps, timeouts, single-provider fallback |
| ASI09 Human-Agent Trust Exploitation | 🟡 | 1 | Bot disclosure, human claims, unrecorded handoffs |
| ASI10 Rogue Agents | 🟡 | 15 | Tracing, owner, observability; no stop-switch check |

### OWASP Agentic AI – Threats and Mitigations (T1–T15)

_Threat names from the OWASP Agentic Security Initiative taxonomy._ (5 ✅ · 7 🟡 · 3 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| T1 Memory Poisoning | 🟡 | 39 (19 high) | Hidden instructions in files an agent may load as memory/knowledge |
| T2 Tool Misuse | ✅ | 78 (28 high) | Gate map: approval, dry-run, rate limit, allowlist per tool |
| T3 Privilege Compromise | ✅ | 19 (19 high) | Shared tokens, broad reach, real browser profiles, cookie reads |
| T4 Resource Overload | ✅ | 55 | Caps, timeouts, loops, budgets |
| T5 Cascading Hallucination Attacks | 🟡 | 1 | Grounding rules only |
| T6 Intent Breaking & Goal Manipulation | ✅ | 40 (19 high) | Injection scan, untrusted-input rule, obeyed overrides |
| T7 Misaligned & Deceptive Behaviors | 🟡 | 1 | Bot-disclosure / human-persona checks |
| T8 Repudiation & Untraceability | ✅ | 15 | Tracing and logging checks |
| T9 Identity Spoofing & Impersonation | 🟡 | 3 (3 high) | Shared credentials; claims to be human |
| T10 Overwhelming Human in the Loop | ⬜ | - | Not checked |
| T11 Unexpected RCE and Code Attacks | 🟡 | - | Shell/exec/SQL tools fed by model output |
| T12 Agent Communication Poisoning | 🟡 | 39 (19 high) | Injection patterns in shared files only; no runtime message checks |
| T13 Rogue Agents in Multi-Agent Systems | ⬜ | - | Not checked |
| T14 Human Attacks on Multi-Agent Systems | ⬜ | - | Not checked |
| T15 Human Manipulation | 🟡 | 1 | Persona, unsafe advice |

### OWASP Top 10 for LLM Applications 2025

_Item names from the OWASP 2025 list. Status = what this tool checks statically, not whether your app is safe._ (5 ✅ · 4 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| LLM01 Prompt Injection | ✅ | 65 (19 high) | Document-wide injection scan (ADSF tab), untrusted-input rule in prompts, obeyed overrides in transcripts, injection eval cases |
| LLM02 Sensitive Information Disclosure | ✅ | 6 (4 high) | Secrets/PII in files, personal-to-work source-to-sink paths, confidential text in prompts, leaks in transcripts |
| LLM03 Supply Chain | 🟡 | 28 | Model pinning and SDK inventory only; no dependency or model-provenance scan |
| LLM04 Data and Model Poisoning | 🟡 | 39 (19 high) | Poisoned instructions hidden in docs/knowledge files; no training-data checks |
| LLM05 Improper Output Handling | 🟡 | 10 (10 high) | Shell/SQL/exec tools and ungated actions that consume model output; no taint tracking |
| LLM06 Excessive Agency | ✅ | 82 (32 high) | Gate map for irreversible tools and browser actions, shared credentials, scopes |
| LLM07 System Prompt Leakage | ✅ | - | Secrets and internal notes in prompts; leaked prompt text in transcripts |
| LLM08 Vector and Embedding Weaknesses | ⬜ | - | Not checked |
| LLM09 Misinformation | 🟡 | 1223 | 'I don't know' rule, made-up prices/policies vs your FAQ; STE clarity checks |
| LLM10 Unbounded Consumption | ✅ | 72 | Token caps, timeouts, retry/step caps, infinite loops, budget alerts, bill smells |


## Generated eval sets

6 functional and 67 security test cases in `evals/` (JSONL + README.md). Generated from the source; not run.

## 4. Findings (P0 = fix before real traffic)

### Personal-to-work data crossover

- **P0** `crossover.shared_credential` (across agents) — Credential AZURE_OPENAI_API_KEY is used by 3 agents: microsoft__ai-agents-for-beginners, 04-tool-use, 15-browser-use. They are not really separate agents if they share connections. Give each its own scoped token. (`AZURE_OPENAI_API_KEY`)
- **P0** `crossover.shared_credential` (across agents) — Credential AZURE_SEARCH_API_KEY is used by 2 agents: 11-agentic-protocols, 16-deploying-scalable-agents. They are not really separate agents if they share connections. Give each its own scoped token. (`AZURE_SEARCH_API_KEY`)
- **P0** `crossover.shared_credential` (across agents) — Credential OPENAI_API_KEY is used by 2 agents: 14-microsoft-agent-framework, 15-browser-use. They are not really separate agents if they share connections. Give each its own scoped token. (`OPENAI_API_KEY`)
- **P0** `crossover.source_to_sink` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:539 — Agent '15-browser-use' can read personal sources (gmail, personal_calendar_contacts) and write to work sinks (slack, discord, generic_webhook). Split the connections, scope tokens read-only, and allowlist output channels. (`15-browser-use`)
- **P2** `crossover.slack_channel_id` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:576 — Work channel hardcoded as an output target. Check it can't be confused with a personal chat. (`credential`)
- **P2** `crossover.pii.email_address` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:4241 — Possible personal data (email_address) in agent code, prompt or fixture. (`user…om (masked)`)

### Irreversible actions

- **P0** `actions.irreversible_tool` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/README.md:82 — Irreversible tool book_flight has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def book_flight(date: str, location: str) -> str:`)
- **P0** `actions.irreversible_tool` microsoft__ai-agents-for-beginners/04-tool-use/code_samples/04-python-agent-framework.ipynb:166 — Irreversible tool book_flight has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (notebook cell 13, line 2) (`def book_flight(`)
- **P0** `actions.irreversible_tool` microsoft__ai-agents-for-beginners/07-planning-design/code_samples/07-python-agent-framework.ipynb:109 — Irreversible tool book_flight has no approval gate or dry-run mode. Add a human confirm step before it runs. (notebook cell 11, line 2) (`def book_flight(`)
- **P0** `actions.irreversible_tool` microsoft__ai-agents-for-beginners/07-planning-design/code_samples/07-python-agent-framework.ipynb:130 — Irreversible tool book_activity has no approval gate or dry-run mode. Add a human confirm step before it runs. (notebook cell 11, line 23) (`def book_activity(`)
- **P0** `actions.irreversible_tool` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/client/utils.py:109 — Irreversible tool delete_tokens has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def delete_tokens(self) -> bool:`)
- **P0** `actions.browser_profile` microsoft__ai-agents-for-beginners/15-browser-use/15-browser-user.ipynb:616 — Uses a real browser profile, so the agent acts with your logged-in sessions. (notebook cell 20, line 11) (`user_data_dir`)
- **P0** `actions.browser_profile` microsoft__ai-agents-for-beginners/15-browser-use/15-browser-user.ipynb:650 — Uses a real browser profile, so the agent acts with your logged-in sessions. (notebook cell 20, line 45) (`user-data-dir`)
- **P0** `actions.browser_profile` microsoft__ai-agents-for-beginners/15-browser-use/15-browser-user.ipynb:650 — Uses a real browser profile, so the agent acts with your logged-in sessions. (notebook cell 20, line 45) (`user_data_dir`)
- **P0** `actions.browser_write` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1396 — Browser write action .fill( has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`await email_input.fill("your-username")`)
- **P0** `actions.browser_write` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1449 — Browser write action .click( has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`await elements[0].click()`)
- **P0** `actions.browser_write` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1454 — Browser write action .press( has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`await page.press("Enter")`)
- **P0** `actions.browser_profile` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:2070 — Uses a real browser profile, so the agent acts with your logged-in sessions. (`user_data_dir`)
- **P0** `actions.browser_profile` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:2192 — Uses a real browser profile, so the agent acts with your logged-in sessions. (`user_data_dir`)
- **P0** `actions.browser_profile` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:2192 — Uses a real browser profile, so the agent acts with your logged-in sessions. (`Library/Application Support/Google/Chrome`)
- **P0** `actions.browser_profile` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:2210 — Uses a real browser profile, so the agent acts with your logged-in sessions. (`user_data_dir`)
- **P0** `actions.browser_profile` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:2218 — Uses a real browser profile, so the agent acts with your logged-in sessions. (`user_data_dir`)
- **P0** `actions.browser_profile` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:2218 — Uses a real browser profile, so the agent acts with your logged-in sessions. (`Library/Application Support/Google/Chrome`)
- **P0** `actions.browser_profile` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:2222 — Uses a real browser profile, so the agent acts with your logged-in sessions. (`user_data_dir`)
- **P0** `actions.browser_profile` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:2226 — Uses a real browser profile, so the agent acts with your logged-in sessions. (`user_data_dir`)
- **P0** `actions.browser_profile` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:3728 — Uses a real browser profile, so the agent acts with your logged-in sessions. (`user_data_dir`)
- **P0** `actions.browser_profile` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:3839 — Uses a real browser profile, so the agent acts with your logged-in sessions. (`user_data_dir`)
- **P0** `actions.browser_profile` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:3871 — Uses a real browser profile, so the agent acts with your logged-in sessions. (`user-data-dir`)
- **P0** `actions.browser_profile` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:3871 — Uses a real browser profile, so the agent acts with your logged-in sessions. (`user_data_dir`)
- **P0** `actions.irreversible_tool` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb:99 — Irreversible tool refund_needs_approval has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (notebook cell 6, line 34) (`def refund_needs_approval(amount: float) -> bool:`)
- **P0** `actions.irreversible_tool` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb:105 — Irreversible tool issue_refund has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (notebook cell 6, line 40) (`def issue_refund(`)
- **P0** `actions.irreversible_tool` microsoft__ai-agents-for-beginners/18-securing-ai-agents/code_samples/18-signed-receipts.ipynb:107 — Irreversible tool sign_receipt has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (notebook cell 12, line 1) (`def sign_receipt(payload: dict, signing_key: signing.SigningKey, verify_key) -> dict:`)
- **P0** `actions.irreversible_tool` microsoft__ai-agents-for-beginners/18-securing-ai-agents/code_samples/human-authorization-receipts.ipynb:64 — Irreversible tool sign_receipt has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (notebook cell 6, line 13) (`def sign_receipt(payload: dict, sk: SigningKey, key_id: str) -> dict:`)
- **P0** `actions.irreversible_tool` microsoft__ai-agents-for-beginners/18-securing-ai-agents/code_samples/sample_receipts/generate_fixtures.py:36 — Irreversible tool sign_receipt has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`def sign_receipt(payload: dict, signing_key, verify_key) -> dict:`)
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/scripts/detect_legacy.py:98 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/.github/agents/dotnet-notebook-migration.agent.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/.github/dependabot.yml:7 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/00-course-setup/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/03-agentic-design-patterns/code_samples/03-dotnet-agent-framework.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/03-agentic-design-patterns/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/04-tool-use/code_samples/04-dotnet-agent-framework.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/04-tool-use/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/05-agentic-rag/code_samples/05-python-agent-framework.ipynb:87 — Wildcard domain or host permission. (notebook cell 8, line 19) (`"**{destination}**: {info}"`)
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/07-planning-design/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/08-python-agent-framework.ipynb:76 — Wildcard domain or host permission. (notebook cell 9, line 14) (`'*50}"`)
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/08-python-agent-framework.ipynb:78 — Wildcard domain or host permission. (notebook cell 9, line 16) (`'*50}"`)
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/08-python-agent-framework.ipynb:109 — Wildcard domain or host permission. (notebook cell 11, line 20) (`'*50}"`)
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/08-python-agent-framework.ipynb:111 — Wildcard domain or host permission. (notebook cell 11, line 22) (`'*50}"`)
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/10-ai-agents-production/code_samples/10-expense_claim-demo.ipynb:216 — Wildcard domain or host permission. (notebook cell 15, line 29) (`'*50}"`)
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/10-ai-agents-production/code_samples/10-expense_claim-demo.ipynb:218 — Wildcard domain or host permission. (notebook cell 15, line 31) (`'*50}"`)
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/11-a2a-agent-framework.ipynb:110 — Wildcard domain or host permission. (notebook cell 10, line 18) (`'*50}"`)
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/11-a2a-agent-framework.ipynb:112 — Wildcard domain or host permission. (notebook cell 10, line 20) (`'*50}"`)
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/github-mcp/app.py:361 — Wildcard domain or host permission. (`"**{author}**: "`)
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/github-mcp/app.py:365 — Wildcard domain or host permission. (`"**{author}**: {update.text}"`)
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/12-context-engineering/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/12-context-engineering/README.md:115 — Wildcard domain or host permission. (`"**

• A simple  agent using only prompt engineering might just respond: **"`)
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/12-context-engineering/README.md:147 — Wildcard domain or host permission. (`"** the agent gets bogged down in the old, irrelevant details and keeps asking a`)
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/12-context-engineering/README.md:157 — Wildcard domain or host permission. (`"** Due to the sheer number of tools, the agent gets confused and attempts to ca`)
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/12-context-engineering/README.md:167 — Wildcard domain or host permission. (`"** Later in the conversation, you change your mind and say, **"`)
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:147 — Wildcard domain or host permission. (`"**. This separate agent observes the main conversation between the user and the`)
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/code-samples/14-human-loop.ipynb:744 — Wildcard domain or host permission. (notebook cell 21, line 52) (`'*60}"`)
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/code-samples/14-human-loop.ipynb:746 — Wildcard domain or host permission. (notebook cell 21, line 54) (`'*60}"`)
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:2054 — Wildcard domain or host permission. (`'*.example.com'`)
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:2058 — Wildcard domain or host permission. (`'*.google.com'`)
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:2061 — Wildcard domain or host permission. (`'*.gambling-site.net'`)
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:2656 — Wildcard domain or host permission. (`'*.example.com'`)
- **P1** `actions.wildcard_domain` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:4179 — Wildcard domain or host permission. (`allowed_domains=['*`)
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/SECURITY.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.no_deny_list` microsoft__ai-agents-for-beginners/STUDY_GUIDE.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.

### Governance + cost

- **P1** `governance.no_recursion_cap` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:55 — [microsoft__ai-agents-for-beginners] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:55 — [microsoft__ai-agents-for-beginners] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_max_tokens` microsoft__ai-agents-for-beginners/00-course-setup/AzureSearch.md:1 — [00-course-setup] No max_tokens / output cap set on model calls.
- **P1** `governance.no_timeout` microsoft__ai-agents-for-beginners/00-course-setup/AzureSearch.md:1 — [00-course-setup] No timeout on model or tool calls.
- **P1** `governance.no_recursion_cap` microsoft__ai-agents-for-beginners/00-course-setup/AzureSearch.md:1 — [00-course-setup] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` microsoft__ai-agents-for-beginners/00-course-setup/AzureSearch.md:1 — [00-course-setup] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_tracing` microsoft__ai-agents-for-beginners/00-course-setup/AzureSearch.md:1 — [00-course-setup] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_max_tokens` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:1 — [01-intro-to-ai-agents] No max_tokens / output cap set on model calls.
- **P1** `governance.no_timeout` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:1 — [01-intro-to-ai-agents] No timeout on model or tool calls.
- **P1** `governance.no_recursion_cap` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:1 — [01-intro-to-ai-agents] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:1 — [01-intro-to-ai-agents] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_tracing` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:1 — [01-intro-to-ai-agents] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_max_tokens` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/README.md:1 — [02-explore-agentic-frameworks] No max_tokens / output cap set on model calls.
- **P1** `governance.no_timeout` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/README.md:1 — [02-explore-agentic-frameworks] No timeout on model or tool calls.
- **P1** `governance.no_recursion_cap` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/README.md:1 — [02-explore-agentic-frameworks] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/README.md:1 — [02-explore-agentic-frameworks] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_tracing` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/README.md:1 — [02-explore-agentic-frameworks] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_max_tokens` microsoft__ai-agents-for-beginners/03-agentic-design-patterns/README.md:1 — [03-agentic-design-patterns] No max_tokens / output cap set on model calls.
- **P1** `governance.no_timeout` microsoft__ai-agents-for-beginners/03-agentic-design-patterns/README.md:1 — [03-agentic-design-patterns] No timeout on model or tool calls.
- **P1** `governance.no_recursion_cap` microsoft__ai-agents-for-beginners/03-agentic-design-patterns/README.md:1 — [03-agentic-design-patterns] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_tracing` microsoft__ai-agents-for-beginners/03-agentic-design-patterns/README.md:1 — [03-agentic-design-patterns] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_max_tokens` microsoft__ai-agents-for-beginners/04-tool-use/README.md:116 — [04-tool-use] No max_tokens / output cap set on model calls.
- **P1** `governance.no_timeout` microsoft__ai-agents-for-beginners/04-tool-use/README.md:116 — [04-tool-use] No timeout on model or tool calls.
- **P1** `governance.no_recursion_cap` microsoft__ai-agents-for-beginners/04-tool-use/README.md:116 — [04-tool-use] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` microsoft__ai-agents-for-beginners/04-tool-use/README.md:116 — [04-tool-use] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_tracing` microsoft__ai-agents-for-beginners/04-tool-use/README.md:116 — [04-tool-use] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_max_tokens` microsoft__ai-agents-for-beginners/05-agentic-rag/README.md:1 — [05-agentic-rag] No max_tokens / output cap set on model calls.
- **P1** `governance.no_timeout` microsoft__ai-agents-for-beginners/05-agentic-rag/README.md:1 — [05-agentic-rag] No timeout on model or tool calls.
- **P1** `governance.no_recursion_cap` microsoft__ai-agents-for-beginners/05-agentic-rag/README.md:1 — [05-agentic-rag] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_tracing` microsoft__ai-agents-for-beginners/05-agentic-rag/README.md:1 — [05-agentic-rag] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_timeout` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb:229 — [06-building-trustworthy-agents] No timeout on model or tool calls. (notebook cell 8, line 23)
- **P1** `governance.no_recursion_cap` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb:229 — [06-building-trustworthy-agents] No step / iteration / recursion cap for the agent loop. (notebook cell 8, line 23)
- **P1** `governance.no_budget` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb:229 — [06-building-trustworthy-agents] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here. (notebook cell 8, line 23)
- **P1** `governance.no_tracing` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb:229 — [06-building-trustworthy-agents] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost. (notebook cell 8, line 23)
- **P1** `governance.no_max_tokens` microsoft__ai-agents-for-beginners/07-planning-design/README.md:1 — [07-planning-design] No max_tokens / output cap set on model calls.
- **P1** `governance.no_timeout` microsoft__ai-agents-for-beginners/07-planning-design/README.md:1 — [07-planning-design] No timeout on model or tool calls.
- **P1** `governance.no_recursion_cap` microsoft__ai-agents-for-beginners/07-planning-design/README.md:1 — [07-planning-design] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_tracing` microsoft__ai-agents-for-beginners/07-planning-design/README.md:1 — [07-planning-design] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_max_tokens` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:1 — [08-multi-agent] No max_tokens / output cap set on model calls.
- **P1** `governance.no_recursion_cap` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:1 — [08-multi-agent] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_timeout` microsoft__ai-agents-for-beginners/09-metacognition/README.md:1 — [09-metacognition] No timeout on model or tool calls.
- **P1** `governance.no_recursion_cap` microsoft__ai-agents-for-beginners/09-metacognition/README.md:1 — [09-metacognition] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_tracing` microsoft__ai-agents-for-beginners/09-metacognition/README.md:1 — [09-metacognition] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_timeout` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:1 — [10-ai-agents-production] No timeout on model or tool calls.
- **P1** `governance.no_recursion_cap` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:1 — [10-ai-agents-production] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:1 — [10-ai-agents-production] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_recursion_cap` microsoft__ai-agents-for-beginners/11-agentic-protocols/README.md:1 — [11-agentic-protocols] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_tracing` microsoft__ai-agents-for-beginners/11-agentic-protocols/README.md:1 — [11-agentic-protocols] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_max_tokens` microsoft__ai-agents-for-beginners/12-context-engineering/README.md:1 — [12-context-engineering] No max_tokens / output cap set on model calls.
- **P1** `governance.no_timeout` microsoft__ai-agents-for-beginners/12-context-engineering/README.md:1 — [12-context-engineering] No timeout on model or tool calls.
- **P1** `governance.no_recursion_cap` microsoft__ai-agents-for-beginners/12-context-engineering/README.md:1 — [12-context-engineering] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_tracing` microsoft__ai-agents-for-beginners/12-context-engineering/README.md:1 — [12-context-engineering] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_max_tokens` microsoft__ai-agents-for-beginners/13-agent-memory/13-agent-memory-cognee.ipynb:1 — [13-agent-memory] No max_tokens / output cap set on model calls. (notebook cell 1, line 1)
- **P1** `governance.no_timeout` microsoft__ai-agents-for-beginners/13-agent-memory/13-agent-memory-cognee.ipynb:1 — [13-agent-memory] No timeout on model or tool calls. (notebook cell 1, line 1)
- **P1** `governance.no_recursion_cap` microsoft__ai-agents-for-beginners/13-agent-memory/13-agent-memory-cognee.ipynb:1 — [13-agent-memory] No step / iteration / recursion cap for the agent loop. (notebook cell 1, line 1)
- **P1** `governance.no_tracing` microsoft__ai-agents-for-beginners/13-agent-memory/13-agent-memory-cognee.ipynb:1 — [13-agent-memory] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost. (notebook cell 1, line 1)
- **P1** `governance.no_recursion_cap` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:402 — [14-microsoft-agent-framework] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:402 — [14-microsoft-agent-framework] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_max_tokens` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1389 — [15-browser-use] No max_tokens / output cap set on model calls.
- **P1** `governance.no_budget` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1389 — [15-browser-use] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_tracing` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1389 — [15-browser-use] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_max_tokens` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:1 — [16-deploying-scalable-agents] No max_tokens / output cap set on model calls.
- **P1** `governance.no_timeout` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:1 — [16-deploying-scalable-agents] No timeout on model or tool calls.
- **P1** `governance.no_recursion_cap` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:1 — [16-deploying-scalable-agents] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:1 — [16-deploying-scalable-agents] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_max_tokens` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb:52 — [17-creating-local-ai-agents] No max_tokens / output cap set on model calls. (notebook cell 6, line 2)
- **P1** `governance.no_timeout` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb:52 — [17-creating-local-ai-agents] No timeout on model or tool calls. (notebook cell 6, line 2)
- **P1** `governance.no_budget` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb:52 — [17-creating-local-ai-agents] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here. (notebook cell 6, line 2)
- **P1** `governance.no_tracing` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb:52 — [17-creating-local-ai-agents] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost. (notebook cell 6, line 2)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md:466 — Model 'o4-mini' is not pinned to a dated version, so behavior and price can change under you. (`o4-mini`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:36 — Model 'o1' is not pinned to a dated version, so behavior and price can change under you. (`o1`)
- **P2** `governance.expensive_model` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:36 — Premium model 'o1'. Check it isn't used for simple routing or classification calls. (`o1`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:36 — Model 'o3-mini' is not pinned to a dated version, so behavior and price can change under you. (`o3-mini`)
- **P2** `governance.expensive_model` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:36 — Premium model 'o3-mini'. Check it isn't used for simple routing or classification calls. (`o3-mini`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:36 — Model 'o3' is not pinned to a dated version, so behavior and price can change under you. (`o3`)
- **P2** `governance.expensive_model` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:36 — Premium model 'o3'. Check it isn't used for simple routing or classification calls. (`o3`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:60 — Model 'GPT-5-mini' is not pinned to a dated version, so behavior and price can change under you. (`GPT-5-mini`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:10 — Model 'gpt-5' is not pinned to a dated version, so behavior and price can change under you. (`gpt-5`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:33 — Model 'GPT-5' is not pinned to a dated version, so behavior and price can change under you. (`GPT-5`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:78 — Model 'gpt-5.1' is not pinned to a dated version, so behavior and price can change under you. (`gpt-5.1`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:78 — Model 'gpt-5.2' is not pinned to a dated version, so behavior and price can change under you. (`gpt-5.2`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:88 — Model 'gpt-4.1' is not pinned to a dated version, so behavior and price can change under you. (`gpt-4.1`)
- **P2** `governance.expensive_model` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:88 — Premium model 'gpt-4.1'. Check it isn't used for simple routing or classification calls. (`gpt-4.1`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/.agents/skills/testing-course-samples/SKILL.md:28 — Model 'gpt-5-mini' is not pinned to a dated version, so behavior and price can change under you. (`gpt-5-mini`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/.env.example:12 — Model 'gpt-5-nano' is not pinned to a dated version, so behavior and price can change under you. (`gpt-5-nano`)
- **P2** `governance.no_retry_cap` microsoft__ai-agents-for-beginners/00-course-setup/AzureSearch.md:1 — [00-course-setup] No explicit retry limit or backoff.
- **P2** `governance.no_retry_cap` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:1 — [01-intro-to-ai-agents] No explicit retry limit or backoff.
- **P2** `governance.no_retry_cap` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/README.md:1 — [02-explore-agentic-frameworks] No explicit retry limit or backoff.
- **P2** `governance.no_retry_cap` microsoft__ai-agents-for-beginners/03-agentic-design-patterns/README.md:1 — [03-agentic-design-patterns] No explicit retry limit or backoff.
- **P2** `governance.no_retry_cap` microsoft__ai-agents-for-beginners/04-tool-use/README.md:116 — [04-tool-use] No explicit retry limit or backoff.
- **P2** `governance.no_retry_cap` microsoft__ai-agents-for-beginners/05-agentic-rag/README.md:1 — [05-agentic-rag] No explicit retry limit or backoff.
- **P2** `governance.no_retry_cap` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb:229 — [06-building-trustworthy-agents] No explicit retry limit or backoff. (notebook cell 8, line 23)
- **P2** `governance.no_retry_cap` microsoft__ai-agents-for-beginners/07-planning-design/README.md:1 — [07-planning-design] No explicit retry limit or backoff.
- **P2** `governance.no_retry_cap` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:1 — [08-multi-agent] No explicit retry limit or backoff.
- **P2** `governance.no_retry_cap` microsoft__ai-agents-for-beginners/09-metacognition/README.md:1 — [09-metacognition] No explicit retry limit or backoff.
- **P2** `governance.no_retry_cap` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:1 — [10-ai-agents-production] No explicit retry limit or backoff.
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/github-mcp/event-descriptions.md:38 — Model 'Llama-3.1' is not pinned to a dated version, so behavior and price can change under you. (`Llama-3.1`)
- **P2** `governance.no_retry_cap` microsoft__ai-agents-for-beginners/11-agentic-protocols/README.md:1 — [11-agentic-protocols] No explicit retry limit or backoff.
- **P2** `governance.no_retry_cap` microsoft__ai-agents-for-beginners/12-context-engineering/README.md:1 — [12-context-engineering] No explicit retry limit or backoff.
- **P2** `governance.no_retry_cap` microsoft__ai-agents-for-beginners/13-agent-memory/13-agent-memory-cognee.ipynb:1 — [13-agent-memory] No explicit retry limit or backoff. (notebook cell 1, line 1)
- **P2** `governance.no_retry_cap` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:402 — [14-microsoft-agent-framework] No explicit retry limit or backoff.
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/15-browser-use/15-browser-user.ipynb:46 — Model 'GPT-4' is not pinned to a dated version, so behavior and price can change under you. (notebook cell 2, line 29) (`GPT-4`)
- **P2** `governance.expensive_model` microsoft__ai-agents-for-beginners/15-browser-use/15-browser-user.ipynb:46 — Premium model 'GPT-4'. Check it isn't used for simple routing or classification calls. (notebook cell 2, line 29) (`GPT-4`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:934 — Model 'O3' is not pinned to a dated version, so behavior and price can change under you. (`O3`)
- **P2** `governance.expensive_model` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:934 — Premium model 'O3'. Check it isn't used for simple routing or classification calls. (`O3`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:940 — Model 'GPT-4.1' is not pinned to a dated version, so behavior and price can change under you. (`GPT-4.1`)
- **P2** `governance.expensive_model` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:940 — Premium model 'GPT-4.1'. Check it isn't used for simple routing or classification calls. (`GPT-4.1`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:942 — Model 'O4' is not pinned to a dated version, so behavior and price can change under you. (`O4`)
- **P2** `governance.no_retry_cap` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1389 — [15-browser-use] No explicit retry limit or backoff.
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1597 — Model 'gpt-4.1-mini' is not pinned to a dated version, so behavior and price can change under you. (`gpt-4.1-mini`)
- **P2** `governance.expensive_model` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1597 — Premium model 'gpt-4.1-mini'. Check it isn't used for simple routing or classification calls. (`gpt-4.1-mini`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1754 — Model 'llama4' is not pinned to a dated version, so behavior and price can change under you. (`llama4`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1755 — Model 'gemini-flash-latest' is not pinned to a dated version, so behavior and price can change under you. (`gemini-flash-latest`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1795 — Model 'claude-sonnet-4-0' is not pinned to a dated version, so behavior and price can change under you. (`claude-sonnet-4-0`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1927 — Model 'llama-4-maverick-17b-128e-instruct' is not pinned to a dated version, so behavior and price can change under you. (`llama-4-maverick-17b-128e-instruct`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1945 — Model 'llama3.1' is not pinned to a dated version, so behavior and price can change under you. (`llama3.1`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:3229 — Model 'gemini-api-key-here' is not pinned to a dated version, so behavior and price can change under you. (`gemini-api-key-here`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:3628 — Model 'gemini-flash-lite-latest' is not pinned to a dated version, so behavior and price can change under you. (`gemini-flash-lite-latest`)
- **P2** `governance.no_retry_cap` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb:52 — [17-creating-local-ai-agents] No explicit retry limit or backoff. (notebook cell 6, line 2)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/CHANGELOG.md:43 — Model 'gpt-4o' is not pinned to a dated version, so behavior and price can change under you. (`gpt-4o`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/CHANGELOG.md:43 — Model 'gpt-4o-mini' is not pinned to a dated version, so behavior and price can change under you. (`gpt-4o-mini`)
- **P2** `governance.unpinned_model` microsoft__ai-agents-for-beginners/CHANGELOG.md:100 — Model 'gpt-5.x' is not pinned to a dated version, so behavior and price can change under you. (`gpt-5.x`)

### Agent Health Checker + Labs tools

- **P0** `health.retries_backoff` microsoft__ai-agents-for-beginners/tests/lesson-01-smoke-tests.json — Retries / backoff: No retry or backoff configuration detected.
- **P0** `health.tracing_hooks` microsoft__ai-agents-for-beginners/tests/lesson-01-smoke-tests.json — Tracing hooks (Langfuse / OTel): No tracing / observability hooks detected (Langfuse, OTel, callbacks, etc.).
- **P0** `health.retries_backoff` microsoft__ai-agents-for-beginners/tests/lesson-04-smoke-tests.json — Retries / backoff: No retry or backoff configuration detected.
- **P0** `health.tracing_hooks` microsoft__ai-agents-for-beginners/tests/lesson-04-smoke-tests.json — Tracing hooks (Langfuse / OTel): No tracing / observability hooks detected (Langfuse, OTel, callbacks, etc.).
- **P0** `health.retries_backoff` microsoft__ai-agents-for-beginners/tests/lesson-05-smoke-tests.json — Retries / backoff: No retry or backoff configuration detected.
- **P0** `health.tracing_hooks` microsoft__ai-agents-for-beginners/tests/lesson-05-smoke-tests.json — Tracing hooks (Langfuse / OTel): No tracing / observability hooks detected (Langfuse, OTel, callbacks, etc.).
- **P0** `health.retries_backoff` microsoft__ai-agents-for-beginners/tests/lesson-16-smoke-tests.json — Retries / backoff: No retry or backoff configuration detected.
- **P0** `health.tracing_hooks` microsoft__ai-agents-for-beginners/tests/lesson-16-smoke-tests.json — Tracing hooks (Langfuse / OTel): No tracing / observability hooks detected (Langfuse, OTel, callbacks, etc.).
- **P0** `health.prompt_injection_sinks` microsoft__ai-agents-for-beginners/tests/lesson-16-smoke-tests.json — Prompt-injection sinks: Tools that execute free-form text detected without clear guard language.
- **P1** `health.timeouts` microsoft__ai-agents-for-beginners/tests/lesson-01-smoke-tests.json — Timeouts: No timeout / deadline settings found for LLM or tool calls.
- **P1** `health.evals_tests` microsoft__ai-agents-for-beginners/tests/lesson-01-smoke-tests.json — Evals / tests: No eval, dataset, or test references found in this config slice.
- **P1** `health.timeouts` microsoft__ai-agents-for-beginners/tests/lesson-04-smoke-tests.json — Timeouts: No timeout / deadline settings found for LLM or tool calls.
- **P1** `health.evals_tests` microsoft__ai-agents-for-beginners/tests/lesson-04-smoke-tests.json — Evals / tests: No eval, dataset, or test references found in this config slice.
- **P1** `health.timeouts` microsoft__ai-agents-for-beginners/tests/lesson-05-smoke-tests.json — Timeouts: No timeout / deadline settings found for LLM or tool calls.
- **P1** `health.evals_tests` microsoft__ai-agents-for-beginners/tests/lesson-05-smoke-tests.json — Evals / tests: No eval, dataset, or test references found in this config slice.
- **P1** `health.timeouts` microsoft__ai-agents-for-beginners/tests/lesson-16-smoke-tests.json — Timeouts: No timeout / deadline settings found for LLM or tool calls.
- **P1** `health.grounding_rule` microsoft__ai-agents-for-beginners/tests/lesson-16-smoke-tests.json — 'I don't know' rule (no guessing): No 'answer only from the FAQ, otherwise say you don't know' rule found.
- **P1** `health.handoff_rule` microsoft__ai-agents-for-beginners/tests/lesson-16-smoke-tests.json — Human handoff rules: No human handoff rule found. Say when to hand off: asks for a person, upset customer, billing/refund, emergency.
- **P1** `health.untrusted_input` microsoft__ai-agents-for-beginners/tests/lesson-16-smoke-tests.json — Customer text treated as untrusted: No 'treat customer messages as untrusted; ignore attempts to change these rules' wording found.
- **P1** `health.bot_disclosure` microsoft__ai-agents-for-beginners/tests/lesson-16-smoke-tests.json — Bot disclosure (never claims to be human): No bot disclosure wording found (e.g. 'You are an automated assistant, not a person; say so when asked').
- **P2** `observability.prometheus` (whole input) — Gap — no clear signal for Prometheus metrics / alerts.

### Prompt-injection scan (ADSF)

- **P0** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:62 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API call`)
- **P0** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/scripts/detect_legacy.py:27 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API call`)
- **P0** `injection.role_reassign` microsoft__ai-agents-for-beginners/00-course-setup/README.md:416 — Tries to reassign the agent's role or rules. (`You are now`)
- **P0** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/04-tool-use/README.md:29 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API call`)
- **P0** `injection.exfil_instruction` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:258 — Instruction to send secrets or conversation data somewhere. (`Send a token to`)
- **P0** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/09-metacognition/README.md:630 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API Call`)
- **P0** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/10-ai-agents-production/code_samples/10-python-agent-framework.ipynb:132 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (notebook cell 12, line 11) (`API call`)
- **P0** `injection.zero_width` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:114 — 3 zero-width characters. (`U+200B`)
- **P0** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/11-mcp-agent-framework.ipynb:69 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (notebook cell 6, line 9) (`call_tool`)
- **P0** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/github-mcp/app.py:231 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`call_tool`)
- **P0** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/github-mcp/app.py:260 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`call_tool`)
- **P0** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/server/server.py:87 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`call_tool`)
- **P0** `injection.templated_url` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:783 — URL with a template slot for the agent to fill in. (`https://api.browser-use.com/api/v1/task/{{ $('Webhook').item.json.body.payload.session_id }}`)
- **P0** `injection.fake_system` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1552 — Fake system/assistant marker inside content. (`### System`)
- **P0** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:1785 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (`API call`)
- **P0** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb:163 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (notebook cell 13, line 2) (`"function": {
        "name"`)
- **P0** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb:167 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (notebook cell 13, line 6) (`"function": {
        "name"`)
- **P0** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb:172 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (notebook cell 13, line 11) (`"function": {
        "name"`)
- **P0** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb:177 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (notebook cell 13, line 16) (`"function": {
        "name"`)
- **P1** `injection.css_hidden` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:42 — CSS that hides text from people but not from an agent. (`font-size: 0`)
- **P1** `injection.css_hidden` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:78 — CSS that hides text from people but not from an agent. (`font-size: 0`)
- **P1** `injection.css_hidden` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:119 — CSS that hides text from people but not from an agent. (`font-size: 0`)
- **P1** `injection.css_hidden` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:159 — CSS that hides text from people but not from an agent. (`font-size: 0`)
- **P1** `injection.css_hidden` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:444 — CSS that hides text from people but not from an agent. (`font-size: 0`)
- **P1** `injection.css_hidden` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/code-samples/14-concurrent.ipynb:202 — CSS that hides text from people but not from an agent. (notebook cell 13, line 21) (`opacity: 0`)
- **P1** `injection.css_hidden` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/code-samples/14-concurrent.ipynb:402 — CSS that hides text from people but not from an agent. (notebook cell 17, line 65) (`opacity: 0`)
- **P1** `injection.css_hidden` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/code-samples/14-concurrent.ipynb:407 — CSS that hides text from people but not from an agent. (notebook cell 17, line 70) (`opacity: 0`)
- **P1** `injection.css_hidden` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/code-samples/14-concurrent.ipynb:413 — CSS that hides text from people but not from an agent. (notebook cell 17, line 76) (`opacity: 0`)
- **P1** `injection.css_hidden` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/code-samples/14-sequential.ipynb:168 — CSS that hides text from people but not from an agent. (notebook cell 11, line 24) (`opacity: 0`)
- **P1** `injection.css_hidden` microsoft__ai-agents-for-beginners/15-browser-use/15-browser-user.ipynb:713 — CSS that hides text from people but not from an agent. (notebook cell 20, line 108) (`opacity: 0`)
- **P2** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md:537 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (inside a docs code block: lowered) (`"function": {"name"`)
- **P2** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md:545 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (inside a docs code block: lowered) (`"function": {"name"`)
- **P2** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:7 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (inside a docs code block: lowered) (`"function": {"name"`)
- **P2** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:73 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (inside a docs code block: lowered) (`"function": {"name"`)
- **P2** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:317 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (inside a docs code block: lowered) (`"function": {"name"`)
- **P2** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/04-tool-use/README.md:115 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (inside a docs code block: lowered) (`API call`)
- **P2** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/04-tool-use/README.md:184 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (inside a docs code block: lowered) (`API call`)
- **P2** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:2553 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (inside a docs code block: lowered) (`call_tool`)
- **P2** `injection.llmail_tool_call_syntax` microsoft__ai-agents-for-beginners/15-browser-use/llms.txt:2560 — Text spells out a tool or API call (e.g. send_email) for the agent to run. Common LLMail-Inject attack shape. (inside a docs code block: lowered) (`call_tool`)

### Simplified Technical English (STE)

- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md:252 — Descriptive sentence has 30 words (limit 25). Split it. (`When streaming in a web app, wrap the async iteration in CODE and yield errors as JSON so the frontend can display them gracefully (e.g., rate limits, transient`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md:533 — Descriptive sentence has 28 words (limit 25). Split it. (`When the model asks to call a tool, execute it in your app and include the tool result in the next request as a CODE item within CODE.`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:55 — Passive voice. Say who does the action (active voice). (`is not specified`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:55 — Passive voice. Say who does the action (active voice). (`is set`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:58 — Passive voice. Say who does the action (active voice). (`is not supported`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:64 — Passive voice. Say who does the action (active voice). (`is passed`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:65 — Descriptive sentence has 30 words (limit 25). Split it. (`**Snapshot / golden files**: If the test suite uses snapshot testing, **all** snapshot files containing Chat Completions streaming shapes (CODE, CODE, CODE, etc`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:77 — Descriptive sentence has 31 words (limit 25). Split it. (`**Function call IDs have specific prefixes**: When providing few-shot CODE items in CODE, the CODE field must start with CODE and the CODE field must start with`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:77 — Passive voice. Say who does the action (active voice). (`is rejected`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:79 — Descriptive sentence has 27 words (limit 25). Split it. (`Code that directly accesses CODE will raise CODE at runtime — this is easy to miss in migration since it only surfaces when the content filter actually triggers`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:80 — Passive voice. Say who does the action (active voice). (`is dropped`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:166 — Descriptive sentence has 39 words (limit 25). Split it. (`> **The Responses API is a server-side concern.** Migrate your Python backend; the frontend's HTTP contract should stay unchanged unless your backend is a thin `)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:170 — Passive voice. Say who does the action (active voice). (`is deprecated`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:210 — Passive voice. Say who does the action (active voice). (`are deprecated`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:318 — Descriptive sentence has 26 words (limit 25). Split it. (`**Tool round-trips**: when the model returns function calls, append CODE items to the conversation (not a manual CODE dict), then append CODE items for each res`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:335 — Passive voice. Say who does the action (active voice). (`is required`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:405 — Descriptive sentence has 26 words (limit 25). Split it. (`[ ] **Tool-call loop**: if tools are used, the model issues tool calls, the app executes them, and the follow-up request returns a final CODE (no infinite loop)`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:405 — Passive voice. Say who does the action (active voice). (`are used`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:406 — Passive voice. Say who does the action (active voice). (`was used`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:16 — Passive voice. Say who does the action (active voice). (`are controlled`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:37 — Passive voice. Say who does the action (active voice). (`is included`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:38 — Passive voice. Say who does the action (active voice). (`is provided`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:41 — Passive voice. Say who does the action (active voice). (`is based`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:57 — Passive voice. Say who does the action (active voice). (`are managed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:59 — Passive voice. Say who does the action (active voice). (`is conspicuously marked`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:63 — Passive voice. Say who does the action (active voice). (`been received`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:79 — Passive voice. Say who does the action (active voice). (`are necessarily infringed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:81 — Passive voice. Say who does the action (active voice). (`was submitted`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:87 — Passive voice. Say who does the action (active voice). (`is filed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:120 — Passive voice. Say who does the action (active voice). (`be construed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:163 — Passive voice. Say who does the action (active voice). (`been advised`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:185 — Passive voice. Say who does the action (active voice). (`be included`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:198 — Passive voice. Say who does the action (active voice). (`is distributed`)
- **P1** `ste.multiple_instructions` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/references/quality-checklist.md:9 — More than one instruction in one sentence. Write one instruction per sentence. (`Use headings and short bullets, and avoid long paragraphs.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/references/tutorial-patterns.md:5 — Descriptive sentence has 28 words (limit 25). Split it. (`Audience, prerequisites, and learning goals: say who it is for, list what they should already know, and state what they will be able to do by the end.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/SKILL.md:3 — Descriptive sentence has 35 words (limit 25). Split it. (`description: "Use when the user asks to create, scaffold, or edit Jupyter notebooks (CODE) for experiments, explorations, or tutorials; prefer the bundled templ`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/local-ai-agents/SKILL.md:47 — Passive voice. Say who does the action (active voice). (`are trained`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/local-ai-agents/SKILL.md:66 — Passive voice. Say who does the action (active voice). (`is not required`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/.agents/skills/local-ai-agents/SKILL.md:94 — Procedural sentence has 22 words (limit 20). Split it. (`Do not send code or data to the cloud when the learner's stated goal is privacy/offline — keep the whole pipeline local.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/.agents/skills/microsoft-docs/SKILL.md:14 — Procedural sentence has 21 words (limit 20). Split it. (`Use these tools for **everything on learn.microsoft.com** — Azure, .NET, M365, Power Platform, Agent Framework, Semantic Kernel, Windows, and more.`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/microsoft-docs/SKILL.md:22 — Passive voice. Say who does the action (active voice). (`are truncated`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/.agents/skills/microsoft-docs/SKILL.md:72 — Descriptive sentence has 34 words (limit 25). Split it. (`Agent Framework tutorials are on learn.microsoft.com (use CODE), but the **GitHub repo** has API-level detail that is often ahead of published docs — particular`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/.agents/skills/testing-course-samples/SKILL.md:3 — Descriptive sentence has 30 words (limit 25). Split it. (`Covers environment setup (.env, az login, packages), the scripts/validate-notebooks.ps1 runner, interpreting PASS/FAIL results, and which lessons need extra res`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/testing-course-samples/SKILL.md:53 — Passive voice. Say who does the action (active voice). (`are retried`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/testing-course-samples/SKILL.md:57 — Passive voice. Say who does the action (active voice). (`is exhausted`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/testing-course-samples/SKILL.md:61 — Passive voice. Say who does the action (active voice). (`is shown`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.agents/skills/testing-course-samples/SKILL.md:63 — Passive voice. Say who does the action (active voice). (`is bounded`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/.github/agents/dotnet-notebook-migration.agent.md:12 — Passive voice. Say who does the action (active voice). (`is detected`)
- **P1** `ste.multiple_instructions` microsoft__ai-agents-for-beginners/.github/agents/dotnet-notebook-migration.agent.md:46 — More than one instruction in one sentence. Write one instruction per sentence. (`Add the shebang CODE at the top of the .cs file and make it executable (if on Linux/Unix/MacOS).`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:9 — Descriptive sentence has 28 words (limit 25). Split it. (`Come say hi in the <a href="URL target="_blank">Azure AI Discord Community</a> — it's full of learners and AI builders who are happy to answer questions.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:11 — Procedural sentence has 24 words (limit 20). Split it. (`Before we jump into building, let's make sure we actually understand what an AI Agent *is* and when it makes sense to use one.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:39 — Descriptive sentence has 29 words (limit 25). Split it. (`> **AI Agents are systems that let Large Language Models (LLMs) actually *do things* — by giving them tools and knowledge to act on the world, not just respond `)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:62 — Passive voice. Say who does the action (active voice). (`are built`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:106 — Passive voice. Say who does the action (active voice). (`is structured`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:138 — Descriptive sentence has 32 words (limit 25). Split it. (`Once you learn to deploy agents in [Lesson 16](../16-deploying-scalable-agents/README.md), you can add a fast post-deploy health check for this lesson's CODE wi`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:14 — Passive voice. Say who does the action (active voice). (`was formerly known`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:17 — Procedural sentence has 29 words (limit 20). Split it. (`When your project is created, close any tips that are displayed and review the project page in the Microsoft Foundry portal, which should look similar to the fo`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:17 — Passive voice. Say who does the action (active voice). (`is created`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:17 — Passive voice. Say who does the action (active voice). (`are displayed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:38 — Passive voice. Say who does the action (active voice). (`is selected`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:73 — Passive voice. Say who does the action (active voice). (`be displayed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:83 — Passive voice. Say who does the action (active voice). (`being used`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:92 — Procedural sentence has 23 words (limit 20). Split it. (`Open the [Azure portal](URL and view the contents of the resource group where you deployed the hub resources used in this exercise.`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:20 — Passive voice. Say who does the action (active voice). (`are properly managed`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:29 — Descriptive sentence has 26 words (limit 25). Split it. (`If you have ever built an AI application using Large Language Models (LLMs), you know the importance of designing a robust system prompt or system message.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:31 — Descriptive sentence has 28 words (limit 25). Split it. (`For AI Agents, the system prompt is even more important as the AI Agents will need highly specific instructions to complete the tasks we have designed for them.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:118 — Descriptive sentence has 29 words (limit 25). Split it. (`The value of this system message framework is to be able to scale creating system messages from multiple agents easier as well as improving your system messages`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:118 — Descriptive sentence has 28 words (limit 25). Split it. (`Being able to make small tweaks and improvements by changing the basic system message and running it through the system will allow you to compare and evaluate r`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:130 — Passive voice. Say who does the action (active voice). (`are processed`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:130 — Descriptive sentence has 27 words (limit 25). Split it. (`Since these attacks typically require frequent interaction with the Agent, limiting the number of turns in a conversation is another way to prevent these types `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:134 — Descriptive sentence has 26 words (limit 25). Split it. (`**Description**: If an AI agent has access to systems and services that store sensitive data, attackers can compromise the communication between the agent and t`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:140 — Descriptive sentence has 29 words (limit 25). Split it. (`Attackers can use this ability to attack these services by sending a high volume of requests through the AI Agent, which may result in system failures or high c`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:146 — Descriptive sentence has 26 words (limit 25). Split it. (`**Description:** This type of attack does not target the AI agent directly but targets the knowledge base and other services that the AI agent will use.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:146 — Descriptive sentence has 27 words (limit 25). Split it. (`This could involve corrupting the data or information that the AI agent will use to complete a task, leading to biased or unintended responses to the user.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:152 — Descriptive sentence has 29 words (limit 25). Split it. (`Errors caused by attackers can lead to failures of other systems that the AI agent is connected to, causing the attack to become more widespread and harder to t`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:152 — Passive voice. Say who does the action (active voice). (`is connected`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:154 — Descriptive sentence has 30 words (limit 25). Split it. (`**Mitigation**: One method to avoid this is to have the AI Agent operate in a limited environment, such as performing tasks in a Docker container, to prevent di`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:162 — Passive voice. Say who does the action (active voice). (`is implemented`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:193 — Descriptive sentence has 26 words (limit 25). Split it. (`As AI continues to evolve, maintaining a proactive stance on security, privacy, and ethical considerations will be key to fostering trust and reliability in AI-`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/07-planning-design/code_samples/07-dotnet-agent-framework.md:87 — Passive voice. Say who does the action (active voice). (`is configured`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/07-planning-design/code_samples/07-dotnet-agent-framework.md:117 — Descriptive sentence has 35 words (limit 25). Split it. (`When you run the agent with a travel planning request, it will analyze the request and generate a structured plan with appropriate task assignments to specializ`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md:5 — Descriptive sentence has 27 words (limit 25). Split it. (`You'll learn how to build sophisticated, step-by-step processing pipelines where agents execute in a specific order, with each stage building upon the results o`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md:171 — Passive voice. Say who does the action (active voice). (`are collected`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:319 — Passive voice. Say who does the action (active voice). (`is preserved`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:3 — Descriptive sentence has 32 words (limit 25). Split it. (`We will explore the core concepts of multi-agent systems, dive into the architecture of the framework's Workflow component, and walk through practical examples `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:7 — Descriptive sentence has 26 words (limit 25). Split it. (`A multi-agent system involves several of these agents collaborating to solve a problem that would be difficult or impossible for a single agent to handle alone.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:11 — Descriptive sentence has 32 words (limit 25). Split it. (`**Complex Problem Solving**: Breaking down a large task (e.g., planning a company-wide event) into smaller sub-tasks handled by specialized agents (e.g., a budg`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:20 — Passive voice. Say who does the action (active voice). (`are aggregated`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:25 — Passive voice. Say who does the action (active voice). (`is built`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:29 — Passive voice. Say who does the action (active voice). (`is composed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:31 — Passive voice. Say who does the action (active voice). (`are automatically invoked`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:33 — Passive voice. Say who does the action (active voice). (`are processed`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:37 — Descriptive sentence has 26 words (limit 25). Split it. (`This structure allows for building robust and scalable applications using fundamental patterns like sequential chains, fan-out/fan-in for parallel processing, a`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:45 — Passive voice. Say who does the action (active voice). (`is passed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:86 — Passive voice. Say who does the action (active voice). (`is used`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:86 — Passive voice. Say who does the action (active voice). (`is set`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:86 — Passive voice. Say who does the action (active voice). (`is created`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:94 — Passive voice. Say who does the action (active voice). (`is executed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:108 — Passive voice. Say who does the action (active voice). (`are defined`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:122 — Descriptive sentence has 27 words (limit 25). Split it. (`The agents are created using an CODE (Responses API), and then the CODE defines the sequential flow by adding an edge from the CODE to the CODE.`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:122 — Passive voice. Say who does the action (active voice). (`are created`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:139 — Passive voice. Say who does the action (active voice). (`are streamed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:157 — Passive voice. Say who does the action (active voice). (`are defined`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:157 — Passive voice. Say who does the action (active voice). (`is constructed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:171 — Passive voice. Say who does the action (active voice). (`is generated`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:191 — Passive voice. Say who does the action (active voice). (`are created`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:208 — Passive voice. Say who does the action (active voice). (`is constructed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:208 — Passive voice. Say who does the action (active voice). (`is captured`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:212 — Passive voice. Say who does the action (active voice). (`is used`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:218 — Passive voice. Say who does the action (active voice). (`is sent`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:221 — Passive voice. Say who does the action (active voice). (`are collected`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:242 — Passive voice. Say who does the action (active voice). (`are collected`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:246 — Passive voice. Say who does the action (active voice). (`are created`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:305 — Passive voice. Say who does the action (active voice). (`is approved`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:309 — Passive voice. Say who does the action (active voice). (`is passed`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:341 — Descriptive sentence has 26 words (limit 25). Split it. (`Custom executors like CODE are used to parse the JSON output from the agents and convert it into strongly-typed objects that the selection function can inspect.`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:341 — Passive voice. Say who does the action (active voice). (`are used`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:345 — Passive voice. Say who does the action (active voice). (`is defined`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:368 — Descriptive sentence has 26 words (limit 25). Split it. (`Whether your application requires simple sequential processing, parallel execution, or dynamic conditional logic, the framework offers the tools to build powerf`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:30 — Passive voice. Say who does the action (active voice). (`is widely used`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:37 — Descriptive sentence has 28 words (limit 25). Split it. (`**Complex tasks**: Complex tasks, like large workloads, can be broken down into smaller subtasks and assigned to different agents, each specializing in a specif`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:44 — Descriptive sentence has 30 words (limit 25). Split it. (`Lack of specialization in a single agent means you have an agent that can do everything but might get confused on what to do when faced with a complex task.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:50 — Descriptive sentence has 31 words (limit 25). Split it. (`The mom-and-pop store would have a single agent handling all aspects of the trip booking process, while the franchise would have different agents handling diffe`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:58 — Descriptive sentence has 34 words (limit 25). Split it. (`What this means concretely is that the agent for finding flights needs to communicate with the agent for booking hotels to ensure that the hotel is booked for t`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:58 — Passive voice. Say who does the action (active voice). (`is booked`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:58 — Descriptive sentence has 31 words (limit 25). Split it. (`That means that the agents need to share information about the user's travel dates, meaning that you need to decide *which agents are sharing info and how they `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:59 — Descriptive sentence has 28 words (limit 25). Split it. (`A user preference could be that they want a hotel close to the airport whereas a constraint could be that rental cars are only available at the airport.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:59 — Descriptive sentence has 28 words (limit 25). Split it. (`This means that the agent for booking hotels needs to coordinate with the agent for booking rental cars to ensure that the user's preferences and constraints ar`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:60 — Descriptive sentence has 33 words (limit 25). Split it. (`Examples of how an agent learns and improves could be that the agent for finding flights could use a machine learning model to recommend flights to the user bas`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:63 — Descriptive sentence has 28 words (limit 25). Split it. (`**Human in the loop**: In most cases, you will have a human in the loop and you need to instruct the agents when to ask for human intervention.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:63 — Descriptive sentence has 32 words (limit 25). Split it. (`This could be in the form of a user asking for a specific hotel or flight that the agents have not recommended or asking for confirmation before booking a fligh`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:69 — Descriptive sentence has 34 words (limit 25). Split it. (`For example, in the case of booking a trip for a user, you could have a dashboard that shows the status of each agent, the user's preferences and constraints, a`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:69 — Descriptive sentence has 32 words (limit 25). Split it. (`This dashboard could show the user's travel dates, the flights recommended by the flight agent, the hotels recommended by the hotel agent, and the rental cars r`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:69 — Descriptive sentence has 26 words (limit 25). Split it. (`This would give you a clear view of how the agents are interacting with each other and whether the user's preferences and constraints are being met.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:73 — Descriptive sentence has 28 words (limit 25). Split it. (`A log entry could store information on the agent that took the action, the action taken, the time the action was taken, and the outcome of the action.`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:73 — Passive voice. Say who does the action (active voice). (`was taken`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:73 — Passive voice. Say who does the action (active voice). (`be used`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:77 — Descriptive sentence has 31 words (limit 25). Split it. (`For example, you could track the time taken to complete a task, the number of tasks completed per unit of time, and the accuracy of the recommendations made by `)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:87 — Passive voice. Say who does the action (active voice). (`are exchanged`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:89 — Descriptive sentence has 27 words (limit 25). Split it. (`This pattern can be implemented using a centralized architecture where all messages are routed through a central server, or a decentralized architecture where m`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:89 — Passive voice. Say who does the action (active voice). (`are routed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:89 — Passive voice. Say who does the action (active voice). (`are exchanged`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:99 — Descriptive sentence has 27 words (limit 25). Split it. (`In this pattern, each agent represents a task or a step in a workflow, and agents can hand off tasks to other agents based on predefined rules.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:107 — Descriptive sentence has 26 words (limit 25). Split it. (`Why you would want multiple agents to collaborate is because each agent can have different expertise and can contribute to the recommendation process in differe`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:119 — Descriptive sentence has 47 words (limit 25). Split it. (`Consider a scenario where a customer is trying to get a refund for a product, there can be quite a few agents involved in this process but let's divide it up be`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:140 — Passive voice. Say who does the action (active voice). (`being carried`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:146 — Descriptive sentence has 29 words (limit 25). Split it. (`There's quite a few agents listed previously both for the specific refund process but also for the general agents that can be used in other parts of your busine`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:182 — Descriptive sentence has 50 words (limit 25). Split it. (`In this lesson, we've looked at the multi-agent design pattern, including the scenarios where multi-agents are applicable, the advantages of using multi-agents `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution-quiz.md:5 — Procedural sentence has 23 words (limit 20). Split it. (`**Answer: A2.** Multiple agents are useful when a task has distinct specialist roles, separate tools or permissions, and clear handoffs that need coordination.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution-quiz.md:9 — Procedural sentence has 24 words (limit 20). Split it. (`**Answer: A1.** A single agent is usually easier to test, observe, and operate when one set of instructions and tools can handle the task.`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution.md:10 — Passive voice. Say who does the action (active voice). (`being carried`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:5 — Descriptive sentence has 26 words (limit 25). Split it. (`As AI agents move from experimental prototypes to real-world applications, the ability to understand their behavior, monitor their performance, and systematical`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:30 — Descriptive sentence has 27 words (limit 25). Split it. (`Without observability, an AI agent can feel like a "black box" - its internal state and reasoning are opaque, making it difficult to diagnose issues or optimize`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:36 — Descriptive sentence has 26 words (limit 25). Split it. (`**Debugging and Root-Cause Analysis**: When an agent fails or produces an unexpected output, observability tools provide the traces needed to pinpoint the sourc`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:37 — Passive voice. Say who does the action (active voice). (`are billed`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:39 — Descriptive sentence has 26 words (limit 25). Split it. (`By monitoring how agents perform in the real world, teams can identify areas for improvement, gather data for fine-tuning models, and validate the impact of cha`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:47 — Descriptive sentence has 26 words (limit 25). Split it. (`For example, an agent that takes 20 seconds for all model calls could be accelerated by using a faster model or by running model calls in parallel.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:49 — Descriptive sentence has 36 words (limit 25). Split it. (`For instance, if an agent calls an LLM five times for marginal quality improvement, you must assess if the cost is justified or if you could reduce the number o`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:49 — Passive voice. Say who does the action (active voice). (`is justified`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:61 — Descriptive sentence has 31 words (limit 25). Split it. (`In this chapters [example notebook](./code_samples/10-expense_claim-demo.ipynb), we'll show you how these metrics looks in real examples but first, we'll learn `)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:84 — Passive voice. Say who does the action (active voice). (`is needed`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:100 — Descriptive sentence has 31 words (limit 25). Split it. (`Observability gives us metrics, but evaluation is the process of analyzing that data (and performing tests) to determine how well an AI agent is performing and `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:102 — Descriptive sentence has 38 words (limit 25). Split it. (`Regular evaluation is important because AI agents are often non-deterministic and can evolve (through updates or drifting model behavior) – without evaluation, `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:114 — Descriptive sentence has 33 words (limit 25). Split it. (`The key challenge with offline eval is ensuring your test dataset is comprehensive and stays relevant – the agent might perform well on a fixed test set but enc`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:122 — Descriptive sentence has 46 words (limit 25). Split it. (`The advantage of online evaluation is that it **captures things you might not anticipate in a lab setting** – you can observe model drift over time (if the agen`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:124 — Descriptive sentence has 36 words (limit 25). Split it. (`Online evaluation often involves collecting implicit and explicit user feedback, as discussed, and possibly running shadow tests or A/B tests (where a new versi`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:124 — Descriptive sentence has 33 words (limit 25). Split it. (`The challenge is that it can be tricky to get reliable labels or scores for live interactions – you might rely on user feedback or downstream metrics (like did `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:128 — Descriptive sentence has 26 words (limit 25). Split it. (`Insights from online monitoring (e.g., new types of user queries where the agent performs poorly) can be used to augment and improve offline test datasets.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:151 — Descriptive sentence has 31 words (limit 25). Split it. (`As mentioned earlier, building an evaluation system to determine and compare performance vs larger models is the best way to understand how well an SLM will per`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:155 — Descriptive sentence has 29 words (limit 25). Split it. (`**Caching Responses:** Identifying common requests and tasks and providing the responses before they go through your agentic system is a good way to reduce the `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:159 — Descriptive sentence has 28 words (limit 25). Split it. (`In the [example notebook of this section](./code_samples/10-expense_claim-demo.ipynb), we’ll see examples of how we can use observability tools to monitor and e`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:5 — Descriptive sentence has 30 words (limit 25). Split it. (`With recent enhancements including [resumable streams](URL [elicitation](URL [sampling](URL and notifications ([progress](URL and [resources](URL MCP now provid`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:9 — Descriptive sentence has 39 words (limit 25). Split it. (`As more developers explore tools with agentic behaviors (run for long periods, may require additional input mid-execution, etc.), a common misconception is that`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:11 — Passive voice. Say who does the action (active voice). (`is outdated`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:11 — Passive voice. Say who does the action (active voice). (`been significantly enhanced`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:20 — Descriptive sentence has 26 words (limit 25). Split it. (`This implies the existence of a host application which implements an MCP client that establishes a session with the MCP server and can call the agent.`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:24 — Passive voice. Say who does the action (active voice). (`are needed`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:26 — Descriptive sentence has 31 words (limit 25). Split it. (`> We will define an agent as an entity that can operate autonomously over extended periods, capable of handling complex tasks that may require multiple interact`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:43 — Descriptive sentence has 34 words (limit 25). Split it. (`<strong>Figure 1:</strong> This diagram illustrates how an MCP agent streams real-time progress updates and partial results to the host application during a lon`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:79 — Descriptive sentence has 35 words (limit 25). Split it. (`<strong>Figure 2:</strong> This diagram shows how MCP's StreamableHTTP transport and event store enable seamless session resumption: if the client disconnects, `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:109 — Descriptive sentence has 35 words (limit 25). Split it. (`In turn, the client can choose to poll the state of this resource to get partial or full results (based on what resource updates the server provides) or subscri`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:111 — Descriptive sentence has 28 words (limit 25). Split it. (`There is an open community proposal (including #992) exploring the possibility of including webhooks or triggers that the server can call to notify the client/h`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:117 — Descriptive sentence has 30 words (limit 25). Split it. (`The tool can in the background address the task, issue resource notifications that serve as progress updates or include partial results, and update the content `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:120 — Descriptive sentence has 34 words (limit 25). Split it. (`<strong>Figure 3:</strong> This diagram demonstrates how MCP agents use persistent resources and status notifications to ensure that long-running tasks survive `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:160 — Descriptive sentence has 29 words (limit 25). Split it. (`<strong>Figure 4:</strong> This diagram depicts how MCP agents can interactively elicit human input or request AI assistance mid-execution, supporting complex, `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:187 — Descriptive sentence has 33 words (limit 25). Split it. (`As part of this article, we provide a [code repository](URL that contains a complete implementation of long-running agents using the MCP Python SDK with Streama`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:350 — Passive voice. Say who does the action (active voice). (`is implemented`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:523 — Passive voice. Say who does the action (active voice). (`is encouraged`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:4 — Descriptive sentence has 29 words (limit 25). Split it. (`When discussing the unique benefits of creating AI Agents, two things are mainly discussed: the ability to call tools to complete tasks and the ability to impro`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:4 — Passive voice. Say who does the action (active voice). (`are mainly discussed`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:6 — Descriptive sentence has 28 words (limit 25). Split it. (`In this lesson, we will look at what memory is for AI Agents and how we can manage it and use it for the benefit of our applications.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:32 — Descriptive sentence has 27 words (limit 25). Split it. (`• **Implement and manage short-term and long-term memory for AI agents** using Microsoft Agent Framework, leveraging tools like Mem0, Cognee, Whiteboard memory,`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:44 — Passive voice. Say who does the action (active voice). (`is deeply tied`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:66 — Passive voice. Say who does the action (active voice). (`is held`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:72 — Descriptive sentence has 33 words (limit 25). Split it. (`The session is the framework's built-in short-term memory: it keeps conversation context available while that same session is reused, but that context is not pe`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:72 — Passive voice. Say who does the action (active voice). (`is reused`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:72 — Passive voice. Say who does the action (active voice). (`is not persisted`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:72 — Procedural sentence has 23 words (limit 20). Split it. (`Use long-term memory for facts and preferences that need to survive across sessions, typically through a database, vector index, or another persistent store.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:76 — Descriptive sentence has 35 words (limit 25). Split it. (`If a user asks, "How much would a flight to Paris cost?" and then follows up with "What about accommodation there?", short-term memory ensures the agent knows "`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:84 — Descriptive sentence has 30 words (limit 25). Split it. (`A long-term memory might store that "Ben enjoys skiing and outdoor activities, likes coffee with a mountain view, and wants to avoid advanced ski slopes due to `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:91 — Descriptive sentence has 29 words (limit 25). Split it. (`If the travel agent is designed to be an "expert ski planner," persona memory might reinforce this role, influencing its responses to align with an expert's ton`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:91 — Passive voice. Say who does the action (active voice). (`is designed`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:99 — Descriptive sentence has 44 words (limit 25). Split it. (`If the agent attempted to book a specific flight but it failed due to unavailability, episodic memory could record this failure, allowing the agent to try alter`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:111 — Passive voice. Say who does the action (active voice). (`is highlighted`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:125 — Descriptive sentence has 27 words (limit 25). Split it. (`Mem0 works as a persistent memory layer, allowing agents to recall relevant interactions, store user preferences and factual context, and learn from successes a`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:127 — Descriptive sentence has 28 words (limit 25). Split it. (`First, messages added to an agent's thread are sent to the Mem0 service, which uses a Large Language Model (LLM) to summarize conversation history and extract n`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:127 — Passive voice. Say who does the action (active voice). (`are sent`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:127 — Descriptive sentence has 29 words (limit 25). Split it. (`Subsequently, an LLM-driven update phase determines whether to add, modify, or delete these memories, storing them in a hybrid data store that can include vecto`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:131 — Descriptive sentence has 26 words (limit 25). Split it. (`Another powerful approach is using **Cognee**, an open-source semantic memory for AI agents that transforms structured and unstructured data into queryable know`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:131 — Descriptive sentence has 29 words (limit 25). Split it. (`Cognee provides a **dual-store architecture** combining vector similarity search with graph relationships, enabling agents to understand not just what informati`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:135 — Descriptive sentence has 37 words (limit 25). Split it. (`The Cognee notebook tutorial ([13-agent-memory-cognee.ipynb](./13-agent-memory-cognee.ipynb)) demonstrates building this unified memory layer, with practical ex`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:139 — Descriptive sentence has 28 words (limit 25). Split it. (`Beyond specialized memory tools like Mem0, you can leverage robust search services like **Azure AI Search as a backend for storing and retrieving memories**, es`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:143 — Descriptive sentence has 27 words (limit 25). Split it. (`Azure AI Search supports capabilities like **Structured RAG**, which excels at extracting and retrieving dense, structured information from large datasets like `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:155 — Descriptive sentence has 34 words (limit 25). Split it. (`**Augment future queries**: When the user initiates a new query, the knowledge agent retrieves relevant stored information and appends it to the user's prompt, `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:159 — Descriptive sentence has 37 words (limit 25). Split it. (`• **Latency Management**: To avoid slowing down user interactions, a cheaper, faster model can be used initially to quickly check if information is valuable to `)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:31 — Passive voice. Say who does the action (active voice). (`are needed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:34 — Passive voice. Say who does the action (active voice). (`are completed`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:39 — Descriptive sentence has 27 words (limit 25). Split it. (`**Observability** through the use of OpenTelemetry where every action of the AI Agent including tool invocation, orchestration steps, reasoning flows and perfor`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:42 — Passive voice. Say who does the action (active voice). (`are supported`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:42 — Passive voice. Say who does the action (active voice). (`are marked`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:51 — Passive voice. Say who does the action (active voice). (`are applied`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:61 — Passive voice. Say who does the action (active voice). (`is done`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:98 — Passive voice. Say who does the action (active voice). (`are run`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:112 — Descriptive sentence has 33 words (limit 25). Split it. (`Each agent run can also have options to customize parameters such as CODE used by the agent, CODE that agent is able to call, and  even the CODE itself used for`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:114 — Passive voice. Say who does the action (active voice). (`are required`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:139 — Passive voice. Say who does the action (active voice). (`are used`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:141 — Passive voice. Say who does the action (active voice). (`be saved`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:153 — Passive voice. Say who does the action (active voice). (`be stored`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:202 — Passive voice. Say who does the action (active voice). (`being sent`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:237 — Passive voice. Say who does the action (active voice). (`is used`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:237 — Passive voice. Say who does the action (active voice). (`is defined`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:256 — Passive voice. Say who does the action (active voice). (`is added`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:256 — Passive voice. Say who does the action (active voice). (`are run`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:296 — Passive voice. Say who does the action (active voice). (`are made`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:306 — Passive voice. Say who does the action (active voice). (`are used`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:336 — Passive voice. Say who does the action (active voice). (`is issued`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:349 — Descriptive sentence has 42 words (limit 25). Split it. (`If you already have an agent built with **LangChain** or **LangGraph**, you can run it as a **Microsoft Foundry hosted agent** so that Foundry manages the runti`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:351 — Passive voice. Say who does the action (active voice). (`is done`)
- **P1** `ste.multiple_instructions` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:419 — More than one instruction in one sentence. Write one instruction per sentence. (`Run it locally with CODE, then send a Responses request to CODE.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:423 — Descriptive sentence has 28 words (limit 25). Split it. (`If your graph is compiled with a LangGraph checkpointer, Foundry keys conversation state to the checkpoint (use a durable checkpointer in production; CODE is fi`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:423 — Passive voice. Say who does the action (active voice). (`is compiled`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:424 — Descriptive sentence has 26 words (limit 25). Split it. (`**Human-in-the-loop**: If your graph uses LangGraph CODE, CODE surfaces the pending interrupt as a Responses CODE / CODE item, and clients resume with a matchin`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:5 — Descriptive sentence has 28 words (limit 25). Split it. (`Up to this point in the course you have built agents that run on your laptop, inside a notebook, driven by CODE and a handful of environment variables.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:7 — Descriptive sentence has 52 words (limit 25). Split it. (`This lesson is about the gap between "it works on my machine" and "it works, reliably and affordably, in production." We close that gap using **Microsoft Foundr`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:26 — Passive voice. Say who does the action (active voice). (`is versioned`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:70 — Procedural sentence has 22 words (limit 20). Split it. (`**Use it when** you need full control over the loop, custom middleware, or you are embedding the agent inside an existing backend.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:82 — Descriptive sentence has 27 words (limit 25). Split it. (`Multiple agents (and tools) are composed into a graph with explicit control flow — sequential steps, branching, human approval nodes, and durable checkpoints th`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:82 — Passive voice. Say who does the action (active voice). (`are composed`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:120 — Descriptive sentence has 31 words (limit 25). Split it. (`The key idea, carried over from [Lesson 10](../10-ai-agents-production/README.md): **offline evaluation is a gate, not an afterthought.** A new agent version do`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:165 — Descriptive sentence has 26 words (limit 25). Split it. (`Attributes like CODE and CODE are what turn a wall of traces into answerable questions ("are enterprise customers getting routed to the small model too often?")`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:169 — Passive voice. Say who does the action (active voice). (`is dominated`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:175 — Descriptive sentence has 32 words (limit 25). Split it. (`Evaluation gates and cost control are the same discipline viewed from two angles: evaluation tells you the *quality floor*, routing and caching keep you as clos`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:179 — Procedural sentence has 26 words (limit 20). Split it. (`Give each agent a managed identity with the least privilege it needs — read-only access to the knowledge base, scoped access to the ticketing API, nothing more.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:183 — Descriptive sentence has 29 words (limit 25). Split it. (`In production, treat every MCP server as an untrusted boundary: pin the server version, run it with a scoped identity, validate its outputs, and never expose se`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:218 — Passive voice. Say who does the action (active voice). (`are served`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:225 — Passive voice. Say who does the action (active voice). (`is organised`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:262 — Passive voice. Say who does the action (active voice). (`is hidden`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:266 — Passive voice. Say who does the action (active voice). (`is deployed`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:272 — Descriptive sentence has 27 words (limit 25). Split it. (`**Catalog** — [CODE](../tests/lesson-16-smoke-tests.json) contains prompts and assertions for the Contoso support agent (grounded policy answers, an order looku`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:273 — Descriptive sentence has 27 words (limit 25). Split it. (`**Workflow** — [CODE](../.github/workflows/smoke-test.yml) logs in with Azure OIDC and POSTs each prompt to the agent's Responses endpoint, failing the job on a`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:284 — Passive voice. Say who does the action (active voice). (`is deployed`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:284 — Descriptive sentence has 37 words (limit 25). Split it. (`Think of the layers as a pyramid: smoke tests (reachable and responding?) run on every deploy, offline evaluation (good enough to ship?) runs before promotion, `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:303 — Descriptive sentence has 38 words (limit 25). Split it. (`When you want a managed runtime with built-in durability (threads that persist and can resume), observability, content safety, and RBAC, and you are willing to `)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:311 — Passive voice. Say who does the action (active voice). (`is externalised`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:330 — Passive voice. Say who does the action (active voice). (`be treated`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:335 — Descriptive sentence has 31 words (limit 25). Split it. (`You should pin its version, run it with a scoped identity, validate its outputs, rate-limit it, and never expose secrets to it — the same discipline you apply t`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:343 — Passive voice. Say who does the action (active voice). (`is dominated`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:351 — Descriptive sentence has 45 words (limit 25). Split it. (`Without attributes you have a wall of spans; with them you can ask "are enterprise customers being routed to the small model too often?" or "which model handles`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:351 — Passive voice. Say who does the action (active voice). (`being routed`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:362 — Descriptive sentence has 28 words (limit 25). Split it. (`**Extend the evaluation set** to at least eight cases, including at least two that *should* trigger the human-approval path, and confirm your evaluation gate co`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:363 — Procedural sentence has 33 words (limit 20). Split it. (`**Add one cost report**: after running ten mixed queries through the agent, print how many went to the small model, how many to the large model, and how many we`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:363 — Passive voice. Say who does the action (active voice). (`were served`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:365 — Procedural sentence has 23 words (limit 20). Split it. (`Write a short paragraph (in a markdown cell) explaining which model-routing rule you chose and how you would validate it with real traffic.`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:365 — Passive voice. Say who does the action (active voice). (`being assessed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:365 — Passive voice. Say who does the action (active voice). (`are wired`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:378 — Descriptive sentence has 30 words (limit 25). Split it. (`The next lesson takes the opposite journey: instead of scaling agents up into the cloud, you will bring them *down* onto a single developer machine and run them`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:5 — Descriptive sentence has 27 words (limit 25). Split it. (`By the end you will have a working engineering assistant that reasons, calls tools, reads your files, and searches your documentation — **without a single cloud`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:45 — Passive voice. Say who does the action (active voice). (`is not required`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:64 — Descriptive sentence has 37 words (limit 25). Split it. (`The winning strategy for local agents is therefore: **let the SLM orchestrate, and let tools do the heavy lifting.** The model doesn't need to *know* your codeb`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:80 — Descriptive sentence has 35 words (limit 25). Split it. (`Its most important feature for us is that it exposes an **OpenAI-compatible HTTP endpoint** — which means the OpenAI SDK and the Microsoft Agent Framework's Ope`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:82 — Descriptive sentence has 31 words (limit 25). Split it. (`Foundry Local also picks the best build of a model for your hardware automatically — a CPU build, a CUDA/GPU build, or an NPU build — so you don't hand-optimise`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:102 — Descriptive sentence has 36 words (limit 25). Split it. (`Many SLMs can chat but produce unreliable, malformed tool calls. **Qwen** models are trained for function calling and emit well-formed tool-call structures cons`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:102 — Passive voice. Say who does the action (active voice). (`are trained`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:121 — Descriptive sentence has 28 words (limit 25). Split it. (`Instead of hoping the SLM memorised your framework's docs, you embed those docs into a **local vector database** and let the agent retrieve the relevant chunks `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:141 — Descriptive sentence has 43 words (limit 25). Split it. (`The security posture is different from the cloud, but not absent: a local MCP server still runs with your user's permissions, so scope what it can touch (a proj`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:175 — Passive voice. Say who does the action (active voice). (`is configured`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:177 — Passive voice. Say who does the action (active voice). (`is used`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:214 — Descriptive sentence has 34 words (limit 25). Split it. (`Any two of: **privacy** (code and data never leave the machine), **cost** (no per-token inference bill), and **offline capability** (works with no network — on `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:222 — Procedural sentence has 26 words (limit 20). Split it. (`Let the SLM **orchestrate** (decide which tool to call and with what arguments) and let **tools do the heavy lifting** (reading files, retrieving docs, computin`)
- **P1** `ste.multiple_instructions` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:222 — More than one instruction in one sentence. Write one instruction per sentence. (`Let the SLM **orchestrate** (decide which tool to call and with what arguments) and let **tools do the heavy lifting** (reading files, retrieving docs, computin`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:222 — Descriptive sentence has 26 words (limit 25). Split it. (`SLMs are strong at bounded decisions like tool selection but weaker at broad knowledge and long multi-hop reasoning, so leaning on tools plays to their strength`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:238 — Passive voice. Say who does the action (active voice). (`are trained`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:246 — Passive voice. Say who does the action (active voice). (`are embedded`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:254 — Descriptive sentence has 30 words (limit 25). Split it. (`Scope it to what it needs (for example, a single project directory rather than your whole home folder) and treat its outputs as inputs to validate before acting`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:262 — Descriptive sentence has 52 words (limit 25). Split it. (`Route sensitive or offline requests to the local SLM; route simple bounded tasks to the local SLM for speed and cost; route hard multi-hop reasoning on non-sens`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:270 — Passive voice. Say who does the action (active voice). (`is not required`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:275 — Descriptive sentence has 27 words (limit 25). Split it. (`Extend the local engineering assistant into a **local documentation reviewer** for a small project of your choice (use one of this repo's lesson folders if you `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:280 — Procedural sentence has 27 words (limit 20). Split it. (`**Add a CODE tool** that scans the project for CODE/CODE comments and returns them with file and line number — keeping the same sandbox check as CODE.`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:281 — Procedural sentence has 28 words (limit 20). Split it. (`**Ask the agent three questions** that force it to combine tools: one pure RAG question, one that requires reading a specific file, and one that requires findin`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:284 — Procedural sentence has 24 words (limit 20). Split it. (`Then write a short paragraph on **what you would move to the cloud and what you would keep local** for this reviewer, and why.`)
- **P1** `ste.multiple_instructions` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:284 — More than one instruction in one sentence. Write one instruction per sentence. (`Then write a short paragraph on **what you would move to the cloud and what you would keep local** for this reviewer, and why.`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:284 — Passive voice. Say who does the action (active voice). (`are assessed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:284 — Passive voice. Say who does the action (active voice). (`are wired`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/code_samples/sample_receipts/README.md:56 — Passive voice. Say who does the action (active voice). (`is embedded`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:3 — Passive voice. Say who does the action (active voice). (`be added`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:35 — Passive voice. Say who does the action (active voice). (`were not edited`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:86 — Passive voice. Say who does the action (active voice). (`is signed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:88 — Passive voice. Say who does the action (active voice). (`is serialized`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:90 — Passive voice. Say who does the action (active voice). (`are bypassed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:230 — Passive voice. Say who does the action (active voice). (`is bounded`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:241 — Passive voice. Say who does the action (active voice). (`was actually evaluated`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:241 — Passive voice. Say who does the action (active voice). (`was claimed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:241 — Passive voice. Say who does the action (active voice). (`was enforced`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:242 — Descriptive sentence has 39 words (limit 25). Split it. (`**Identity beyond the key**: the receipt says "this key signed this content." It does not say "this human authorized this." Connecting a key to a person or orga`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:248 — Descriptive sentence has 26 words (limit 25). Split it. (`It tells you what additional layers you still need: input validation (Lesson 6), policy enforcement (covered briefly below), and identity infrastructure (out of`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:250 — Passive voice. Say who does the action (active voice). (`are governed`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:254 — Descriptive sentence has 50 words (limit 25). Split it. (`Item 3 above is worth its own section: an action receipt says "this key signed this content," never "a human authorized this." For high-risk actions (refunds, d`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:256 — Descriptive sentence has 38 words (limit 25). Split it. (`The follow-on notebook CODE adds a second receipt kind, CODE, in the same envelope shape as the lesson's receipts (a typed payload signed by Ed25519 over its ca`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:256 — Descriptive sentence has 41 words (limit 25). Split it. (`A named approver signs the **full canonical action and its digest** before execution; the agent's action receipt carries the **same action digest** and a CODE, `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:256 — Descriptive sentence has 26 words (limit 25). Split it. (`One CODE walks both artifacts under **separate pinned key registries** (approver keys vs agent keys), so the code path is shared but the authorities never are.`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:256 — Passive voice. Say who does the action (active voice). (`is shared`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:258 — Descriptive sentence has 33 words (limit 25). Split it. (`The property this buys, stated carefully: *the human approved this exact action, and the agent executed exactly that approved action.* The notebook's refusal fi`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:261 — Descriptive sentence has 30 words (limit 25). Split it. (`**stale authority**: a signature that still verifies, refused anyway because the policy version moved, the approver key was rotated out of the pinned registry, `)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:261 — Passive voice. Say who does the action (active voice). (`was rotated`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:272 — Procedural sentence has 26 words (limit 20). Split it. (`**Use a production receipt library.** Several open-source projects implement the same pattern with additional features (key rotation, batch verification, JWK Se`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:273 — Passive voice. Say who does the action (active voice). (`is not presented`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:275 — Descriptive sentence has 60 words (limit 25). Split it. (`The CODE (npm) and CODE (npm) packages provide a Node-based implementation of receipt signing and offline verification, intended for wrapping any MCP server wit`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:276 — Descriptive sentence has 34 words (limit 25). Split it. (`The **[nobulex](URL Python SDK (CODE) provides the same Ed25519 + JCS signing pattern in Python with LangChain and CrewAI integrations, including published cros`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:278 — Descriptive sentence has 44 words (limit 25). Split it. (`The decision between rolling your own and using a library mirrors the decision between writing your own JWT library and using a tested one: both are reasonable;`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:284 — Passive voice. Say who does the action (active voice). (`is signed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:292 — Passive voice. Say who does the action (active voice). (`was governed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:297 — Passive voice. Say who does the action (active voice). (`was computed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:305 — Passive voice. Say who does the action (active voice). (`be archived`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:305 — Passive voice. Say who does the action (active voice). (`is bounded`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:313 — Descriptive sentence has 26 words (limit 25). Split it. (`Their CODE fields no longer match the actual chain (because the receipt they referenced no longer exists, or the chain now points to a different predecessor).`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:321 — Descriptive sentence has 26 words (limit 25). Split it. (`A valid receipt proves three things: attribution (this key signed this content), integrity (the content has not changed), and ordering (this receipt came after `)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:321 — Passive voice. Say who does the action (active voice). (`was actually evaluated`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:333 — Descriptive sentence has 38 words (limit 25). Split it. (`**Stretch challenge 1:** extend the receipt schema with an additional field of your own choosing (for example, a request ID for tracing), update the canonical s`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:335 — Descriptive sentence has 33 words (limit 25). Split it. (`**Stretch challenge 2:** SHA-256-hash two of your receipts together (concatenate their canonical bytes in a deterministic order) and embed the resulting digest `)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:335 — Descriptive sentence has 31 words (limit 25). Split it. (`You have just built a one-step inclusion proof: anyone holding the third receipt can prove the first two existed at the time it was signed, without needing to r`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:335 — Passive voice. Say who does the action (active voice). (`was signed`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:346 — Descriptive sentence has 32 words (limit 25). Split it. (`When you are deploying agents into regulated workloads, multi-organization workflows, or any setting where a future auditor cannot be assumed to trust you, rece`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:346 — Passive voice. Say who does the action (active voice). (`be assumed`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:356 — Descriptive sentence has 37 words (limit 25). Split it. (`[ ] **Anchor the chain externally.** Periodically write the latest chain head hash to a transparency log (Sigstore Rekor, RFC 3161 timestamp authority, or a sec`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:369 — Descriptive sentence has 30 words (limit 25). Split it. (`**Selective disclosure.** When a receipt's fields are independently committed (RFC 6962-style Merkle tree), you can reveal specific fields to specific auditors `)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:369 — Passive voice. Say who does the action (active voice). (`are independently committed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:369 — Passive voice. Say who does the action (active voice). (`are unchanged`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:369 — Descriptive sentence has 30 words (limit 25). Split it. (`Useful when the same receipt has to satisfy both a comprehensive audit (which wants completeness) and data-minimization regulations like GDPR (which want the au`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:370 — Descriptive sentence has 28 words (limit 25). Split it. (`**Receipt revocation.** If a signing key is compromised, you need a way to mark all receipts signed by that key as untrusted from a point in time forward.`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:370 — Passive voice. Say who does the action (active voice). (`is compromised`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:371 — Descriptive sentence has 37 words (limit 25). Split it. (`**Bilateral / split-signature receipts.** Some implementations split the signed payload into pre-execution (CODE) and post-execution (CODE) halves with independ`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:371 — Passive voice. Say who does the action (active voice). (`are produced`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:372 — Descriptive sentence has 38 words (limit 25). Split it. (`Real-world payloads are often richer than a single tool call result: pre-decision reasoning (model prediction, options considered, evidence and its completeness`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:374 — Passive voice. Say who does the action (active voice). (`is widely deployed`)
- **P1** `ste.multiple_instructions` microsoft__ai-agents-for-beginners/AGENTS.md:78 — More than one instruction in one sentence. Write one instruction per sentence. (`**Open and run notebooks:**`)
- **P1** `ste.sentence_length` microsoft__ai-agents-for-beginners/AGENTS.md:123 — Descriptive sentence has 34 words (limit 25). Split it. (`For lessons where an agent is deployed as a Microsoft Foundry hosted agent (01, 04, 05, 16), the repo ships smoke-test catalogs under CODE that are run by the C`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/AGENTS.md:123 — Passive voice. Say who does the action (active voice). (`is deployed`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/AGENTS.md:123 — Passive voice. Say who does the action (active voice). (`are run`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/AGENTS.md:123 — Passive voice. Say who does the action (active voice). (`is validated`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/AGENTS.md:217 — Passive voice. Say who does the action (active voice). (`is used`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/tests/lesson-05-smoke-tests.json:6 — Passive voice. Say who does the action (active voice). (`is known`)
- **P1** `ste.passive_voice` microsoft__ai-agents-for-beginners/tests/lesson-16-smoke-tests.json:7 — Passive voice. Say who does the action (active voice). (`be politely redirected`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md:211 — "migrating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`When migrating a`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md:211 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`backend serialization format changes`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md:213 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md:252 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md:321 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`content filter error body shape`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md:445 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Chat Completions apps already manage`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md:486 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`buffer output during reasoning`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md:502 — "generating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before generating the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md:502 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`model uses reasoning tokens`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md:534 — Semicolon. Use two sentences. (`Keep schemas minimal; validate inputs before execution.`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md:535 — Modal + be + past participle. Use an active verb. (`must be listed`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/cheat-sheet.md:677 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Image content items change`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/test-migration.md:3 — "migrating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`When migrating a`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/test-migration.md:43 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`apps serve different answers`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/test-migration.md:103 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/test-migration.md:103 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`suite uses snapshot testing`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/test-migration.md:139 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:55 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:57 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:58 — Semicolon. Use two sentences. (`The CODE parameter is not supported in Responses; remove it from requests.`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:60 — Semicolon. Use two sentences. (`The model uses reasoning tokens internally before generating visible output; too-low limits cause truncated or empty responses.`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:60 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`model uses reasoning tokens`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:63 — "perform" → do (plain-word hint). (`perform`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:63 — Progressive tense (be + -ing). Use simple present. (`is reasoning`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:65 — Modal + be + past participle. Use an active verb. (`must be updated`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:65 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:65 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`suite uses snapshot testing`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:65 — Possible noun cluster of 7 words. Break it up with "of", "for" or a verb. (`snapshot files containing Chat Completions streaming shapes`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:65 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`causes snapshot assertion failures`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:66 — "Using" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Using the`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:71 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:75 — "executing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`After executing a`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:76 — Modal + be + past participle. Use an active verb. (`must be listed`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:77 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:77 — "Using" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Using the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:79 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Content filter error body structure`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/references/troubleshooting.md:80 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:10 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`azure openai python migration`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:11 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`python azure openai upgrade`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:22 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`skill migrates Python codebases using Azure`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:33 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:72 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`built-in model compatibility tool`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:78 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:93 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:95 — Modal + be + past participle. Use an active verb. (`must be omitted`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:102 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`because reasoning tokens count against`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:106 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:106 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`O-series models support tools via`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:108 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`app targets deployment names`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:110 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`offer better tool orchestration`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:119 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Models code path look`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:119 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:166 — Semicolon. Use two sentences. (`> **The Responses API is a server-side concern.** Migrate your Python backend; the frontend's HTTP contract should stay unchanged unless your backend is a thin `)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:170 — Modal + be + past participle. Use an active verb. (`should be replaced`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:188 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`sites using Chat Completions`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:188 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`legacy Completions against Azure`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:191 — Semicolon. Use two sentences. (`Update callers to consume the Responses output schema; no backcompat wrappers.`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:192 — Semicolon. Use two sentences. (`Run tests/lints; fix trivial breakages introduced by the migration.`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:199 — "modify" → change (plain-word hint). (`modify`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:200 — Semicolon. Use two sentences. (`Do not preserve backward-compatibility shims; migrate code to the new API shape.`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:202 — Semicolon. Use two sentences. (`Preserve streaming semantics if previously used; otherwise use non-streaming.`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:204 — Semicolon. Use two sentences. (`Do not run CODE/CODE/CODE; produce working-tree edits only.`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:230 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`fixtures standard Azure Identity`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:231 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:244 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`client setup code examples sync`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:317 — Semicolon. Use two sentences. (`**Tools**: convert function-calling tool definitions from nested format (CODE) to flat Responses format (CODE); use CODE; return tool results as CODE items (not`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:317 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`convert function-calling tool definitions`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:318 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`model returns function calls`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:321 — Semicolon. Use two sentences. (`**Multi-turn**: maintain conversation history in the app; pass prior turns via CODE items.`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:321 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:321 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`pass prior turns via`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:326 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Content filter error handling`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:326 — Semicolon. Use two sentences. (`Chat Completions used CODE (singular); Responses API uses CODE (plural, inside an array).`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:327 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:327 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:335 — Semicolon. Use two sentences. (`**Why migrate**: Responses is the unified API for text, tools, and streaming; Chat Completions is legacy.`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:372 — Semicolon. Use two sentences. (`Do not rely on previous message IDs or server-stored context; keep state client-managed and minimize metadata.`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:386 — Semicolon. Use two sentences. (`[ ] No CODE at top level; all structured output uses CODE.`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:387 — Semicolon. Use two sentences. (`[ ] CODE and CODE in CODE or CODE; dependencies reinstalled.`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:389 — Semicolon. Use two sentences. (`[ ] No CODE in client construction; CODE removed from env files and infra.`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:397 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:405 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`model issues tool calls`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/.agents/skills/azure-openai-to-responses/SKILL.md:412 — Progressive tense (be + -ing). Use simple present. (`are working`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/deploying-scalable-agents/SKILL.md:13 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`production customer support agent`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/.agents/skills/deploying-scalable-agents/SKILL.md:14 — "building" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`: building your`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/deploying-scalable-agents/SKILL.md:25 — Semicolon. Use two sentences. (`> the runnable notebook; do not invent Foundry APIs.`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/deploying-scalable-agents/SKILL.md:33 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent version cannot ship`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/deploying-scalable-agents/SKILL.md:55 — Semicolon. Use two sentences. (`Max control; you own scaling/state.`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/deploying-scalable-agents/SKILL.md:56 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent Foundry Agent Service`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/deploying-scalable-agents/SKILL.md:70 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`serve near-duplicate requests without`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/deploying-scalable-agents/SKILL.md:71 — Semicolon. Use two sentences. (`**Stateless design + bounded concurrency** — externalise state; retry with backoff.`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/deploying-scalable-agents/SKILL.md:79 — Semicolon. Use two sentences. (`**Evaluation gate**: score an offline test set; return CODE and only deploy if true.`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/deploying-scalable-agents/SKILL.md:87 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/deploying-scalable-agents/SKILL.md:91 — Semicolon. Use two sentences. (`Foundry project scope; the token audience must be CODE.`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/.agents/skills/deploying-scalable-agents/SKILL.md:105 — Perfect tense. Use simple past or present. (`have not verified`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/deploying-scalable-agents/SKILL.md:105 — Semicolon. Use two sentences. (`Do not promise live-Azure results you have not verified; recommend the smoke-test workflow to confirm a deployment.`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:13 — Progressive tense (be + -ing). Use simple present. (`is granting`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:56 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`source code control systems`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:63 — Perfect tense. Use simple past or present. (`has been received`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:64 — "subsequently" → then / after (plain-word hint). (`subsequently`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:70 — "perform" → do (plain-word hint). (`perform`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:76 — Perfect tense. Use simple past or present. (`have made`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:82 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`institute patent litigation against`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:86 — "terminate" → stop (plain-word hint). (`terminate`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:95 — Semicolon. Use two sentences. (`Derivative Works a copy of this License; and`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:98 — "stating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`stating that`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:98 — Semicolon. Use two sentences. (`stating that You changed the files; and`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:104 — Semicolon. Use two sentences. (`the Derivative Works; and`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:112 — Semicolon. Use two sentences. (`as part of the Derivative Works; within the Source form or`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:113 — Semicolon. Use two sentences. (`documentation, if provided along with the Derivative Works; or,`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:115 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`wherever such third-party notices`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:117 — "modify" → change (plain-word hint). (`modify`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:120 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:124 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:133 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:134 — "Notwithstanding" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Notwithstanding the`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:134 — "modify" → change (plain-word hint). (`modify`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:135 — Perfect tense. Use simple past or present. (`have executed`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:136 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Licensor regarding such Contributions`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:140 — Vague word "reasonable". Give the exact condition, value or action. (`reasonable`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:149 — "determining" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for determining the`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:157 — "including" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, including any`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:163 — Perfect tense. Use simple past or present. (`has been advised`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:165 — "Additional" → more (plain-word hint). (`Additional`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:174 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:183 — Modal + be + past participle. Use an active verb. (`should be enclosed`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:183 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:187 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`identification within third-party archives`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:191 — Semicolon. Use two sentences. (`Licensed under the Apache License, Version 2.0 (the "License");`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:193 — "obtain" → get (plain-word hint). (`obtain`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/LICENSE.txt:200 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`specific language governing permissions`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/references/notebook-structure.md:12 — Semicolon. Use two sentences. (`Keep CODE as an ordered list; do not reorder unless intentional.`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/references/quality-checklist.md:3 — "delivering" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Before delivering a`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/references/quality-checklist.md:6 — Semicolon. Use two sentences. (`Ensure early cells set all required state; avoid hidden state from prior runs.`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/references/quality-checklist.md:6 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/SKILL.md:3 — Semicolon. Use two sentences. (`description: "Use when the user asks to create, scaffold, or edit Jupyter notebooks (CODE) for experiments, explorations, or tutorials; prefer the bundled templ`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/SKILL.md:20 — Modal + be + past participle. Use an active verb. (`will be read`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/SKILL.md:68 — Semicolon. Use two sentences. (`Preserve the notebook structure; avoid reordering cells unless it improves the top-to-bottom story.`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/SKILL.md:85 — Semicolon. Use two sentences. (`Use CODE for intermediate files; delete when done.`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/jupyter-notebook/SKILL.md:98 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/.agents/skills/local-ai-agents/SKILL.md:14 — "building" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, building your`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/local-ai-agents/SKILL.md:14 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`first agent concept Lesson`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/local-ai-agents/SKILL.md:30 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/local-ai-agents/SKILL.md:46 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`cloud agent code transfers`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/local-ai-agents/SKILL.md:66 — Semicolon. Use two sentences. (`~8 GB RAM is a realistic minimum; a GPU/NPU helps but is not required.`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/local-ai-agents/SKILL.md:73 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`file tool resolves paths`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/local-ai-agents/SKILL.md:75 — Semicolon. Use two sentences. (`**Local RAG**: upsert docs into a Chroma collection; CODE returns top-k chunks.`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/local-ai-agents/SKILL.md:76 — Semicolon. Use two sentences. (`**Local MCP**: connect to a local server over CODE; scope it to a project directory and validate its outputs.`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/.agents/skills/local-ai-agents/SKILL.md:89 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/local-ai-agents/SKILL.md:95 — Semicolon. Use two sentences. (`Set realistic expectations for SLM quality; lean on tools and RAG rather than the model's memorised knowledge.`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/.agents/skills/local-ai-agents/SKILL.md:95 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/.agents/skills/local-ai-agents/SKILL.md:96 — "running" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by running the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/microsoft-docs/SKILL.md:3 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`code examples across Azure`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/microsoft-docs/SKILL.md:34 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`server includes built-in docs search tools`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/microsoft-docs/SKILL.md:44 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`server provides integration lookup`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/microsoft-docs/SKILL.md:85 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`first one-time per session`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/testing-course-samples/SKILL.md:3 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Covers environment setup env`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.agents/skills/testing-course-samples/SKILL.md:14 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`samples against my Azure subscription`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.agents/skills/testing-course-samples/SKILL.md:28 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.agents/skills/testing-course-samples/SKILL.md:61 — Semicolon. Use two sentences. (`CODE — the first CODE / CODE line is shown; open the matching`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/.agents/skills/testing-course-samples/SKILL.md:64 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.github/agents/dotnet-notebook-migration.agent.md:2 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`migrates Polyglot Jupyter notebooks`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.github/agents/dotnet-notebook-migration.agent.md:12 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Single File App refer`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.github/agents/dotnet-notebook-migration.agent.md:17 — Possible noun cluster of 7 words. Break it up with "of", "for" or a verb. (`Normalize headings first markdown cell becomes H`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/.github/agents/dotnet-notebook-migration.agent.md:18 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.github/agents/dotnet-notebook-migration.agent.md:21 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Trim trailing blank lines`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.github/agents/dotnet-notebook-migration.agent.md:38 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.github/agents/dotnet-notebook-migration.agent.md:38 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`blank line between top-level sections`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.github/agents/dotnet-notebook-migration.agent.md:44 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Single File App format`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/.github/agents/dotnet-notebook-migration.agent.md:47 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.github/agents/dotnet-notebook-migration.agent.md:65 — Semicolon. Use two sentences. (`Count cells; abort if none.`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.github/agents/dotnet-notebook-migration.agent.md:67 — Semicolon. Use two sentences. (`Confirm at least one markdown or code cell; else emit an error note.`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/.github/agents/dotnet-notebook-migration.agent.md:73 — "perform" → do (plain-word hint). (`perform`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.github/prompts/git-cherrypicking.prompt.md:2 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`given commit between branches using Git`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.github/prompts/git-cherrypicking.prompt.md:8 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`given commit between branches`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/.github/prompts/git-cherrypicking.prompt.md:8 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Git command line interface`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/.github/workflows/smoke-test.yml:2 — Semicolon. Use two sentences. (`Deployed hosted agent name (must match the catalog's lesson; comma-separate for multiple)`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.md:5 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`intelligent travel planning agent using`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.md:20 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.md:28 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Real-time response generation capabilities`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.md:162 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Microsoft Agent Framework provides`)
- **P2** `ste.phrasal_verb` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:11 — Phrasal verb "make sure". Try: verify / ensure. (`make sure`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:21 — "designing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`when designing an`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:29 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`basic Agentic solution design`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:39 — "giving" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by giving them`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:52 — "Perform" → do (plain-word hint). (`Perform`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:52 — "calling" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, calling an`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:52 — "sending" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, sending a`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:62 — "using" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, using a`)
- **P2** `ste.phrasal_verb` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:82 — Phrasal verb "figure out". Try: find / calculate. (`figure out`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:83 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:83 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:83 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`require using tools across`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:94 — "building" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`when building an`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:96 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Microsoft Foundry Agent Service`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:104 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`take action across many steps`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/01-intro-to-ai-agents/README.md:114 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Collaborate across multiple agents`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:3 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Microsoft Foundry Agent Service tools`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:16 — "creating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for creating a`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:27 — "Reducing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`: Reducing the`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:33 — Perfect tense. Use simple past or present. (`have deployed`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:33 — Modal + be + past participle. Use an active verb. (`can be used`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:36 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Agent Setup dialog box`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:38 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.phrasal_verb` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:67 — Phrasal verb "check out". Try: examine. (`check out`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:69 — "perform" → do (plain-word hint). (`perform`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:78 — "creating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`After creating the`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:87 — "testing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`After testing the`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:91 — Perfect tense. Use simple past or present. (`have finished`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/azure-ai-foundry-agent-creation.md:91 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.md:5 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Microsoft Agent Framework through`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.md:5 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`learn core agentic patterns`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.md:9 — "Understanding" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`: Understanding the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.md:48 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Microsoft Agent Framework approach`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.md:220 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Microsoft Agent Framework provides`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.md:222 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Session management enables multi-turn conversations`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/03-agentic-design-patterns/code_samples/03-dotnet-agent-framework.md:5 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`example demonstrates enterprise-grade design patterns`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/03-agentic-design-patterns/code_samples/03-dotnet-agent-framework.md:35 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Enterprise agent orchestration framework`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/03-agentic-design-patterns/code_samples/03-dotnet-agent-framework.md:62 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Event-driven agent lifecycle management`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/03-agentic-design-patterns/code_samples/03-dotnet-agent-framework.md:107 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Concurrent agent execution support`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/03-agentic-design-patterns/code_samples/03-dotnet-agent-framework.md:120 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`build enterprise-grade intelligent agents`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/04-tool-use/code_samples/04-dotnet-agent-framework.md:5 — Possible noun cluster of 7 words. Break it up with "of", "for" or a verb. (`notebook demonstrates enterprise-grade tool integration patterns using`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/04-tool-use/code_samples/04-dotnet-agent-framework.md:18 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Strong typing ensures tool parameter correctness`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/04-tool-use/code_samples/04-dotnet-agent-framework.md:66 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Secure file system operations`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/04-tool-use/code_samples/04-dotnet-agent-framework.md:67 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Third-party service integration patterns`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/05-agentic-rag/code_samples/05-dotnet-agent-framework.md:38 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`secure Azure service access`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/05-agentic-rag/code_samples/05-dotnet-agent-framework.md:51 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Efficient Azure service connection management`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/05-agentic-rag/code_samples/05-dotnet-agent-framework.md:86 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/05-agentic-rag/code_samples/05-dotnet-agent-framework.md:87 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/05-agentic-rag/code_samples/05-dotnet-agent-framework.md:104 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`access control per document`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/05-agentic-rag/code_samples/05-dotnet-agent-framework.md:127 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Geographic data location controls`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/05-agentic-rag/code_samples/05-dotnet-agent-framework.md:142 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`documents without memory issues`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/05-agentic-rag/code_samples/05-dotnet-agent-framework.md:145 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Proper Azure service connection lifecycle`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/05-agentic-rag/code_samples/05-dotnet-agent-framework.md:156 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Intelligent search across company knowledge bases`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/05-agentic-rag/code_samples/05-dotnet-agent-framework.md:159 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`research paper analysis systems`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/05-agentic-rag/code_samples/05-dotnet-agent-framework.md:178 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`End-to-end request tracking across services`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/05-agentic-rag/code_samples/05-dotnet-agent-framework.md:187 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`architect intelligent knowledge systems`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/05-agentic-rag/code_samples/05-dotnet-agent-framework.md:191 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`complete working code sample`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/05-agentic-rag/code_samples/05-dotnet-agent-framework.md:213 — "Uploading" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`: Uploading a`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/05-agentic-rag/code_samples/05-dotnet-agent-framework.md:214 — "Creating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`: Creating a`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:17 — "completing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`After completing this`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:20 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:31 — Perfect tense. Use simple past or present. (`have designed`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:39 — Modal + be + past participle. Use an active verb. (`will be used`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:62 — "providing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by providing the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:118 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`scale creating system messages`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:118 — "changing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by changing the`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:128 — "attempt" → try (plain-word hint). (`attempt`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:130 — "limiting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, limiting the`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:130 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:130 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:140 — "sending" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by sending a`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:142 — "Limiting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Limiting the`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:148 — "Perform" → do (plain-word hint). (`Perform`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:148 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Mitigation Perform regular verification`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:148 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:152 — "causing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, causing the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:154 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`prevent direct system attacks`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:154 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`prevent larger system failures`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:193 — "incorporating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, incorporating a`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:193 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`user needs while minimizing risks`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/06-building-trustworthy-agents/README.md:193 — "maintaining" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, maintaining a`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/07-planning-design/code_samples/07-dotnet-agent-framework.md:5 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`notebook demonstrates enterprise-grade planning`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/07-planning-design/code_samples/07-dotnet-agent-framework.md:25 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Environment Configuration env file`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/07-planning-design/code_samples/07-dotnet-agent-framework.md:33 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Single File App implementation`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/07-planning-design/code_samples/07-dotnet-agent-framework.md:54 — "Configuring" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Configuring the`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/07-planning-design/code_samples/07-dotnet-agent-framework.md:56 — "Creating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Creating an`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/07-planning-design/code_samples/07-dotnet-agent-framework.md:63 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent uses C classes`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/07-planning-design/code_samples/07-dotnet-agent-framework.md:117 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/08-dotnet-agent-framework.md:5 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`enterprise-grade multi-agent systems using`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/08-dotnet-agent-framework.md:5 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agents working together through`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/08-dotnet-agent-framework.md:56 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`multi-agent workflow system creates`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/08-dotnet-agent-framework.md:56 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`hotel travel recommendation service`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/08-dotnet-agent-framework.md:59 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/08-dotnet-agent-framework.md:69 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`sample demonstrates type-safe agent coordination using`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/08-dotnet-agent-framework.md:75 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`agent responses using async enumerables`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/08-dotnet-agent-framework.md:78 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Shows production-ready patterns including`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md:5 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`accomplish complex tasks through`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md:16 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Chain multiple agent tasks`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md:17 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`data flow across workflow stages`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md:18 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Implement robust error recovery`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md:24 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Multi-step customer inquiry resolution`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md:31 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md:51 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Environment Setup env file`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md:80 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`data flow between workflow stages`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md:113 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md:154 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`travel destination request I`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md:155 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Front Desk agent provides`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md:164 — "Changing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Changing the`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.md:165 — "Adjusting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Adjusting the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md:16 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Implement validation checkpoints between workflow stages`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md:51 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Environment Setup env file`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md:88 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md:88 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Validation points between stages`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md:117 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md:117 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Validation checkpoints ensure quality`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md:122 — Modal + be + past participle. Use an active verb. (`can be optimized`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md:123 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`model resources across stages`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md:124 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`state transfer between stages`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md:129 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md:131 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Meet regulatory requirements through`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md:143 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`three-stage furniture analysis workflow`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md:158 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Maintains workflow continuity through state management`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/02.dotnet-agent-framework-workflow-ghmodel-sequential.md:190 — "Modify" → change (plain-word hint). (`Modify`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md:5 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`notebook demonstrates concurrent workflow patterns using`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md:12 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Coordinate multiple concurrent calls`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md:13 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`model resources across concurrent operations`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md:17 — Possible noun cluster of 7 words. Break it up with "of", "for" or a verb. (`Coordinate concurrent agents while avoiding race conditions`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md:19 — "stopping" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`without stopping the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md:19 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent failures without stopping`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md:24 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`large-scale data processing operations`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md:51 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Environment Setup env file`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md:97 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md:97 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Ensure data consistency across concurrent operations`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md:126 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Significant time reduction through parallel execution`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md:217 — "Modify" → change (plain-word hint). (`Modify`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md:234 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Multiple writers creating different sections`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md:235 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Multiple reviewers analyzing code`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md:259 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`N concurrent agents depending`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md:266 — Modal + be + past participle. Use an active verb. (`can be returned`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/03.dotnet-agent-framework-workflow-ghmodel-concurrent.md:271 — "Modify" → change (plain-word hint). (`Modify`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:5 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`workflow patterns using Microsoft Foundry`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:10 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Build complex decision trees`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:12 — "Modify" → change (plain-word hint). (`Modify`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:19 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`business rule engines within workflows`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:22 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:25 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:25 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Route content through appropriate review processes`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:55 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:59 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Environment Configuration env file`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:102 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`review context throughout workflow`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:135 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:137 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:153 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Maintain complex state across workflow execution`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:174 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Evaluates draft quality word count`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:208 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Content Reviewer evaluates draft quality`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:216 — "Modify" → change (plain-word hint). (`Modify`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:254 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:254 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Route applications through appropriate screening workflows`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:278 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:303 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Evangelist agent uses Bing grounding`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:316 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`workflow includes robust error handling`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:318 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Notifications provide clear rejection reasons`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.md:340 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`intelligent enterprise automation systems`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:7 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:11 — "planning" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, planning a`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:11 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:11 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:12 — Possible noun cluster of 7 words. Break it up with "of", "for" or a verb. (`primary assistant agent delegating tasks like scheduling`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:17 — Modal + be + past participle. Use an active verb. (`can be organized`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:17 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:21 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`workflow follows different paths`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:25 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`manage complex interactions between multiple agents`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:32 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`messages take between executors`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:33 — "managing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, managing the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:41 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`implement different workflow patterns using`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:54 — "suggesting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, suggesting a`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:122 — "adding" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by adding an`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:143 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:212 — Modal + be + past participle. Use an active verb. (`can be performed`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:294 — "allowing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, allowing the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:294 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`workflows introduce branching logic`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/code_samples/workflows-agent-framework/README.md:368 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Microsoft Agent Framework Workflow provides`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:14 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`singular agent doing multiple tasks`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:16 — Progressive tense (be + -ing). Use simple present. (`are interacting`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:36 — Modal + be + past participle. Use an active verb. (`can be divided`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:37 — Modal + be + past participle. Use an active verb. (`can be broken`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:37 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`different agents manage navigation`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:38 — "allowing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, allowing them`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:42 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:44 — Modal + be + past participle. Use an active verb. (`can be specialized`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:45 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:48 — "handling" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for handling all`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:50 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`different agents handling different aspects`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:58 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:58 — Progressive tense (be + -ing). Use simple present. (`are sharing`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:58 — Progressive tense (be + -ing). Use simple present. (`are sharing`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:58 — "meaning" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, meaning that`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:59 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:59 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:59 — Progressive tense (be + -ing). Use simple present. (`are coordinating`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:60 — Progressive tense (be + -ing). Use simple present. (`are making`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:61 — Progressive tense (be + -ing). Use simple present. (`are interacting`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:63 — Perfect tense. Use simple past or present. (`have not recommended`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:63 — "booking" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before booking a`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:67 — Progressive tense (be + -ing). Use simple present. (`are interacting`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:69 — Progressive tense (be + -ing). Use simple present. (`are interacting`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:89 — Modal + be + past participle. Use an active verb. (`can be implemented`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:119 — Modal + be + past participle. Use an active verb. (`can be used`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:119 — Progressive tense (be + -ing). Use simple present. (`is trying`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:119 — Vague word "quite". Give the exact condition, value or action. (`quite`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:119 — Vague word "a few". Give the exact condition, value or action. (`a few`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:123 — Modal + be + past participle. Use an active verb. (`could be involved`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:125 — "initiating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for initiating the`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:126 — "processing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for processing the`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:127 — "refunding" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for refunding the`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:128 — "resolving" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for resolving any`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:129 — "ensuring" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for ensuring that`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:133 — Modal + be + past participle. Use an active verb. (`can be used`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:135 — "shipping" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for shipping the`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:135 — Modal + be + past participle. Use an active verb. (`can be used`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:135 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:140 — "auditing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for auditing the`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:140 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:142 — "maintaining" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for maintaining a`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:143 — "ensuring" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for ensuring the`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:144 — "ensuring" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for ensuring the`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:146 — Modal + be + past participle. Use an active verb. (`can be used`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:146 — Vague word "quite". Give the exact condition, value or action. (`quite`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:146 — Vague word "a few". Give the exact condition, value or action. (`a few`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:150 — Modal + be + past participle. Use an active verb. (`can be used`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:150 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Consider both agents specific`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:166 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`support bot answers common questions using`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:167 — Modal + be + past participle. Use an active verb. (`must be coordinated`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:167 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`refund workflow needs separate fraud`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:168 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`simple classification request arrives thousands`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:172 — Vague word "usually". Give the exact condition, value or action. (`usually`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:174 — Modal + be + past participle. Use an active verb. (`can be handled`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:176 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`workflow requires separate roles`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:182 — Progressive tense (be + -ing). Use simple present. (`are interacting`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/README.md:182 — "including" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, including the`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution-quiz.md:5 — Vague word "usually". Give the exact condition, value or action. (`usually`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution-quiz.md:5 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution-quiz.md:9 — Vague word "usually". Give the exact condition, value or action. (`usually`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution-quiz.md:9 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution-quiz.md:9 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution-quiz.md:9 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution.md:3 — "initiating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for initiating the`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution.md:6 — "resolving" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for resolving any`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution.md:10 — "auditing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for auditing the`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution.md:10 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution.md:12 — "maintaining" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for maintaining a`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution.md:13 — "ensuring" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for ensuring the`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution.md:14 — "ensuring" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for ensuring the`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution.md:15 — "ensuring" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for ensuring that`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution.md:16 — "assist" → help (plain-word hint). (`assist`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/08-multi-agent/solution/solution.md:18 — Vague word "a few". Give the exact condition, value or action. (`a few`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:9 — "completing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`After completing this`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:11 — "improving" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for improving the`)
- **P2** `ste.phrasal_verb` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:18 — Phrasal verb "Check out". Try: examine. (`Check out`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:22 — Vague word "usually". Give the exact condition, value or action. (`usually`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:30 — "making" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, making it`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:30 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`agents become glass boxes offering transparency`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:37 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:38 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:38 — Modal + be + past participle. Use an active verb. (`can be used`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:38 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`mitigate issues like prompt injection`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:39 — "perform" → do (plain-word hint). (`perform`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:39 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`online evaluation inform offline experimentation`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:43 — Modal + be + past participle. Use an active verb. (`should be tracked`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:47 — Modal + be + past participle. Use an active verb. (`could be accelerated`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:47 — "using" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by using a`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:49 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.phrasal_verb` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:51 — Phrasal verb "set up". Try: prepare / install. (`set up`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:51 — "E.g." → for example (plain-word hint). (`E.g.`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:53 — Possible noun cluster of 7 words. Break it up with "of", "for" or a verb. (`User Feedback Implementing direct user evaluations provide`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:53 — Progressive tense (be + -ing). Use simple present. (`is not working`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:55 — Possible noun cluster of 12 words. Break it up with "of", "for" or a verb. (`Implicit User Feedback User behaviors provide indirect feedback even without explicit ratings`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:55 — Progressive tense (be + -ing). Use simple present. (`is not working`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:55 — "E.g." → for example (plain-word hint). (`E.g.`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:57 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:57 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.phrasal_verb` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:59 — Phrasal verb "set up". Try: prepare / install. (`set up`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:59 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:59 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:59 — "E.g." → for example (plain-word hint). (`E.g.`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:61 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`evaluation workflow looks like`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:65 — Modal + be + past participle. Use an active verb. (`can be captured`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:67 — Perfect tense. Use simple past or present. (`has emerged`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:69 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`wrap existing agent frameworks`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:69 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Microsoft Agent Framework integrates`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:82 — "demonstrate" → show (plain-word hint). (`demonstrate`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:84 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Span Creation While instrumentation libraries provides`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:100 — Modal + be + past participle. Use an active verb. (`can be improved`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:100 — Progressive tense (be + -ing). Use simple present. (`is performing`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:100 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Observability gives us metrics`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:104 — "deploying" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before deploying any`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:104 — Vague word "usually". Give the exact condition, value or action. (`usually`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:110 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:112 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`often done during development`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:112 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`get clear accuracy metrics since`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:114 — Progressive tense (be + -ing). Use simple present. (`is ensuring`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:114 — "perform" → do (plain-word hint). (`perform`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:120 — "i.e." → that is (plain-word hint). (`i.e.`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:120 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Online evaluation involves monitoring`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:124 — Vague word "possibly". Give the exact condition, value or action. (`possibly`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:124 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Online evaluation often involves collecting implicit`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:128 — Semicolon. Use two sentences. (`Online and offline evaluations are not mutually exclusive; they are highly complementary.`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:128 — Modal + be + past participle. Use an active verb. (`can be used`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:128 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:128 — "perform" → do (plain-word hint). (`perform`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:145 — Modal + be + past participle. Use an active verb. (`can be identified`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:145 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent workflow problems occur`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:151 — "perform" → do (plain-word hint). (`perform`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:151 — "building" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, building an`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:151 — "perform" → do (plain-word hint). (`perform`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:151 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`performance vs larger models`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:151 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`simpler tasks like intent classification`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:151 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`while reserving larger models`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:153 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`help reduce costs while`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/10-ai-agents-production/README.md:155 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Responses Identifying common requests`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:3 — Semicolon. Use two sentences. (`> TL;DR - Can You Build Agent2Agent Communication on MCP?`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:5 — Perfect tense. Use simple past or present. (`has evolved`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:5 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`complex agent-to-agent communication systems`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:9 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:9 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:9 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:11 — Perfect tense. Use simple past or present. (`has been`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:13 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Real-time progress updates during execution`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:15 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:15 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:16 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:16 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`input mid-execution via elicitation`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:18 — Modal + be + past participle. Use an active verb. (`can be composed`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:26 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:42 — Semicolon. Use two sentences. (`<div align="center" style="font-style: italic; font-size: 0.95em; margin-bottom: 0.5em;">`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:43 — "enabling" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, enabling the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:43 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`agent streams real-time progress updates`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:69 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`left off message redelivery`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:71 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`transport today supports session resumption`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:78 — Semicolon. Use two sentences. (`<div align="center" style="font-style: italic; font-size: 0.95em; margin-bottom: 0.5em;">`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:79 — "continuing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, continuing the`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:106 — Modal + be + past participle. Use an active verb. (`can be retrieved`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:107 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Progress tracking across sessions`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:117 — Vague word "as needed". Give the exact condition, value or action. (`as needed`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:119 — Semicolon. Use two sentences. (`<div align="center" style="font-style: italic; font-size: 0.95em; margin-bottom: 0.5em;">`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:120 — "ensure" → make sure → verify (plain-word hint). (`ensure`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:147 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:153 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:159 — Semicolon. Use two sentences. (`<div align="center" style="font-style: italic; font-size: 0.95em; margin-bottom: 0.5em;">`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:187 — Modal + be + past participle. Use an active verb. (`can be composed`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:191 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:191 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`price confirmation via elicitation`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:192 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:194 — "demonstrate" → show (plain-word hint). (`demonstrate`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:194 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Both agents demonstrate real-time progress updates`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:194 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`full session resumption capabilities`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:202 — Possible noun cluster of 7 words. Break it up with "of", "for" or a verb. (`provide real-time progress updates during long-running tasks`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:204 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Server Implementation agent sends progress notifications`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:227 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Client Implementation host receives progress updates`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:248 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`request user input mid-execution`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:248 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`approvals during long-running tasks`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:250 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Server Implementation agent requests confirmation`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:268 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Client Implementation host provides elicitation callback`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:298 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`content generation during execution`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:300 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Server Implementation agent requests`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:321 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Client Implementation host provides sampling callback`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:352 — Possible noun cluster of 7 words. Break it up with "of", "for" or a verb. (`Event Store Implementation server holds session state`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:408 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Resumption Token client reconnects using`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:440 — "enabling" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, enabling it`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:440 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`host application maintains session`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:440 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`sessions without losing progress`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:444 — Semicolon. Use two sentences. (`<div align="center" style="font-style: italic; font-size: 0.95em; margin-bottom: 0.5em;">`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:466 — "demonstrate" → show (plain-word hint). (`demonstrate`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:468 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Event store implementation enabling session resumption`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:472 — Modal + be + past participle. Use an active verb. (`can be extended`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:472 — "enhancing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by enhancing the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:474 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Host analyzes complex user requests`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:476 — Possible noun cluster of 8 words. Break it up with "of", "for" or a verb. (`Host tracks progress across multiple concurrent agent tasks`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:480 — "maintaining" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`while maintaining the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:480 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent capabilities while maintaining`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:484 — Possible noun cluster of 7 words. Break it up with "of", "for" or a verb. (`complex agent-to-agent interactions while maintaining protocol simplicity`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:502 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:502 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`price confirmation via elicitation`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:503 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:511 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.phrasal_verb` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:517 — Phrasal verb "Check out". Try: examine. (`Check out`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:521 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`enables intelligent agent behaviors while maintaining`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:523 — Progressive tense (be + -ing). Use simple present. (`is evolving`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/11-agentic-protocols/code_samples/mcp-agents/README.md:523 — Semicolon. Use two sentences. (`Overall, the MCP protocol spec is evolving rapidly; the reader is encouraged to review the official documentation website for the most recent updates - URL`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:4 — "discussing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`When discussing the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:22 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Implements memory using Mem`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:28 — "completing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`After completing this`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:32 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`agents using Microsoft Agent Framework`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:34 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`robust memory management systems contribute`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:40 — "meaning" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, meaning each`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:44 — "utilize" → use (plain-word hint). (`utilize`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:62 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`key elements like requirements`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:70 — "allowing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, allowing the`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:72 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:74 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Short Term Memory Example`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:76 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent knows there refers`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:80 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`persists across multiple conversations`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:82 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Long Term Memory Example`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:84 — "making" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, making them`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:84 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`future travel planning sessions`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:91 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`expert ski planner persona memory`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:95 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`like remembering specific episodes`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:99 — "allowing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, allowing the`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:99 — "attempt" → try (plain-word hint). (`attempt`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:103 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`specific entities like people`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:107 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`extract Paris Eiffel Tower`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:107 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Le Chat Noir restaurant`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:107 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`recall Le Chat Noir`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:115 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`parse flight details destination`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:115 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`allows precise queries like`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:127 — "storing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, storing them`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:127 — "Subsequently" → then / after (plain-word hint). (`Subsequently`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:127 — "modify" → change (plain-word hint). (`modify`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:131 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`dual-store architecture combining vector similarity search`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:133 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`system maintains living memory`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:133 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`both short-term session context`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:135 — "visualizing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, visualizing the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:139 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`memory tools like Mem`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:139 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`leverage robust search services like Azure`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:141 — Modal + be + past participle. Use an active verb. (`can be used`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:141 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`store user-specific travel memories`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:143 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Search supports capabilities like`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:143 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`datasets like conversation histories`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:153 — Modal + be + past participle. Use an active verb. (`can be retrieved`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:155 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`knowledge agent retrieves relevant`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:159 — Modal + be + past participle. Use an active verb. (`can be used`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/13-agent-memory/README.md:161 — Modal + be + past participle. Use an active verb. (`can be moved`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:10 — "Exploring" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Exploring the`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:15 — "completing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`After completing this`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:17 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Agents using Microsoft Agent Framework`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:23 — Modal + be + past participle. Use an active verb. (`can be found`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:37 — Perfect tense. Use simple past or present. (`has included`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:39 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Agent including tool invocation`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:39 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`performance monitoring through Microsoft Foundry dashboards`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:40 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`includes security controls such`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:41 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`enables longer running process`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:46 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`across multiple different clouds`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:47 — Modal + be + past participle. Use an active verb. (`can be created`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:48 — "utilize" → use (plain-word hint). (`utilize`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:49 — Modal + be + past participle. Use an active verb. (`can be made`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:61 — "defining" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by defining the`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:68 — Modal + be + past participle. Use an active verb. (`can be created`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:114 — "completing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for completing a`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:118 — Modal + be + past participle. Use an active verb. (`can be defined`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:118 — "defining" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`when defining the`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:130 — "running" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`when running the`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:139 — Modal + be + past participle. Use an active verb. (`can be created`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:142 — "Creating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Creating a`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:142 — "running" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`when running an`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:174 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Agent middleware enables us`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:178 — Progressive tense (be + -ing). Use simple present. (`be calling`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:178 — Modal + be + past participle. Use an active verb. (`would be used`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:180 — Modal + be + past participle. Use an active verb. (`should be called`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:202 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`contains important information such`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:223 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:237 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`conversation history across different sessions`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:256 — Modal + be + past participle. Use an active verb. (`can be stored`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:296 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`allow better control flow`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:302 — "perform" → do (plain-word hint). (`perform`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:308 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Simple one-to-one connections between executors`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:321 — Modal + be + past participle. Use an active verb. (`will be handled`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:342 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Chain multiple middleware handlers logging`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:343 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`resume long-running agent processes`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:344 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`relevant tools per query`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:423 — Semicolon. Use two sentences. (`If your graph is compiled with a LangGraph checkpointer, Foundry keys conversation state to the checkpoint (use a durable checkpointer in production; CODE is fi`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:423 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Foundry keys conversation state`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:425 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Foundry Project Manager role`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:427 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`full walkthrough Invocations protocol`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/14-microsoft-agent-framework/README.md:431 — Modal + be + past participle. Use an active verb. (`can be found`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:5 — Perfect tense. Use simple past or present. (`have built`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:7 — "building" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by building a`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:7 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`gap using Microsoft Foundry`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:7 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Microsoft Foundry Agent Service`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:18 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Cost optimisation through model selection`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:23 — "completing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`After completing this`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:26 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Microsoft Foundry Agent Service`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:33 — Perfect tense. Use simple past or present. (`have completed`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:48 — Semicolon. Use two sentences. (`The model is maybe 20% of a production agent; the other 80% is the operational skeleton.`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:48 — Vague word "maybe". Give the exact condition, value or action. (`maybe`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:68 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent object lives inside`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:68 — Semicolon. Use two sentences. (`Your code calls the model provider directly; the reasoning loop runs in your service.`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:68 — Perfect tense. Use simple past or present. (`has done`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:70 — Progressive tense (be + -ing). Use simple present. (`are embedding`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:82 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Microsoft Agent Framework Workflows capability`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:84 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:85 — Semicolon. Use two sentences. (`**Trade-off**: more moving parts; needs orchestration-level observability.`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:106 — "Deploying" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Deploying an`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:106 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`software release cycle because`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:120 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`feeds real-world failures back`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:124 — "Scaling" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Scaling an`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:130 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Response caching Many support queries`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:130 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`I reset my password`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:130 — "hitting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`without hitting the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:130 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`serve them without hitting`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:130 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`modest cache hit rate`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:148 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Microsoft Agent Framework emits`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:150 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`single customer complaint end-to-end across`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:171 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:181 — "deleting" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, deleting an`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:181 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Microsoft Agent Framework supports`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:181 — Semicolon. Use two sentences. (`You saw the primitive in [Lesson 6](../06-building-trustworthy-agents/README.md); here you deploy it.`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:212 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Contoso customer support agent`)
- **P2** `ste.phrasal_verb` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:214 — Phrasal verb "look up". Try: find. (`look up`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:266 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`evaluation gate above runs offline against`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:270 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`ready-to-use smoke-test pipeline built`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:273 — "failing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, failing the`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:284 — "supplying" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, supplying your`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:303 — Progressive tense (be + -ing). Use simple present. (`are willing`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:303 — Progressive tense (be + -ing). Use simple present. (`are embedding`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:319 — Progressive tense (be + -ing). Use simple present. (`is guessing`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:327 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:338 — Vague word "usually". Give the exact condition, value or action. (`usually`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:351 — Semicolon. Use two sentences. (`Without attributes you have a wall of spans; with them you can ask "are enterprise customers being routed to the small model too often?" or "which model handles`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:356 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`subscription billing support agent`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:360 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:373 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`online observability feeds failures back`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/16-deploying-scalable-agents/README.md:376 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`production-ready customer support agent`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:13 — Progressive tense (be + -ing). Use simple present. (`are trading`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:13 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:20 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`serves models on-device through`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:27 — "completing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`After completing this`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:29 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:37 — Perfect tense. Use simple past or present. (`have completed`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:45 — Semicolon. Use two sentences. (`A developer workstation. **8 GB RAM is a realistic minimum**; 16 GB+ is comfortable.`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:51 — Vague word "a few". Give the exact condition, value or action. (`a few`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:51 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`difference sets clear expectations`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:62 — Perfect tense. Use simple past or present. (`have seen`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:80 — Semicolon. Use two sentences. (`Everything you learned about building agents transfers directly; only the endpoint moves from the cloud to CODE.`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:98 — Progressive tense (be + -ing). Use simple present. (`is running`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:98 — Vague word "typically". Give the exact condition, value or action. (`typically`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:154 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:154 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`robust design falls back`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:171 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:171 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`via Qwen function calling through Foundry`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:172 — "Perform" → do (plain-word hint). (`Perform`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:181 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent code looks almost`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:214 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`forbid sending data off-device`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:222 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`heavy lifting reading files`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:222 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`decisions like tool selection`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:225 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`reuse cloud agent code`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:233 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:233 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Qwen function-calling model rather`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:238 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`produce consistent tool calls`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:254 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:254 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`single project directory rather`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:262 — Semicolon. Use two sentences. (`Route sensitive or offline requests to the local SLM; route simple bounded tasks to the local SLM for speed and cost; route hard multi-hop reasoning on non-sens`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:262 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`route hard multi-hop reasoning`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:265 — "running" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for running the`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:270 — Semicolon. Use two sentences. (`Around **8 GB** is a realistic minimum; 16 GB+ is comfortable.`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:290 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:291 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`serves models on-device behind`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:291 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`cloud agent code transfers`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:293 — "leaving" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`without leaving the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/17-creating-local-ai-agents/README.md:293 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent capability without leaving`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/18-securing-ai-agents/code_samples/sample_receipts/README.md:3 — "running" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`without running the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/code_samples/sample_receipts/README.md:17 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`notebook walks through verification`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/18-securing-ai-agents/code_samples/sample_receipts/README.md:51 — "Reading" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Reading the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/code_samples/sample_receipts/README.md:51 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`raw receipt format builds intuition`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/18-securing-ai-agents/code_samples/sample_receipts/README.md:55 — Semicolon. Use two sentences. (`The signature does not encrypt the content; it attests to it.`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/code_samples/sample_receipts/README.md:56 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`auditor needs nothing else`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/18-securing-ai-agents/code_samples/sample_receipts/README.md:58 — Semicolon. Use two sentences. (`issuer; see the lesson README on identity infrastructure).`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/18-securing-ai-agents/code_samples/sample_receipts/README.md:59 — "Modifying" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Modifying a`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:3 — "matching" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, matching the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:3 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Microsoft content team post-merge`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:20 — "completing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`After completing this`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:31 — Perfect tense. Use simple past or present. (`have deployed`)
- **P2** `ste.phrasal_verb` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:31 — Phrasal verb "look up". Try: find. (`look up`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:31 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`agent reads customer requests`)
- **P2** `ste.phrasal_verb` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:35 — Phrasal verb "hand over". Try: give. (`hand over`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:43 — "requiring" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`without requiring the`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:45 — "making" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by making each`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:95 — Perfect tense. Use simple past or present. (`has not changed`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:100 — Vague word "a few". Give the exact condition, value or action. (`a few`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:193 — "Producing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Producing a`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:215 — "Modify" → change (plain-word hint). (`Modify`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:215 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`field breaks receipt s signature`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:222 — "Building" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Building a`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:223 — "Verifying" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`Verifying that`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:235 — Perfect tense. Use simple past or present. (`has not changed`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:240 — Modal + be + past participle. Use an active verb. (`can be signed`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:241 — Perfect tense. Use simple past or present. (`have permitted`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:242 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:242 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`organization requires separate identity infrastructure`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:248 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:254 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:256 — Semicolon. Use two sentences. (`A named approver signs the **full canonical action and its digest** before execution; the agent's action receipt carries the **same action digest** and a CODE, `)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:256 — Possible noun cluster of 7 words. Break it up with "of", "for" or a verb. (`key registries approver keys vs agent keys`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:258 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:260 — Semicolon. Use two sentences. (`the classic set: tampering, confused deputy, replay, forged keys on either side, malformed input;`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:261 — Semicolon. Use two sentences. (`**stale authority**: a signature that still verifies, refused anyway because the policy version moved, the approver key was rotated out of the pinned registry, `)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:264 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`whether authority went stale`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:264 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`both receipts still bind`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:268 — Progressive tense (be + -ing). Use simple present. (`is happening`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:270 — Vague word "sufficient". Give the exact condition, value or action. (`sufficient`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:270 — "sufficient" → enough (plain-word hint). (`sufficient`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:272 — Vague word "Several". Give the exact condition, value or action. (`Several`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:272 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:274 — Semicolon. Use two sentences. (`The Microsoft Agent Governance Toolkit composes receipts with Cedar-based policy decisions; see Tutorial 33 in that repository for an end-to-end example.`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:274 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`Microsoft Agent Governance Toolkit composes receipts`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:275 — "wrapping" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`for wrapping any`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:275 — "including" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, including a`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:276 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:278 — Semicolon. Use two sentences. (`The decision between rolling your own and using a library mirrors the decision between writing your own JWT library and using a tested one: both are reasonable;`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:278 — Vague word "reasonable". Give the exact condition, value or action. (`reasonable`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:297 — "modifying" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`; modifying any`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:297 — Semicolon. Use two sentences. (`The signature was computed over the canonical bytes of the original payload; modifying any field changes those bytes, which makes the signature invalid.`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:300 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:305 — Semicolon. Use two sentences. (`Hashing keeps the receipt small and the content private; the auditor verifies that the hash matches a separately-stored copy of the actual content.`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:305 — Semicolon. Use two sentences. (`Second, hashes have a fixed size; a receipt with hashes is bounded in size regardless of how large the inputs and outputs were.`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:321 — Perfect tense. Use simple past or present. (`has not changed`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:333 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:333 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`receipt still round-trips through verification`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:333 — "modify" → change (plain-word hint). (`modify`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:335 — "signing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`before signing it`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:343 — Modal + be + past participle. Use an active verb. (`can be archived`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:343 — Semicolon. Use two sentences. (`**Portable**: a receipt is a small JSON file; it can be archived, transmitted, and verified anywhere.`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:346 — Progressive tense (be + -ing). Use simple present. (`are deploying`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:355 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`verification public key Auditors`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:355 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:356 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`latest chain head hash`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:356 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`transparency log Sigstore Rekor`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:357 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`blob storage Azure Storage`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:358 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:358 — Possible noun cluster of 7 words. Break it up with "of", "for" or a verb. (`retention Many compliance regimes require multi-year retention`)
- **P2** `ste.semicolon` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:358 — Semicolon. Use two sentences. (`Plan for receipt growth (each receipt is ~500 bytes; an agent making 10K calls per day produces ~1.8 GB per year).`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:358 — Possible noun cluster of 7 words. Break it up with "of", "for" or a verb. (`agent making K calls per day produces`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:359 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`cover Receipts prove attribution`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:359 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:367 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`lesson covers single-receipt signing`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:367 — Vague word "several". Give the exact condition, value or action. (`several`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:369 — "exposing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`without exposing them`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:372 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`receipt seals whatever bytes`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:372 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`pre-decision reasoning model prediction`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:372 — Possible noun cluster of 6 words. Break it up with "of", "for" or a verb. (`while letting payload schemas evolve domain-by-domain`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:373 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Cross-implementation conformance Multiple independent implementations`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/18-securing-ai-agents/README.md:373 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`vectors confirms wire compatibility`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/AGENTS.md:11 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Microsoft Foundry Agent Service V`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/AGENTS.md:15 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`code samples Jupyter notebooks`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/AGENTS.md:16 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/AGENTS.md:17 — Possible noun cluster of 8 words. Break it up with "of", "for" or a verb. (`Python notebook per lesson using Microsoft Agent Framework`)
- **P2** `ste.phrasal_verb` microsoft__ai-agents-for-beginners/AGENTS.md:47 — Phrasal verb "Set up". Try: prepare / install. (`Set up`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/AGENTS.md:56 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Microsoft Foundry project endpoint`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/AGENTS.md:57 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/AGENTS.md:69 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`lesson contains multiple Jupyter notebooks`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/AGENTS.md:76 — "e.g." → for example (plain-word hint). (`e.g.`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/AGENTS.md:79 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Microsoft Agent Framework Python`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/AGENTS.md:86 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Agent Service V agents`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/AGENTS.md:92 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/AGENTS.md:123 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/AGENTS.md:123 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`repo ships smoke-test catalogs`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/AGENTS.md:123 — "complementing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, complementing the`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/AGENTS.md:139 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`notebook execution order linear cell`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/AGENTS.md:160 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/AGENTS.md:183 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`cells execute without errors`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/AGENTS.md:184 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/AGENTS.md:189 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/AGENTS.md:189 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Ensure markdown cells explain`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/AGENTS.md:194 — "demonstrate" → show (plain-word hint). (`demonstrate`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/AGENTS.md:217 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.hedge` microsoft__ai-agents-for-beginners/AGENTS.md:228 — Vague word "rather". Give the exact condition, value or action. (`rather`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/AGENTS.md:229 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/AGENTS.md:229 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/AGENTS.md:232 — "require" → need (plain-word hint). (`require`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/AGENTS.md:234 — "Ensure" → make sure → verify (plain-word hint). (`Ensure`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/AGENTS.md:249 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Microsoft Foundry Agent Service V`)
- **P2** `ste.word_hint` microsoft__ai-agents-for-beginners/AGENTS.md:265 — "additional" → more (plain-word hint). (`additional`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/AGENTS.md:276 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Actions workflow handles translation updates`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/AGENTS.md:300 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Code development container configuration`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/AGENTS.md:311 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Model Context Protocol support`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/tests/lesson-01-smoke-tests.json:6 — Modal + be + past participle. Use an active verb. (`should be redirected`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/tests/lesson-04-smoke-tests.json:6 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`get me flight information`)
- **P2** `ste.noun_cluster` microsoft__ai-agents-for-beginners/tests/lesson-16-smoke-tests.json:1 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Contoso customer support agent built`)
- **P2** `ste.complex_tense` microsoft__ai-agents-for-beginners/tests/lesson-16-smoke-tests.json:2 — Modal + be + past participle. Use an active verb. (`should be answered`)
- **P2** `ste.ing_verb` microsoft__ai-agents-for-beginners/tests/lesson-16-smoke-tests.json:11 — "repeating" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`without repeating it`)

## 5. Labs tool runs

- Agent Health Checker · microsoft__ai-agents-for-beginners/tests/lesson-01-smoke-tests.json · score 38 · Shippable prototype, not production-ready.
- Agent Health Checker · microsoft__ai-agents-for-beginners/tests/lesson-04-smoke-tests.json · score 38 · Shippable prototype, not production-ready.
- Agent Health Checker · microsoft__ai-agents-for-beginners/tests/lesson-05-smoke-tests.json · score 38 · Shippable prototype, not production-ready.
- Agent Health Checker · microsoft__ai-agents-for-beginners/tests/lesson-16-smoke-tests.json · score 40 · Shippable prototype, not production-ready.
- Observability Gap Finder · (whole input) · score 84 · Strong signals — verify collectors actually receive data.

