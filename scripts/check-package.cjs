const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
assert.equal(
  require("../website/package.json").dependencies["docusaurus-theme-quiet"],
  "file:../packages/theme",
  "The demo must depend on the theme source in this repository.",
);
assert.equal(
  fs.realpathSync(
    require.resolve("docusaurus-theme-quiet/package.json", {
      paths: [path.join(root, "website")],
    }),
  ),
  fs.realpathSync(path.join(root, "packages/theme/package.json")),
  "The demo must resolve the local theme, not a registry installation.",
);
const [packed] = JSON.parse(
  execFileSync(
    "npm",
    ["pack", "--workspace", "docusaurus-theme-quiet", "--dry-run", "--json"],
    { cwd: root, encoding: "utf8" },
  ),
);
const files = packed.files.map((file) => file.path);
for (const required of [
  "index.cjs",
  "index.d.ts",
  "LICENSE",
  "NOTICE",
  "README.md",
  "src/styles.css",
  "src/client.js",
  "src/theme/MDXComponents/index.jsx",
  "src/components/index.jsx",
]) {
  assert.ok(files.includes(required), `Package is missing ${required}`);
}
for (const file of files) {
  assert.ok(
    !/(^|\/)(website|\.local|\.env|node_modules|tests|build)(\/|$)/.test(file),
    `Unexpected package file: ${file}`,
  );
  const text = fs.readFileSync(path.join(root, "packages/theme", file), "utf8");
  assert.ok(!text.includes("/Users/"), `Local path in package: ${file}`);
}
const pkg = require("../packages/theme/package.json");
assert.equal(
  Object.keys(pkg.dependencies || {}).join(","),
  "lucide-react,turndown,turndown-plugin-gfm",
  "Only shared icons and Markdown conversion belong in runtime dependencies.",
);
console.log(
  `Package checked: ${files.length} files, ${packed.unpackedSize} unpacked bytes, no website, fixtures or mandatory SDK dependencies.`,
);
