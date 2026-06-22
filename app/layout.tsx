import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	display: "swap",
})

export const metadata: Metadata = {
	title: {
		default: "Token Explorer — Humans read words. AI reads tokens.",
		template: "%s · Token Explorer",
	},
	description:
		"An educational playground that helps you understand how Large Language Models process text using tokens. See your sentences split into tokens, in real time.",
	keywords: [
		"tokens",
		"tokenizer",
		"LLM",
		"AI",
		"GPT",
		"machine learning",
		"education",
	],
	authors: [{ name: "Token Explorer" }],
	openGraph: {
		title: "Token Explorer",
		description:
			"See how AI breaks your sentences into tokens before generating a response.",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Token Explorer",
		description:
			"See how AI breaks your sentences into tokens before generating a response.",
	},
}

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
	],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-background font-sans",
					inter.variable,
					jetbrainsMono.variable,
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem={false}
					disableTransitionOnChange
				>
					<TooltipProvider delayDuration={120}>
						<div className="relative flex min-h-screen flex-col">
							<SiteHeader />
							<main className="flex-1">{children}</main>
							<SiteFooter />
						</div>
					</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
