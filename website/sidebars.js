module.exports = {
  docs: [
    "installation",
    "branding",
    "navigation",
    "writing",
    {
      type: "category",
      label: "Components",
      link: { type: "doc", id: "components/index" },
      items: [
        "components/typography",
        "components/code",
        "components/callouts",
        "components/tabs",
        "components/disclosures",
        "components/tables",
        "components/cards",
        "components/steps",
        "components/diagrams",
      ],
    },
    {
      type: "category",
      label: "Integrations",
      link: {
        type: "generated-index",
        slug: "/integrations",
        title: "Integrations",
      },
      items: [
        "integrations/ask-ai",
        "integrations/search",
        "integrations/user-feedback",
        "integrations/diagrams",
        "integrations/openapi",
        "integrations/ai-access",
      ],
    },
    "configuration",
    "contributing",
  ],
};
