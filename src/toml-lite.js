"use strict";
// Enough of TOML to read Codex config.toml (tables, quoted keys, arrays, inline tables, strings).
// Throws on syntax it does not understand so the audit can say the file was not fully read.

function parseToml(input) {
  const s = String(input).replace(/\r\n/g, "\n");
  let i = 0;
  const root = {};
  const marks = [];
  let ctx = root;
  let ctxPath = [];

  function line() {
    let n = 1;
    for (let k = 0; k < i && k < s.length; k++) if (s[k] === "\n") n++;
    return n;
  }
  function err(msg) {
    const e = new Error(msg + " (line " + line() + ")");
    e.line = line();
    throw e;
  }
  function skipSpaces() { while (s[i] === " " || s[i] === "\t") i++; }
  function skipWs() {
    while (i < s.length) {
      if (s[i] === " " || s[i] === "\t" || s[i] === "\n" || s[i] === "\r") { i++; continue; }
      if (s[i] === "#") { while (i < s.length && s[i] !== "\n") i++; continue; }
      break;
    }
  }
  function escapeChar() {
    i++;
    const c = s[i++];
    const map = { b: "\b", t: "\t", n: "\n", f: "\f", r: "\r", '"': '"', "\\": "\\", "'": "'" };
    if (Object.prototype.hasOwnProperty.call(map, c)) return map[c];
    if (c === "u" || c === "U") {
      const n = c === "u" ? 4 : 8;
      const h = s.slice(i, i + n);
      if (!/^[0-9a-fA-F]+$/.test(h) || h.length !== n) err("bad unicode escape");
      i += n;
      return String.fromCodePoint(parseInt(h, 16));
    }
    err("bad escape");
  }
  function parseString() {
    const q = s[i];
    if (q !== '"' && q !== "'") err("expected string");
    if (s.startsWith(q + q + q, i)) {
      i += 3;
      if (s[i] === "\n") i++;
      let out = "";
      while (i < s.length && !s.startsWith(q + q + q, i)) {
        if (q === '"' && s[i] === "\\") { out += escapeChar(); continue; }
        out += s[i++];
      }
      if (!s.startsWith(q + q + q, i)) err("unterminated string");
      i += 3;
      return out;
    }
    i++;
    let out = "";
    while (i < s.length && s[i] !== q) {
      if (s[i] === "\n") err("newline in string");
      if (q === '"' && s[i] === "\\") { out += escapeChar(); continue; }
      out += s[i++];
    }
    if (s[i] !== q) err("unterminated string");
    i++;
    return out;
  }
  function parseKey() {
    const parts = [];
    for (;;) {
      skipSpaces();
      if (s[i] === '"' || s[i] === "'") parts.push(parseString());
      else {
        const st = i;
        while (i < s.length && /[A-Za-z0-9_-]/.test(s[i])) i++;
        if (i === st) err("expected key");
        parts.push(s.slice(st, i));
      }
      skipSpaces();
      if (s[i] === ".") { i++; continue; }
      return parts;
    }
  }
  function parseArray() {
    i++;
    const arr = [];
    for (;;) {
      skipWs();
      if (s[i] === "]") { i++; return arr; }
      arr.push(parseValue());
      skipWs();
      if (s[i] === ",") { i++; continue; }
      if (s[i] === "]") { i++; return arr; }
      err("expected , or ]");
    }
  }
  function parseInline() {
    i++;
    const o = {};
    for (;;) {
      skipWs();
      if (s[i] === "}") { i++; return o; }
      const key = parseKey();
      skipSpaces();
      if (s[i] !== "=") err("expected =");
      i++;
      put(o, key, parseValue());
      skipWs();
      if (s[i] === ",") { i++; continue; }
      if (s[i] === "}") { i++; return o; }
      err("expected , or }");
    }
  }
  function parseValue() {
    skipSpaces();
    if (s[i] === '"' || s[i] === "'") return parseString();
    if (s[i] === "[") return parseArray();
    if (s[i] === "{") return parseInline();
    if (s.startsWith("true", i) && !/[A-Za-z0-9_]/.test(s[i + 4] || "")) { i += 4; return true; }
    if (s.startsWith("false", i) && !/[A-Za-z0-9_]/.test(s[i + 5] || "")) { i += 5; return false; }
    const st = i;
    if (s[i] === "+" || s[i] === "-") i++;
    if (s.startsWith("inf", i) && !/[A-Za-z0-9_]/.test(s[i + 3] || "")) { i += 3; return s[st] === "-" ? -Infinity : Infinity; }
    if (s.startsWith("nan", i) && !/[A-Za-z0-9_]/.test(s[i + 3] || "")) { i += 3; return NaN; }
    if (s[i] === "0" && (s[i + 1] === "x" || s[i + 1] === "o" || s[i + 1] === "b")) {
      const base = s[i + 1] === "x" ? 16 : s[i + 1] === "o" ? 8 : 2;
      i += 2;
      const ns = i;
      while (i < s.length && /[0-9a-fA-F_]/.test(s[i])) i++;
      if (i === ns) err("bad number");
      const n = parseInt(s.slice(ns, i).replace(/_/g, ""), base);
      return s[st] === "-" ? -n : n;
    }
    if (!/[0-9]/.test(s[i] || "")) err("expected value");
    while (i < s.length && /[0-9_]/.test(s[i])) i++;
    let flt = false;
    if (s[i] === ".") { flt = true; i++; while (i < s.length && /[0-9_]/.test(s[i])) i++; }
    if (s[i] === "e" || s[i] === "E") {
      flt = true; i++;
      if (s[i] === "+" || s[i] === "-") i++;
      while (i < s.length && /[0-9_]/.test(s[i])) i++;
    }
    const raw = s.slice(st, i).replace(/_/g, "");
    const n = flt ? Number(raw) : parseInt(raw, 10);
    if (Number.isNaN(n)) err("bad number");
    return n;
  }
  function put(obj, parts, val) {
    let cur = obj;
    for (let k = 0; k < parts.length - 1; k++) {
      const p = parts[k];
      if (cur[p] == null || typeof cur[p] !== "object" || Array.isArray(cur[p])) cur[p] = {};
      cur = cur[p];
    }
    cur[parts[parts.length - 1]] = val;
  }
  function ensureTable(parts, array) {
    let cur = root;
    for (let k = 0; k < parts.length - 1; k++) {
      const p = parts[k];
      const next = cur[p];
      if (Array.isArray(next)) {
        if (!next.length || next[next.length - 1] == null || typeof next[next.length - 1] !== "object") err("bad table path");
        cur = next[next.length - 1];
      } else if (next == null || typeof next !== "object") { cur[p] = {}; cur = cur[p]; }
      else cur = next;
    }
    const last = parts[parts.length - 1];
    if (array) {
      if (!Array.isArray(cur[last])) cur[last] = [];
      const row = {};
      cur[last].push(row);
      return row;
    }
    if (cur[last] == null || typeof cur[last] !== "object" || Array.isArray(cur[last])) cur[last] = {};
    return cur[last];
  }

  while (i < s.length) {
    skipWs();
    if (i >= s.length) break;
    const ln = line();
    if (s[i] === "[") {
      const arr = s[i + 1] === "[";
      i += arr ? 2 : 1;
      const parts = parseKey();
      skipSpaces();
      if (arr) {
        if (s[i] !== "]" || s[i + 1] !== "]") err("expected ]]");
        i += 2;
      } else if (s[i] !== "]") err("expected ]");
      else i++;
      ctx = ensureTable(parts, arr);
      ctxPath = parts.slice();
      marks.push({ path: parts.slice(), line: ln });
      continue;
    }
    const parts = parseKey();
    skipSpaces();
    if (s[i] !== "=") err("expected =");
    i++;
    put(ctx, parts, parseValue());
    marks.push({ path: ctxPath.concat(parts), line: ln });
    skipSpaces();
    if (s[i] === "#") { while (i < s.length && s[i] !== "\n") i++; }
    else if (i < s.length && s[i] !== "\n") err("trailing characters");
  }
  return { data: root, marks };
}

function lineAt(marks, suffix) {
  const hit = (marks || []).find((m) => m.path.length >= suffix.length && suffix.every((seg, n) => m.path[m.path.length - suffix.length + n] === seg));
  return hit ? hit.line : 0;
}

module.exports = { parseToml, lineAt };
