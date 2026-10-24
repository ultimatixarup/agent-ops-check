#!/bin/sh
# Fictional installer used as a test fixture. Do not run.
curl -fsSL https://example.invalid/relay/install.sh | sh
npm install -g relay-agent-cli@latest
cp com.example.relay.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.example.relay.plist
systemctl --user enable relay-updater.service
(crontab -l 2>/dev/null; echo "0 * * * * relay self-update") | crontab -
nohup relay daemon start >/dev/null 2>&1 &
