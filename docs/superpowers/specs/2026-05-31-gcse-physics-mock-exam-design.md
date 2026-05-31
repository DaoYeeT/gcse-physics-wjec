# WJEC GCSE Physics Higher — Mock Exam Web App

**Status:** Design approved (delegated technical decisions to Claude per user direction)
**Date:** 2026-05-31
**Spec for:** v1 of an interactive mock-exam web app for WJEC GCSE Physics (Higher Tier), hosted on Vercel.

---

## 1. Overview

A web app that lets a student practice WJEC GCSE Physics (Higher Tier) by:
1. Browsing the full WJEC spec topic-by-topic with a knowledge bank, and drilling questions per topic with instant feedback (**Topic Practice** mode), or
2. Sitting a generated mock paper that **feels like the real WJEC exam**, with timer, mark-scheme reveal only after submission, and a results breakdown (**Full Mock Paper** mode).

The north-star: in Full Mock Paper mode, the experience must be near-indistinguishable from sitting a real WJEC paper — typography, layout, marks-in-margin, lined answer boxes, data booklet, calculator, no instant feedback, free question navigation, hand-in confirmation.

## 2. Goals / Non-goals

### Goals
- Cover the full WJEC GCSE Physics Higher specification (all topics, Higher-only content explicitly flagged).
- Authentic WJEC paper feel in Full Mock Paper mode.
- Deterministic, testable grading for MCQ and numeric answers; honest self-marking against the official-style mark scheme for written answers.
- Zero-ops deploy on Vercel; content (questions + knowledge bank) committed as JSON/MDX in the repo.

### Non-goals (v1)
- User accounts / cross-device sync (user confirmed: unnecessary).
- LLM-graded written answers.
- Mobile-native apps; PWA offline mode.
- Question-author admin UI.
- Spaced repetition algorithms.
- Eduqas (England) spec — focus on WJEC Wales spec only unless the research agent surfaces a strong reason to include both.

## 3. Architecture

**Stack** (all picked by Claude per delegation; not asking user to choose):

| Concern | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15 (App Router, TS) | Vercel-native, RSC for content-heavy routes |
| Styling | Tailwind CSS + a small set of CSS custom properties for paper aesthetics | Fast, no design system overhead |
| Math typesetting | KaTeX (via `rehype-katex`) | Lightweight, deterministic, no MathJax bloat |
| Knowledge cards | MDX (via `@next/mdx`) | Authors write content as Markdown + JSX |
| State persistence | `localStorage` via a tiny typed wrapper | No accounts needed; v1 is single-device |
| Testing | Vitest (units) + Playwright (e2e) | Standard for Next.js |
| Calculator | Built in-house, ~200 LOC scientific calc | Matches the paper's quiet aesthetic; no third-party UI bleeding through |
| Hosting | Vercel zero-config | Per user requirement |

No database. No backend API routes beyond static content delivery. Static export-able.

## 4. Content model

All content lives in `content/` and is committed:

```
content/
  spec.json                   # topic tree, weightings, equations sheet, constants
  questions.json              # full question bank (seeded from research agent)
  knowledge/                  # one MDX per sub-topic
    1-1-electric-circuits.mdx
    1-2-generating-electricity.mdx
    ...
  figures/                    # diagrams referenced by questions
    circuit-q014.svg
    ...
```

### 4.1 `spec.json` shape

```jsonc
{
  "board": "WJEC",
  "qualification": "GCSE Physics (Higher Tier)",
  "specCode": "3420QS",        // confirm via research agent
  "units": [
    {
      "id": "unit-1",
      "title": "Electricity, Energy and Waves",
      "duration_min": 105,     // exam timing for full-mock generation
      "total_marks": 80,
      "topics": [
        {
          "id": "1-1",
          "title": "Electric circuits",
          "weight": 0.10,      // share of paper marks
          "higher_only": false,
          "sub_topics": [
            { "id": "1-1-1", "title": "Current, p.d. and resistance", "higher_only": false },
            { "id": "1-1-2", "title": "Series and parallel circuits",  "higher_only": false }
          ]
        }
      ]
    }
  ],
  "equations_sheet": [
    { "name": "Ohm's law", "latex": "V = IR", "variables": [ ... ] }
  ],
  "constants": [
    { "symbol": "g", "value": 10, "unit": "N/kg", "context": "gravitational field strength near Earth's surface — WJEC uses 10 (not 9.81); printed on the exam paper" }
  ],
  "ao_weights": { "AO1": 0.40, "AO2": 0.40, "AO3": 0.20 }
}
```

(Exact units, topic codes, weights, and equations come from the research agent's `wjec-physics-content-bank.md`.)

### 4.2 Question schema (`questions.json` entries)

```ts
type Question = {
  id: string;                    // e.g. "q-elec-001"
  topic_id: string;              // matches spec.json sub-topic id
  higher_only: boolean;
  type: "mcq" | "numeric" | "short" | "structured" | "qer6";
  prompt: string;                // markdown with $...$ math
  marks: number;
  assessment_objective: "AO1" | "AO2" | "AO3";
  difficulty: 1 | 2 | 3;
  data_provided?: Record<string, string>;   // constants/values given in the question
  figures?: { ref: string; alt: string }[]; // SVG/PNG references
  part_of?: string;              // parent question id, for multi-part questions
  answer_lines?: number;         // override marks-derived height for written boxes

  // type-specific
  options?: string[];                       // mcq
  correct_index?: number;                   // mcq
  answer_value?: number;                    // numeric
  answer_unit?: string;                     // numeric (SI-normalized)
  tolerance_pct?: number;                   // numeric (1-5 typical)
  requires_unit?: boolean;                  // numeric
  working_steps?: string[];                 // numeric (expected working bullets)
  mark_scheme?: MarkPoint[];                // short / structured / qer6
};

type MarkPoint = {
  point: string;       // "Identifies that current is the same through series components"
  marks: number;
  accept?: string[];   // alt phrasings examiners accept
  reject?: string[];   // common wrong answers explicitly rejected
};
```

## 5. Routes & UX

| Route | Purpose | Mode |
|---|---|---|
| `/` | Landing — choose **Topic Practice** or **Full Mock Paper**, recent activity strip | — |
| `/topics` | Topic browser with mastery chips (% from localStorage) | — |
| `/topics/[slug]` | Knowledge card (MDX) + "Start drill" CTA | — |
| `/practice/[slug]` | Drill: one question at a time, instant grading, mark-scheme reveal | Practice |
| `/mock/new` | Mock paper setup (full Unit 1 / Unit 2 / both) → creates session | — |
| `/mock/[sessionId]` | The exam — timed, no feedback, paper aesthetic | **Exam** |
| `/mock/[sessionId]/results` | Per-question review, mark-scheme reveal, breakdown by topic + AO | — |
| `/history` | Past attempts (localStorage) | — |

## 6. Exam-fidelity decisions (Full Mock Paper mode)

This is the section that justifies the whole project — these rules govern `/mock/[sessionId]`.

### Paper aesthetic
- **Typography:** Source Serif (or Charter fallback) for body and question text. Sans-serif (Inter) only for UI chrome (timer, buttons).
- **Page colour:** off-white `#fafaf5`, single-column reading width ~70ch.
- **Question structure:** bold question number (`1.`), parts indented as `(a)`, `(b) (i)`, `(b) (ii)`. Marks right-aligned in margin as `[2]`.
- **Diagrams** render inline as SVG/PNG at fixed sizes per the question's `figures[]`.

### Answer surfaces
- **Written answers:** lined answer area, height = `marks × 22px` (≈1 line per mark, the WJEC heuristic). Lined ruling via `repeating-linear-gradient`. Browser spell-check **disabled** in exam mode (`spellcheck="false"`, `autocorrect="off"`).
- **Numeric questions:** three-cell layout — `Working` (lined textarea) + `Answer` (single-line) + `Unit` (single-line, shown if `requires_unit`).
- **MCQ (rare in WJEC but present):** lettered options `A | B | C | D` with click-target circles.
- **QER 6-mark:** single large lined box (~6 lines). No character counter (real paper has none).

### Persistent exam furniture
- **Top bar (fixed):** paper title, decorative candidate-name field, countdown timer ticking down to 0.
- **Data booklet drawer:** floating button bottom-right opens a slide-up panel with the WJEC equations sheet + constants from `spec.json`.
- **Calculator overlay:** floating button bottom-right opens a draggable minimal scientific calculator (sin/cos/tan, log, ln, x², √, π, exp, parentheses, memory). Built in-house.
- **Question navigator:** collapsible sidebar with numbered grid (1, 2, 3 …); green = answered, grey = blank, blue ring = current. Mirrors real-paper "flick through pages".

### Anti-coaching during the exam
- No instant grading, no green/red, no correctness hints.
- No mark-scheme reveal until submission.
- No tooltips on physics terms.
- No links out of `/mock/[sessionId]`.
- Browser `beforeunload` warns before leaving the page.

### Submit ritual
- "Hand in paper" button → confirmation dialog ("This will end the exam. You cannot make changes after submitting.") → grade + lock + redirect to `/mock/[sessionId]/results`.
- Results page is the **only** surface that shows mark schemes, model answers, scores, and per-topic / per-AO breakdown.

### Topic Practice mode (looser)
- Same paper-feel typography for visual consistency.
- Instant feedback after each question.
- Mark scheme reveal button visible.
- "Why?" link from each marking point into the knowledge card for that sub-topic.

## 7. Grading logic (pure functions, in `lib/grading/`)

All grading is a pure function from `(Question, UserAnswer) → MarkResult`. Located in `lib/grading/` for trivial unit testing.

- **MCQ:** `userAnswer.index === question.correct_index` → full marks else 0.
- **Numeric:** normalize unit (e.g. `m/s` ≡ `m s^-1` ≡ `ms⁻¹`); check `|user - expected| / |expected| ≤ tolerance_pct/100`. If `requires_unit` and unit missing or wrong → cap to 1 mark less than full (matches WJEC convention of awarding most marks for correct method even on unit slip).
- **Short / Structured:** mark scheme reveal with checkboxes per `MarkPoint`; user ticks the points they hit; score = sum of ticked `marks`. The `accept[]` and `reject[]` arrays are shown as guidance to make self-marking honest.
- **QER6 (6-mark extended):** level-descriptor picker — Band 1 (1–2 marks, basic), Band 2 (3–4, mostly clear), Band 3 (5–6, comprehensive). Each band rubric is shown on-screen verbatim from the research agent's findings; user picks the band that best matches.

Result shape:

```ts
type MarkResult = {
  awarded: number;
  total: number;
  perPoint?: { point: string; awarded: number; total: number }[];
  unitPenalty?: boolean;
};
```

## 8. Mock paper generator (`lib/mock-paper/`)

Given `{ units: ["unit-1", "unit-2"] }`:

1. Pull all questions matching those units from `questions.json`.
2. Weight-sample by topic so the mix matches each unit's topic weights from `spec.json`.
3. Target ~80 marks per unit (matches real paper), ~1h45 per unit (configurable, defaults from `spec.json`).
4. Enforce AO mix ~40/40/20 (AO1/AO2/AO3).
5. Sort by topic order to match real-paper structure (not random — real papers progress topic by topic).
6. Return a `MockSession` containing the ordered question IDs + total marks + duration.

Deterministic seeding (`crypto.getRandomValues` → seedable in URL) so a session can be replayed or shared.

## 9. State persistence

LocalStorage with a tiny typed wrapper:

```ts
type SessionState = {
  sessionId: string;
  mode: "practice" | "mock";
  questionIds: string[];
  answers: Record<string, UserAnswer>;
  startedAt: number;
  durationSec: number;
  submittedAt?: number;
};

type ProgressState = {
  byTopic: Record<string, { seen: number; correct: number; lastAttemptAt: number }>;
  attempts: { sessionId: string; mode: string; scorePct: number; finishedAt: number }[];
};
```

Autosave on every input change (debounced 500ms). Resume an in-progress mock on reload.

## 10. Testing strategy

### Unit (Vitest) — target 80%+ on `lib/`
- `lib/grading/*` — full coverage on all four grading functions and unit normalization.
- `lib/mock-paper/*` — weight sampling produces correct distributions over N=1000 trials.
- `lib/storage/*` — round-trip serialization, schema migration shims.

### E2E (Playwright)
- Topic-practice happy path: pick topic → answer 3 questions → mark scheme reveals → progress chip updates.
- Mock-paper happy path: start new mock → answer all questions → submit confirmation → results breakdown renders with correct totals.
- Exam-fidelity checks: timer counts down, calculator opens, data booklet opens, navigator marks answered vs blank, browser warns on leave.

### Visual regression (Playwright screenshots)
- `/mock/[sessionId]` at 1440 width — checks paper aesthetic doesn't regress.

## 11. Build & deploy

- `pnpm` workspace (single package).
- Vercel: zero-config; `pnpm build` → `next build`.
- Content validation: `pnpm content:check` runs Zod schemas against `questions.json` + `spec.json` in CI.
- Preview deploys per PR.

## 12. Repository layout

```
/
├── app/                          # Next.js App Router
│   ├── (marketing)/page.tsx      # landing
│   ├── topics/
│   ├── practice/[slug]/
│   ├── mock/
│   │   ├── new/
│   │   ├── [sessionId]/
│   │   └── [sessionId]/results/
│   └── history/
├── components/
│   ├── question/
│   │   ├── QuestionCard.tsx
│   │   ├── MCQItem.tsx
│   │   ├── NumericItem.tsx
│   │   ├── WrittenItem.tsx
│   │   └── QER6Item.tsx
│   ├── exam/
│   │   ├── Timer.tsx
│   │   ├── DataBookletDrawer.tsx
│   │   ├── Calculator.tsx
│   │   ├── QuestionNavigator.tsx
│   │   └── SubmitConfirm.tsx
│   ├── knowledge/KnowledgeCard.tsx
│   └── results/ResultsBreakdown.tsx
├── lib/
│   ├── grading/
│   ├── mock-paper/
│   ├── storage/
│   └── content/                  # loaders + Zod schemas
├── content/                      # see Section 4
├── research/                     # research agent's outputs (gitignored from build)
├── tests/
│   ├── unit/
│   └── e2e/
└── docs/superpowers/specs/       # this file
```

## 13. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Research agent's content has copyright issues (verbatim past-paper questions) | Agent is instructed to write **original** questions in WJEC style; we will manually spot-check the bank before commit |
| 60 seed questions is thin for a real mock paper | Treat v1 as a content-skeleton; structure makes adding questions trivial (append to `questions.json`); plan a content-expansion sprint after v1 ships |
| Self-marking is dishonest → low learning value | Make mark scheme reveal verbose with `accept`/`reject` lists so the student sees exactly what counts; add an honesty note on first use |
| LocalStorage cleared → progress lost | Add a "Download my progress" JSON export button on `/history`; offer "Import" on the landing page |
| Exam fidelity slips during component re-use | Cordon `app/mock/[sessionId]` and its child components in a dedicated `exam/` folder; lint rule blocks importing UI chrome (nav bar, marketing components) into that subtree |

## 14. Open questions resolved by Claude (per delegation)

- **Calculator: in-house, ~200 LOC** (matches the quiet aesthetic).
- **Spec to target: WJEC Wales** (3420QS Higher Tier, A*–D). Eduqas (England, C420QS) shares ~95% content; flagging at the spec level but not implementing Eduqas-specific variants in v1. The research agent confirmed 10 specified practicals (not 7), AO weighting 40/40/20, equations printed on every paper (no memorisation needed), and WJEC's `g = 10 N/kg` convention.
- **State: localStorage only**; export/import as escape hatch.
- **Styling: Tailwind + CSS custom props** for tokens.
- **MDX for knowledge cards** (not plain MD — we want inline equations and components like `<Diagram />`).

## 15. References

- Research agent output: `research/wjec-physics-content-bank.md` (pending — agent running in background as of design time).
- WJEC GCSE Physics spec: wjec.co.uk (canonical source for spec codes, equations sheet, paper format).
- User instruction record: this project's `memory/` directory (`feedback_exam_fidelity.md`, `project_scope_and_delegation.md`).
