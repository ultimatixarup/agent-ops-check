# Rules changelog

Rule updates ship only through this Git repo. Refresh with `git pull` or re-run `npx github:ultimatixarup/agent-ops-check`.

## 2026.10.13 (third update, same day: background daemons + skill artifact provenance)
Two new static check families in `rules/persistence.yaml` and `src/scanners/persistence.js`, shown as tabs 7 and 8. They don't change the overall score (tabs 1–3). Every rule carries `family` and `source` metadata. Static only: they cannot see running processes, installed binaries, runtime behavior, files written outside the scanned folder, or what a `.pyc` contains (never decoded or run). Verify on your install.
- New: `daemon.*` (8 rules): `launchd_register`, `systemd_register`, `cron_register`, `windows_task_register`, `auto_update`, `daemon_mode`, `unpinned_latest_install`, `pipe_to_shell`. Matches in documentation are lowered to low. Source: a single, unreproduced report about a coding-agent CLI's self-updating background daemon (openai/codex#48195; Hacker News, 2026-10-12; Groundy audit guide https://groundy.com/articles/codex-cli-now-runs-a-self-updating-daemon-how-to-audit-and-stop/). This project does not confirm that report.
- New: `skills.*` (6 rules): `committed_pycache`, `orphan_pyc`, `persistent_write`, `session_hook`, `unpinned_source`, `no_hashes`, applied in skill/plugin scope (SKILL.md folders with front matter, `.claude/`, `.codex/`, `.gemini/`, `.agents/`, `skills/`, `plugins/`, MCP and plugin configs). Sources (their findings, not ours): SkillRelayBench, arXiv 2610.13227 (https://arxiv.org/abs/2610.13227); PyCache Trap, arXiv 2610.10612 (https://arxiv.org/abs/2610.10612).
- New: install/startup scripts and unit files (`.sh`, `.ps1`, `.bat`, `.plist`, `.service`, `.timer`, Dockerfile, Makefile, crontab...), `.pyc` names and lockfile names are collected for these two tabs only. The other checks see the same files as before.
- New: `data/standards/` "maps to" entries: OWASP LLM03; OWASP Agentic ASI04, ASI05, ASI06, ASI10; OWASP Agentic T1, T11; MITRE ATLAS AML.T0010; NIST GAI-ValueChain. All stay 🟡 partial.
- New: `--no-persistence` CLI flag.
- Tuned on the vendor-samples campaign repos (see the PR for counts): Python `threading.Thread(daemon=True)` is not flagged as a daemon; a `skill.md` without front matter (a tips document) is not a skill root; non-SKILL.md docs in skill scope are lowered to low.

## 2026.10.13 (second update, same day: false-positive fixes)
False-positive fixes from the vendor-samples campaign (`campaigns/2026-10-vendor-samples/`). Each has a regression test in `test/fp-regressions.test.js` built on short attributed excerpts of the scanned samples (`test/fixtures/fp/`).
- New: Jupyter notebooks (`.ipynb`) are scanned: code and markdown cells only (outputs ignored), findings say "notebook cell N, line M". Raw notebook limit 8 MB, extracted text limit 2 MB.
- Changed: `governance.unbounded_loop` only fires when the loop body calls a model (`llm_call`) or a tool (new `tool_invoke` pattern). Pagination, stream and input-prompt loops are no longer flagged.
- Changed: injection matches in a defensive context (guardrail/detector text that describes attacks: "detect", "jailbreak", "attempts to", "never follow"...) are lowered to low, not removed.
- Changed: `injection.fake_system` ignores `system: str`-style parameters and docstring `Args:` entries in code files, and now reports the right line for matches anchored on a newline.
- Changed: tool-call JSON (`llmail_tool_call_syntax`, `tool_call_injection`) inside markdown code (fenced or `inline`) is low.
- Changed: `injection.templated_url` in infrastructure-as-code (CDK, Terraform, CloudFormation, Bicep, Pulumi) is low.
- Changed: Agent Health Checker config checks skip CI/devcontainer/package/tooling files and need a prompt/instructions key in JSON/YAML.
- New: `placeholders:` in `crossover.yaml` (AWS example account `123456789012`, AWS example keys, test card numbers, the retired "Woolworth" SSN) are skipped by the PII and secret rules.
- Changed: tool names that start with a read-only verb (`get_`, `list_`, `read_`, `fetch_`, `search_`...) are not irreversible unless they also contain a strong action verb (`get_and_delete_file`).
- Changed: agent boundaries: folders such as `backend/`, `frontend/`, `ui/`, `python-backend/`, `docs/`, `.github/` belong to the root app, and files at the input root don't count as a separate agent for shared-credential checks when there are sub-agents.
- Changed: STE checks only prompt/instruction files (`*prompt*`, `*instruction*`, `system*`, `AGENTS.md`, `CLAUDE.md`, ...) and prompt strings in configs by default, not every README. `--ste-all` restores the old scope.

## 2026.10.13
- New: 8 ADSF rules in `injection.yaml` (`llmail:` group) derived from Microsoft's LLMail-Inject adaptive prompt-injection challenge dataset (MIT, https://huggingface.co/datasets/microsoft/llmail-inject-challenge): tool-call/api_call syntax, fake turn delimiters, obfuscated addresses, decode-then-run instructions, post-task triggers, send-email directives, encoded text, and a low-severity "send to address" signal. Each rule carries `source` and `family` metadata.
- New: `data/llmail/` samples (500 held-out phase 2 attacks, 300 phase 1 attacks, 203 benign emails, 30 hand-written benign emails) and `docs/LLMAIL_BENCHMARK.md` with measured detection and false-positive rates.
- New: LLMail-style indirect-injection cases in the generated security eval set.

## 2026.10.12
- New: `injection.yaml` (ADSF document-wide prompt-injection scan): override phrases, fake system markers, hidden HTML comments, CSS-hidden text, zero-width/bidi/tag characters, base64 instructions, data-leaking image links, request-capture hosts.
- New: `ste.yaml` (Simplified Technical English style rules, original word lists).
- New: `data/standards/*.yaml` (offline mappings to 9 frameworks).
- Initial: `crossover.yaml`, `actions.yaml`, `governance.yaml`.
