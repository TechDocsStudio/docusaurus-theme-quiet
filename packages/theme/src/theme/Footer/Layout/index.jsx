import React from "react";
import { usePluginData } from "@docusaurus/useGlobalData";
import Layout from "@theme-init/Footer/Layout";
import ThemeCredit from "../../../components/ThemeCredit";

export default function QuietFooterLayout({ copyright, ...props }) {
  const { showCredit = true } = usePluginData("docusaurus-theme-quiet") || {};
  return (
    <Layout
      {...props}
      copyright={
        showCredit ? (
          <>
            {copyright}
            <ThemeCredit />
          </>
        ) : (
          copyright
        )
      }
    />
  );
}
