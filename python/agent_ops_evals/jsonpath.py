"""A small JSONPath subset: $.a.b and $.a[0].b. Enough for reply and tool-call paths."""

from __future__ import annotations

import re

from agent_ops_evals.errors import ConfigError

_TOKEN = re.compile(r"\.([A-Za-z_][\w-]*)|\[(\d+)\]")


def lookup(data: object, path: str) -> tuple[object, bool]:
    """Return (value, found). A missing key is (None, False), not an exception."""
    if path in ("$", ""):
        return data, True
    if not path.startswith("$"):
        raise ConfigError(f"JSON path must start with $ (got {path!r}). Example: $.reply")
    cur: object = data
    pos = 1
    while pos < len(path):
        match = _TOKEN.match(path, pos)
        if not match:
            raise ConfigError(f"Cannot parse JSON path {path!r} near {path[pos:]!r}. Use $.a.b or $.a[0].b.")
        pos = match.end()
        key, index = match.group(1), match.group(2)
        if key is not None:
            if not isinstance(cur, dict) or key not in cur:
                return None, False
            cur = cur[key]
        else:
            i = int(index)
            if not isinstance(cur, list) or i >= len(cur) or i < 0:
                return None, False
            cur = cur[i]
    return cur, True
