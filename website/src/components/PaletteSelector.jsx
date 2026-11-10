import React, { useEffect, useState } from "react";
import {
  palettes,
  paletteEvent,
  restorePalette,
  savePalette,
} from "../brand.mjs";

// Demo-only control: never included in the published theme package.
export default function PaletteSelector({ mobile }) {
  const [palette, setPalette] = useState(palettes[0]);
  useEffect(() => {
    setPalette(restorePalette() || palettes[0]);
    const sync = (event) => setPalette(event.detail);
    window.addEventListener(paletteEvent, sync);
    return () => window.removeEventListener(paletteEvent, sync);
  }, []);
  if (mobile) return null;
  const index = palettes.findIndex(
    (item) =>
      item.accentColor === palette.accentColor &&
      item.accentColorDark === palette.accentColorDark,
  );
  const name = index < 0 ? "Custom" : palettes[index].name;
  const next = palettes[(index + 1) % palettes.length];
  return (
    <button
      type="button"
      className="quiet-navbar-palette"
      aria-label={`Change color palette (currently ${name}; next ${next.name})`}
      title={`Color palette: ${name}`}
      onClick={() => savePalette(next)}
    >
      <span
        className="quiet-palette-dot"
        style={{
          "--palette-light": palette.accentColor,
          "--palette-dark": palette.accentColorDark,
        }}
        aria-hidden="true"
      />
    </button>
  );
}
