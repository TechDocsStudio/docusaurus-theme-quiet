// Override this small client-side helper using Docusaurus's normal theme mechanism.
export default async function getPageMarkdown({ element, url, markdownUrl }) {
  if (markdownUrl) {
    try {
      const response = await fetch(markdownUrl);
      if (
        response.ok &&
        !response.headers.get("content-type")?.includes("text/html")
      )
        return await response.text();
    } catch {
      /* An unavailable export falls back to the visible article. */
    }
  }
  if (!element) throw new Error("Document content not found");
  const { default: toMarkdown } = await import("../../../markdown.cjs");
  return toMarkdown(element, { url });
}
