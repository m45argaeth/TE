"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Shuffle, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TokenBlock } from "@/components/token-block"
import { tokenize } from "@/lib/tokenizer"
import { encodeShareText } from "@/lib/share"

const HERO_SENTENCES = [
	"I love fried rice.",
	"Humans read words.",
	"AI reads tokens.",
	"ChatGPT is amazing.",
]

export function Hero() {
	const router = useRouter()
	const [sentenceIndex, setSentenceIndex] = React.useState(0)
	const [phase, setPhase] = React.useState<"text" | "tokens">("text")

	React.useEffect(() => {
		const toTokens = setTimeout(() => setPhase("tokens"), 1400)
		const next = setTimeout(() => {
			setPhase("text")
			setSentenceIndex((i) => (i + 1) % HERO_SENTENCES.length)
		}, 4200)
		return () => {
			clearTimeout(toTokens)
			clearTimeout(next)
		}
	}, [sentenceIndex])

	const sentence = HERO_SENTENCES[sentenceIndex]
	const tokens = React.useMemo(() => tokenize(sentence), [sentence])

	const goRandom = () => {
		const pick = HERO_SENTENCES[Math.floor(Math.random() * HERO_SENTENCES.length)]
		router.push(`/playground#${encodeShareText(pick)}`)
	}

	const subtitleStyle: React.CSSProperties = { animationDelay: "80ms" }
	const buttonsStyle: React.CSSProperties = { animationDelay: "160ms" }
	const visualStyle: React.CSSProperties = { animationDelay: "240ms" }

	return (
		<section className="relative overflow-hidden">
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute left-1/2 top-[-10%] h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-sky-200/40 via-violet-200/30 to-rose-200/40 blur-3xl dark:from-sky-500/10 dark:via-violet-500/10 dark:to-rose-500/10" />
			</div>
			<div className="mx-auto max-w-6xl px-6 pb-10 pt-16 sm:pt-28">
				<div className="mx-auto flex max-w-3xl flex-col items-center text-center">
					<Badge
						variant="muted"
						className="mb-6 animate-fade-in gap-1.5 px-3 py-1 text-xs"
					>
						<Sparkles className="h-3.5 w-3.5" />
						Humans read words. AI reads tokens.
					</Badge>
					<h1 className="animate-fade-up text-balance text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
						Token Explorer
					</h1>
					<p
						className="mt-6 max-w-xl animate-fade-up text-balance text-lg text-muted-foreground sm:text-xl"
						style={subtitleStyle}
					>
						See how AI breaks your sentences into tokens before generating a
						response.
					</p>
					<div
						className="mt-9 flex w-full animate-fade-up flex-col items-center gap-3 sm:w-auto sm:flex-row"
						style={buttonsStyle}
					>
						<Button asChild size="lg" className="w-full sm:w-auto">
							<Link href="/playground">
								Explore Tokens
								<ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
						<Button size="lg" variant="outline" onClick={goRandom} className="w-full sm:w-auto">
							<Shuffle className="h-4 w-4" />
							Random Example
						</Button>
					</div>
				</div>

				<div
					className="mx-auto mt-12 max-w-3xl animate-fade-up sm:mt-16"
					style={visualStyle}
				>
					<div className="rounded-3xl border bg-card/70 p-6 shadow-sm backdrop-blur-sm sm:p-12">
						<div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-muted-foreground">
							<span>Humans see</span>
							<span>AI sees</span>
						</div>
						<div className="mt-5 min-h-[120px]">
							{phase === "text" ? (
								<p
									key={`text-${sentenceIndex}`}
									className="animate-fade-in text-center font-mono text-2xl sm:text-3xl"
								>
									{sentence}
								</p>
							) : (
								<div
									key={`tokens-${sentenceIndex}`}
									className="flex flex-wrap items-center justify-center gap-2"
								>
									{tokens.map((token) => (
										<TokenBlock key={token.index} token={token} animate />
									))}
								</div>
							)}
						</div>
						<p className="mt-5 text-center text-sm text-muted-foreground">
							{tokens.length} tokens · {sentence.length} characters
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
