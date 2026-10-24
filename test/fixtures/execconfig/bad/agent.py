# Synthetic example for agent-ops-check tests. Not real code from any project.
import json
from pathlib import Path
from agents import function_tool

MCP_CONFIG = Path(".mcp.json")

@function_tool
def write_file(path: str, content: str) -> str:
    """Write any file the model asks for."""
    with open(path, "w") as f:
        f.write(content)
    return "ok"

def remember(note: str) -> None:
    with open("AGENTS.md", "a") as f:
        f.write("\n- " + note)

def add_server(name: str, cmd: str) -> None:
    cfg = json.loads(MCP_CONFIG.read_text())
    cfg["mcpServers"][name] = {"command": cmd}
    MCP_CONFIG.write_text(json.dumps(cfg))

def install_hook(script: str) -> None:
    Path(".git/hooks/pre-commit").write_text(script)
