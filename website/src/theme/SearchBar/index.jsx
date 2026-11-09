import React from "react";
import SearchBar from "@theme-original/SearchBar";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// Site-owned adapter for the official Biel control. Other providers keep their
// own SearchBar when Biel is not configured; Classic itself renders nothing.
export default function SiteSearchBar() {
  const { siteConfig } = useDocusaurusContext();
  const biel = siteConfig.customFields?.biel;
  if (!biel?.project) return <SearchBar />;
  return (
    <biel-search-button
      project={biel.project}
      api-url={biel.apiUrl}
      mcp-server-url={biel.mcpServerUrl}
      header-title="Ask AI"
      button-style="rounded"
      clean-titles="true"
    >
      Search or ask AI
    </biel-search-button>
  );
}
