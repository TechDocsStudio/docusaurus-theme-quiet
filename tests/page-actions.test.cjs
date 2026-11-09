const assert = require("node:assert/strict");
const { test } = require("node:test");
const {
  normalizeActions,
  resolveActions,
  resolveFeedback,
  mcpCommand,
} = require("../packages/theme/src/page-actions.cjs");

test("owners can order, extend and disable actions without losing omitted defaults", () => {
  const actions = normalizeActions({
    support: { label: "Support", url: "/support" },
    copyPage: false,
    askAi: { label: "Ask our docs" },
  });
  assert.deepEqual(Object.keys(actions).slice(0, 3), [
    "support",
    "copyPage",
    "askAi",
  ]);
  assert.equal(actions.copyPage, false);
  assert.equal(actions.askAi.selector, "biel-button");
  assert.equal(actions.editPage.label, "Edit this page");
  assert.equal(actions.mcp, false);
  assert.equal(normalizeActions(false), false);
});

test("assistant and feedback controls require a configured provider", () => {
  const config = { pageActions: normalizeActions() };
  assert.equal(resolveActions({}, config).askAi, false);
  assert.equal(resolveFeedback({}, {}), false);
  assert.equal(
    resolveActions(
      { plugins: [["docusaurus-biel", { project: "fixture" }]] },
      config,
    ).askAi.label,
    "Ask AI",
  );
  assert.equal(
    resolveActions(
      { plugins: [["docusaurus-biel", { project: "fixture", enable: false }]] },
      config,
    ).askAi,
    false,
  );
  assert.equal(resolveActions({}, { pageActions: false }), false);
  assert.equal(
    resolveActions(
      {},
      {
        pageActions: normalizeActions({ askAi: { selector: "#my-assistant" } }),
      },
    ).askAi.selector,
    "#my-assistant",
  );
  assert.equal(
    resolveFeedback(
      { plugins: [["docusaurus-pushfeedback", { project: "fixture" }]] },
      {},
    ).position,
    "sidebar",
  );
  assert.equal(
    resolveFeedback({ customFields: { feedbackProject: "fixture" } }, false),
    false,
  );
});

test("action destinations reject script URLs and embedded credentials", () => {
  for (const value of [
    { support: { label: "Bad", url: "javascript:alert(1)" } },
    { viewSource: { url: "data:text/html,example" } },
    { viewSource: { url: "javascript:alert(1)" } },
    { copyPage: { exclude: "private/" } },
    { mcp: { url: "https://user:password@example.com/mcp" } },
    { mcp: { url: "not a URL" } },
    {
      mcp: {
        url: "https://example.com/mcp",
        clients: { bad: { label: "No command" } },
      },
    },
    { broken: { label: "No destination" } },
  ])
    assert.throws(() => normalizeActions(value), /Quiet:/);
});

test("MCP clients can be reordered and their copied shell arguments stay quoted", () => {
  const actions = normalizeActions({
    mcp: {
      url: "https://example.com/mcp?label=it's&value=$(example)",
      name: "project docs",
      clients: {
        claudeCode: false,
        codex: { label: "Copy Codex setup" },
        extra: { label: "Other client", command: "client add {name} {url}" },
      },
    },
  });
  assert.deepEqual(Object.keys(actions.mcp.clients), [
    "claudeCode",
    "codex",
    "extra",
    "url",
  ]);
  assert.equal(actions.mcp.clients.claudeCode, false);
  assert.equal(
    mcpCommand(actions.mcp.clients.extra.command, actions.mcp),
    `client add 'project docs' 'https://example.com/mcp?label=it'"'"'s&value=$(example)'`,
  );
});

test("Copy page is the first default and icons can be replaced or disabled", () => {
  const defaults = normalizeActions();
  assert.equal(Object.keys(defaults)[0], "copyPage");
  assert.equal(defaults.copyPage.label, "Copy page");
  assert.equal(defaults.askAi.icon, "biel");
  assert.equal(defaults.viewSource.url, null);
  assert.equal(normalizeActions({ askAi: { icon: false } }).askAi.icon, false);
  assert.deepEqual(
    normalizeActions({ askAi: { icon: { src: "img/assistant.svg" } } }).askAi
      .icon,
    { src: "img/assistant.svg" },
  );
  assert.throws(
    () => normalizeActions({ askAi: { icon: { src: "javascript:alert(1)" } } }),
    /Quiet:/,
  );
});
