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
