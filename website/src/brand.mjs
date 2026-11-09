export const paletteEvent = "quiet:palette";
export const storageKey = "quiet-brand-v1";
export const palettes = [
  { name: "Neutral", accentColor: "#191a18", accentColorDark: "#e9ecef" },
  { name: "Blue", accentColor: "#245da8", accentColorDark: "#93b4eb" },
  { name: "Forest", accentColor: "#23734a", accentColorDark: "#8bc9a5" },
  { name: "Violet", accentColor: "#7053a5", accentColorDark: "#c3adeb" },
];
export function validPalette(value) {
  return (
    !!value &&
    ["accentColor", "accentColorDark"].every(
      (key) =>
        typeof value[key] === "string" && /^#[0-9a-f]{6}$/i.test(value[key]),
    )
  );
}
export function readPalette(storage) {
  try {
    const value = JSON.parse(storage.getItem(storageKey));
    return validPalette(value) ? value : null;
  } catch {
    return null;
  }
}
export function applyPalette(value) {
  if (!validPalette(value) || typeof document === "undefined") return;
  document.documentElement.style.setProperty(
    "--quiet-accent-light",
    value.accentColor,
  );
  document.documentElement.style.setProperty(
    "--quiet-accent-dark",
    value.accentColorDark,
  );
}
export function restorePalette() {
  if (typeof window === "undefined") return null;
  try {
    const value = readPalette(window.localStorage);
    if (value) applyPalette(value);
    return value;
  } catch {
    return null;
  }
}
export function savePalette(value) {
  if (!validPalette(value)) return;
  applyPalette(value);
  window.dispatchEvent(new CustomEvent(paletteEvent, { detail: value }));
  try {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        accentColor: value.accentColor,
        accentColorDark: value.accentColorDark,
      }),
    );
  } catch {
    /* The preview still works without browser storage. */
  }
}
