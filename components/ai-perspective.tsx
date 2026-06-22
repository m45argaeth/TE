"use client"

import { ArrowDown, Brain, Cpu, Sparkles, Type } from "lucide-react"

import type { Token } from "@/lib/tokenizer"
import { Card, CardContent } from "@/components/ui/card"
import { colorForToken } from "@/lib/token-colors"
import { useI18n } from "@/lib/i18n"

interface AiPerspectiveProps {
	text: string
	tokens: Token[]
}

const STEP_ICONS = [Type, Sparkles, Cpu, Brain]

export function AiPerspective({ text, tokens }: AiPerspectiveProps) {
	const { t } = useI18n()
	const preview = tokens.slice(0, 8)
	const steps = t.aiPerspective.steps.map((step, i) => ({
		...step,
		icon: STEP_ICONS[i],
	}))

	return (
		<Card>
			<CardContent className="p-6 sm:p-8">
				<div className="grid gap-6 sm:grid-cols-2">
					<div className="rounded-xl border bg-muted/30 p-5">
						<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
							{t.aiPerspective.humansSee}
						</p>
						<p className="mt-3 text-lg leading-relaxed">
							{text.trim() ? text : t.aiPerspective.sentencePlaceholder}
						</p>
					</div>
					<div className="rounded-xl border bg-muted/30 p-5">
						<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
							{t.aiPerspective.aiSees}
						</p>
						<div className="mt-3 flex flex-wrap gap-1.5">
							{preview.length > 0 ? (
								<>
									{preview.map((token) => (
										<span
											key={token.index}
											className={`rounded-md border px-2 py-1 font-mono text-xs ${colorForToken(token).className}`}
										>
											{token.id}
										</span>
									))}
									{tokens.length > preview.length ? (
										<span className="rounded-md border border-dashed px-2 py-1 font-mono text-xs text-muted-foreground">
											+{tokens.length - preview.length}
										</span>
									) : null}
								</>
							) : (
								<p className="text-lg text-muted-foreground">
									{t.aiPerspective.tokensPlaceholder}
								</p>
							)}
						</div>
					</div>
				</div>

				<div className="mt-8">
					<div className="grid gap-3 sm:hidden">
						{steps.map((step, i) => (
							<div key={step.title}>
								<StepCard step={step} index={i} />
								{i < steps.length - 1 ? (
									<div className="flex justify-center py-1 text-muted-foreground">
										<ArrowDown className="h-4 w-4" />
									</div>
								) : null}
							</div>
						))}
					</div>
					<div className="hidden grid-cols-7 items-stretch gap-2 sm:grid">
						{steps.map((step, i) => (
							<div
								key={step.title}
								className={i < steps.length - 1 ? "contents" : ""}
							>
								<div className="col-span-1">
									<StepCard step={step} index={i} />
								</div>
								{i < steps.length - 1 ? (
									<div className="col-span-1 flex items-center justify-center text-muted-foreground">
										<span className="text-xl">→</span>
									</div>
								) : null}
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

function StepCard({
	step,
	index,
}: {
	step: { title: string; body: string; icon: typeof Type }
	index: number
}) {
	return (
		<div
			className="flex h-full animate-fade-up flex-col items-center rounded-xl border bg-background p-4 text-center"
			style={{ animationDelay: `${index * 90}ms` }}
		>
			<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
				<step.icon className="h-5 w-5" />
			</div>
			<p className="mt-3 text-sm font-medium">{step.title}</p>
			<p className="mt-1 text-xs leading-snug text-muted-foreground">
				{step.body}
			</p>
		</div>
	)
}
