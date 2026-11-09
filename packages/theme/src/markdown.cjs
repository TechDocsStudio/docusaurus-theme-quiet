const TurndownModule = require("turndown");
// Turndown exposes a default export in its browser entry and CommonJS in Node.
const TurndownService = TurndownModule.default || TurndownModule;
const { gfm } = require("turndown-plugin-gfm");

// Library conversion plus small adaptations for documentation chrome and code lines.
module.exports = function toMarkdown(input, { url } = {}) {
  const service = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });
  service.use(gfm);
  service.addRule("documentCode", {
    filter: "pre",
    replacement(_content, node) {
      const code = node.querySelector("code") || node;
      const lines = code.querySelectorAll('[class*="codeLineContent"]');
      const text = lines.length
        ? [...lines].map((line) => line.textContent).join("\n")
        : code.textContent;
      const language =
        `${node.className} ${code.className}`.match(/language-([\w-]+)/)?.[1] ||
        "";
      const fence = "`".repeat(
        Math.max(
          3,
          ...[...text.matchAll(/`+/g)].map((match) => match[0].length + 1),
        ),
      );
      return `\n\n${fence}${language}\n${text.replace(/\n$/, "")}\n${fence}\n\n`;
    },
  });
  function absolute(value) {
    try {
      return url ? new URL(value, url).href : value;
    } catch {
      return value;
    }
  }
  service.addRule("documentLinks", {
    filter: (node) => node.nodeName === "A" && node.hasAttribute("href"),
    replacement(content, node) {
      return `[${content}](${absolute(node.getAttribute("href")).replace(/[()]/g, "\\$&")})`;
    },
  });
  service.addRule("documentImages", {
    filter: "img",
    replacement(_content, node) {
      return `![${node.getAttribute("alt") || ""}](${absolute(node.getAttribute("src") || "")})`;
    },
  });
  service.addRule("documentChrome", {
    filter: (node) =>
      [
        "BUTTON",
        "NAV",
        "SVG",
        "SCRIPT",
        "STYLE",
        "INPUT",
        "SELECT",
        "TEXTAREA",
      ].includes(node.nodeName.toUpperCase()) ||
      node.getAttribute("aria-hidden") === "true" ||
      node.classList?.contains("hash-link") ||
      node.classList?.contains("feedback-widget"),
    replacement: () => "",
  });
  return service.turndown(input).trim();
};
