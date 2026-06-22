"use client"

import * as React from "react"
import { PartyPopper } from "lucide-react"

import { tokenize } from "@/lib/tokenizer"
import { FUN_EXAMPLES } from "@/lib/examples"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TokenBlock } from "@/components/token-block"

export function FunMode() {
	return (
		<Card>
			<CardContent className="p-6 sm:p-8">
				<div className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
						<PartyPopper className="h-4 w-4" />
					</div>
					<h3 className="font-medium">Token surprises</h3>
				</div>
				<p className="mt-2 text-sm text-muted-foreground">
					Common words may use fewer tokens than rare ones. Here are a few that
					often surprise people.
				</p>
				<div className="mt-6 grid gap-4 sm:grid-cols-2">
					{FUN_EXAMPLES.map((example, i) => (
						<FunCard key={example.text} example={example} index={i} />
					))}
				</div>
			</CardContent>
		</Card>
	)
}

function FunCard({
	example,
	index,
}: {
	example: (typeof FUN_EXAMPLES)[number]
	index: number
}) {
	const tokens = React.useMemo(() => tokenize(example.text), [example.text])
	const tokenCount = tokens.filter((t) => t.kind !== "space").length

	return (
		<div
			className="animate-fade-up rounded-xl border bg-muted/20 p-5"
			style={{ animationDelay: `${index * 70}ms` }}
		>
			<div className="flex items-center justify-between">
				<Badge variant="muted">{example.label}</Badge>
				<span className="text-xs text-muted-foreground">
					{tokenCount} token{tokenCount === 1 ? "" : "s"}
				</span>
			</div>
			<p className="mt-3 font-mono text-lg">{example.text}</p>
			<div className="mt-3 flex flex-wrap gap-1.5">
				{tokens.map((token) => (
					<TokenBlock key={token.index} token={token} />
				))}
			</div>
			<p className="mt-3 text-xs leading-relaxed text-muted-foreground">
				{example.note}
			</p>
		</div>
	)
}
