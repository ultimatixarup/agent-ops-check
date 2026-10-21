# agent-ops-evals

Optional Python runner for [agent-ops-check](../README.md). It loads `agent-evals.yaml`, runs the packs you name against one agent (HTTP, a Python callable, a CLI command, or a Pydantic AI agent), and writes `results.json`.

The Node command `agent-ops-check eval` starts this package. The static scan does not need it.

Dry-run is the default. Pass `--live` or set `live: true` to call the agent. Live mode contacts only that agent.

```bash
python -m pip install -e "./python[dev]"
python -m agent_ops_evals run examples/agent-evals.yaml
python -m pytest python/tests -q
```

User-facing docs: the "Running evals" section of the repository README.
