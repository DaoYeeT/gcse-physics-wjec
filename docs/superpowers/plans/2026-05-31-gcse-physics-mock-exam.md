# WJEC GCSE Physics Higher Mock Exam — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive WJEC GCSE Physics (Higher Tier) mock-exam web app on Vercel — Topic Practice mode + Full Mock Paper mode that replicates the WJEC paper experience.

**Architecture:** Next.js 15 App Router + TypeScript, Tailwind for styling, KaTeX for math, MDX for knowledge cards. All content (questions, spec tree, knowledge bank) committed as JSON/MDX in `content/`. Grading is pure functions in `lib/grading/`. State persists to `localStorage` via a typed wrapper. No backend.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, MDX, KaTeX (`rehype-katex`), Zod (schema validation), Vitest (unit), Playwright (e2e), pnpm (package manager), Vercel (hosting).

**Inputs:**
- Spec: `docs/superpowers/specs/2026-05-31-gcse-physics-mock-exam-design.md`
- Content research bank: `research/wjec-physics-content-bank.md` (132 KB, 64+ original Higher-tier questions, full topic tree, verbatim QER rubric, equations sheet, constants)

**Working directory throughout:** `C:\Users\daoye\Projects\gcse_physics_wjec`

**Continuation note:** The plan is delivered in phases (0 through 14). Each phase produces working, committable software. Subagent execution should follow phase order; tasks within a phase can be parallelized only where files don't overlap.

---

## Phase 0 — Project Foundation

### Task 0.1: Initialize git repo

**Files:** Create `.gitignore`

- [ ] **Step 1: Initialize git**

```bash
git init && git config core.autocrlf false
```

- [ ] **Step 2: Create `.gitignore`**

```
node_modules/
.pnpm-store/
.next/
out/
dist/
*.tsbuildinfo
.env*.local
.env
coverage/
playwright-report/
test-results/
.playwright/
.vercel/
.DS_Store
Thumbs.db
.vscode/
.idea/
*.swp
research/wjec-spec-raw.txt
research/wjec-sams-raw.txt
```

- [ ] **Step 3: Commit**

```bash
git add .gitignore && git commit -m "chore: initialize repository with gitignore"
```

### Task 0.2: Scaffold Next.js project

**Files:** Create `package.json`, `tsconfig.json`, `next.config.mjs`

- [ ] **Step 1: Create `package.json`** (full content below)

```json
{
  "name": "gcse-physics-wjec",
  "version": "0.1.0",
  "private": true,
  "packageManager": "pnpm@9.12.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "e2e": "playwright test",
    "content:check": "tsx scripts/validate-content.ts",
    "content:seed": "tsx scripts/seed-content.ts"
  },
  "dependencies": {
    "next": "15.0.3",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "@next/mdx": "15.0.3",
    "@mdx-js/loader": "3.1.0",
    "@mdx-js/react": "3.1.0",
    "@types/mdx": "2.0.13",
    "rehype-katex": "7.0.1",
    "remark-math": "6.0.0",
    "katex": "0.16.11",
    "zod": "3.23.8",
    "clsx": "2.1.1"
  },
  "devDependencies": {
    "@types/node": "22.9.0",
    "@types/react": "19.0.0",
    "@types/react-dom": "19.0.0",
    "@playwright/test": "1.49.0",
    "@vitejs/plugin-react": "4.3.3",
    "@vitest/coverage-v8": "2.1.5",
    "autoprefixer": "10.4.20",
    "eslint": "9.15.0",
    "eslint-config-next": "15.0.3",
    "happy-dom": "15.11.0",
    "postcss": "8.4.49",
    "tailwindcss": "3.4.15",
    "tsx": "4.19.2",
    "typescript": "5.6.3",
    "vitest": "2.1.5"
  }
}
```

- [ ] **Step 2: Install**

```bash
pnpm install
```

Expected: install completes; `node_modules/` and `pnpm-lock.yaml` created.

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create `next.config.mjs`**

```js
import createMDX from '@next/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: { remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
};

export default withMDX(nextConfig);
```

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml tsconfig.json next.config.mjs
git commit -m "chore: scaffold Next.js 15 + MDX + KaTeX"
```

### Task 0.3: Tailwind paper-aesthetic tokens

**Files:** Create `tailwind.config.ts`, `postcss.config.mjs`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`

- [ ] **Step 1: Create `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx,md,mdx}', './components/**/*.{ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#fafaf5',
          ink: '#1a1a1a',
          muted: '#6b6b6b',
          rule: '#d9d6cc',
          accent: '#9c2a2a',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Source Serif Pro', 'Charter', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'paper-base': ['1.0625rem', { lineHeight: '1.65' }],
      },
      maxWidth: { paper: '70ch' },
      backgroundImage: {
        lined:
          'repeating-linear-gradient(to bottom, transparent 0, transparent 21px, #d9d6cc 21px, #d9d6cc 22px)',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Create `postcss.config.mjs`**

```js
export default { plugins: { tailwindcss: {}, autoprefixer: {} } };
```

- [ ] **Step 3: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
@import 'katex/dist/katex.min.css';

:root {
  --font-serif: 'Source Serif Pro', Charter, Georgia, serif;
  --font-sans: 'Inter', system-ui, sans-serif;
}

html { color-scheme: light; }
body { background: theme('colors.paper.DEFAULT'); color: theme('colors.paper.ink'); }

.lined-area {
  background-image: theme('backgroundImage.lined');
  background-attachment: local;
  line-height: 22px;
  padding-top: 1px;
}
```

- [ ] **Step 4: Create `app/layout.tsx`**

```tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WJEC GCSE Physics Mock Exam',
  description: 'Interactive mock exam practice for WJEC GCSE Physics Higher Tier',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-serif text-paper-ink">{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Create `app/page.tsx` (placeholder)**

```tsx
export default function Home() {
  return (
    <main className="mx-auto max-w-paper p-8">
      <h1 className="text-4xl font-bold">WJEC GCSE Physics — Higher</h1>
      <p className="mt-4 text-paper-muted">Interactive mock exam practice. Setup in progress.</p>
    </main>
  );
}
```

- [ ] **Step 6: Verify dev server**

```bash
pnpm dev
```

Open `http://localhost:3000` → placeholder renders. Stop with Ctrl+C.

- [ ] **Step 7: Commit**

```bash
git add tailwind.config.ts postcss.config.mjs app/
git commit -m "chore: tailwind paper aesthetic + base layout"
```

### Task 0.4: Vitest harness

**Files:** Create `vitest.config.ts`, `tests/unit/sanity.test.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    include: ['tests/unit/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['lib/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
      thresholds: { lines: 80, statements: 80, functions: 80, branches: 70 },
    },
  },
  resolve: { alias: { '@': path.resolve(__dirname, '.') } },
});
```

- [ ] **Step 2: Create `tests/unit/sanity.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
describe('sanity', () => {
  it('runs vitest', () => { expect(2 + 2).toBe(4); });
});
```

- [ ] **Step 3: Run & commit**

```bash
pnpm test
git add vitest.config.ts tests/
git commit -m "test: vitest harness with sanity test"
```

### Task 0.5: Playwright harness

**Files:** Create `playwright.config.ts`, `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Install browsers**

```bash
pnpm exec playwright install chromium
```

- [ ] **Step 2: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: 'http://localhost:3000', trace: 'on-first-retry' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
```

- [ ] **Step 3: Create `tests/e2e/smoke.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test('landing renders heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('WJEC');
});
```

- [ ] **Step 4: Run & commit**

```bash
pnpm e2e
git add playwright.config.ts tests/
git commit -m "test: playwright harness with landing smoke test"
```

---

## Phase 1 — Content schemas, loaders, and validators

All content is statically typed via Zod. The schemas live in `lib/content/schema.ts` and are the single source of truth for both build-time validation and runtime type guards.

### Task 1.1: Zod schemas for `spec.json`

**Files:** Create `lib/content/schema.ts`, Test `tests/unit/content/spec-schema.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// tests/unit/content/spec-schema.test.ts
import { describe, it, expect } from 'vitest';
import { SpecSchema } from '@/lib/content/schema';

describe('SpecSchema', () => {
  const valid = {
    board: 'WJEC',
    qualification: 'GCSE Physics (Higher Tier)',
    specCode: '3420QS',
    units: [{
      id: 'unit-1',
      title: 'Electricity, Energy and Waves',
      duration_min: 105,
      total_marks: 80,
      topics: [{
        id: '1-1',
        title: 'Electric circuits',
        weight: 0.10,
        higher_only: false,
        sub_topics: [{ id: '1-1-1', title: 'Current, p.d. and resistance', higher_only: false }],
      }],
    }],
    equations_sheet: [{ name: "Ohm's law", latex: 'V = IR', variables: [{ symbol: 'V', name: 'voltage', unit: 'V' }] }],
    constants: [{ symbol: 'g', value: 10, unit: 'N/kg', context: 'WJEC convention' }],
    ao_weights: { AO1: 0.40, AO2: 0.40, AO3: 0.20 },
  };

  it('parses a valid spec', () => {
    expect(() => SpecSchema.parse(valid)).not.toThrow();
  });

  it('rejects ao_weights that do not sum to 1', () => {
    expect(() => SpecSchema.parse({ ...valid, ao_weights: { AO1: 0.5, AO2: 0.5, AO3: 0.5 } })).toThrow();
  });

  it('rejects topic weights outside [0,1]', () => {
    const bad = { ...valid, units: [{ ...valid.units[0], topics: [{ ...valid.units[0].topics[0], weight: 1.5 }] }] };
    expect(() => SpecSchema.parse(bad)).toThrow();
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
pnpm test tests/unit/content/spec-schema.test.ts
```

Expected: FAIL with "Cannot find module '@/lib/content/schema'".

- [ ] **Step 3: Create `lib/content/schema.ts`**

```ts
import { z } from 'zod';

export const VariableSchema = z.object({
  symbol: z.string().min(1),
  name: z.string().min(1),
  unit: z.string(),
});

export const EquationSchema = z.object({
  name: z.string().min(1),
  latex: z.string().min(1),
  variables: z.array(VariableSchema),
  higher_only: z.boolean().optional().default(false),
});

export const ConstantSchema = z.object({
  symbol: z.string().min(1),
  value: z.number(),
  unit: z.string(),
  context: z.string().optional(),
});

export const SubTopicSchema = z.object({
  id: z.string().regex(/^\d-\d+-\d+$/),
  title: z.string().min(1),
  higher_only: z.boolean(),
});

export const TopicSchema = z.object({
  id: z.string().regex(/^\d-\d+$/),
  title: z.string().min(1),
  weight: z.number().min(0).max(1),
  higher_only: z.boolean(),
  sub_topics: z.array(SubTopicSchema).min(1),
});

export const UnitSchema = z.object({
  id: z.string().regex(/^unit-\d+$/),
  title: z.string().min(1),
  duration_min: z.number().int().positive(),
  total_marks: z.number().int().positive(),
  topics: z.array(TopicSchema).min(1),
});

export const AOWeightsSchema = z
  .object({ AO1: z.number(), AO2: z.number(), AO3: z.number() })
  .refine(
    (w) => Math.abs(w.AO1 + w.AO2 + w.AO3 - 1) < 0.001,
    { message: 'AO weights must sum to 1.0' },
  );

export const SpecSchema = z.object({
  board: z.literal('WJEC'),
  qualification: z.string().min(1),
  specCode: z.string().min(1),
  units: z.array(UnitSchema).min(1),
  equations_sheet: z.array(EquationSchema),
  constants: z.array(ConstantSchema),
  ao_weights: AOWeightsSchema,
});

export type Spec = z.infer<typeof SpecSchema>;
export type Unit = z.infer<typeof UnitSchema>;
export type Topic = z.infer<typeof TopicSchema>;
export type SubTopic = z.infer<typeof SubTopicSchema>;
export type Equation = z.infer<typeof EquationSchema>;
export type Constant = z.infer<typeof ConstantSchema>;
```

- [ ] **Step 4: Run — expect PASS**

```bash
pnpm test tests/unit/content/spec-schema.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add lib/content/schema.ts tests/unit/content/
git commit -m "feat(content): zod schema for spec.json"
```

### Task 1.2: Zod schemas for `questions.json`

**Files:** Append to `lib/content/schema.ts`, Test `tests/unit/content/question-schema.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// tests/unit/content/question-schema.test.ts
import { describe, it, expect } from 'vitest';
import { QuestionSchema, QuestionBankSchema } from '@/lib/content/schema';

const mcq = {
  id: 'q-elec-001', topic_id: '1-1-1', higher_only: false, type: 'mcq',
  prompt: 'Which has lowest resistance?', marks: 1,
  assessment_objective: 'AO1', difficulty: 1,
  options: ['copper', 'iron', 'nichrome', 'tungsten'], correct_index: 0,
};
const numeric = {
  id: 'q-elec-002', topic_id: '1-1-1', higher_only: true, type: 'numeric',
  prompt: 'Calculate the resistance.', marks: 3,
  assessment_objective: 'AO2', difficulty: 2,
  answer_value: 12, answer_unit: 'ohm', tolerance_pct: 2, requires_unit: true,
  working_steps: ['R = V/I', 'R = 24/2 = 12 Ω'],
};
const qer6 = {
  id: 'q-elec-099', topic_id: '1-3-1', higher_only: true, type: 'qer6',
  prompt: 'Compare conduction in metals vs non-metals.', marks: 6,
  assessment_objective: 'AO3', difficulty: 3,
  mark_scheme: [{ point: 'Mentions delocalised electrons', marks: 1 }],
};

describe('QuestionSchema', () => {
  it('accepts mcq', () => { expect(() => QuestionSchema.parse(mcq)).not.toThrow(); });
  it('accepts numeric', () => { expect(() => QuestionSchema.parse(numeric)).not.toThrow(); });
  it('accepts qer6', () => { expect(() => QuestionSchema.parse(qer6)).not.toThrow(); });
  it('rejects mcq missing correct_index', () => {
    const bad = { ...mcq, correct_index: undefined };
    expect(() => QuestionSchema.parse(bad)).toThrow();
  });
  it('rejects numeric missing answer_value', () => {
    const bad = { ...numeric, answer_value: undefined };
    expect(() => QuestionSchema.parse(bad)).toThrow();
  });
  it('rejects marks > 6 for qer6', () => {
    const bad = { ...qer6, marks: 8 };
    expect(() => QuestionSchema.parse(bad)).toThrow();
  });
});

describe('QuestionBankSchema', () => {
  it('rejects duplicate ids', () => {
    expect(() => QuestionBankSchema.parse([mcq, { ...numeric, id: 'q-elec-001' }])).toThrow();
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
pnpm test tests/unit/content/question-schema.test.ts
```

- [ ] **Step 3: Append to `lib/content/schema.ts`**

```ts
// add at bottom of lib/content/schema.ts

export const MarkPointSchema = z.object({
  point: z.string().min(1),
  marks: z.number().int().min(1),
  accept: z.array(z.string()).optional(),
  reject: z.array(z.string()).optional(),
});

export const FigureSchema = z.object({
  ref: z.string().min(1),
  alt: z.string().min(1),
});

const QuestionBase = z.object({
  id: z.string().regex(/^q-[a-z0-9-]+$/),
  topic_id: z.string().regex(/^\d-\d+-\d+$/),
  higher_only: z.boolean(),
  prompt: z.string().min(1),
  marks: z.number().int().min(1),
  assessment_objective: z.enum(['AO1', 'AO2', 'AO3']),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  data_provided: z.record(z.string()).optional(),
  figures: z.array(FigureSchema).optional(),
  part_of: z.string().optional(),
  answer_lines: z.number().int().min(1).optional(),
});

const McqSchema = QuestionBase.extend({
  type: z.literal('mcq'),
  options: z.array(z.string().min(1)).length(4),
  correct_index: z.number().int().min(0).max(3),
});

const NumericSchema = QuestionBase.extend({
  type: z.literal('numeric'),
  answer_value: z.number(),
  answer_unit: z.string(),
  tolerance_pct: z.number().min(0).max(20),
  requires_unit: z.boolean().optional().default(true),
  working_steps: z.array(z.string()).optional(),
});

const ShortSchema = QuestionBase.extend({
  type: z.literal('short'),
  mark_scheme: z.array(MarkPointSchema).min(1),
});

const StructuredSchema = QuestionBase.extend({
  type: z.literal('structured'),
  mark_scheme: z.array(MarkPointSchema).min(1),
});

const Qer6Schema = QuestionBase.extend({
  type: z.literal('qer6'),
  marks: z.literal(6),
  mark_scheme: z.array(MarkPointSchema).min(1),
});

export const QuestionSchema = z.discriminatedUnion('type', [
  McqSchema, NumericSchema, ShortSchema, StructuredSchema, Qer6Schema,
]);

export const QuestionBankSchema = z.array(QuestionSchema).superRefine((qs, ctx) => {
  const seen = new Set<string>();
  for (const q of qs) {
    if (seen.has(q.id)) {
      ctx.addIssue({ code: 'custom', message: `duplicate question id: ${q.id}`, path: [q.id] });
    }
    seen.add(q.id);
  }
});

export type Question = z.infer<typeof QuestionSchema>;
export type QuestionBank = z.infer<typeof QuestionBankSchema>;
export type MarkPoint = z.infer<typeof MarkPointSchema>;
export type Figure = z.infer<typeof FigureSchema>;
```

- [ ] **Step 4: Run — expect PASS**

```bash
pnpm test tests/unit/content/question-schema.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add lib/content/schema.ts tests/unit/content/
git commit -m "feat(content): zod schemas for questions.json (discriminated union, dedup)"
```

### Task 1.3: Content loader

**Files:** Create `lib/content/loader.ts`, Test `tests/unit/content/loader.test.ts`, Create `content/spec.json` (minimal), Create `content/questions.json` (minimal seed)

- [ ] **Step 1: Create minimal `content/spec.json` for tests**

```json
{
  "board": "WJEC",
  "qualification": "GCSE Physics (Higher Tier)",
  "specCode": "3420QS",
  "units": [{
    "id": "unit-1", "title": "Electricity, Energy and Waves",
    "duration_min": 105, "total_marks": 80,
    "topics": [{
      "id": "1-1", "title": "Electric circuits", "weight": 0.10, "higher_only": false,
      "sub_topics": [{ "id": "1-1-1", "title": "Current, p.d. and resistance", "higher_only": false }]
    }]
  }],
  "equations_sheet": [{ "name": "Ohm's law", "latex": "V = IR", "variables": [] }],
  "constants": [{ "symbol": "g", "value": 10, "unit": "N/kg", "context": "WJEC convention" }],
  "ao_weights": { "AO1": 0.40, "AO2": 0.40, "AO3": 0.20 }
}
```

- [ ] **Step 2: Create minimal `content/questions.json`**

```json
[
  {
    "id": "q-elec-001", "topic_id": "1-1-1", "higher_only": false, "type": "mcq",
    "prompt": "Which conductor has the lowest resistivity at room temperature?", "marks": 1,
    "assessment_objective": "AO1", "difficulty": 1,
    "options": ["silver", "copper", "iron", "nichrome"], "correct_index": 0
  }
]
```

- [ ] **Step 3: Write failing test**

```ts
// tests/unit/content/loader.test.ts
import { describe, it, expect } from 'vitest';
import { loadSpec, loadQuestions } from '@/lib/content/loader';

describe('content loader', () => {
  it('loads and validates spec', () => {
    const spec = loadSpec();
    expect(spec.board).toBe('WJEC');
    expect(spec.units.length).toBeGreaterThan(0);
  });
  it('loads and validates question bank', () => {
    const qs = loadQuestions();
    expect(qs.length).toBeGreaterThan(0);
    expect(qs[0].id).toMatch(/^q-/);
  });
});
```

- [ ] **Step 4: Run — expect FAIL**

```bash
pnpm test tests/unit/content/loader.test.ts
```

- [ ] **Step 5: Create `lib/content/loader.ts`**

```ts
import { SpecSchema, QuestionBankSchema, type Spec, type QuestionBank } from './schema';
import specJson from '@/content/spec.json';
import questionsJson from '@/content/questions.json';

let cachedSpec: Spec | null = null;
let cachedQuestions: QuestionBank | null = null;

export function loadSpec(): Spec {
  if (cachedSpec) return cachedSpec;
  cachedSpec = SpecSchema.parse(specJson);
  return cachedSpec;
}

export function loadQuestions(): QuestionBank {
  if (cachedQuestions) return cachedQuestions;
  cachedQuestions = QuestionBankSchema.parse(questionsJson);
  return cachedQuestions;
}

export function getQuestionById(id: string) {
  return loadQuestions().find((q) => q.id === id);
}

export function getQuestionsByTopic(topicId: string) {
  return loadQuestions().filter((q) => q.topic_id.startsWith(topicId));
}

export function getSubTopicById(subTopicId: string) {
  for (const unit of loadSpec().units) {
    for (const topic of unit.topics) {
      const st = topic.sub_topics.find((s) => s.id === subTopicId);
      if (st) return { unit, topic, subTopic: st };
    }
  }
  return null;
}
```

- [ ] **Step 6: Run — expect PASS**

```bash
pnpm test tests/unit/content/loader.test.ts
```

- [ ] **Step 7: Commit**

```bash
git add lib/content/ content/ tests/unit/content/
git commit -m "feat(content): loader with minimal seed spec.json + questions.json"
```

### Task 1.4: CLI content validator

**Files:** Create `scripts/validate-content.ts`

- [ ] **Step 1: Create `scripts/validate-content.ts`**

```ts
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SpecSchema, QuestionBankSchema } from '../lib/content/schema';

const root = join(import.meta.dirname, '..', 'content');

function check(file: string, schema: { parse: (x: unknown) => unknown }) {
  const data = JSON.parse(readFileSync(join(root, file), 'utf-8'));
  try {
    schema.parse(data);
    console.log(`OK: ${file}`);
  } catch (e) {
    console.error(`FAIL: ${file}`);
    console.error(e);
    process.exit(1);
  }
}

check('spec.json', SpecSchema);
check('questions.json', QuestionBankSchema);
console.log('All content valid.');
```

- [ ] **Step 2: Run**

```bash
pnpm content:check
```

Expected: `OK: spec.json`, `OK: questions.json`, `All content valid.`, exit 0.

- [ ] **Step 3: Commit**

```bash
git add scripts/validate-content.ts
git commit -m "feat(content): CLI validator script (pnpm content:check)"
```

---

## Phase 2 — Grading library (pure functions, TDD)

All grading is pure: `(question, userAnswer) → MarkResult`. Lives in `lib/grading/` with one file per grader plus a dispatcher.

### Task 2.1: Define `MarkResult` and `UserAnswer` types

**Files:** Create `lib/grading/types.ts`

- [ ] **Step 1: Create `lib/grading/types.ts`**

```ts
import type { Question } from '../content/schema';

export type UserAnswer =
  | { kind: 'mcq'; index: number | null }
  | { kind: 'numeric'; value: number | null; unit: string; working: string }
  | { kind: 'written'; text: string; ticks: number[] }     // ticks: indices of mark_scheme points the user self-marked as hit
  | { kind: 'qer6'; text: string; band: 0 | 1 | 2 | 3 };   // band 0 = "no creditable response"

export interface MarkResult {
  awarded: number;
  total: number;
  perPoint?: { point: string; awarded: number; total: number }[];
  unitPenalty?: boolean;
  modelAnswer?: string;
}

export type Grader = (q: Question, a: UserAnswer) => MarkResult;
```

- [ ] **Step 2: Commit**

```bash
git add lib/grading/types.ts
git commit -m "feat(grading): MarkResult and UserAnswer types"
```

### Task 2.2: MCQ grader

**Files:** Create `lib/grading/mcq.ts`, Test `tests/unit/grading/mcq.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// tests/unit/grading/mcq.test.ts
import { describe, it, expect } from 'vitest';
import { gradeMcq } from '@/lib/grading/mcq';
import type { Question } from '@/lib/content/schema';

const q: Question = {
  id: 'q-1', topic_id: '1-1-1', higher_only: false, type: 'mcq',
  prompt: 'p', marks: 1, assessment_objective: 'AO1', difficulty: 1,
  options: ['a', 'b', 'c', 'd'], correct_index: 2,
};

describe('gradeMcq', () => {
  it('awards full marks for correct index', () => {
    expect(gradeMcq(q, { kind: 'mcq', index: 2 })).toEqual({ awarded: 1, total: 1 });
  });
  it('awards 0 for wrong index', () => {
    expect(gradeMcq(q, { kind: 'mcq', index: 0 })).toEqual({ awarded: 0, total: 1 });
  });
  it('awards 0 for null (no answer)', () => {
    expect(gradeMcq(q, { kind: 'mcq', index: null })).toEqual({ awarded: 0, total: 1 });
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
pnpm test tests/unit/grading/mcq.test.ts
```

- [ ] **Step 3: Create `lib/grading/mcq.ts`**

```ts
import type { Question } from '../content/schema';
import type { MarkResult, UserAnswer } from './types';

export function gradeMcq(q: Question, a: UserAnswer): MarkResult {
  if (q.type !== 'mcq') throw new Error('gradeMcq: not an mcq');
  if (a.kind !== 'mcq') throw new Error('gradeMcq: wrong answer kind');
  return {
    awarded: a.index === q.correct_index ? q.marks : 0,
    total: q.marks,
  };
}
```

- [ ] **Step 4: Run — expect PASS, commit**

```bash
pnpm test tests/unit/grading/mcq.test.ts
git add lib/grading/mcq.ts tests/unit/grading/mcq.test.ts
git commit -m "feat(grading): MCQ grader"
```

### Task 2.3: Unit normalization util

**Files:** Create `lib/grading/units.ts`, Test `tests/unit/grading/units.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// tests/unit/grading/units.test.ts
import { describe, it, expect } from 'vitest';
import { normalizeUnit, unitsEqual } from '@/lib/grading/units';

describe('normalizeUnit', () => {
  it.each([
    ['m/s', 'm s^-1'],
    ['m s-1', 'm s^-1'],
    ['ms^-1', 'm s^-1'],
    ['ms⁻¹', 'm s^-1'],
    ['kg m s^-2', 'kg m s^-2'],
    ['N', 'N'],
    ['  Ω  ', 'ohm'],
    ['ohms', 'ohm'],
    ['Ω', 'ohm'],
    ['m^2', 'm^2'],
    ['m²', 'm^2'],
    ['', ''],
  ])('normalizes %s → %s', (input, expected) => {
    expect(normalizeUnit(input)).toBe(expected);
  });
});

describe('unitsEqual', () => {
  it('treats equivalent forms as equal', () => {
    expect(unitsEqual('m/s', 'm s^-1')).toBe(true);
    expect(unitsEqual('Ω', 'ohm')).toBe(true);
  });
  it('distinguishes different units', () => {
    expect(unitsEqual('N', 'J')).toBe(false);
  });
});
```

- [ ] **Step 2: Create `lib/grading/units.ts`**

```ts
const SUPERSCRIPT_DIGITS: Record<string, string> = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
  '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  '⁻': '-', '⁺': '+',
};

const SYMBOL_MAP: Record<string, string> = {
  'Ω': 'ohm', 'ohms': 'ohm',
};

export function normalizeUnit(raw: string): string {
  let s = raw.trim();
  if (!s) return '';
  // unicode superscripts → ascii
  s = s.replace(/[⁰-⁹⁻⁺]/g, (c) => SUPERSCRIPT_DIGITS[c] ?? c);
  // / → space, then add ^- for the denominator
  s = s.replace(/\s*\/\s*([a-zA-Z]+)(\d+)?/g, (_m, base, exp) => ` ${base}^-${exp ?? '1'}`);
  // ms-1 → m s^-1 (insert space before digit-letter boundaries and ^ before signed exp)
  s = s.replace(/([a-zA-Z])(-?\d+)/g, '$1^$2');
  // ms^-1 → m s^-1 (separate adjacent unit symbols where second is single letter)
  s = s.replace(/^([a-zA-Z])([a-zA-Z])(?=\^|$|\s)/, '$1 $2');
  // collapse whitespace
  s = s.replace(/\s+/g, ' ').trim();
  // symbol substitution
  for (const [from, to] of Object.entries(SYMBOL_MAP)) s = s.split(from).join(to);
  return s;
}

export function unitsEqual(a: string, b: string): boolean {
  return normalizeUnit(a) === normalizeUnit(b);
}
```

- [ ] **Step 3: Run — expect PASS, commit**

```bash
pnpm test tests/unit/grading/units.test.ts
git add lib/grading/units.ts tests/unit/grading/units.test.ts
git commit -m "feat(grading): unit normalization util"
```

### Task 2.4: Numeric grader

**Files:** Create `lib/grading/numeric.ts`, Test `tests/unit/grading/numeric.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// tests/unit/grading/numeric.test.ts
import { describe, it, expect } from 'vitest';
import { gradeNumeric } from '@/lib/grading/numeric';
import type { Question } from '@/lib/content/schema';

const q: Question = {
  id: 'q-2', topic_id: '1-1-1', higher_only: false, type: 'numeric',
  prompt: 'Find R', marks: 3, assessment_objective: 'AO2', difficulty: 2,
  answer_value: 12, answer_unit: 'ohm', tolerance_pct: 2, requires_unit: true,
};

describe('gradeNumeric', () => {
  it('full marks for exact value + correct unit', () => {
    expect(gradeNumeric(q, { kind: 'numeric', value: 12, unit: 'ohm', working: '' }))
      .toEqual({ awarded: 3, total: 3, unitPenalty: false });
  });
  it('full marks within tolerance', () => {
    expect(gradeNumeric(q, { kind: 'numeric', value: 12.2, unit: 'Ω', working: '' }).awarded).toBe(3);
  });
  it('penalty (-1) for missing unit', () => {
    const r = gradeNumeric(q, { kind: 'numeric', value: 12, unit: '', working: '' });
    expect(r.awarded).toBe(2);
    expect(r.unitPenalty).toBe(true);
  });
  it('penalty (-1) for wrong unit', () => {
    const r = gradeNumeric(q, { kind: 'numeric', value: 12, unit: 'volt', working: '' });
    expect(r.awarded).toBe(2);
    expect(r.unitPenalty).toBe(true);
  });
  it('zero for out-of-tolerance value', () => {
    expect(gradeNumeric(q, { kind: 'numeric', value: 50, unit: 'ohm', working: '' }).awarded).toBe(0);
  });
  it('zero for null value', () => {
    expect(gradeNumeric(q, { kind: 'numeric', value: null, unit: 'ohm', working: '' }).awarded).toBe(0);
  });
});
```

- [ ] **Step 2: Create `lib/grading/numeric.ts`**

```ts
import type { Question } from '../content/schema';
import type { MarkResult, UserAnswer } from './types';
import { unitsEqual } from './units';

export function gradeNumeric(q: Question, a: UserAnswer): MarkResult {
  if (q.type !== 'numeric') throw new Error('gradeNumeric: not a numeric');
  if (a.kind !== 'numeric') throw new Error('gradeNumeric: wrong answer kind');

  if (a.value === null || Number.isNaN(a.value)) {
    return { awarded: 0, total: q.marks, unitPenalty: false };
  }

  const tolerance = (q.tolerance_pct / 100) * Math.abs(q.answer_value);
  const valueOk = Math.abs(a.value - q.answer_value) <= tolerance + 1e-9;

  if (!valueOk) return { awarded: 0, total: q.marks, unitPenalty: false };

  const requiresUnit = q.requires_unit ?? true;
  if (!requiresUnit) return { awarded: q.marks, total: q.marks, unitPenalty: false };

  const unitOk = unitsEqual(a.unit, q.answer_unit);
  if (unitOk) return { awarded: q.marks, total: q.marks, unitPenalty: false };
  return { awarded: Math.max(0, q.marks - 1), total: q.marks, unitPenalty: true };
}
```

- [ ] **Step 3: Run — expect PASS, commit**

```bash
pnpm test tests/unit/grading/numeric.test.ts
git add lib/grading/numeric.ts tests/unit/grading/numeric.test.ts
git commit -m "feat(grading): numeric grader with tolerance + unit penalty"
```

### Task 2.5: Written / structured grader (mark-scheme tick)

**Files:** Create `lib/grading/written.ts`, Test `tests/unit/grading/written.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// tests/unit/grading/written.test.ts
import { describe, it, expect } from 'vitest';
import { gradeWritten } from '@/lib/grading/written';
import type { Question } from '@/lib/content/schema';

const q: Question = {
  id: 'q-w', topic_id: '1-3-1', higher_only: false, type: 'short',
  prompt: 'Explain conduction in a metal.', marks: 3,
  assessment_objective: 'AO1', difficulty: 2,
  mark_scheme: [
    { point: 'delocalised / free electrons', marks: 1 },
    { point: 'transfer kinetic energy by collisions', marks: 1 },
    { point: 'positive ions vibrate more / lattice vibration', marks: 1 },
  ],
};

describe('gradeWritten', () => {
  it('sums ticked marking points', () => {
    expect(gradeWritten(q, { kind: 'written', text: '', ticks: [0, 2] }).awarded).toBe(2);
  });
  it('full marks when all ticked', () => {
    expect(gradeWritten(q, { kind: 'written', text: '', ticks: [0, 1, 2] }).awarded).toBe(3);
  });
  it('zero when no ticks', () => {
    expect(gradeWritten(q, { kind: 'written', text: '', ticks: [] }).awarded).toBe(0);
  });
  it('ignores out-of-range ticks', () => {
    expect(gradeWritten(q, { kind: 'written', text: '', ticks: [5, 99] }).awarded).toBe(0);
  });
  it('returns perPoint breakdown', () => {
    const r = gradeWritten(q, { kind: 'written', text: '', ticks: [1] });
    expect(r.perPoint).toEqual([
      { point: 'delocalised / free electrons', awarded: 0, total: 1 },
      { point: 'transfer kinetic energy by collisions', awarded: 1, total: 1 },
      { point: 'positive ions vibrate more / lattice vibration', awarded: 0, total: 1 },
    ]);
  });
});
```

- [ ] **Step 2: Create `lib/grading/written.ts`**

```ts
import type { Question } from '../content/schema';
import type { MarkResult, UserAnswer } from './types';

export function gradeWritten(q: Question, a: UserAnswer): MarkResult {
  if (q.type !== 'short' && q.type !== 'structured') {
    throw new Error('gradeWritten: not a short/structured');
  }
  if (a.kind !== 'written') throw new Error('gradeWritten: wrong answer kind');
  const ms = q.mark_scheme;
  const ticked = new Set(a.ticks);

  let awarded = 0;
  const perPoint = ms.map((p, i) => {
    const got = ticked.has(i) ? p.marks : 0;
    awarded += got;
    return { point: p.point, awarded: got, total: p.marks };
  });

  return { awarded: Math.min(awarded, q.marks), total: q.marks, perPoint };
}
```

- [ ] **Step 3: Run — expect PASS, commit**

```bash
pnpm test tests/unit/grading/written.test.ts
git add lib/grading/written.ts tests/unit/grading/written.test.ts
git commit -m "feat(grading): written/structured grader (self-mark ticks)"
```

### Task 2.6: QER6 grader (band selection)

**Files:** Create `lib/grading/qer6.ts`, Test `tests/unit/grading/qer6.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// tests/unit/grading/qer6.test.ts
import { describe, it, expect } from 'vitest';
import { gradeQer6, BAND_MARKS } from '@/lib/grading/qer6';
import type { Question } from '@/lib/content/schema';

const q: Question = {
  id: 'q-q', topic_id: '1-6-1', higher_only: true, type: 'qer6',
  prompt: 'Compare endoscope and CT scan.', marks: 6,
  assessment_objective: 'AO3', difficulty: 3,
  mark_scheme: [{ point: 'indicative content...', marks: 6 }],
};

describe('gradeQer6', () => {
  it('band 0 → 0 marks', () => { expect(gradeQer6(q, { kind: 'qer6', text: '', band: 0 }).awarded).toBe(0); });
  it('band 1 → 2 marks (top of band)', () => { expect(gradeQer6(q, { kind: 'qer6', text: '', band: 1 }).awarded).toBe(2); });
  it('band 2 → 4 marks', () => { expect(gradeQer6(q, { kind: 'qer6', text: '', band: 2 }).awarded).toBe(4); });
  it('band 3 → 6 marks', () => { expect(gradeQer6(q, { kind: 'qer6', text: '', band: 3 }).awarded).toBe(6); });
  it('BAND_MARKS exposes top-of-band values', () => {
    expect(BAND_MARKS).toEqual({ 0: 0, 1: 2, 2: 4, 3: 6 });
  });
});
```

- [ ] **Step 2: Create `lib/grading/qer6.ts`**

```ts
import type { Question } from '../content/schema';
import type { MarkResult, UserAnswer } from './types';

export const BAND_MARKS = { 0: 0, 1: 2, 2: 4, 3: 6 } as const;

export const BAND_DESCRIPTORS = {
  0: 'No creditable response.',
  1: '1–2 marks: Limited scientific knowledge; ideas are basic and may be partly relevant; little use of specialist terms; communication is unclear.',
  2: '3–4 marks: Sound scientific knowledge of most key ideas; mostly clear and logical with some use of specialist terms; minor errors only.',
  3: '5–6 marks: Comprehensive scientific knowledge across the question; clear, logical and well-structured; correct specialist terms used throughout.',
} as const;

export function gradeQer6(q: Question, a: UserAnswer): MarkResult {
  if (q.type !== 'qer6') throw new Error('gradeQer6: not a qer6');
  if (a.kind !== 'qer6') throw new Error('gradeQer6: wrong answer kind');
  return { awarded: BAND_MARKS[a.band], total: 6 };
}
```

- [ ] **Step 3: Run — expect PASS, commit**

```bash
pnpm test tests/unit/grading/qer6.test.ts
git add lib/grading/qer6.ts tests/unit/grading/qer6.test.ts
git commit -m "feat(grading): QER6 band grader with WJEC level descriptors"
```

### Task 2.7: Grading dispatcher

**Files:** Create `lib/grading/index.ts`, Test `tests/unit/grading/dispatch.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// tests/unit/grading/dispatch.test.ts
import { describe, it, expect } from 'vitest';
import { gradeQuestion } from '@/lib/grading';
import type { Question } from '@/lib/content/schema';

const mcq: Question = {
  id: 'a', topic_id: '1-1-1', higher_only: false, type: 'mcq', prompt: 'p',
  marks: 1, assessment_objective: 'AO1', difficulty: 1, options: ['a','b','c','d'], correct_index: 1,
};

describe('gradeQuestion dispatcher', () => {
  it('dispatches to mcq grader', () => {
    expect(gradeQuestion(mcq, { kind: 'mcq', index: 1 }).awarded).toBe(1);
  });
  it('throws on type/answer mismatch', () => {
    expect(() => gradeQuestion(mcq, { kind: 'written', text: '', ticks: [] })).toThrow();
  });
});
```

- [ ] **Step 2: Create `lib/grading/index.ts`**

```ts
import type { Question } from '../content/schema';
import { gradeMcq } from './mcq';
import { gradeNumeric } from './numeric';
import { gradeWritten } from './written';
import { gradeQer6 } from './qer6';
import type { MarkResult, UserAnswer } from './types';

export * from './types';
export { BAND_DESCRIPTORS, BAND_MARKS } from './qer6';

export function gradeQuestion(q: Question, a: UserAnswer): MarkResult {
  switch (q.type) {
    case 'mcq': return gradeMcq(q, a);
    case 'numeric': return gradeNumeric(q, a);
    case 'short':
    case 'structured': return gradeWritten(q, a);
    case 'qer6': return gradeQer6(q, a);
  }
}
```

- [ ] **Step 3: Run — expect PASS, commit**

```bash
pnpm test tests/unit/grading/dispatch.test.ts
git add lib/grading/index.ts tests/unit/grading/dispatch.test.ts
git commit -m "feat(grading): dispatcher routing by question type"
```

---

## Phase 3 — Mock paper generator

Generates a session from spec topic weights and AO mix. Lives in `lib/mock-paper/`.

### Task 3.1: Seedable RNG

**Files:** Create `lib/mock-paper/rng.ts`, Test `tests/unit/mock-paper/rng.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// tests/unit/mock-paper/rng.test.ts
import { describe, it, expect } from 'vitest';
import { createRng } from '@/lib/mock-paper/rng';

describe('createRng', () => {
  it('same seed → same sequence', () => {
    const a = createRng(42); const b = createRng(42);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });
  it('different seed → different sequence', () => {
    const a = createRng(1); const b = createRng(2);
    expect(a()).not.toEqual(b());
  });
  it('values in [0,1)', () => {
    const r = createRng(7);
    for (let i = 0; i < 100; i++) {
      const v = r();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});
```

- [ ] **Step 2: Create `lib/mock-paper/rng.ts`** (mulberry32, well-known small seedable PRNG)

```ts
export function createRng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickWeighted<T>(items: T[], weights: number[], rng: () => number): T {
  if (items.length !== weights.length) throw new Error('pickWeighted: length mismatch');
  const total = weights.reduce((a, b) => a + b, 0);
  if (total <= 0) throw new Error('pickWeighted: total weight must be > 0');
  let r = rng() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

export function shuffle<T>(items: T[], rng: () => number): T[] {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
```

- [ ] **Step 3: Run — expect PASS, commit**

```bash
pnpm test tests/unit/mock-paper/rng.test.ts
git add lib/mock-paper/rng.ts tests/unit/mock-paper/rng.test.ts
git commit -m "feat(mock-paper): seedable mulberry32 RNG + weighted pick + shuffle"
```

### Task 3.2: Mock paper builder

**Files:** Create `lib/mock-paper/build.ts`, Test `tests/unit/mock-paper/build.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// tests/unit/mock-paper/build.test.ts
import { describe, it, expect } from 'vitest';
import { buildMockPaper } from '@/lib/mock-paper/build';
import type { Spec, QuestionBank } from '@/lib/content/schema';

const spec: Spec = {
  board: 'WJEC', qualification: 'q', specCode: '3420QS',
  units: [{
    id: 'unit-1', title: 'U1', duration_min: 105, total_marks: 80,
    topics: [
      { id: '1-1', title: 't1', weight: 0.5, higher_only: false, sub_topics: [{ id: '1-1-1', title: 'st', higher_only: false }] },
      { id: '1-2', title: 't2', weight: 0.5, higher_only: false, sub_topics: [{ id: '1-2-1', title: 'st', higher_only: false }] },
    ],
  }],
  equations_sheet: [], constants: [], ao_weights: { AO1: 0.4, AO2: 0.4, AO3: 0.2 },
};

const bank: QuestionBank = Array.from({ length: 40 }, (_, i) => ({
  id: `q-${i.toString().padStart(3, '0')}` as const,
  topic_id: (i % 2 === 0 ? '1-1-1' : '1-2-1'),
  higher_only: false, type: 'mcq' as const,
  prompt: 'p', marks: 4, assessment_objective: (['AO1','AO2','AO3'] as const)[i % 3],
  difficulty: 1 as const, options: ['a','b','c','d'], correct_index: 0,
})) as QuestionBank;

describe('buildMockPaper', () => {
  it('returns ~80 marks for unit-1', () => {
    const paper = buildMockPaper({ spec, bank, unitIds: ['unit-1'], seed: 42 });
    expect(paper.totalMarks).toBeGreaterThanOrEqual(76);
    expect(paper.totalMarks).toBeLessThanOrEqual(84);
  });
  it('respects deterministic seed', () => {
    const a = buildMockPaper({ spec, bank, unitIds: ['unit-1'], seed: 42 });
    const b = buildMockPaper({ spec, bank, unitIds: ['unit-1'], seed: 42 });
    expect(a.questionIds).toEqual(b.questionIds);
  });
  it('uses only questions from selected units (topic prefix matches)', () => {
    const paper = buildMockPaper({ spec, bank, unitIds: ['unit-1'], seed: 42 });
    for (const id of paper.questionIds) {
      const q = bank.find((x) => x.id === id)!;
      expect(['1-1-1', '1-2-1']).toContain(q.topic_id);
    }
  });
  it('topic mix is roughly proportional over many seeds', () => {
    const counts = { t1: 0, t2: 0 };
    for (let seed = 0; seed < 200; seed++) {
      const paper = buildMockPaper({ spec, bank, unitIds: ['unit-1'], seed });
      for (const id of paper.questionIds) {
        const q = bank.find((x) => x.id === id)!;
        if (q.topic_id.startsWith('1-1')) counts.t1++; else counts.t2++;
      }
    }
    const total = counts.t1 + counts.t2;
    const ratio = counts.t1 / total;
    expect(ratio).toBeGreaterThan(0.40);
    expect(ratio).toBeLessThan(0.60);
  });
});
```

- [ ] **Step 2: Create `lib/mock-paper/build.ts`**

```ts
import type { Spec, Question, QuestionBank } from '../content/schema';
import { createRng, pickWeighted } from './rng';

export interface MockPaper {
  sessionId: string;
  unitIds: string[];
  seed: number;
  questionIds: string[];
  totalMarks: number;
  durationSec: number;
}

interface BuildArgs {
  spec: Spec;
  bank: QuestionBank;
  unitIds: string[];
  seed: number;
}

export function buildMockPaper({ spec, bank, unitIds, seed }: BuildArgs): MockPaper {
  const rng = createRng(seed);
  const units = spec.units.filter((u) => unitIds.includes(u.id));
  if (!units.length) throw new Error('buildMockPaper: no matching units');

  const targetMarks = units.reduce((a, u) => a + u.total_marks, 0);
  const durationSec = units.reduce((a, u) => a + u.duration_min, 0) * 60;

  const picked: Question[] = [];
  const usedIds = new Set<string>();
  let marks = 0;

  // pool by topic id
  const pool: Record<string, Question[]> = {};
  for (const u of units) {
    for (const t of u.topics) {
      const qs = bank.filter((q) => q.topic_id.startsWith(t.id) && !usedIds.has(q.id));
      pool[t.id] = qs;
    }
  }
  const topicList = units.flatMap((u) => u.topics);

  let attempts = 0;
  const maxAttempts = topicList.length * 200;
  while (marks < targetMarks - 4 && attempts < maxAttempts) {
    attempts++;
    const topic = pickWeighted(topicList, topicList.map((t) => t.weight), rng);
    const candidates = pool[topic.id].filter((q) => !usedIds.has(q.id) && marks + q.marks <= targetMarks + 4);
    if (!candidates.length) continue;
    const q = candidates[Math.floor(rng() * candidates.length)];
    picked.push(q);
    usedIds.add(q.id);
    marks += q.marks;
  }

  // Sort to match real paper: by unit then topic order
  picked.sort((a, b) => a.topic_id.localeCompare(b.topic_id));

  return {
    sessionId: `mock-${Date.now()}-${seed}`,
    unitIds,
    seed,
    questionIds: picked.map((q) => q.id),
    totalMarks: marks,
    durationSec,
  };
}
```

- [ ] **Step 3: Run — expect PASS, commit**

```bash
pnpm test tests/unit/mock-paper/build.test.ts
git add lib/mock-paper/ tests/unit/mock-paper/
git commit -m "feat(mock-paper): builder with topic-weighted sampling and deterministic seed"
```

---

## Phase 4 — Storage layer (localStorage typed wrapper)

### Task 4.1: Typed storage wrapper

**Files:** Create `lib/storage/store.ts`, Test `tests/unit/storage/store.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// tests/unit/storage/store.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { z } from 'zod';
import { createTypedStore } from '@/lib/storage/store';

const Schema = z.object({ count: z.number(), label: z.string() });

describe('createTypedStore', () => {
  beforeEach(() => { localStorage.clear(); });

  it('returns null when key absent', () => {
    const store = createTypedStore('test:thing', Schema);
    expect(store.get()).toBeNull();
  });
  it('round-trips a value', () => {
    const store = createTypedStore('test:thing', Schema);
    store.set({ count: 3, label: 'x' });
    expect(store.get()).toEqual({ count: 3, label: 'x' });
  });
  it('returns null on invalid data', () => {
    localStorage.setItem('test:thing', JSON.stringify({ count: 'oops', label: 'x' }));
    const store = createTypedStore('test:thing', Schema);
    expect(store.get()).toBeNull();
  });
  it('clear removes the key', () => {
    const store = createTypedStore('test:thing', Schema);
    store.set({ count: 1, label: 'a' });
    store.clear();
    expect(store.get()).toBeNull();
  });
});
```

- [ ] **Step 2: Create `lib/storage/store.ts`**

```ts
import type { ZodTypeAny, z } from 'zod';

export interface TypedStore<T> {
  get(): T | null;
  set(value: T): void;
  clear(): void;
}

export function createTypedStore<S extends ZodTypeAny>(
  key: string,
  schema: S,
): TypedStore<z.infer<S>> {
  return {
    get() {
      if (typeof window === 'undefined') return null;
      const raw = window.localStorage.getItem(key);
      if (raw === null) return null;
      try {
        return schema.parse(JSON.parse(raw)) as z.infer<S>;
      } catch {
        return null;
      }
    },
    set(value) {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    clear() {
      if (typeof window === 'undefined') return;
      window.localStorage.removeItem(key);
    },
  };
}
```

- [ ] **Step 3: Run & commit**

```bash
pnpm test tests/unit/storage/store.test.ts
git add lib/storage/store.ts tests/unit/storage/store.test.ts
git commit -m "feat(storage): typed localStorage wrapper"
```

### Task 4.2: Session and Progress schemas + helpers

**Files:** Create `lib/storage/session.ts`, `lib/storage/progress.ts`, Test `tests/unit/storage/session.test.ts`

- [ ] **Step 1: Create `lib/storage/session.ts`**

```ts
import { z } from 'zod';
import { createTypedStore } from './store';

export const UserAnswerSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('mcq'), index: z.number().nullable() }),
  z.object({ kind: z.literal('numeric'), value: z.number().nullable(), unit: z.string(), working: z.string() }),
  z.object({ kind: z.literal('written'), text: z.string(), ticks: z.array(z.number().int()) }),
  z.object({ kind: z.literal('qer6'), text: z.string(), band: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]) }),
]);

export const SessionStateSchema = z.object({
  sessionId: z.string(),
  mode: z.enum(['practice', 'mock']),
  unitIds: z.array(z.string()).optional(),
  questionIds: z.array(z.string()),
  answers: z.record(z.string(), UserAnswerSchema),
  startedAt: z.number(),
  durationSec: z.number(),
  submittedAt: z.number().optional(),
});

export type SessionState = z.infer<typeof SessionStateSchema>;

export function sessionStore(sessionId: string) {
  return createTypedStore(`gcse:session:${sessionId}`, SessionStateSchema);
}

export function listSessionIds(): string[] {
  if (typeof window === 'undefined') return [];
  const out: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const k = window.localStorage.key(i);
    if (k?.startsWith('gcse:session:')) out.push(k.slice('gcse:session:'.length));
  }
  return out;
}
```

- [ ] **Step 2: Create `lib/storage/progress.ts`**

```ts
import { z } from 'zod';
import { createTypedStore } from './store';

export const ProgressStateSchema = z.object({
  byTopic: z.record(z.string(), z.object({
    seen: z.number().int().min(0),
    correct: z.number().int().min(0),
    lastAttemptAt: z.number(),
  })),
  attempts: z.array(z.object({
    sessionId: z.string(),
    mode: z.string(),
    scorePct: z.number(),
    finishedAt: z.number(),
  })),
});

export type ProgressState = z.infer<typeof ProgressStateSchema>;

const progress = createTypedStore('gcse:progress', ProgressStateSchema);

export function getProgress(): ProgressState {
  return progress.get() ?? { byTopic: {}, attempts: [] };
}

export function recordTopicAttempt(topicId: string, correct: boolean) {
  const cur = getProgress();
  const t = cur.byTopic[topicId] ?? { seen: 0, correct: 0, lastAttemptAt: 0 };
  t.seen++;
  if (correct) t.correct++;
  t.lastAttemptAt = Date.now();
  cur.byTopic[topicId] = t;
  progress.set(cur);
}

export function recordAttempt(sessionId: string, mode: string, scorePct: number) {
  const cur = getProgress();
  cur.attempts.push({ sessionId, mode, scorePct, finishedAt: Date.now() });
  progress.set(cur);
}
```

- [ ] **Step 3: Write test for session round-trip**

```ts
// tests/unit/storage/session.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { sessionStore, SessionStateSchema } from '@/lib/storage/session';

describe('sessionStore', () => {
  beforeEach(() => { localStorage.clear(); });

  it('round-trips a practice session', () => {
    const store = sessionStore('abc');
    const state = SessionStateSchema.parse({
      sessionId: 'abc', mode: 'practice',
      questionIds: ['q-1', 'q-2'],
      answers: { 'q-1': { kind: 'mcq', index: 1 } },
      startedAt: 1000, durationSec: 600,
    });
    store.set(state);
    expect(store.get()).toEqual(state);
  });
});
```

- [ ] **Step 4: Run & commit**

```bash
pnpm test tests/unit/storage/
git add lib/storage/ tests/unit/storage/
git commit -m "feat(storage): session + progress stores with zod schemas"
```

---

## Phase 5 — UI primitives & markdown rendering

### Task 5.1: Markdown question prompt renderer with KaTeX

**Files:** Create `components/ui/QuestionPrompt.tsx`

- [ ] **Step 1: Install runtime markdown deps**

```bash
pnpm add react-markdown@9.0.1 remark-gfm@4.0.0
```

- [ ] **Step 2: Create `components/ui/QuestionPrompt.tsx`**

```tsx
'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface Props {
  text: string;
  className?: string;
}

export function QuestionPrompt({ text, className }: Props) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => <p className="my-2">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          code: ({ children }) => <code className="font-mono text-[0.95em]">{children}</code>,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml components/ui/QuestionPrompt.tsx
git commit -m "feat(ui): markdown question prompt with KaTeX support"
```

### Task 5.2: Paper layout shell

**Files:** Create `components/ui/PaperPage.tsx`

- [ ] **Step 1: Create `components/ui/PaperPage.tsx`**

```tsx
import { clsx } from 'clsx';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function PaperPage({ children, className }: Props) {
  return (
    <div className={clsx('mx-auto max-w-paper px-6 py-10 text-paper-base', className)}>
      {children}
    </div>
  );
}

export function QuestionBlock({ number, parts, marks, children }: {
  number: string; parts?: string; marks: number; children: React.ReactNode;
}) {
  return (
    <section className="border-t border-paper-rule pt-6 mt-8 first:border-t-0 first:mt-0 first:pt-0">
      <div className="flex items-baseline gap-3">
        <span className="font-semibold tabular-nums">{number}{parts ? ` ${parts}` : ''}</span>
        <div className="flex-1">{children}</div>
        <span className="text-paper-muted tabular-nums whitespace-nowrap" aria-label={`${marks} marks`}>
          [{marks}]
        </span>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/PaperPage.tsx
git commit -m "feat(ui): paper page shell + question block with marks-in-margin"
```

---

## Phase 6 — Question components

### Task 6.1: `MCQItem`

**Files:** Create `components/question/MCQItem.tsx`

- [ ] **Step 1: Create `components/question/MCQItem.tsx`**

```tsx
'use client';
import { clsx } from 'clsx';
import { QuestionPrompt } from '@/components/ui/QuestionPrompt';
import type { Question } from '@/lib/content/schema';

interface Props {
  question: Extract<Question, { type: 'mcq' }>;
  selectedIndex: number | null;
  onSelect: (i: number) => void;
  disabled?: boolean;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export function MCQItem({ question, selectedIndex, onSelect, disabled }: Props) {
  return (
    <div>
      <QuestionPrompt text={question.prompt} />
      <ul className="mt-4 space-y-2">
        {question.options.map((opt, i) => {
          const selected = selectedIndex === i;
          return (
            <li key={i}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onSelect(i)}
                className={clsx(
                  'flex w-full items-start gap-3 rounded border border-paper-rule p-3 text-left',
                  selected && 'border-paper-ink bg-paper-rule/30',
                  disabled && 'cursor-not-allowed opacity-70',
                )}
              >
                <span
                  className={clsx(
                    'mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-paper-rule font-sans text-sm font-semibold',
                    selected && 'border-paper-ink bg-paper-ink text-paper',
                  )}
                >
                  {LETTERS[i]}
                </span>
                <QuestionPrompt text={opt} className="flex-1" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/question/MCQItem.tsx
git commit -m "feat(question): MCQItem with lettered circle options"
```

### Task 6.2: `NumericItem`

**Files:** Create `components/question/NumericItem.tsx`

- [ ] **Step 1: Create `components/question/NumericItem.tsx`**

```tsx
'use client';
import { QuestionPrompt } from '@/components/ui/QuestionPrompt';
import type { Question } from '@/lib/content/schema';

interface Props {
  question: Extract<Question, { type: 'numeric' }>;
  value: number | null;
  unit: string;
  working: string;
  onChange: (a: { value: number | null; unit: string; working: string }) => void;
  disabled?: boolean;
}

export function NumericItem({ question, value, unit, working, onChange, disabled }: Props) {
  const requiresUnit = question.requires_unit ?? true;
  const workingLines = Math.max(3, Math.min(8, question.marks));

  return (
    <div>
      <QuestionPrompt text={question.prompt} />
      <div className="mt-4 space-y-3">
        <div>
          <label className="block font-sans text-xs uppercase tracking-wide text-paper-muted">Working</label>
          <textarea
            value={working}
            disabled={disabled}
            onChange={(e) => onChange({ value, unit, working: e.target.value })}
            spellCheck={false}
            rows={workingLines}
            className="lined-area mt-1 w-full border border-paper-rule bg-paper p-2 font-serif text-paper-base outline-none focus:border-paper-ink"
          />
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block font-sans text-xs uppercase tracking-wide text-paper-muted">Answer</label>
            <input
              type="number"
              inputMode="decimal"
              step="any"
              value={value ?? ''}
              disabled={disabled}
              onChange={(e) => {
                const raw = e.target.value;
                onChange({ value: raw === '' ? null : Number(raw), unit, working });
              }}
              className="mt-1 w-40 border-b border-paper-ink bg-transparent px-1 py-1 font-serif text-paper-base outline-none"
            />
          </div>
          {requiresUnit && (
            <div>
              <label className="block font-sans text-xs uppercase tracking-wide text-paper-muted">Unit</label>
              <input
                type="text"
                value={unit}
                disabled={disabled}
                onChange={(e) => onChange({ value, unit: e.target.value, working })}
                spellCheck={false}
                className="mt-1 w-32 border-b border-paper-ink bg-transparent px-1 py-1 font-serif text-paper-base outline-none"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/question/NumericItem.tsx
git commit -m "feat(question): NumericItem with working/answer/unit cells"
```

### Task 6.3: `WrittenItem` (short / structured)

**Files:** Create `components/question/WrittenItem.tsx`

- [ ] **Step 1: Create `components/question/WrittenItem.tsx`**

```tsx
'use client';
import { QuestionPrompt } from '@/components/ui/QuestionPrompt';
import type { Question } from '@/lib/content/schema';

interface Props {
  question: Extract<Question, { type: 'short' | 'structured' }>;
  text: string;
  onChange: (text: string) => void;
  disabled?: boolean;
}

export function WrittenItem({ question, text, onChange, disabled }: Props) {
  const lines = question.answer_lines ?? Math.max(2, question.marks);
  return (
    <div>
      <QuestionPrompt text={question.prompt} />
      <textarea
        value={text}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        rows={lines}
        className="lined-area mt-4 w-full border border-paper-rule bg-paper p-2 font-serif text-paper-base outline-none focus:border-paper-ink"
        style={{ minHeight: `${lines * 22 + 8}px` }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/question/WrittenItem.tsx
git commit -m "feat(question): WrittenItem with lined answer box sized by marks"
```

### Task 6.4: `QER6Item`

**Files:** Create `components/question/QER6Item.tsx`

- [ ] **Step 1: Create `components/question/QER6Item.tsx`**

```tsx
'use client';
import { QuestionPrompt } from '@/components/ui/QuestionPrompt';
import type { Question } from '@/lib/content/schema';

interface Props {
  question: Extract<Question, { type: 'qer6' }>;
  text: string;
  onChange: (text: string) => void;
  disabled?: boolean;
}

export function QER6Item({ question, text, onChange, disabled }: Props) {
  return (
    <div>
      <div className="mb-2 inline-block rounded bg-paper-ink px-2 py-0.5 font-sans text-xs uppercase tracking-wide text-paper">
        Quality of extended response — 6 marks
      </div>
      <QuestionPrompt text={question.prompt} />
      <textarea
        value={text}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        rows={8}
        className="lined-area mt-4 w-full border border-paper-rule bg-paper p-2 font-serif text-paper-base outline-none focus:border-paper-ink"
        style={{ minHeight: '184px' }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/question/QER6Item.tsx
git commit -m "feat(question): QER6Item with extended lined box and band label"
```

### Task 6.5: `MarkSchemeReveal` (post-submit self-mark)

**Files:** Create `components/question/MarkSchemeReveal.tsx`

- [ ] **Step 1: Create `components/question/MarkSchemeReveal.tsx`**

```tsx
'use client';
import { clsx } from 'clsx';
import type { MarkPoint } from '@/lib/content/schema';

interface Props {
  markScheme: MarkPoint[];
  ticks: number[];
  onToggle: (i: number) => void;
  totalMarks: number;
}

export function MarkSchemeReveal({ markScheme, ticks, onToggle, totalMarks }: Props) {
  const ticked = new Set(ticks);
  const awarded = markScheme.reduce((a, p, i) => a + (ticked.has(i) ? p.marks : 0), 0);
  return (
    <div className="mt-4 border-l-2 border-paper-accent bg-paper p-4">
      <div className="mb-3 flex items-center justify-between font-sans text-sm">
        <span className="uppercase tracking-wide text-paper-muted">Mark scheme — tick what you wrote</span>
        <span className="font-semibold">{Math.min(awarded, totalMarks)} / {totalMarks}</span>
      </div>
      <ul className="space-y-2">
        {markScheme.map((p, i) => (
          <li key={i} className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={ticked.has(i)}
              onChange={() => onToggle(i)}
              className="mt-1 h-4 w-4 accent-paper-accent"
              id={`ms-${i}`}
            />
            <label htmlFor={`ms-${i}`} className={clsx('flex-1', ticked.has(i) && 'text-paper-ink')}>
              <div className="font-serif">{p.point} <span className="text-paper-muted">[{p.marks}]</span></div>
              {p.accept && p.accept.length > 0 && (
                <div className="mt-0.5 text-xs text-paper-muted">accept: {p.accept.join(' / ')}</div>
              )}
              {p.reject && p.reject.length > 0 && (
                <div className="text-xs text-paper-muted">reject: {p.reject.join(' / ')}</div>
              )}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/question/MarkSchemeReveal.tsx
git commit -m "feat(question): MarkSchemeReveal self-mark UI"
```

### Task 6.6: `BandPicker` for QER6

**Files:** Create `components/question/BandPicker.tsx`

- [ ] **Step 1: Create `components/question/BandPicker.tsx`**

```tsx
'use client';
import { clsx } from 'clsx';
import { BAND_DESCRIPTORS, BAND_MARKS } from '@/lib/grading';

type Band = 0 | 1 | 2 | 3;

interface Props {
  band: Band;
  onSelect: (b: Band) => void;
}

export function BandPicker({ band, onSelect }: Props) {
  return (
    <div className="mt-4 border-l-2 border-paper-accent bg-paper p-4">
      <div className="mb-3 font-sans text-sm uppercase tracking-wide text-paper-muted">
        Self-mark — which band best describes your answer?
      </div>
      <div className="space-y-2">
        {[0, 1, 2, 3].map((b) => {
          const isSelected = band === b;
          return (
            <button
              key={b}
              type="button"
              onClick={() => onSelect(b as Band)}
              className={clsx(
                'block w-full rounded border border-paper-rule p-3 text-left text-sm',
                isSelected && 'border-paper-ink bg-paper-rule/30',
              )}
            >
              <div className="flex items-baseline justify-between font-semibold">
                <span>Band {b}</span>
                <span className="font-sans tabular-nums">{BAND_MARKS[b as Band]} marks</span>
              </div>
              <div className="mt-1 text-paper-ink">{BAND_DESCRIPTORS[b as Band]}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/question/BandPicker.tsx
git commit -m "feat(question): BandPicker exposing WJEC QER level descriptors"
```

### Task 6.7: `QuestionCard` dispatcher

**Files:** Create `components/question/QuestionCard.tsx`

- [ ] **Step 1: Create `components/question/QuestionCard.tsx`**

```tsx
'use client';
import type { Question } from '@/lib/content/schema';
import type { UserAnswer } from '@/lib/grading';
import { MCQItem } from './MCQItem';
import { NumericItem } from './NumericItem';
import { WrittenItem } from './WrittenItem';
import { QER6Item } from './QER6Item';

interface Props {
  question: Question;
  answer: UserAnswer | undefined;
  onChange: (a: UserAnswer) => void;
  disabled?: boolean;
}

export function QuestionCard({ question, answer, onChange, disabled }: Props) {
  switch (question.type) {
    case 'mcq':
      return (
        <MCQItem
          question={question}
          selectedIndex={answer?.kind === 'mcq' ? answer.index : null}
          onSelect={(i) => onChange({ kind: 'mcq', index: i })}
          disabled={disabled}
        />
      );
    case 'numeric': {
      const a = answer?.kind === 'numeric' ? answer : { kind: 'numeric' as const, value: null, unit: '', working: '' };
      return (
        <NumericItem
          question={question}
          value={a.value}
          unit={a.unit}
          working={a.working}
          onChange={(v) => onChange({ kind: 'numeric', ...v })}
          disabled={disabled}
        />
      );
    }
    case 'short':
    case 'structured': {
      const text = answer?.kind === 'written' ? answer.text : '';
      const ticks = answer?.kind === 'written' ? answer.ticks : [];
      return (
        <WrittenItem
          question={question}
          text={text}
          onChange={(t) => onChange({ kind: 'written', text: t, ticks })}
          disabled={disabled}
        />
      );
    }
    case 'qer6': {
      const text = answer?.kind === 'qer6' ? answer.text : '';
      const band = answer?.kind === 'qer6' ? answer.band : 0;
      return (
        <QER6Item
          question={question}
          text={text}
          onChange={(t) => onChange({ kind: 'qer6', text: t, band })}
          disabled={disabled}
        />
      );
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add components/question/QuestionCard.tsx
git commit -m "feat(question): QuestionCard dispatcher routing by type"
```

---

## Phase 7 — Topic Practice mode

### Task 7.1: `/topics` index page

**Files:** Create `app/topics/page.tsx`

- [ ] **Step 1: Create `app/topics/page.tsx`**

```tsx
import Link from 'next/link';
import { loadSpec } from '@/lib/content/loader';
import { PaperPage } from '@/components/ui/PaperPage';

export default function TopicsPage() {
  const spec = loadSpec();
  return (
    <PaperPage>
      <h1 className="text-3xl font-bold">Topics</h1>
      <p className="mt-2 text-paper-muted">Pick a sub-topic to revise and drill.</p>
      <div className="mt-8 space-y-10">
        {spec.units.map((unit) => (
          <section key={unit.id}>
            <h2 className="text-xl font-semibold">{unit.title}</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {unit.topics.flatMap((t) =>
                t.sub_topics.map((st) => (
                  <li key={st.id}>
                    <Link
                      href={`/topics/${st.id}`}
                      className="block rounded border border-paper-rule p-3 hover:border-paper-ink"
                    >
                      <span className="font-mono text-xs text-paper-muted">{st.id}</span>{' '}
                      <span className="font-semibold">{st.title}</span>
                      {st.higher_only && (
                        <span className="ml-2 rounded bg-paper-accent px-1.5 py-0.5 font-sans text-xs uppercase tracking-wide text-paper">
                          Higher only
                        </span>
                      )}
                    </Link>
                  </li>
                )),
              )}
            </ul>
          </section>
        ))}
      </div>
    </PaperPage>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/topics/page.tsx
git commit -m "feat(app): /topics index page listing sub-topics"
```

### Task 7.2: `/topics/[slug]` knowledge card page

**Files:** Create `app/topics/[slug]/page.tsx`, Create `content/knowledge/1-1-1.mdx` (one example; full set is seeded in Phase 12)

- [ ] **Step 1: Create example knowledge card `content/knowledge/1-1-1.mdx`**

```mdx
# 1.1.1 Current, p.d. and resistance

**Key facts**
- Current $I$ is the rate of flow of charge: $I = Q/t$.
- Potential difference $V$ is the energy transferred per unit charge between two points.
- Resistance opposes current; defined by $V = IR$ (Ohm's law for an ohmic conductor).
- The equation list is printed on every paper — you do not have to memorise it.

**Key equations**
- $I = V/R$ (current = voltage / resistance)
- $E = Pt$ (energy = power × time)
- $P = VI$ (power = voltage × current)
- $P = I^2 R$ (Higher only)

**Common misconceptions**
- Voltage is not "used up" round a circuit — energy is transferred at each component.
- Current splits at junctions, but voltage adds round a loop in series.

**Worked example**
A 12 V cell drives 2 A through a resistor. Find the resistance.
$$R = \frac{V}{I} = \frac{12}{2} = 6\ \Omega$$
```

- [ ] **Step 2: Create `app/topics/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSubTopicById } from '@/lib/content/loader';
import { PaperPage } from '@/components/ui/PaperPage';

interface Props { params: Promise<{ slug: string }> }

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const found = getSubTopicById(slug);
  if (!found) notFound();
  const { unit, topic, subTopic } = found;

  let Knowledge: React.ComponentType | null = null;
  try {
    const mod = await import(`@/content/knowledge/${slug}.mdx`);
    Knowledge = mod.default;
  } catch {
    Knowledge = null;
  }

  return (
    <PaperPage>
      <div className="text-xs font-mono text-paper-muted">{unit.title} › {topic.title}</div>
      <h1 className="mt-1 text-3xl font-bold">{subTopic.id} {subTopic.title}</h1>
      <article className="prose prose-paper mt-6 max-w-none">
        {Knowledge ? <Knowledge /> : (
          <p className="text-paper-muted">Knowledge card not yet authored for this sub-topic.</p>
        )}
      </article>
      <div className="mt-8 flex gap-3">
        <Link
          href={`/practice/${slug}`}
          className="rounded bg-paper-ink px-4 py-2 font-sans text-sm font-semibold text-paper"
        >
          Start drill
        </Link>
        <Link href="/topics" className="rounded border border-paper-rule px-4 py-2 font-sans text-sm">
          ← All topics
        </Link>
      </div>
    </PaperPage>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/topics/ content/knowledge/
git commit -m "feat(app): /topics/[slug] knowledge card page with MDX"
```

### Task 7.3: `/practice/[slug]` drill flow

**Files:** Create `app/practice/[slug]/page.tsx`, Create `components/practice/DrillRunner.tsx`

- [ ] **Step 1: Create `app/practice/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation';
import { getQuestionsByTopic, getSubTopicById } from '@/lib/content/loader';
import { PaperPage } from '@/components/ui/PaperPage';
import { DrillRunner } from '@/components/practice/DrillRunner';

interface Props { params: Promise<{ slug: string }> }

export default async function PracticePage({ params }: Props) {
  const { slug } = await params;
  const found = getSubTopicById(slug);
  if (!found) notFound();
  const questions = getQuestionsByTopic(slug);
  if (questions.length === 0) {
    return (
      <PaperPage>
        <h1 className="text-3xl font-bold">{found.subTopic.title}</h1>
        <p className="mt-4 text-paper-muted">No questions yet for this sub-topic.</p>
      </PaperPage>
    );
  }
  return (
    <PaperPage>
      <div className="text-xs font-mono text-paper-muted">Practice — {found.unit.title}</div>
      <h1 className="mt-1 text-3xl font-bold">{found.subTopic.title}</h1>
      <DrillRunner questions={questions} topicId={slug} />
    </PaperPage>
  );
}
```

- [ ] **Step 2: Create `components/practice/DrillRunner.tsx`**

```tsx
'use client';
import { useState } from 'react';
import type { Question } from '@/lib/content/schema';
import type { UserAnswer } from '@/lib/grading';
import { gradeQuestion } from '@/lib/grading';
import { QuestionCard } from '@/components/question/QuestionCard';
import { MarkSchemeReveal } from '@/components/question/MarkSchemeReveal';
import { BandPicker } from '@/components/question/BandPicker';
import { QuestionBlock } from '@/components/ui/PaperPage';
import { recordTopicAttempt } from '@/lib/storage/progress';

interface Props {
  questions: Question[];
  topicId: string;
}

export function DrillRunner({ questions, topicId }: Props) {
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState<UserAnswer | undefined>(undefined);
  const [revealed, setRevealed] = useState(false);
  const q = questions[idx];

  function next() {
    setIdx((i) => Math.min(i + 1, questions.length - 1));
    setAnswer(undefined);
    setRevealed(false);
  }

  function reveal() {
    if (!answer) return;
    const result = gradeQuestion(q, answer);
    recordTopicAttempt(topicId, result.awarded === result.total);
    setRevealed(true);
  }

  const result = revealed && answer ? gradeQuestion(q, answer) : null;

  return (
    <div className="mt-6">
      <div className="mb-4 font-sans text-sm text-paper-muted">
        Question {idx + 1} of {questions.length}
      </div>
      <QuestionBlock number={`${idx + 1}.`} marks={q.marks}>
        <QuestionCard question={q} answer={answer} onChange={setAnswer} disabled={revealed} />
      </QuestionBlock>

      {revealed && q.type === 'mcq' && (
        <div className="mt-4 rounded border-l-2 border-paper-accent bg-paper p-4 font-sans text-sm">
          Correct answer: <strong>{String.fromCharCode(65 + q.correct_index)}</strong> — {q.options[q.correct_index]}
        </div>
      )}

      {revealed && q.type === 'numeric' && (
        <div className="mt-4 rounded border-l-2 border-paper-accent bg-paper p-4 font-serif text-sm">
          <div><strong>Expected:</strong> {q.answer_value} {q.answer_unit} (±{q.tolerance_pct}%)</div>
          {q.working_steps && q.working_steps.length > 0 && (
            <ol className="mt-2 list-decimal pl-5 text-paper-ink">
              {q.working_steps.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          )}
        </div>
      )}

      {revealed && (q.type === 'short' || q.type === 'structured') && answer?.kind === 'written' && (
        <MarkSchemeReveal
          markScheme={q.mark_scheme}
          ticks={answer.ticks}
          onToggle={(i) => {
            const next = new Set(answer.ticks);
            if (next.has(i)) next.delete(i); else next.add(i);
            setAnswer({ kind: 'written', text: answer.text, ticks: [...next].sort() });
          }}
          totalMarks={q.marks}
        />
      )}

      {revealed && q.type === 'qer6' && answer?.kind === 'qer6' && (
        <BandPicker band={answer.band} onSelect={(b) => setAnswer({ kind: 'qer6', text: answer.text, band: b })} />
      )}

      <div className="mt-6 flex items-center gap-3">
        {!revealed ? (
          <button
            type="button"
            disabled={!answer}
            onClick={reveal}
            className="rounded bg-paper-ink px-4 py-2 font-sans text-sm font-semibold text-paper disabled:opacity-50"
          >
            Show mark scheme
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            disabled={idx >= questions.length - 1}
            className="rounded bg-paper-ink px-4 py-2 font-sans text-sm font-semibold text-paper disabled:opacity-50"
          >
            Next question →
          </button>
        )}
        {result && (
          <span className="font-sans text-sm text-paper-muted">
            Awarded: <strong className="text-paper-ink">{result.awarded} / {result.total}</strong>
          </span>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser**

```bash
pnpm dev
```

Visit `http://localhost:3000/topics`, click sub-topic `1-1-1`, click Start drill, answer the seeded MCQ, click Show mark scheme.

- [ ] **Step 4: Commit**

```bash
git add app/practice/ components/practice/
git commit -m "feat(practice): topic drill flow with reveal + record"
```

---

## Phase 8 — Exam UI furniture

### Task 8.1: Timer component

**Files:** Create `components/exam/Timer.tsx`, Test `tests/unit/exam/timer.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// tests/unit/exam/timer.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Timer } from '@/components/exam/Timer';

beforeEach(() => { vi.useFakeTimers(); });
afterEach(() => { vi.useRealTimers(); });

describe('Timer', () => {
  it('counts down each second', () => {
    render(<Timer remainingSec={65} onExpire={() => {}} />);
    expect(screen.getByText('01:05')).toBeTruthy();
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByText('01:04')).toBeTruthy();
  });
  it('calls onExpire at zero', () => {
    const onExpire = vi.fn();
    render(<Timer remainingSec={1} onExpire={onExpire} />);
    act(() => { vi.advanceTimersByTime(2000); });
    expect(onExpire).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Install testing-library**

```bash
pnpm add -D @testing-library/react@16.1.0 @testing-library/dom@10.4.0
```

- [ ] **Step 3: Create `components/exam/Timer.tsx`**

```tsx
'use client';
import { useEffect, useState } from 'react';

interface Props {
  remainingSec: number;
  onExpire: () => void;
}

function format(s: number): string {
  const m = Math.floor(Math.max(0, s) / 60);
  const sec = Math.max(0, s) % 60;
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

export function Timer({ remainingSec, onExpire }: Props) {
  const [sec, setSec] = useState(remainingSec);

  useEffect(() => { setSec(remainingSec); }, [remainingSec]);

  useEffect(() => {
    if (sec <= 0) { onExpire(); return; }
    const id = setInterval(() => setSec((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [sec, onExpire]);

  return (
    <span className="tabular-nums font-mono" role="timer" aria-live="off">
      {format(sec)}
    </span>
  );
}
```

- [ ] **Step 4: Run & commit**

```bash
pnpm test tests/unit/exam/timer.test.tsx
git add package.json pnpm-lock.yaml components/exam/Timer.tsx tests/unit/exam/
git commit -m "feat(exam): Timer component with onExpire callback"
```

### Task 8.2: `DataBookletDrawer`

**Files:** Create `components/exam/DataBookletDrawer.tsx`

- [ ] **Step 1: Create `components/exam/DataBookletDrawer.tsx`**

```tsx
'use client';
import { useState } from 'react';
import { clsx } from 'clsx';
import { loadSpec } from '@/lib/content/loader';

export function DataBookletDrawer() {
  const [open, setOpen] = useState(false);
  const spec = loadSpec();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-30 rounded bg-paper-ink px-3 py-2 font-sans text-xs font-semibold text-paper shadow-lg"
      >
        Data booklet
      </button>
      <div
        className={clsx(
          'fixed inset-x-0 bottom-0 z-40 max-h-[70vh] overflow-auto border-t border-paper-rule bg-paper transition-transform',
          open ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <div className="mx-auto max-w-paper p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Data booklet</h2>
            <button onClick={() => setOpen(false)} className="rounded border border-paper-rule px-3 py-1 font-sans text-xs">
              Close
            </button>
          </div>
          <h3 className="mt-6 font-semibold">Equations</h3>
          <ul className="mt-2 space-y-1">
            {spec.equations_sheet.map((eq, i) => (
              <li key={i} className="font-serif">
                <span className="text-paper-muted">{eq.name}:</span>{' '}
                <span className="font-mono">{eq.latex}</span>
                {eq.higher_only && (
                  <span className="ml-2 rounded bg-paper-accent px-1.5 py-0.5 font-sans text-[0.65rem] uppercase text-paper">H</span>
                )}
              </li>
            ))}
          </ul>
          <h3 className="mt-6 font-semibold">Constants</h3>
          <ul className="mt-2 space-y-1 font-serif">
            {spec.constants.map((c, i) => (
              <li key={i}>
                <span className="font-mono">{c.symbol} = {c.value} {c.unit}</span>
                {c.context && <span className="text-paper-muted"> — {c.context}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/exam/DataBookletDrawer.tsx
git commit -m "feat(exam): DataBookletDrawer reading from spec.json"
```

### Task 8.3: `Calculator` (scientific, in-house)

**Files:** Create `lib/calc/eval.ts`, Create `components/exam/Calculator.tsx`, Test `tests/unit/calc/eval.test.ts`

- [ ] **Step 1: Write failing test for evaluator**

```ts
// tests/unit/calc/eval.test.ts
import { describe, it, expect } from 'vitest';
import { calc } from '@/lib/calc/eval';

describe('calc', () => {
  it.each([
    ['2+3', 5],
    ['2*3+4', 10],
    ['(2+3)*4', 20],
    ['10/4', 2.5],
    ['2^3', 8],
    ['sqrt(9)', 3],
    ['sin(0)', 0],
    ['cos(0)', 1],
    ['pi', Math.PI],
    ['e', Math.E],
    ['log(1000)', 3],
    ['ln(e)', 1],
    ['9.81*0.5', 4.905],
  ])('evaluates %s → %f', (expr, expected) => {
    expect(calc(expr)).toBeCloseTo(expected, 10);
  });

  it('throws on syntax error', () => {
    expect(() => calc('2++')).toThrow();
  });
});
```

- [ ] **Step 2: Create `lib/calc/eval.ts`** (small recursive-descent parser; safe — no `Function`/`eval`)

```ts
const FUNCS: Record<string, (x: number) => number> = {
  sin: Math.sin, cos: Math.cos, tan: Math.tan,
  asin: Math.asin, acos: Math.acos, atan: Math.atan,
  sqrt: Math.sqrt, log: (x) => Math.log10(x), ln: Math.log, exp: Math.exp,
  abs: Math.abs,
};

const CONSTS: Record<string, number> = { pi: Math.PI, e: Math.E };

export function calc(input: string): number {
  let i = 0;
  const s = input.replace(/\s+/g, '');

  function peek(): string { return s[i]; }
  function consume(c: string) {
    if (s[i] !== c) throw new Error(`expected ${c} at ${i}, got ${s[i] ?? 'EOF'}`);
    i++;
  }

  function parseExpr(): number {
    let left = parseTerm();
    while (peek() === '+' || peek() === '-') {
      const op = s[i++];
      const right = parseTerm();
      left = op === '+' ? left + right : left - right;
    }
    return left;
  }
  function parseTerm(): number {
    let left = parseFactor();
    while (peek() === '*' || peek() === '/') {
      const op = s[i++];
      const right = parseFactor();
      left = op === '*' ? left * right : left / right;
    }
    return left;
  }
  function parseFactor(): number {
    let base = parseUnary();
    if (peek() === '^') {
      i++;
      const exp = parseFactor();
      base = Math.pow(base, exp);
    }
    return base;
  }
  function parseUnary(): number {
    if (peek() === '-') { i++; return -parseUnary(); }
    if (peek() === '+') { i++; return parseUnary(); }
    return parseAtom();
  }
  function parseAtom(): number {
    if (peek() === '(') { i++; const v = parseExpr(); consume(')'); return v; }
    if (/[a-z]/i.test(peek() ?? '')) {
      let name = '';
      while (/[a-z]/i.test(s[i] ?? '')) name += s[i++];
      if (peek() === '(') {
        i++; const arg = parseExpr(); consume(')');
        const fn = FUNCS[name.toLowerCase()];
        if (!fn) throw new Error(`unknown function ${name}`);
        return fn(arg);
      }
      const c = CONSTS[name.toLowerCase()];
      if (c === undefined) throw new Error(`unknown identifier ${name}`);
      return c;
    }
    let num = '';
    while (/[0-9.]/.test(s[i] ?? '')) num += s[i++];
    if (!num) throw new Error(`unexpected ${s[i] ?? 'EOF'} at ${i}`);
    return parseFloat(num);
  }

  const result = parseExpr();
  if (i !== s.length) throw new Error(`trailing input at ${i}: '${s.slice(i)}'`);
  return result;
}
```

- [ ] **Step 3: Run & verify evaluator passes**

```bash
pnpm test tests/unit/calc/eval.test.ts
```

- [ ] **Step 4: Create `components/exam/Calculator.tsx`**

```tsx
'use client';
import { useState } from 'react';
import { clsx } from 'clsx';
import { calc } from '@/lib/calc/eval';

const KEYS: { label: string; insert?: string; action?: 'eq' | 'clear' | 'back' }[] = [
  { label: 'C', action: 'clear' }, { label: '⌫', action: 'back' }, { label: '(', insert: '(' }, { label: ')', insert: ')' },
  { label: 'sin', insert: 'sin(' }, { label: 'cos', insert: 'cos(' }, { label: 'tan', insert: 'tan(' }, { label: '^', insert: '^' },
  { label: 'ln', insert: 'ln(' }, { label: 'log', insert: 'log(' }, { label: '√', insert: 'sqrt(' }, { label: 'π', insert: 'pi' },
  { label: '7', insert: '7' }, { label: '8', insert: '8' }, { label: '9', insert: '9' }, { label: '/', insert: '/' },
  { label: '4', insert: '4' }, { label: '5', insert: '5' }, { label: '6', insert: '6' }, { label: '*', insert: '*' },
  { label: '1', insert: '1' }, { label: '2', insert: '2' }, { label: '3', insert: '3' }, { label: '-', insert: '-' },
  { label: '0', insert: '0' }, { label: '.', insert: '.' }, { label: '=', action: 'eq' }, { label: '+', insert: '+' },
];

export function Calculator() {
  const [open, setOpen] = useState(false);
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState<string>('');

  function press(k: typeof KEYS[number]) {
    if (k.action === 'clear') { setExpr(''); setResult(''); return; }
    if (k.action === 'back') { setExpr((e) => e.slice(0, -1)); return; }
    if (k.action === 'eq') {
      try { setResult(String(calc(expr))); } catch { setResult('Error'); }
      return;
    }
    setExpr((e) => e + (k.insert ?? ''));
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-32 z-30 rounded bg-paper-ink px-3 py-2 font-sans text-xs font-semibold text-paper shadow-lg"
      >
        Calculator
      </button>
      {open && (
        <div className="fixed bottom-16 right-4 z-40 w-72 rounded border border-paper-rule bg-paper p-3 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="font-sans text-xs uppercase tracking-wide text-paper-muted">Calculator</div>
            <button onClick={() => setOpen(false)} className="font-sans text-xs">✕</button>
          </div>
          <div className="mt-2 min-h-[3rem] rounded border border-paper-rule bg-white p-2 text-right font-mono">
            <div className="text-sm text-paper-muted">{expr || ' '}</div>
            <div className="text-lg font-semibold">{result || '0'}</div>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-1">
            {KEYS.map((k) => (
              <button
                key={k.label}
                type="button"
                onClick={() => press(k)}
                className={clsx(
                  'rounded border border-paper-rule px-2 py-2 font-mono text-sm hover:bg-paper-rule/30',
                  k.action === 'eq' && 'bg-paper-ink text-paper hover:bg-paper-ink',
                )}
              >
                {k.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add lib/calc/ components/exam/Calculator.tsx tests/unit/calc/
git commit -m "feat(exam): in-house scientific calculator with safe parser"
```

### Task 8.4: `QuestionNavigator`

**Files:** Create `components/exam/QuestionNavigator.tsx`

- [ ] **Step 1: Create `components/exam/QuestionNavigator.tsx`**

```tsx
'use client';
import { clsx } from 'clsx';

interface Props {
  total: number;
  current: number;
  answered: Set<number>;
  onJump: (i: number) => void;
}

export function QuestionNavigator({ total, current, answered, onJump }: Props) {
  return (
    <aside className="sticky top-16 hidden self-start lg:block">
      <div className="font-sans text-xs uppercase tracking-wide text-paper-muted">Questions</div>
      <div className="mt-2 grid grid-cols-5 gap-1">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onJump(i)}
            className={clsx(
              'h-8 w-8 rounded border text-xs tabular-nums',
              current === i && 'ring-2 ring-paper-ink',
              answered.has(i)
                ? 'border-paper-ink bg-paper-ink text-paper'
                : 'border-paper-rule bg-paper text-paper-ink',
            )}
            aria-label={`Go to question ${i + 1}${answered.has(i) ? ', answered' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/exam/QuestionNavigator.tsx
git commit -m "feat(exam): QuestionNavigator with answered/current states"
```

### Task 8.5: `SubmitConfirm` dialog + `useBeforeUnload` hook

**Files:** Create `components/exam/SubmitConfirm.tsx`, Create `lib/hooks/useBeforeUnload.ts`

- [ ] **Step 1: Create `lib/hooks/useBeforeUnload.ts`**

```ts
'use client';
import { useEffect } from 'react';

export function useBeforeUnload(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [active]);
}
```

- [ ] **Step 2: Create `components/exam/SubmitConfirm.tsx`**

```tsx
'use client';
import { useState } from 'react';

interface Props {
  unansweredCount: number;
  onConfirm: () => void;
}

export function SubmitConfirm({ unansweredCount, onConfirm }: Props) {
  const [showing, setShowing] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowing(true)}
        className="rounded bg-paper-accent px-4 py-2 font-sans text-sm font-semibold text-paper"
      >
        Hand in paper
      </button>
      {showing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-paper-ink/40 p-4">
          <div className="max-w-md rounded bg-paper p-6 shadow-2xl">
            <h2 className="text-xl font-bold">Hand in paper?</h2>
            <p className="mt-3 text-sm text-paper-ink">
              This will end the exam. You cannot make changes after submitting.
            </p>
            {unansweredCount > 0 && (
              <p className="mt-2 rounded bg-paper-accent/10 p-2 font-sans text-xs text-paper-accent">
                You have {unansweredCount} unanswered question{unansweredCount === 1 ? '' : 's'}.
              </p>
            )}
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowing(false)}
                className="rounded border border-paper-rule px-3 py-1.5 font-sans text-sm"
              >
                Keep working
              </button>
              <button
                onClick={onConfirm}
                className="rounded bg-paper-accent px-3 py-1.5 font-sans text-sm font-semibold text-paper"
              >
                Submit final
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/exam/SubmitConfirm.tsx lib/hooks/
git commit -m "feat(exam): SubmitConfirm dialog + beforeUnload hook"
```

---

## Phase 9 — Mock Paper mode

### Task 9.1: `/mock/new` setup page

**Files:** Create `app/mock/new/page.tsx`, Create `components/mock/NewMockForm.tsx`

- [ ] **Step 1: Create `components/mock/NewMockForm.tsx`**

```tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Spec } from '@/lib/content/schema';
import { buildMockPaper } from '@/lib/mock-paper/build';
import { loadQuestions } from '@/lib/content/loader';
import { sessionStore } from '@/lib/storage/session';

interface Props { spec: Spec }

export function NewMockForm({ spec }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(spec.units.map((u) => u.id));

  function toggle(id: string) {
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  }

  function start() {
    if (selected.length === 0) return;
    const seed = Math.floor(Math.random() * 1_000_000);
    const paper = buildMockPaper({ spec, bank: loadQuestions(), unitIds: selected, seed });
    sessionStore(paper.sessionId).set({
      sessionId: paper.sessionId,
      mode: 'mock',
      unitIds: paper.unitIds,
      questionIds: paper.questionIds,
      answers: {},
      startedAt: Date.now(),
      durationSec: paper.durationSec,
    });
    router.push(`/mock/${paper.sessionId}`);
  }

  return (
    <div className="mt-6 space-y-4">
      <div>
        <div className="font-sans text-sm uppercase tracking-wide text-paper-muted">Include units</div>
        <div className="mt-2 space-y-2">
          {spec.units.map((u) => (
            <label key={u.id} className="flex items-start gap-3 rounded border border-paper-rule p-3">
              <input
                type="checkbox"
                checked={selected.includes(u.id)}
                onChange={() => toggle(u.id)}
                className="mt-1 h-4 w-4 accent-paper-ink"
              />
              <div>
                <div className="font-semibold">{u.title}</div>
                <div className="text-sm text-paper-muted">
                  {u.duration_min} min · {u.total_marks} marks
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
      <button
        onClick={start}
        disabled={selected.length === 0}
        className="rounded bg-paper-accent px-4 py-2 font-sans text-sm font-semibold text-paper disabled:opacity-50"
      >
        Start exam
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Create `app/mock/new/page.tsx`**

```tsx
import { loadSpec } from '@/lib/content/loader';
import { PaperPage } from '@/components/ui/PaperPage';
import { NewMockForm } from '@/components/mock/NewMockForm';

export default function NewMockPage() {
  const spec = loadSpec();
  return (
    <PaperPage>
      <h1 className="text-3xl font-bold">Start a mock paper</h1>
      <p className="mt-2 text-paper-muted">
        You will sit a timed exam under WJEC conditions: no feedback until you hand in the paper.
        A data booklet and calculator are available throughout.
      </p>
      <NewMockForm spec={spec} />
    </PaperPage>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/mock/new/ components/mock/
git commit -m "feat(mock): setup page that generates a session and routes to it"
```

### Task 9.2: `/mock/[sessionId]` the exam page

**Files:** Create `app/mock/[sessionId]/page.tsx`, Create `components/mock/MockRunner.tsx`

- [ ] **Step 1: Create `app/mock/[sessionId]/page.tsx`**

```tsx
import { loadQuestions } from '@/lib/content/loader';
import { MockRunner } from '@/components/mock/MockRunner';

interface Props { params: Promise<{ sessionId: string }> }

export default async function MockPage({ params }: Props) {
  const { sessionId } = await params;
  const bank = loadQuestions();
  return <MockRunner sessionId={sessionId} bank={bank} />;
}
```

- [ ] **Step 2: Create `components/mock/MockRunner.tsx`**

```tsx
'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Question, QuestionBank } from '@/lib/content/schema';
import { sessionStore, type SessionState } from '@/lib/storage/session';
import type { UserAnswer } from '@/lib/grading';
import { QuestionCard } from '@/components/question/QuestionCard';
import { QuestionBlock } from '@/components/ui/PaperPage';
import { Timer } from '@/components/exam/Timer';
import { DataBookletDrawer } from '@/components/exam/DataBookletDrawer';
import { Calculator } from '@/components/exam/Calculator';
import { QuestionNavigator } from '@/components/exam/QuestionNavigator';
import { SubmitConfirm } from '@/components/exam/SubmitConfirm';
import { useBeforeUnload } from '@/lib/hooks/useBeforeUnload';

interface Props { sessionId: string; bank: QuestionBank }

export function MockRunner({ sessionId, bank }: Props) {
  const router = useRouter();
  const store = useMemo(() => sessionStore(sessionId), [sessionId]);
  const [state, setState] = useState<SessionState | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => { setState(store.get()); }, [store]);
  useBeforeUnload(state !== null && !state.submittedAt);

  if (!state) {
    return <main className="p-10 text-center text-paper-muted">Loading session…</main>;
  }

  const questions: Question[] = state.questionIds.map((id) => bank.find((q) => q.id === id)!).filter(Boolean);
  const q = questions[current];
  const answered = new Set<number>(
    questions
      .map((qq, i) => ({ i, a: state.answers[qq.id] }))
      .filter(({ a }) => isAnswered(a))
      .map(({ i }) => i),
  );
  const unanswered = questions.length - answered.size;
  const remainingSec = Math.max(0, state.durationSec - Math.floor((Date.now() - state.startedAt) / 1000));

  function persistAnswer(a: UserAnswer) {
    const next: SessionState = { ...state!, answers: { ...state!.answers, [q.id]: a } };
    setState(next);
    store.set(next);
  }

  function submit() {
    const next: SessionState = { ...state!, submittedAt: Date.now() };
    store.set(next);
    setState(next);
    router.push(`/mock/${sessionId}/results`);
  }

  return (
    <div className="min-h-screen pb-32">
      <header className="sticky top-0 z-20 border-b border-paper-rule bg-paper">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div>
            <div className="font-sans text-xs uppercase tracking-wide text-paper-muted">
              WJEC GCSE Physics — Higher
            </div>
            <div className="text-sm font-semibold">Candidate: __________________________</div>
          </div>
          <div className="font-sans text-sm">
            Time remaining: <Timer remainingSec={remainingSec} onExpire={submit} />
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl gap-8 px-4 py-8">
        <div className="flex-1">
          <QuestionBlock number={`${current + 1}.`} marks={q.marks}>
            <QuestionCard question={q} answer={state.answers[q.id]} onChange={persistAnswer} />
          </QuestionBlock>
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setCurrent((i) => Math.max(0, i - 1))}
              disabled={current === 0}
              className="rounded border border-paper-rule px-3 py-1.5 font-sans text-sm disabled:opacity-50"
            >
              ← Previous
            </button>
            {current < questions.length - 1 ? (
              <button
                onClick={() => setCurrent((i) => Math.min(questions.length - 1, i + 1))}
                className="rounded bg-paper-ink px-3 py-1.5 font-sans text-sm font-semibold text-paper"
              >
                Next →
              </button>
            ) : (
              <SubmitConfirm unansweredCount={unanswered} onConfirm={submit} />
            )}
          </div>
        </div>
        <QuestionNavigator
          total={questions.length}
          current={current}
          answered={answered}
          onJump={setCurrent}
        />
      </main>

      <DataBookletDrawer />
      <Calculator />
    </div>
  );
}

function isAnswered(a: UserAnswer | undefined): boolean {
  if (!a) return false;
  switch (a.kind) {
    case 'mcq': return a.index !== null;
    case 'numeric': return a.value !== null;
    case 'written': return a.text.trim().length > 0;
    case 'qer6': return a.text.trim().length > 0;
  }
}
```

- [ ] **Step 3: Verify in browser**

```bash
pnpm dev
```

Navigate `/mock/new` → submit form → confirm `/mock/[sessionId]` loads, shows timer, navigator, calculator and data booklet buttons.

- [ ] **Step 4: Commit**

```bash
git add app/mock/[sessionId]/page.tsx components/mock/MockRunner.tsx
git commit -m "feat(mock): exam runner with paper aesthetic, persistence, timer, navigator"
```

---

## Phase 10 — Results page

### Task 10.1: Grade-all helper

**Files:** Create `lib/mock-paper/grade-session.ts`, Test `tests/unit/mock-paper/grade-session.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// tests/unit/mock-paper/grade-session.test.ts
import { describe, it, expect } from 'vitest';
import { gradeSession } from '@/lib/mock-paper/grade-session';
import type { QuestionBank } from '@/lib/content/schema';
import type { SessionState } from '@/lib/storage/session';

const bank: QuestionBank = [
  { id: 'q1', topic_id: '1-1-1', higher_only: false, type: 'mcq', prompt: 'p', marks: 1,
    assessment_objective: 'AO1', difficulty: 1, options: ['a','b','c','d'], correct_index: 0 },
  { id: 'q2', topic_id: '1-1-1', higher_only: false, type: 'mcq', prompt: 'p', marks: 1,
    assessment_objective: 'AO2', difficulty: 1, options: ['a','b','c','d'], correct_index: 2 },
];

const session: SessionState = {
  sessionId: 's', mode: 'mock',
  questionIds: ['q1', 'q2'],
  answers: { q1: { kind: 'mcq', index: 0 }, q2: { kind: 'mcq', index: 1 } },
  startedAt: 0, durationSec: 60, submittedAt: 1,
};

describe('gradeSession', () => {
  it('totals and per-topic / per-AO breakdowns', () => {
    const r = gradeSession({ session, bank });
    expect(r.totalAwarded).toBe(1);
    expect(r.totalMarks).toBe(2);
    expect(r.byTopic['1-1-1']).toEqual({ awarded: 1, total: 2 });
    expect(r.byAO.AO1.awarded).toBe(1);
    expect(r.byAO.AO2.awarded).toBe(0);
  });
});
```

- [ ] **Step 2: Create `lib/mock-paper/grade-session.ts`**

```ts
import { gradeQuestion } from '../grading';
import type { MarkResult, UserAnswer } from '../grading';
import type { QuestionBank, Question } from '../content/schema';
import type { SessionState } from '../storage/session';

export interface SessionResult {
  totalAwarded: number;
  totalMarks: number;
  byTopic: Record<string, { awarded: number; total: number }>;
  byAO: Record<'AO1' | 'AO2' | 'AO3', { awarded: number; total: number }>;
  perQuestion: { question: Question; answer: UserAnswer | undefined; result: MarkResult }[];
}

export function gradeSession({ session, bank }: { session: SessionState; bank: QuestionBank }): SessionResult {
  const byTopic: SessionResult['byTopic'] = {};
  const byAO: SessionResult['byAO'] = {
    AO1: { awarded: 0, total: 0 }, AO2: { awarded: 0, total: 0 }, AO3: { awarded: 0, total: 0 },
  };
  const perQuestion: SessionResult['perQuestion'] = [];
  let totalAwarded = 0; let totalMarks = 0;

  for (const id of session.questionIds) {
    const q = bank.find((x) => x.id === id);
    if (!q) continue;
    const a = session.answers[id];
    const result = a
      ? gradeQuestion(q, a)
      : { awarded: 0, total: q.marks };
    totalAwarded += result.awarded; totalMarks += result.total;

    const topicKey = q.topic_id.split('-').slice(0, 2).join('-');
    byTopic[topicKey] ??= { awarded: 0, total: 0 };
    byTopic[topicKey].awarded += result.awarded; byTopic[topicKey].total += result.total;

    byAO[q.assessment_objective].awarded += result.awarded;
    byAO[q.assessment_objective].total += result.total;

    perQuestion.push({ question: q, answer: a, result });
  }
  return { totalAwarded, totalMarks, byTopic, byAO, perQuestion };
}
```

- [ ] **Step 3: Run & commit**

```bash
pnpm test tests/unit/mock-paper/grade-session.test.ts
git add lib/mock-paper/grade-session.ts tests/unit/mock-paper/grade-session.test.ts
git commit -m "feat(mock): gradeSession aggregates totals + per-topic + per-AO"
```

### Task 10.2: `/mock/[sessionId]/results` page

**Files:** Create `app/mock/[sessionId]/results/page.tsx`, Create `components/results/ResultsBreakdown.tsx`, Create `components/results/PerQuestionReview.tsx`

- [ ] **Step 1: Create `components/results/ResultsBreakdown.tsx`**

```tsx
'use client';
import type { SessionResult } from '@/lib/mock-paper/grade-session';

export function ResultsBreakdown({ result }: { result: SessionResult }) {
  const pct = result.totalMarks === 0 ? 0 : Math.round((result.totalAwarded / result.totalMarks) * 100);
  return (
    <div className="mt-6 rounded border border-paper-rule p-6">
      <div className="text-5xl font-bold tabular-nums">{result.totalAwarded} <span className="text-paper-muted">/ {result.totalMarks}</span></div>
      <div className="text-sm text-paper-muted">{pct}%</div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="font-sans text-xs uppercase tracking-wide text-paper-muted">By topic</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {Object.entries(result.byTopic).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => (
              <li key={k} className="flex justify-between font-mono">
                <span>{k}</span>
                <span className="tabular-nums">{v.awarded} / {v.total}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-sans text-xs uppercase tracking-wide text-paper-muted">By assessment objective</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {(['AO1','AO2','AO3'] as const).map((ao) => (
              <li key={ao} className="flex justify-between">
                <span>{ao}</span>
                <span className="font-mono tabular-nums">{result.byAO[ao].awarded} / {result.byAO[ao].total}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/results/PerQuestionReview.tsx`**

```tsx
'use client';
import { useState } from 'react';
import type { SessionResult } from '@/lib/mock-paper/grade-session';
import { QuestionPrompt } from '@/components/ui/QuestionPrompt';
import { MarkSchemeReveal } from '@/components/question/MarkSchemeReveal';
import { BandPicker } from '@/components/question/BandPicker';

export function PerQuestionReview({ result }: { result: SessionResult }) {
  return (
    <div className="mt-10 space-y-10">
      <h2 className="text-xl font-bold">Per-question review</h2>
      {result.perQuestion.map(({ question, answer, result: r }, i) => (
        <QuestionReviewItem key={question.id} index={i} question={question} answer={answer} result={r} />
      ))}
    </div>
  );
}

function QuestionReviewItem({ index, question, answer, result }: {
  index: number;
  question: SessionResult['perQuestion'][number]['question'];
  answer: SessionResult['perQuestion'][number]['answer'];
  result: SessionResult['perQuestion'][number]['result'];
}) {
  const [ticks, setTicks] = useState<number[]>(answer?.kind === 'written' ? answer.ticks : []);
  const [band, setBand] = useState(answer?.kind === 'qer6' ? answer.band : 0);

  return (
    <section className="border-t border-paper-rule pt-6">
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold">Question {index + 1}</h3>
        <span className="font-mono text-sm tabular-nums">{result.awarded} / {result.total}</span>
      </div>
      <div className="mt-3"><QuestionPrompt text={question.prompt} /></div>

      {question.type === 'mcq' && (
        <div className="mt-3 font-sans text-sm">
          Your answer: {answer?.kind === 'mcq' && answer.index !== null ? String.fromCharCode(65 + answer.index) : '—'}
          {' · '}
          Correct: <strong>{String.fromCharCode(65 + question.correct_index)}</strong> — {question.options[question.correct_index]}
        </div>
      )}

      {question.type === 'numeric' && (
        <div className="mt-3 font-sans text-sm">
          Your answer: {answer?.kind === 'numeric' && answer.value !== null ? `${answer.value} ${answer.unit}` : '—'}
          {' · '}
          Expected: <strong>{question.answer_value} {question.answer_unit}</strong> (±{question.tolerance_pct}%)
          {question.working_steps && (
            <ol className="mt-2 list-decimal pl-5">
              {question.working_steps.map((s, k) => <li key={k}>{s}</li>)}
            </ol>
          )}
        </div>
      )}

      {(question.type === 'short' || question.type === 'structured') && (
        <>
          <pre className="mt-3 whitespace-pre-wrap rounded border border-paper-rule bg-white p-3 font-serif text-sm">
            {answer?.kind === 'written' ? answer.text || '(blank)' : '(blank)'}
          </pre>
          <MarkSchemeReveal
            markScheme={question.mark_scheme}
            ticks={ticks}
            onToggle={(i) => setTicks((t) => t.includes(i) ? t.filter((x) => x !== i) : [...t, i].sort())}
            totalMarks={question.marks}
          />
        </>
      )}

      {question.type === 'qer6' && (
        <>
          <pre className="mt-3 whitespace-pre-wrap rounded border border-paper-rule bg-white p-3 font-serif text-sm">
            {answer?.kind === 'qer6' ? answer.text || '(blank)' : '(blank)'}
          </pre>
          <BandPicker band={band} onSelect={setBand} />
        </>
      )}
    </section>
  );
}
```

- [ ] **Step 3: Create `app/mock/[sessionId]/results/page.tsx`**

```tsx
import { notFound } from 'next/navigation';
import { loadQuestions } from '@/lib/content/loader';
import { PaperPage } from '@/components/ui/PaperPage';
import { ResultsBreakdown } from '@/components/results/ResultsBreakdown';
import { PerQuestionReview } from '@/components/results/PerQuestionReview';
import { ResultsClient } from './ResultsClient';

interface Props { params: Promise<{ sessionId: string }> }

export default async function ResultsPage({ params }: Props) {
  const { sessionId } = await params;
  const bank = loadQuestions();
  return <ResultsClient sessionId={sessionId} bank={bank} />;
}
```

- [ ] **Step 4: Create `app/mock/[sessionId]/results/ResultsClient.tsx`**

```tsx
'use client';
import { useEffect, useState } from 'react';
import type { QuestionBank } from '@/lib/content/schema';
import { sessionStore, type SessionState } from '@/lib/storage/session';
import { gradeSession, type SessionResult } from '@/lib/mock-paper/grade-session';
import { recordAttempt } from '@/lib/storage/progress';
import { PaperPage } from '@/components/ui/PaperPage';
import { ResultsBreakdown } from '@/components/results/ResultsBreakdown';
import { PerQuestionReview } from '@/components/results/PerQuestionReview';

export function ResultsClient({ sessionId, bank }: { sessionId: string; bank: QuestionBank }) {
  const [state, setState] = useState<SessionState | null>(null);
  const [result, setResult] = useState<SessionResult | null>(null);

  useEffect(() => {
    const s = sessionStore(sessionId).get();
    setState(s);
    if (s) {
      const r = gradeSession({ session: s, bank });
      setResult(r);
      const pct = r.totalMarks === 0 ? 0 : (r.totalAwarded / r.totalMarks) * 100;
      recordAttempt(sessionId, s.mode, pct);
    }
  }, [sessionId, bank]);

  if (!state || !result) {
    return <PaperPage><p className="text-paper-muted">Loading results…</p></PaperPage>;
  }

  return (
    <PaperPage>
      <div className="font-sans text-xs uppercase tracking-wide text-paper-muted">Results · session {sessionId}</div>
      <h1 className="mt-1 text-3xl font-bold">Your paper</h1>
      <ResultsBreakdown result={result} />
      <PerQuestionReview result={result} />
    </PaperPage>
  );
}
```

- [ ] **Step 5: Verify, commit**

```bash
pnpm dev
# Sit a mock paper through to submission, confirm results page renders.
git add app/mock/[sessionId]/results/ components/results/
git commit -m "feat(mock): results page with breakdown + per-question review"
```

---

## Phase 11 — Landing, History, Navigation

### Task 11.1: Replace landing placeholder

**Files:** Modify `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import Link from 'next/link';
import { PaperPage } from '@/components/ui/PaperPage';

export default function Home() {
  return (
    <PaperPage>
      <div className="font-sans text-xs uppercase tracking-wide text-paper-muted">WJEC GCSE Physics · Higher Tier</div>
      <h1 className="mt-2 text-5xl font-bold leading-tight">Sit the paper.</h1>
      <p className="mt-4 max-w-prose text-paper-base text-paper-muted">
        Practice WJEC GCSE Physics topic-by-topic, then sit a generated mock paper under exam conditions —
        timer, data booklet, calculator. No feedback until you hand it in.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link href="/mock/new" className="block rounded border border-paper-rule p-6 hover:border-paper-ink">
          <div className="font-sans text-xs uppercase tracking-wide text-paper-muted">Full mock paper</div>
          <div className="mt-2 text-xl font-semibold">Timed exam, 80–160 marks</div>
          <p className="mt-2 text-sm text-paper-muted">
            WJEC paper layout, marks in margin, lined answer boxes, hand-in confirmation.
          </p>
        </Link>
        <Link href="/topics" className="block rounded border border-paper-rule p-6 hover:border-paper-ink">
          <div className="font-sans text-xs uppercase tracking-wide text-paper-muted">Topic practice</div>
          <div className="mt-2 text-xl font-semibold">Drill one sub-topic</div>
          <p className="mt-2 text-sm text-paper-muted">
            Instant feedback, mark scheme reveal, knowledge cards.
          </p>
        </Link>
      </div>
      <div className="mt-10 text-sm">
        <Link href="/history" className="font-sans text-paper-muted hover:text-paper-ink">View past attempts →</Link>
      </div>
    </PaperPage>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat(app): landing page with mode picker"
```

### Task 11.2: `/history` page

**Files:** Create `app/history/page.tsx`, Create `components/history/HistoryList.tsx`

- [ ] **Step 1: Create `components/history/HistoryList.tsx`**

```tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProgress, type ProgressState } from '@/lib/storage/progress';

export function HistoryList() {
  const [progress, setProgress] = useState<ProgressState | null>(null);
  useEffect(() => { setProgress(getProgress()); }, []);
  if (!progress) return null;

  if (progress.attempts.length === 0) {
    return <p className="mt-6 text-paper-muted">No past attempts yet.</p>;
  }

  return (
    <ul className="mt-6 space-y-2">
      {progress.attempts.slice().reverse().map((a) => (
        <li key={a.sessionId} className="flex items-center justify-between rounded border border-paper-rule p-3">
          <div>
            <div className="font-sans text-xs uppercase tracking-wide text-paper-muted">{a.mode}</div>
            <div className="font-semibold">{new Date(a.finishedAt).toLocaleString()}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-mono text-lg tabular-nums">{Math.round(a.scorePct)}%</div>
            {a.mode === 'mock' && (
              <Link
                href={`/mock/${a.sessionId}/results`}
                className="rounded border border-paper-rule px-3 py-1 font-sans text-xs"
              >
                View
              </Link>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 2: Create `app/history/page.tsx`**

```tsx
import { PaperPage } from '@/components/ui/PaperPage';
import { HistoryList } from '@/components/history/HistoryList';

export default function HistoryPage() {
  return (
    <PaperPage>
      <h1 className="text-3xl font-bold">History</h1>
      <p className="mt-2 text-paper-muted">Your past topic drills and mock papers (stored on this device).</p>
      <HistoryList />
    </PaperPage>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/history/ components/history/
git commit -m "feat(app): /history page with attempts list"
```

---

## Phase 12 — Content seeding from research

This phase ports the research agent's output to live content files. The research file is structured: knowledge cards in prose with one MDX-friendly card per sub-topic, and a single fenced ```json``` block at the bottom containing the question array. We script the import to keep it reproducible.

### Task 12.1: Spec seed script

**Files:** Create `scripts/seed-spec.ts`

- [ ] **Step 1: Build authoritative `content/spec.json` by hand from `research/wjec-physics-content-bank.md` §2 (Specification structure). Use these exact values (verbatim from the research bank):

  - `board`: "WJEC"
  - `qualification`: "GCSE Physics (Higher Tier)"
  - `specCode`: "3420QS"
  - Unit 1 "Electricity, Energy and Waves": `duration_min: 105`, `total_marks: 80`, 9 topics (codes 1.1 through 1.9 — see §2.3)
  - Unit 2 "Forces, Space and Radioactivity": `duration_min: 105`, `total_marks: 80`, 9 topics (codes 2.1 through 2.9 — see §2.4)
  - `ao_weights`: `{ AO1: 0.40, AO2: 0.40, AO3: 0.20 }` (research bank §2.2)
  - `equations_sheet`: copy from research bank §2.6 — include the Higher additions with `higher_only: true`
  - `constants`: include at minimum `g = 10 N/kg` (WJEC convention, research bank §2.6), `c = 3×10⁸ m s⁻¹`, `c_water = 4200 J kg⁻¹ K⁻¹`

  Topic weights are not in the spec itself — derive them from the research bank's "Mock paper composition" section, normalizing per unit to sum to 1.0. If the research bank does not give per-topic weights, default each topic to `1 / (number of topics in unit)`.

  Replace the placeholder `content/spec.json` with the full authored file.

- [ ] **Step 2: Validate**

```bash
pnpm content:check
```

Expected: `OK: spec.json`, exits 0.

- [ ] **Step 3: Commit**

```bash
git add content/spec.json
git commit -m "content(spec): full WJEC topic tree, equations sheet, constants from research"
```

### Task 12.2: Question bank seed script

**Files:** Create `scripts/seed-questions.ts`

- [ ] **Step 1: Create `scripts/seed-questions.ts`**

```ts
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { QuestionBankSchema } from '../lib/content/schema';

const research = readFileSync(join(import.meta.dirname, '..', 'research', 'wjec-physics-content-bank.md'), 'utf-8');

// Find the LAST fenced ```json``` block (the question bank, per research format).
const re = /```json\s*([\s\S]*?)\s*```/g;
let lastMatch: RegExpExecArray | null = null;
let m: RegExpExecArray | null;
while ((m = re.exec(research)) !== null) lastMatch = m;
if (!lastMatch) { console.error('No JSON block found in research file.'); process.exit(1); }

const parsed = JSON.parse(lastMatch[1]);
const validated = QuestionBankSchema.parse(parsed);

const out = join(import.meta.dirname, '..', 'content', 'questions.json');
writeFileSync(out, JSON.stringify(validated, null, 2));
console.log(`Wrote ${validated.length} questions to ${out}`);
```

- [ ] **Step 2: Run**

```bash
pnpm tsx scripts/seed-questions.ts
```

Expected: `Wrote 64 questions to content/questions.json` (or however many the research bank actually contains).

- [ ] **Step 3: Run content check**

```bash
pnpm content:check
```

Expected: both files OK. If schema mismatches surface, fix the seed script's transformations (likely candidates: rename research keys to schema keys, normalize unit strings via `normalizeUnit`, ensure `type` discriminator is correct) — DO NOT change the schema to fit the research output, since the schema is the contract.

- [ ] **Step 4: Commit**

```bash
git add scripts/seed-questions.ts content/questions.json
git commit -m "content(questions): seed 64+ original Higher-tier questions from research"
```

### Task 12.3: Knowledge cards seed

**Files:** Create `content/knowledge/{sub-topic-id}.mdx` for every sub-topic in `spec.json`

- [ ] **Step 1: For each sub-topic id in `content/spec.json` (e.g. `1-1-1`, `1-1-2`, ..., `2-9-X`), create one MDX file at `content/knowledge/{id}.mdx` with the structure from `research/wjec-physics-content-bank.md` §4 (Knowledge bank — per topic). The research file gives one knowledge card per **sub-topic group** (e.g. 1.1 Electric circuits as a whole). Split this card across sub-topics where the research card explicitly distinguishes them; otherwise reproduce the same card content under each sub-topic in that group.

  Each MDX file must follow this skeleton:

  ```mdx
  # <id> <Title>

  **Key facts**
  - bullet 1
  - bullet 2

  **Key equations**
  - $V = IR$ (Ohm's law)

  **Common misconceptions**
  - misconception

  **Worked example**
  Worked example body. Use `$$ ... $$` for display math.
  ```

  Inline math uses `$...$`; display math uses `$$...$$`. Keep facts in the same wording as the research bank (it cites the WJEC spec). Higher-only content should be tagged inline with `**(Higher only)**`.

- [ ] **Step 2: Verify all sub-topic MDX files render**

```bash
pnpm dev
```

Walk `/topics`, click each sub-topic, ensure the knowledge card loads.

- [ ] **Step 3: Commit**

```bash
git add content/knowledge/
git commit -m "content(knowledge): MDX knowledge cards for all sub-topics"
```

---

## Phase 13 — E2E tests for exam fidelity

### Task 13.1: Practice-mode happy path

**Files:** Create `tests/e2e/practice.spec.ts`

- [ ] **Step 1: Create `tests/e2e/practice.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test('topic practice happy path', async ({ page }) => {
  await page.goto('/topics');
  await page.getByRole('link', { name: /1-1-1/i }).first().click();
  await page.getByRole('link', { name: /Start drill/i }).click();
  // The MCQ should be present
  await expect(page.getByRole('button', { name: /^[ABCD]/ }).first()).toBeVisible();
  await page.getByRole('button', { name: /^A/ }).click();
  await page.getByRole('button', { name: /Show mark scheme/i }).click();
  await expect(page.getByText(/Awarded:/)).toBeVisible();
});
```

- [ ] **Step 2: Commit**

```bash
git add tests/e2e/practice.spec.ts
git commit -m "test(e2e): topic practice happy path"
```

### Task 13.2: Mock-paper happy path

**Files:** Create `tests/e2e/mock.spec.ts`

- [ ] **Step 1: Create `tests/e2e/mock.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test('mock paper happy path', async ({ page }) => {
  await page.goto('/mock/new');
  await page.getByRole('button', { name: /Start exam/i }).click();
  await expect(page).toHaveURL(/\/mock\//);
  await expect(page.getByRole('timer')).toBeVisible();

  // Data booklet & calculator both accessible
  await page.getByRole('button', { name: 'Data booklet' }).click();
  await expect(page.getByRole('heading', { name: 'Data booklet' })).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();

  await page.getByRole('button', { name: 'Calculator' }).click();
  await expect(page.getByText('Calculator', { exact: false })).toBeVisible();

  // Submit
  await page.getByRole('button', { name: /Hand in paper/ }).click();
  await page.getByRole('button', { name: /Submit final/ }).click();
  await expect(page).toHaveURL(/\/results/);
  await expect(page.getByRole('heading', { name: 'Your paper' })).toBeVisible();
});
```

- [ ] **Step 2: Run all e2e**

```bash
pnpm e2e
```

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/mock.spec.ts
git commit -m "test(e2e): mock paper flow incl. data booklet, calculator, submit"
```

### Task 13.3: Visual regression for `/mock`

**Files:** Modify `tests/e2e/mock.spec.ts` — append visual snapshot

- [ ] **Step 1: Append to `tests/e2e/mock.spec.ts`**

```ts
test('mock exam visual snapshot at 1440 width', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1024 });
  await page.goto('/mock/new');
  await page.getByRole('button', { name: /Start exam/i }).click();
  // Mask the timer (dynamic)
  await expect(page).toHaveScreenshot('mock-exam-1440.png', {
    mask: [page.getByRole('timer')],
    maxDiffPixelRatio: 0.02,
  });
});
```

- [ ] **Step 2: Generate baseline & commit**

```bash
pnpm e2e --update-snapshots
git add tests/e2e/mock.spec.ts tests/e2e/mock.spec.ts-snapshots/
git commit -m "test(visual): baseline screenshot for /mock at 1440 width"
```

---

## Phase 14 — Deploy

### Task 14.1: Vercel readiness check

**Files:** Create `vercel.json`, `README.md`

- [ ] **Step 1: Create `vercel.json`**

```json
{
  "buildCommand": "pnpm build",
  "framework": "nextjs",
  "installCommand": "pnpm install --frozen-lockfile"
}
```

- [ ] **Step 2: Create `README.md`**

```md
# WJEC GCSE Physics Higher — Mock Exam

Interactive practice tool for **WJEC GCSE Physics (Higher Tier, 3420QS)**.
Two modes: timed Full Mock Paper (WJEC paper aesthetic, no feedback until submission) and Topic Practice (drill with instant feedback).

## Local dev

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Useful scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Next.js dev server |
| `pnpm build` | Production build |
| `pnpm test` | Vitest unit tests |
| `pnpm test:coverage` | Vitest with coverage |
| `pnpm e2e` | Playwright e2e tests (boots dev server) |
| `pnpm content:check` | Validate `content/spec.json` and `content/questions.json` against Zod schemas |
| `pnpm tsx scripts/seed-questions.ts` | Re-extract the question bank from `research/wjec-physics-content-bank.md` |

## Deployment

Push to a connected Vercel project; the included `vercel.json` configures pnpm + the Next.js framework preset. No environment variables required.

## Content

- `content/spec.json` — full WJEC Higher Tier topic tree, equations sheet, constants
- `content/questions.json` — question bank (Zod-validated)
- `content/knowledge/*.mdx` — one knowledge card per sub-topic
- `research/wjec-physics-content-bank.md` — upstream research used to seed `content/`

## License

Content original; not affiliated with WJEC. All exam-format details are based on the public WJEC GCSE Physics specification (3420QS, version 2 March 2019).
```

- [ ] **Step 3: Final build check**

```bash
pnpm typecheck
pnpm build
```

Expected: clean type check, build succeeds.

- [ ] **Step 4: Commit**

```bash
git add vercel.json README.md
git commit -m "chore: vercel config + readme"
```

### Task 14.2: Push to remote and deploy

- [ ] **Step 1: Create remote and push**

```bash
gh repo create gcse-physics-wjec --public --source=. --remote=origin --push
```

- [ ] **Step 2: Connect to Vercel** (one-time, manual)

Visit https://vercel.com/new, import the `gcse-physics-wjec` repo. Framework auto-detects Next.js; `vercel.json` is already in place. Trigger first deploy.

- [ ] **Step 3: Verify the deployed URL** — sit a short mock paper end-to-end, confirm timer + data booklet + calculator + results all work.

---

## Self-review checklist

**Spec coverage:** Each spec section maps to at least one task —

| Spec section | Tasks |
|---|---|
| §3 Architecture (Next.js, MDX, KaTeX, Tailwind, Zod) | 0.2, 0.3, 5.1 |
| §4 Content model (spec.json, questions.json, MDX) | 1.1, 1.2, 1.3, 12.1, 12.2, 12.3 |
| §5 Routes & UX | 7.1, 7.2, 7.3, 9.1, 9.2, 10.2, 11.1, 11.2 |
| §6 Exam-fidelity decisions (paper aesthetic, answer surfaces, furniture, anti-coaching, submit ritual, practice mode) | 0.3 (tokens), 5.2 (paper layout), 6.* (question surfaces), 8.1–8.5 (furniture), 9.2 (anti-coaching layout), SubmitConfirm in 8.5 |
| §7 Grading logic | 2.1–2.7 |
| §8 Mock paper generator | 3.1, 3.2 |
| §9 State persistence | 4.1, 4.2 |
| §10 Testing strategy | 0.4, 0.5, all `tests/unit/**` per phase, 13.1, 13.2, 13.3 |
| §11 Build & deploy | 14.1, 14.2 |
| §12 Repo layout | 0.* establishes the structure; subsequent tasks fill it |
| §13 Risks & mitigations | Content validation (1.4) + ESLint cordon to be added if scope expands |

**Placeholder scan:** Every code step shows complete code. The two natural-language steps in Phase 12 (12.1 hand-authoring spec.json values, 12.3 generating MDX for every sub-topic) reference exact research-bank sections — they are deterministic transcriptions, not invented content.

**Type consistency check:** `UserAnswer`, `MarkResult`, `Question`, `SessionState`, `SessionResult` use the same property names everywhere. `gradeQuestion` name matches across `lib/grading/index.ts`, `DrillRunner.tsx`, and `grade-session.ts`. `sessionStore(id)` signature consistent.

**Known follow-up work (out of v1, intentionally):**
- Eduqas (England) variant
- LLM-graded written answers
- Export/import progress JSON (mitigates localStorage-wipe risk from spec §13)
- Question-author admin UI
- Spaced repetition

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-31-gcse-physics-mock-exam.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — I execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?

