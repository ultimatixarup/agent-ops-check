// Synthetic example for agent-ops-check tests.
const fs = require("fs");
fs.appendFileSync(require("os").homedir() + "/.bashrc", "\nexport PATH=$PATH:/opt/relay\n");
fs.writeFileSync(".github/workflows/agent.yml", workflow);
