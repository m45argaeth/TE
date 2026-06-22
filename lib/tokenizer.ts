/**
 * Token Explorer — simulated tokenizer
 *
 * This is an *educational approximation* of how modern LLM tokenizers
 * (GPT-style byte-pair encoding) split text. It is NOT a real BPE tokenizer
 * and runs fully client-side with zero dependencies. Token IDs, costs and
 * boundaries are simulated to teach the core intuition:
 *
 *   • whitespace is usually attached to the *following* word
 *   • common words tend to be a single token
 *   • rare / long words get split into several sub-word tokens
 *   • punctuation and digits are handled separately
 */

export interface Token {
	/** The exact substring this token represents (may include a leading space). */
	text: string
	/** Simulated, deterministic token id (roughly cl100k-sized vocabulary). */
	id: number
	/** UTF-8 byte length of the token text. */
	bytes: number
	/** Position of the token in the sequence. */
	index: number
	/** Coarse category, used for coloring and tooltips. */
	kind: TokenKind
}

export type TokenKind = "word" | "subword" | "space" | "punctuation" | "number"

/** A small lexicon of "common" words that stay as a single token. */
const COMMON_WORDS = new Set<string>([
	// English
	"the", "a", "an", "and", "or", "but", "if", "is", "are", "was", "were",
	"be", "been", "being", "to", "of", "in", "on", "at", "by", "for", "with",
	"from", "as", "it", "its", "this", "that", "these", "those", "i", "you",
	"he", "she", "we", "they", "me", "him", "her", "us", "them", "my", "your",
	"our", "their", "do", "does", "did", "have", "has", "had", "not", "no",
	"yes", "can", "will", "would", "should", "could", "may", "might", "must",
	"love", "like", "hate", "fried", "rice", "hello", "world", "amazing",
	"good", "great", "bad", "text", "token", "tokens", "word", "words",
	"read", "reads", "see", "sees", "human", "humans", "model", "models",
	"how", "why", "what", "when", "who", "cat", "dog", "sofa", "photo",
	"video", "image", "images", "number", "numbers", "monday", "week", "day",
	// Indonesian
	"saya", "aku", "kamu", "kami", "kita", "dia", "mereka", "ini", "itu",
	"yang", "dan", "atau", "di", "ke", "dari", "untuk", "dengan", "pada",
	"adalah", "ialah", "tidak", "bukan", "ya", "suka", "cinta", "nasi",
	"goreng", "foto", "mantan", "angka", "video", "tonton", "ribuan",
	"gambar", "hari", "senin", "terasa", "lebih", "berat", "membaca",
	"seperti", "manusia", "seekor", "kucing", "sedang", "tidur", "sofa",
	"hanya", "hanyalah", "sebenarnya", "mengapa", "apa", "siapa", "kenapa",
])

/**
 * GPT-2 / GPT-4 style pre-tokenization regex. Splits text into chunks of
 * contractions, words (with an optional leading space), numbers, punctuation
 * runs, and whitespace.
 */
const PRETOKEN_RE =
	/'(?:[sdmt]|ll|ve|re)| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu

const textEncoder =
	typeof TextEncoder !== "undefined" ? new TextEncoder() : null

export function byteLength(value: string): number {
	if (textEncoder) return textEncoder.encode(value).length
	// Fallback approximation when TextEncoder is unavailable.
	let bytes = 0
	for (let i = 0; i < value.length; i++) {
		const code = value.charCodeAt(i)
		if (code < 0x80) bytes += 1
		else if (code < 0x800) bytes += 2
		else bytes += 3
	}
	return bytes
}

/** Deterministic FNV-1a based pseudo token id. */
function simulatedId(value: string): number {
	let hash = 2166136261
	for (let i = 0; i < value.length; i++) {
		hash ^= value.charCodeAt(i)
		hash = Math.imul(hash, 16777619)
	}
	return Math.abs(hash) % 100256
}

function chunkSegment(segment: string): string[] {
	if (segment.length === 0) return []
	if (segment.length <= 4 || COMMON_WORDS.has(segment.toLowerCase())) {
		return [segment]
	}
	const pieces: string[] = []
	let i = 0
	while (i < segment.length) {
		const remaining = segment.length - i
		let size = 4
		if (remaining <= 4) {
			size = remaining
		} else if (remaining <= 6) {
			size = Math.ceil(remaining / 2)
		}
		pieces.push(segment.slice(i, i + size))
		i += size
	}
	return pieces
}

/** Split a word (possibly with a leading space) into sub-word tokens. */
function splitWord(word: string): string[] {
	const hasLeadingSpace = word.startsWith(" ")
	const core = hasLeadingSpace ? word.slice(1) : word

	// Insert split markers at camelCase and letter/digit boundaries.
	const marked = core
		.replace(/([a-z\u00DF-\u00FF])([A-Z])/g, "$1\u0000$2")
		.replace(/([A-Za-z])([0-9])/g, "$1\u0000$2")
		.replace(/([0-9])([A-Za-z])/g, "$1\u0000$2")

	const segments = marked.split("\u0000").filter(Boolean)
	const pieces: string[] = []
	for (const segment of segments) {
		pieces.push(...chunkSegment(segment))
	}

	if (pieces.length === 0) return hasLeadingSpace ? [" "] : []
	if (hasLeadingSpace) pieces[0] = " " + pieces[0]
	return pieces
}

function classify(text: string): TokenKind {
	if (/^\s+$/.test(text)) return "space"
	const trimmed = text.trimStart()
	if (/^[0-9]/.test(trimmed)) return "number"
	if (/^[^\s\p{L}\p{N}]/u.test(trimmed)) return "punctuation"
	return "word"
}

/**
 * Tokenize a string into simulated tokens.
 */
export function tokenize(input: string): Token[] {
	const tokens: Token[] = []
	if (!input) return tokens

	const matches = input.match(PRETOKEN_RE)
	if (!matches) return tokens

	let index = 0
	for (const piece of matches) {
		const isWordish = /\p{L}/u.test(piece)
		const parts = isWordish ? splitWord(piece) : [piece]
		for (let p = 0; p < parts.length; p++) {
			const text = parts[p]
			if (text.length === 0) continue
			let kind = classify(text)
			if (kind === "word" && parts.length > 1) kind = "subword"
			tokens.push({
				text,
				id: simulatedId(text),
				bytes: byteLength(text),
				index: index++,
				kind,
			})
		}
	}
	return tokens
}

export interface TextStats {
	characters: number
	charactersNoSpaces: number
	words: number
	tokens: number
	sentences: number
	/** Estimated input cost in USD (simulated, gpt-4o-mini-style pricing). */
	estimatedCost: number
	/** Reading time in seconds at ~200 wpm. */
	readingTimeSeconds: number
	/** Average characters per token. */
	tokenDensity: number
}

/** Simulated price: USD per 1M input tokens. */
export const SIMULATED_PRICE_PER_MILLION = 0.15

export function getStats(input: string, tokens: Token[]): TextStats {
	const characters = input.length
	const charactersNoSpaces = input.replace(/\s/g, "").length
	const words = input.trim() ? input.trim().split(/\s+/).filter(Boolean).length : 0
	const tokenCount = tokens.length
	const sentences = input.trim()
		? (input.match(/[^.!?\u2026]+[.!?\u2026]+|[^.!?\u2026]+$/g) || []).length
		: 0
	const estimatedCost = (tokenCount / 1_000_000) * SIMULATED_PRICE_PER_MILLION
	const readingTimeSeconds = Math.round((words / 200) * 60)
	const tokenDensity = tokenCount > 0 ? characters / tokenCount : 0

	return {
		characters,
		charactersNoSpaces,
		words,
		tokens: tokenCount,
		sentences,
		estimatedCost,
		readingTimeSeconds,
		tokenDensity,
	}
}

export function formatCost(cost: number): string {
	if (cost === 0) return "$0.00"
	if (cost < 0.000001) return "<$0.000001"
	if (cost < 0.01) return `$${cost.toFixed(6)}`
	return `$${cost.toFixed(4)}`
}

export function formatReadingTime(seconds: number): string {
	if (seconds <= 0) return "0 sec"
	if (seconds < 60) return `${seconds} sec`
	const minutes = Math.floor(seconds / 60)
	const rest = seconds % 60
	if (rest === 0) return `${minutes} min`
	return `${minutes} min ${rest} sec`
}

/** Render a token's whitespace visibly for display (· for spaces). */
export function renderTokenText(text: string): string {
	return text.replace(/ /g, "\u00b7").replace(/\n/g, "\u21b5")
}
