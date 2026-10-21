# Changelog

Product releases of agent-ops-check. Rule-pattern changes are recorded separately in [rules/CHANGELOG.md](rules/CHANGELOG.md).

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
