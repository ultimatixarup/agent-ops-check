# How rule updates reach you

**Standing rule:** new checks, injection patterns and CVE-driven rules ship **only through this Git repo**.
agent-ops-check never fetches rules, never checks for updates over the network, and never phones home.

## Imported datasets (maintainers)
- **LLMail-Inject** (Microsoft, MIT): `npm run import:llmail` downloads the dataset into `.cache/llmail/` (git-ignored), then writes the small samples and family stats committed in `data/llmail/`. `npm run bench:llmail` re-measures the rules offline and rewrites `docs/LLMAIL_BENCHMARK.md`; a test fails if that doc is stale. The tool itself never downloads the dataset. Users get the result with `git pull`.

## Recent rule families
- **2026.10.13 (third update):** background daemons + self-update (`daemon.*`, tab 7) and skill artifact provenance (`skills.*`, tab 8), in `rules/persistence.yaml`. Static only: verify on your install. The daemon rules were prompted by a single, unreproduced report (openai/codex#48195; HN 2026-10-12; Groundy guide), which this project does not confirm. The skill rules cite SkillRelayBench (arXiv 2610.13227) and PyCache Trap (arXiv 2610.10612); their figures are their findings, not ours. Get them with `git pull`.

## Getting updates
- Cloned: `git pull`
- npx: re-run `npx github:ultimatixarup/agent-ops-check ...` (npx fetches the current `main`; to force it, clear the npx cache or pin a tag `#vX.Y.Z`)

## Versioning
- `rules/VERSION.json`: `{ "version": "YYYY.MM.DD", "date": "YYYY-MM-DD" }`, bumped with every rules change.
- `rules/CHANGELOG.md`: one entry per version: what was added, changed or removed, with the source (CVE, advisory, paper, issue).
- Every report shows the rules version and date. The CLI prints a **local-only** hint computed from the date in
  `VERSION.json` and your clock, e.g. "Rules are 45 days old. Run git pull…". There is no network check.

## Adding a rule (contributors)
1. Add the pattern to the right file in `rules/` (or `data/standards/` for a mapping). Patterns are case-insensitive JS regex.
2. Add a fixture that should trigger it and one that should not (fictional data only; no real secrets).
3. Add a test in `test/` asserting both. `npm test` must stay green and offline.
4. Bump `rules/VERSION.json` and add a `rules/CHANGELOG.md` entry with the source link.
5. Open a PR. Rules releases are tagged `rules-YYYY.MM.DD` with a GitHub Release.

## Release notes and newsletter (design only, not built)
- Each rules release gets a GitHub Release whose notes are written to double as a newsletter issue:
  what's new, why it matters (source), how to update (`git pull`), and any false-positive fixes.
- Free ways to be notified:
  - GitHub: **Watch → Custom → Releases** on the repo (built in, free).
  - A free newsletter tool, to be picked later. It would send the same release note text. No tool is chosen and
    nothing is wired up yet; the CLI will never collect emails or contact a newsletter service.
