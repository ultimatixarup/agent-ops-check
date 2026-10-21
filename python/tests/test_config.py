from __future__ import annotations

from pathlib import Path

import pytest

from agent_ops_evals.config import host_allowed, load_config
from agent_ops_evals.errors import ConfigError
from tests.conftest import write_config

MIN = """
version: 1
target:
  type: http
  url: http://127.0.0.1:9/chat
  request: {message: "{{input}}"}
packs:
  - id: one
    source: builtin:llmail/benign
    sample: 1
"""


def test_example_yaml_matches_the_proposal_shape(repo: Path):
    # The generated pack file is intentionally absent. Schema checks happen first,
    # then pack loading reports the missing path. Here we only load the schema by
    # pointing the missing pack at a real builtin source via a copy.
    text = (repo / "examples" / "agent-evals.yaml").read_text(encoding="utf-8")
    assert "type: http" in text
    assert "builtin:llmail/phase2-heldout" in text
    assert "builtin:owasp/llm01,llm02,llm06,llm07" in text
    assert "builtin:llmail/benign" in text
    assert 'source: ./evals/security.jsonl' in text
    assert "audit@example.invalid" in text
    assert "llm_judge: {enabled: false" in text
    assert "attack_success_rate_max: 0.05" in text
    assert "allow_hosts: [localhost]" in text
    assert "\nlive:" not in text


def test_example_yaml_schema_is_valid_until_the_missing_generated_pack(repo: Path, tmp_path: Path):
    from agent_ops_evals.runner import execute
    path = repo / "examples" / "agent-evals.yaml"
    config = load_config(path)
    assert config.target.type == "http"
    assert config.live is False
    assert config.evaluators.ignored[0].name == "llm_judge"
    assert config.evaluators.benign_overblock.enabled is True
    with pytest.raises(ConfigError, match="security.jsonl"):
        execute(config, path, live=False, out_path=tmp_path / "results.json")


def test_unknown_target_type_is_a_helpful_error(tmp_path: Path):
    path = write_config(tmp_path, MIN.replace("type: http", "type: grpc"))
    with pytest.raises(ConfigError, match="target.type must be one of"):
        load_config(path)


def test_llm_judge_enabled_is_rejected(tmp_path: Path):
    path = write_config(tmp_path, MIN + "evaluators:\n  - llm_judge: {enabled: true, provider: openai}\n")
    with pytest.raises(ConfigError, match="llm_judge is not available"):
        load_config(path)


def test_unknown_evaluator_names_the_known_list(tmp_path: Path):
    path = write_config(tmp_path, MIN + "evaluators:\n  - vibe_check: {rubric: nice}\n")
    with pytest.raises(ConfigError, match="unknown evaluator 'vibe_check'"):
        load_config(path)


def test_threshold_percent_is_rejected(tmp_path: Path):
    path = write_config(tmp_path, MIN + "thresholds: {attack_success_rate_max: 5, benign_refusal_rate_max: 0.1}\n")
    with pytest.raises(ConfigError, match="attack_success_rate_max"):
        load_config(path)


def test_public_host_is_rejected_until_it_is_listed(tmp_path: Path):
    path = write_config(tmp_path, MIN.replace("http://127.0.0.1:9/chat", "http://example.com/chat"))
    with pytest.raises(ConfigError, match="allow_hosts"):
        load_config(path)


def test_loopback_names_are_equivalent():
    assert host_allowed("127.0.0.1", ["localhost"])
    assert host_allowed("localhost", ["127.0.0.1"])
    assert not host_allowed("example.com", ["localhost"])


def test_cli_command_must_include_the_prompt_placeholder(tmp_path: Path):
    path = write_config(tmp_path, """
    version: 1
    target:
      type: cli
      command: ["python", "agent.py"]
    packs:
      - id: one
        source: builtin:llmail/benign
        sample: 1
    """)
    with pytest.raises(ConfigError, match="\\{\\{input\\}\\}"):
        load_config(path)


def test_missing_file_and_bad_yaml(tmp_path: Path):
    with pytest.raises(ConfigError, match="Config not found"):
        load_config(tmp_path / "nope.yaml")
    bad = tmp_path / "bad.yaml"
    bad.write_text("version: [\n", encoding="utf-8")
    with pytest.raises(ConfigError, match="not valid YAML"):
        load_config(bad)
