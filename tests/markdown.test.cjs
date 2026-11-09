const assert = require("node:assert/strict");
const { test } = require("node:test");
const toMarkdown = require("../packages/theme/src/markdown.cjs");

test("article conversion preserves headings, nested lists, links and tables", () => {
  const markdown = toMarkdown(
    '<h1>Guide<a class="hash-link" href="#guide">#</a></h1><p>Read <a href="../install">installation</a>.</p><ul><li>First<ul><li>Nested</li></ul></li></ul><table><thead><tr><th>Name</th><th>Type</th></tr></thead><tbody><tr><td>project</td><td>string</td></tr></tbody></table>',
    { url: "https://docs.example.com/guides/start" },
  );
  assert.match(markdown, /^# Guide/);
  assert.match(
    markdown,
    /\[installation\]\(https:\/\/docs.example.com\/install\)/,
  );
  assert.match(markdown, /- +First\n +- +Nested/);
  assert.match(markdown, /\| Name \| Type \|/);
  assert.match(markdown, /\| project \| string \|/);
  assert.doesNotMatch(markdown, /\[?#\]?\]\(/);
});
test("code lines preserve newlines and use a fence longer than code backticks", () => {
  const markdown = toMarkdown(
    '<pre class="language-js"><code><span class="codeLineContent">const fence = "```";</span><span class="codeLineContent">run();</span></code></pre>',
  );
  assert.equal(markdown, '````js\nconst fence = "```";\nrun();\n````');
});
test("document UI and input values never become copied page content", () => {
  const markdown = toMarkdown(
    '<p>Keep this.</p><button>Copy</button><nav>Next</nav><svg><title>Icon</title></svg><input value="private draft"><textarea>private draft</textarea><span aria-hidden="true">Hidden</span><div class="feedback-widget">Was this helpful?</div>',
  );
  assert.equal(markdown, "Keep this.");
});
