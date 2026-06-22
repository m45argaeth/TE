# Token Explorer

> Humans read words. AI reads tokens.

An educational playground that helps you understand how Large Language Models
(LLMs) process text using **tokens**. Paste any sentence and watch it split into
colorful token blocks, with live stats, comparisons, animations and the model's
“point of view” — all running 100% in your browser.

## ✨ Features

- **Landing page** with an animated sentence → tokens hero.
- **Playground** — a large text area with Analyze / Random Example / Clear.
- **Tokenization view** — hoverable, clickable token blocks. Click a token to
  inspect its text, character count, simulated token ID and UTF-8 bytes.
- **Stats panel** — characters, words, tokens, estimated (simulated) AI cost,
  reading time and token density.
- **AI perspective mode** — “Humans see” vs “AI sees”, plus the
  Sentence → Tokens → Embeddings → Prediction pipeline.
- **Token animation** — smooth text-splitting animation.
- **Educational insights** — auto-generated explanations about your text.
- **Comparison mode** — side-by-side token counts (e.g. `Hello` vs
  `Antidisestablishmentarianism`) with an explanation.
- **Fun mode** — “Token Surprises” like `strawberry`.
- **Share features** — Copy result, Share link (encodes text in the URL hash),
  and Export as PNG (dependency-free canvas render).
- **Dark mode** toggle (light mode default), subtle animations and beautiful
  loading states.

## 🧠 About the tokenizer

This app ships with a **simulated** tokenizer (`lib/tokenizer.ts`). It mimics the
intuition of GPT-style byte-pair encoding — attaching leading spaces to words,
keeping common words whole, and splitting rare/long words into sub-word pieces —
but it is **not** a real BPE model. Token IDs and costs are illustrative and
meant for learning. Real tokenizers vary by model.

Want real counts? You can later swap the implementation of `tokenize()` for a
library such as [`gpt-tokenizer`](https://www.npmjs.com/package/gpt-tokenizer)
or [`js-tiktoken`](https://www.npmjs.com/package/js-tiktoken) — the rest of the
UI consumes the same `Token` interface.

## 🛠 Tech stack

- [Next.js 15](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui-style components (Radix primitives)
- `next-themes` for dark mode
- No database — fully client-side

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open http://localhost:3000
```

### Build for production

```bash
npm run build
npm run start
```

## ▲ Deploy to Vercel

This project is Vercel-ready with zero configuration:

1. Push the repo to GitHub/GitLab/Bitbucket.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Next.js — just click **Deploy**.

No environment variables are required.

## 📁 Project structure

```
token-explorer/
├── app/
│   ├── globals.css        # Tailwind + design tokens (light/dark)
│   ├── layout.tsx         # Root layout, fonts, theme + header/footer
│   ├── page.tsx           # Landing page
│   └── playground/
│       └── page.tsx       # Playground route
├── components/
│   ├── ui/                # shadcn-style primitives (button, card, tabs, ...)
│   ├── hero.tsx
│   ├── playground.tsx     # Main interactive orchestrator
│   ├── tokenization-view.tsx
│   ├── token-block.tsx
│   ├── token-detail.tsx
│   ├── stats-panel.tsx
│   ├── ai-perspective.tsx
│   ├── token-animation.tsx
│   ├── educational-insights.tsx
│   ├── comparison-mode.tsx
│   ├── fun-mode.tsx
│   ├── share-features.tsx
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── lib/
│   ├── tokenizer.ts       # Simulated tokenizer + stats
│   ├── token-colors.ts    # Token color palette
│   ├── examples.ts        # Random / fun / comparison examples
│   ├── export-image.ts    # Canvas-based PNG export
│   ├── share.ts           # URL hash share encoding
│   └── utils.ts           # cn() helper
└── ...config files
```

## 📄 License

MIT — use it freely for learning and teaching.
