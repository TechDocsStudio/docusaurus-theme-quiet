import React from "react";
import {
  Bot,
  Copy,
  ExternalLink,
  FileText,
  Link2,
  MessageCircle,
  Search,
  Sparkles,
  Terminal,
} from "lucide-react";

export default function ActionIcon({ icon, size = 16, ...props }) {
  if (icon === false) return null;
  if (typeof icon === "object")
    return (
      <img
        src={icon.src}
        alt=""
        width={16}
        height={16}
        className="quiet-action-image"
      />
    );
  if (icon === "biel")
    return (
      <svg
        width={size}
        height={size}
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
        fill="currentColor"
        stroke="none"
        className="quiet-biel-mark"
      >
        <rect x="6" y="8" width="20" height="5" rx="1.5" />
        <rect x="6" y="17.5" width="28" height="5" rx="1.5" />
        <rect x="6" y="27" width="14" height="5" rx="1.5" />
        <rect x="30" y="27" width="5" height="5" rx="1.5" />
      </svg>
    );
  const Icon = {
    bot: Bot,
    copy: Copy,
    "external-link": ExternalLink,
    file: FileText,
    link: Link2,
    "message-circle": MessageCircle,
    search: Search,
    sparkles: Sparkles,
    terminal: Terminal,
  }[icon];
  return Icon ? <Icon size={size} {...props} /> : null;
}
