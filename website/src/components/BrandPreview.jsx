import React, { useEffect, useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import {
  palettes,
  paletteEvent,
  restorePalette,
  savePalette,
} from "../brand.mjs";

export default function BrandPreview() {
  const [palette, setPalette] = useState(palettes[0]);
  useEffect(() => {
    const stored = restorePalette();
    if (stored) setPalette(stored);
    const sync = (event) => setPalette(event.detail);
    window.addEventListener(paletteEvent, sync);
    return () => window.removeEventListener(paletteEvent, sync);
  }, []);
  function change(next) {
    setPalette(next);
    savePalette(next);
  }
  const code = `themes: [\n  ["docusaurus-theme-quiet", {\n    accentColor: "${palette.accentColor}",\n    accentColorDark: "${palette.accentColorDark}",\n  }],\n],`;
  return (
    <div className="quiet-brand-preview">
      <div
        className="quiet-palette-options"
        role="group"
        aria-label="Color palette"
      >
        {palettes.map((preset) => (
          <button
            key={preset.name}
            type="button"
            aria-pressed={
              palette.accentColor === preset.accentColor &&
              palette.accentColorDark === preset.accentColorDark
            }
            onClick={() => change(preset)}
          >
            <span
              className="quiet-palette-dot"
              style={{ background: preset.accentColor }}
              aria-hidden="true"
            />
            {preset.name}
          </button>
        ))}
      </div>
      <div className="quiet-palette-custom">
        <label>
          Light accent
          <input
            type="color"
            value={palette.accentColor}
            onChange={(event) =>
              change({ ...palette, accentColor: event.target.value })
            }
          />
          <code>{palette.accentColor}</code>
        </label>
        <label>
          Dark accent
          <input
            type="color"
            value={palette.accentColorDark}
            onChange={(event) =>
              change({ ...palette, accentColorDark: event.target.value })
            }
          />
          <code>{palette.accentColorDark}</code>
        </label>
      </div>
      <CodeBlock language="js" title="docusaurus.config.js">
        {code}
      </CodeBlock>
    </div>
  );
}
