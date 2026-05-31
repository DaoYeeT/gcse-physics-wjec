import type { Question } from '../content/schema';

export type UserAnswer =
  | { kind: 'mcq'; index: number | null }
  | { kind: 'numeric'; value: number | null; unit: string; working: string }
  | { kind: 'written'; text: string; ticks: number[] }
  | { kind: 'qer6'; text: string; band: 0 | 1 | 2 | 3 };

export interface MarkResult {
  awarded: number;
  total: number;
  perPoint?: { point: string; awarded: number; total: number }[];
  unitPenalty?: boolean;
  modelAnswer?: string;
}

export type Grader = (q: Question, a: UserAnswer) => MarkResult;
