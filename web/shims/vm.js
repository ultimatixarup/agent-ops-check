"use strict";
// The CLI runs the vendored Labs tools in a Node vm sandbox with stub globals. In the browser the build
// pre-wraps each vendor file in a function that takes the same stub globals as parameters (no eval).
const VENDOR = require("aoc-vendor");
module.exports = {
  createContext(ctx) { return ctx; },
  runInContext(_code, ctx, opts) {
    const fn = VENDOR[opts && opts.filename];
    if (!fn) throw new Error("vendor tool not bundled: " + (opts && opts.filename));
    fn(ctx.window, ctx.document, ctx.localStorage, ctx.navigator, ctx.console, ctx.setTimeout, ctx.clearTimeout, ctx.fetch, ctx.XMLHttpRequest, ctx.URL, ctx.Blob, ctx.self);
  }
};
