const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const config = require("../website/docusaurus.config.js");
const build = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(__dirname, "../website/build");
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
const pages = walk(build).filter((file) => file.endsWith(".html"));
let links = 0;
for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  assert.equal(
    [...html.matchAll(/<h1(?:\s|>)/g)].length,
    1,
    `Expected one H1: ${file}`,
  );
  assert.ok(
    /<title(?:\s[^>]*)?>[^<]+<\/title>/.test(html),
    `Missing title: ${file}`,
  );
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = new URL(match[1].replaceAll("&amp;", "&"), config.url);
    if (url.origin !== config.url || !url.pathname.startsWith(config.baseUrl))
      continue;
    const local = decodeURIComponent(url.pathname.slice(config.baseUrl.length));
    const target = path.join(build, local);
    const candidates = [
      target,
      `${target}.html`,
      path.join(target, "index.html"),
    ];
    assert.ok(
      candidates.some(
        (candidate) =>
          fs.existsSync(candidate) && fs.statSync(candidate).isFile(),
      ),
      `Broken local link ${url.pathname} in ${path.relative(build, file)}`,
    );
    links++;
  }
}
console.log(
  `Documentation checked: ${pages.length} HTML pages, ${links} local links/assets and one H1 per page.`,
);
