# 🧩 Token Explorer (TE)

> **Humans read words. AI reads tokens.**
> **Manusia baca kata. AI baca token.**

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000?logo=vercel)

🔗 **Live → [te-playground.vercel.app](https://te-playground.vercel.app)**

</div>

---

## 🌐 Overview

**Token Explorer** is an educational playground that helps you understand how **Large Language Models (LLMs)** process text using **tokens**. Paste any sentence and watch it split into colorful token blocks, with live stats, comparisons, animations, and the model's "point of view" — all running **100% in your browser**.

No server. No uploads. 100% client-side.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 **Interactive Tokenization** | Paste text, get colored token blocks with hover/click inspection |
| 🔍 **Token Detail** | Click any token to see raw text, character count, simulated ID, byte count, and token kind |
| 📊 **Stats Panel** | Characters, words, tokens, estimated AI cost, reading time, token density |
| 🤖 **AI Perspective** | "Humans see vs AI sees" comparison + Sentence → Tokens → Embeddings → Prediction pipeline |
| 🎬 **Token Animation** | Smooth text-splitting animation with replay |
| 📚 **Educational Insights** | Auto-generated explanations about tokenization patterns in your text |
| ⚖️ **Comparison Mode** | Side-by-side tokenization with presets (e.g. "Hello" vs "Antidisestablishmentarianism") |
| 🎉 **Fun Mode** | "Token Surprises" — surprising tokenization examples (emoji, brand names, tongue twisters) |
| 📤 **Share & Export** | Copy result, share via URL hash, export as PNG (pure canvas, 2× retina) |
| 🌗 **Dark / Light Theme** | Toggle between themes with system preference support |
| 🌏 **Bahasa Indonesia / English** | Full bilingual UI with seamless language switching |
| 📱 **Responsive** | Works on desktop and mobile |
| 🔒 **Privacy-First** | Everything runs in your browser — no data leaves your device |

---

## 🧠 About the Tokenizer

This app ships with a **simulated BPE-style tokenizer** (`lib/tokenizer.ts`). It mimics the intuition of GPT-style byte-pair encoding:

- Whitespace is attached to the *following* word
- Common words stay as a single token
- Rare / long words get split into sub-word pieces
- Punctuation and digits are handled separately
- Deterministic pseudo token IDs via FNV-1a hash

> ⚠️ This is **not** a real BPE model. Token IDs and costs are illustrative. Real tokenizers vary by model.

Want real counts? Swap `tokenize()` for [`gpt-tokenizer`](https://www.npmjs.com/package/gpt-tokenizer) or [`js-tiktoken`](https://www.npmjs.com/package/js-tiktoken) — the UI consumes the same `Token` interface.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI Library | [React 19](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| Components | [shadcn/ui](https://ui.shadcn.com/) (new-york style, Radix primitives) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| Icons | [lucide-react](https://lucide.dev/) |
| Fonts | Inter (sans) + JetBrains Mono (mono) via next/font |
| i18n | Custom React Context (Bahasa Indonesia / English) |
| Utilities | clsx, tailwind-merge, class-variance-authority |

---

## 📁 Project Structure

```
├── app/
│   ├── globals.css                    # Global styles & CSS variables
│   ├── layout.tsx                     # Root layout (fonts, providers, header/footer)
│   ├── page.tsx                       # Landing page (Hero + LandingSections)
│   └── playground/
│       └── page.tsx                   # Playground page
├── components/
│   ├── playground.tsx                 # Main interactive orchestrator (5 tabs)
│   ├── tokenization-view.tsx          # Token blocks grid display
│   ├── token-block.tsx                # Individual clickable token with color
│   ├── token-detail.tsx               # Token inspection panel
│   ├── token-animation.tsx            # Text→token splitting animation
│   ├── stats-panel.tsx                # 6-stat grid
│   ├── ai-perspective.tsx             # Humans vs AI view + pipeline
│   ├── educational-insights.tsx       # Auto-generated explanations
│   ├── comparison-mode.tsx            # Side-by-side comparison
│   ├── fun-mode.tsx                   # Token surprises
│   ├── share-features.tsx             # Copy / Share Link / Export PNG
│   ├── hero.tsx                       # Animated landing hero
│   ├── landing-sections.tsx           # Feature cards + CTA
│   ├── site-header.tsx / site-footer.tsx
│   ├── language-toggle.tsx / theme-toggle.tsx
│   └── ui/ (badge, button, card, input, separator, skeleton, tabs, textarea, tooltip)
├── lib/
│   ├── tokenizer.ts                  # Core engine: simulated BPE-style tokenizer + stats
│   ├── token-colors.ts               # 8-color palette for token visualization
│   ├── i18n.tsx                       # Bilingual i18n system (id/en)
│   ├── site-config.ts                 # Site data, projects, universes
│   ├── examples.ts                    # Random examples, fun facts, comparison presets
│   ├── export-image.ts                # Pure canvas PNG export (2× retina)
│   ├── share.ts                       # URL hash encode/decode
│   └── utils.ts                       # cn() utility
└── ...
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm, yarn, pnpm, or bun

### Development

```bash
# Clone the repo
git clone https://github.com/m45argaeth/TE.git
cd TE

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/m45argaeth/TE)

> 🚀 Deployed automatically to [Vercel](https://vercel.com/) on every push to `main`.

---

## 🔒 Privacy

**Everything runs in your browser.** No data is sent to any server. Your text stays on your device — all tokenization happens locally in JavaScript. Even the PNG export is pure canvas rendering, no external services.

---

## 🧩 Part of the "Sini Gajelasin" Series

TE is one of many educational playgrounds under the **[Sini Gajelasin](https://sinigajelasin.vercel.app)** hub — *Curious About Everything*.

### 🪐 EBN Universe — How Computers Process Data

| # | Playground | Topic | Status | Link |
|---|---|---|---|---|
| 1 | 🔢 **EBN** | Media → Numbers | 🟢 Live | [ebn-playground.vercel.app](https://ebn-playground.vercel.app) · [GitHub](https://github.com/m45argaeth/EBN) |
| 2 | 🔤 **TtB** | Text → Binary | 🟢 Live | [ttb-playground.vercel.app](https://ttb-playground.vercel.app) · [GitHub](https://github.com/m45argaeth/TtB) |
| 3 | 🔡 **Token Explorer** | Text → Tokens | 🟢 Live | [te-playground.vercel.app](https://te-playground.vercel.app) · [GitHub](https://github.com/m45argaeth/TE) |
| 4 | 🎬 **Video Frame Explorer** | Video → Frames | 🟢 Live | [vfe-playground.vercel.app](https://vfe-playground.vercel.app) · [GitHub](https://github.com/m45argaeth/VFE) |
| 5 | 🧠 **Embedding Explorer** | Words → Vectors | 🟡 WIP | — |
| 6 | 💬 **Prompt Explorer** | Prompt → Tokens → Output | 🟡 WIP | — |
| 7 | 🤥 **Hallucination Explorer** | LLM Hallucination | 🟡 WIP | — |
| 8 | 📦 **Compression Explorer** | Data → Compression | 🟡 WIP | — |
| 9 | 🌐 **Internet Packet Explorer** | Data → Packets | 🟡 WIP | — |
| 10 | 🤖 **Human vs AI Explorer** | Human vs AI Processing | 🟡 WIP | — |

### 🧬 Human Mind Universe — How We Think

| # | Playground | Topic | Status | Link |
|---|---|---|---|---|
| 11 | 🔍 **Bias Detector** | Cognitive Biases | 🟢 Live | [bd-playground-snowy.vercel.app](https://bd-playground-snowy.vercel.app) · [GitHub](https://github.com/m45argaeth/BD) |
| 12 | 🧠 **Memory Explorer** | Memory Systems | 🟡 WIP | — |
| 13 | 🌀 **False Memory Explorer** | False Memories | 🟡 WIP | — |
| 14 | 👁️ **Attention Explorer** | Attention & Focus | 🟡 WIP | — |
| 15 | 💊 **Dopamine Explorer** | Dopamine Loops | 🟡 WIP | — |

---

## 👤 Author

**Arga** — [GitHub](https://github.com/m45argaeth) · [Twitter/X](https://x.com/sinigajelasin) · [Blog](https://www.kompasiana.com/argacahyanugraha6628)

Made with ❤️ as part of **[Sini Gajelasin](https://sinigajelasin.vercel.app)** — *Curious About Everything* 🔍
