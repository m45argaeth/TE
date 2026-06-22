import Link from "next/link"
import { Boxes } from "lucide-react"

export function SiteFooter() {
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
							Large Language Models do not read text the way humans do.
							Before generating responses, they convert text into tokens and
							numerical representations.
						</p>
					</div>
					<div className="flex flex-wrap gap-10 sm:gap-16">
						<div className="space-y-3">
							<p className="text-sm font-medium">Explore</p>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<Link href="/playground" className="transition-colors hover:text-foreground">
										Playground
									</Link>
								</li>
								<li>
									<Link href="/playground#comparison" className="transition-colors hover:text-foreground">
										Comparison
									</Link>
								</li>
								<li>
									<Link href="/playground#fun" className="transition-colors hover:text-foreground">
										Token Surprises
									</Link>
								</li>
							</ul>
						</div>
						<div className="space-y-3">
							<p className="text-sm font-medium">About</p>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>Educational demo</li>
								<li>Simulated tokenizer</li>
								<li>100% client-side</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="mt-10 border-t border-border/60 pt-6 sm:mt-12">
					<div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
						<p>Humans read words. AI reads tokens.</p>
						<p>
							Token counts are simulated for learning — real tokenizers vary by
							model.
						</p>
					</div>
					<p className="mt-4 text-center text-xs text-muted-foreground">
						Made with ❤️ by{" "}
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
