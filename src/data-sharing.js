"use strict";
// Loads docs/data-sharing.yaml and renders the markdown page. The launch page and the
// config-audit report use the same entries.
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const FILE = path.join(__dirname, "..", "docs", "data-sharing.yaml");

function blank(s) { return s == null ? "" : String(s).trim(); }

function load(file) {
  const doc = yaml.load(fs.readFileSync(file || FILE, "utf8"));
  const entries = (doc.entries || []).map((e) => ({
    vendor: blank(e.vendor),
    product: blank(e.product),
    where: blank(e.where),
    controls: blank(e.controls),
    default: blank(e.default),
    official: (e.official || []).map((u) => blank(u)).filter(Boolean),
    notes: blank(e.notes),
    report: blank(e.report),
    report_url: blank(e.report_url)
  }));
  return { checked: blank(doc.checked), intro: blank(doc.intro), entries };
}

function field(label, value) {
  return "**" + label + ":**" + (value ? " " + value.replace(/\n/g, "\n\n") : "");
}

function toMarkdown(doc) {
  doc = doc || load();
  const L = ["# AI data-sharing settings", "", doc.intro, "", "Vendor pages checked " + doc.checked + ".", ""];
  for (const e of doc.entries) {
    L.push("## " + e.vendor, "", "**Product:** " + e.product, "", field("Where", e.where), "", field("What it controls", e.controls), "", field("Default", e.default), "");
    L.push("**Official documentation:**", "");
    if (e.official.length) e.official.forEach((u) => L.push("- " + u));
    else L.push("");
    L.push("", field("Notes from those docs", e.notes), "", field("Reports, separate from the vendor docs", e.report), "");
    L.push("**Report link:**" + (e.report_url ? " " + e.report_url : ""), "");
  }
  L.push("This page is generated from `docs/data-sharing.yaml`. Run `npm run docs` after editing that file.", "");
  return L.join("\n");
}

module.exports = { load, toMarkdown, FILE };
