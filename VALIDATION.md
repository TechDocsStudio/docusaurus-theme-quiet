# Validation

Local evaluation on November 9, 2026. This is an unpublished first release.

## Package and documentation

- Node 24.22.2, npm 11.9.0, Docusaurus Classic 3.10.2 and React 18.3.1.
- Configuration tests cover both color modes, package entry points, unknown options and CSS injection rejection.
- Prettier, production build and distribution checks pass.
- The documentation build contains 29 HTML pages. The local-link checker checks 1,070 links and assets in the production root build, titles and one H1 per page.
- The tarball contains 35 files, about 44 KB unpacked. No website, fonts, consumer snapshots, credentials or service SDKs are packaged. Lucide React is the one UI dependency.

The footer credit is present by default, including when no host footer is configured. A separate production build with `showCredit: false` removes the credit across all 29 HTML pages while preserving a configured copyright. Both consumer builds retain their copyright and show exactly one credit. The default plugin namespace is retained by option validation.

## Browser checks

- Light and dark mode, readable body text and 14px code.
- Generated category cards contain no default emoji icons. Category links and descriptions remain available.
- Breadcrumbs omit the redundant home icon. Category breadcrumbs remain. The first breadcrumb text and article heading share the same left edge (317px in the desktop check).
- The documentation site uses the official Biel search control and floating Ask AI button with its own project. The former local index, filtering code and custom dialog have been removed.
- A separate production build with both project environment values empty has no provider loaders or controls. Its empty search container is hidden with zero width in the browser. A separate build with a test search provider preserves that provider's SearchBar.
- The Quiet Biel project loaded 36 repository sources. These supply assistant context; web-page search needs the published website indexed separately. A search for branding returned no pages, as expected for a repository-only project. No AI question was submitted.
- PushFeedback thumbs render with the Quiet project configured. Their buttons measure 36 by 36px with a precise pointer; coarse-pointer CSS uses 44px. They were not clicked or submitted during verification.
- Forest resolves Ask AI, Send and user-message backgrounds to #23734a. Hover colors mix the selected accent with the theme ink, so they no longer revert to black. Send retains an 8px radius. No question was submitted for styling verification.
- Sidebar active backgrounds retain an inset from the outer divider. The icon-to-wordmark gap is approximately 6px.
- API media-type and schema tabs are compact and borderless. A single media type is a 20px text label. The body tab is approximately 32px tall. Schema carets no longer overlap the heading.
- Edit links use a 16px Lucide SquarePen, centered with inline flex. Forest changes active navigation, footer links, tab selection and primary buttons.
- Branding presets update the page and copyable configuration together. The selected palette survives navigation and reload. Invalid or unavailable browser storage is handled without breaking the site.
- The wide table scrolls with the keyboard inside its own region, without page overflow at desktop width or 320px. Branding and the API operation also fit 320px.
- The API demo uses an independent sidebar, generated operations, request/response schemas, cURL/JavaScript/Python samples and response status tabs. No API request is executed in verification.
- Copy/Check are unfilled Lucide strokes in the same position. The button announces Copied and avoids the duplicate native tooltip.
- Callout labels use sentence case and semantic colors in both modes, including a green Tip.
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

React 19 is in the peer range but has not been tested here. RTL styles are included but have not had a complete language review. This is not a full accessibility certification. Consumer dependency graphs are inherited from the source snapshots. The optional OpenAPI/Postman tooling has upstream transitive audit findings; those dependencies are excluded from the distributed theme.

No npm release or consumer deployment is performed. Optional provider IDs are configured by the host site. The Quiet documentation site defaults to its public Biel and PushFeedback projects. Empty environment overrides disable them independently. The distributed theme contains neither a search engine nor these project IDs.

## Launch preparation

The README includes an actual browser screenshot captured with a 1280 by 800 viewport override (the browser exports a 1265 by 791 image). API operations fill the available main column: at this viewport the main and API content measured 965px, with no page overflow. Diagrams are listed only under Components. Used by is a separate page. The production build uses https://quiet.techdocs.studio/ with root asset paths. The first npm release remains manual.

## Card, procedure and contrast review

The Biel migration uses Classic DocCardList for 73 navigation cards. Their destinations are unchanged. Native and Quiet cards have visible spacing and no link underlines. Both consumer quickstarts use Steps with their existing heading IDs and table-of-contents entries. Short numbered lists remain unchanged. Quiet installation and OpenAPI setup also demonstrate detailed steps.

The PushFeedback navbar uses the current public website mark and an editable text wordmark. Its mark renders square at 30px on desktop and 24px on mobile. The theme preserves image aspect ratios rather than compressing full-image logos.

Dark-mode widget checks confirmed a white Biel search symbol on #191a18 and a white PushFeedback Send label on #2563eb. Filled actions keep the primary color while links can use a lighter dark-mode accent. Both consumer pages fit a 320px viewport; navigation cards become a single column. No AI question, rating or feedback submission was sent.
