# Rules changelog

Rule updates ship only through this Git repo. Refresh with `git pull` or re-run `npx github:ultimatixarup/agent-ops-check`.

## 2026.10.12
- New: `injection.yaml` (ADSF document-wide prompt-injection scan): override phrases, fake system markers, hidden HTML comments, CSS-hidden text, zero-width/bidi/tag characters, base64 instructions, data-leaking image links, request-capture hosts.
- New: `ste.yaml` (Simplified Technical English style rules, original word lists).
- New: `data/standards/*.yaml` (offline mappings to 9 frameworks).
- Initial: `crossover.yaml`, `actions.yaml`, `governance.yaml`.
