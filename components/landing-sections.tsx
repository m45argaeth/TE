"use client"

import Link from "next/link"
import { ArrowRight, Binary, Eye, Gauge, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n"

export function LandingSections() {
	const { t } = useI18n()
	const icons = [Binary, Gauge, Eye, Sparkles]
	const features = t.landing.features.map((f, i) => ({ ...f, icon: icons[i] }))

	return (
		<>
			<section className="mx-auto max-w-6xl px-6 py-20">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
						{t.landing.featuresHeading}
					</h2>
					<p className="mt-4 text-balance text-muted-foreground">
						{t.landing.featuresSubtitle}
					</p>
				</div>
				<div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{features.map((feature) => (
						<Card
							key={feature.title}
							className="group border-border/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
						>
							<CardContent className="p-6">
								<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background">
									<feature.icon className="h-5 w-5" />
								</div>
								<h3 className="mt-5 font-medium">{feature.title}</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
									{feature.body}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-6 pb-24">
				<div className="relative overflow-hidden rounded-3xl border bg-foreground px-8 py-16 text-background sm:px-16">
					<div className="pointer-events-none absolute inset-0 opacity-40">
						<div className="absolute right-[-10%] top-[-30%] h-72 w-72 rounded-full bg-gradient-to-br from-sky-400 to-violet-500 blur-3xl" />
					</div>
					<div className="relative mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
							{t.landing.ctaHeading}
						</h2>
						<p className="mt-4 text-background/70">
							{t.landing.ctaBody}
						</p>
						<div className="mt-8 flex justify-center">
							<Button asChild size="lg" variant="secondary">
								<Link href="/playground">
									{t.landing.ctaButton}
									<ArrowRight className="h-4 w-4" />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
