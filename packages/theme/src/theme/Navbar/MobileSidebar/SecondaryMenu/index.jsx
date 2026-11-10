// Adapted from Docusaurus theme-classic (Meta Platforms, Inc.; MIT license).
import React from "react";
import { translate } from "@docusaurus/Translate";
import { useThemeConfig } from "@docusaurus/theme-common";
import { useNavbarSecondaryMenu } from "@docusaurus/theme-common/internal";
import { ChevronLeft } from "lucide-react";

export default function QuietMobileSecondaryMenu() {
  const { navbar } = useThemeConfig();
  const secondaryMenu = useNavbarSecondaryMenu();
  const label = translate({
    id: "theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel",
    message: "← Back to main menu",
    description: "Return to the main mobile navigation menu",
  }).replace(/^[←→]\s*/u, "");

  return (
    <>
      {navbar.items.length > 0 && (
        <button
          type="button"
          className="clean-btn navbar-sidebar__back quiet-mobile-back"
          onClick={() => secondaryMenu.hide()}
        >
          <ChevronLeft size={16} strokeWidth={1.6} aria-hidden="true" />
          {label}
        </button>
      )}
      {secondaryMenu.content}
    </>
  );
}
