import React, { useEffect, useRef, useState } from "react";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import { usePluginData } from "@docusaurus/useGlobalData";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  FileText,
  Link2,
  SquarePen,
  Terminal,
} from "lucide-react";
import getPageMarkdown from "@theme/Quiet/CopyPage";
import ActionIcon from "./ActionIcon";
import { mcpCommand } from "../page-actions.cjs";

function pageUrl(template, metadata, site) {
  if (!template) return null;
  const canonical = new URL(metadata.permalink, site.url).href;
  const path = (value) => value.split("/").map(encodeURIComponent).join("/");
  const value = template
    .replaceAll("{docId}", path(metadata.id))
    .replaceAll("{pageUrl}", encodeURIComponent(canonical))
    .replaceAll(
      "{sourcePath}",
      path(String(metadata.source || "").replace(/^@site\//, "")),
    );
  const url = new URL(value, new URL(site.baseUrl, site.url));
  return !/^https?:\/\//i.test(value) && url.origin === new URL(site.url).origin
    ? `${url.pathname}${url.search}${url.hash}`
    : url.href;
}
export default function PageActions() {
  const { pageActions: config } = usePluginData("docusaurus-theme-quiet") || {};
  const { metadata } = useDoc();
  const { siteConfig } = useDocusaurusContext();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [copiedKey, setCopiedKey] = useState(null);
  const root = useRef(null),
    toggle = useRef(null),
    menu = useRef(null);
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector('[role="menuitem"]')?.focus();
    const outside = (event) => {
      if (!root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  useEffect(() => {
    setOpen(false);
    setStatus("");
    setCopiedKey(null);
  }, [metadata.permalink]);
  useEffect(() => {
    if (!status && !copiedKey) return;
    const timer = setTimeout(() => {
      setStatus("");
      setCopiedKey(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [status, copiedKey]);
  if (!config) return null;
  function exportUrl(action, fallback) {
    const entry = action?.url ? action : fallback;
    return entry?.url &&
      !entry.exclude.some((prefix) => metadata.id.startsWith(prefix))
      ? pageUrl(entry.url, metadata, siteConfig)
      : null;
  }
  const markdownUrl = exportUrl(config.copyPage, config.viewSource);
  const source =
    config.viewSource && exportUrl(config.viewSource, config.copyPage);
  async function copy(value, label, key) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setStatus(`${label} copied`);
    } catch {
      setCopiedKey(null);
      setStatus("Could not copy. Check clipboard access.");
      setOpen(false);
    }
  }
  async function copyPage(key) {
    try {
      const markdown = await getPageMarkdown({
        element: document.querySelector(".theme-doc-markdown"),
        url: new URL(metadata.permalink, siteConfig.url).href,
        markdownUrl,
      });
      await copy(markdown, "Page", key);
    } catch {
      setCopiedKey(null);
      setStatus("Could not copy this page. Try again.");
      setOpen(false);
    }
  }
  function askAi() {
    setStatus("");
    setCopiedKey(null);
    setOpen(false);
    try {
      const host = document.querySelector(config.askAi.selector);
      const button =
        host?.tagName === "BIEL-BUTTON"
          ? host.shadowRoot?.querySelector('[part="button"]')
          : host;
      const bot =
        document.querySelector("biel-bot") ||
        document
          .querySelector("biel-search")
          ?.shadowRoot?.querySelector("biel-bot");
      if (button) button.click();
      else if (bot) bot.showModal = true;
      else setStatus("The assistant is still loading. Try again shortly.");
    } catch {
      setStatus("Could not open the assistant. Check its selector.");
    }
  }
  function keyDown(event) {
    const items = [...menu.current.querySelectorAll('[role="menuitem"]')];
    const index = items.indexOf(document.activeElement);
    if (event.key === "Tab") setOpen(false);
    else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      toggle.current?.focus();
    } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      const next =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? items.length - 1
            : (index + (event.key === "ArrowDown" ? 1 : -1) + items.length) %
              items.length;
      items[next]?.focus();
    }
  }
  const entries = [];
  function icon(item, Fallback) {
    if (item.icon === undefined) return Fallback;
    const value =
      typeof item.icon === "object"
        ? { src: pageUrl(item.icon.src, metadata, siteConfig) }
        : item.icon;
    return (props) => <ActionIcon icon={value} {...props} />;
  }
  for (const [key, item] of Object.entries(config)) {
    if (!item) continue;
    if (key === "copyPage")
      entries.push({
        key,
        label: item.label,
        Icon: icon(item, Copy),
        onClick: () => copyPage(key),
      });
    else if (key === "askAi")
      entries.push({
        key,
        label: item.label,
        Icon: icon(item, null),
        onClick: askAi,
      });
    else if (key === "viewSource") {
      if (source)
        entries.push({
          key,
          label: item.label,
          Icon: icon(item, FileText),
          href: source,
        });
    } else if (key === "editPage") {
      if (metadata.editUrl)
        entries.push({
          key,
          label: item.label,
          Icon: icon(item, SquarePen),
          href: metadata.editUrl,
        });
    } else if (key === "mcp") {
      for (const [clientKey, client] of Object.entries(item.clients)) {
        if (!client) continue;
        const value =
          clientKey === "url" ? item.url : mcpCommand(client.command, item);
        const actionKey = `mcp-${clientKey}`;
        entries.push({
          key: actionKey,
          label: client.label,
          Icon: clientKey === "url" ? Link2 : Terminal,
          onClick: () =>
            copy(value, clientKey === "url" ? "MCP URL" : "Command", actionKey),
        });
      }
    } else if (item.url)
      entries.push({
        key,
        label: item.label,
        Icon: icon(item, ExternalLink),
        href: pageUrl(item.url, metadata, siteConfig),
      });
    else
      entries.push({
        key,
        label: item.label,
        Icon: icon(item, Copy),
        onClick: () =>
          copy(
            item.copy
              .replaceAll(
                "{pageUrl}",
                new URL(metadata.permalink, siteConfig.url).href,
              )
              .replaceAll("{docId}", metadata.id),
            item.label,
            key,
          ),
      });
  }
  if (!entries.length) return null;
  const primary = entries[0];
  function renderIcon(key, Icon) {
    const Glyph = copiedKey === key ? Check : Icon;
    return Glyph ? <Glyph size={16} aria-hidden="true" /> : null;
  }
  return (
    <nav className="quiet-doc-actions" ref={root} aria-label="Page tools">
      <div className="quiet-actions-control">
        {primary.onClick ? (
          <button type="button" onClick={primary.onClick}>
            {renderIcon(primary.key, primary.Icon)}
            <span>{primary.label}</span>
          </button>
        ) : (
          <a href={primary.href} target="_blank" rel="noopener noreferrer">
            {renderIcon(primary.key, primary.Icon)}
            <span>{primary.label}</span>
          </a>
        )}
        <button
          type="button"
          ref={toggle}
          aria-label="Page actions"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => {
            if (!copiedKey) setStatus("");
            setOpen(!open);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setOpen(true);
            }
          }}
        >
          <ChevronDown size={15} />
        </button>
      </div>
      {open && (
        <div
          ref={menu}
          className="quiet-actions-menu"
          role="menu"
          aria-label="Page actions"
          onKeyDown={keyDown}
        >
          {entries.map(({ key, label, Icon, href, onClick }) =>
            href ? (
              <a
                key={key}
                role="menuitem"
                tabIndex={-1}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                {renderIcon(key, Icon)}
                <span>{label}</span>
              </a>
            ) : (
              <button
                key={key}
                type="button"
                role="menuitem"
                tabIndex={-1}
                onClick={onClick}
              >
                {renderIcon(key, Icon)}
                <span>{label}</span>
              </button>
            ),
          )}
        </div>
      )}
      <span
        className={copiedKey ? "quiet-feedback-label" : "quiet-action-status"}
        role="status"
      >
        {status}
      </span>
    </nav>
  );
}
