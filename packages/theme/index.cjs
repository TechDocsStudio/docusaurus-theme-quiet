const path = require("node:path");
const {
  normalizeActions,
  resolveActions,
  resolveFeedback,
} = require("./src/page-actions.cjs");

const defaults = {
  accentColor: "#191a18",
  accentColorDark: "#e9ecef",
  showCredit: true,
  pageActions: {},
  feedback: {},
};

function normalizeOptions({ id = "default", ...options } = {}) {
  if (id !== "default") {
    throw new Error("Quiet: use the default theme instance.");
  }
  for (const key of Object.keys(options)) {
    if (!Object.hasOwn(defaults, key))
      throw new Error(`Quiet: unknown option "${key}".`);
  }
  const result = { ...defaults, ...options };
  for (const key of ["accentColor", "accentColorDark"]) {
    const value = result[key];
    if (typeof value !== "string" || !/^#[0-9a-f]{6}$/i.test(value)) {
      throw new Error(`Quiet: ${key} must be a six-digit hex color.`);
    }
  }
  if (typeof result.showCredit !== "boolean") {
    throw new Error("Quiet: showCredit must be a boolean.");
  }
  result.pageActions = normalizeActions(result.pageActions);
  if (
    result.feedback !== false &&
    (!result.feedback ||
      typeof result.feedback !== "object" ||
      Array.isArray(result.feedback))
  )
    throw new Error("Quiet: feedback must be an object or false.");
  return { ...result, id };
}

function quietTheme(context, options) {
  const config = normalizeOptions(options);
  const site = context.siteConfig || {};
  const pageActions = resolveActions(site, config);
  const feedback = resolveFeedback(site, config.feedback);
  return {
    name: "docusaurus-theme-quiet",
    contentLoaded: ({ actions }) =>
      actions.setGlobalData({
        showCredit: config.showCredit,
        pageActions,
        feedback,
      }),
    getThemePath: () => path.join(__dirname, "src/theme"),
    getClientModules: () => [
      path.join(__dirname, "src/styles.css"),
      path.join(__dirname, "src/client.js"),
    ],
    injectHtmlTags: () => ({
      headTags: [
        {
          tagName: "style",
          innerHTML: `html{--quiet-accent-light:${config.accentColor};--quiet-accent-dark:${config.accentColorDark}}`,
        },
      ],
    }),
  };
}

module.exports = quietTheme;
module.exports.validateOptions = ({ options }) => normalizeOptions(options);
