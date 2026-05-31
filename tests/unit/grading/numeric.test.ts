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
