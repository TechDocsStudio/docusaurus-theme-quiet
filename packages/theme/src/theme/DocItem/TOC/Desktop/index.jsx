import React from "react";
import TOC from "@theme-init/DocItem/TOC/Desktop";
import { usePluginData } from "@docusaurus/useGlobalData";
import PageFeedback from "../../../../components/PageFeedback";

export default function QuietDocRail(props) {
  const { feedback } = usePluginData("docusaurus-theme-quiet") || {};
  return (
    <div className="quiet-doc-rail">
      <TOC {...props} />
      {feedback?.position === "sidebar" && <PageFeedback />}
    </div>
  );
}
