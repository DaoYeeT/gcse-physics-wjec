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
