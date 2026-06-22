"use client"

import * as React from "react"
import { Play, RotateCcw } from "lucide-react"

import { tokenize } from "@/lib/tokenizer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TokenBlock } from "@/components/token-block"

const DEFAULT_TEXT = "ChatGPT is amazing"

interface TokenAnimationProps {
	text?: string
}

export function TokenAnimation({ text }: TokenAnimationProps) {
	const source = (text && text.trim()) || DEFAULT_TEXT
	const tokens = React.useMemo(() => tokenize(source), [source])

	const [phase, setPhase] = React.useState<"idle" | "text" | "tokens">("idle")
	const [runId, setRunId] = React.useState(0)

	const play = React.useCallback(() => {
		setRunId((id) => id + 1)
		setPhase("text")
	}, [])

	React.useEffect(() => {
		if (phase !== "text") return
		const t = setTimeout(() => setPhase("tokens"), 900)
		return () => clearTimeout(t)
	}, [phase, runId])

	// Auto-play once on mount.
	React.useEffect(() => {
		const t = setTimeout(() => play(), 350)
		return () => clearTimeout(t)
	}, [play])

	return (
		<Card>
			<CardContent className="p-6 sm:p-8">
				<div className="flex flex-col items-center">
					<div
						className={`font-mono text-2xl transition-all duration-500 sm:text-3xl ${
							phase === "tokens"
								? "-translate-y-1 opacity-40"
								: "opacity-100"
						}`}
					>
						{source}
					</div>
					<div
						className={`my-4 text-2xl text-muted-foreground transition-opacity duration-500 ${
							phase === "idle" ? "opacity-0" : "opacity-100"
						}`}
					>
						↓
					</div>
					<div className="flex min-h-[56px] flex-wrap items-center justify-center gap-2">
						{phase === "tokens"
							? tokens.map((token) => (
									<TokenBlock
										key={`${runId}-${token.index}`}
										token={token}
										animate
									/>
							  ))
							: null}
					</div>
				</div>
				<div className="mt-6 flex justify-center gap-2">
					<Button variant="outline" size="sm" onClick={play}>
						{phase === "idle" ? (
							<Play className="h-4 w-4" />
						) : (
							<RotateCcw className="h-4 w-4" />
						)}
						Replay animation
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
