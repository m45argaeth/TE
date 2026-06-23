# 🧩 Token Explorer

> **Humans read words. AI reads tokens.**
>
> *Manusia baca kata. AI baca token.*

[![Next.js](https://img.shields.io/badge/Next.js%2015-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?logo=vercel)](https://vercel.com)

🔗 **Live:** [te-playground.vercel.app](https://te-playground.vercel.app)

---

## Overview

Token Explorer is an educational playground that helps you understand how **Large Language Models (LLMs)** process text using **tokens**. Paste any sentence and watch it split into colorful token blocks, with live stats, comparisons, animations, and the model's "point of view" — all running **100% in your browser**.

*Token Explorer adalah playground edukatif yang membantu kamu memahami bagaimana **Large Language Model (LLM)** memproses teks menggunakan **token**. Tempel kalimat apa saja dan lihat teks terpecah jadi blok-blok token berwarna, lengkap dengan statistik, perbandingan, animasi, dan sudut pandang model — semuanya berjalan **100% di browser**.*

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 **Playground** | Large text area with Analyze / Random Example / Clear actions |
| 🔍 **Tokenization View** | Hoverable, clickable token blocks with inspection details |
| 📊 **Stats Panel** | Characters, words, tokens, estimated AI cost, reading time, token density |
| 🤖 **AI Perspective** | "Humans see" vs "AI sees" + Sentence → Tokens → Embeddings → Prediction pipeline |
| 🎬 **Token Animation** | Smooth text-splitting animation |
| 📚 **Educational Insights** | Auto-generated explanations about your text |
| ⚖️ **Comparison Mode** | Side-by-side token counts (e.g. `Hello` vs `Antidisestablishmentarianism`) |
| 🎉 **Fun Mode** | "Token Surprises" and interesting facts |
| 📤 **Share** | Copy result, share link (URL hash), export as PNG |
| 🌓 **Dark Mode** | Light mode default with dark toggle |
| 🌏 **Bilingual** | Indonesian (default) / English |

## 🧠 About the Tokenizer

This app ships with a **simulated tokenizer** (`lib/tokenizer.ts`). It mimics the intuition of GPT-style byte-pair encoding:

- Whitespace is attached to the *following* word
- Common words stay as a single token
- Rare / long words get split into sub-word pieces
- Punctuation and digits are handled separately

> ⚠️ This is **not** a real BPE model. Token IDs and costs are illustrative. Real tokenizers vary by model.

Want real counts? Swap `tokenize()` for [`gpt-tokenizer`](https://www.npmjs.com/package/gpt-tokenizer) or [`js-tiktoken`](https://www.npmjs.com/package/js-tiktoken) — the UI consumes the same `Token` interface.

## 🛠 Tech Stack

- **[Next.js 15](https://nextjs.org)** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (Radix primitives)
- **next-themes** for dark mode
- **Custom i18n** — Bahasa Indonesia (default) + English
- No database — fully client-side

## 📁 Project Structure

```
token-explorer/
├── app/
│   ├── globals.css              # Tailwind + design tokens (light/dark)
│   ├── layout.tsx               # Root layout, fonts, theme + header/footer
│   ├── page.tsx                 # Landing page
│   └── playground/
│       └── page.tsx             # Playground route
├── components/
│   ├── ui/                      # shadcn-style primitives
│   ├── hero.tsx                 # Animated hero section
│   ├── playground.tsx           # Main interactive orchestrator
│   ├── tokenization-view.tsx    # Token blocks display
│   ├── token-block.tsx          # Individual token component
│   ├── token-detail.tsx         # Token inspection panel
│   ├── token-animation.tsx      # Splitting animation
│   ├── stats-panel.tsx          # Live statistics
│   ├── ai-perspective.tsx       # Humans vs AI view
│   ├── educational-insights.tsx # Auto-explanations
│   ├── comparison-mode.tsx      # Side-by-side comparison
│   ├── fun-mode.tsx             # Token surprises
│   ├── share-features.tsx       # Copy / Share / Export
│   ├── language-toggle.tsx      # ID ↔ EN toggle
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── lib/
│   ├── tokenizer.ts             # Simulated tokenizer + stats
│   ├── token-colors.ts          # Token color palette
│   ├── examples.ts              # Random / fun / comparison examples
│   ├── export-image.ts          # Canvas-based PNG export
│   ├── share.ts                 # URL hash share encoding
│   ├── i18n.tsx                 # Lightweight i18n provider
│   ├── site-config.ts           # Site identity + series links
│   └── utils.ts                 # cn() helper
└── ...config files
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run start
```

## ▲ Deploy to Vercel

1. Push the repo to GitHub.
2. Import at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Next.js — just click **Deploy**.

No environment variables required.

## 🔗 Part of a Series

Token Explorer is part of the **[Curious About Everything](https://sinigajelasin.vercel.app)** educational series:

| Project | Description | Link |
|---|---|---|
| 🧮 **Everything Becomes Numbers** | Image/Audio/Video → Numbers | [Try it](https://ebn-playground.vercel.app) |
| 🎬 **Video Frame Explorer** | Video → Frames → Pixels | [Try it](https://vfe-playground.vercel.app) |
| 📝 **Text To Binary** | Text → Binary | [Try it](https://ttb-playground.vercel.app) |
| 🧠 **Bias Detector** | Spot cognitive biases | [Try it](https://bd-playground-snowy.vercel.app) |

## 🔒 Privacy

Every file you load is processed entirely in your browser using native web APIs. Nothing is uploaded anywhere.

---

Made with ❤️ by [Arga](https://github.com/m45argaetheth) | [Curious About Everything](https://sinigajelasin.vercel.app) 🔍
