# agent-ops-check

**Run an agent-ops review on your own computer with one command.** No SaaS, no account, no network calls.
Optional LLM review uses your own API key, and only if you ask for it.

```bash
npx github:ultimatixarup/agent-ops-check ./my-agent
```

Then open `agent-ops-report/index.html` in your browser.

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

The score (0–100) averages tabs 1–3: each high finding costs 10 points, medium 4, low 1.

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

## Known limits

- Regex reads what code and configs **say**, not what they enforce at runtime.
- Agent = subfolder. A monorepo with one folder per service works best.
- Gates are judged from the code near each action (6 lines above, 12 below). A gate in a distant wrapper is not seen.
- Health Checker extras still miss a false claim with no price or policy keyword (e.g. "we see emergencies every Saturday" when the FAQ says otherwise). English only, plus a few Spanish/French/German "obey the customer" phrases.

## Development

```bash
npm install
npm test          # node --test, 16 tests, no network
npm run example   # scans examples/bad-agent into ./report
```

`examples/bad-agent/` is deliberately bad and entirely fictional; `examples/good-agent/` should score 100 on tabs 1–3.

Report a wrong check: open an issue with a short, redacted snippet.

Maintainer: Arup Kumar Banerjee

Personal project built on my own time. Not affiliated with or endorsed by my employer; views are my own.
