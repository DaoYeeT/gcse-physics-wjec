# WJEC GCSE Physics Higher — Mock Exam

Interactive practice tool for **WJEC GCSE Physics (Higher Tier, 3420QS)**.

Two modes:

- **Full Mock Paper** — timed (1h45 per unit), WJEC paper aesthetic, marks in margin, lined answer boxes, no feedback until you hand in.
- **Topic Practice** — drill a sub-topic with instant feedback, mark scheme reveal, and knowledge cards.

Built with Next.js 15 + TypeScript + Tailwind + MDX + KaTeX. Hosted on Vercel.

## Quick start

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Next.js dev server |
| `pnpm build` | Production build |
| `pnpm typecheck` | TypeScript check |
| `pnpm lint` | ESLint |
| `pnpm test` | Vitest unit tests |
| `pnpm test:coverage` | Vitest with V8 coverage |
| `pnpm e2e` | Playwright end-to-end tests |
| `pnpm content:check` | Validate `content/spec.json` and `content/questions.json` against Zod schemas |
| `pnpm tsx scripts/seed-questions.ts` | Re-extract the question bank from `research/wjec-physics-content-bank.md` |

## Content

All exam content is committed in `content/`:

- `content/spec.json` — full WJEC Higher Tier topic tree, equations sheet (Foundation + Higher-only), constants (incl. `g = 10 N/kg` per WJEC convention)
- `content/questions.json` — 84 original Higher-tier questions across all 18 sub-topics
- `content/knowledge/*.mdx` — one knowledge card per sub-topic, with KaTeX math and worked examples

The upstream `research/wjec-physics-content-bank.md` (132 KB) is the citation-grounded source used to seed `content/`. Re-running `pnpm tsx scripts/seed-questions.ts` rebuilds `content/questions.json` from it.

## Architecture

- App Router (Next.js 15) with React 19
- Pure-function grading in `lib/grading/` (MCQ, numeric with unit normalization, written self-mark, QER6 band picker)
- Seedable mock-paper generator in `lib/mock-paper/`
- All state in `localStorage` via a typed wrapper in `lib/storage/` (no backend)
- Paper aesthetic via Tailwind tokens (`paper`, `paper-ink`, `paper-rule`, `paper-accent`)

## Deploy

Push to a Vercel-connected repository. The `vercel.json` config sets pnpm + the Next.js framework preset. No environment variables required.

## License

App and question content are original. The exam-format details follow the public WJEC GCSE Physics specification (3420QS, version 2 March 2019). Not affiliated with WJEC.
