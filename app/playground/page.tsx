import type { Metadata } from "next"

import { Playground } from "@/components/playground"
import { PlaygroundIntro } from "@/components/playground-intro"

export const metadata: Metadata = {
	title: "Playground",
	description:
		"Tempel teks apa pun dan saksikan ia terpecah menjadi token, dengan statistik langsung, perbandingan, dan sudut pandang AI.",
}

export default function PlaygroundPage() {
	return (
		<div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
			<PlaygroundIntro />
			<Playground />
		</div>
	)
}
