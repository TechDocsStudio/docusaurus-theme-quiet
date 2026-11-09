# Contributing

Use Node 24 for development. Install from the lockfile with `npm ci`.

## Verify a change

```sh
npm test
npm run lint
npm run build
npm run check:site
npm run check:package
npm run pack:theme
```

Run `npm start` and inspect the component gallery at 320px, desktop width, light and dark mode. Test the mobile menu, Escape, tabs, copy controls, disclosures and focus visibility. Do not submit questions or feedback to real accounts as part of automated checks.

## Test existing documentation

```sh
QUIET_BIEL_SOURCE=/path/to/biel-docs npm run preview:biel
QUIET_PUSHFEEDBACK_SOURCE=/path/to/pushfeedback-docs npm run preview:pushfeedback
```

The script snapshots `origin/main` when available, otherwise `HEAD`, from a local Git checkout. It reads committed files only and writes under ignored `.local/`. It disables copied presentation overrides in the snapshot, retains the original configuration as a local reference, and installs the packed theme. It never edits the source repository.

Consumer snapshots are for local evaluation. Do not publish or deploy them. Review the generated `QUIET-PREVIEW.md` for the exact source revision and presentation changes before comparing results.

## Preview optional providers

The documentation site uses local title and description search by default. To evaluate your own providers, set `QUIET_BIEL_PROJECT` and/or `QUIET_FEEDBACK_PROJECT` before running `npm start` or `npm run build`. Without an ID, its loader and controls stay disabled. Never commit real account credentials or server API keys.

## Prepare a release

1. Update the package version and changelog.
2. Run all checks and test the tarball in a consumer using `npm install /path/to/tarball`.
3. Inspect `npm pack --dry-run --workspace docusaurus-theme-quiet` for unintended files.
4. Review peer ranges against the Docusaurus versions actually tested.
5. Ask a maintainer to approve publication. No workflow publishes automatically.
6. Run `npm publish --workspace docusaurus-theme-quiet --access public` using the maintainer's npm authentication.

The theme has no build step. Docusaurus compiles its theme JSX. Keep package entry points, public components and CSS documented.
