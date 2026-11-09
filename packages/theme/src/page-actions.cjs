const defaultActions = {
  copyPage: { label: "Copy page", url: null, exclude: [] },
  askAi: { label: "Ask AI", selector: "biel-button", icon: "biel" },
  viewSource: { label: "View source", url: null, exclude: [] },
  editPage: { label: "Edit this page" },
  mcp: false,
};
const defaultClients = {
  url: { label: "Copy MCP URL" },
  codex: {
    label: "Connect Codex",
    command: "codex mcp add {name} --url {url}",
  },
  claudeCode: {
    label: "Connect Claude Code",
    command: "claude mcp add {name} --transport http {url}",
  },
};
function object(value, name) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`Quiet: ${name} must be an object or false.`);
}
function linkUrl(value, name, absolute = false) {
  if (typeof value !== "string")
    throw new Error(`Quiet: ${name} must be a URL template.`);
  let url;
  try {
    url = absolute ? new URL(value) : new URL(value, "https://quiet.invalid/");
  } catch {
    throw new Error(
      `Quiet: ${name} must be a valid ${absolute ? "HTTP(S) URL" : "URL template"}.`,
    );
  }
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password
  )
    throw new Error(
      `Quiet: ${name} must use HTTP(S), without embedded credentials.`,
    );
}
function orderedKeys(value, defaults) {
  return [
    ...Object.keys(value),
    ...Object.keys(defaults).filter((key) => !Object.hasOwn(value, key)),
  ];
}
function normalizeActions(value = {}) {
  if (value === false) return false;
  object(value, "pageActions");
  const result = {};
  for (const key of orderedKeys(value, defaultActions)) {
    const entry = value[key] ?? defaultActions[key];
    if (entry === false) {
      result[key] = false;
      continue;
    }
    object(entry, `pageActions.${key}`);
    if (key === "mcp") {
      linkUrl(entry.url, "pageActions.mcp.url", true);
      if (entry.clients !== undefined)
        object(entry.clients, "pageActions.mcp.clients");
      const clients = {};
      for (const clientKey of orderedKeys(
        entry.clients || {},
        defaultClients,
      )) {
        const client = entry.clients?.[clientKey] ?? defaultClients[clientKey];
        if (client === false) {
          clients[clientKey] = false;
          continue;
        }
        object(client, `MCP client ${clientKey}`);
        clients[clientKey] = { ...defaultClients[clientKey], ...client };
        if (
          typeof clients[clientKey].label !== "string" ||
          (clientKey !== "url" &&
            typeof clients[clientKey].command !== "string")
        )
          throw new Error("Quiet: MCP clients need a label and command.");
      }
      result.mcp = { name: "docs", ...entry, clients };
      if (typeof result.mcp.name !== "string")
        throw new Error("Quiet: the MCP name must be a string.");
      continue;
    }
    result[key] = { ...defaultActions[key], ...entry };
    if (typeof result[key].label !== "string")
      throw new Error(`Quiet: pageActions.${key} needs a label.`);
    if (key === "askAi" && typeof result[key].selector !== "string")
      throw new Error("Quiet: askAi.selector must be a CSS selector.");
    if (
      ["copyPage", "viewSource"].includes(key) &&
      (!Array.isArray(result[key].exclude) ||
        result[key].exclude.some((prefix) => typeof prefix !== "string"))
    )
      throw new Error(`Quiet: ${key}.exclude must be document ID prefixes.`);
    if (["copyPage", "viewSource"].includes(key) && result[key].url !== null)
      linkUrl(result[key].url, `${key}.url`);
    if (result[key].icon !== undefined && result[key].icon !== false) {
      if (typeof result[key].icon === "string") {
        if (
          ![
            "biel",
            "sparkles",
            "bot",
            "search",
            "message-circle",
            "copy",
            "link",
            "external-link",
            "file",
            "terminal",
          ].includes(result[key].icon)
        )
          throw new Error(
            `Quiet: unknown icon for ${key}. Use a supported icon name or {src: "img/icon.svg"}.`,
          );
      } else {
        object(result[key].icon, `${key}.icon`);
        linkUrl(result[key].icon.src, `${key}.icon.src`);
      }
    }
    if (!Object.hasOwn(defaultActions, key)) {
      if (result[key].url !== undefined)
        linkUrl(result[key].url, `pageActions.${key}.url`);
      else if (typeof result[key].copy !== "string")
        throw new Error(
          `Quiet: custom action ${key} needs a URL or copy text.`,
        );
    }
  }
  return result;
}
function pluginOptions(site, name) {
  return (
    (site.plugins || []).find((p) => Array.isArray(p) && p[0] === name)?.[1] ||
    {}
  );
}
function resolveActions(site, config) {
  if (!config.pageActions) return false;
  const biel = pluginOptions(site, "docusaurus-biel");
  const hasBiel =
    biel.enable !== false &&
    !!(
      biel.project ||
      site.customFields?.biel?.project ||
      site.customFields?.bielProject
    );
  const actions = { ...config.pageActions };
  if (actions.askAi && !hasBiel && actions.askAi.selector === "biel-button")
    actions.askAi = false;
  return actions;
}
function resolveFeedback(site, value) {
  if (value === false) return false;
  object(value, "feedback");
  const plugin = pluginOptions(site, "docusaurus-pushfeedback");
  const result = {
    project: site.customFields?.feedbackProject || plugin.project,
    label: "Was this page helpful?",
    position: "sidebar",
    successMessage: plugin.successMessage,
    ...value,
  };
  if (!result.project) return false;
  if (
    typeof result.project !== "string" ||
    typeof result.label !== "string" ||
    !["sidebar", "footer"].includes(result.position)
  )
    throw new Error(
      "Quiet: feedback needs a project ID, label and sidebar or footer position.",
    );
  return result;
}
function shellQuote(value) {
  return "'" + String(value).replace(/'/g, "'\"'\"'") + "'";
}
function mcpCommand(template, mcp) {
  return template.replace(/\{(url|name)\}/g, (_, key) => shellQuote(mcp[key]));
}
module.exports = {
  defaultActions,
  normalizeActions,
  resolveActions,
  resolveFeedback,
  mcpCommand,
};
