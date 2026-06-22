import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { I18nProvider } from "@/lib/i18n"

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
		default: "Token Explorer — Manusia membaca kata. AI membaca token.",
		template: "%s · Token Explorer",
	},
	description:
		"Playground edukasi yang membantumu memahami cara Large Language Model memproses teks menggunakan token. Lihat kalimatmu terpecah menjadi token secara real-time.",
	keywords: [
		"token",
		"tokenizer",
		"LLM",
		"AI",
		"GPT",
		"machine learning",
		"edukasi",
	],
	authors: [{ name: "Token Explorer" }],
	openGraph: {
		title: "Token Explorer",
		description:
			"Lihat bagaimana AI memecah kalimatmu menjadi token sebelum menghasilkan respons.",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Token Explorer",
		description:
			"Lihat bagaimana AI memecah kalimatmu menjadi token sebelum menghasilkan respons.",
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
		<html lang="id" suppressHydrationWarning>
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
					<I18nProvider>
						<TooltipProvider delayDuration={120}>
							<div className="relative flex min-h-screen flex-col">
								<SiteHeader />
								<main className="flex-1">{children}</main>
								<SiteFooter />
							</div>
						</TooltipProvider>
					</I18nProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
