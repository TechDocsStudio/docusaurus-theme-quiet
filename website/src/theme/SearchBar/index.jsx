import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const { siteConfig } = useDocusaurusContext();
  const project = siteConfig.customFields?.bielProject;
  const { docs = [] } = usePluginData("quiet-docs-search") || {};
  const dialog = useRef(null);
  const input = useRef(null);
  const trigger = useRef(null);
  const [query, setQuery] = useState("");
  function open() {
    dialog.current.showModal();
    input.current.focus();
  }
  function close() {
    dialog.current.close();
    trigger.current?.focus();
  }
  useEffect(() => {
    if (project) return undefined;
    const shortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current.open) close();
        else open();
      }
    };
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, [project]);
  if (project)
    return (
      <biel-search-button
        project={project}
        header-title="Ask AI"
        button-style="rounded"
        clean-titles="true"
      >
        Search or ask AI
      </biel-search-button>
    );
  const results = docs.filter((doc) =>
    `${doc.title} ${doc.description || ""}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <button
        type="button"
        className="quiet-search-trigger"
        onClick={open}
        ref={trigger}
        aria-haspopup="dialog"
      >
        <Search size={18} strokeWidth={1.6} />
        <span>Search docs</span>
        <kbd>⌘ K</kbd>
      </button>
      <dialog
        ref={dialog}
        className="quiet-search-dialog"
        aria-label="Search documentation"
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
        onCancel={() => trigger.current?.focus()}
      >
        <div className="quiet-search-input">
          <Search size={18} aria-hidden="true" />
          <input
            ref={input}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search documentation"
            placeholder="Search docs"
          />
          <button type="button" onClick={close} aria-label="Close search">
            <X size={18} />
          </button>
        </div>
        <ul className="quiet-search-results">
          {results.map((doc) => (
            <li key={doc.permalink}>
              <Link to={doc.permalink} onClick={close}>
                <strong>{doc.title}</strong>
                <span>{doc.description}</span>
              </Link>
            </li>
          ))}
        </ul>
        {results.length === 0 && (
          <p className="quiet-search-empty">No pages found.</p>
        )}
      </dialog>
    </>
  );
}
