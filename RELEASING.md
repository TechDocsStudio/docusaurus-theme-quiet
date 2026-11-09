# Publish Quiet

The first release is `docusaurus-theme-quiet@0.1.0`. Publication is manual.

## Verify

Use Node 24 and npm 11 from the repository root:

```sh
npm ci
npm run release:check
```

Review `.artifacts/docusaurus-theme-quiet-0.1.0.tgz`. Test that exact tarball in a Docusaurus consumer. Confirm the package includes only the theme, public entry points, README and licenses. Website assets, widget project IDs, credentials and consumer fixtures must remain outside it.

## Publish

Confirm npm access to the package, then authenticate as its maintainer:

```sh
npm login
npm publish --workspace docusaurus-theme-quiet --access public
npm view docusaurus-theme-quiet@0.1.0 version
```

For a first release, remove pending-publication notices from the README and installation guide after publishing. Tag the released commit. Update consumer sites from any vendored tarball to the registry version:

```sh
npm install docusaurus-theme-quiet@0.1.0
```

## Later releases

Update `packages/theme/package.json`, its workspace entry in `package-lock.json`, and `CHANGELOG.md`. Repeat the verification and publish the new version. No workflow publishes automatically.
