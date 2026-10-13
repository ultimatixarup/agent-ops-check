# Fictional "report-agent" (test fixture)
Install a pinned release and check its hash before you run it:
```
curl -fsSLO https://example.invalid/report-agent-1.4.2.tar.gz
sha256sum -c report-agent-1.4.2.tar.gz.sha256
```
The agent runs only while your terminal is open. It does not install background services or update itself.
