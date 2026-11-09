import React from "react";
import CopyButton from "@theme-init/CodeBlock/Buttons/CopyButton";

export default function QuietCopyButton({ className = "", ...props }) {
  return <CopyButton {...props} className={`quiet-code-copy ${className}`} />;
}
