import { restorePalette } from "./brand.mjs";
restorePalette();
export function onRouteDidUpdate() {
  restorePalette();
}
