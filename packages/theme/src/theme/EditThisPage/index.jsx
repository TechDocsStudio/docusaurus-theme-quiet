import React from "react";
import EditThisPage from "@theme-init/EditThisPage";
import { usePluginData } from "@docusaurus/useGlobalData";

export default function QuietEditLink(props) {
  const { pageActions } = usePluginData("docusaurus-theme-quiet") || {};
  return pageActions?.editPage ? null : <EditThisPage {...props} />;
}
