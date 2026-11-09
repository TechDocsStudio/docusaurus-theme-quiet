# Validation

Local evaluation on November 9, 2026. This is an unpublished first release.

## Package and documentation

- Node 24.22.2, npm 11.9.0, Docusaurus Classic 3.10.2 and React 18.3.1.
- Configuration tests cover both color modes, package entry points, unknown options and CSS injection rejection.
- Prettier, production build and distribution checks pass.
- The documentation build contains 24 HTML pages. The local-link checker checks 1,203 links and assets, titles and one H1 per page.
- The tarball contains 29 files, about 29 KB unpacked. No website, fonts, consumer snapshots, credentials or service SDKs are packaged. Lucide React is the one UI dependency.

## Browser checks

- Light and dark mode, readable body text and 14px code.
- Generated category cards contain no default emoji icons. Category links and descriptions remain available.
- Breadcrumbs omit the redundant home icon. Category breadcrumbs remain.
- Navbar search opens a native dialog, filters the documentation index and follows a result. Its default implementation makes no external requests.
- Tabs retain Classic keyboard behavior. Code controls report a successful copy. Native accordions expand and use a small caret.
- Mobile menu closes with Escape and restores focus to the toggle.
- Code, callouts, tabs, accordions, tables, cards, steps and diagrams have no horizontal overflow at a 320px viewport.
- Mermaid renders and its node interaction does not throw the tooltip transition error observed during initial integration.

## Consumer compatibility

The tarball is installed into isolated, committed snapshots. Original documentation checkouts are unchanged. The snapshots retain content, routing, API plugins, page-copy controls and per-page feedback.

| Site              | Classic | Result                                                                       |
| ----------------- | ------- | ---------------------------------------------------------------------------- |
| Biel docs         | 3.10.2  | Production build, 122 documents processed by its Markdown export plugin      |
| PushFeedback docs | 3.10.0  | Production builds for English and Spanish, 63 documents processed per locale |

Biel's optional search, floating Ask AI and two per-page feedback buttons render. Ask AI opens and closes. No AI questions or feedback were submitted, and no API Explorer requests were executed during UI verification. Its OpenAPI theme 5.2.0 receives the Quiet palette and 14px input/code tokens.

## Scope

React 19 is in the peer range but has not been tested here. RTL styles are included but have not had a complete language review. This is not a full accessibility certification. Consumer dependency graphs are inherited from the source snapshots.

No npm release or consumer deployment is performed. Optional provider IDs are configured by the host site. The Quiet documentation site defaults to local search with external services disabled.
