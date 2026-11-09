import React from "react";
import Footer from "@theme-init/DocItem/Footer";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import { usePluginData } from "@docusaurus/useGlobalData";
import PageFeedback from "../../../components/PageFeedback";

export default function QuietDocFooter(props) {
  const { feedback } = usePluginData("docusaurus-theme-quiet") || {};
  const { toc, frontMatter } = useDoc();
  const hasRail = !frontMatter.hide_table_of_contents && toc.length > 0;
  return (
    <>
      {feedback && (
        <PageFeedback
          className={
            feedback.position === "sidebar" && hasRail
              ? "quiet-feedback-mobile"
              : ""
          }
        />
      )}
      <Footer {...props} />
    </>
  );
}
