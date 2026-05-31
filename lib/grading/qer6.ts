import type { Question } from '../content/schema';
import type { MarkResult, UserAnswer } from './types';

export const BAND_MARKS = { 0: 0, 1: 2, 2: 4, 3: 6 } as const;

export const BAND_DESCRIPTORS = {
  0: 'No creditable response.',
  1: '1–2 marks: Limited scientific knowledge; ideas are basic and may be partly relevant; little use of specialist terms; communication is unclear.',
  2: '3–4 marks: Sound scientific knowledge of most key ideas; mostly clear and logical with some use of specialist terms; minor errors only.',
  3: '5–6 marks: Comprehensive scientific knowledge across the question; clear, logical and well-structured; correct specialist terms used throughout.',
} as const;

export function gradeQer6(q: Question, a: UserAnswer): MarkResult {
  if (q.type !== 'qer6') throw new Error('gradeQer6: not a qer6');
  if (a.kind !== 'qer6') throw new Error('gradeQer6: wrong answer kind');
  return { awarded: BAND_MARKS[a.band], total: 6 };
}
