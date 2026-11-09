const { themes } = require("prism-react-renderer");

module.exports = {
  title: "Quiet",
  url: "https://techdocsstudio.github.io",
  baseUrl: "/docusaurus-theme-quiet/",
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
    require.resolve("./plugins/search.cjs"),
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
    ...(process.env.QUIET_BIEL_PROJECT
      ? [
          [
            "docusaurus-biel",
            {
              project: process.env.QUIET_BIEL_PROJECT,
              bielButtonText: "Ask AI",
              headerTitle: "Ask AI",
              modalPosition: "sidebar-right",
            },
          ],
        ]
      : []),
  ],
  headTags: process.env.QUIET_FEEDBACK_PROJECT
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
    bielProject: process.env.QUIET_BIEL_PROJECT || null,
    feedbackProject: process.env.QUIET_FEEDBACK_PROJECT || null,
  },
  themes: [
    "docusaurus-theme-openapi-docs",
    "@docusaurus/theme-mermaid",
    "docusaurus-theme-quiet",
  ],
  themeConfig: {
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
