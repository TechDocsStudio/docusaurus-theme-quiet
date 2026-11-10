import React from "react";
import ColorModeToggle from "@theme-init/Navbar/ColorModeToggle";

export default function QuietNavbarColorModeToggle({
  className = "",
  ...props
}) {
  return (
    <ColorModeToggle
      {...props}
      className={`quiet-navbar-color-mode ${className}`}
    />
  );
}
