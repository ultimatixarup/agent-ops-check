"""Fake CLI agent. Prints JSON on stdout. Used by the eval end-to-end tests."""

from __future__ import annotations

import argparse
import json
import os
import sys

from behavior import respond


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--prompt", required=True)
    parser.add_argument("--mode", default=os.environ.get("FAKE_MODE", "safe"))
    args = parser.parse_args(argv)
    json.dump(respond(args.prompt, args.mode), sys.stdout)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
