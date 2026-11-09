const path = require("node:path");

const defaults = {
  accentColor: "#191a18",
  accentColorDark: "#e9ecef",
};

function normalizeOptions(options = {}) {
  for (const key of Object.keys(options)) {
    if (!Object.hasOwn(defaults, key))
      throw new Error(`Quiet: unknown option "${key}".`);
  }
  const result = { ...defaults, ...options };
  for (const [key, value] of Object.entries(result)) {
    if (typeof value !== "string" || !/^#[0-9a-f]{6}$/i.test(value)) {
      throw new Error(`Quiet: ${key} must be a six-digit hex color.`);
    }
  }
  return result;
}

function quietTheme(_context, options) {
  const colors = normalizeOptions(options);
  return {
    name: "docusaurus-theme-quiet",
    getThemePath: () => path.join(__dirname, "src/theme"),
    getClientModules: () => [
      path.join(__dirname, "src/styles.css"),
      path.join(__dirname, "src/client.js"),
    ],
    injectHtmlTags: () => ({
      headTags: [
        {
          tagName: "style",
          innerHTML: `html{--quiet-accent-light:${colors.accentColor};--quiet-accent-dark:${colors.accentColorDark}}`,
        },
      ],
    }),
  };
}

module.exports = quietTheme;
module.exports.validateOptions = ({ options }) => normalizeOptions(options);
