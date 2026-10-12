// Preloaded by tests: any network attempt crashes the process.
const boom = () => { throw new Error("network call attempted"); };
for (const m of ["http", "https", "net", "tls", "dgram"]) { const x = require(m); for (const k of ["request", "get", "connect", "createConnection", "createSocket"]) if (x[k]) x[k] = boom; }
global.fetch = boom;
