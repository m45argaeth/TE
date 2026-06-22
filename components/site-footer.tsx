"use client"

import Link from "next/link"
import { Boxes } from "lucide-react"

import { useI18n } from "@/lib/i18n"

export function SiteFooter() {
	const { t } = useI18n()
	return (
		<footer className="border-t border-border/60 bg-muted/30">
			<div className="mx-auto max-w-6xl px-6 py-12 sm:py-14">
				<div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
					<div className="max-w-md space-y-3">
						<Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
							<span className="flex h-8 w-8 items-center justify-center rounded-xl bg-foreground text-background">
								<Boxes className="h-[18px] w-[18px]" />
							</span>
							<span>Token Explorer</span>
						</Link>
						<p className="text-sm leading-relaxed text-muted-foreground">
							{t.footer.tagline}
						</p>
					</div>
					<div className="flex flex-wrap gap-10 sm:gap-16">
						<div className="space-y-3">
							<p className="text-sm font-medium">{t.footer.exploreHeading}</p>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<Link href="/playground" className="transition-colors hover:text-foreground">
										{t.footer.playground}
									</Link>
								</li>
								<li>
									<Link href="/playground#comparison" className="transition-colors hover:text-foreground">
										{t.footer.comparison}
									</Link>
								</li>
								<li>
									<Link href="/playground#fun" className="transition-colors hover:text-foreground">
										{t.footer.tokenSurprises}
									</Link>
								</li>
							</ul>
						</div>
						<div className="space-y-3">
							<p className="text-sm font-medium">{t.footer.aboutHeading}</p>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>{t.footer.aboutEducational}</li>
								<li>{t.footer.aboutSimulated}</li>
								<li>{t.footer.aboutClientSide}</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="mt-10 border-t border-border/60 pt-6 sm:mt-12">
					<div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
						<p>{t.footer.tagline2}</p>
						<p>{t.footer.disclaimer}</p>
					</div>
					<p className="mt-4 text-center text-xs text-muted-foreground">
						{t.footer.madeWith}{" "}
						<a
							href="https://x.com/sinigajelasin"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium text-foreground/80 transition-colors hover:text-foreground"
						>
							Ga | Curious About Everything 🔍
						</a>
					</p>
				</div>
			</div>
		</footer>
	)
}
