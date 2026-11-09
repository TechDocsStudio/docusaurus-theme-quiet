# Quiet

Quiet is a reusable, MIT-licensed Docusaurus theme layered over theme-classic.

- Keep the package independent of the documentation website and consumer fixtures.
- Preserve classic navigation, keyboard controls, links, routing, accessibility and metadata. Extend through public theme aliases and semantic CSS classes. Avoid ejecting upstream components.
- Use sentence case, direct instructions and working examples. No slogans, repeated helper paragraphs, decorative labels, or invented claims.
- Body text is 17px. UI and code text never fall below 14px. Support light, dark, keyboard, reduced motion, RTL and 320px screens.
- Branding uses standard Docusaurus logo configuration, two theme accent options, and documented CSS variables. No fixed product names, public project IDs or third-party requests in the theme. The documentation website may configure its own public widget IDs.
- Biel and PushFeedback remain optional plugins. Do not submit AI questions or feedback in verification. Placeholder project IDs must never be sent to a service.
- A component example shows the actual component and its source. Use upstream components for tabs, code, admonitions, disclosures and diagrams.
- Run npm test, npm run lint, npm run build and npm run pack:theme. Verify the packed package in the isolated consumer fixtures and inspect responsive layouts.
- Consumer snapshots live in ignored .local. Never copy .env files, uncommitted work, credentials, node_modules or private source into the public repository.
- Do not publish npm releases or deploy consumer documentation without explicit approval. Repository creation is authorized; keep the first package release reviewable.
- Consult Procorem MCP before answering Procorem questions.

- No default emoji or decorative icons on generated cards. Omit the breadcrumb home icon because the brand already links home.
- Use Lucide icons with a consistent thin stroke. Sidebar carets and accordion carets stay small. Pagination is an unboxed text link with a top divider.
- Center navbar search on wide screens and preserve mobile navigation. Search and assistant providers stay optional.
- Integrations are organized by purpose: Ask AI, Search, User feedback, OpenAPI reference and Access for AI tools. Diagrams belong only under Components.
- Document icon plus text, full-image logos, favicons and independent logo, heading, body and code fonts.

- Default accents are neutral. A selected brand palette also colors active navigation, footer links, tabs, focus states and primary buttons. Keep semantic callout colors independent.
- Callout default labels use sentence case. Tip is green, Info blue, Warning amber and Danger red, with restrained tints and neutral body text.
- Preserve Classic's copy behavior. Lucide copy/check icons are unfilled strokes with identical positioning and a simple opacity transition.
- Keep an explicit inset between sidebar items and its outer divider. Wide-table examples must scroll within an accessible region.
- The documentation site's branding palette preview persists locally and generates matching configuration. It is not a dependency of the distributed theme.
- Guides and the generated OpenAPI demo use separate sidebars. Regenerate API docs from website/openapi/demo.yaml; do not edit generated MDX.

- API media type and schema tabs are compact text controls with no boxed borders or duplicated dividers. A single media type appears as a simple label. Edit links use a 16px Lucide SquarePen, aligned with inline flex.

- The footer shows an optional Powered by Quiet link to https://quiet.techdocs.studio by default, including sites with no configured footer. `showCredit: false` removes it. Preserve host copyright, footer links and logo.
- Why Quiet explains the minimal, opinionated presentation layer over existing components and optional integrations, and identifies it as the default theme TechDocs Studio uses for client documentation projects. Keep project names and short descriptions on a separate Used by page.

- Do not ship a custom search engine. The demo uses the official Biel control and delegates to installed providers when disabled. With no provider, hide the empty search container. Keep alternate providers supported without promoting them in the docs.
- Align the first breadcrumb text with the article. Feedback thumb controls are square: 36px with a precise pointer, 44px with a coarse pointer. Biel actions, hover states and user messages follow the selected palette.

- API operations use the full available main column for reference and explorer panels. Guide prose retains its reading width. The website is hosted at quiet.techdocs.studio, with Netlify serving the root path.

- Use Classic DocCardList for navigation cards rather than handwritten card HTML. Keep cards separated and free of link underlines. Preserve logo aspect ratios. Use Steps for detailed procedures and retain existing Markdown heading IDs. Filled widget actions keep the primary brand color and a contrasting foreground in both modes; dark link accents are separate.

- Page actions preserve the insertion order of the owner's dictionary, including custom link/copy actions. Missing MCP configuration creates no MCP entries. Never execute copied commands. Reuse the host's assistant and feedback SDKs. Disabled page actions restore Classic's edit link. Feedback defaults to the right rail, with a document-footer fallback on mobile or pages without a rail.
