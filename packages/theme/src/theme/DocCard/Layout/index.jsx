import React from "react";
import Layout from "@theme-init/DocCard/Layout";

// Classic still owns destinations, descriptions and localized category counts.
export default function QuietDocCard(props) {
  return <Layout {...props} icon={null} />;
}
