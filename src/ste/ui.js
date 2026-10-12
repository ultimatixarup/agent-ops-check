"use strict";
// Builds a single offline HTML page (paste box + file picker + optional word list + compare) that runs the
// same STE rules in the browser. CSP default-src 'none': it cannot load or send anything.
const fs = require("fs");
const path = require("path");
const { loadRules } = require("../util");

module.exports = function steUiHtml(rulesDir) {
  const R = loadRules("ste", rulesDir);
  const core = fs.readFileSync(path.join(__dirname, "core.js"), "utf8");
  const rules = JSON.stringify(R).replace(/</g, "\\u003c");
  return `<!doctype html><html lang=en><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">
<meta http-equiv=Content-Security-Policy content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'">
<title>STE checker (offline) — agent-ops-check</title>
<style>body{font:14px/1.45 system-ui,sans-serif;max-width:1000px;margin:24px auto;padding:0 16px}textarea{width:100%;min-height:160px;font:13px ui-monospace,monospace}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ddd;padding:4px 6px;text-align:left;vertical-align:top}.high{color:#b00020;font-weight:600}.medium{color:#a65b00;font-weight:600}.note{background:#f3f6fa;padding:8px 12px;border-radius:6px}button{padding:6px 12px}</style></head><body>
<h1>Simplified Technical English checker</h1>
<p class=note>Runs entirely in this page. Nothing is uploaded and the page cannot make network requests. Style checks inspired by ASD-STE100 writing rules. <b>Not a certified ASD-STE100 checker.</b> No specification text or dictionary is included.</p>
<h2>1. Check text</h2>
<textarea id=text placeholder="Paste a prompt, system prompt or instructions"></textarea>
<p>Or open files: <input type=file id=files multiple accept=".md,.txt,.prompt,.yaml,.yml,.json"> · Optional approved-word list (one word per line): <input type=file id=dict accept=".txt,.csv"></p>
<button id=run>Check</button> <span id=sum></span>
<div id=out></div>
<h2>2. Information-loss check</h2>
<p>Paste the original and the STE rewrite. It lists numbers, units, dates, names, paths, identifiers and constraint words (must, never, only, at least, before…) missing from the rewrite.</p>
<textarea id=orig placeholder="Original"></textarea><textarea id=rew placeholder="STE rewrite"></textarea>
<button id=cmp>Compare</button><div id=cout></div>
<script>${core}</script>
<script>
const R=${rules};let DICT=null;const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function table(fs){if(!fs.length)return"<p>No findings.</p>";return"<table><tr><th>Sev</th><th>Rule</th><th>Where</th><th>What</th><th>Text</th></tr>"+fs.map(f=>"<tr><td class="+f.severity+">"+f.severity+"</td><td>"+esc(f.rule)+"</td><td>"+esc(f.file+":"+f.line)+"</td><td>"+esc(f.message)+"</td><td><code>"+esc(f.evidence)+"</code></td></tr>").join("")+"</table>"}
async function run(){const items=[];if($("text").value.trim())items.push({name:"(pasted)",text:$("text").value});for(const f of $("files").files)items.push({name:f.name,text:await f.text()});
let all=[],n=0;for(const it of items){const r=STE.check(it.text,R,{file:it.name,dict:DICT});all=all.concat(r.findings);n+=r.sentences}
$("sum").textContent=items.length+" input(s), "+n+" sentences, "+all.length+" findings";$("out").innerHTML=table(all)}
$("dict").onchange=async e=>{const f=e.target.files[0];DICT=f?(await f.text()).split(/[\\s,]+/).filter(Boolean):null};
$("run").onclick=run;
$("cmp").onclick=()=>{const r=STE.compare($("orig").value,$("rew").value);$("cout").innerHTML=r.missing.length?"<table><tr><th>Sev</th><th>Kind</th><th>Missing value</th></tr>"+r.missing.map(m=>"<tr><td class="+m.severity+">"+m.severity+"</td><td>"+esc(m.kind)+"</td><td><code>"+esc(m.value)+"</code></td></tr>").join("")+"</table>":"<p>Nothing missing.</p>"};
</script></body></html>`;
};
