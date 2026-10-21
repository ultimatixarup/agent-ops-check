"use strict";
// Thin shim: Node does not score cases. It finds the optional Python package and
// passes a config path and a results path. The two sides exchange files only.
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const HELP = `agent-ops-check eval <agent-evals.yaml> [--live] [--dry-run] [--out results.json]

Run eval packs against one agent you configure. Dry-run is the default: the
config is validated and the case list is printed, and the agent is not called.

  --live               call the agent. It may take real actions.
  --dry-run            force a dry-run even if the file sets live: true
  --out <file>         results.json path (default ./results.json)

The static scan does not use this command and does not need Python.
eval contacts only the agent in the config (HTTP, a Python callable, a CLI
command, or a Pydantic AI agent). This version does not call a model API.
An opt-in judge may be added later.

Needs the optional Python package agent-ops-evals (pydantic-evals). From a checkout:
  python -m pip install -e "./python[dev]"
  agent-ops-check eval examples/agent-evals.yaml
`;

const MISSING = `agent-ops-check eval needs the optional Python package agent-ops-evals.
It is built on pydantic-evals and is not required for the static scan.

Python or uv was not found, or the package is not installed, so the eval runner could not be started.

From a checkout of this repo:
  python -m pip install -e "./python[dev]"
  python -m agent_ops_evals run agent-evals.yaml

Or, if you have uv (https://docs.astral.sh/uv/):
  uv run --project python python -m agent_ops_evals run agent-evals.yaml

When the package is published, this command also tries:
  uvx --from agent-ops-evals agent-ops-evals run agent-evals.yaml

The static scan (agent-ops-check <folder>) keeps working with no Python installed.
`;

function commandExists(cmd) {
  const finder = process.platform === "win32" ? "where" : "which";
  const found = spawnSync(finder, [cmd], { stdio: "ignore" });
  return found.status === 0;
}

function canImport(bin) {
  const found = spawnSync(bin, ["-c", "import agent_ops_evals"], { stdio: "ignore" });
  return found.status === 0;
}

function resolveRunner(root) {
  if (process.env.AGENT_OPS_EVALS_RUNNER === "missing") return null;
  if (process.env.AGENT_OPS_EVALS_PYTHON) {
    return { command: process.env.AGENT_OPS_EVALS_PYTHON, args: ["-m", "agent_ops_evals"], via: "env-python" };
  }
  const pythonDir = path.join(root, "python");
  const hasLocal = fs.existsSync(path.join(pythonDir, "pyproject.toml"));
  for (const bin of ["python3", "python"]) {
    if (canImport(bin)) return { command: bin, args: ["-m", "agent_ops_evals"], via: "python" };
  }
  if (hasLocal && commandExists("uv")) {
    return { command: "uv", args: ["run", "--project", pythonDir, "python", "-m", "agent_ops_evals"], via: "uv" };
  }
  if (commandExists("uvx")) {
    if (hasLocal) return { command: "uvx", args: ["--from", pythonDir, "agent-ops-evals"], via: "uvx-local" };
    return { command: "uvx", args: ["--from", "agent-ops-evals", "agent-ops-evals"], via: "uvx" };
  }
  return null;
}

function parseEval(argv) {
  const o = { live: false, dryRun: false, out: "results.json", config: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => {
      if (i + 1 >= argv.length) throw new Error("Missing value for " + a);
      return argv[++i];
    };
    if (a === "-h" || a === "--help") o.help = true;
    else if (a === "--live") o.live = true;
    else if (a === "--dry-run") o.dryRun = true;
    else if (a === "--out") o.out = next();
    else if (a.startsWith("-")) throw new Error("Unknown option " + a);
    else if (o.config) throw new Error("Unexpected extra argument " + a);
    else o.config = a;
  }
  return o;
}

function main(argv) {
  let o;
  try { o = parseEval(argv); } catch (e) { console.error(e.message + "\n\n" + HELP); return 2; }
  if (o.help) { console.log(HELP); return 0; }
  if (o.live && o.dryRun) { console.error("Pass only one of --live and --dry-run.\n\n" + HELP); return 2; }
  if (!o.config) { console.error("Missing config file.\n\n" + HELP); return 2; }
  if (!fs.existsSync(o.config)) { console.error("Config not found: " + o.config); return 2; }
  const root = path.join(__dirname, "..");
  const runner = resolveRunner(root);
  if (!runner) { console.error(MISSING); return 2; }
  const args = runner.args.concat(["run", path.resolve(o.config), "--out", path.resolve(o.out)]);
  if (o.live) args.push("--live");
  if (o.dryRun) args.push("--dry-run");
  const child = spawnSync(runner.command, args, { stdio: "inherit" });
  if (child.error) {
    console.error("Could not start " + runner.command + ": " + child.error.message);
    console.error(MISSING);
    return 2;
  }
  return child.status === null ? 2 : child.status;
}

module.exports = { main, parseEval, resolveRunner, HELP, MISSING };
