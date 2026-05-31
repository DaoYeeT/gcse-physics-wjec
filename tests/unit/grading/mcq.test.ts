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
