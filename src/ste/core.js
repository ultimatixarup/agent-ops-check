/* agent-ops-check STE core. Pure JS, no I/O, no network. Runs in Node and in the browser (ste-ui).
 * Inspired by ASD-STE100 writing rules. NOT the specification and NOT a certified STE checker. */
(function (root) {
  "use strict";
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const words = (s) => (s.match(/[A-Za-z][A-Za-z'’-]*/g) || []);

  function sentences(text) {
    const out = [];
    let inFence = false;
    text.split(/\r?\n/).forEach((raw, i) => {
      if (/^\s*```/.test(raw)) { inFence = !inFence; return; }
      if (inFence || /^\s*(#|<!--|\||---|>?\s*$)/.test(raw)) return;
      const line = raw.replace(/^\s*([-*+]|\d+[.)])\s+/, "").replace(/`[^`]*`/g, "CODE").replace(/https?:\/\/\S+/g, "URL");
      const listItem = /^\s*([-*+]|\d+[.)])\s+/.test(raw);
      line.split(/(?<=[.!?])\s+(?=[A-Z0-9"“(])/).forEach((s) => { s = s.trim(); if (words(s).length >= 2) out.push({ text: s, line: i + 1, listItem }); });
    });
    return out;
  }

  function isProcedural(s, R) {
    const w = words(s.text).map((x) => x.toLowerCase());
    if (!w.length) return false;
    const first = w[0] === "please" || w[0] === "then" ? w[1] : w[0];
    return R.imperative_verbs.includes(first) || /^(if|when|before|after)\b[^,]{0,60},\s*(\w+)/i.test(s.text) && R.imperative_verbs.includes((s.text.match(/^(?:if|when|before|after)\b[^,]{0,60},\s*(\w+)/i) || [])[1]?.toLowerCase());
  }

  function compile(R) {
    if (R._c) return R._c;
    const aux = R.auxiliaries.join("|"), mod = R.modals.join("|"), irr = R.irregular_participles.join("|");
    const pp = "(?:\\w+ed|" + irr + ")";
    R._c = {
      passive: new RegExp("\\b(" + aux + ")\\s+(?:not\\s+)?(?:\\w+ly\\s+)?(" + pp + ")\\b", "gi"),
      perfect: new RegExp("\\b(has|have|had)\\s+(?:not\\s+)?(?:been\\s+)?(" + pp + "|\\w+en)\\b", "gi"),
      progressive: new RegExp("\\b(" + aux + ")\\s+(?:not\\s+)?(\\w{3,}ing)\\b", "gi"),
      modalPassive: new RegExp("\\b(" + mod + ")\\s+(?:not\\s+)?be\\s+(" + pp + ")\\b", "gi"),
      ingVerb: /(^|[,;:]\s*|\b(?:by|when|while|before|after|for|without)\s+)([a-z]{2,}ing)\s+(?:the|a|an|your|all|any|each|this|that|it|them)\b/gi,
      phrasal: new RegExp("\\b(" + Object.keys(R.phrasal_verbs).map((p) => p.split(" ").map(esc).join("\\s+")).join("|") + ")\\b", "gi"),
      hedge: new RegExp("\\b(" + R.hedges.map(esc).join("|") + ")\\b", "gi"),
      hint: new RegExp("(?<![\\w.])(" + Object.keys(R.hints).map(esc).sort((a, b) => b.length - a.length).join("|") + ")(?![\\w])", "gi"),
      notNouns: new Set(R.not_nouns.concat(R.modals, R.auxiliaries, R.imperative_verbs))
    };
    return R._c;
  }
  const NOT_ING = new Set(["thing", "nothing", "something", "anything", "everything", "string", "during", "morning", "evening", "ceiling", "king", "ring", "spring", "wing", "bring", "sing", "sting", "swing", "cling", "fling", "sling", "wring", "ping", "bling"]);

  function check(text, R, opts) {
    const o = opts || {};
    const C = compile(R);
    const F = [];
    const add = (rule, sev, s, msg, ev) => F.push({ rule: "ste." + rule, severity: sev, file: o.file || "(text)", line: s.line, message: msg, evidence: (ev || s.text).slice(0, 160) });
    const dict = o.dict ? new Set(o.dict.map((w) => w.toLowerCase())) : null;
    const sents = sentences(String(text || ""));
    for (const s of sents) {
      const w = words(s.text);
      const proc = isProcedural(s, R);
      const lim = proc ? R.limits.procedural_words : R.limits.descriptive_words;
      if (w.length > lim) add("sentence_length", "medium", s, (proc ? "Procedural" : "Descriptive") + " sentence has " + w.length + " words (limit " + lim + "). Split it.");
      let m;
      for (const [re, rule, msg] of [[C.modalPassive, "complex_tense", "Modal + be + past participle. Use an active verb."], [C.perfect, "complex_tense", "Perfect tense. Use simple past or present."], [C.progressive, "complex_tense", "Progressive tense (be + -ing). Use simple present."], [C.passive, "passive_voice", "Passive voice. Say who does the action (active voice)."]]) {
        re.lastIndex = 0;
        while ((m = re.exec(s.text))) {
          if (rule === "complex_tense" && /ing$/i.test(m[2]) && NOT_ING.has(m[2].toLowerCase())) continue;
          if (rule === "passive_voice" && C.modalPassive.source && new RegExp("\\bbe\\s+" + m[2] + "\\b", "i").test(s.text) && /\b(will|would|shall|should|can|could|may|might|must)\s+(?:not\s+)?be\b/i.test(s.text)) continue;
          add(rule, rule === "passive_voice" ? "medium" : "low", s, msg, m[0]);
        }
      }
      C.ingVerb.lastIndex = 0;
      while ((m = C.ingVerb.exec(s.text))) if (!NOT_ING.has(m[2].toLowerCase())) add("ing_verb", "low", s, "\"" + m[2] + "\" used as a verb (-ing clause). Use a full clause, e.g. \"when you ...\".", m[0].trim());
      if (/;/.test(s.text)) add("semicolon", "low", s, "Semicolon. Use two sentences.");
      if (proc) {
        const lw = w.map((x) => x.toLowerCase());
        let n = 0;
        for (let i = 1; i < lw.length; i++) if ((lw[i - 1] === "and" || lw[i - 1] === "then" || lw[i - 1] === "also") && R.imperative_verbs.includes(lw[i]) && !["only", "never", "always"].includes(lw[i])) n++;
        if (n > 0) add("multiple_instructions", "medium", s, "More than one instruction in one sentence. Write one instruction per sentence.");
      }
      C.phrasal.lastIndex = 0;
      while ((m = C.phrasal.exec(s.text))) add("phrasal_verb", "low", s, "Phrasal verb \"" + m[1] + "\". Try: " + R.phrasal_verbs[m[1].toLowerCase().replace(/\s+/g, " ")] + ".", m[0]);
      C.hedge.lastIndex = 0;
      while ((m = C.hedge.exec(s.text))) add("hedge", "low", s, "Vague word \"" + m[1] + "\". Give the exact condition, value or action.", m[0]);
      C.hint.lastIndex = 0;
      while ((m = C.hint.exec(s.text))) add("word_hint", "low", s, "\"" + m[1] + "\" → " + R.hints[m[1].toLowerCase()] + " (plain-word hint).", m[0]);
      // Noun clusters: runs of words that are not function words/verbs/adverbs/-ing/-ed.
      let run = [];
      const flush = () => { if (run.length > R.limits.noun_cluster) add("noun_cluster", "low", s, "Possible noun cluster of " + run.length + " words. Break it up with \"of\", \"for\" or a verb.", run.join(" ")); run = []; };
      for (const tok of s.text.split(/\s+/)) {
        const clean = tok.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, "");
        const lw = clean.toLowerCase();
        const nounish = clean && /^[A-Za-z][a-z-]*$/.test(clean) && !C.notNouns.has(lw) && !/(ly|ed|ful|ous|ive|able|ible|al)$/.test(lw) && (!/ing$/.test(lw) || run.length > 0 || NOT_ING.has(lw));
        if (nounish) run.push(clean); else flush();
        if (/[,.;:!?)]$/.test(tok)) flush();
      }
      flush();
      if (dict) {
        // Capitalized words are treated as names, except the first word of the sentence.
        const bad = [...new Set(w.filter((x, i) => (i === 0 || /^[a-z]/.test(x)) && x.length > 1 && !dict.has(x.toLowerCase()) && !dict.has(x.toLowerCase().replace(/(s|es|ed|ing)$/, ""))).map((x) => x.toLowerCase()))];
        if (bad.length) add("not_in_dictionary", "low", s, "Not in your approved word list: " + bad.slice(0, 8).join(", ") + (bad.length > 8 ? " …" : "") + ".", bad.join(", "));
      }
    }
    return { findings: F, sentences: sents.length };
  }

  // Information-loss check: facts in the original that are missing from the STE rewrite.
  const CONSTRAINTS = ["must not", "must", "never", "only", "at least", "at most", "no more than", "no later than", "before", "after", "until", "unless", "always", "do not", "don't", "not", "except", "within", "maximum", "minimum", "required"];
  function facts(text) {
    const t = String(text || "");
    const out = [];
    const push = (kind, re) => { let m; re.lastIndex = 0; while ((m = re.exec(t))) out.push({ kind, value: m[0].trim() }); };
    push("date", /\b\d{4}-\d{2}-\d{2}(?:[T ][\d:.]+Z?)?\b|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\.? \d{1,2}(?:, \d{4})?\b|\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g);
    push("number+unit", /[$€£]?\b\d+(?:[.,]\d+)*\s?(?:%|ms|s|sec|seconds?|min|minutes?|h|hrs?|hours?|days?|weeks?|months?|years?|kb|mb|gb|tb|tokens?|requests?|calls?|retries|USD|EUR|°[CF]|mm|cm|m|km|kg|g|lbs?|psi|V|A|W)\b|[$€£]\d+(?:[.,]\d+)*/g);
    push("number", /\b\d+(?:\.\d+)?\b/g);
    push("path", /(?:~|\.{1,2})?\/[\w.\-/]+|\b[\w-]+\.(?:json|ya?ml|md|txt|js|ts|py|csv|env|toml|sh)\b/g);
    push("url", /https?:\/\/[^\s)>"']+/g);
    push("identifier", /`[^`]+`|\b[A-Z][A-Z0-9]*_[A-Z0-9_]+\b|\b[a-z]+_[a-z0-9_]+\b|\b[a-z]+[A-Z]\w*\b|\b[A-Z]{2,}-?\d+\b|--[a-z][\w-]*/g);
    push("name", /(?<![.!?]\s|^)\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\b/gm);
    push("constraint", new RegExp("\\b(" + CONSTRAINTS.map(esc).join("|") + ")\\b", "gi"));
    const seen = new Map();
    for (const f of out) { const k = f.kind + "|" + f.value.toLowerCase(); seen.set(k, { kind: f.kind, value: f.value, count: (seen.get(k)?.count || 0) + 1 }); }
    return [...seen.values()];
  }
  function compare(original, rewrite) {
    const a = facts(original), b = facts(rewrite);
    const bt = String(rewrite || "").toLowerCase();
    const bCount = new Map(b.map((f) => [f.kind + "|" + f.value.toLowerCase(), f.count]));
    const missing = [];
    for (const f of a) {
      const k = f.kind + "|" + f.value.toLowerCase();
      const have = bCount.get(k) || 0;
      if (f.kind === "constraint") { if (have < f.count) missing.push(Object.assign({}, f, { found: have, severity: ["must", "must not", "never", "only", "do not", "don't", "not", "unless", "at least", "at most", "no more than", "before", "until"].includes(f.value.toLowerCase()) ? "high" : "medium" })); }
      else if (!bt.includes(f.value.toLowerCase().replace(/^`|`$/g, ""))) missing.push(Object.assign({}, f, { found: 0, severity: f.kind === "name" ? "medium" : "high" }));
    }
    // Drop bare numbers already covered by a missing date or number+unit.
    const big = missing.filter((f) => f.kind !== "number" && f.kind !== "constraint").map((f) => f.value);
    for (let i = missing.length - 1; i >= 0; i--) if (missing[i].kind === "number" && big.some((v) => new RegExp("(^|\\D)" + esc(missing[i].value) + "(\\D|$)").test(v))) missing.splice(i, 1);
    return { missing, originalFacts: a.length, rewriteFacts: b.length };
  }

  const api = { check, compare, facts, sentences };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.STE = api;
})(typeof window !== "undefined" ? window : this);
