# Architecture

Quiet is a presentation layer over Docusaurus Classic. It keeps upstream routing, navigation, accessibility controls, Markdown rendering and metadata.

## Package boundary

The npm package contains its Node plugin entry, type declaration, CSS, a small keyboard handler, the MDX component map four small MDX components and shallow presentation wrappers. Lucide React is the only runtime dependency. There is no bundler, generated output, runtime framework or mandatory service SDK in the package. Docusaurus compiles the JSX. The keyboard handler closes Classic's mobile menu on Escape and returns focus to its toggle, using the existing close action.

The documentation site has independent Guides and API sidebars. OpenAPI pages are generated from website/openapi/demo.yaml. Its explicit browser targets preserve the optional plugin's CommonJS modules during Babel compilation. The palette playground and local preference storage belong only to the website.

The repository uses npm workspaces for the package and documentation site. Font files belong to the website under their original licenses and are excluded from the package. Consumer snapshots and package artifacts are ignored.

## Configuration

Two validated hex-color options cover light and dark accents. An optional footer credit is enabled by default and can be removed with showCredit: false. Shallow footer wrappers preserve configured footer content and also cover sites without a configured footer. Standard Docusaurus configuration owns logos, navigation, sidebars, versions, locales and metadata. CSS tokens own typography, width and surfaces. This avoids duplicating upstream configuration.

## Components

| Component                        | Source                              | Example     |
| -------------------------------- | ----------------------------------- | ----------- |
| Typography, links, lists, images | Classic Markdown                    | Typography  |
| Code and copy control            | Classic CodeBlock                   | Code        |
| Admonitions                      | Classic Admonition                  | Callouts    |
| Tabs                             | Classic Tabs and TabItem            | Tabs        |
| Accordions                       | Classic Details / native disclosure | Disclosures |
| Tables                           | Markdown                            | Tables      |
| Cards                            | Quiet Card and CardGrid             | Cards       |
| Steps                            | Quiet Steps and Step                | Steps       |
| Diagrams                         | Optional Docusaurus Mermaid theme   | Diagrams    |

Do not duplicate Classic components. Shallow wrappers remove default card emojis, omit the breadcrumb home item, attach the centered search class and substitute Lucide icons. Upstream components continue to own behavior and content. Use semantic classes and variables. A local site's component overrides retain precedence. The package's MDX component map extends the base map using the documented @theme-init alias.

## UX, DX and AX

Readers get readable text, short navigation, visible focus, native disclosures and responsive controls. Contributors get small source files, a lockfile, component examples and package validation. Agents get the same generated HTML, headings and links as readers. Markdown exports and MCP are separate integrations with explicit access and exclusion policies.

## Integrations

Biel search, Ask AI and PushFeedback are optional plugins. Quiet sets compatible CSS tokens but never imports a service SDK or supplies a project ID. The theme supplies no SearchBar implementation, so installed providers retain their own controls. Empty search containers are hidden. The documentation site uses its public Biel and PushFeedback projects through site-owned adapters. Disabling Biel delegates to the installed SearchBar, or Classic's empty default. Integration documentation shows installation, configuration and verification. Automated checks do not submit questions or feedback.

## Consumer tests

The consumer script archives a committed revision of an existing documentation repository into .local. It does not edit the source checkout or include its uncommitted files. Only copied presentation overrides are disabled. Navbar search, page-copy, article extraction, feedback wrappers, content, API plugins, IDs and routes are retained. A local adapter stylesheet and licensed fonts let these existing site features inherit the new design without adding them to the public theme. A snapshot report identifies the source revision and limitations. Never deploy a fixture as a migration.

## Naming evidence

On November 9, 2026, npm registry requests returned 404 for docusaurus-theme-quiet, docusaurus-theme-still and docusaurus-theme-serein. Exact repository-name searches on GitHub returned no matches. The owner selected Quiet. These checks do not reserve names or establish trademark rights.

## References

- Theme layering: https://docusaurus.io/docs/advanced/client
- Theme configuration: https://docusaurus.io/docs/api/themes/configuration
- Swizzling: https://docusaurus.io/docs/swizzling
