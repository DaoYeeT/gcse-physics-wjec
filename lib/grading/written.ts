import type { Question } from '../content/schema';
import type { MarkResult, UserAnswer } from './types';

export function gradeWritten(q: Question, a: UserAnswer): MarkResult {
  if (q.type !== 'short' && q.type !== 'structured') {
    throw new Error('gradeWritten: not a short/structured');
  }
  if (a.kind !== 'written') throw new Error('gradeWritten: wrong answer kind');
  const ms = q.mark_scheme;
  const ticked = new Set(a.ticks);

  let awarded = 0;
  const perPoint = ms.map((p, i) => {
    const got = ticked.has(i) ? p.marks : 0;
    awarded += got;
    return { point: p.point, awarded: got, total: p.marks };
  });

  return { awarded: Math.min(awarded, q.marks), total: q.marks, perPoint };
}
