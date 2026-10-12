# What came over from SMB Agent Ops and the Labs tools

SMB Agent Ops was planned as a done-for-you review with four deliverables. This package turns each one into a
self-run, local step. It is free; there is no paid tier.

| SMB Agent Ops deliverable | Where it lives now |
|---|---|
| 1. Agent & AI-feature inventory (agents, models, MCP tools, connectors, data touched) | Tab 1 connector inventory + tab 3 AI inventory; `report.md` sections 1 and 3 |
| 2. Identity & least-privilege checklist (shared secrets, scopes) | Tab 1: credentials by env-var name, OAuth scopes, shared-credential and source-to-sink findings |
| 3. Human-in-the-loop gate map | Tab 2 gate map (approval / dry-run / rate limit / allowlist per action) |
| 4. Audit memo with P0–P2 findings | `report.md` ("Agent ops audit memo", P0/P1/P2) + `report.sarif` for CI |

| Labs browser tool | In the package |
|---|---|
| Agent Health Checker (8 engineering + 9 customer-safety config checks, 9 transcript checks) | Tab 4, the same `app.js` run unchanged (vendored from arup-banerjee-labs @ 4dd4953) |
| Agent Health Checker known misses (case study, 2026-09-30) | `src/labs/health-plus.js` closes 7 of 8; the 8th (false claim with no price/policy keyword) is documented |
| Cloud Bill Smell Detector | Tab 4, runs on bill CSV/JSON exports in the input |
| Observability Gap Finder | Tab 4, runs on the whole input |
| Red-team pack (20 messages to send to your own bot) | Written to `redteam-pack.txt` in the report folder |

Not carried over: the human parts of the service (workshops, readout call, specialist review). Those were paid and are on hold.
