import type { Metadata } from "next"

import { Playground } from "@/components/playground"

export const metadata: Metadata = {
	title: "Playground",
	description:
		"Paste any text and watch it split into tokens, with live stats, comparisons, and the AI's perspective.",
}

export default function PlaygroundPage() {
	return (
		<div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
			<div className="mx-auto mb-10 max-w-2xl text-center">
				<h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
					Playground
				</h1>
				<p className="mt-3 text-balance text-muted-foreground">
					Type or paste any text to see exactly how a language model would break
					it into tokens — instantly, and entirely in your browser.
				</p>
			</div>
			<Playground />
		</div>
	)
}
