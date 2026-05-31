/**
 * Seed the question bank from the research file.
 *
 * Transformations applied to the raw research JSON block to match
 * lib/content/schema.ts:
 *
 *  1. `topic` (e.g. "1.1 Electric circuits") → `topic_id` (e.g. "1-1-1").
 *     We map the leading dotted spec code to the matching sub-topic id in
 *     content/spec.json (each topic in this build has a single sub-topic).
 *
 *  2. QER6 mark schemes: the research file uses an object with
 *     `indicative_content`, `level_descriptors`, `key_terms_expected`.
 *     The Zod schema requires `mark_scheme` to be an array of `MarkPoint`
 *     objects. We convert each level descriptor into a MarkPoint, plus
 *     one MarkPoint capturing the indicative content as a long form
 *     "point" (1 mark) so the array is non-empty and the rubric is
 *     preserved. Key terms are appended to the indicative-content
 *     MarkPoint's `accept` list.
 *
 *  3. Extra fields (`maths`, `practical`, `topic`) are stripped by Zod's
 *     default object behaviour.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { QuestionBankSchema } from '../lib/content/schema';

const here = import.meta.dirname ?? dirname(fileURLToPath(import.meta.url));
const research = readFileSync(
  join(here, '..', 'research', 'wjec-physics-content-bank.md'),
  'utf-8',
);

const re = /```json\s*([\s\S]*?)\s*```/g;
let lastMatch: RegExpExecArray | null = null;
let m: RegExpExecArray | null;
while ((m = re.exec(research)) !== null) lastMatch = m;
if (!lastMatch) {
  console.error('No JSON block found in research file.');
  process.exit(1);
}

interface RawQuestion {
  id: string;
  topic?: string;
  topic_id?: string;
  higher_only: boolean;
  type: string;
  prompt: string;
  marks: number;
  assessment_objective: string;
  difficulty: number;
  options?: string[];
  correct_index?: number;
  data_provided?: Record<string, string>;
  answer_value?: number;
  answer_unit?: string;
  tolerance_pct?: number;
  working_steps?: string[];
  mark_scheme?: unknown;
  [key: string]: unknown;
}

interface LevelDescriptor {
  level: number;
  marks_range: string;
  criteria: string;
}

interface Qer6MarkSchemeObject {
  indicative_content: string;
  level_descriptors: LevelDescriptor[];
  key_terms_expected?: string[];
}

const raw = JSON.parse(lastMatch[1]) as RawQuestion[];

// Map dotted topic prefix → sub-topic id. Each topic in this build has one
// sub-topic with id "<unit>-<topic>-1" (so 1.1 → 1-1-1, 2.9 → 2-9-1, etc.).
function topicCodeToSubTopicId(topic: string | undefined): string {
  if (!topic) throw new Error('Missing topic field on raw question');
  const codeMatch = /^(\d+)\.(\d+)/.exec(topic);
  if (!codeMatch) throw new Error(`Cannot parse topic code from: "${topic}"`);
  return `${codeMatch[1]}-${codeMatch[2]}-1`;
}

const transformed = raw.map((q) => {
  const out: RawQuestion = { ...q };

  // (1) topic → topic_id
  out.topic_id = topicCodeToSubTopicId(q.topic);
  delete out.topic;

  // (2) QER6 mark_scheme transform
  if (q.type === 'qer6' && q.mark_scheme && !Array.isArray(q.mark_scheme)) {
    const ms = q.mark_scheme as Qer6MarkSchemeObject;
    const keyTerms = ms.key_terms_expected ?? [];
    const indicative = {
      point: `Indicative content: ${ms.indicative_content}`.slice(0, 1500),
      marks: 1,
      accept: keyTerms,
      reject: [],
    };
    const levelPoints = ms.level_descriptors
      .filter((d) => d.level >= 1)
      .map((d) => {
        // For schema validity each mark point has integer marks ≥ 1.
        // Pick the lower bound of the range as the "minimum marks" anchor.
        const lower = parseInt(d.marks_range.split('-')[0], 10) || 1;
        return {
          point: `Level ${d.level} (${d.marks_range} marks): ${d.criteria}`,
          marks: lower,
          accept: [],
          reject: [],
        };
      });
    out.mark_scheme = [indicative, ...levelPoints];
  }

  return out;
});

const validated = QuestionBankSchema.parse(transformed);

const out = join(here, '..', 'content', 'questions.json');
writeFileSync(out, JSON.stringify(validated, null, 2) + '\n');
console.log(`Wrote ${validated.length} questions to ${out}`);
