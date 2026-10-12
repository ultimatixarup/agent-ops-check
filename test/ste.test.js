"use strict";
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");
const yaml = require("js-yaml");
const core = require("../src/ste/core");
const ui = require("../src/ste/ui");
const { analyze } = require("../src");
const R = yaml.load(fs.readFileSync(path.join(__dirname, "..", "rules", "ste.yaml"), "utf8"));
const BIN = path.join(__dirname, "..", "bin", "agent-ops-check.js");
const EX = path.join(__dirname, "..", "examples", "ste");
const rules = (t, o) => core.check(t, R, o).findings.map((f) => f.rule);

test("sentence length: procedural > 20, descriptive > 25", () => {
  const proc = "Open " + "the valve ".repeat(10) + "now."; // 22 words, starts with an imperative
  const desc = "The system " + "has a part ".repeat(8) + "inside."; // 27 words, descriptive
  assert.ok(rules(proc).includes("ste.sentence_length"));
  assert.ok(rules(desc).includes("ste.sentence_length"));
  assert.ok(!rules("Open the valve. Close the door.").includes("ste.sentence_length"));
  assert.ok(!rules("The system " + "has a part ".repeat(6) + "inside.").includes("ste.sentence_length")); // 21 descriptive words: OK
});

test("passive, complex tenses, -ing verb, semicolon", () => {
  assert.ok(rules("The valve was opened by the operator.").includes("ste.passive_voice"));
  assert.ok(rules("The data is sent to the server.").includes("ste.passive_voice"));
  assert.ok(rules("The operator has opened the valve.").includes("ste.complex_tense"));
  assert.ok(rules("The pump is running.").includes("ste.complex_tense"));
  assert.ok(rules("The report must be approved.").includes("ste.complex_tense"));
  assert.ok(rules("Before starting the engine, check the oil.").includes("ste.ing_verb"));
  assert.ok(rules("Stop the pump; open the valve.").includes("ste.semicolon"));
  assert.deepStrictEqual(rules("Open the valve. The pump stops."), []);
});

test("noun clusters, multiple instructions, phrasal verbs, hedges, word hints", () => {
  assert.ok(rules("Check the oil pressure warning light indicator.").includes("ste.noun_cluster"));
  assert.ok(!rules("Check the oil pressure.").includes("ste.noun_cluster"));
  assert.ok(rules("Open the valve and start the pump.").includes("ste.multiple_instructions"));
  assert.ok(!rules("Open the valve and the door.").includes("ste.multiple_instructions"));
  assert.ok(rules("Set up the agent.").includes("ste.phrasal_verb"));
  assert.ok(rules("Reply as soon as possible.").includes("ste.hedge"));
  assert.ok(rules("Utilize the backup.").includes("ste.word_hint"));
});

test("code blocks, headings and URLs are not checked as prose", () => {
  assert.deepStrictEqual(rules("# Was set up\n```\nthe pump is running; it was opened\n```\nSee https://example.com/was-opened-by-x."), []);
});

test("--ste-dict style word list flags words that are not on it", () => {
  const dict = fs.readFileSync(path.join(EX, "approved-words.txt"), "utf8").split(/\s+/).filter(Boolean);
  const f = core.check("Open the valve. Rotate the handle.", R, { dict }).findings;
  assert.strictEqual(f.length, 1);
  assert.match(f[0].message, /rotate, handle/);
});

test("information-loss compare finds missing numbers, units, dates, names, constraints", () => {
  const r = core.compare(fs.readFileSync(path.join(EX, "original.txt"), "utf8"), fs.readFileSync(path.join(EX, "rewrite.txt"), "utf8"));
  const got = r.missing.map((m) => m.kind + ":" + m.value.toLowerCase());
  for (const want of ["number+unit:30 seconds", "number+unit:3 retries", "date:2026-10-19", "number+unit:$500", "constraint:must", "constraint:never", "constraint:only", "constraint:before", "constraint:within"]) assert.ok(got.includes(want), want + " in " + got.join(" | "));
  assert.ok(!got.some((g) => /billing-sync|\/v1\/charges|jane doe/.test(g)), "kept facts must not be flagged");
  assert.deepStrictEqual(core.compare("Restart within 30 seconds.", "Restart within 30 seconds.").missing, []);
});

test("scanner: prompts and .md in an agent folder get an STE tab", () => {
  const r = analyze([path.join(__dirname, "..", "examples", "bad-agent")], { noLabs: true });
  const g = r.groups.find((x) => x.id === "ste");
  assert.ok(g && g.docs.some((d) => /instructions\.md/.test(d.file)));
  assert.match(g.note, /Not a certified ASD-STE100 checker/);
  assert.deepStrictEqual(r.groups.map((g) => g.id), ["crossover", "actions", "governance", "injection", "ste"]); // overall score still from tabs 1–3
});

test("CLI: --ste-text, stdin, files/dirs, --ste-compare, --ste-dict; reports written; no network", () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), "ste-"));
  const run = (args, input) => execFileSync(process.execPath, ["--require", path.join(__dirname, "no-network.js"), BIN, ...args, "--out", out], { input, encoding: "utf8" });
  assert.match(run(["--ste-text", "The pump is running; perhaps utilize the valve."]), /1 STE input/);
  let j = JSON.parse(fs.readFileSync(path.join(out, "report.json"), "utf8"));
  assert.ok(j.steOnly && j.groups[0].findings.length >= 4);
  run(["--ste", "-"], "The valve was opened by the operator.\n");
  j = JSON.parse(fs.readFileSync(path.join(out, "report.json"), "utf8"));
  assert.strictEqual(j.groups[0].docs[0].file, "(stdin)");
  run(["--ste", EX, "--ste-dict", path.join(EX, "approved-words.txt")]);
  j = JSON.parse(fs.readFileSync(path.join(out, "report.json"), "utf8"));
  assert.strictEqual(j.groups[0].docs.length, 3);
  assert.ok(j.groups[0].findings.some((f) => f.rule === "ste.not_in_dictionary"));
  run(["--ste-compare", path.join(EX, "original.txt"), path.join(EX, "rewrite.txt")]);
  j = JSON.parse(fs.readFileSync(path.join(out, "report.json"), "utf8"));
  assert.ok(j.groups[0].compare.missing.length >= 9);
  for (const f of ["index.html", "report.md", "report.sarif", "ste.html"]) assert.ok(fs.existsSync(path.join(out, f)), f);
  assert.match(fs.readFileSync(path.join(out, "index.html"), "utf8"), /Information-loss check/);
  assert.match(fs.readFileSync(path.join(out, "report.md"), "utf8"), /Not a certified ASD-STE100 checker/);
});

test("ste-ui: offline page with paste box, file picker, CSP, and the same rules in the browser", () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), "steui-"));
  execFileSync(process.execPath, [BIN, "ste-ui", "--out", path.join(out, "ste.html")]);
  const html = fs.readFileSync(path.join(out, "ste.html"), "utf8");
  assert.match(html, /default-src 'none'/);
  assert.match(html, /<textarea id=text/);
  assert.match(html, /<input type=file id=files multiple/);
  assert.match(html, /<input type=file id=dict/);
  assert.match(html, /Not a certified ASD-STE100 checker/);
  assert.ok(!/fetch\(|XMLHttpRequest|https?:\/\/(?!example)/.test(html.replace(/https?:\/\/\S+(?=["'`])/g, "")), "no network code");
  // Run the page's own scripts against a stub DOM and compare with the Node results.
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const els = {}; const el = (id) => (els[id] = els[id] || { value: "", files: [], innerHTML: "", textContent: "" });
  const window = {}; const document = { getElementById: el };
  const ctx = vm.createContext({ window, document, console });
  vm.runInContext(scripts[0], ctx); ctx.STE = window.STE;
  vm.runInContext(scripts[1], ctx);
  const text = "Before starting the engine, make sure the oil pressure warning light indicator is off; it was set up by Jim.";
  el("text").value = text;
  return els.run.onclick().then(() => {
    const nodeCount = core.check(text, R).findings.length;
    assert.match(els.sum.textContent, new RegExp(nodeCount + " findings"));
    el("orig").value = "Never exceed 30 seconds."; el("rew").value = "Do not wait.";
    els.cmp.onclick();
    assert.match(els.cout.innerHTML, /30 seconds/);
  });
});

test("README documents STE inputs and the not-certified notice", () => {
  const md = fs.readFileSync(path.join(__dirname, "..", "README.md"), "utf8");
  for (const s of ["--ste-text", "--ste -", "--ste-dict", "--ste-compare", "ste-ui", "not a certified"]) assert.ok(md.toLowerCase().includes(s.toLowerCase()), s);
});
