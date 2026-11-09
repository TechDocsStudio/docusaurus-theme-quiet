const { themes } = require("prism-react-renderer");

module.exports = {
  title: "Quiet",
  url: "https://techdocsstudio.github.io",
  baseUrl: "/docusaurus-theme-quiet/",
  favicon: "img/quiet.svg",
  clientModules: [require.resolve("./src/mermaid-client.js")],
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
  themes: ["docusaurus-theme-quiet", "@docusaurus/theme-mermaid"],
  themeConfig: {
    navbar: {
      title: "Quiet",
      logo: { alt: "", src: "img/quiet.svg" },
      items: [
        { type: "search", position: "right" },
        { to: "/components", label: "Components", position: "left" },
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
    footer: { copyright: "Quiet · MIT license" },
  },
};
