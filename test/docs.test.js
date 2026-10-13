"use strict";
const test = require("node:test"), assert = require("node:assert"), fs = require("fs"), path = require("path");
const gen = require("../scripts/gen-docs.js");
const { analyze } = require("../src/index.js");
const ROOT = path.join(__dirname, "..");
const readme = () => fs.readFileSync(path.join(ROOT, "README.md"), "utf8");
const covered = (ids, id) => ids.some((k) => k === id || (k.endsWith(".*") && id.startsWith(k.slice(0, -1))));

test("README check section matches the rules (run npm run docs)", () => {
  assert.strictEqual(gen.render(readme()), readme());
});
test("every YAML rule ID has a catalog entry", () => {
  const d = gen.documentedIds();
  for (const id of d.yaml) assert.ok(d.catalog.includes(id), "undocumented YAML rule " + id);
});
test("every rule emitted by the example scans is documented", async () => {
  const d = gen.documentedIds(), docs = readme();
  for (const ex of ["examples/bad-agent", "examples/good-agent"]) {
    const res = analyze([path.join(ROOT, ex)], {});
    const ids = new Set();
    for (const g of res.groups) for (const f of g.findings) ids.add(f.rule);
    assert.ok(ids.size > 0, "expected findings in " + ex);
    for (const id of ids) {
      const ok = covered(d.catalog, id);
      assert.ok(ok, "undocumented rule " + id);
      const leaf = id.split(".").pop();
      assert.ok(docs.includes(leaf), "README does not mention " + leaf);
    }
  }
});
test("every check group maps only to real standards items, worded 'maps to'", () => {
  const std = require("../src/standards").load(), cs = gen.webCheckStandards();
  const real = new Set(std.flatMap((fw) => fw.items.map((i) => fw.id + ":" + i.id)));
  for (const id of ["crossover", "actions", "governance", "labs", "injection", "ste"]) {
    const g = cs.groups.find((x) => x.id === id);
    assert.ok(g && g.frameworks.length, "no standards for group " + id);
    for (const fw of g.frameworks) for (const it of fw.items) assert.ok(real.has(fw.id + ":" + it.id), fw.id + ":" + it.id);
  }
  assert.ok(cs.groups.find((g) => g.id === "injection").frameworks.some((fw) => fw.items.some((i) => i.id === "LLM01")));
  assert.strictEqual(cs.llmail.rules, 8);
  const docs = readme();
  assert.ok(docs.includes("docs/LLMAIL_BENCHMARK.md") && docs.includes("not affiliated with or endorsed by Microsoft, OWASP"));
  assert.ok(!/\bcompliant\b/i.test(docs.slice(docs.indexOf(gen.START), docs.indexOf(gen.END)).replace(/never "compliant"/g, "")));
});
