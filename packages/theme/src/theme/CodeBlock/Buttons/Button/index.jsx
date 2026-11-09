import React from "react";
import Button from "@theme-init/CodeBlock/Buttons/Button";

export default function QuietCodeButton({ className = "", title, ...props }) {
  // The copy control already announces its translated state through aria-label.
  return (
    <Button
      {...props}
      className={className}
      title={
        className.split(/\s+/).includes("quiet-code-copy") ? undefined : title
      }
    />
  );
}
