"use client"

import { X } from "lucide-react"

import type { Token } from "@/lib/tokenizer"
import { renderTokenText } from "@/lib/tokenizer"
import { colorForToken } from "@/lib/token-colors"
import { useI18n } from "@/lib/i18n"
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
	const { t } = useI18n()

	if (!token) {
		return (
			<Card className="border-dashed bg-muted/30">
				<CardContent className="flex min-h-[180px] flex-col items-center justify-center p-6 text-center">
					<p className="text-sm text-muted-foreground">
						{t.tokenDetail.empty}
					</p>
				</CardContent>
			</Card>
		)
	}

	const color = colorForToken(token)
	const display = renderTokenText(token.text)
	const kindLabel = t.tokenDetail.kinds[token.kind]

	return (
		<Card className="animate-fade-in">
			<CardContent className="p-6">
				<div className="flex items-start justify-between">
					<div className="space-y-1">
						<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
							{t.tokenDetail.tokenNumber}{token.index + 1}
						</p>
						<div
							className={`inline-flex items-center rounded-lg border px-3 py-1.5 font-mono text-base ${color.className}`}
						>
							<span className="whitespace-pre">{display}</span>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Badge variant="muted" className="capitalize">
							{kindLabel}
						</Badge>
						{onClose ? (
							<button
								type="button"
								onClick={onClose}
								aria-label={t.tokenDetail.close}
								className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
							>
								<X className="h-4 w-4" />
							</button>
						) : null}
					</div>
				</div>
				<div className="mt-4 divide-y divide-border">
					<Row label={t.tokenDetail.rawToken} value={`"${token.text}"`} />
					<Row label={t.tokenDetail.characters} value={token.text.length} />
					<Row
						label={t.tokenDetail.estTokenId}
						value={token.id.toLocaleString()}
					/>
					<Row label={t.tokenDetail.bytes} value={token.bytes} />
				</div>
				<p className="mt-4 text-xs text-muted-foreground">
					{t.tokenDetail.note}
				</p>
			</CardContent>
		</Card>
	)
}
