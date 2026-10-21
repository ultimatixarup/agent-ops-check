"""Load eval packs from builtin LLMail / OWASP sets or from JSONL files.

Node writes `evals/security.jsonl`. This module only reads files.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

from dataclasses import dataclass, field

from pydantic_evals import Case

from agent_ops_evals.builtin_owasp import cases_for
from agent_ops_evals.config import EvalConfig, PackSpec, render_template
from agent_ops_evals.errors import ConfigError

LLMAIL_FILES = {
    "phase1": ("attacks-phase1-sample.jsonl", "attack"),
    "phase2-heldout": ("attacks-phase2-heldout.jsonl", "attack"),
    "benign": ("benign-fp-emails.jsonl", "benign"),
    "benign-hard": ("benign-hard-authored.jsonl", "benign"),
}

_BENIGN_CATEGORIES = {"in_scope", "tool_use"}
_ATTACKISH = {"out_of_scope"}  # benign text, but a refusal is the expected answer


def _is_repo(candidate: Path) -> bool:
    return (candidate / "data" / "llmail" / "families.json").is_file() and (candidate / "src" / "evals.js").is_file()


def find_repo_root(start: Path) -> Path | None:
    import os

    env = os.environ.get("AGENT_OPS_CHECK_ROOT")
    if env and _is_repo(Path(env)):
        return Path(env)
    # Config dir, the process cwd, and this file. An editable install lives inside the checkout.
    seeds = [start, Path.cwd(), Path(__file__).resolve()]
    seen: set[Path] = set()
    for seed in seeds:
        for candidate in [seed, *seed.parents]:
            if candidate in seen:
                continue
            seen.add(candidate)
            if _is_repo(candidate):
                return candidate
    return None


@dataclass
class LoadedCases:
    cases: list[Case[str, object, dict]]
    stats: list[dict[str, object]] = field(default_factory=list)
    notes: list[str] = field(default_factory=list)


def load_cases(config: EvalConfig, config_path: Path) -> LoadedCases:
    root = find_repo_root(config_path.parent)
    loaded = LoadedCases(cases=[])
    for pack in config.packs:
        records = _records_for(pack, config_path, root)
        _reject_duplicate_ids(pack, records)
        records = _sort_records(records)
        available = len(records)
        if pack.sample is not None:
            records = records[: pack.sample]
        room = config.safety.max_cases - len(loaded.cases)
        truncated = False
        if room <= 0:
            loaded.notes.append(f"pack {pack.id} skipped: safety.max_cases ({config.safety.max_cases}) already reached")
            loaded.stats.append(_stat(pack, available, 0, False))
            continue
        if len(records) > room:
            records = records[:room]
            truncated = True
            loaded.notes.append(f"pack {pack.id} truncated to {room} case(s) by safety.max_cases ({config.safety.max_cases})")
        pack_cases = [_to_case(pack, record, index) for index, record in enumerate(records, start=1)]
        loaded.cases.extend(pack_cases)
        loaded.stats.append(_stat(pack, available, len(pack_cases), truncated))
    if not loaded.cases:
        raise ConfigError("No cases to run. Check pack sources, sample, and safety.max_cases.")
    return loaded


def _stat(pack: PackSpec, available: int, selected: int, truncated: bool) -> dict[str, object]:
    return {
        "id": pack.id,
        "source": pack.source,
        "kind": pack.kind,
        "available": available,
        "selected": selected,
        "sample": pack.sample,
        "truncated_by_max_cases": truncated,
    }


def _records_for(pack: PackSpec, config_path: Path, root: Path | None) -> list[dict]:
    source = pack.source
    if source.startswith("builtin:"):
        return _builtin(source[len("builtin:"):], root, pack)
    path = _resolve_file(source, config_path)
    return _read_jsonl(path, pack.id)


def _builtin(spec: str, root: Path | None, pack: PackSpec) -> list[dict]:
    if spec.startswith("llmail/"):
        name = spec[len("llmail/"):]
        if name not in LLMAIL_FILES:
            known = ", ".join(sorted(LLMAIL_FILES))
            raise ConfigError(f"pack {pack.id!r}: unknown builtin LLMail set {name!r}. Known sets: {known}.")
        if root is None:
            raise ConfigError(_missing_repo(pack.id))
        filename, kind = LLMAIL_FILES[name]
        path = root / "data" / "llmail" / filename
        records = _read_jsonl(path, pack.id)
        for record in records:
            record.setdefault("kind", kind)
            record["_source_name"] = filename
        return records
    if spec.startswith("owasp/"):
        raw_ids = [part.strip() for part in spec[len("owasp/"):].split(",") if part.strip()]
        if not raw_ids:
            raise ConfigError(f"pack {pack.id!r}: builtin:owasp/ needs at least one id, for example llm01,llm02,llm06,llm07.")
        try:
            records = cases_for(raw_ids)
        except ValueError as exc:
            raise ConfigError(f"pack {pack.id!r}: {exc}") from exc
        for record in records:
            record["_source_name"] = spec
        return records
    raise ConfigError(
        f"pack {pack.id!r}: unknown builtin source {pack.source!r}. "
        "Use builtin:llmail/phase1, builtin:llmail/phase2-heldout, builtin:llmail/benign, "
        "builtin:llmail/benign-hard, or builtin:owasp/llm01,llm02,llm06,llm07."
    )


def _missing_repo(pack_id: str) -> str:
    return (
        f"pack {pack_id!r} uses a builtin dataset, and data/llmail was not found by walking up from the config file. "
        "Set AGENT_OPS_CHECK_ROOT to a checkout of agent-ops-check, or point source at a JSONL file."
    )


def _resolve_file(source: str, config_path: Path) -> Path:
    raw = Path(source)
    if raw.is_absolute():
        if raw.is_file():
            return raw
        raise ConfigError(_missing_file(source, [raw]))
    tried = []
    for base in (Path.cwd(), config_path.parent):
        candidate = (base / raw).resolve()
        tried.append(candidate)
        if candidate.is_file():
            return candidate
    raise ConfigError(_missing_file(source, tried))


def _missing_file(source: str, tried: list[Path]) -> str:
    lines = "\n".join(f"  {path}" for path in tried)
    return (
        f"pack source {source} was not found.\nLooked in:\n{lines}\n"
        "A scan writes this file at <out>/evals/security.jsonl (and functional.jsonl). "
        "Point source at that path, or remove the pack."
    )


def _read_jsonl(path: Path, pack_id: str) -> list[dict]:
    records = []
    try:
        text = path.read_text(encoding="utf-8")
    except OSError as exc:
        raise ConfigError(f"pack {pack_id!r}: could not read {path}: {exc}") from exc
    for number, line in enumerate(text.splitlines(), start=1):
        if not line.strip():
            continue
        try:
            record = json.loads(line)
        except json.JSONDecodeError as exc:
            raise ConfigError(f"pack {pack_id!r}: {path}:{number} is not valid JSON: {exc}") from exc
        if not isinstance(record, dict):
            raise ConfigError(f"pack {pack_id!r}: {path}:{number} must be a JSON object.")
        body = record.get("input", record.get("text"))
        if not isinstance(body, str) or not body.strip():
            raise ConfigError(
                f"pack {pack_id!r}: {path}:{number} needs an 'input' string (scan cases) or a 'text' string (LLMail rows)."
            )
        record["_line"] = number
        record["_source_name"] = path.name
        records.append(record)
    if not records:
        raise ConfigError(f"pack {pack_id!r}: {path} has no cases.")
    return records


def _reject_duplicate_ids(pack: PackSpec, records: list[dict]) -> None:
    seen: dict[str, int] = {}
    for record in records:
        ident = record.get("id")
        if ident is None:
            continue
        key = str(ident)
        if key in seen:
            raise ConfigError(f"pack {pack.id!r} has two cases with id {key!r}. Ids must be unique inside a pack.")
        seen[key] = seen.get(key, 0) + 1


def _sort_records(records: list[dict]) -> list[dict]:
    def key(record: dict) -> tuple:
        ident = str(record.get("id") or f"line-{record.get('_line', 0)}")
        return tuple(int(part) if part.isdigit() else part for part in re.split(r"(\d+)", ident))

    return sorted(records, key=key)


def _to_case(pack: PackSpec, record: dict, index: int) -> Case[str, object, dict]:
    case_id = str(record.get("id") or f"line-{record.get('_line', index)}")
    body = str(record.get("input", record.get("text")))
    prompt = render_template(pack.wrap, {"text": body, "input": body}) if pack.wrap else body
    kind, expect_refusal = _classify(record, pack)
    canaries = _planted(prompt)
    metadata = {
        "pack": pack.id,
        "id": case_id,
        "kind": kind,
        "expect_refusal": expect_refusal,
        "owasp": record.get("owasp"),
        "category": record.get("category"),
        "source": record.get("source") or record.get("_source_name"),
        "family": record.get("family"),
        "expect": record.get("expect"),
        "agent": record.get("agent"),
        "canaries": canaries,
    }
    return Case(name=f"{pack.id}:{case_id}", inputs=prompt, metadata=metadata)


def _classify(record: dict, pack: PackSpec) -> tuple[str, bool]:
    if pack.kind in ("attack", "benign"):
        kind = pack.kind
    elif record.get("kind") in ("attack", "benign"):
        kind = str(record["kind"])
    elif record.get("category") in _BENIGN_CATEGORIES or record.get("category") in _ATTACKISH:
        kind = "benign"
    elif "benign" in str(record.get("_source_name") or ""):
        kind = "benign"
    else:
        kind = "attack"
    expect_refusal = kind == "benign" and (
        record.get("category") == "out_of_scope" or record.get("expect_refusal") is True
    )
    return kind, expect_refusal


def _planted(prompt: str) -> list[str]:
    """Canaries this repo plants inside generated cases. Checked in addition to config values."""
    found = []
    folded = prompt.casefold()
    for needle in ("audit@example.invalid", "rules off"):
        if needle.casefold() in folded:
            found.append(needle)
    return found
