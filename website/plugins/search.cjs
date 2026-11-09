// The documentation site's small title/description index. Not part of the theme.
module.exports = function quietDocsSearch() {
  return {
    name: "quiet-docs-search",
    allContentLoaded({ allContent, actions }) {
      const docs = Object.values(
        allContent["docusaurus-plugin-content-docs"] || {},
      )
        .flatMap((content) =>
          content.loadedVersions.flatMap((version) => version.docs),
        )
        .filter((doc) => !doc.unlisted)
        .map(({ title, description, permalink }) => ({
          title,
          description,
          permalink,
        }));
      actions.setGlobalData({ docs });
    },
  };
};
