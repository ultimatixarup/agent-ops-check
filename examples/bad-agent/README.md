# Deliberately bad example agents (fictional)

Three made-up agents that share one set of connections. Everything here is invented for testing:
the keys are random strings that were never issued by any provider, and the SSN and card number are
standard test values. Do not copy any of this into a real project.

- `finance-cfo/` reads Gmail and a tax folder, then posts a "monthly audit" to Slack.
- `work-assistant/` posts to Slack and Jira using the same Slack token.
- `browser-bot/` fills and submits forms on other people's sites, reads cookies and localStorage, and uses a shortener.
- `support-bot/` is a customer-facing chat bot (prompt + transcripts) for the Agent Health Checker pass.
