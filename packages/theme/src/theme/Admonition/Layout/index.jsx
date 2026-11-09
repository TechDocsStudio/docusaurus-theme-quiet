import React from "react";
import { translate } from "@docusaurus/Translate";
import Layout from "@theme-init/Admonition/Layout";

export default function QuietAdmonition({ className = "", title, ...props }) {
  // Only normalize Classic's default labels. Author-supplied titles stay intact.
  if (
    React.isValidElement(title) &&
    /^theme\.admonition\./.test(title.props.id || "")
  ) {
    const label = translate({
      id: title.props.id,
      message: title.props.children,
    });
    title = label.charAt(0).toLocaleUpperCase() + label.slice(1);
  }
  return (
    <Layout {...props} title={title} className={`quiet-callout ${className}`} />
  );
}
