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
