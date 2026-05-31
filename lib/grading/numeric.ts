import type { Question } from '../content/schema';
import type { MarkResult, UserAnswer } from './types';
import { unitsEqual } from './units';

export function gradeNumeric(q: Question, a: UserAnswer): MarkResult {
  if (q.type !== 'numeric') throw new Error('gradeNumeric: not a numeric');
  if (a.kind !== 'numeric') throw new Error('gradeNumeric: wrong answer kind');

  if (a.value === null || Number.isNaN(a.value)) {
    return { awarded: 0, total: q.marks, unitPenalty: false };
  }

  const tolerance = (q.tolerance_pct / 100) * Math.abs(q.answer_value);
  const valueOk = Math.abs(a.value - q.answer_value) <= tolerance + 1e-9;

  if (!valueOk) return { awarded: 0, total: q.marks, unitPenalty: false };

  const requiresUnit = q.requires_unit ?? true;
  if (!requiresUnit) return { awarded: q.marks, total: q.marks, unitPenalty: false };

  const unitOk = unitsEqual(a.unit, q.answer_unit);
  if (unitOk) return { awarded: q.marks, total: q.marks, unitPenalty: false };
  return { awarded: Math.max(0, q.marks - 1), total: q.marks, unitPenalty: true };
}
