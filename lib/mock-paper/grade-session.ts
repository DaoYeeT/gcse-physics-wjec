import { gradeQuestion } from '../grading';
import type { MarkResult, UserAnswer } from '../grading';
import type { QuestionBank, Question } from '../content/schema';
import type { SessionState } from '../storage/session';

export interface SessionResult {
  totalAwarded: number;
  totalMarks: number;
  byTopic: Record<string, { awarded: number; total: number }>;
  byAO: Record<'AO1' | 'AO2' | 'AO3', { awarded: number; total: number }>;
  perQuestion: { question: Question; answer: UserAnswer | undefined; result: MarkResult }[];
}

export function gradeSession({ session, bank }: { session: SessionState; bank: QuestionBank }): SessionResult {
  const byTopic: SessionResult['byTopic'] = {};
  const byAO: SessionResult['byAO'] = {
    AO1: { awarded: 0, total: 0 }, AO2: { awarded: 0, total: 0 }, AO3: { awarded: 0, total: 0 },
  };
  const perQuestion: SessionResult['perQuestion'] = [];
  let totalAwarded = 0; let totalMarks = 0;

  for (const id of session.questionIds) {
    const q = bank.find((x) => x.id === id);
    if (!q) continue;
    const a = session.answers[id];
    const result = a
      ? gradeQuestion(q, a)
      : { awarded: 0, total: q.marks };
    totalAwarded += result.awarded; totalMarks += result.total;

    const topicKey = q.topic_id.split('-').slice(0, 2).join('-');
    byTopic[topicKey] ??= { awarded: 0, total: 0 };
    byTopic[topicKey].awarded += result.awarded; byTopic[topicKey].total += result.total;

    byAO[q.assessment_objective].awarded += result.awarded;
    byAO[q.assessment_objective].total += result.total;

    perQuestion.push({ question: q, answer: a, result });
  }
  return { totalAwarded, totalMarks, byTopic, byAO, perQuestion };
}
