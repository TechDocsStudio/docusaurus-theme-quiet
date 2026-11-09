const fs = require("node:fs");
const path = require("node:path");
const { execFileSync, spawnSync } = require("node:child_process");

const name = process.argv[2];
if (!["biel", "pushfeedback"].includes(name)) {
  throw new Error("Choose biel or pushfeedback.");
}
const source = process.env[`QUIET_${name.toUpperCase()}_SOURCE`];
if (!source || !fs.existsSync(source)) {
  throw new Error(
    `Set QUIET_${name.toUpperCase()}_SOURCE to a local documentation repository.`,
  );
}
const root = path.resolve(__dirname, "..");
const target = path.join(root, ".local", name);
if (fs.existsSync(target)) {
  throw new Error(
    `Preview already exists: ${target}. Reuse it or move it before creating another.`,
  );
}
function run(command, args, cwd = root) {
  const result = spawnSync(command, args, { cwd, stdio: "inherit" });
  if (result.status !== 0)
    throw new Error(`${command} failed (${result.status}).`);
}
let revision = "origin/main";
try {
  execFileSync("git", ["-C", source, "rev-parse", "--verify", revision], {
    stdio: "pipe",
  });
} catch {
  revision = "HEAD";
}
const sha = execFileSync("git", ["-C", source, "rev-parse", revision], {
  encoding: "utf8",
}).trim();
fs.mkdirSync(target, { recursive: true });
const archive = execFileSync("git", ["-C", source, "archive", revision], {
  maxBuffer: 256 * 1024 * 1024,
});
const extraction = spawnSync("tar", ["-xf", "-", "-C", target], {
  input: archive,
});
if (extraction.status !== 0)
  throw new Error("Could not extract the committed snapshot.");
// Even if an upstream repository tracked environment files, do not keep them.
for (const file of fs.readdirSync(target)) {
  if (file.startsWith(".env"))
    fs.rmSync(path.join(target, file), { force: true });
}
fs.mkdirSync(path.join(root, ".artifacts"), { recursive: true });
run("npm", [
  "pack",
  "--workspace",
  "docusaurus-theme-quiet",
  "--pack-destination",
  ".artifacts",
]);
const version = require("../packages/theme/package.json").version;
const pkgPath = path.join(target, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
pkg.private = true;
pkg.dependencies["docusaurus-theme-quiet"] =
  `file:${path.join(root, ".artifacts", `docusaurus-theme-quiet-${version}.tgz`)}`;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
const oldTheme = path.join(target, "src/theme");
if (fs.existsSync(oldTheme))
  fs.renameSync(oldTheme, path.join(target, "src/quiet-disabled-theme"));
require("./consumer-adapter.cjs")(target, root);
fs.renameSync(
  path.join(target, "docusaurus.config.js"),
  path.join(target, "docusaurus.original.cjs"),
);
fs.writeFileSync(
  path.join(target, "docusaurus.config.js"),
  `
const config = require('./docusaurus.original.cjs');
config.presets = config.presets.map(preset => {
  if (!Array.isArray(preset) || !['classic', '@docusaurus/preset-classic'].includes(preset[0])) return preset;
  return [preset[0], {...preset[1], theme: {...preset[1].theme, customCss: require.resolve('./src/css/quiet-preview.css')}}];
});
config.themes = [...(config.themes || []), 'docusaurus-theme-quiet'];
// Local snapshots must never be indexed if accidentally served beyond loopback.
config.noIndex = true;
module.exports = config;
`,
);
fs.writeFileSync(
  path.join(target, "QUIET-PREVIEW.md"),
  `# Local Quiet preview\n\nSource revision: ${sha}\n\nThe source checkout is unchanged. This snapshot replaces the previous global stylesheet and presentation overrides. SearchBar, page-copy, article-layout and feedback wrappers remain in place with a small local adapter stylesheet. Original files remain in src/quiet-disabled-theme and docusaurus.original.cjs. Product docs, plugins, IDs, URLs and API configuration are retained. Do not deploy this fixture.\n`,
);
run("npm", ["install", "--no-fund"], target);
console.log(
  `\nPreview ready: ${target}\nBuild: npm --prefix ${target} run build\nStart: npm --prefix ${target} start -- --host 127.0.0.1 --port ${name === "biel" ? 4211 : 4212}`,
);
