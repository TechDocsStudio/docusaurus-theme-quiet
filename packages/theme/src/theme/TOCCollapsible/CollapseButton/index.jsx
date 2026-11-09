import React from "react";
import Button from "@theme-init/TOCCollapsible/CollapseButton";

export default function QuietTOCButton({
  collapsed,
  className = "",
  ...props
}) {
  return (
    <Button
      {...props}
      collapsed={collapsed}
      aria-expanded={!collapsed}
      className={`quiet-toc-toggle ${collapsed ? "" : "quiet-toc-toggle--open"} ${className}`}
    />
  );
}
