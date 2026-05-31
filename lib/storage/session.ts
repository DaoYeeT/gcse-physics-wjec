import { z } from 'zod';
import { createTypedStore } from './store';

export const UserAnswerSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('mcq'), index: z.number().nullable() }),
  z.object({ kind: z.literal('numeric'), value: z.number().nullable(), unit: z.string(), working: z.string() }),
  z.object({ kind: z.literal('written'), text: z.string(), ticks: z.array(z.number().int()) }),
  z.object({ kind: z.literal('qer6'), text: z.string(), band: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]) }),
]);

export const SessionStateSchema = z.object({
  sessionId: z.string(),
  mode: z.enum(['practice', 'mock']),
  unitIds: z.array(z.string()).optional(),
  questionIds: z.array(z.string()),
  answers: z.record(z.string(), UserAnswerSchema),
  startedAt: z.number(),
  durationSec: z.number(),
  submittedAt: z.number().optional(),
});

export type SessionState = z.infer<typeof SessionStateSchema>;

export function sessionStore(sessionId: string) {
  return createTypedStore(`gcse:session:${sessionId}`, SessionStateSchema);
}

export function listSessionIds(): string[] {
  if (typeof window === 'undefined') return [];
  const out: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const k = window.localStorage.key(i);
    if (k?.startsWith('gcse:session:')) out.push(k.slice('gcse:session:'.length));
  }
  return out;
}
