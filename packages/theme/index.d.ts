import type { LoadContext, Plugin } from "@docusaurus/types";

export interface Options {
  /** Light-mode accent. Six-digit hex color. Default: #191a18. */
  accentColor?: string;
  /** Dark-mode accent. Six-digit hex color. Default: #e9ecef. */
  accentColorDark?: string;
  /** Show the optional Powered by Quiet footer link. Default: true. */
  showCredit?: boolean;
}

export default function quietTheme(
  context: LoadContext,
  options?: Options,
): Plugin;
