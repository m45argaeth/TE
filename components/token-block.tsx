"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import type { Token } from "@/lib/tokenizer"
import { renderTokenText } from "@/lib/tokenizer"
import { colorForToken } from "@/lib/token-colors"

interface TokenBlockProps {
	token: Token
	active?: boolean
	animate?: boolean
	onSelect?: (token: Token) => void
}

export function TokenBlock({
	token,
	active,
	animate,
	onSelect,
}: TokenBlockProps) {
	const color = colorForToken(token)
	const label = renderTokenText(token.text)

	return (
		<button
			type="button"
			onClick={() => onSelect?.(token)}
			style={animate ? { animationDelay: `${token.index * 35}ms` } : undefined}
			className={cn(
				"group relative inline-flex cursor-pointer select-none items-center rounded-lg border px-2.5 py-1.5 font-mono text-sm leading-none transition-all duration-200",
				"hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
				color.className,
				animate && "animate-token-pop",
				active &&
					"ring-2 ring-foreground ring-offset-2 ring-offset-background -translate-y-0.5 shadow-md",
			)}
			title={`Token #${token.index + 1}`}
		>
			<span className="whitespace-pre">{label}</span>
		</button>
	)
}
