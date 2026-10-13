# Agent ops audit memo (self-run)

_Generated locally by agent-ops-check 0.1.0 on 2026-10-13T08:21:52.971Z. No network calls were made. Nothing left this machine._

> Heuristic regex and static checks, not a security audit. It can miss problems and can flag harmless code.

Rules 2026.10.13 (2026-10-13). Rules are 0 day(s) old.

**Overall score:** 60/100 · files scanned: 40 · agents: google-gemini__gemini-fullstack-langgraph-quickstart

| Area | Score | High | Medium | Low |
|---|---|---|---|---|
| Personal-to-work data crossover | 99 | 0 | 0 | 1 |
| Irreversible actions | 0 | 1 | 62 | 0 |
| Governance + cost | 81 | 0 | 3 | 7 |
| Agent Health Checker + Labs tools | 97 | 0 | 0 | 3 |
| Prompt-injection scan (ADSF) | 100 | 0 | 0 | 0 |
| Simplified Technical English (STE) | 100 | 0 | 0 | 0 |

## 1. Agent and connector inventory

| Agent | Connectors | Credentials (names only) | Scopes |
|---|---|---|---|
| google-gemini__gemini-fullstack-langgraph-quickstart | gmail | GEMINI_API_KEY, LANGSMITH_API_KEY | - |

### Source-to-sink matrix (personal data → work destinations)

No agent both reads a personal source and writes to a work sink.

## 2. Human-in-the-loop gate map

| Agent | Action | Where | Approval | Dry-run | Rate limit | Domain allowlist |
|---|---|---|---|---|---|---|
| google-gemini__gemini-fullstack-langgraph-quickstart | `.submit(` | google-gemini__gemini-fullstack-langgraph-quickstart/frontend/src/App.tsx:137 | **no** | **no** | **no** | **no** |

## 3. AI inventory

- Providers: google_gemini, openai
- Frameworks/SDKs: langgraph, langchain, vercel_ai_sdk
- Models: `gemini-fullstack-langgraph`, `gemini-2.5-pro-preview-05-06`, `gemini-2.0-flash`, `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-2.5-flash-preview-04-17`

## STE (Simplified Technical English) style

_Style checks inspired by ASD-STE100 writing rules. Not a certified ASD-STE100 checker; no specification text or dictionary is included._


## Document-wide prompt-injection scan (ADSF)

_Regex and Unicode checks over every file. It flags suspicious content; a clean result does not prove a file is safe._

40 files scanned, 0 findings.

## Standards map (maps to, not compliance)

✅ covered by a check · 🟡 partly · ⬜ not checked. Numbers = findings in this scan that map to the item.

### Anthropic / Claude agent guidance (summarized)

_Practices summarized from Anthropic's public docs and engineering posts on building and securing agents._ (7 ✅ · 1 🟡 · 0 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| AN-CONFIRM Ask a human before consequential or irreversible actions | ✅ | 63 (1 high) | Gate map |
| AN-LEASTPRIV Least-privilege tools and credentials | ✅ | 60 | Shared tokens, reach, wildcards |
| AN-UNTRUSTED Treat tool results and web/doc content as untrusted (prompt injection) | ✅ | - | Injection scan |
| AN-SANDBOX Run in a sandbox / isolated environment | 🟡 | - | Real browser profile use |
| AN-PROMPT Clear system prompt with explicit constraints | ✅ | 2 | Deny-list check, STE clarity |
| AN-EVALS Build evaluations with test cases | ✅ | - | Generates functional + security eval sets (not run) |
| AN-LIMITS Limit cost and steps | ✅ | 2 | Caps and budgets |
| AN-OBSERVE Log and monitor agent actions | ✅ | - | Tracing |

### Microsoft Copilot Studio governance areas (summarized)

_Areas summarized from Microsoft's public documentation. This tool scans exported agent files/configs only; it does not read your tenant._ (2 ✅ · 5 🟡 · 2 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| CS-DLP Data policies for connectors | 🟡 | - | Source-to-sink reach in exported configs |
| CS-AUTH Agent authentication | 🟡 | - | Credentials in files |
| CS-SHARE Maker permissions and sharing | ⬜ | - | Not checked (tenant setting) |
| CS-ENV Environment strategy (dev/test/prod) | ⬜ | - | Not checked |
| CS-AUDIT Audit logging and monitoring | 🟡 | - | Tracing references |
| CS-KNOW Knowledge sources for generative answers | 🟡 | - | Injection scan over knowledge files you point it at |
| CS-MOD Content moderation and instructions | 🟡 | - | Prompt checks |
| CS-HANDOFF Escalation / human handoff | ✅ | - | Handoff rules and transcripts |
| CS-ACTIONS Actions and flows that change data | ✅ | 63 (1 high) | Gate map |

### CSA AI Controls Matrix (AICM) domains

_Domain names only._ (3 ✅ · 9 🟡 · 6 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| A&A Audit & Assurance | 🟡 | - | Audit memo + SARIF |
| AIS Application & Interface Security | 🟡 | 63 (1 high) | Gates, injection |
| BCR Business Continuity & Operational Resilience | 🟡 | - | Single-LLM fallback |
| CCC Change Control & Configuration | 🟡 | 7 | Pinning, review record |
| CEK Cryptography, Encryption & Key Management | 🟡 | - | Hardcoded keys |
| DCS Datacenter Security | ⬜ | - | Not checked |
| DSP Data Security & Privacy Lifecycle | ✅ | 1 | PII, secrets, data paths |
| GRC Governance, Risk & Compliance | 🟡 | 1 | Owner, inventory |
| HRS Human Resources | ⬜ | - | Not checked |
| IAM Identity & Access Management | ✅ | - | Shared credentials, scopes, profiles |
| IPY Interoperability & Portability | ⬜ | - | Not checked |
| I&S Infrastructure Security | ⬜ | - | Not checked |
| LOG Logging & Monitoring | ✅ | 3 | Tracing, observability gaps |
| MDS Model Security | 🟡 | 6 | Injection, pinning |
| SEF Security Incident Management & Forensics | ⬜ | - | Not checked |
| STA Supply Chain, Transparency & Accountability | 🟡 | 10 | Inventory, disclosure |
| TVM Threat & Vulnerability Management | 🟡 | 63 (1 high) | Static findings |
| UEM Universal Endpoint Management | ⬜ | - | Not checked |

### EU AI Act basics (selected articles)

_Selected articles for orientation. Not legal advice; maps to, not compliant with._ (3 ✅ · 4 🟡 · 2 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| Art.4 AI literacy | ⬜ | - | Not checked |
| Art.5 Prohibited practices | ⬜ | - | Not checked |
| Art.9 Risk management system (high-risk) | 🟡 | - | Audit memo is an input |
| Art.10 Data and data governance | 🟡 | 1 | Personal data in agent files |
| Art.12 Record-keeping (logging) | ✅ | 3 | Tracing/logging checks |
| Art.13 Transparency and information to deployers | 🟡 | 1 | Owner docs |
| Art.14 Human oversight | ✅ | 63 (1 high) | Approval gates, handoff |
| Art.15 Accuracy, robustness and cybersecurity | 🟡 | - | Injection, secrets, grounding |
| Art.50 Transparency: tell people they are talking to AI | ✅ | - | Bot disclosure checks |

### ISO/IEC 42001:2023 Annex A control areas

_Annex A area names only (the standard text is copyrighted and not included). Maps to, not compliant with._ (2 ✅ · 6 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| A.2 Policies related to AI | ⬜ | - | Not checked |
| A.3 Internal organization (roles, responsibilities) | 🟡 | 1 | Owner/maintainer recorded |
| A.4 Resources for AI systems (inventory of tools, data, compute) | ✅ | 11 | AI and connector inventory |
| A.5 Assessing impacts of AI systems | 🟡 | - | Audit memo is a starting input |
| A.6 AI system life cycle (verification, deployment, operation, monitoring) | 🟡 | 9 | Tracing, pinning; generated eval sets |
| A.7 Data for AI systems | 🟡 | 1 | Personal data reach |
| A.8 Information for interested parties | 🟡 | - | Bot disclosure |
| A.9 Use of AI systems (responsible use, human oversight) | ✅ | 63 (1 high) | Approval gates, handoff rules |
| A.10 Third-party and customer relationships | 🟡 | 10 | Provider inventory |

### MITRE ATLAS (selected techniques)

_Selected agent techniques; IDs/names per ATLAS data (via framework-pitch research)._ (9 ✅ · 4 🟡 · 0 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| AML.T0051 LLM Prompt Injection (direct and indirect) | ✅ | - | Injection scan + untrusted-input rules + eval cases |
| AML.T0054 LLM Jailbreak | 🟡 | - | Obeyed overrides in transcripts; jailbreak eval cases |
| AML.T0056 LLM Meta Prompt Extraction | ✅ | - | Secrets in prompts, leaks in transcripts |
| AML.T0057 LLM Data Leakage | ✅ | 1 | Personal-to-work paths, other customers' data |
| AML.T0053 AI Agent Tool Invocation | ✅ | 63 (1 high) | Tool gates and credential sharing |
| AML.T0034 Cost Harvesting | ✅ | 2 | Caps and budgets |
| AML.T0029 Denial of ML Service | 🟡 | - | Timeouts and step caps |
| AML.T0055 Unsecured Credentials | ✅ | - | Hardcoded secrets |
| AML.T0010 ML Supply Chain Compromise | 🟡 | 6 | Pinning only |
| AML.T0083 Credentials from AI Agent Configuration | ✅ | - | Secrets in agent/MCP configs, .env present |
| AML.T0086 Exfiltration via AI Agent Tool Invocation | ✅ | - | Source-to-sink paths, hardcoded webhooks, exfil instructions/links in docs |
| AML.T0101 Data Destruction via AI Agent Tool Invocation | ✅ | - | Ungated delete/drop/destroy/purge tools |
| AML.T0100 AI Agent Clickbait | 🟡 | 61 (1 high) | Browser writes, shorteners, allowlists |

### NIST AI RMF 1.0 (functions) + Generative AI Profile (NIST AI 600-1) risks

_Function names from AI RMF 1.0; risk names from the GenAI Profile. This tool supports a few outcomes; it does not implement the framework._ (4 ✅ · 6 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| GOVERN Govern: policies, accountability, oversight | 🟡 | 2 | Owner and review records; AI inventory |
| MAP Map: context, components, third parties | ✅ | 11 | AI inventory (providers, SDKs, models), connector inventory and source-to-sink map |
| MEASURE Measure: test and evaluate | 🟡 | 3 | Generates eval sets (functional + security) from the source; does not run them |
| MANAGE Manage: prioritize and respond to risks | 🟡 | - | P0–P2 audit memo and SARIF for CI; no incident workflow |
| GAI-Confabulation GenAI risk: Confabulation | 🟡 | - | Grounding rule checks |
| GAI-DataPrivacy GenAI risk: Data Privacy | ✅ | 1 | PII, secrets, personal-to-work paths |
| GAI-HumanAI GenAI risk: Human-AI Configuration | ✅ | 63 (1 high) | Approval gates, disclosure, handoff |
| GAI-InfoIntegrity GenAI risk: Information Integrity | 🟡 | - | FAQ grounding; STE information-loss compare |
| GAI-InfoSecurity GenAI risk: Information Security | ✅ | - | Injection scan, secrets, token lifting |
| GAI-ValueChain GenAI risk: Value Chain and Component Integration | 🟡 | 6 | Provider/SDK/model inventory and pinning |
| GAI-Harmful GenAI risks: CBRN, violent/hateful, obscene, bias, IP, environmental | ⬜ | - | Not checked |

### OWASP Top 10 for Agentic Applications 2026 (ASI01–ASI10)

_Item names as listed in the OWASP GenAI Security Project document (via framework-pitch research)._ (3 ✅ · 6 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| ASI01 Agent Goal Hijack | ✅ | 2 | ADSF injection scan over all docs, untrusted-input rule, deny-list check |
| ASI02 Tool Misuse and Exploitation | ✅ | 63 (1 high) | Gate map, rate limits, allowlists, wildcard domains, URL shorteners |
| ASI03 Identity and Privilege Abuse | ✅ | - | Shared credentials, scopes, browser profiles, cookie reads |
| ASI04 Agentic Supply Chain Vulnerabilities | 🟡 | 6 | MCP/provider inventory, unpinned models; no registry integrity check |
| ASI05 Unexpected Code Execution | 🟡 | - | Free-form shell/exec/SQL tools |
| ASI06 Memory and Context Poisoning | 🟡 | - | ADSF scan of knowledge/memory files you point it at; no runtime memory check |
| ASI07 Insecure Inter-Agent Communication | ⬜ | - | Not checked |
| ASI08 Cascading Failures | 🟡 | - | Step, loop and retry caps, timeouts, single-provider fallback |
| ASI09 Human-Agent Trust Exploitation | 🟡 | - | Bot disclosure, human claims, unrecorded handoffs |
| ASI10 Rogue Agents | 🟡 | 4 | Tracing, owner, observability; no stop-switch check |

### OWASP Agentic AI – Threats and Mitigations (T1–T15)

_Threat names from the OWASP Agentic Security Initiative taxonomy._ (5 ✅ · 7 🟡 · 3 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| T1 Memory Poisoning | 🟡 | - | Hidden instructions in files an agent may load as memory/knowledge |
| T2 Tool Misuse | ✅ | 63 (1 high) | Gate map: approval, dry-run, rate limit, allowlist per tool |
| T3 Privilege Compromise | ✅ | - | Shared tokens, broad reach, real browser profiles, cookie reads |
| T4 Resource Overload | ✅ | 2 | Caps, timeouts, loops, budgets |
| T5 Cascading Hallucination Attacks | 🟡 | - | Grounding rules only |
| T6 Intent Breaking & Goal Manipulation | ✅ | - | Injection scan, untrusted-input rule, obeyed overrides |
| T7 Misaligned & Deceptive Behaviors | 🟡 | - | Bot-disclosure / human-persona checks |
| T8 Repudiation & Untraceability | ✅ | 3 | Tracing and logging checks |
| T9 Identity Spoofing & Impersonation | 🟡 | - | Shared credentials; claims to be human |
| T10 Overwhelming Human in the Loop | ⬜ | - | Not checked |
| T11 Unexpected RCE and Code Attacks | 🟡 | - | Shell/exec/SQL tools fed by model output |
| T12 Agent Communication Poisoning | 🟡 | - | Injection patterns in shared files only; no runtime message checks |
| T13 Rogue Agents in Multi-Agent Systems | ⬜ | - | Not checked |
| T14 Human Attacks on Multi-Agent Systems | ⬜ | - | Not checked |
| T15 Human Manipulation | 🟡 | - | Persona, unsafe advice |

### OWASP Top 10 for LLM Applications 2025

_Item names from the OWASP 2025 list. Status = what this tool checks statically, not whether your app is safe._ (5 ✅ · 4 🟡 · 1 ⬜)

| Item | Status | Findings here | What the tool checks |
|---|---|---|---|
| LLM01 Prompt Injection | ✅ | 2 | Document-wide injection scan (ADSF tab), untrusted-input rule in prompts, obeyed overrides in transcripts, injection eval cases |
| LLM02 Sensitive Information Disclosure | ✅ | 1 | Secrets/PII in files, personal-to-work source-to-sink paths, confidential text in prompts, leaks in transcripts |
| LLM03 Supply Chain | 🟡 | 6 | Model pinning and SDK inventory only; no dependency or model-provenance scan |
| LLM04 Data and Model Poisoning | 🟡 | - | Poisoned instructions hidden in docs/knowledge files; no training-data checks |
| LLM05 Improper Output Handling | 🟡 | - | Shell/SQL/exec tools and ungated actions that consume model output; no taint tracking |
| LLM06 Excessive Agency | ✅ | 63 (1 high) | Gate map for irreversible tools and browser actions, shared credentials, scopes |
| LLM07 System Prompt Leakage | ✅ | - | Secrets and internal notes in prompts; leaked prompt text in transcripts |
| LLM08 Vector and Embedding Weaknesses | ⬜ | - | Not checked |
| LLM09 Misinformation | 🟡 | - | 'I don't know' rule, made-up prices/policies vs your FAQ; STE clarity checks |
| LLM10 Unbounded Consumption | ✅ | 2 | Token caps, timeouts, retry/step caps, infinite loops, budget alerts, bill smells |


## Generated eval sets

0 functional and 4 security test cases in `evals/` (JSONL + README.md). Generated from the source; not run.

## 4. Findings (P0 = fix before real traffic)

### Personal-to-work data crossover

- **P2** `crossover.pii.email_address` google-gemini__gemini-fullstack-langgraph-quickstart/backend/pyproject.toml:6 — Possible personal data (email_address) in agent code, prompt or fixture. (`schm…om (masked)`)

### Irreversible actions

- **P0** `actions.browser_write` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/src/App.tsx:137 — Browser write action .submit( has no approval gate or dry-run mode. Add a human confirm step before it runs. (`thread.submit({`)
- **P1** `actions.no_deny_list` google-gemini__gemini-fullstack-langgraph-quickstart/backend/src/agent/prompts.py:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/eslint.config.js:11 — Wildcard domain or host permission. (`'**/*.{ts,tsx}'`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:837 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:838 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:863 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:864 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:883 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:898 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:913 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:935 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:936 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:955 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:975 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:976 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:998 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1025 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1026 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1049 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1050 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1073 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1074 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1096 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1097 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1127 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1128 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1158 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1159 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1201 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1202 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1224 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1249 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1250 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1283 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1284 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1303 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1322 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1340 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1358 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1373 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1388 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1406 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1424 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1442 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:1443 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:2208 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:2223 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:2232 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:2247 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:3048 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:3657 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:4578 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:4941 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:4963 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:5024 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:5589 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:5611 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:5689 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:5691 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:5692 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:5693 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.wildcard_domain` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/package-lock.json:5694 — Wildcard domain or host permission. (`"*"`)
- **P1** `actions.no_deny_list` google-gemini__gemini-fullstack-langgraph-quickstart/README.md:1 — Prompt has no explicit deny-list such as "never submit, pay or send without asking me first". Agents treat what isn't forbidden as allowed.

### Governance + cost

- **P1** `governance.no_owner` (project) — No owner/maintainer documented. Every agent needs a named person who answers for it.
- **P1** `governance.no_max_tokens` google-gemini__gemini-fullstack-langgraph-quickstart/backend/examples/cli_research.py:36 — [google-gemini__gemini-fullstack-langgraph-quickstart] No max_tokens / output cap set on model calls.
- **P1** `governance.no_budget` google-gemini__gemini-fullstack-langgraph-quickstart/backend/examples/cli_research.py:36 — [google-gemini__gemini-fullstack-langgraph-quickstart] No budget, spend cap or usage alert referenced. Set one in the provider console and note it here.
- **P2** `governance.no_review_record` (project) — No documented review (reviewed-by / review date / changelog).
- **P2** `governance.unpinned_model` google-gemini__gemini-fullstack-langgraph-quickstart/backend/examples/cli_research.py:24 — Model 'gemini-2.5-pro-preview-05-06' is not pinned to a dated version, so behavior and price can change under you. (`gemini-2.5-pro-preview-05-06`)
- **P2** `governance.unpinned_model` google-gemini__gemini-fullstack-langgraph-quickstart/backend/src/agent/configuration.py:12 — Model 'gemini-2.0-flash' is not pinned to a dated version, so behavior and price can change under you. (`gemini-2.0-flash`)
- **P2** `governance.unpinned_model` google-gemini__gemini-fullstack-langgraph-quickstart/backend/src/agent/configuration.py:19 — Model 'gemini-2.5-flash' is not pinned to a dated version, so behavior and price can change under you. (`gemini-2.5-flash`)
- **P2** `governance.unpinned_model` google-gemini__gemini-fullstack-langgraph-quickstart/backend/src/agent/configuration.py:26 — Model 'gemini-2.5-pro' is not pinned to a dated version, so behavior and price can change under you. (`gemini-2.5-pro`)
- **P2** `governance.unpinned_model` google-gemini__gemini-fullstack-langgraph-quickstart/frontend/src/components/InputForm.tsx:29 — Model 'gemini-2.5-flash-preview-04-17' is not pinned to a dated version, so behavior and price can change under you. (`gemini-2.5-flash-preview-04-17`)
- **P2** `governance.unpinned_model` google-gemini__gemini-fullstack-langgraph-quickstart/README.md:100 — Model 'gemini-fullstack-langgraph' is not pinned to a dated version, so behavior and price can change under you. (`gemini-fullstack-langgraph`)

### Agent Health Checker + Labs tools

- **P2** `observability.otel` (whole input) — Gap — no clear signal for OpenTelemetry traces/metrics.
- **P2** `observability.prometheus` (whole input) — Gap — no clear signal for Prometheus metrics / alerts.
- **P2** `observability.runbooks_alerts` (whole input) — Gap — no clear signal for Alerts tied to runbooks.

### Prompt-injection scan (ADSF)

No findings.


### Simplified Technical English (STE)

No findings.


## 5. Labs tool runs

- Observability Gap Finder · (whole input) · score 54 · Baseline present — close remaining high gaps.

