#!/usr/bin/env node
// MAINTAINERS ONLY. Downloads Microsoft's LLMail-Inject dataset (MIT) and derives the small, deduplicated
// files committed under data/llmail/. The agent-ops-check tool itself never downloads anything at runtime;
// these files ship through this Git repo and users refresh with `git pull`.
//
//   node scripts/import-llmail.mjs [--cache .cache/llmail]
//
// Source: https://huggingface.co/datasets/microsoft/llmail-inject-challenge (license: MIT)
// Code:   https://github.com/microsoft/llmail-inject-challenge (license: MIT)
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { loadRules, allMatches } = require("../src/util.js");

const ROOT = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const args = process.argv.slice(2);
const CACHE = path.resolve(args[args.indexOf("--cache") + 1] && args.includes("--cache") ? args[args.indexOf("--cache") + 1] : path.join(ROOT, ".cache", "llmail"));
const OUT = path.join(ROOT, "data", "llmail");
const BASE = "https://huggingface.co/datasets/microsoft/llmail-inject-challenge/resolve/main/data/";
const FILES = ["labelled_unique_submissions_phase1.json", "labelled_unique_submissions_phase2.json", "emails_for_fp_tests.json"];

// Sampling plan (deterministic: items are ordered by SHA-256 of their text).
// Phase 2 is the held-out set. Rules were written while looking at phase 1 and at the first PEEKED phase-2
// items in hash order, so those exact items are excluded from the benchmark sample.
const PEEKED = 1000, HELDOUT = 500, PHASE1_SAMPLE = 300, MAX_CHARS = 4000;

const sha = (s) => crypto.createHash("sha256").update(s).digest("hex");
const isAttack = (v) => v.reason === "api_triggered" || /^true$/i.test(String(v.attack_attempt));

async function fetchAll() {
  fs.mkdirSync(CACHE, { recursive: true });
  for (const f of FILES) {
    const p = path.join(CACHE, f);
    if (fs.existsSync(p) && fs.statSync(p).size > 0) continue;
    process.stderr.write("downloading " + f + " …\n");
    const r = await fetch(BASE + f);
    if (!r.ok) throw new Error(f + ": HTTP " + r.status);
    fs.writeFileSync(p, Buffer.from(await r.arrayBuffer()));
  }
}
const load = (f) => JSON.parse(fs.readFileSync(path.join(CACHE, f), "utf8"));
const norm = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();
function attacks(obj) {
  const seen = new Set(), out = [];
  for (const [text, v] of Object.entries(obj)) {
    if (!isAttack(v) || text.length > MAX_CHARS) continue;
    const k = norm(text); if (seen.has(k)) continue; seen.add(k);
    out.push({ text, label: v.reason === "api_triggered" ? "api_triggered" : "judge" });
  }
  return out.sort((a, b) => (sha(a.text) < sha(b.text) ? -1 : 1));
}
const jsonl = (rows) => rows.map((r) => JSON.stringify(r)).join("\n") + "\n";

await fetchAll();
const raw2 = load(FILES[1]);
const p1 = attacks(load(FILES[0])), p2 = attacks(raw2);
// The exact items examined during rule development: first PEEKED phase-2 attacks in SHA-256 order (before dedup).
const peeked = new Set(Object.keys(raw2).filter((k) => isAttack(raw2[k])).sort((a, b) => (sha(a) < sha(b) ? -1 : 1)).slice(0, PEEKED));
const heldout = p2.filter((r) => !peeked.has(r.text)).slice(0, HELDOUT);
const benign = load(FILES[2]);
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "attacks-phase2-heldout.jsonl"), jsonl(heldout.map((r, i) => ({ id: "p2-" + String(i + 1).padStart(3, "0"), ...r }))));
fs.writeFileSync(path.join(OUT, "attacks-phase1-sample.jsonl"), jsonl(p1.slice(0, PHASE1_SAMPLE).map((r, i) => ({ id: "p1-" + String(i + 1).padStart(3, "0"), ...r }))));
fs.writeFileSync(path.join(OUT, "benign-fp-emails.jsonl"), jsonl(benign.map((text, i) => ({ id: "b-" + String(i + 1).padStart(3, "0"), text }))));

// Family stats over ALL unique attacks (both phases): how many contain each LLMail rule's pattern.
const R = loadRules("injection");
const all = p1.concat(p2), fam = {};
for (const r of R.llmail) fam[r.id] = { family: r.family, matches: 0 };
for (const a of all) for (const r of R.llmail) if (allMatches(a.text, r.pattern).length) fam[r.id].matches++;
fs.writeFileSync(path.join(OUT, "families.json"), JSON.stringify({
  source: "microsoft/llmail-inject-challenge (Hugging Face), MIT License",
  generated_by: "scripts/import-llmail.mjs",
  unique_attacks: { phase1: p1.length, phase2: p2.length, max_chars: MAX_CHARS },
  benign_fp_emails: benign.length,
  samples: { phase2_heldout: HELDOUT, phase2_skipped_as_peeked: PEEKED, phase1: PHASE1_SAMPLE },
  rule_matches_over_all_unique_attacks: fam
}, null, 2) + "\n");
console.log("wrote data/llmail/ (phase1 unique attacks " + p1.length + ", phase2 " + p2.length + ", benign " + benign.length + ")");
