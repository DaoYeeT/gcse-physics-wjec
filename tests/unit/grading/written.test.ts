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
