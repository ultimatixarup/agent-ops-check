"use strict";
// In-memory fs for the browser build. Holds the bundled rules/data plus the files the user picked.
// Nothing here can read the real disk or the network.
const files = new Map(); // abs path -> string
const norm = (p) => ((/^[\/]/.test(String(p)) ? "" : "/in/") + String(p).replace(/\\/g, "/")).replace(/\/+/g, "/").replace(/\/$/, "") || "/";
function enoent(p) { const e = new Error("ENOENT: no such file or directory, " + p); e.code = "ENOENT"; return e; }
function isDir(p) { p = norm(p); const pre = p === "/" ? "/" : p + "/"; for (const k of files.keys()) if (k.startsWith(pre)) return true; return false; }
module.exports = {
  __put(p, text) { files.set(norm(p), String(text)); },
  __clear(prefix) { const pre = norm(prefix) + "/"; for (const k of [...files.keys()]) if (k.startsWith(pre)) files.delete(k); },
  __list() { return [...files.keys()]; },
  existsSync(p) { p = norm(p); return files.has(p) || isDir(p); },
  readFileSync(p) { if (typeof p === "number") return ""; p = norm(p); if (!files.has(p)) throw enoent(p); return files.get(p); },
  statSync(p) {
    p = norm(p);
    if (files.has(p)) { const size = new TextEncoder().encode(files.get(p)).length; return { isDirectory: () => false, isFile: () => true, size }; }
    if (isDir(p)) return { isDirectory: () => true, isFile: () => false, size: 0 };
    throw enoent(p);
  },
  readdirSync(p) {
    p = norm(p); const pre = p === "/" ? "/" : p + "/"; const s = new Set();
    for (const k of files.keys()) if (k.startsWith(pre)) s.add(k.slice(pre.length).split("/")[0]);
    return [...s];
  },
  writeFileSync() { throw new Error("fs.writeFileSync is not available in the browser build"); },
  mkdirSync() {}
};
