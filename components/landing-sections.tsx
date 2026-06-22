import Link from "next/link"
import { ArrowRight, Binary, Eye, Gauge, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const FEATURES = [
	{
		icon: Binary,
		title: "Live tokenization",
		body: "Watch any sentence break into colorful token blocks. Hover and click to inspect each token's id, characters, and bytes.",
	},
	{
		icon: Gauge,
		title: "Instant stats",
		body: "Characters, words, tokens, estimated cost, reading time, and token density — updated as you type.",
	},
	{
		icon: Eye,
		title: "The AI's perspective",
		body: "See the journey from sentence to tokens to embeddings to prediction, the way a model actually reads.",
	},
	{
		icon: Sparkles,
		title: "Surprising comparisons",
		body: "Compare short vs long words and discover why 'strawberry' can cost more tokens than you'd expect.",
	},
]

export function LandingSections() {
	return (
		<>
			<section className="mx-auto max-w-6xl px-6 py-20">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
						A playground for how machines read
					</h2>
					<p className="mt-4 text-balance text-muted-foreground">
						Tokens are the atoms of language models. Token Explorer makes them
						visible, tangible, and a little bit fun.
					</p>
				</div>
				<div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{FEATURES.map((feature) => (
						<Card
							key={feature.title}
							className="group border-border/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
						>
							<CardContent className="p-6">
								<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background">
									<feature.icon className="h-5 w-5" />
								</div>
								<h3 className="mt-5 font-medium">{feature.title}</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
									{feature.body}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-6 pb-24">
				<div className="relative overflow-hidden rounded-3xl border bg-foreground px-8 py-16 text-background sm:px-16">
					<div className="pointer-events-none absolute inset-0 opacity-40">
						<div className="absolute right-[-10%] top-[-30%] h-72 w-72 rounded-full bg-gradient-to-br from-sky-400 to-violet-500 blur-3xl" />
					</div>
					<div className="relative mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
							Ready to see your words as tokens?
						</h2>
						<p className="mt-4 text-background/70">
							Paste a sentence, an essay, or an emoji. The playground does the
							rest — instantly and entirely in your browser.
						</p>
						<div className="mt-8 flex justify-center">
							<Button asChild size="lg" variant="secondary">
								<Link href="/playground">
									Open the playground
									<ArrowRight className="h-4 w-4" />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
