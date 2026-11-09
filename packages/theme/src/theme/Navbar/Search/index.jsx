import React from "react";
import Search from "@theme-init/Navbar/Search";

export default function QuietNavbarSearch({ className = "", ...props }) {
  return <Search {...props} className={`quiet-navbar-search ${className}`} />;
}
