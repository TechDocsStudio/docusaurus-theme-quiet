# docusaurus-theme-quiet

A restrained Docusaurus theme layered over Classic. MIT licensed.

Requires Docusaurus 3.10.x with the Classic preset. Add the package to `themes` after Classic:

```js
export default {
  presets: ["classic"],
  themes: [
    [
      "docusaurus-theme-quiet",
      {
        accentColor: "#191a18",
        accentColorDark: "#e9ecef",
      },
    ],
  ],
};
```

Use standard Docusaurus logo and navigation settings. `accentColor` and `accentColorDark` accept six-digit hex colors. Fonts, content width and surfaces are configurable with `--quiet-*` CSS variables.

The package includes MDX cards and steps. Tabs, code, admonitions and disclosures retain Classic behavior. It makes no third-party requests. Biel and PushFeedback are optional, separately configured integrations.

Documentation, examples, source and release status: https://github.com/TechDocsStudio/docusaurus-theme-quiet
