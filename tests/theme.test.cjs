const assert = require("node:assert/strict");
const fs = require("node:fs");
const { test } = require("node:test");
const theme = require("../packages/theme/index.cjs");

test("theme entry points resolve inside the distributable package", () => {
  const plugin = theme({}, {});
  assert.ok(fs.statSync(plugin.getThemePath()).isDirectory());
  for (const file of plugin.getClientModules())
    assert.ok(fs.statSync(file).isFile());
});
test("both color modes receive the configured brand without client JavaScript", () => {
  const plugin = theme(
    {},
    { accentColor: "#135e45", accentColorDark: "#8de1bb" },
  );
  const style = plugin.injectHtmlTags().headTags[0].innerHTML;
  assert.ok(style.includes("--quiet-accent-light:#135e45"));
  assert.ok(style.includes("--quiet-accent-dark:#8de1bb"));
});
test("invalid options and CSS injection are rejected before generating HTML", () => {
  for (const options of [
    { color: "#ffffff" },
    { accentColor: "red" },
    { accentColor: "#fff;}</style><script>" },
    { accentColorDark: null },
  ]) {
    assert.throws(() => theme({}, options), /Quiet:/);
  }
});
