# Synthetic example for agent-ops-check tests. A write tool limited to one work folder.
from pathlib import Path
from agents import function_tool

WORK = Path("work").resolve()
PROTECTED = {".mcp.json", "AGENTS.md", "CLAUDE.md", ".vscode", ".git", ".github"}

@function_tool
def write_file(path: str, content: str) -> str:
    target = (WORK / path).resolve()
    if not target.is_relative_to(WORK) or any(p in PROTECTED for p in target.parts):
        return "refused"
    target.write_text(content)
    return "ok"

def read_rules() -> str:
    return Path("AGENTS.md").read_text()
