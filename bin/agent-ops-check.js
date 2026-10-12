#!/usr/bin/env node
"use strict";
require("../src/cli").main(process.argv.slice(2)).then((code) => process.exit(code), (e) => { console.error(e.message || e); process.exit(2); });
