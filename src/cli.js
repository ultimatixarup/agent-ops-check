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
  --no-ste             skip the STE tab
  --docs <file|dir>    extra docs/knowledge files for the prompt-injection scan (ADSF) (repeatable)
  --no-injection       skip the ADSF tab
  --no-evals           don't write generated eval sets (report/evals/)

Simplified Technical English (STE) style checks (not a certified ASD-STE100 checker):
  --ste <file|dir|->   check any text file or folder; "-" reads stdin (repeatable)
  --ste-text "..."     check pasted text
  --ste-dict <path>    your own approved-word list (one word per line); flags other words
  --ste-compare <original> <rewrite>   list facts and constraints missing from the STE rewrite

agent-ops-check ./agent.zip   scans a zipped agent (extracted to a temp folder, deleted after)
agent-ops-check ui [--port N] [--open]
  local page on 127.0.0.1 to pick a folder path or .zip and start a scan
agent-ops-check ste-ui [--out <file>] [--open]
  writes an offline STE page (paste box + file picker), default ./agent-ops-report/ste.html
  -h, --help`;

function parse(argv) {
  const o = { inputs: [], ignore: [], steInputs: [], stePaths: [], docs: [], format: ["html", "json", "md", "sarif"], out: "agent-ops-report" };
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
    else if (a === "--no-ste") o.noSte = true;
    else if (a === "--docs") o.docs.push(v());
    else if (a === "--no-injection") o.noInjection = true;
    else if (a === "--no-evals") o.noEvals = true;
    else if (a === "--ste") o.stePaths.push(v());
    else if (a === "--ste-text") o.steInputs.push({ name: "(pasted text)", text: v() });
    else if (a === "--ste-dict") o.steDict = path.resolve(v());
    else if (a === "--ste-compare") o.steCompare = [v(), v()];
    else if (a === "--open") o.open = true;
    else if (a === "ste-ui" && !o.inputs.length && !o.ui) o.ui = true;
    else if (a === "ui" && !o.inputs.length && !o.localUi) o.localUi = true;
    else if (a === "--port") o.port = +v();
    else if (a.startsWith("-")) throw new Error("Unknown option " + a);
    else o.inputs.push(a);
  }
  return o;
}

function readStdin() { try { return fs.readFileSync(0, "utf8"); } catch (_) { return ""; } }

function steFiles(p, out) {
  const st = fs.statSync(p);
  if (st.isDirectory()) { for (const e of fs.readdirSync(p).sort()) if (!["node_modules", ".git"].includes(e)) steFiles(path.join(p, e), out); }
  else if (/\.(md|txt|prompt|rst|adoc|html?)$/i.test(p) || !path.extname(p)) out.push({ name: path.relative(process.cwd(), p) || p, text: fs.readFileSync(p, "utf8") });
}

async function main(argv) {
  let o;
  try { o = parse(argv); } catch (e) { console.error(e.message + "\n\n" + HELP); return 2; }
  if (o.localUi) return require("./ui-server").start(o);
  if (o.ui) {
    const file = o.out && /\.html?$/.test(o.out) ? o.out : path.join(o.out, "ste.html");
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, require("./ste/ui")(o.rulesDir));
    console.log("Offline STE page: " + path.resolve(file) + "\nOpen it in any browser. It makes no network requests.");
    if (o.open) { const cmd = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open"; try { require("child_process").spawn(cmd, [path.resolve(file)], { detached: true, stdio: "ignore", shell: process.platform === "win32" }).unref(); } catch (_) {} }
    return 0;
  }
  for (const p of o.stePaths) {
    if (p === "-") o.steInputs.push({ name: "(stdin)", text: readStdin() });
    else { if (!fs.existsSync(p)) { console.error("Not found: " + p); return 2; } steFiles(p, o.steInputs); }
  }
  for (const d of o.docs) if (!fs.existsSync(d)) { console.error("Not found: " + d); return 2; }
  const steAsked = o.steInputs.length || o.steCompare || o.docs.length;
  if (o.help || (!o.inputs.length && !steAsked)) { console.log(HELP); return o.help ? 0 : 2; }
  o.inputsLabel = o.inputs.slice();
  const r = analyze(o.inputs, o);
  if (o.llm) r.llm = await require("./llm/optional").review(r, o.llm);
  fs.mkdirSync(o.out, { recursive: true });
  const W = { html: ["index.html", require("./report/html")], json: ["report.json", (x) => JSON.stringify(x, null, 2)], md: ["report.md", require("./report/md")], sarif: ["report.sarif", require("./report/sarif")] };
  const written = [];
  for (const f of o.format) { if (!W[f]) { console.error("Unknown format " + f); return 2; } const p = path.join(o.out, W[f][0]); fs.writeFileSync(p, W[f][1](r)); written.push(p); }
  const lb = r.groups.find((g) => g.id === "labs");
  if (r.evals) {
    const ev = require("./evals"); const d = path.join(o.out, "evals"); fs.mkdirSync(d, { recursive: true });
    const jl = (a) => a.map((x) => JSON.stringify(x)).join("\n") + (a.length ? "\n" : "");
    fs.writeFileSync(path.join(d, "functional.jsonl"), jl(r.evals.functional)); fs.writeFileSync(path.join(d, "security.jsonl"), jl(r.evals.security)); fs.writeFileSync(path.join(d, "README.md"), ev.toMarkdown(r.evals));
    written.push(d + "/ (" + r.evals.functional.length + " functional, " + r.evals.security.length + " security cases)");
  }
  if (r.groups.some((g) => g.id === "ste")) { const p = path.join(o.out, "ste.html"); fs.writeFileSync(p, require("./ste/ui")(o.rulesDir)); written.push(p); }
  if (lb && lb.redteam) { const p = path.join(o.out, "redteam-pack.txt"); fs.writeFileSync(p, lb.redteam); written.push(p); }
  console.log("agent-ops-check: score " + r.score + "/100 · " + r.filesScanned + " files · " + r.agents.length + " agent(s)" + (o.steInputs.length ? " · " + o.steInputs.length + " STE input(s)" : ""));
  for (const g of r.groups) console.log("  " + g.title.padEnd(36) + String(g.score).padStart(3) + "/100  high " + g.counts.high + " · medium " + g.counts.medium + " · low " + g.counts.low);
  if (r.standards) console.log("  Standards map: " + r.standards.length + " frameworks (maps to, not compliance)");
  console.log("Rules " + r.rules.version + " (" + r.rules.date + "). " + r.rules.hint);
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
