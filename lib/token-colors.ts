import type { Token } from "./tokenizer"

/**
 * A calm, premium palette used to color token blocks. Each token gets a
 * deterministic color based on its position so the layout looks stable
 * between renders while still being colorful.
 */
export interface TokenColor {
	/** Tailwind classes for the block background, text and border (light + dark). */
	className: string
	/** Solid hex used for the canvas PNG export (light mode). */
	hex: string
	/** Text hex for the canvas PNG export. */
	textHex: string
}

export const TOKEN_PALETTE: TokenColor[] = [
	{
		className:
			"bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/25",
		hex: "#ffe4e6",
		textHex: "#be123c",
	},
	{
		className:
			"bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/25",
		hex: "#fef3c7",
		textHex: "#b45309",
	},
	{
		className:
			"bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/25",
		hex: "#d1fae5",
		textHex: "#047857",
	},
	{
		className:
			"bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-500/25",
		hex: "#e0f2fe",
		textHex: "#0369a1",
	},
	{
		className:
			"bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-500/25",
		hex: "#ede9fe",
		textHex: "#6d28d9",
	},
	{
		className:
			"bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-500/15 dark:text-fuchsia-300 dark:border-fuchsia-500/25",
		hex: "#fae8ff",
		textHex: "#a21caf",
	},
	{
		className:
			"bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/25",
		hex: "#ccfbf1",
		textHex: "#0f766e",
	},
	{
		className:
			"bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-500/25",
		hex: "#e0e7ff",
		textHex: "#4338ca",
	},
]

const SPACE_COLOR: TokenColor = {
	className:
		"bg-muted text-muted-foreground border-border",
	hex: "#f4f4f5",
	textHex: "#71717a",
}

export function colorForToken(token: Token): TokenColor {
	if (token.kind === "space") return SPACE_COLOR
	return TOKEN_PALETTE[token.index % TOKEN_PALETTE.length]
}
