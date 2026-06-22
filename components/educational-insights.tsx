"use client"

import { Lightbulb } from "lucide-react"

import type { TextStats } from "@/lib/tokenizer"
import { Card, CardContent } from "@/components/ui/card"

interface EducationalInsightsProps {
	stats: TextStats
}

export function EducationalInsights({ stats }: EducationalInsightsProps) {
	const insights = buildInsights(stats)

	return (
		<Card className="border-border/70 bg-gradient-to-br from-muted/40 to-background">
			<CardContent className="p-6 sm:p-8">
				<div className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
						<Lightbulb className="h-4 w-4" />
					</div>
					<h3 className="font-medium">Educational insights</h3>
				</div>
				<ul className="mt-5 space-y-3">
					{insights.map((insight, i) => (
						<li
							key={i}
							className="flex animate-fade-up gap-3 text-sm leading-relaxed text-muted-foreground"
							style={{ animationDelay: `${i * 70}ms` }}
						>
							<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
							<span>{insight}</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}

function buildInsights(stats: TextStats): string[] {
	const out: string[] = []
	if (stats.tokens === 0) {
		return [
			"Type or paste some text to see how a language model would break it into tokens.",
			"LLMs process tokens, not words — the same idea can cost very different numbers of tokens.",
		]
	}
	out.push(
		`This text contains ${stats.tokens.toLocaleString()} token${stats.tokens === 1 ? "" : "s"} across ${stats.words.toLocaleString()} word${stats.words === 1 ? "" : "s"}.`,
	)
	out.push(
		"LLMs process tokens, not words. The number of tokens influences processing cost, context length, and memory usage.",
	)
	if (stats.words > 0) {
		const ratio = stats.tokens / stats.words
		if (ratio > 1.5) {
			out.push(
				`On average each word here uses ~${ratio.toFixed(2)} tokens — a sign of longer or rarer words that the tokenizer splits into pieces.`,
			)
		} else {
			out.push(
				`On average each word here uses ~${ratio.toFixed(2)} tokens — common words often map to a single token.`,
			)
		}
	}
	out.push(
		`At roughly ${stats.tokenDensity.toFixed(1)} characters per token, a model's limited context window fills up faster with dense or unusual text.`,
	)
	return out
}
