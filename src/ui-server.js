"use strict";
// `agent-ops-check ui`: a small page served on 127.0.0.1 only. Pick a folder path or a .zip, start a scan,
// and view the report. It listens locally and makes no outbound network calls.
const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { analyze } = require("./index");

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const PAGE = (msg) => `<!doctype html><html lang=en><head><meta charset=utf-8><title>agent-ops-check</title>
<meta http-equiv=Content-Security-Policy content="default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'">
<style>body{font:15px/1.5 system-ui,sans-serif;max-width:760px;margin:40px auto;padding:0 16px}input[type=text]{width:100%;padding:8px;font:14px ui-monospace,monospace}button{padding:8px 16px;margin-top:8px}.note{background:#f3f6fa;padding:8px 12px;border-radius:6px}.err{color:#b00020}</style></head><body>
<h1>agent-ops-check</h1><p class=note>Runs on this computer only (127.0.0.1). No network calls are made.</p>${msg ? "<p class=err>" + esc(msg) + "</p>" : ""}
<h2>Scan a folder or .zip by path</h2><form method=post action=/scan><input type=text name=path id=path placeholder="/home/me/my-agent  or  /home/me/agent.zip" required><br><button id=scan>Start scan</button></form>
<h2>Or upload a .zip</h2><form id=up><input type=file id=zip accept=".zip"><br><button>Scan zip</button></form>
<p><a href=/ste.html>Open the STE paste page</a></p>
<script>document.getElementById("up").onsubmit=async e=>{e.preventDefault();const f=document.getElementById("zip").files[0];if(!f)return;const r=await fetch("/upload",{method:"POST",body:f});location.href=r.url}</script></body></html>`;

function start(o) {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), "agent-ops-ui-"));
  const render = { html: require("./report/html"), md: require("./report/md") };
  const scan = (p, label) => {
    const r = analyze([p], Object.assign({}, o, { inputsLabel: [label || p] }));
    fs.writeFileSync(path.join(out, "index.html"), render.html(r));
    fs.writeFileSync(path.join(out, "report.md"), render.md(r));
    fs.writeFileSync(path.join(out, "report.json"), JSON.stringify(r, null, 2));
    fs.writeFileSync(path.join(out, "ste.html"), require("./ste/ui")(o.rulesDir));
    const lb = r.groups.find((g) => g.id === "labs");
    if (lb && lb.redteam) fs.writeFileSync(path.join(out, "redteam-pack.txt"), lb.redteam);
  };
  fs.writeFileSync(path.join(out, "ste.html"), require("./ste/ui")(o.rulesDir));
  const server = http.createServer((req, res) => {
    const send = (code, type, body, extra) => { res.writeHead(code, Object.assign({ "content-type": type }, extra)); res.end(body); };
    if (req.method === "GET" && req.url === "/") return send(200, "text/html; charset=utf-8", PAGE());
    if (req.method === "POST" && (req.url === "/scan" || req.url === "/upload")) {
      const chunks = []; let size = 0;
      req.on("data", (c) => { size += c.length; if (size > 200 * 1024 * 1024) req.destroy(); else chunks.push(c); });
      req.on("end", () => {
        try {
          if (req.url === "/scan") {
            const p = decodeURIComponent(Buffer.concat(chunks).toString().replace(/^path=/, "").replace(/\+/g, " ")).trim();
            if (!fs.existsSync(p)) return send(400, "text/html; charset=utf-8", PAGE("Not found: " + p));
            scan(p);
          } else {
            const z = path.join(out, "uploaded.zip"); fs.writeFileSync(z, Buffer.concat(chunks)); scan(z, "uploaded.zip");
          }
          send(303, "text/plain", "", { location: "/report/index.html" });
        } catch (e) { send(400, "text/html; charset=utf-8", PAGE(e.message)); }
      });
      return;
    }
    const m = req.url.match(/^\/(?:report\/)?(index\.html|ste\.html|report\.md|report\.json|redteam-pack\.txt)$/);
    if (req.method === "GET" && m && fs.existsSync(path.join(out, m[1]))) return send(200, m[1].endsWith(".html") ? "text/html; charset=utf-8" : "text/plain; charset=utf-8", fs.readFileSync(path.join(out, m[1])));
    send(404, "text/plain", "Not found");
  });
  return new Promise((resolve) => {
    server.listen(o.port || 0, "127.0.0.1", () => {
      const url = "http://127.0.0.1:" + server.address().port + "/";
      console.log("agent-ops-check UI: " + url + "\nLocal only. Press Ctrl+C to stop.");
      if (o.open) { const cmd = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open"; try { require("child_process").spawn(cmd, [url], { detached: true, stdio: "ignore", shell: process.platform === "win32" }).unref(); } catch (_) {} }
      if (o.onListen) o.onListen(server, url);
      process.on("SIGINT", () => { server.close(); fs.rmSync(out, { recursive: true, force: true }); resolve(0); });
      server.on("close", () => resolve(0));
    });
  });
}
module.exports = { start };
