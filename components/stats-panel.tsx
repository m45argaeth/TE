"use client"

import {
	Coins,
	Hash,
	LetterText,
	Clock,
	Type,
	Gauge,
} from "lucide-react"

import { formatCost, type TextStats } from "@/lib/tokenizer"
import { useI18n, formatReadingTime } from "@/lib/i18n"
import { Card } from "@/components/ui/card"

interface StatsPanelProps {
	stats: TextStats
}

export function StatsPanel({ stats }: StatsPanelProps) {
	const { t, locale } = useI18n()

	const items = [
		{
			icon: LetterText,
			label: t.stats.characters,
			value: stats.characters.toLocaleString(),
		},
		{
			icon: Type,
			label: t.stats.words,
			value: stats.words.toLocaleString(),
		},
		{
			icon: Hash,
			label: t.stats.tokens,
			value: stats.tokens.toLocaleString(),
			highlight: true,
		},
		{
			icon: Coins,
			label: t.stats.estCost,
			value: formatCost(stats.estimatedCost),
			sub: t.stats.simulated,
		},
		{
			icon: Clock,
			label: t.stats.readingTime,
			value: formatReadingTime(stats.readingTimeSeconds, locale),
		},
		{
			icon: Gauge,
			label: t.stats.tokenDensity,
			value:
				stats.tokens > 0
					? `1 / ${stats.tokenDensity.toFixed(1)} ${t.stats.chars}`
					: "\u2014",
		},
	]

	return (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
			{items.map((item) => (
				<Card
					key={item.label}
					className={`p-4 transition-colors ${
						item.highlight ? "bg-foreground text-background" : ""
					}`}
				>
					<div className="flex items-center gap-2">
						<item.icon
							className={`h-4 w-4 ${
								item.highlight
									? "text-background/70"
								: "text-muted-foreground"
							}`}
						/>
						<span
							className={`text-xs font-medium ${
								item.highlight
									? "text-background/70"
								: "text-muted-foreground"
							}`}
						>
							{item.label}
						</span>
					</div>
					<div className="mt-2 flex items-baseline gap-1.5">
						<span className="text-xl font-semibold tracking-tight">
							{item.value}
						</span>
						{item.sub ? (
							<span
								className={`text-[10px] uppercase tracking-wide ${
									item.highlight ? "text-background/60" : "text-muted-foreground"
								}`}
							>
								{item.sub}
							</span>
						) : null}
					</div>
				</Card>
			))}
		</div>
	)
}
