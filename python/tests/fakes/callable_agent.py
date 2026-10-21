"""Fake Python callable target."""

from __future__ import annotations

import os

from tests.fakes.behavior import respond


def run(prompt: str) -> dict:
    return respond(prompt, os.environ.get("FAKE_MODE", "safe"))
