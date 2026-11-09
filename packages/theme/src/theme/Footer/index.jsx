import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { usePluginData } from "@docusaurus/useGlobalData";
import Footer from "@theme-init/Footer";
import ThemeCredit from "../../components/ThemeCredit";

export default function QuietFooter(props) {
  const { siteConfig } = useDocusaurusContext();
  const { footer } = siteConfig.themeConfig;
  const { showCredit = true } = usePluginData("docusaurus-theme-quiet") || {};
  if (footer) return <Footer {...props} />;
  return showCredit ? (
    <footer className="footer quiet-footer-minimal">
      <ThemeCredit />
    </footer>
  ) : null;
}
