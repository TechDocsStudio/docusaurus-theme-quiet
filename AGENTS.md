# Quiet

Quiet is a reusable, MIT-licensed Docusaurus theme layered over theme-classic.

- Keep the package independent of the documentation website and consumer fixtures.
- Preserve classic navigation, keyboard controls, links, routing, accessibility and metadata. Extend through public theme aliases and semantic CSS classes. Avoid ejecting upstream components.
- Use sentence case, direct instructions and working examples. No slogans, repeated helper paragraphs, decorative labels, or invented claims.
- Body text is 17px. UI and code text never fall below 14px. Support light, dark, keyboard, reduced motion, RTL and 320px screens.
- Branding uses standard Docusaurus logo configuration, two theme accent options, and documented CSS variables. No fixed product names, public project IDs or third-party requests in the theme.
- Biel and PushFeedback remain optional plugins. Do not submit AI questions or feedback in verification. Placeholder project IDs must never be sent to a service.
- A component example shows the actual component and its source. Use upstream components for tabs, code, admonitions, disclosures and diagrams.
- Run npm test, npm run lint, npm run build and npm run pack:theme. Verify the packed package in the isolated consumer fixtures and inspect responsive layouts.
- Consumer snapshots live in ignored .local. Never copy .env files, uncommitted work, credentials, node_modules or private source into the public repository.
- Do not publish npm releases or deploy consumer documentation without explicit approval. Repository creation is authorized; keep the first package release reviewable.
- Consult Procorem MCP before answering Procorem questions.

- No default emoji or decorative icons on generated cards. Omit the breadcrumb home icon because the brand already links home.
- Use Lucide icons with a consistent thin stroke. Sidebar carets and accordion carets stay small. Pagination is an unboxed text link with a top divider.
- Center navbar search on wide screens and preserve mobile navigation. Search and assistant providers stay optional.
- Integrations are organized by purpose: Ask AI, Search, User feedback, Diagrams, OpenAPI reference and Access for AI tools.
- Document icon plus text, full-image logos, favicons and independent logo, heading, body and code fonts.
