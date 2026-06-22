"use client"

import * as React from "react"
import { Check, Copy, Image as ImageIcon, Link2 } from "lucide-react"

import type { Token } from "@/lib/tokenizer"
import { Button } from "@/components/ui/button"
import { exportTokensToPng, downloadDataUrl } from "@/lib/export-image"
import { encodeShareText } from "@/lib/share"

interface ShareFeaturesProps {
	text: string
	tokens: Token[]
}

type Status = "idle" | "copied" | "linked"

export function ShareFeatures({ text, tokens }: ShareFeaturesProps) {
	const [status, setStatus] = React.useState<Status>("idle")
	const disabled = tokens.length === 0

	React.useEffect(() => {
		if (status === "idle") return
		const t = setTimeout(() => setStatus("idle"), 1800)
		return () => clearTimeout(t)
	}, [status])

	const copyResult = async () => {
		const summary = tokens.map((t) => `[${t.text}]`).join(" ")
		const payload = `Token Explorer\n\n"${text}"\n\n${tokens.length} tokens:\n${summary}`
		try {
			await navigator.clipboard.writeText(payload)
			setStatus("copied")
		} catch {
			/* clipboard unavailable */
		}
	}

	const shareLink = async () => {
		if (typeof window === "undefined") return
		const url = `${window.location.origin}/playground#${encodeShareText(text)}`
		try {
			await navigator.clipboard.writeText(url)
			setStatus("linked")
		} catch {
			window.location.hash = encodeShareText(text)
		}
	}

	const exportPng = () => {
		const dataUrl = exportTokensToPng(tokens, {
			title: "Token Explorer",
			subtitle: text.slice(0, 80) || "Humans read words. AI reads tokens.",
		})
		if (dataUrl) downloadDataUrl(dataUrl, "token-explorer.png")
	}

	return (
		<div className="flex flex-wrap gap-2">
			<Button variant="outline" size="sm" onClick={copyResult} disabled={disabled}>
				{status === "copied" ? (
					<Check className="h-4 w-4" />
				) : (
					<Copy className="h-4 w-4" />
				)}
				{status === "copied" ? "Copied" : "Copy result"}
			</Button>
			<Button variant="outline" size="sm" onClick={shareLink} disabled={disabled}>
				{status === "linked" ? (
					<Check className="h-4 w-4" />
				) : (
					<Link2 className="h-4 w-4" />
				)}
				{status === "linked" ? "Link copied" : "Share link"}
			</Button>
			<Button variant="outline" size="sm" onClick={exportPng} disabled={disabled}>
				<ImageIcon className="h-4 w-4" />
				Export as PNG
			</Button>
		</div>
	)
}
