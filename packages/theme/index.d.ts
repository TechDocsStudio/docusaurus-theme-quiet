import type { LoadContext, Plugin } from "@docusaurus/types";

export interface Options {
  /** Light-mode accent. Six-digit hex color. Default: #2563eb. */
  accentColor?: string;
  /** Dark-mode accent. Six-digit hex color. Default: #93b4ff. */
  accentColorDark?: string;
}

export default function quietTheme(
  context: LoadContext,
  options?: Options,
): Plugin;
