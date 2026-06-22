"use client"

import * as React from "react"
import Link from "next/link"
import { Boxes } from "lucide-react"

import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"

export function SiteHeader() {
	const [scrolled, setScrolled] = React.useState(false)

	React.useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8)
		onScroll()
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	return (
		<header
			className={cn(
				"sticky top-0 z-40 w-full border-b border-transparent transition-all duration-300",
				scrolled &&
					"border-border/60 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60",
			)}
		>
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
				<Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
					<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
						<Boxes className="h-[18px] w-[18px]" />
					</span>
					<span className="text-sm sm:text-base">Token Explorer</span>
				</Link>
				<nav className="flex items-center gap-1 sm:gap-2">
					<LanguageToggle />
					<ThemeToggle />
				</nav>
			</div>
		</header>
	)
}
