"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"

import { tokenize, getStats } from "@/lib/tokenizer"
import { COMPARISON_PRESETS } from "@/lib/examples"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TokenBlock } from "@/components/token-block"

function Side({ label, value, onChange }: {
	label: string
	value: string
	onChange: (v: string) => void
}) {
	const tokens = React.useMemo(() => tokenize(value), [value])
	const stats = React.useMemo(() => getStats(value, tokens), [value, tokens])

	return (
		<div className="flex-1 space-y-4">
			<div className="space-y-2">
				<label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
					{label}
				</label>
				<Input
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Type a word or sentence..."
				/>
			</div>
			<div className="flex flex-wrap gap-1.5">
				{tokens.map((token) => (
					<TokenBlock key={token.index} token={token} />
				))}
			</div>
			<div className="flex gap-6 text-sm">
				<div>
					<span className="text-muted-foreground">Words </span>
					<span className="font-semibold">{stats.words}</span>
				</div>
				<div>
					<span className="text-muted-foreground">Tokens </span>
					<span className="font-semibold">{stats.tokens}</span>
				</div>
			</div>
		</div>
	)
}

export function ComparisonMode() {
	const [a, setA] = React.useState("Hello")
	const [b, setB] = React.useState("Antidisestablishmentarianism")

	const tokensA = React.useMemo(() => tokenize(a), [a])
	const tokensB = React.useMemo(() => tokenize(b), [b])
	const wordsA = a.trim() ? a.trim().split(/\s+/).length : 0
	const wordsB = b.trim() ? b.trim().split(/\s+/).length : 0

	return (
		<Card>
			<CardContent className="p-6 sm:p-8">
				<div className="flex flex-wrap gap-2">
					{COMPARISON_PRESETS.map((preset) => (
						<Button
							key={preset.label}
							variant="outline"
							size="sm"
							onClick={() => {
								setA(preset.a)
								setB(preset.b)
							}}
						>
							{preset.label}
						</Button>
					))}
				</div>
				<div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start">
					<Side label="Sentence A" value={a} onChange={setA} />
					<div className="hidden self-center text-muted-foreground md:block">
						<ArrowRight className="h-5 w-5" />
					</div>
					<Side label="Sentence B" value={b} onChange={setB} />
				</div>
				<div className="mt-6 rounded-xl border bg-muted/30 p-4 text-sm leading-relaxed text-muted-foreground">
					<span className="font-medium text-foreground">Why the difference? </span>
					“{a || "A"}” uses {wordsA} word / {tokensA.length} token
					{tokensA.length === 1 ? "" : "s"}, while “{b || "B"}” uses {wordsB}{" "}
					word / {tokensB.length} token{tokensB.length === 1 ? "" : "s"}. Rare or
					long words aren’t in the model’s vocabulary as a single piece, so they
					get split into several sub-word tokens — even when they’re still just
					“one word” to a human.
				</div>
			</CardContent>
		</Card>
	)
}
