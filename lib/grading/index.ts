import type { Question } from '../content/schema';
import { gradeMcq } from './mcq';
import { gradeNumeric } from './numeric';
import { gradeWritten } from './written';
import { gradeQer6 } from './qer6';
import type { MarkResult, UserAnswer } from './types';

export * from './types';
export { BAND_DESCRIPTORS, BAND_MARKS } from './qer6';

export function gradeQuestion(q: Question, a: UserAnswer): MarkResult {
  switch (q.type) {
    case 'mcq': return gradeMcq(q, a);
    case 'numeric': return gradeNumeric(q, a);
    case 'short':
    case 'structured': return gradeWritten(q, a);
    case 'qer6': return gradeQer6(q, a);
  }
}
