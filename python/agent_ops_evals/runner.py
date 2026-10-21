"""Run a config: dry-run by default, live only with an explicit opt-in."""

from __future__ import annotations

import asyncio
import importlib.metadata
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from pydantic_evals import Dataset

from agent_ops_evals import __version__
from agent_ops_evals.adapters import AgentOutput, build_adapter, target_description
from agent_ops_evals.config import EvalConfig
from agent_ops_evals.evaluators import (
    attack_succeeded,
    benign_overblocked,
    build_evaluators,
    env_notes,
    load_secret_catalog,
)
from agent_ops_evals.packs import find_repo_root, load_cases

LIVE_WARNING = (
    "WARNING: live mode will call the configured agent.\n"
    "The agent may take real actions (send mail, post messages, spend money, run tools).\n"
    "This runner contacts only the target in the config. It does not call any other service.\n"
    "This version has no model judge."
)

_DRY_NOTE = (
    "safety.dry_run_tools is recorded only. This runner does not rewrite the agent's tools. "
    "Dry-run means the runner does not call the agent until you pass --live or set live: true."
)


def execute(config: EvalConfig, config_path: Path, *, live: bool, out_path: Path) -> int:
    loaded = load_cases(config, config_path)
    repo = find_repo_root(config_path.parent)
    catalog = load_secret_catalog(repo)
    evaluators = build_evaluators(config.evaluators, catalog)
    notes = list(loaded.notes)
    notes.append(_DRY_NOTE)
    for ignored in config.evaluators.ignored:
        notes.append(f"{ignored.name}: {ignored.reason}")
    if config.evaluators.no_secret_echo and config.evaluators.no_secret_echo.enabled:
        notes.extend(env_notes(config.evaluators.no_secret_echo.from_env))

    if not live:
        document = _document(
            config,
            config_path,
            mode="dry_run",
            stats=loaded.stats,
            cases=_dry_cases(loaded.cases),
            summary=_summary(config, cases=[], errors=0, dry_run=True),
            notes=notes,
            warning=None,
        )
        _write(out_path, document)
        _print_dry(config, loaded, out_path)
        return 0

    import sys
    print(LIVE_WARNING, file=sys.stderr)
    print("Target: " + target_description(config), file=sys.stderr)

    adapter = build_adapter(config)
    if hasattr(adapter, "load"):
        adapter.load()

    async def task(prompt: str) -> AgentOutput:
        return await adapter.run(prompt)

    dataset = Dataset(
        name="agent-ops-evals",
        cases=loaded.cases,
        evaluators=evaluators,
    )

    async def _go():
        return await dataset.evaluate(
            task,
            name="agent-ops-evals",
            max_concurrency=config.safety.max_concurrency,
            progress=False,
        )

    report = asyncio.run(_go())
    rows, errors = _rows_from_report(report)
    summary = _summary(config, cases=rows, errors=errors, dry_run=False)
    document = _document(
        config,
        config_path,
        mode="live",
        stats=loaded.stats,
        cases=rows,
        summary=summary,
        notes=notes,
        warning=LIVE_WARNING,
    )
    _write(out_path, document)
    _print_live(summary, loaded.stats, out_path)
    return 0 if summary["passed"] else 1


def _dry_cases(cases: list) -> list[dict[str, Any]]:
    rows = []
    for case in cases:
        meta = case.metadata or {}
        rows.append({
            "pack": meta.get("pack"),
            "id": meta.get("id"),
            "name": case.name,
            "kind": meta.get("kind"),
            "owasp": meta.get("owasp"),
            "category": meta.get("category"),
            "input": case.inputs,
            "output": None,
            "error": None,
            "evaluations": None,
            "attack_success": None,
            "benign_overblocked": None,
        })
    rows.sort(key=lambda row: (str(row.get("pack")), str(row.get("name"))))
    return rows


def _rows_from_report(report: Any) -> tuple[list[dict[str, Any]], int]:
    rows = []
    errors = 0
    for case in report.cases:
        meta = case.metadata or {}
        assertions = {name: result.value for name, result in case.assertions.items()}
        evaluations = []
        for bucket in (case.assertions, case.labels, case.scores):
            for name, result in bucket.items():
                evaluations.append({
                    "name": name,
                    "value": result.value,
                    "label": "deterministic",
                    "reason": result.reason,
                })
        for failure in case.evaluator_failures:
            evaluations.append({
                "name": failure.name,
                "value": None,
                "label": "deterministic",
                "reason": failure.error_message,
            })
        output = case.output.model_dump() if isinstance(case.output, AgentOutput) else case.output
        kind = meta.get("kind") or "attack"
        expect_refusal = bool(meta.get("expect_refusal"))
        eval_error = "; ".join(item.error_message for item in case.evaluator_failures) if case.evaluator_failures else None
        if eval_error:
            errors += 1
        rows.append({
            "pack": meta.get("pack"),
            "id": meta.get("id"),
            "name": case.name,
            "kind": kind,
            "owasp": meta.get("owasp"),
            "category": meta.get("category"),
            "input": case.inputs,
            "output": output,
            "error": eval_error,
            "evaluations": evaluations,
            "attack_success": None if eval_error else (attack_succeeded(assertions) if kind == "attack" else False),
            "benign_overblocked": None if eval_error else benign_overblocked(kind, expect_refusal, assertions),
        })
    for failure in report.failures:
        errors += 1
        meta = failure.metadata or {}
        rows.append({
            "pack": meta.get("pack"),
            "id": meta.get("id"),
            "name": failure.name,
            "kind": meta.get("kind"),
            "owasp": meta.get("owasp"),
            "category": meta.get("category"),
            "input": failure.inputs,
            "output": None,
            "error": failure.error_message,
            "evaluations": [],
            "attack_success": None,
            "benign_overblocked": None,
        })
    rows.sort(key=lambda row: (str(row.get("pack")), str(row.get("name"))))
    return rows, errors


def _summary(config: EvalConfig, *, cases: list[dict], errors: int, dry_run: bool) -> dict[str, Any]:
    thresholds = {
        "attack_success_rate_max": config.thresholds.attack_success_rate_max,
        "benign_refusal_rate_max": config.thresholds.benign_refusal_rate_max,
    }
    if dry_run:
        return {
            "dry_run": True,
            "cases": None,
            "attack_cases": None,
            "benign_answer_cases": None,
            "attack_successes": None,
            "attack_success_rate": None,
            "benign_overblocked": None,
            "benign_refusal_rate": None,
            "case_errors": None,
            "thresholds": thresholds,
            "passed": None,
            "failures": [],
        }
    attack = [row for row in cases if row["kind"] == "attack" and row["error"] is None]
    benign = [row for row in cases if row["kind"] == "benign" and row["benign_overblocked"] is not None and row["error"] is None]
    successes = sum(1 for row in attack if row["attack_success"])
    overblocked = sum(1 for row in benign if row["benign_overblocked"])
    asr = _rate(successes, len(attack))
    brr = _rate(overblocked, len(benign))
    failures = []
    if errors:
        failures.append(f"{errors} case(s) raised an error before they could be scored")
    if asr is not None and asr > config.thresholds.attack_success_rate_max:
        failures.append(
            f"attack success rate {asr:.4f} is above {config.thresholds.attack_success_rate_max:.4f}"
        )
    if brr is not None and brr > config.thresholds.benign_refusal_rate_max:
        failures.append(
            f"benign refusal rate {brr:.4f} is above {config.thresholds.benign_refusal_rate_max:.4f}"
        )
    return {
        "dry_run": False,
        "cases": len(cases),
        "attack_cases": len(attack),
        "benign_answer_cases": len(benign),
        "attack_successes": successes,
        "attack_success_rate": asr,
        "benign_overblocked": overblocked,
        "benign_refusal_rate": brr,
        "case_errors": errors,
        "thresholds": thresholds,
        "passed": not failures,
        "failures": failures,
    }


def _rate(hits: int, total: int) -> float | None:
    if total == 0:
        return None
    return round(hits / total, 6)


def _document(
    config: EvalConfig,
    config_path: Path,
    *,
    mode: str,
    stats: list[dict],
    cases: list[dict],
    summary: dict,
    notes: list[str],
    warning: str | None,
) -> dict[str, Any]:
    try:
        pe_version = importlib.metadata.version("pydantic-evals")
    except importlib.metadata.PackageNotFoundError:
        pe_version = None
    return {
        "version": 1,
        "tool": "agent-ops-evals",
        "tool_version": __version__,
        "pydantic_evals": pe_version,
        "mode": mode,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "config_path": str(config_path),
        "target": _public_target(config),
        "warning": warning,
        "evaluators": _public_evaluators(config),
        "packs": stats,
        "cases": cases,
        "summary": summary,
        "notes": notes,
    }


def _public_target(config: EvalConfig) -> dict[str, Any]:
    target = config.target
    if target.type == "http":
        return {"type": "http", "url": target.url, "method": target.method}
    if target.type == "cli":
        return {"type": "cli", "command": target.command}
    return {"type": target.type, "callable": target.callable}


def _public_evaluators(config: EvalConfig) -> list[dict[str, Any]]:
    plan = config.evaluators
    rows = []
    if plan.not_contains and plan.not_contains.enabled:
        rows.append({
            "name": "canary_not_leaked",
            "label": "deterministic",
            "values": plan.not_contains.values,
            "check_reply": plan.not_contains.check_reply,
        })
    if plan.no_tool_called and plan.no_tool_called.enabled:
        rows.append({"name": "no_forbidden_tool", "label": "deterministic", "tools": plan.no_tool_called.tools})
    if plan.no_secret_echo and plan.no_secret_echo.enabled:
        rows.append({
            "name": "no_secret_leaked",
            "label": "deterministic",
            "from_env": plan.no_secret_echo.from_env,
            "patterns": "custom" if plan.no_secret_echo.patterns is not None else "builtin",
        })
    if plan.benign_overblock.enabled:
        rows.append({"name": "benign_not_overblocked", "label": "deterministic"})
    return rows


def _write(path: Path, document: dict) -> None:
    import json
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(document, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def _print_dry(config: EvalConfig, loaded, out_path: Path) -> None:
    print("agent-ops-evals: dry-run (the agent was not called)")
    print("  target: " + target_description(config))
    for stat in loaded.stats:
        extra = f" (of {stat['available']})" if stat["sample"] or stat["truncated_by_max_cases"] else ""
        print(f"  {stat['id']:<24} {stat['selected']} case(s){extra}  {stat['source']}")
    names = ", ".join(row["name"] for row in _public_evaluators(config)) or "(none)"
    print("  evaluators: " + names)
    print(
        "  thresholds: attack success rate <= "
        f"{config.thresholds.attack_success_rate_max} , benign refusal rate <= "
        f"{config.thresholds.benign_refusal_rate_max}"
    )
    print(f"  would run {len(loaded.cases)} case(s). Pass --live or set live: true to call the agent.")
    print("Results: " + str(out_path))


def _print_live(summary: dict, stats: list[dict], out_path: Path) -> None:
    print("agent-ops-evals: live")
    for stat in stats:
        print(f"  {stat['id']:<24} {stat['selected']} case(s)  {stat['source']}")
    asr = _fmt_rate(summary["attack_success_rate"])
    brr = _fmt_rate(summary["benign_refusal_rate"])
    print(f"  attack success rate: {asr}  (max {summary['thresholds']['attack_success_rate_max']})")
    print(f"  benign refusal rate: {brr}  (max {summary['thresholds']['benign_refusal_rate_max']})")
    print(f"  case errors: {summary['case_errors']}")
    if summary["passed"]:
        print("  PASS")
    else:
        print("  FAIL")
        for item in summary["failures"]:
            print("  - " + item)
    print("Results: " + str(out_path))


def _fmt_rate(value: float | None) -> str:
    if value is None:
        return "n/a (no cases of this kind)"
    return f"{value:.4f}"
