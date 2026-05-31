import { z } from 'zod';
import { createTypedStore } from './store';

export const ProgressStateSchema = z.object({
  byTopic: z.record(z.string(), z.object({
    seen: z.number().int().min(0),
    correct: z.number().int().min(0),
    lastAttemptAt: z.number(),
  })),
  attempts: z.array(z.object({
    sessionId: z.string(),
    mode: z.string(),
    scorePct: z.number(),
    finishedAt: z.number(),
  })),
});

export type ProgressState = z.infer<typeof ProgressStateSchema>;

const progress = createTypedStore('gcse:progress', ProgressStateSchema);

export function getProgress(): ProgressState {
  return progress.get() ?? { byTopic: {}, attempts: [] };
}

export function recordTopicAttempt(topicId: string, correct: boolean) {
  const cur = getProgress();
  const t = cur.byTopic[topicId] ?? { seen: 0, correct: 0, lastAttemptAt: 0 };
  t.seen++;
  if (correct) t.correct++;
  t.lastAttemptAt = Date.now();
  cur.byTopic[topicId] = t;
  progress.set(cur);
}

export function recordAttempt(sessionId: string, mode: string, scorePct: number) {
  const cur = getProgress();
  cur.attempts.push({ sessionId, mode, scorePct, finishedAt: Date.now() });
  progress.set(cur);
}
