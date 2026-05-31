import { describe, it, expect, beforeEach } from 'vitest';
import { sessionStore, SessionStateSchema } from '@/lib/storage/session';

describe('sessionStore', () => {
  beforeEach(() => { localStorage.clear(); });

  it('round-trips a practice session', () => {
    const store = sessionStore('abc');
    const state = SessionStateSchema.parse({
      sessionId: 'abc', mode: 'practice',
      questionIds: ['q-1', 'q-2'],
      answers: { 'q-1': { kind: 'mcq', index: 1 } },
      startedAt: 1000, durationSec: 600,
    });
    store.set(state);
    expect(store.get()).toEqual(state);
  });
});
