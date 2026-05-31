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
