"use client"

import { Lightbulb } from "lucide-react"

import type { TextStats } from "@/lib/tokenizer"
import { useI18n, buildInsights } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"

interface EducationalInsightsProps {
	stats: TextStats
}

export function EducationalInsights({ stats }: EducationalInsightsProps) {
	const { t, locale } = useI18n()
	const insights = buildInsights(stats, locale)

	return (
		<Card className="border-border/70 bg-gradient-to-br from-muted/40 to-background">
			<CardContent className="p-6 sm:p-8">
				<div className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
						<Lightbulb className="h-4 w-4" />
					</div>
					<h3 className="font-medium">{t.insights.heading}</h3>
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
