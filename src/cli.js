"use strict";
const fs = require("fs");
const path = require("path");
const { analyze } = require("./index");

const HELP = `agent-ops-check <dir|files...> [options]

Scans agent code, prompts, MCP configs, .env.example, chat transcripts (.jsonl) and bill exports (.csv)
on THIS machine. No network calls unless you pass --llm.

  --out <dir>          report folder (default ./agent-ops-report)
  --format <list>      html,json,md,sarif (default html,json,md,sarif)
  --fail-on <sev>      exit 1 if any finding at or above high|medium|low (for CI)
  --ignore <glob>      skip paths (repeatable)
  --rules <dir>        use your own edited rules/*.yaml
  --no-labs            skip the Agent Health Checker / bill / observability pass
  --llm <provider>     optional review with YOUR key: openai | anthropic | openrouter
  -h, --help`;

function parse(argv) {
  const o = { inputs: [], ignore: [], format: ["html", "json", "md", "sarif"], out: "agent-ops-report" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]; const v = () => argv[++i];
    if (a === "-h" || a === "--help") o.help = true;
    else if (a === "--out") o.out = v();
    else if (a === "--format") o.format = v().split(",").map((s) => s.trim());
    else if (a === "--fail-on") o.failOn = v();
    else if (a === "--ignore") o.ignore.push(v());
    else if (a === "--rules") o.rulesDir = path.resolve(v());
    else if (a === "--no-labs") o.noLabs = true;
    else if (a === "--llm") o.llm = v();
    else if (a.startsWith("-")) throw new Error("Unknown option " + a);
    else o.inputs.push(a);
  }
  return o;
}

async function main(argv) {
  let o;
  try { o = parse(argv); } catch (e) { console.error(e.message + "\n\n" + HELP); return 2; }
  if (o.help || !o.inputs.length) { console.log(HELP); return o.help ? 0 : 2; }
  const r = analyze(o.inputs, o);
  if (o.llm) r.llm = await require("./llm/optional").review(r, o.llm);
  fs.mkdirSync(o.out, { recursive: true });
  const W = { html: ["index.html", require("./report/html")], json: ["report.json", (x) => JSON.stringify(x, null, 2)], md: ["report.md", require("./report/md")], sarif: ["report.sarif", require("./report/sarif")] };
  const written = [];
  for (const f of o.format) { if (!W[f]) { console.error("Unknown format " + f); return 2; } const p = path.join(o.out, W[f][0]); fs.writeFileSync(p, W[f][1](r)); written.push(p); }
  const lb = r.groups.find((g) => g.id === "labs");
  if (lb && lb.redteam) { const p = path.join(o.out, "redteam-pack.txt"); fs.writeFileSync(p, lb.redteam); written.push(p); }
  console.log("agent-ops-check: score " + r.score + "/100 · " + r.filesScanned + " files · " + r.agents.length + " agent(s)");
  for (const g of r.groups) console.log("  " + g.title.padEnd(36) + String(g.score).padStart(3) + "/100  high " + g.counts.high + " · medium " + g.counts.medium + " · low " + g.counts.low);
  console.log(r.network);
  if (r.llm && r.llm.error) console.log("LLM: " + r.llm.error);
  console.log("Report: " + written.join(", "));
  if (o.failOn) {
    const order = ["low", "medium", "high"]; const min = order.indexOf(o.failOn);
    if (min < 0) { console.error("--fail-on must be high|medium|low"); return 2; }
    if (r.groups.some((g) => g.findings.some((f) => order.indexOf(f.severity) >= min))) return 1; // "info" is -1, never fails
  }
  return 0;
}
module.exports = { main, parse };
