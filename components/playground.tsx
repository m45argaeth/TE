"use client"

import * as React from "react"
import { Eraser, Shuffle, Sparkles, Wand2 } from "lucide-react"

import {
	tokenize,
	getStats,
	type Token,
} from "@/lib/tokenizer"
import { getRandomExample } from "@/lib/examples"
import { decodeShareText } from "@/lib/share"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TokenizationView } from "@/components/tokenization-view"
import { TokenDetail } from "@/components/token-detail"
import { StatsPanel } from "@/components/stats-panel"
import { AiPerspective } from "@/components/ai-perspective"
import { TokenAnimation } from "@/components/token-animation"
import { EducationalInsights } from "@/components/educational-insights"
import { ComparisonMode } from "@/components/comparison-mode"
import { FunMode } from "@/components/fun-mode"
import { ShareFeatures } from "@/components/share-features"

const DEFAULT_TEXT = "Saya suka nasi goreng."

export function Playground() {
	const [draft, setDraft] = React.useState(DEFAULT_TEXT)
	const [analyzed, setAnalyzed] = React.useState(DEFAULT_TEXT)
	const [loading, setLoading] = React.useState(false)
	const [animate, setAnimate] = React.useState(true)
	const [selected, setSelected] = React.useState<Token | null>(null)
	const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

	// Load shared text from the URL hash on mount.
	React.useEffect(() => {
		if (typeof window === "undefined") return
		const hash = window.location.hash.replace(/^#/, "")
		if (hash) {
			const decoded = decodeShareText(hash)
			if (decoded) {
				setDraft(decoded)
				setAnalyzed(decoded)
			}
		}
	}, [])

	React.useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
		}
	}, [])

	const tokens = React.useMemo(() => tokenize(analyzed), [analyzed])
	const stats = React.useMemo(
		() => getStats(analyzed, tokens),
		[analyzed, tokens],
	)

	const runAnalysis = React.useCallback(
		(value: string) => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
			setSelected(null)
			setLoading(true)
			setAnimate(true)
			timeoutRef.current = setTimeout(() => {
				setAnalyzed(value)
				setLoading(false)
			}, 450)
		},
		[],
	)

	const handleAnalyze = () => runAnalysis(draft)

	const handleRandom = () => {
		const example = getRandomExample(draft)
		setDraft(example)
		runAnalysis(example)
	}

	const handleClear = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current)
		setDraft("")
		setAnalyzed("")
		setSelected(null)
		setLoading(false)
	}

	const handleSelect = (token: Token) => {
		setSelected((current) =>
			current && current.index === token.index ? null : token,
		)
	}

	return (
		<div className="space-y-8">
			{/* Input */}
			<Card>
				<CardContent className="p-6 sm:p-8">
					<Textarea
						value={draft}
						onChange={(e) => setDraft(e.target.value)}
						onKeyDown={(e) => {
							if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
								e.preventDefault()
								handleAnalyze()
							}
						}}
						placeholder="Type or paste text here..."
						className="min-h-[150px] text-lg"
					/>
					<div className="mt-4 flex flex-wrap items-center justify-between gap-3">
						<div className="flex w-full flex-wrap gap-2 sm:w-auto">
							<Button onClick={handleAnalyze} className="flex-1 sm:flex-none">
								<Wand2 className="h-4 w-4" />
								Analyze
							</Button>
							<Button variant="outline" onClick={handleRandom} className="flex-1 sm:flex-none">
								<Shuffle className="h-4 w-4" />
								Random Example
							</Button>
							<Button variant="ghost" onClick={handleClear} className="flex-1 sm:flex-none">
								<Eraser className="h-4 w-4" />
								Clear
							</Button>
						</div>
						<span className="hidden text-xs text-muted-foreground sm:block">
							⌘ / Ctrl + Enter to analyze
						</span>
					</div>
				</CardContent>
			</Card>

			{/* Stats */}
			<StatsPanel stats={stats} />

			{/* Tokenization + detail */}
			<div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
				<Card>
					<CardContent className="p-6 sm:p-8">
						<div className="mb-4 flex items-center gap-2">
							<Sparkles className="h-4 w-4 text-muted-foreground" />
							<h2 className="text-sm font-medium">Tokenization view</h2>
						</div>
						<TokenizationView
							tokens={tokens}
							loading={loading}
							animate={animate}
							activeIndex={selected?.index ?? null}
							onSelect={handleSelect}
						/>
					</CardContent>
				</Card>
				<TokenDetail token={selected} onClose={() => setSelected(null)} />
			</div>

			{/* Share */}
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<h2 className="text-sm font-medium text-muted-foreground">
					Share your result
				</h2>
				<ShareFeatures text={analyzed} tokens={tokens} />
			</div>

			{/* Modes */}
			<Tabs defaultValue="perspective" className="w-full">
				<div className="-mx-4 flex justify-start overflow-x-auto px-4 pb-2 sm:mx-0 sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
					<TabsList className="flex-nowrap">
						<TabsTrigger value="perspective">AI perspective</TabsTrigger>
						<TabsTrigger value="animation">Animation</TabsTrigger>
						<TabsTrigger value="insights">Insights</TabsTrigger>
						<TabsTrigger value="comparison">Comparison</TabsTrigger>
						<TabsTrigger value="fun">Fun mode</TabsTrigger>
					</TabsList>
				</div>
				<TabsContent value="perspective" id="perspective">
					<div className="mb-4 text-center">
						<h2 className="text-2xl font-semibold tracking-tight">
							How AI sees this text
						</h2>
					</div>
					<AiPerspective text={analyzed} tokens={tokens} />
				</TabsContent>
				<TabsContent value="animation">
					<TokenAnimation text={analyzed} />
				</TabsContent>
				<TabsContent value="insights">
					<EducationalInsights stats={stats} />
				</TabsContent>
				<TabsContent value="comparison" id="comparison">
					<ComparisonMode />
				</TabsContent>
				<TabsContent value="fun" id="fun">
					<FunMode />
				</TabsContent>
			</Tabs>
		</div>
	)
}
