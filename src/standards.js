"use strict";
// Maps findings to framework items using offline data in data/standards/*.yaml.
// Coverage (✅ covered / 🟡 partial / ⬜ not covered) describes what THIS TOOL checks, not your compliance.
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const ICON = { covered: "✅", partial: "🟡", none: "⬜" };

function load(dir) {
  const d = dir || path.join(__dirname, "..", "data", "standards");
  return fs.readdirSync(d).filter((f) => /\.ya?ml$/.test(f)).sort().map((f) => yaml.load(fs.readFileSync(path.join(d, f), "utf8")));
}
function map(groups, dir) {
  const all = groups.flatMap((g) => g.findings || []);
  return load(dir).map((fw) => ({
    id: fw.id, name: fw.name, source: fw.source, note: fw.note,
    items: fw.items.map((it) => {
      const hits = all.filter((f) => (it.checks || []).some((c) => f.rule.startsWith(c)) && f.severity !== "info");
      return { id: it.id, title: it.title, coverage: it.coverage, icon: ICON[it.coverage], how: it.how, findings: hits.length, high: hits.filter((f) => f.severity === "high").length };
    }),
    summary: { covered: fw.items.filter((i) => i.coverage === "covered").length, partial: fw.items.filter((i) => i.coverage === "partial").length, none: fw.items.filter((i) => i.coverage === "none").length }
  }));
}
module.exports = { map, load, ICON };
