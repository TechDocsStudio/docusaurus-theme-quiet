import type { LoadContext, Plugin } from "@docusaurus/types";

export type ActionIcon =
  | false
  | "biel"
  | "sparkles"
  | "bot"
  | "search"
  | "message-circle"
  | "copy"
  | "link"
  | "external-link"
  | "file"
  | "terminal"
  | { src: string };
export interface Action {
  label?: string;
  url?: string;
  copy?: string;
  selector?: string;
  icon?: ActionIcon;
}
export interface McpAction {
  url: string;
  name?: string;
  clients?: Record<string, false | { label?: string; command?: string }>;
}
export interface PageActions {
  [name: string]: false | Action | McpAction | undefined;
  copyPage?: false | (Action & { exclude?: string[] });
  askAi?: false | Action;
  viewSource?: false | (Action & { exclude?: string[] });
  editPage?: false | Action;
  mcp?: false | McpAction;
}

export interface Options {
  /** Light-mode accent. Six-digit hex color. Default: #191a18. */
  accentColor?: string;
  /** Dark-mode accent. Six-digit hex color. Default: #e9ecef. */
  accentColorDark?: string;
  /** Show the optional Powered by Quiet footer link. Default: true. */
  showCredit?: boolean;
  /** Page action defaults merge with this dictionary. False disables the module. */
  pageActions?: false | PageActions;
  /** Optional PushFeedback controls. The host loads its widget SDK. */
  feedback?:
    | false
    | {
        project?: string;
        label?: string;
        position?: "sidebar" | "footer";
        successMessage?: string;
      };
}

export default function quietTheme(
  context: LoadContext,
  options?: Options,
): Plugin;
