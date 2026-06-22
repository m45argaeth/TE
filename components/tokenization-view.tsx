"use client"

import type { Token } from "@/lib/tokenizer"
import { useI18n } from "@/lib/i18n"
import { TokenBlock } from "@/components/token-block"
import { Skeleton } from "@/components/ui/skeleton"

interface TokenizationViewProps {
	tokens: Token[]
	loading?: boolean
	animate?: boolean
	activeIndex?: number | null
	onSelect?: (token: Token) => void
}

export function TokenizationView({
	tokens,
	loading,
	animate,
	activeIndex,
	onSelect,
}: TokenizationViewProps) {
	const { t } = useI18n()

	if (loading) {
		return (
			<div className="flex flex-wrap gap-2">
				{Array.from({ length: 14 }).map((_, i) => (
					<Skeleton
						key={i}
						style={{ width: `${48 + ((i * 37) % 70)}px` }}
						className="h-9 rounded-lg"
					/>
				))}
			</div>
		)
	}

	if (tokens.length === 0) {
		return (
			<div className="flex min-h-[120px] items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
				{t.tokenizationView.empty}
			</div>
		)
	}

	return (
		<div className="flex flex-wrap gap-2">
			{tokens.map((token) => (
				<TokenBlock
					key={token.index}
					token={token}
					animate={animate}
					active={activeIndex === token.index}
					onSelect={onSelect}
				/>
			))}
		</div>
	)
}
