"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"

import { tokenize, getStats } from "@/lib/tokenizer"
import { useI18n, comparisonExplanation } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TokenBlock } from "@/components/token-block"

function Side({
	label,
	value,
	onChange,
	placeholder,
	wordsLabel,
	tokensLabel,
}: {
	label: string
	value: string
	onChange: (v: string) => void
	placeholder: string
	wordsLabel: string
	tokensLabel: string
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
					placeholder={placeholder}
				/>
			</div>
			<div className="flex flex-wrap gap-1.5">
				{tokens.map((token) => (
					<TokenBlock key={token.index} token={token} />
				))}
			</div>
			<div className="flex gap-6 text-sm">
				<div>
					<span className="text-muted-foreground">{wordsLabel} </span>
					<span className="font-semibold">{stats.words}</span>
				</div>
				<div>
					<span className="text-muted-foreground">{tokensLabel} </span>
					<span className="font-semibold">{stats.tokens}</span>
				</div>
			</div>
		</div>
	)
}

export function ComparisonMode() {
	const { t, locale } = useI18n()
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
					{t.comparison.presets.map((preset) => (
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
					<Side
						label={t.comparison.sentenceA}
						value={a}
						onChange={setA}
						placeholder={t.comparison.inputPlaceholder}
						wordsLabel={t.comparison.words}
						tokensLabel={t.comparison.tokens}
					/>
					<div className="hidden self-center text-muted-foreground md:block">
						<ArrowRight className="h-5 w-5" />
					</div>
					<Side
						label={t.comparison.sentenceB}
						value={b}
						onChange={setB}
						placeholder={t.comparison.inputPlaceholder}
						wordsLabel={t.comparison.words}
						tokensLabel={t.comparison.tokens}
					/>
				</div>
				<div className="mt-6 rounded-xl border bg-muted/30 p-4 text-sm leading-relaxed text-muted-foreground">
					<span className="font-medium text-foreground">{t.comparison.whyDifferent}</span>
					{comparisonExplanation(
						locale,
						a,
						b,
						wordsA,
						tokensA.length,
						wordsB,
						tokensB.length,
					)}
				</div>
			</CardContent>
		</Card>
	)
}
