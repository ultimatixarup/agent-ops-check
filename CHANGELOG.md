# Changelog

Product releases of agent-ops-check. Rule-pattern changes are recorded separately in [rules/CHANGELOG.md](rules/CHANGELOG.md).

## 0.3.0 — 2026-11-06

Read-only audit of local coding-tool configs, and a checklist of vendor training opt-outs. A normal project scan is unchanged. `config-audit` reads files and does not modify them. It makes no network calls.

- New command `agent-ops-check config-audit`. It reads Codex (`~/.codex/config.toml`, `~/.codex/hooks.json`, plugin files under that directory, and `<project>/.codex/`), Claude Code (`~/.claude/settings.json`, `~/.claude.json`, `~/.claude/plugins/`, `<project>/.claude/settings.json`, `<project>/.claude/settings.local.json`, `<project>/.mcp.json`), and Cursor (`~/.cursor/mcp.json`, `~/.cursor/hooks.json`, `~/.cursor/plugins/`, and the project equivalents). When you do not pass `--home`, `CODEX_HOME` and `CLAUDE_CONFIG_DIR` are used if they are set, and Cursor's documented managed hook paths are read too. `--home` points the audit at a fixture instead of your home directory and ignores those environment variables.
- The report lists every plugin, marketplace, hook, and MCP server it could parse. It flags three cases: an entry that matches the Postman desktop install fingerprint or whose command points at another application's files, a remote MCP server, and a startup hook or a Codex hook that already has a `trusted_hash`. A flag does not prove you did not add the entry. Values that look like tokens are masked. Query strings and URL userinfo are not printed.
- The same audit is on the local launch page (`agent-ops-check ui`).
- New page [docs/DATA-SHARING.md](docs/DATA-SHARING.md), also shown on the launch page and in the config-audit report. It records where OpenAI (ChatGPT and Codex), Anthropic (Claude and Claude Code), Google (Gemini Apps), Mistral (Vibe and the API), GitHub Copilot, and Cursor put the training or data-sharing control. Empty fields are empty because the cited vendor page does not state them. User reports that a Codex opt-out and a Mistral opt-out were turned back on are quoted separately from the vendor docs. The Gemini row notes that turning off Keep Activity is the training control and that chats are still kept for 72 hours.
- Claude Code User-Agent check, in the same read-only audit. It reads the local install version from `~/.local/share/claude/versions` or the `~/.local/bin/claude` launcher symlink, and on a real home directory it may run `claude --version` with no network call. A version older than 2.1.317 is flagged. That release added the built-in `cc-plugin-privacy` mod, which asks before a shell or web tool call sends the account email ([anthropics/claude-code#107757](https://github.com/anthropics/claude-code/issues/107757), [Hacker News](https://news.ycombinator.com/item?id=50385272)). The mod is partial. An `enabledPlugins` or `installed_plugins.json` entry that turns `cc-plugin-privacy` off is flagged. Local `.claude` log and `ua-probe` lines are scanned for an email-like address in a User-Agent or `curl -A` value. The address is masked and is not printed. `--home` does not run `claude --version`.
- CI runs the fixture audit and a packed-tarball `config-audit` against an empty home directory. The preload path is absolute so `test/no-network.js` resolves on Linux, macOS, and Windows. The static scan's network promise is unchanged.

## 0.2.0 — 2026-10-21

Optional live eval runner. The static scan is unchanged: it still only writes cases, and a scan with no `--llm` flag still makes no network calls.

- New command `agent-ops-check eval`. It validates `agent-evals.yaml` and calls the agent only with `--live` or `live: true`. Dry-run is the default. Live mode warns that the agent may take real actions.
- Optional Python package `agent-ops-evals` (Python 3.11+), built on pydantic-evals 2.59.0 (MIT). Node and Python exchange files only: YAML in, `results.json` out. The Node tool keeps working when Python is not installed. If Python and uv are both missing, the command prints install steps and exits.
- Targets: an HTTP endpoint, a Python callable, a CLI command, or a Pydantic AI agent.
- Packs: LLMail-Inject samples from Microsoft (MIT) in `data/llmail`, OWASP-tagged cases generated from the same templates as `src/evals.js`, a JSONL file a scan already wrote, and benign emails.
- Deterministic yes/no checks: a planted canary leaked, a forbidden tool was called, a secret pattern leaked, a benign case that should be answered was refused.
- The local-only network promise stays true for the static scan. `eval` contacts only the agent you configure, and nothing else. An opt-in model judge is not in this version.
- CI job `python-eval` installs the package and runs the Python tests against fake HTTP and CLI agents. The existing Node jobs are unchanged.
- `examples/agent-evals.yaml` dry-runs from a checkout. The generated pack is commented out until you point it at a scan file such as `report/evals/security.jsonl`.

Not in this release: an AI/LLM judge, promptfoo export, and a static-versus-live scorecard.
