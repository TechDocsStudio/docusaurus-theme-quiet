import React from "react";
import Breadcrumbs from "@theme-init/DocBreadcrumbs";
import PageActions from "../../components/PageActions";
import {
  useActivePlugin,
  useActiveDocContext,
} from "@docusaurus/plugin-content-docs/client";

export default function QuietDocHeader(props) {
  const plugin = useActivePlugin();
  const { activeDoc } = useActiveDocContext(plugin?.pluginId);
  // Generated category indexes have no DocProvider. Classic identifies them by a leading slash.
  const isDocument = activeDoc && !activeDoc.id.startsWith("/");
  return (
    <div className="quiet-doc-header">
      <Breadcrumbs {...props} />
      {isDocument && <PageActions />}
    </div>
  );
}
