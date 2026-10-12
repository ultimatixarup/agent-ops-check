"use strict";
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
module.exports = function html(r) {
  const tabs = r.groups.map((g, i) => {
    let extra = "";
    if (g.id === "crossover") {
      extra = "<h3>Source-to-sink matrix</h3>" + (g.matrix.length ? "<table><tr><th>Agent</th><th>Personal source</th><th>Work sink</th></tr>" + g.matrix.map((m) => "<tr class=bad><td>" + esc(m.agent) + "</td><td>" + esc(m.source) + "<br><small>" + esc(m.sourceAt) + "</small></td><td>" + esc(m.sink) + "<br><small>" + esc(m.sinkAt) + "</small></td></tr>").join("") + "</table>" : "<p>No agent both reads a personal source and writes to a work sink.</p>")
        + "<h3>Connector inventory</h3><table><tr><th>Agent</th><th>Connectors</th><th>Credentials (names only)</th><th>Scopes</th></tr>" + g.inventory.map((a) => "<tr><td>" + esc(a.agent) + "</td><td>" + esc(a.connectors.join(", ")) + "</td><td>" + esc(a.credentials.join(", ")) + "</td><td>" + esc(a.scopes.join(", ")) + "</td></tr>").join("") + "</table>";
    } else if (g.id === "actions") {
      const yn = (b) => (b ? "<td class=ok>yes</td>" : "<td class=bad>no</td>");
      extra = "<h3>Gate map</h3><table><tr><th>Agent</th><th>Action</th><th>Where</th><th>Approval</th><th>Dry-run</th><th>Rate limit</th><th>Allowlist</th></tr>" + g.actions.map((t) => "<tr><td>" + esc(t.agent) + "</td><td><code>" + esc(t.action) + "</code></td><td>" + esc(t.file + ":" + t.line) + "</td>" + yn(t.gates.approval) + yn(t.gates.dry_run) + yn(t.gates.rate_limit) + yn(t.gates.domain_allowlist) + "</tr>").join("") + "</table>";
    } else if (g.id === "governance") {
      const inv = g.inventory;
      extra = "<h3>AI inventory</h3><ul><li>Providers: " + esc(Object.keys(inv.providers).join(", ") || "none found") + "</li><li>Frameworks/SDKs: " + esc(Object.keys(inv.frameworks).join(", ") || "none found") + "</li><li>Models: " + esc(Object.keys(inv.models).join(", ") || "none found") + "</li></ul>";
    } else if (g.id === "labs") {
      extra = "<h3>Tool runs</h3><table><tr><th>Tool</th><th>Input</th><th>Score</th><th>Verdict</th></tr>" + g.runs.map((x) => "<tr><td>" + esc(x.tool) + "</td><td>" + esc(x.file) + "</td><td>" + esc(x.score) + "</td><td>" + esc(x.verdict) + "</td></tr>").join("") + "</table>";
    }
    const rows = g.findings.map((f) => "<tr class=" + f.severity + "><td>" + f.severity + "</td><td><code>" + esc(f.rule) + "</code></td><td>" + esc(f.file + (f.line > 0 ? ":" + f.line : "")) + "</td><td>" + esc(f.message) + (f.evidence ? "<br><small><code>" + esc(f.evidence) + "</code></small>" : "") + "</td></tr>").join("");
    return "<section id=t" + i + (i ? " hidden" : "") + "><h2>" + esc(g.title) + " — " + g.score + "/100</h2>" + extra + "<h3>Findings (" + g.findings.length + ")</h3>" + (rows ? "<table><tr><th>Sev</th><th>Rule</th><th>File:line</th><th>What and why</th></tr>" + rows + "</table>" : "<p>No findings.</p>") + "</section>";
  }).join("");
  const nav = r.groups.map((g, i) => "<button data-t=" + i + (i ? "" : " class=on") + ">" + esc(g.title) + " <b>" + g.score + "</b></button>").join("");
  return "<!doctype html><html lang=en><head><meta charset=utf-8><meta name=viewport content='width=device-width,initial-scale=1'>"
    + "<meta http-equiv=Content-Security-Policy content=\"default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'\">"
    + "<title>agent-ops-check report</title><style>body{font:14px/1.45 system-ui,sans-serif;max-width:1100px;margin:24px auto;padding:0 16px;color:#1b1b1b}h1{margin:0}.score{font-size:48px;font-weight:700}.note{background:#f3f6fa;padding:8px 12px;border-radius:6px}nav button{border:1px solid #ccc;background:#fff;padding:8px 12px;margin:4px 4px 0 0;border-radius:6px;cursor:pointer}nav button.on{background:#1b1b1b;color:#fff}table{border-collapse:collapse;width:100%;margin:8px 0 16px}td,th{border:1px solid #ddd;padding:5px 7px;text-align:left;vertical-align:top}tr.high td:first-child,td.bad{color:#b00020;font-weight:600}tr.medium td:first-child{color:#a65b00;font-weight:600}td.ok{color:#11743a}code{font-size:12px}</style></head><body>"
    + "<h1>Agent ops report</h1><p class=score>" + r.score + "<small>/100</small></p>"
    + "<p class=note>" + esc(r.network) + " " + esc(r.disclaimer) + "</p><p>" + r.filesScanned + " files · agents: " + esc(r.agents.join(", ")) + " · " + esc(r.generatedAt) + "</p>"
    + "<nav>" + nav + "</nav>" + tabs
    + (r.llm ? "<section><h2>LLM review (" + esc(r.llm.provider) + ")</h2><pre style='white-space:pre-wrap'>" + esc(r.llm.text || r.llm.error) + "</pre></section>" : "")
    + "<script>document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('nav button').forEach(x=>x.classList.toggle('on',x===b));document.querySelectorAll('section[id]').forEach((s,i)=>s.hidden=String(i)!==b.dataset.t)})</script></body></html>";
};
