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
    expect(r.byTopic['1-1']).toEqual({ awarded: 1, total: 2 });
    expect(r.byAO.AO1.awarded).toBe(1);
    expect(r.byAO.AO2.awarded).toBe(0);
  });
});
