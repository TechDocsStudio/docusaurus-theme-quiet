const { test } = require("node:test");
const assert = require("node:assert/strict");

test("saved demo palettes accept only complete hex-color pairs", async () => {
  const { palettes, readPalette } = await import("../website/src/brand.mjs");
  const storage = (value) => ({ getItem: () => value });
  for (const palette of palettes)
    assert.deepEqual(readPalette(storage(JSON.stringify(palette))), palette);
  for (const value of [
    null,
    "{",
    "{}",
    '{"accentColor":"red","accentColorDark":"#ffffff"}',
    '{"accentColor":"#ffffff"}',
  ]) {
    assert.equal(readPalette(storage(value)), null);
  }
  assert.equal(
    readPalette({
      getItem: () => {
        throw new Error("Storage disabled");
      },
    }),
    null,
  );
});
