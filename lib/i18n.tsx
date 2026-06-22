"use client"

import * as React from "react"
import type { TextStats } from "@/lib/tokenizer"

export type Locale = "id" | "en"
export const LOCALES: Locale[] = ["id", "en"]
export const DEFAULT_LOCALE: Locale = "id"
const STORAGE_KEY = "te-locale"

const en = {
  header: { home: "Home", playground: "Playground", exploreTokens: "Explore Tokens" },
  footer: {
    tagline:
      "Large Language Models do not read text the way humans do. Before generating responses, they convert text into tokens and numerical representations.",
    exploreHeading: "Explore",
    playground: "Playground",
    comparison: "Comparison",
    tokenSurprises: "Token Surprises",
    aboutHeading: "About",
    aboutEducational: "Educational demo",
    aboutSimulated: "Simulated tokenizer",
    aboutClientSide: "100% client-side",
    tagline2: "Humans read words. AI reads tokens.",
    disclaimer:
      "Token counts are simulated for learning — real tokenizers vary by model.",
    madeWith: "Made with ❤️ by",
  },
  hero: {
    badge: "Humans read words. AI reads tokens.",
    subtitle:
      "See how AI breaks your sentences into tokens before generating a response.",
    exploreTokens: "Explore Tokens",
    randomExample: "Random Example",
    humansSee: "Humans see",
    aiSees: "AI sees",
    tokens: "tokens",
    characters: "characters",
    sentences: [
      "I love fried rice.",
      "Humans read words.",
      "AI reads tokens.",
      "ChatGPT is amazing.",
    ],
  },
  landing: {
    featuresHeading: "A playground for how machines read",
    featuresSubtitle:
      "Tokens are the atoms of language models. Token Explorer makes them visible, tangible, and a little bit fun.",
    features: [
      {
        title: "Live tokenization",
        body: "Watch any sentence break into colorful token blocks. Hover and click to inspect each token's id, characters, and bytes.",
      },
      {
        title: "Instant stats",
        body: "Characters, words, tokens, estimated cost, reading time, and token density — updated as you type.",
      },
      {
        title: "The AI's perspective",
        body: "See the journey from sentence to tokens to embeddings to prediction, the way a model actually reads.",
      },
      {
        title: "Surprising comparisons",
        body: "Compare short vs long words and discover why 'strawberry' can cost more tokens than you'd expect.",
      },
    ],
    ctaHeading: "Ready to see your words as tokens?",
    ctaBody:
      "Paste a sentence, an essay, or an emoji. The playground does the rest — instantly and entirely in your browser.",
    ctaButton: "Open the playground",
  },
  playground: {
    title: "Playground",
    subtitle:
      "Type or paste any text to see exactly how a language model would break it into tokens — instantly, and entirely in your browser.",
    placeholder: "Type or paste text here...",
    analyze: "Analyze",
    randomExample: "Random Example",
    clear: "Clear",
    shortcut: "⌘ / Ctrl + Enter to analyze",
    tokenizationView: "Tokenization view",
    shareYourResult: "Share your result",
    howAiSees: "How AI sees this text",
    defaultText: "I love fried rice.",
    randomExamples: [
      "I love fried rice.",
      "ChatGPT is amazing.",
      "Humans read words. AI reads tokens.",
      "A cat is sleeping on the sofa.",
      "Why does Monday feel heavier?",
    ],
    tabs: {
      perspective: "AI perspective",
      animation: "Animation",
      insights: "Insights",
      comparison: "Comparison",
      fun: "Fun mode",
    },
  },
  stats: {
    characters: "Characters",
    words: "Words",
    tokens: "Tokens",
    estCost: "Est. AI cost",
    simulated: "simulated",
    readingTime: "Reading time",
    tokenDensity: "Token density",
    chars: "chars",
    sec: "sec",
    min: "min",
  },
  tokenizationView: { empty: "Your tokens will appear here." },
  tokenDetail: {
    empty: "Click any token to inspect its details.",
    tokenNumber: "Token #",
    rawToken: "Raw token",
    characters: "Characters",
    estTokenId: "Estimated token ID",
    bytes: "Bytes (UTF-8)",
    note: "Token ID is simulated for learning — a real model maps this token to a fixed integer in its vocabulary.",
    close: "Close token details",
    kinds: {
      word: "word",
      subword: "subword",
      space: "space",
      punctuation: "punctuation",
      number: "number",
    },
  },
  aiPerspective: {
    humansSee: "Humans see",
    aiSees: "AI sees",
    sentencePlaceholder: "A sentence with meaning.",
    tokensPlaceholder: "A sequence of tokens.",
    steps: [
      { title: "Sentence", body: "Raw text written by a human." },
      { title: "Tokens", body: "Text split into vocabulary pieces." },
      { title: "Embeddings", body: "Each token becomes a vector of numbers." },
      { title: "Prediction", body: "The model predicts the next token." },
    ],
  },
  tokenAnimation: { replay: "Replay animation", defaultText: "ChatGPT is amazing" },
  insights: { heading: "Educational insights" },
  fun: {
    heading: "Token surprises",
    subtitle:
      "Common words may use fewer tokens than rare ones. Here are a few that often surprise people.",
    tokens: "tokens",
    examples: [
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
    ],
  },
  comparison: {
    sentenceA: "Sentence A",
    sentenceB: "Sentence B",
    inputPlaceholder: "Type a word or sentence...",
    words: "Words",
    tokens: "Tokens",
    whyDifferent: "Why the difference? ",
    presets: [
      { label: "Short vs Long", a: "Hello", b: "Antidisestablishmentarianism" },
      { label: "Common vs Rare", a: "dog", b: "dachshund" },
      { label: "English vs Mixed", a: "good morning", b: "selamat pagi sahabat" },
    ],
  },
  share: {
    copyResult: "Copy result",
    copied: "Copied",
    shareLink: "Share link",
    linkCopied: "Link copied",
    exportPng: "Export as PNG",
  },
  tokenBlock: { tokenNumber: "Token #" },
}

export type Dict = typeof en

const id: Dict = {
  header: { home: "Beranda", playground: "Playground", exploreTokens: "Jelajahi Token" },
  footer: {
    tagline:
      "Large Language Model tidak membaca teks seperti manusia. Sebelum menghasilkan respons, mereka mengubah teks menjadi token dan representasi angka.",
    exploreHeading: "Jelajahi",
    playground: "Playground",
    comparison: "Perbandingan",
    tokenSurprises: "Kejutan Token",
    aboutHeading: "Tentang",
    aboutEducational: "Demo edukasi",
    aboutSimulated: "Tokenizer simulasi",
    aboutClientSide: "100% di sisi browser",
    tagline2: "Manusia membaca kata. AI membaca token.",
    disclaimer:
      "Jumlah token disimulasikan untuk pembelajaran — tokenizer asli berbeda tiap model.",
    madeWith: "Dibuat dengan ❤️ oleh",
  },
  hero: {
    badge: "Manusia membaca kata. AI membaca token.",
    subtitle:
      "Lihat bagaimana AI memecah kalimatmu menjadi token sebelum menghasilkan respons.",
    exploreTokens: "Jelajahi Token",
    randomExample: "Contoh Acak",
    humansSee: "Manusia melihat",
    aiSees: "AI melihat",
    tokens: "token",
    characters: "karakter",
    sentences: [
      "Saya suka nasi goreng.",
      "Manusia membaca kata.",
      "AI membaca token.",
      "ChatGPT memang luar biasa.",
    ],
  },
  landing: {
    featuresHeading: "Playground tentang cara mesin membaca",
    featuresSubtitle:
      "Token adalah atom dari model bahasa. Token Explorer membuatnya terlihat, nyata, dan sedikit menyenangkan.",
    features: [
      {
        title: "Tokenisasi langsung",
        body: "Saksikan kalimat apa pun terpecah menjadi blok token berwarna. Arahkan kursor dan klik untuk memeriksa id, karakter, dan byte tiap token.",
      },
      {
        title: "Statistik instan",
        body: "Karakter, kata, token, perkiraan biaya, waktu baca, dan kepadatan token — diperbarui saat kamu mengetik.",
      },
      {
        title: "Sudut pandang AI",
        body: "Lihat perjalanan dari kalimat ke token ke embedding ke prediksi, seperti cara model benar-benar membaca.",
      },
      {
        title: "Perbandingan mengejutkan",
        body: "Bandingkan kata pendek vs panjang dan temukan mengapa 'strawberry' bisa memakan token lebih banyak dari dugaanmu.",
      },
    ],
    ctaHeading: "Siap melihat kata-katamu sebagai token?",
    ctaBody:
      "Tempelkan kalimat, esai, atau emoji. Playground akan mengurus sisanya — secara instan dan sepenuhnya di browser-mu.",
    ctaButton: "Buka playground",
  },
  playground: {
    title: "Playground",
    subtitle:
      "Ketik atau tempel teks apa pun untuk melihat persis bagaimana model bahasa memecahnya menjadi token — secara instan, dan sepenuhnya di browser-mu.",
    placeholder: "Ketik atau tempel teks di sini...",
    analyze: "Analisis",
    randomExample: "Contoh Acak",
    clear: "Hapus",
    shortcut: "⌘ / Ctrl + Enter untuk menganalisis",
    tokenizationView: "Tampilan tokenisasi",
    shareYourResult: "Bagikan hasilmu",
    howAiSees: "Bagaimana AI melihat teks ini",
    defaultText: "Saya suka nasi goreng.",
    randomExamples: [
      "Foto mantan sebenarnya hanyalah angka.",
      "Video yang kamu tonton adalah ribuan gambar.",
      "Mengapa hari Senin terasa lebih berat?",
      "AI tidak membaca seperti manusia.",
      "Seekor kucing sedang tidur di sofa.",
    ],
    tabs: {
      perspective: "Sudut pandang AI",
      animation: "Animasi",
      insights: "Wawasan",
      comparison: "Perbandingan",
      fun: "Mode seru",
    },
  },
  stats: {
    characters: "Karakter",
    words: "Kata",
    tokens: "Token",
    estCost: "Perk. biaya AI",
    simulated: "simulasi",
    readingTime: "Waktu baca",
    tokenDensity: "Kepadatan token",
    chars: "kar",
    sec: "dtk",
    min: "mnt",
  },
  tokenizationView: { empty: "Token-mu akan muncul di sini." },
  tokenDetail: {
    empty: "Klik token mana pun untuk melihat detailnya.",
    tokenNumber: "Token #",
    rawToken: "Token mentah",
    characters: "Karakter",
    estTokenId: "Perkiraan ID token",
    bytes: "Byte (UTF-8)",
    note: "ID token disimulasikan untuk pembelajaran — model asli memetakan token ini ke bilangan bulat tetap dalam kosakatanya.",
    close: "Tutup detail token",
    kinds: {
      word: "kata",
      subword: "sub-kata",
      space: "spasi",
      punctuation: "tanda baca",
      number: "angka",
    },
  },
  aiPerspective: {
    humansSee: "Manusia melihat",
    aiSees: "AI melihat",
    sentencePlaceholder: "Sebuah kalimat yang bermakna.",
    tokensPlaceholder: "Serangkaian token.",
    steps: [
      { title: "Kalimat", body: "Teks mentah yang ditulis manusia." },
      { title: "Token", body: "Teks dipecah menjadi potongan kosakata." },
      { title: "Embedding", body: "Setiap token menjadi vektor angka." },
      { title: "Prediksi", body: "Model memprediksi token berikutnya." },
    ],
  },
  tokenAnimation: { replay: "Putar ulang animasi", defaultText: "ChatGPT memang luar biasa" },
  insights: { heading: "Wawasan edukasi" },
  fun: {
    heading: "Kejutan token",
    subtitle:
      "Kata umum bisa memakai lebih sedikit token daripada kata langka. Berikut beberapa yang sering mengejutkan orang.",
    tokens: "token",
    examples: [
      {
        label: "Panjang tapi umum",
        text: "strawberry",
        note: "Kata yang familiar pun bisa terpecah menjadi beberapa sub-token — model tidak pernah mempelajarinya sebagai satu potongan.",
      },
      {
        label: "Nama merek",
        text: "ChatGPT",
        note: "Nama yang mencampur huruf besar-kecil sering terpecah di huruf kapital: Chat + GPT.",
      },
      {
        label: "Pemutar lidah",
        text: "Antidisestablishmentarianism",
        note: "Kata langka dan panjang itu mahal — satu 'kata' bisa memakan banyak token.",
      },
      {
        label: "Emoji",
        text: "I ❤️ tokens",
        note: "Emoji adalah karakter multi-byte dan sering memakan lebih dari satu token masing-masing.",
      },
      {
        label: "Angka",
        text: "The year was 2026 not 1999",
        note: "Digit ditokenisasi terpisah dari huruf, kadang beberapa digit sekaligus.",
      },
    ],
  },
  comparison: {
    sentenceA: "Kalimat A",
    sentenceB: "Kalimat B",
    inputPlaceholder: "Ketik kata atau kalimat...",
    words: "Kata",
    tokens: "Token",
    whyDifferent: "Mengapa berbeda? ",
    presets: [
      { label: "Pendek vs Panjang", a: "Hello", b: "Antidisestablishmentarianism" },
      { label: "Umum vs Langka", a: "dog", b: "dachshund" },
      { label: "Inggris vs Campuran", a: "good morning", b: "selamat pagi sahabat" },
    ],
  },
  share: {
    copyResult: "Salin hasil",
    copied: "Tersalin",
    shareLink: "Bagikan tautan",
    linkCopied: "Tautan tersalin",
    exportPng: "Ekspor sebagai PNG",
  },
  tokenBlock: { tokenNumber: "Token #" },
}

const DICTS: Record<Locale, Dict> = { en, id }

/** Localized educational insights for the playground Insights tab. */
export function buildInsights(stats: TextStats, locale: Locale): string[] {
  if (stats.tokens === 0) {
    return locale === "id"
      ? [
          "Ketik atau tempel sebagian teks untuk melihat bagaimana model bahasa akan memecahnya menjadi token.",
          "LLM memproses token, bukan kata — ide yang sama bisa memakan jumlah token yang sangat berbeda.",
        ]
      : [
          "Type or paste some text to see how a language model would break it into tokens.",
          "LLMs process tokens, not words — the same idea can cost very different numbers of tokens.",
        ]
  }
  const out: string[] = []
  if (locale === "id") {
    out.push(
      `Teks ini berisi ${stats.tokens.toLocaleString("id-ID")} token di ${stats.words.toLocaleString("id-ID")} kata.`,
    )
    out.push(
      "LLM memproses token, bukan kata. Jumlah token memengaruhi biaya pemrosesan, panjang konteks, dan penggunaan memori.",
    )
    if (stats.words > 0) {
      const ratio = stats.tokens / stats.words
      out.push(
        ratio > 1.5
          ? `Rata-rata setiap kata di sini memakai ~${ratio.toFixed(2)} token — tanda kata yang lebih panjang atau langka yang dipecah tokenizer menjadi beberapa bagian.`
          : `Rata-rata setiap kata di sini memakai ~${ratio.toFixed(2)} token — kata umum sering dipetakan ke satu token.`,
      )
    }
    out.push(
      `Pada sekitar ${stats.tokenDensity.toFixed(1)} karakter per token, jendela konteks model yang terbatas terisi lebih cepat dengan teks yang padat atau tidak biasa.`,
    )
    return out
  }
  out.push(
    `This text contains ${stats.tokens.toLocaleString()} token${stats.tokens === 1 ? "" : "s"} across ${stats.words.toLocaleString()} word${stats.words === 1 ? "" : "s"}.`,
  )
  out.push(
    "LLMs process tokens, not words. The number of tokens influences processing cost, context length, and memory usage.",
  )
  if (stats.words > 0) {
    const ratio = stats.tokens / stats.words
    out.push(
      ratio > 1.5
        ? `On average each word here uses ~${ratio.toFixed(2)} tokens — a sign of longer or rarer words that the tokenizer splits into pieces.`
        : `On average each word here uses ~${ratio.toFixed(2)} tokens — common words often map to a single token.`,
    )
  }
  out.push(
    `At roughly ${stats.tokenDensity.toFixed(1)} characters per token, a model's limited context window fills up faster with dense or unusual text.`,
  )
  return out
}

/** Localized "why the difference" explanation for comparison mode. */
export function comparisonExplanation(
  locale: Locale,
  a: string,
  b: string,
  wordsA: number,
  tokensA: number,
  wordsB: number,
  tokensB: number,
): string {
  const A = a || "A"
  const B = b || "B"
  if (locale === "id") {
    return `“${A}” memakai ${wordsA} kata / ${tokensA} token, sedangkan “${B}” memakai ${wordsB} kata / ${tokensB} token. Kata yang langka atau panjang tidak ada dalam kosakata model sebagai satu potongan, jadi mereka dipecah menjadi beberapa sub-token — meski bagi manusia tetap hanya “satu kata”.`
  }
  return `“${A}” uses ${wordsA} word / ${tokensA} token${tokensA === 1 ? "" : "s"}, while “${B}” uses ${wordsB} word / ${tokensB} token${tokensB === 1 ? "" : "s"}. Rare or long words aren’t in the model’s vocabulary as a single piece, so they get split into several sub-word tokens — even when they’re still just “one word” to a human.`
}

/** Locale-aware reading time formatter. */
export function formatReadingTime(seconds: number, locale: Locale): string {
  const sec = locale === "id" ? "dtk" : "sec"
  const min = locale === "id" ? "mnt" : "min"
  if (seconds <= 0) return `0 ${sec}`
  if (seconds < 60) return `${seconds} ${sec}`
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60
  if (rest === 0) return `${minutes} ${min}`
  return `${minutes} ${min} ${rest} ${sec}`
}

interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: Dict
}

const I18nContext = React.createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(DEFAULT_LOCALE)

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === "id" || stored === "en") setLocaleState(stored)
    } catch {
      /* ignore */
    }
  }, [])

  React.useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = locale
  }, [locale])

  const setLocale = React.useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const value = React.useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t: DICTS[locale] }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = React.useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider")
  return ctx
}
