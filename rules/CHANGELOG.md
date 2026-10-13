# Rules changelog

Rule updates ship only through this Git repo. Refresh with `git pull` or re-run `npx github:ultimatixarup/agent-ops-check`.

## 2026.10.13
- New: 8 ADSF rules in `injection.yaml` (`llmail:` group) derived from Microsoft's LLMail-Inject adaptive prompt-injection challenge dataset (MIT, https://huggingface.co/datasets/microsoft/llmail-inject-challenge): tool-call/api_call syntax, fake turn delimiters, obfuscated addresses, decode-then-run instructions, post-task triggers, send-email directives, encoded text, and a low-severity "send to address" signal. Each rule carries `source` and `family` metadata.
- New: `data/llmail/` samples (500 held-out phase 2 attacks, 300 phase 1 attacks, 203 benign emails, 30 hand-written benign emails) and `docs/LLMAIL_BENCHMARK.md` with measured detection and false-positive rates.
- New: LLMail-style indirect-injection cases in the generated security eval set.

## 2026.10.12
- New: `injection.yaml` (ADSF document-wide prompt-injection scan): override phrases, fake system markers, hidden HTML comments, CSS-hidden text, zero-width/bidi/tag characters, base64 instructions, data-leaking image links, request-capture hosts.
- New: `ste.yaml` (Simplified Technical English style rules, original word lists).
- New: `data/standards/*.yaml` (offline mappings to 9 frameworks).
- Initial: `crossover.yaml`, `actions.yaml`, `governance.yaml`.
