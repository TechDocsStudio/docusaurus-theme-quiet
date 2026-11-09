const { themes } = require("prism-react-renderer");

// Public widget identifiers for this documentation site, never server API keys.
// An empty environment value disables the corresponding integration.
const bielProject = process.env.QUIET_BIEL_PROJECT ?? "uxnmeieace";
const feedbackProject = process.env.QUIET_FEEDBACK_PROJECT ?? "la5bwd37g0";
const bielApiUrl = "https://test.techdocs.studio";
const biel = bielProject
  ? {
      project: bielProject,
      apiUrl: bielApiUrl,
      mcpServerUrl: `${bielApiUrl}/mcp/${bielProject}?metadata=mcp`,
    }
  : null;

module.exports = {
  title: "Quiet",
  url: "https://quiet.techdocs.studio",
  baseUrl:
    process.env.QUIET_BASE_URL ??
    (process.env.NETLIFY ? "/" : "/docusaurus-theme-quiet/"),
  favicon: "img/quiet.svg",
  clientModules: [
    require.resolve("./src/mermaid-client.js"),
    require.resolve("./src/brand-client.js"),
  ],
  trailingSlash: false,
  onBrokenLinks: "throw",
  markdown: { mermaid: true, hooks: { onBrokenMarkdownLinks: "throw" } },
  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          docItemComponent: "@theme/ApiItem",
          editUrl:
            "https://github.com/TechDocsStudio/docusaurus-theme-quiet/edit/main/website/",
        },
        blog: false,
        theme: { customCss: require.resolve("./src/css/custom.css") },
      },
    ],
  ],
  plugins: [
    [
      "docusaurus-plugin-llms",
      {
        generateLLMsTxt: true,
        generateLLMsFullTxt: true,
        generateMarkdownFiles: true,
        excludeImports: true,
        removeDuplicateHeadings: true,
      },
    ],
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "quiet-demo",
        docsPluginId: "classic",
        config: {
          demo: {
            specPath: "openapi/demo.yaml",
            outputDir: "docs/api",
            sidebarOptions: { groupPathsBy: "tag" },
          },
        },
      },
    ],
    ...(biel
      ? [
          [
            "docusaurus-biel",
            {
              ...biel,
              bielButtonText: "Ask AI",
              headerTitle: "Ask AI",
              modalPosition: "sidebar-right",
            },
          ],
        ]
      : []),
  ],
  headTags: feedbackProject
    ? [
        {
          tagName: "link",
          attributes: {
            rel: "stylesheet",
            href: "https://cdn.jsdelivr.net/npm/pushfeedback/dist/pushfeedback/pushfeedback.css",
          },
        },
        {
          tagName: "script",
          attributes: {
            type: "module",
            src: "https://cdn.jsdelivr.net/npm/pushfeedback/dist/pushfeedback/pushfeedback.esm.js",
          },
        },
      ]
    : [],
  customFields: {
    biel,
    feedbackProject: feedbackProject || null,
  },
  themes: [
    "docusaurus-theme-openapi-docs",
    "@docusaurus/theme-mermaid",
    [
      "docusaurus-theme-quiet",
      {
        pageActions: {
          copyPage: {},
          askAi: {},
          viewSource: { url: "docs/{docId}.md" },
          mcp: biel ? { url: biel.mcpServerUrl, name: "quiet" } : false,
        },
      },
    ],
  ],
  themeConfig: {
    announcementBar: {
      id: "techdocs-studio",
      content:
        'Quiet is made by TechDocs Studio. We build, migrate and automate your docs. <a href="https://techdocs.studio/services">Explore our services</a>',
      backgroundColor: "var(--quiet-surface)",
      textColor: "var(--quiet-ink)",
      isCloseable: true,
    },
    languageTabs: [
      { language: "curl" },
      { language: "javascript" },
      { language: "python" },
    ],
    navbar: {
      title: "Quiet",
      logo: { alt: "", src: "img/quiet.svg" },
      items: [
        { type: "search", position: "right" },
        {
          type: "docSidebar",
          sidebarId: "docs",
          label: "Guides",
          position: "left",
        },
        {
          to: "/api/quiet-demo-api",
          label: "API demo",
          position: "left",
          activeBaseRegex: "^/api/",
        },
        { to: "/why-quiet", label: "Why Quiet", position: "right" },
        {
          href: "https://github.com/TechDocsStudio/docusaurus-theme-quiet",
          label: "GitHub",
          position: "right",
        },
        { type: "custom-palette", position: "right" },
      ],
    },
    colorMode: { defaultMode: "light", respectPrefersColorScheme: true },
    prism: {
      theme: themes.github,
      darkTheme: themes.vsDark,
      additionalLanguages: ["bash", "json"],
    },
  },
};
