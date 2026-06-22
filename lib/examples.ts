export const RANDOM_EXAMPLES: string[] = [
	"Foto mantan sebenarnya hanyalah angka.",
	"Video yang kamu tonton adalah ribuan gambar.",
	"Mengapa hari Senin terasa lebih berat?",
	"AI tidak membaca seperti manusia.",
	"Seekor kucing sedang tidur di sofa.",
	"I love fried rice.",
	"ChatGPT is amazing.",
	"Humans read words. AI reads tokens.",
]

/** Pick a random example, avoiding an immediate repeat of `previous`. */
export function getRandomExample(previous?: string): string {
	if (RANDOM_EXAMPLES.length === 1) return RANDOM_EXAMPLES[0]
	let pick = previous
	while (pick === previous) {
		pick = RANDOM_EXAMPLES[Math.floor(Math.random() * RANDOM_EXAMPLES.length)]
	}
	return pick as string
}

export interface FunFact {
	label: string
	text: string
	note: string
}

/** Surprising tokenization examples for Fun Mode. */
export const FUN_EXAMPLES: FunFact[] = [
	{
		label: "Long but common",
		text: "strawberry",
		note: "A familiar word can still split into several sub-word tokens — the model never learned it as one piece.",
	},
	{
		label: "Brand names",
		text: "ChatGPT",
		note: "Names that mix cases often break at the capital letters: Chat + GPT.",
	},
	{
		label: "Tongue twister",
		text: "Antidisestablishmentarianism",
		note: "Rare, long words are expensive — one 'word' can cost many tokens.",
	},
	{
		label: "Emoji",
		text: "I ❤️ tokens",
		note: "Emoji are multi-byte characters and frequently consume more than one token each.",
	},
	{
		label: "Numbers",
		text: "The year was 2026 not 1999",
		note: "Digits are tokenized separately from letters, sometimes a few digits at a time.",
	},
]

export interface ComparisonPair {
	label: string
	a: string
	b: string
}

export const COMPARISON_PRESETS: ComparisonPair[] = [
	{ label: "Short vs Long", a: "Hello", b: "Antidisestablishmentarianism" },
	{ label: "Common vs Rare", a: "dog", b: "dachshund" },
	{ label: "English vs Mixed", a: "good morning", b: "selamat pagi sahabat" },
]
