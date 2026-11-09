import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/quiet-demo-api",
    },
    {
      type: "category",
      label: "Documents",
      items: [
        {
          type: "doc",
          id: "api/list-documents",
          label: "List documents",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/read-document",
          label: "Read a document",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Search",
      items: [
        {
          type: "doc",
          id: "api/search-documentation",
          label: "Search documentation",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
