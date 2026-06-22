import type { Token } from "./tokenizer"
import { TOKEN_PALETTE } from "./token-colors"

/**
 * Render tokens to a PNG using a canvas. Dependency-free so it works offline
 * and never taints the canvas. Returns a data URL.
 */
export function exportTokensToPng(
	tokens: Token[],
	options: { title?: string; subtitle?: string } = {},
): string | null {
	if (typeof document === "undefined") return null

	const scale = 2
	const padding = 48
	const maxWidth = 920
	const gapX = 10
	const gapY = 14
	const blockPadX = 16
	const blockHeight = 46
	const fontSize = 20
	const font = `600 ${fontSize}px ui-monospace, "SF Mono", Menlo, monospace`

	const measureCanvas = document.createElement("canvas")
	const measureCtx = measureCanvas.getContext("2d")
	if (!measureCtx) return null
	measureCtx.font = font

	const innerWidth = maxWidth - padding * 2
	const blocks = tokens
		.filter((t) => t.kind !== "space")
		.map((token) => {
			const label = token.text.replace(/ /g, "\u00b7")
			const textWidth = measureCtx.measureText(label).width
			return { token, label, width: Math.ceil(textWidth) + blockPadX * 2 }
		})

	// Lay out blocks into rows.
	const rows: { label: string; width: number; colorIndex: number }[][] = [[]]
	let x = 0
	for (const block of blocks) {
		if (x + block.width > innerWidth && rows[rows.length - 1].length > 0) {
			rows.push([])
			x = 0
		}
		rows[rows.length - 1].push({
			label: block.label,
			width: block.width,
			colorIndex: block.token.index % TOKEN_PALETTE.length,
		})
		x += block.width + gapX
	}

	const headerHeight = 96
	const footerHeight = 56
	const gridHeight = rows.length * blockHeight + (rows.length - 1) * gapY
	const height = padding * 2 + headerHeight + gridHeight + footerHeight
	const width = maxWidth

	const canvas = document.createElement("canvas")
	canvas.width = width * scale
	canvas.height = height * scale
	const ctx = canvas.getContext("2d")
	if (!ctx) return null
	ctx.scale(scale, scale)

	// Background.
	ctx.fillStyle = "#ffffff"
	ctx.fillRect(0, 0, width, height)

	// Header.
	ctx.fillStyle = "#0a0a0a"
	ctx.font = `700 30px ui-sans-serif, system-ui, -apple-system, sans-serif`
	ctx.textBaseline = "top"
	ctx.fillText(options.title || "Token Explorer", padding, padding)
	ctx.fillStyle = "#71717a"
	ctx.font = `400 16px ui-sans-serif, system-ui, -apple-system, sans-serif`
	ctx.fillText(
		options.subtitle || "Humans read words. AI reads tokens.",
		padding,
		padding + 42,
	)

	// Token blocks.
	let rowY = padding + headerHeight
	ctx.font = font
	ctx.textBaseline = "middle"
	for (const row of rows) {
		let rowX = padding
		for (const cell of row) {
			const color = TOKEN_PALETTE[cell.colorIndex]
			roundRect(ctx, rowX, rowY, cell.width, blockHeight, 12)
			ctx.fillStyle = color.hex
			ctx.fill()
			ctx.fillStyle = color.textHex
			ctx.fillText(cell.label, rowX + blockPadX, rowY + blockHeight / 2 + 1)
			rowX += cell.width + gapX
		}
		rowY += blockHeight + gapY
	}

	// Footer.
	ctx.fillStyle = "#a1a1aa"
	ctx.font = `500 14px ui-sans-serif, system-ui, -apple-system, sans-serif`
	ctx.textBaseline = "alphabetic"
	ctx.fillText(
		`${blocks.length} tokens · generated with Token Explorer`,
		padding,
		height - padding,
	)

	return canvas.toDataURL("image/png")
}

function roundRect(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	w: number,
	h: number,
	r: number,
) {
	const radius = Math.min(r, w / 2, h / 2)
	ctx.beginPath()
	ctx.moveTo(x + radius, y)
	ctx.arcTo(x + w, y, x + w, y + h, radius)
	ctx.arcTo(x + w, y + h, x, y + h, radius)
	ctx.arcTo(x, y + h, x, y, radius)
	ctx.arcTo(x, y, x + w, y, radius)
	ctx.closePath()
}

export function downloadDataUrl(dataUrl: string, filename: string): void {
	const link = document.createElement("a")
	link.href = dataUrl
	link.download = filename
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}
