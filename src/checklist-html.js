"use strict";
// Shared HTML for the data-sharing checklist. No filesystem access.

const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function linkList(urls) {
  return (urls || []).filter(Boolean).map((u) => "<a href=\"" + esc(u) + "\">" + esc(u) + "</a>").join("<br>");
}

function checklistHtml(doc) {
  const rows = (doc && doc.entries) || [];
  const head = "<p class=note>" + esc(doc && doc.intro || "") + "</p>";
  const table = "<table style='word-break:break-word'><tr><th>Vendor</th><th>Product</th><th>Where</th><th>What it controls</th><th>Default</th><th>Official documentation</th><th>Notes from those docs</th><th>Reports, separate from the vendor docs</th></tr>"
    + rows.map((e) => "<tr><td>" + esc(e.vendor) + "</td><td>" + esc(e.product) + "</td><td>" + esc(e.where) + "</td><td>" + esc(e.controls) + "</td><td>" + esc(e.default) + "</td><td>" + linkList(e.official) + "</td><td>" + esc(e.notes) + "</td><td>" + esc(e.report) + (e.report_url ? "<br>" + linkList([e.report_url]) : "") + "</td></tr>").join("")
    + "</table>";
  const when = doc && doc.checked ? "<p><small>Vendor pages checked " + esc(doc.checked) + ". An empty cell means the cited page does not state that fact.</small></p>" : "";
  return head + when + table;
}

module.exports = { checklistHtml };
