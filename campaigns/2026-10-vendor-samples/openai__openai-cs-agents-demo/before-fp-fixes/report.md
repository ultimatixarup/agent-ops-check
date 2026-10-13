# Agent ops audit memo (self-run)

_Generated locally by agent-ops-check 0.1.0 on 2026-10-13T08:09:38.878Z. No network calls were made. Nothing left this machine._

> Heuristic regex and static checks, not a security audit. It can miss problems and can flag harmless code.

Rules 2026.10.13 (2026-10-13). Rules are 0 day(s) old.

**Overall score:** 41/100 · files scanned: 38 · agents: openai__openai-cs-agents-demo, python-backend, ui

| Area | Score | High | Medium | Low |
|---|---|---|---|---|
| Personal-to-work data crossover | 100 | 0 | 0 | 0 |
| Irreversible actions | 0 | 5 | 28 | 0 |
| Governance + cost | 23 | 1 | 15 | 7 |
| Agent Health Checker + Labs tools | 97 | 0 | 0 | 3 |
| Prompt-injection scan (ADSF) | 80 | 2 | 0 | 0 |
| Simplified Technical English (STE) | 36 | 0 | 12 | 16 |

## 1. Agent and connector inventory

| Agent | Connectors | Credentials (names only) | Scopes |
|---|---|---|---|
| openai__openai-cs-agents-demo | - | - | - |
| python-backend | - | - | - |
| ui | tax_paths | NEXT_PUBLIC_CHATKIT_DOMAIN_KEY | - |

### Source-to-sink matrix (personal data → work destinations)

No agent both reads a personal source and writes to a work sink.

## 2. Human-in-the-loop gate map

| Agent | Action | Where | Approval | Dry-run | Rate limit | Domain allowlist |
|---|---|---|---|---|---|---|
| python-backend | `book_new_flight` | openai__openai-cs-agents-demo/python-backend/airline/tools.py:208 | **no** | **no** | **no** | yes |
| python-backend | `cancel_flight` | openai__openai-cs-agents-demo/python-backend/airline/tools.py:342 | **no** | **no** | **no** | yes |
| python-backend | `delete_thread` | openai__openai-cs-agents-demo/python-backend/memory_store.py:89 | **no** | **no** | **no** | yes |
| python-backend | `delete_thread_item` | openai__openai-cs-agents-demo/python-backend/memory_store.py:148 | **no** | **no** | **no** | yes |
| python-backend | `delete_attachment` | openai__openai-cs-agents-demo/python-backend/memory_store.py:173 | **no** | **no** | **no** | yes |

## 3. AI inventory

- Providers: openai
- Frameworks/SDKs: openai_agents
- Models: `gpt-5.2`, `gpt-4.1-mini`

## STE (Simplified Technical English) style

_Style checks inspired by ASD-STE100 writing rules. Not a certified ASD-STE100 checker; no specification text or dictionary is included._

- openai__openai-cs-agents-demo/README.md: 88 sentences, 28 findings
- openai__openai-cs-agents-demo/python-backend/requirements.txt: 0 sentences, 0 findings

## Document-wide prompt-injection scan (ADSF)

_Regex and Unicode checks over every file. It flags suspicious content; a clean result does not prove a file is safe._

38 files scanned, 2 findings.

## Standards map (maps to, not compliance)

✅ covered by a check · 🟡 partly · ⬜ not checked. Numbers = findings in this scan that map to the item.

### Anthropic / Claude agent guidance (summarized)

_Practices summarized from Anthropic's public docs and engineering posts on building and securing agents._ (7 ✅ · 1 🟡 · 0 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| AN-CONFIRM Ask a human before consequential or irreversible actions | ✅ | 33 (5 high) | Gate map |
| AN-LEASTPRIV Least-privilege tools and credentials | ✅ | 27 | Shared tokens, reach, wildcards |
| AN-UNTRUSTED Treat tool results and web/doc content as untrusted (prompt injection) | ✅ | 2 (2 high) | Injection scan |
| AN-SANDBOX Run in a sandbox / isolated environment | 🟡 | - | Real browser profile use |
| AN-PROMPT Clear system prompt with explicit constraints | ✅ | 29 | Deny-list check, STE clarity |
| AN-EVALS Build evaluations with test cases | ✅ | - | Generates functional + security eval sets (not run) |
| AN-LIMITS Limit cost and steps | ✅ | 9 | Caps and budgets |
| AN-OBSERVE Log and monitor agent actions | ✅ | 2 | Tracing |

### Microsoft Copilot Studio governance areas (summarized)

_Areas summarized from Microsoft's public documentation. This tool scans exported agent files/configs only; it does not read your tenant._ (2 ✅ · 5 🟡 · 2 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| CS-DLP Data policies for connectors | 🟡 | - | Source-to-sink reach in exported configs |
| CS-AUTH Agent authentication | 🟡 | - | Credentials in files |
| CS-SHARE Maker permissions and sharing | ⬜ | - | Not checked (tenant setting) |
| CS-ENV Environment strategy (dev/test/prod) | ⬜ | - | Not checked |
| CS-AUDIT Audit logging and monitoring | 🟡 | 2 | Tracing references |
| CS-KNOW Knowledge sources for generative answers | 🟡 | 2 (2 high) | Injection scan over knowledge files you point it at |
| CS-MOD Content moderation and instructions | 🟡 | 2 (2 high) | Prompt checks |
| CS-HANDOFF Escalation / human handoff | ✅ | - | Handoff rules and transcripts |
| CS-ACTIONS Actions and flows that change data | ✅ | 33 (5 high) | Gate map |

### CSA AI Controls Matrix (AICM) domains

_Domain names only._ (3 ✅ · 9 🟡 · 6 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| A&A Audit & Assurance | 🟡 | - | Audit memo + SARIF |
| AIS Application & Interface Security | 🟡 | 35 (7 high) | Gates, injection |
| BCR Business Continuity & Operational Resilience | 🟡 | - | Single-LLM fallback |
| CCC Change Control & Configuration | 🟡 | 3 | Pinning, review record |
| CEK Cryptography, Encryption & Key Management | 🟡 | - | Hardcoded keys |
| DCS Datacenter Security | ⬜ | - | Not checked |
| DSP Data Security & Privacy Lifecycle | ✅ | - | PII, secrets, data paths |
| GRC Governance, Risk & Compliance | 🟡 | 1 | Owner, inventory |
| HRS Human Resources | ⬜ | - | Not checked |
| IAM Identity & Access Management | ✅ | - | Shared credentials, scopes, profiles |
| IPY Interoperability & Portability | ⬜ | - | Not checked |
| I&S Infrastructure Security | ⬜ | - | Not checked |
| LOG Logging & Monitoring | ✅ | 5 | Tracing, observability gaps |
| MDS Model Security | 🟡 | 4 (2 high) | Injection, pinning |
| SEF Security Incident Management & Forensics | ⬜ | - | Not checked |
| STA Supply Chain, Transparency & Accountability | 🟡 | 23 (1 high) | Inventory, disclosure |
| TVM Threat & Vulnerability Management | 🟡 | 35 (7 high) | Static findings |
| UEM Universal Endpoint Management | ⬜ | - | Not checked |

### EU AI Act basics (selected articles)

_Selected articles for orientation. Not legal advice; maps to, not compliant with._ (3 ✅ · 4 🟡 · 2 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| Art.4 AI literacy | ⬜ | - | Not checked |
| Art.5 Prohibited practices | ⬜ | - | Not checked |
| Art.9 Risk management system (high-risk) | 🟡 | - | Audit memo is an input |
| Art.10 Data and data governance | 🟡 | - | Personal data in agent files |
| Art.12 Record-keeping (logging) | ✅ | 5 | Tracing/logging checks |
| Art.13 Transparency and information to deployers | 🟡 | 1 | Owner docs |
| Art.14 Human oversight | ✅ | 33 (5 high) | Approval gates, handoff |
| Art.15 Accuracy, robustness and cybersecurity | 🟡 | 2 (2 high) | Injection, secrets, grounding |
| Art.50 Transparency: tell people they are talking to AI | ✅ | - | Bot disclosure checks |

### ISO/IEC 42001:2023 Annex A control areas

_Annex A area names only (the standard text is copyrighted and not included). Maps to, not compliant with._ (2 ✅ · 6 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| A.2 Policies related to AI | ⬜ | - | Not checked |
| A.3 Internal organization (roles, responsibilities) | 🟡 | 1 | Owner/maintainer recorded |
| A.4 Resources for AI systems (inventory of tools, data, compute) | ✅ | 23 (1 high) | AI and connector inventory |
| A.5 Assessing impacts of AI systems | 🟡 | - | Audit memo is a starting input |
| A.6 AI system life cycle (verification, deployment, operation, monitoring) | 🟡 | 7 | Tracing, pinning; generated eval sets |
| A.7 Data for AI systems | 🟡 | - | Personal data reach |
| A.8 Information for interested parties | 🟡 | - | Bot disclosure |
| A.9 Use of AI systems (responsible use, human oversight) | ✅ | 33 (5 high) | Approval gates, handoff rules |
| A.10 Third-party and customer relationships | 🟡 | 23 (1 high) | Provider inventory |

### MITRE ATLAS (selected techniques)

_Selected agent techniques; IDs/names per ATLAS data (via framework-pitch research)._ (9 ✅ · 4 🟡 · 0 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| AML.T0051 LLM Prompt Injection (direct and indirect) | ✅ | 2 (2 high) | Injection scan + untrusted-input rules + eval cases |
| AML.T0054 LLM Jailbreak | 🟡 | - | Obeyed overrides in transcripts; jailbreak eval cases |
| AML.T0056 LLM Meta Prompt Extraction | ✅ | - | Secrets in prompts, leaks in transcripts |
| AML.T0057 LLM Data Leakage | ✅ | - | Personal-to-work paths, other customers' data |
| AML.T0053 AI Agent Tool Invocation | ✅ | 33 (5 high) | Tool gates and credential sharing |
| AML.T0034 Cost Harvesting | ✅ | 7 (1 high) | Caps and budgets |
| AML.T0029 Denial of ML Service | 🟡 | 6 | Timeouts and step caps |
| AML.T0055 Unsecured Credentials | ✅ | - | Hardcoded secrets |
| AML.T0010 ML Supply Chain Compromise | 🟡 | 2 | Pinning only |
| AML.T0083 Credentials from AI Agent Configuration | ✅ | - | Secrets in agent/MCP configs, .env present |
| AML.T0086 Exfiltration via AI Agent Tool Invocation | ✅ | - | Source-to-sink paths, hardcoded webhooks, exfil instructions/links in docs |
| AML.T0101 Data Destruction via AI Agent Tool Invocation | ✅ | 5 (5 high) | Ungated delete/drop/destroy/purge tools |
| AML.T0100 AI Agent Clickbait | 🟡 | 27 | Browser writes, shorteners, allowlists |

### NIST AI RMF 1.0 (functions) + Generative AI Profile (NIST AI 600-1) risks

_Function names from AI RMF 1.0; risk names from the GenAI Profile. This tool supports a few outcomes; it does not implement the framework._ (4 ✅ · 6 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| GOVERN Govern: policies, accountability, oversight | 🟡 | 2 | Owner and review records; AI inventory |
| MAP Map: context, components, third parties | ✅ | 23 (1 high) | AI inventory (providers, SDKs, models), connector inventory and source-to-sink map |
| MEASURE Measure: test and evaluate | 🟡 | 5 | Generates eval sets (functional + security) from the source; does not run them |
| MANAGE Manage: prioritize and respond to risks | 🟡 | - | P0–P2 audit memo and SARIF for CI; no incident workflow |
| GAI-Confabulation GenAI risk: Confabulation | 🟡 | - | Grounding rule checks |
| GAI-DataPrivacy GenAI risk: Data Privacy | ✅ | - | PII, secrets, personal-to-work paths |
| GAI-HumanAI GenAI risk: Human-AI Configuration | ✅ | 33 (5 high) | Approval gates, disclosure, handoff |
| GAI-InfoIntegrity GenAI risk: Information Integrity | 🟡 | - | FAQ grounding; STE information-loss compare |
| GAI-InfoSecurity GenAI risk: Information Security | ✅ | 2 (2 high) | Injection scan, secrets, token lifting |
| GAI-ValueChain GenAI risk: Value Chain and Component Integration | 🟡 | 2 | Provider/SDK/model inventory and pinning |
| GAI-Harmful GenAI risks: CBRN, violent/hateful, obscene, bias, IP, environmental | ⬜ | - | Not checked |

### OWASP Top 10 for Agentic Applications 2026 (ASI01–ASI10)

_Item names as listed in the OWASP GenAI Security Project document (via framework-pitch research)._ (3 ✅ · 6 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| ASI01 Agent Goal Hijack | ✅ | 3 (2 high) | ADSF injection scan over all docs, untrusted-input rule, deny-list check |
| ASI02 Tool Misuse and Exploitation | ✅ | 33 (5 high) | Gate map, rate limits, allowlists, wildcard domains, URL shorteners |
| ASI03 Identity and Privilege Abuse | ✅ | - | Shared credentials, scopes, browser profiles, cookie reads |
| ASI04 Agentic Supply Chain Vulnerabilities | 🟡 | 2 | MCP/provider inventory, unpinned models; no registry integrity check |
| ASI05 Unexpected Code Execution | 🟡 | - | Free-form shell/exec/SQL tools |
| ASI06 Memory and Context Poisoning | 🟡 | 2 (2 high) | ADSF scan of knowledge/memory files you point it at; no runtime memory check |
| ASI07 Insecure Inter-Agent Communication | ⬜ | - | Not checked |
| ASI08 Cascading Failures | 🟡 | 10 (1 high) | Step, loop and retry caps, timeouts, single-provider fallback |
| ASI09 Human-Agent Trust Exploitation | 🟡 | - | Bot disclosure, human claims, unrecorded handoffs |
| ASI10 Rogue Agents | 🟡 | 6 | Tracing, owner, observability; no stop-switch check |

### OWASP Agentic AI – Threats and Mitigations (T1–T15)

_Threat names from the OWASP Agentic Security Initiative taxonomy._ (5 ✅ · 7 🟡 · 3 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| T1 Memory Poisoning | 🟡 | 2 (2 high) | Hidden instructions in files an agent may load as memory/knowledge |
| T2 Tool Misuse | ✅ | 33 (5 high) | Gate map: approval, dry-run, rate limit, allowlist per tool |
| T3 Privilege Compromise | ✅ | - | Shared tokens, broad reach, real browser profiles, cookie reads |
| T4 Resource Overload | ✅ | 13 (1 high) | Caps, timeouts, loops, budgets |
| T5 Cascading Hallucination Attacks | 🟡 | - | Grounding rules only |
| T6 Intent Breaking & Goal Manipulation | ✅ | 2 (2 high) | Injection scan, untrusted-input rule, obeyed overrides |
| T7 Misaligned & Deceptive Behaviors | 🟡 | - | Bot-disclosure / human-persona checks |
| T8 Repudiation & Untraceability | ✅ | 5 | Tracing and logging checks |
| T9 Identity Spoofing & Impersonation | 🟡 | - | Shared credentials; claims to be human |
| T10 Overwhelming Human in the Loop | ⬜ | - | Not checked |
| T11 Unexpected RCE and Code Attacks | 🟡 | - | Shell/exec/SQL tools fed by model output |
| T12 Agent Communication Poisoning | 🟡 | 2 (2 high) | Injection patterns in shared files only; no runtime message checks |
| T13 Rogue Agents in Multi-Agent Systems | ⬜ | - | Not checked |
| T14 Human Attacks on Multi-Agent Systems | ⬜ | - | Not checked |
| T15 Human Manipulation | 🟡 | - | Persona, unsafe advice |

### OWASP Top 10 for LLM Applications 2025

_Item names from the OWASP 2025 list. Status = what this tool checks statically, not whether your app is safe._ (5 ✅ · 4 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| LLM01 Prompt Injection | ✅ | 3 (2 high) | Document-wide injection scan (ADSF tab), untrusted-input rule in prompts, obeyed overrides in transcripts, injection eval cases |
| LLM02 Sensitive Information Disclosure | ✅ | - | Secrets/PII in files, personal-to-work source-to-sink paths, confidential text in prompts, leaks in transcripts |
| LLM03 Supply Chain | 🟡 | 2 | Model pinning and SDK inventory only; no dependency or model-provenance scan |
| LLM04 Data and Model Poisoning | 🟡 | 2 (2 high) | Poisoned instructions hidden in docs/knowledge files; no training-data checks |
| LLM05 Improper Output Handling | 🟡 | 5 (5 high) | Shell/SQL/exec tools and ungated actions that consume model output; no taint tracking |
| LLM06 Excessive Agency | ✅ | 33 (5 high) | Gate map for irreversible tools and browser actions, shared credentials, scopes |
| LLM07 System Prompt Leakage | ✅ | - | Secrets and internal notes in prompts; leaked prompt text in transcripts |
| LLM08 Vector and Embedding Weaknesses | ⬜ | - | Not checked |
| LLM09 Misinformation | 🟡 | 28 | 'I don't know' rule, made-up prices/policies vs your FAQ; STE clarity checks |
| LLM10 Unbounded Consumption | ✅ | 16 (1 high) | Token caps, timeouts, retry/step caps, infinite loops, budget alerts, bill smells |


## Generated eval sets

1 functional and 10 security test cases in `evals/` (JSONL + README.md). Generated from the source; not run.

## 4. Findings (P0 = fix before real traffic)

### Personal-to-work data crossover

No findings.


### Irreversible actions

- **P0** `actions.irreversible_tool` openai__openai-cs-agents-demo/python-backend/airline/tools.py:208 — Irreversible tool book_new_flight has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`async def book_new_flight(`)
- **P0** `actions.irreversible_tool` openai__openai-cs-agents-demo/python-backend/airline/tools.py:342 — Irreversible tool cancel_flight has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`async def cancel_flight(`)
- **P0** `actions.irreversible_tool` openai__openai-cs-agents-demo/python-backend/memory_store.py:89 — Irreversible tool delete_thread has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`async def delete_thread(self, thread_id: str, context: dict[str, Any]) -> None:`)
- **P0** `actions.irreversible_tool` openai__openai-cs-agents-demo/python-backend/memory_store.py:148 — Irreversible tool delete_thread_item has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`async def delete_thread_item(`)
- **P0** `actions.irreversible_tool` openai__openai-cs-agents-demo/python-backend/memory_store.py:173 — Irreversible tool delete_attachment has no approval gate or dry-run mode (rate limit/allowlist only). Add a human confirm step before it runs. (`async def delete_attachment(self, attachment_id: str, context: dict[str, Any]) -> None:`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/python-backend/main.py:38 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/python-backend/main.py:39 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.no_deny_list` openai__openai-cs-agents-demo/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:815 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:830 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:845 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:864 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:865 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:887 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:888 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:918 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:919 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:941 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:956 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:971 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:995 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:1010 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:1019 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:1028 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:1052 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:1068 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:1916 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:2216 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:3147 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/package-lock.json:3245 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/tailwind.config.ts:10 — Wildcard domain or host permission. (`"*.{js,ts,jsx,tsx,mdx}"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/tsconfig.json:26 — Wildcard domain or host permission. (`"**/*.ts"`)
- **P1** `actions.wildcard_domain` openai__openai-cs-agents-demo/ui/tsconfig.json:26 — Wildcard domain or host permission. (`"**/*.tsx"`)

### Governance + cost

- **P0** `governance.unbounded_loop` openai__openai-cs-agents-demo/python-backend/main.py:89 — Infinite loop with no step cap or break nearby. A stuck agent here burns tokens until someone notices.
- **P1** `governance.no_owner` (project) — No owner/maintainer documented. Every agent needs a named person who answers for it.
- **P1** `governance.no_max_tokens` openai__openai-cs-agents-demo/python-backend/__init__.py:1 — [python-backend] No max_tokens / output cap set on model calls.
- **P1** `governance.no_timeout` openai__openai-cs-agents-demo/python-backend/__init__.py:1 — [python-backend] No timeout on model or tool calls.
- **P1** `governance.no_recursion_cap` openai__openai-cs-agents-demo/python-backend/__init__.py:1 — [python-backend] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` openai__openai-cs-agents-demo/python-backend/__init__.py:1 — [python-backend] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_tracing` openai__openai-cs-agents-demo/python-backend/__init__.py:1 — [python-backend] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_max_tokens` openai__openai-cs-agents-demo/README.md:1 — [openai__openai-cs-agents-demo] No max_tokens / output cap set on model calls.
- **P1** `governance.no_timeout` openai__openai-cs-agents-demo/README.md:1 — [openai__openai-cs-agents-demo] No timeout on model or tool calls.
- **P1** `governance.no_recursion_cap` openai__openai-cs-agents-demo/README.md:1 — [openai__openai-cs-agents-demo] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` openai__openai-cs-agents-demo/README.md:1 — [openai__openai-cs-agents-demo] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P1** `governance.no_tracing` openai__openai-cs-agents-demo/README.md:1 — [openai__openai-cs-agents-demo] No tracing (OpenTelemetry, LangSmith, Langfuse or similar). You can't see what the agent did or what it cost.
- **P1** `governance.no_max_tokens` openai__openai-cs-agents-demo/ui/app/layout.tsx:1 — [ui] No max_tokens / output cap set on model calls.
- **P1** `governance.no_timeout` openai__openai-cs-agents-demo/ui/app/layout.tsx:1 — [ui] No timeout on model or tool calls.
- **P1** `governance.no_recursion_cap` openai__openai-cs-agents-demo/ui/app/layout.tsx:1 — [ui] No step / iteration / recursion cap for the agent loop.
- **P1** `governance.no_budget` openai__openai-cs-agents-demo/ui/app/layout.tsx:1 — [ui] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P2** `governance.no_review_record` (project) — No documented review (reviewed-by / review date / changelog).
- **P2** `governance.no_retry_cap` openai__openai-cs-agents-demo/python-backend/__init__.py:1 — [python-backend] No explicit retry limit or backoff.
- **P2** `governance.unpinned_model` openai__openai-cs-agents-demo/python-backend/airline/agents.py:25 — Model 'gpt-5.2' is not pinned to a dated version, so behavior and price can change under you. (`gpt-5.2`)
- **P2** `governance.unpinned_model` openai__openai-cs-agents-demo/python-backend/airline/guardrails.py:14 — Model 'gpt-4.1-mini' is not pinned to a dated version, so behavior and price can change under you. (`gpt-4.1-mini`)
- **P2** `governance.expensive_model` openai__openai-cs-agents-demo/python-backend/airline/guardrails.py:14 — Premium model 'gpt-4.1-mini'. Check it isn't used for simple routing or classification calls. (`gpt-4.1-mini`)
- **P2** `governance.no_retry_cap` openai__openai-cs-agents-demo/README.md:1 — [openai__openai-cs-agents-demo] No explicit retry limit or backoff.
- **P2** `governance.no_retry_cap` openai__openai-cs-agents-demo/ui/app/layout.tsx:1 — [ui] No explicit retry limit or backoff.

### Agent Health Checker + Labs tools

- **P2** `observability.langfuse` (whole input) — Gap — no clear signal for LLM observability (Langfuse / LangSmith).
- **P2** `observability.prometheus` (whole input) — Gap — no clear signal for Prometheus metrics / alerts.
- **P2** `observability.runbooks_alerts` (whole input) — Gap — no clear signal for Alerts tied to runbooks.

### Prompt-injection scan (ADSF)

- **P0** `injection.ignore_previous` openai__openai-cs-agents-demo/python-backend/airline/guardrails.py:64 — "Ignore previous instructions" style override. (`override system instructions`)
- **P0** `injection.ignore_previous` openai__openai-cs-agents-demo/ui/components/guardrails.tsx:23 — "Ignore previous instructions" style override. (`override system instructions`)

### Simplified Technical English (STE)

- **P1** `ste.passive_voice` openai__openai-cs-agents-demo/README.md:9 — Passive voice. Say who does the action (active voice). (`is composed`)
- **P1** `ste.sentence_length` openai__openai-cs-agents-demo/README.md:57 — Descriptive sentence has 26 words (limit 25). Split it. (`You can either run the backend independently if you want to use a separate UI, or run both the UI and backend at the same time.`)
- **P1** `ste.passive_voice` openai__openai-cs-agents-demo/README.md:83 — Passive voice. Say who does the action (active voice). (`is designed`)
- **P1** `ste.sentence_length` openai__openai-cs-agents-demo/README.md:105 — Descriptive sentence has 35 words (limit 25). Split it. (`The Seat & Special Services Agent will ask to confirm your confirmation number and ask if you know which seat you want to change to or if you would like to see `)
- **P1** `ste.passive_voice` openai__openai-cs-agents-demo/README.md:107 — Passive voice. Say who does the action (active voice). (`been successfully changed`)
- **P1** `ste.sentence_length` openai__openai-cs-agents-demo/README.md:120 — Descriptive sentence has 28 words (limit 25). Split it. (`This flow demonstrates how the system intelligently routes your requests to the right specialist agent, ensuring you get accurate and helpful responses for a va`)
- **P1** `ste.passive_voice` openai__openai-cs-agents-demo/README.md:133 — Passive voice. Say who does the action (active voice). (`been successfully cancelled`)
- **P1** `ste.sentence_length` openai__openai-cs-agents-demo/README.md:146 — Descriptive sentence has 33 words (limit 25). Split it. (`This flow demonstrates how the system not only routes requests to the appropriate agent, but also enforces guardrails to keep the conversation focused on airlin`)
- **P1** `ste.passive_voice` openai__openai-cs-agents-demo/README.md:152 — Passive voice. Say who does the action (active voice). (`is delayed`)
- **P1** `ste.passive_voice` openai__openai-cs-agents-demo/README.md:153 — Passive voice. Say who does the action (active voice). (`is delayed`)
- **P1** `ste.sentence_length` openai__openai-cs-agents-demo/README.md:170 — Descriptive sentence has 37 words (limit 25). Split it. (`There are two mock itineraries so both scenarios continue to work: the disrupted Paris -> New York -> Austin trip (PA441/NY802 with rebook to NY950) and the exi`)
- **P1** `ste.passive_voice` openai__openai-cs-agents-demo/README.md:178 — Passive voice. Say who does the action (active voice). (`is licensed`)
- **P2** `ste.noun_cluster` openai__openai-cs-agents-demo/README.md:7 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`Customer Service interface built`)
- **P2** `ste.ing_verb` openai__openai-cs-agents-demo/README.md:11 — "implementing" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`, implementing the`)
- **P2** `ste.ing_verb` openai__openai-cs-agents-demo/README.md:21 — "running" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by running the`)
- **P2** `ste.ing_verb` openai__openai-cs-agents-demo/README.md:39 — "running" used as a verb (-ing clause). Use a full clause, e.g. "when you ...". (`by running the`)
- **P2** `ste.noun_cluster` openai__openai-cs-agents-demo/README.md:83 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`own customer service workflows`)
- **P2** `ste.word_hint` openai__openai-cs-agents-demo/README.md:83 — "modify" → change (plain-word hint). (`modify`)
- **P2** `ste.hedge` openai__openai-cs-agents-demo/README.md:91 — Vague word "etc". Give the exact condition, value or action. (`etc`)
- **P2** `ste.noun_cluster` openai__openai-cs-agents-demo/README.md:91 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`answers policy questions baggage`)
- **P2** `ste.noun_cluster` openai__openai-cs-agents-demo/README.md:100 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`I change my seat`)
- **P2** `ste.complex_tense` openai__openai-cs-agents-demo/README.md:107 — Perfect tense. Use simple past or present. (`has been`)
- **P2** `ste.complex_tense` openai__openai-cs-agents-demo/README.md:133 — Perfect tense. Use simple past or present. (`has been`)
- **P2** `ste.hedge` openai__openai-cs-agents-demo/README.md:146 — Vague word "appropriate". Give the exact condition, value or action. (`appropriate`)
- **P2** `ste.word_hint` openai__openai-cs-agents-demo/README.md:152 — "via" → through / with (plain-word hint). (`via`)
- **P2** `ste.complex_tense` openai__openai-cs-agents-demo/README.md:153 — Modal + be + past participle. Use an active verb. (`will be missed`)
- **P2** `ste.noun_cluster` openai__openai-cs-agents-demo/README.md:157 — Possible noun cluster of 5 words. Break it up with "of", "for" or a verb. (`Flight Information Agent hands off`)
- **P2** `ste.noun_cluster` openai__openai-cs-agents-demo/README.md:168 — Possible noun cluster of 4 words. Break it up with "of", "for" or a verb. (`note ground transportation coverage`)

## 5. Labs tool runs

- Observability Gap Finder · (whole input) · score 56 · Baseline present — close remaining high gaps.

