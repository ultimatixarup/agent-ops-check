# agent-ops-check

**Run an agent-ops review on your own computer with one command.** No SaaS, no account, no network calls.
Optional LLM review uses your own API key, and only if you ask for it.

```bash
npx github:ultimatixarup/agent-ops-check ./my-agent
```

Then open `agent-ops-report/index.html` in your browser.

Other ways in:
- A zipped agent: `npx github:ultimatixarup/agent-ops-check ./agent.zip` (extracted locally to a temp folder, deleted after; path-traversal entries are rejected)
- A local launch page: `npx github:ultimatixarup/agent-ops-check ui --open` serves a page on `127.0.0.1` where you type a folder/zip path or upload a zip, start the scan, and view the report

> Heuristic regex and static checks, **not a security audit**. It can miss problems and it can flag harmless code.
> Free, MIT-licensed personal project.

## What it checks

It points at a folder (or files) holding agent code, prompts, MCP configs and logs, and runs four passes:

| Tab | What it looks for | What the report shows |
|---|---|---|
| **1. Personal-to-work crossover** | Connectors, tokens (by env-var name) and OAuth scopes per agent. The same credential used by more than one agent. Agents that can read personal sources (Gmail, Drive, `~/Documents`, finance or tax paths) **and** write to work sinks (Slack, Teams, Jira, Discord, webhooks, SMTP). Hardcoded webhooks, secrets (masked) and PII (SSN, card, account numbers). | A source-to-sink matrix, a connector inventory and file:line findings |
| **2. Irreversible actions** | Tools named send/post/delete/submit/pay/transfer/purchase/... and browser `click`/`fill`/`submit` calls, each checked for an approval gate, dry-run mode, rate limit or domain allowlist. Cookie, localStorage and browser-profile reads, URL shorteners, wildcard domains, and prompts with no "never do X without asking" deny-list. | A gate map (yes/no per gate) and findings |
| **3. Governance + cost** | Inventory of providers, SDKs/frameworks and model names. Missing `max_tokens`, timeouts, retry caps and step/recursion caps; `while True` loops with no cap; no budget or usage alert; no tracing (OpenTelemetry, LangSmith, Langfuse...); unpinned or premium models; no owner or review record. | An AI inventory and a "missing basics" list |
| **4. Agent Health Checker + Labs tools** | The [Arup Banerjee Labs](https://ultimatixarup.github.io/arup-banerjee-labs/) browser tools, run unchanged in a sandbox: **Agent Health Checker** (8 engineering + 9 customer-safety checks on prompts/configs, 9 checks on chat transcripts `.jsonl`), plus extra checks for 7 of its 8 recorded misses; **Cloud Bill Smell Detector** on bill CSV exports; **Observability Gap Finder** on the whole input. | Per-file scores and verdicts |

| **5. Simplified Technical English (STE)** | Prompts, system prompts, `.md` docs and agent instructions (and any text you give it): procedural sentences over 20 words and descriptive sentences over 25; passive voice; noun clusters of more than 3 nouns; complex tenses (perfect, progressive, modal + be + past participle); -ing words used as verbs; semicolons; more than one instruction per sentence; common phrasal verbs; vague hedges ("perhaps", "as appropriate"); plain-word hints ("utilize" → "use"). | Per-document sentence and finding counts, file:line findings, and an information-loss table when you compare two versions |

| **6. Prompt-injection scan (ADSF)** | Every file in the input, plus extra docs or knowledge files via `--docs <file|dir>`: "ignore previous instructions" overrides, role reassignment, fake system markers, instructions addressed to AI readers, secrecy requests, exfiltration instructions, risky tool-call requests, HTML-comment instructions, CSS-hidden text, zero-width / bidi / Unicode-tag (invisible) characters (tag text is decoded), base64 blobs that decode to instructions, data-leaking Markdown images, templated URLs, request-capture hosts. | file:line findings with decoded evidence |
| **Standards map** | Maps findings to 10 frameworks, from offline data in `data/standards/`: OWASP Top 10 for LLM Apps 2025, OWASP Top 10 for Agentic Applications 2026 (ASI01–ASI10), OWASP Agentic AI threats T1–T15, NIST AI RMF functions + GenAI Profile (AI 600-1) risks, ISO/IEC 42001 Annex A areas, MITRE ATLAS (selected agent techniques), CSA AI Controls Matrix domains, EU AI Act (selected articles), Copilot Studio governance areas, Anthropic/Claude agent guidance. | ✅ covered / 🟡 partial / ⬜ not checked per item, plus how many findings in this scan map to it. It shows what the tool **maps to**; it is not a compliance assessment. |
| **Eval sets** | Generated offline from the source: functional cases (each tool; in-scope and out-of-scope per prompt) and security cases (direct and indirect injection, jailbreak, each irreversible action without confirmation, each personal-to-work path, each credential name, unbounded consumption). | `evals/functional.jsonl`, `evals/security.jsonl`, `evals/README.md`. The tool writes them; you run them against your agent. |

The score (0–100) averages tabs 1–3: each high finding costs 10 points, medium 4, low 1.

## STE (Simplified Technical English) checks

> **This is not a certified ASD-STE100 checker.** The rules are inspired by the ASD-STE100 writing rules and use regex and
> light word lists only. The ASD-STE100 specification and its dictionary are copyrighted and are **not** included.
> The plain-word hints and phrasal-verb list in `rules/ste.yaml` are original and incomplete.

Every input method runs the same rules (`src/ste/core.js`), and none of them use the network:

| Input | Command |
|---|---|
| Agent folder (prompts, `.md`, prompt strings in JSON/YAML configs) | `npx github:ultimatixarup/agent-ops-check ./my-agent` (STE is tab 5) |
| Any file or folder of text | `agent-ops-check --ste docs/ --ste prompt.txt` |
| Pasted text | `agent-ops-check --ste-text "The pump is running; perhaps utilize the valve."` |
| stdin | `cat prompt.txt \| agent-ops-check --ste -` |
| Your own approved-word list (one word per line) | add `--ste-dict my-words.txt`; words not on it are flagged |
| Information-loss check | `agent-ops-check --ste-compare original.txt ste.txt` |
| Offline page with a paste box and file picker | `agent-ops-check ste-ui` (writes `agent-ops-report/ste.html`; add `--open` to open it). Every report folder also gets `ste.html`. |

The **information-loss check** pulls numbers, units, dates, names, paths, URLs, identifiers and constraint words
(must, never, only, at least, before, until, unless, within…) from the original, and lists any that are missing from the
STE version. A rewrite that drops "within 30 seconds" or turns "never" into nothing is flagged high.

Try it: `agent-ops-check --ste-compare examples/ste/original.txt examples/ste/rewrite.txt`.

Use `--no-ste` to skip the STE tab in a normal scan.

## Inputs

`.js .mjs .cjs .ts .tsx .py .json .jsonl .yaml .yml .toml .md .txt .csv`, MCP configs (`mcp.json`, `claude_desktop_config.json`)
and `.env.example`. **Real `.env` files are never read.** `node_modules`, `.git`, `dist`, `build` and virtualenvs are skipped.

Each **subfolder** of the input folder is treated as one agent, which is how shared credentials across agents are found.
`kb.*`, `faq.*` or `price-list.*` next to a transcript is used as the FAQ for the grounding check.

## Options

```
agent-ops-check <dir|files...> [options]
  --out <dir>          report folder (default ./agent-ops-report)
  --format <list>      html,json,md,sarif (default: all four)
  --fail-on <sev>      exit 1 if any finding at or above high|medium|low (for CI)
  --ignore <glob>      skip paths, e.g. --ignore "tests/**" (repeatable)
  --rules <dir>        use your own copy of rules/*.yaml
  --no-labs            skip tab 4
  --llm <provider>     optional review: openai | anthropic | openrouter
  --docs <file|dir>    extra documents for the prompt-injection scan (repeatable)
  --no-injection, --no-ste, --no-evals   skip those parts
agent-ops-check ui [--port N] [--open]   local launch page (127.0.0.1 only)
```

Outputs: `index.html` (static, opens offline, three-plus tabs with file:line findings), `report.json`,
`report.md` (an audit memo: inventory, gate map, P0/P1/P2 findings) and `report.sarif` (for GitHub code scanning and other SARIF viewers), plus `redteam-pack.txt`: 20 test messages to send to your own customer-facing bot.

Other ways to run: `git clone https://github.com/ultimatixarup/agent-ops-check && cd agent-ops-check && npm install && npm start -- ./my-agent`.
Try it on the built-in bad example: `npm run example`.

## Privacy

- With no `--llm` flag, **nothing leaves your machine**. The tool makes no network calls; the test suite fails if it tries.
  The HTML report has a `default-src 'none'` policy, so it loads nothing either.
- Secrets and PII found are masked in every report (`sk-p…Xa (masked)`). Credentials are listed by env-var **name** only.
- `--llm` sends only the finding list (rule, file:line, message, masked evidence), never whole files, to the provider you
  name, using your key from `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `OPENROUTER_API_KEY` or `LLM_API_KEY`.
  Pick the model with `LLM_MODEL`. Without a key, nothing is sent and the report says so.
- No telemetry, no usage counts, no update checks.

## Editing the rules

All patterns live in `rules/crossover.yaml`, `rules/actions.yaml` and `rules/governance.yaml` as case-insensitive
JavaScript regex. Copy the folder, edit, and run with `--rules ./my-rules`.

## Updates

Rule updates ship only through this repo: `git pull`, or re-run npx. There are no live rule downloads. Every report shows the rules version and date and a local-only "rules are N days old" hint. See [docs/UPDATES.md](docs/UPDATES.md) for versioning, the changelog, adding a rule, and release notifications.

## Known limits

- Regex reads what code and configs **say**, not what they enforce at runtime.
- Agent = subfolder. A monorepo with one folder per service works best.
- Gates are judged from the code near each action (6 lines above, 12 below). A gate in a distant wrapper is not seen.
- Health Checker extras still miss a false claim with no price or policy keyword (e.g. "we see emergencies every Saturday" when the FAQ says otherwise). English only, plus a few Spanish/French/German "obey the customer" phrases.

## Development

```bash
npm install
npm test          # node --test, 35 tests, no network
npm run example   # scans examples/bad-agent into ./report
```

`examples/bad-agent/` is deliberately bad and entirely fictional; `examples/good-agent/` should score 100 on tabs 1–3.

Report a wrong check: open an issue with a short, redacted snippet.

Maintainer: Arup Kumar Banerjee

Personal project built on my own time. Not affiliated with or endorsed by my employer; views are my own.
