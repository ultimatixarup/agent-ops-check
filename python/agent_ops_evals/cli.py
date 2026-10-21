"""`agent-ops-evals run <config>`. The Node shim shells out to this."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from agent_ops_evals.errors import ConfigError


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        prog="agent-ops-evals",
        description="Run agent-ops-check eval packs against one agent. Dry-run unless you opt in.",
    )
    sub = parser.add_subparsers(dest="command", required=True)
    run = sub.add_parser("run", help="validate a config and, with --live or live: true, call the agent")
    run.add_argument("config", help="path to agent-evals.yaml")
    run.add_argument("--live", action="store_true", help="call the agent. It may take real actions.")
    run.add_argument("--dry-run", action="store_true", help="validate and print the plan, even if the file sets live: true")
    run.add_argument("--out", default="results.json", help="where to write results.json (default: ./results.json)")
    args = parser.parse_args(argv)
    if args.command != "run":
        parser.error("unknown command")
    if args.live and args.dry_run:
        print("Pass only one of --live and --dry-run.", file=sys.stderr)
        return 2
    try:
        from agent_ops_evals.config import load_config
        from agent_ops_evals.runner import execute
        config_path = Path(args.config).resolve()
        config = load_config(config_path)
        if args.dry_run:
            live = False
        elif args.live:
            live = True
        else:
            live = config.live
        return execute(config, config_path, live=live, out_path=Path(args.out).resolve())
    except ConfigError as exc:
        print(str(exc), file=sys.stderr)
        return 2
    except KeyboardInterrupt:
        print("interrupted", file=sys.stderr)
        return 2
