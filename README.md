# Quiet

A Docusaurus theme focused on readable documentation. Built on Classic, with configurable branding and optional Biel and PushFeedback integrations.

**Status:** first release in development. The npm package is not published yet. Use the local tarball for evaluation.

## Run the docs

```sh
npm ci
npm start
```

Open http://localhost:4210/docusaurus-theme-quiet/.

## Use the theme

```sh
npm run pack:theme
# In another Docusaurus site:
npm install /path/to/docusaurus-theme-quiet-0.1.0.tgz
```

```js
// docusaurus.config.js
export default {
  presets: ["classic"],
  themes: [
    [
      "docusaurus-theme-quiet",
      {
        accentColor: "#2563eb",
        accentColorDark: "#93b4ff",
      },
    ],
  ],
};
```

Use standard Docusaurus configuration for logos, navigation, locales and versions. Use CSS variables for fonts, width and surfaces. The theme does not load external fonts or services.

## What is included

- A restrained layout for articles, navigation, code, tables, callouts, tabs and disclosures.
- Native Classic behavior for accessibility, mobile navigation, routing, metadata and code controls.
- MDX `Card`, `CardGrid`, `Steps` and `Step` components.
- Light and dark palettes, 17px reading text and 14px minimum UI text.
- Integration guides for Biel search, Ask AI and PushFeedback, without mandatory service dependencies.
- Lucide icons, icon-free generated cards, small carets and centered navbar search.
- A documentation site with rendered examples and their source.

## Repository

```text
packages/theme/   Publishable theme. No build step.
website/          Documentation and component examples.
scripts/          Isolated consumer previews and validation.
tests/            Plugin configuration and distribution tests.
.local/           Ignored consumer snapshots. Never published.
```

Targets Docusaurus 3.10.x. See [CONTRIBUTING.md](CONTRIBUTING.md) for consumer testing and release preparation. Existing custom CSS and swizzles can override a theme and should be reviewed during adoption.

Validation details: [VALIDATION.md](VALIDATION.md).

## Name

Quiet describes the design's restraint. On November 9, 2026, the exact npm name `docusaurus-theme-quiet` and GitHub repository-name search had no matches. This check does not establish trademark rights or reserve a package name.

## License

MIT. The website's optional bundled fonts retain their separate SIL Open Font Licenses. Those font files are not included in the npm theme.
