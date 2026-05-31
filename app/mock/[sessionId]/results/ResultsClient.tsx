'use client';
import { useEffect, useState } from 'react';
import type { QuestionBank } from '@/lib/content/schema';
import { sessionStore, type SessionState } from '@/lib/storage/session';
import { gradeSession, type SessionResult } from '@/lib/mock-paper/grade-session';
import { recordAttempt, getProgress } from '@/lib/storage/progress';
import { PaperPage } from '@/components/ui/PaperPage';
import { ResultsBreakdown } from '@/components/results/ResultsBreakdown';
import { PerQuestionReview } from '@/components/results/PerQuestionReview';

export function ResultsClient({ sessionId, bank }: { sessionId: string; bank: QuestionBank }) {
  const [state, setState] = useState<SessionState | null>(null);
  const [result, setResult] = useState<SessionResult | null>(null);

  useEffect(() => {
    const s = sessionStore(sessionId).get();
    setState(s);
    if (s) {
      const r = gradeSession({ session: s, bank });
      setResult(r);
      const pct = r.totalMarks === 0 ? 0 : (r.totalAwarded / r.totalMarks) * 100;
      const progress = getProgress();
      if (!progress.attempts.some((a) => a.sessionId === sessionId)) {
        recordAttempt(sessionId, s.mode, pct);
      }
    }
  }, [sessionId, bank]);

  if (!state || !result) {
    return <PaperPage><p className="text-paper-muted">Loading results…</p></PaperPage>;
  }

  return (
    <PaperPage>
      <div className="font-sans text-xs uppercase tracking-wide text-paper-muted">Results · session {sessionId}</div>
      <h1 className="mt-1 text-3xl font-bold">Your paper</h1>
      <ResultsBreakdown result={result} />
      <PerQuestionReview result={result} />
    </PaperPage>
  );
}
