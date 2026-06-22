"use client"

import { X } from "lucide-react"

import type { Token } from "@/lib/tokenizer"
import { renderTokenText } from "@/lib/tokenizer"
import { colorForToken } from "@/lib/token-colors"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TokenDetailProps {
	token: Token | null
	onClose?: () => void
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
	return (
		<div className="flex items-center justify-between gap-4 py-2.5">
			<span className="text-sm text-muted-foreground">{label}</span>
			<span className="font-mono text-sm font-medium">{value}</span>
		</div>
	)
}

export function TokenDetail({ token, onClose }: TokenDetailProps) {
	if (!token) {
		return (
			<Card className="border-dashed bg-muted/30">
				<CardContent className="flex min-h-[180px] flex-col items-center justify-center p-6 text-center">
					<p className="text-sm text-muted-foreground">
						Click any token to inspect its details.
					</p>
				</CardContent>
			</Card>
		)
	}

	const color = colorForToken(token)
	const display = renderTokenText(token.text)

	return (
		<Card className="animate-fade-in">
			<CardContent className="p-6">
				<div className="flex items-start justify-between">
					<div className="space-y-1">
						<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
							Token #{token.index + 1}
						</p>
						<div
							className={`inline-flex items-center rounded-lg border px-3 py-1.5 font-mono text-base ${color.className}`}
						>
							<span className="whitespace-pre">{display}</span>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Badge variant="muted" className="capitalize">
							{token.kind}
						</Badge>
						{onClose ? (
							<button
								type="button"
								onClick={onClose}
								aria-label="Close token details"
								className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
							>
								<X className="h-4 w-4" />
							</button>
						) : null}
					</div>
				</div>
				<div className="mt-4 divide-y divide-border">
					<Row label="Raw token" value={`"${token.text}"`} />
					<Row label="Characters" value={token.text.length} />
					<Row
						label="Estimated token ID"
						value={token.id.toLocaleString()}
					/>
					<Row label="Bytes (UTF-8)" value={token.bytes} />
				</div>
				<p className="mt-4 text-xs text-muted-foreground">
					Token ID is simulated for learning — a real model maps this token to
					a fixed integer in its vocabulary.
				</p>
			</CardContent>
		</Card>
	)
}
