const fs = require("node:fs");
const path = require("node:path");

// Local evaluation only: preserve existing page-copy, feedback and API actions.
// These site-owned components are never part of the published theme.
module.exports = function adaptConsumer(target, root) {
  const saved = path.join(target, "src/quiet-disabled-theme");
  for (const candidate of [
    "SearchBar.tsx",
    "SearchBar.jsx",
    "SearchBar.js",
    "SearchBar",
    "CopyPageButton",
    "DocItem/Content",
    "DocItem/Layout",
    "DocItem/Footer",
  ]) {
    const source = path.join(saved, candidate);
    if (fs.existsSync(source)) {
      const destination = path.join(target, "src/theme", candidate);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.cpSync(source, destination, { recursive: true });
    }
  }
  fs.cpSync(
    path.join(root, "website/static/fonts"),
    path.join(target, "static/quiet-fonts"),
    { recursive: true },
  );
  fs.mkdirSync(path.join(target, "src/css"), { recursive: true });
  fs.writeFileSync(
    path.join(target, "src/css/quiet-preview.css"),
    `
@font-face {font-family:Inter;src:url('../../static/quiet-fonts/inter.woff2') format('woff2');font-display:swap;font-weight:100 900}
@font-face {font-family:'Inter Tight';src:url('../../static/quiet-fonts/inter-tight.woff2') format('woff2');font-display:swap;font-weight:100 900}
.doc-header-with-copy {display:flex;justify-content:flex-end;margin-bottom:1rem}
.copy-page-button {display:inline-flex;align-items:center;gap:.5rem;padding:.5rem .75rem;border:1px solid var(--quiet-line);border-radius:8px;background:var(--quiet-paper);color:var(--quiet-ink);font:inherit;font-size:14px;cursor:pointer}
.feedback-widget {display:flex;align-items:center;flex-wrap:wrap;gap:1rem;padding-block:1.5rem;border-top:1px solid var(--quiet-line);font-size:14px}
.feedback-widget b {font-weight:500}
.pushfeedback-thumbs-row {display:flex;gap:.75rem}
.pushfeedback-thumb-label {margin-inline-end:.5rem}
`,
  );
};
