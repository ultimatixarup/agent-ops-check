"use strict";
// Minimal, dependency-free .zip extractor (stored + deflate) for agent-ops-check. Local only, no network.
// Guards: no absolute paths or "..", no symlinks, max 5,000 entries, max 200 MB total uncompressed.
const fs = require("fs");
const os = require("os");
const path = require("path");
const zlib = require("zlib");

const MAX_ENTRIES = 5000, MAX_TOTAL = 200 * 1024 * 1024;

function extract(zipPath) {
  const buf = fs.readFileSync(zipPath);
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  if (eocd < 0) throw new Error("Not a zip file (no end-of-central-directory record): " + zipPath);
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  if (count > MAX_ENTRIES) throw new Error("Zip has too many entries (" + count + ")");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agent-ops-zip-"));
  let total = 0;
  for (let n = 0; n < count; n++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error("Corrupt zip central directory");
    const flags = buf.readUInt16LE(p + 8), method = buf.readUInt16LE(p + 10);
    const csize = buf.readUInt32LE(p + 20), usize = buf.readUInt32LE(p + 24);
    const nlen = buf.readUInt16LE(p + 28), xlen = buf.readUInt16LE(p + 30), clen = buf.readUInt16LE(p + 32);
    const extAttr = buf.readUInt32LE(p + 38), lho = buf.readUInt32LE(p + 42);
    const name = buf.slice(p + 46, p + 46 + nlen).toString("utf8").replace(/\\/g, "/");
    p += 46 + nlen + xlen + clen;
    if (flags & 1) throw new Error("Encrypted zips are not supported");
    if (((extAttr >>> 16) & 0o170000) === 0o120000) continue; // symlink: skip
    const norm = path.posix.normalize(name);
    if (norm.startsWith("/") || norm.startsWith("../") || norm === ".." || /^[A-Za-z]:/.test(norm)) throw new Error("Unsafe path in zip: " + name);
    if (/(^|\/)__MACOSX\//.test(norm)) continue;
    const dest = path.join(dir, norm);
    if (!dest.startsWith(dir + path.sep)) throw new Error("Unsafe path in zip: " + name);
    if (name.endsWith("/")) { fs.mkdirSync(dest, { recursive: true }); continue; }
    total += usize;
    if (total > MAX_TOTAL) throw new Error("Zip expands to more than 200 MB");
    const lnl = buf.readUInt16LE(lho + 26), lxl = buf.readUInt16LE(lho + 28);
    const data = buf.slice(lho + 30 + lnl + lxl, lho + 30 + lnl + lxl + csize);
    let out;
    if (method === 0) out = data;
    else if (method === 8) out = zlib.inflateRawSync(data, { maxOutputLength: Math.max(usize, 1) });
    else throw new Error("Unsupported zip compression method " + method + " for " + name);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, out);
  }
  // A zip with one top-level folder: scan that folder so each sub-folder is still one agent.
  const top = fs.readdirSync(dir);
  const root = top.length === 1 && fs.statSync(path.join(dir, top[0])).isDirectory() ? path.join(dir, top[0]) : dir;
  return { dir, root, cleanup: () => fs.rmSync(dir, { recursive: true, force: true }) };
}
module.exports = { extract };
