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
    } else if (g.id === "ste") {
      extra = "<p class=note>" + esc(g.note) + " <a href='ste.html'>Open the offline STE page</a> to paste text or pick files.</p>" + (g.dictionary ? "<p>Approved-word list: " + esc(g.dictionary) + "</p>" : "")
        + "<h3>Documents checked</h3><table><tr><th>Input</th><th>Sentences</th><th>Findings</th></tr>" + g.docs.map((d) => "<tr><td>" + esc(d.file) + "</td><td>" + d.sentences + "</td><td>" + d.findings + "</td></tr>").join("") + "</table>"
        + (g.compare ? "<h3>Information-loss check</h3><p>" + esc(g.compare.original) + " → " + esc(g.compare.rewrite) + ": <b>" + g.compare.missing.length + "</b> missing</p><table><tr><th>Sev</th><th>Kind</th><th>Missing value</th></tr>" + g.compare.missing.map((m) => "<tr class=" + m.severity + "><td>" + m.severity + "</td><td>" + esc(m.kind) + "</td><td><code>" + esc(m.value) + "</code></td></tr>").join("") + "</table>" : "");
    } else if (g.id === "injection") {
      extra = "<p class=note>" + esc(g.note) + "</p><p>" + g.docsScanned + " files scanned.</p>";
    } else if (g.id === "daemon" || g.id === "skills") {
      extra = "<p class=note>" + esc(g.note) + "</p>";
    } else if (g.id === "labs") {
      extra = (g.redteam ? "<p class=note>Red-team pack: 20 test messages to send to your own customer-facing bot are in <a href='redteam-pack.txt'>redteam-pack.txt</a>.</p><details><summary>Show the red-team pack</summary><pre style='white-space:pre-wrap'>" + esc(g.redteam) + "</pre></details>" : "") + "<h3>Tool runs</h3><table><tr><th>Tool</th><th>Input</th><th>Score</th><th>Verdict</th></tr>" + g.runs.map((x) => "<tr><td>" + esc(x.tool) + "</td><td>" + esc(x.file) + "</td><td>" + esc(x.score) + "</td><td>" + esc(x.verdict) + "</td></tr>").join("") + "</table>";
    }
    const rows = g.findings.map((f) => "<tr class=" + f.severity + "><td>" + f.severity + "</td><td><code>" + esc(f.rule) + "</code></td><td>" + esc(f.file + (f.line > 0 ? ":" + f.line : "")) + "</td><td>" + esc(f.message) + (f.evidence ? "<br><small><code>" + esc(f.evidence) + "</code></small>" : "") + "</td></tr>").join("");
    return "<section id=t" + i + (i ? " hidden" : "") + "><h2>" + esc(g.title) + " — " + g.score + "/100</h2>" + extra + "<h3>Findings (" + g.findings.length + ")</h3>" + (rows ? "<table><tr><th>Sev</th><th>Rule</th><th>File:line</th><th>What and why</th></tr>" + rows + "</table>" : "<p>No findings.</p>") + "</section>";
  }).join("");
  let more = "", moreNav = "";
  const n0 = r.groups.length;
  if (r.standards) {
    moreNav += "<button data-t=" + n0 + ">Standards map</button>";
    more += "<section id=t" + n0 + " hidden><h2>Standards map</h2><p class=note>Maps findings to framework items. ✅ covered by a check · 🟡 partly · ⬜ not checked. This shows what the tool looks at. It is <b>not</b> a compliance assessment.</p>"
      + r.standards.map((fw) => "<h3>" + esc(fw.name) + " <small>(" + fw.summary.covered + " ✅ · " + fw.summary.partial + " 🟡 · " + fw.summary.none + " ⬜)</small></h3><p><small>" + esc(fw.note) + "</small></p><table><tr><th>Item</th><th>Status</th><th>Findings here</th><th>What the tool checks</th></tr>"
        + fw.items.map((i) => "<tr><td>" + esc(i.id + " " + i.title) + "</td><td>" + i.icon + "</td><td>" + (i.findings ? i.findings + (i.high ? " (" + i.high + " high)" : "") : "-") + "</td><td>" + esc(i.how) + "</td></tr>").join("") + "</table>").join("") + "</section>";
  }
  if (r.evals) {
    const n1 = n0 + (r.standards ? 1 : 0);
    moreNav += "<button data-t=" + n1 + ">Eval sets <b>" + (r.evals.functional.length + r.evals.security.length) + "</b></button>";
    const rows = (a) => a.map((c) => "<tr><td>" + esc(c.id) + "</td><td>" + esc(c.agent) + "</td><td>" + esc(c.category + (c.owasp ? " (" + c.owasp + ")" : "")) + "</td><td>" + esc(c.input) + "</td><td>" + esc(c.expect) + "</td></tr>").join("");
    more += "<section id=t" + n1 + " hidden><h2>Generated eval sets</h2><p class=note>Generated offline from the agent's source. Files: <code>evals/functional.jsonl</code>, <code>evals/security.jsonl</code>, <code>evals/README.md</code>. Run them against your agent; this tool does not run them.</p>"
      + "<h3>Functional (" + r.evals.functional.length + ")</h3><table><tr><th>ID</th><th>Agent</th><th>Category</th><th>Input</th><th>Expected</th></tr>" + rows(r.evals.functional) + "</table>"
      + "<h3>Security (" + r.evals.security.length + ")</h3><table><tr><th>ID</th><th>Agent</th><th>Category</th><th>Input</th><th>Expected</th></tr>" + rows(r.evals.security) + "</table></section>";
  }
  const nav = r.groups.map((g, i) => "<button data-t=" + i + (i ? "" : " class=on") + ">" + esc(g.title) + " <b>" + g.score + "</b></button>").join("");
  return "<!doctype html><html lang=en><head><meta charset=utf-8><meta name=viewport content='width=device-width,initial-scale=1'>"
    + "<meta http-equiv=Content-Security-Policy content=\"default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'\">"
    + "<title>agent-ops-check report</title><style>body{font:14px/1.45 system-ui,sans-serif;max-width:1100px;margin:24px auto;padding:0 16px;color:#1b1b1b}h1{margin:0}.score{font-size:48px;font-weight:700}.note{background:#f3f6fa;padding:8px 12px;border-radius:6px}nav button{border:1px solid #ccc;background:#fff;padding:8px 12px;margin:4px 4px 0 0;border-radius:6px;cursor:pointer}nav button.on{background:#1b1b1b;color:#fff}table{border-collapse:collapse;width:100%;margin:8px 0 16px}td,th{border:1px solid #ddd;padding:5px 7px;text-align:left;vertical-align:top}tr.high td:first-child,td.bad{color:#b00020;font-weight:600}tr.medium td:first-child{color:#a65b00;font-weight:600}td.ok{color:#11743a}code{font-size:12px}</style></head><body>"
    + "<h1>Agent ops report</h1><p class=score>" + r.score + "<small>/100</small></p>"
    + "<p class=note>" + esc(r.network) + " " + esc(r.disclaimer) + "</p>" + (r.rules ? "<p><small>Rules " + esc(r.rules.version) + " (" + esc(r.rules.date) + "). " + esc(r.rules.hint) + "</small></p>" : "") + "<p>" + r.filesScanned + " files · agents: " + esc(r.agents.join(", ")) + " · " + esc(r.generatedAt) + "</p>"
    + "<nav>" + nav + moreNav + "</nav>" + tabs + more
    + (r.llm ? "<section><h2>LLM review (" + esc(r.llm.provider) + ")</h2><pre style='white-space:pre-wrap'>" + esc(r.llm.text || r.llm.error) + "</pre></section>" : "")
    + "<script>document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('nav button').forEach(x=>x.classList.toggle('on',x===b));document.querySelectorAll('section[id]').forEach((s,i)=>s.hidden=String(i)!==b.dataset.t)})</script></body></html>";
};
