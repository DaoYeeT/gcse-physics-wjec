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
