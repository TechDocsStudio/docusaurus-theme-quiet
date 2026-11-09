import React from "react";
import Layout from "@theme-init/Admonition/Layout";

export default function QuietAdmonition({ className = "", ...props }) {
  return <Layout {...props} className={`quiet-callout ${className}`} />;
}
