'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Question, QuestionBank } from '@/lib/content/schema';
import { sessionStore, type SessionState } from '@/lib/storage/session';
import type { UserAnswer } from '@/lib/grading';
import { QuestionCard } from '@/components/question/QuestionCard';
import { QuestionBlock } from '@/components/ui/PaperPage';
import { Timer } from '@/components/exam/Timer';
import { DataBookletDrawer } from '@/components/exam/DataBookletDrawer';
import { Calculator } from '@/components/exam/Calculator';
import { QuestionNavigator } from '@/components/exam/QuestionNavigator';
import { SubmitConfirm } from '@/components/exam/SubmitConfirm';
import { useBeforeUnload } from '@/lib/hooks/useBeforeUnload';

interface Props { sessionId: string; bank: QuestionBank }

export function MockRunner({ sessionId, bank }: Props) {
  const router = useRouter();
  const store = useMemo(() => sessionStore(sessionId), [sessionId]);
  const [state, setState] = useState<SessionState | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => { setState(store.get()); }, [store]);
  useBeforeUnload(state !== null && !state.submittedAt);

  if (!state) {
    return <main className="p-10 text-center text-paper-muted">Loading session…</main>;
  }

  const questions: Question[] = state.questionIds.map((id) => bank.find((q) => q.id === id)!).filter(Boolean);
  const q = questions[current];
  const answered = new Set<number>(
    questions
      .map((qq, i) => ({ i, a: state.answers[qq.id] }))
      .filter(({ a }) => isAnswered(a))
      .map(({ i }) => i),
  );
  const unanswered = questions.length - answered.size;
  const remainingSec = Math.max(0, state.durationSec - Math.floor((Date.now() - state.startedAt) / 1000));

  function persistAnswer(a: UserAnswer) {
    const next: SessionState = { ...state!, answers: { ...state!.answers, [q.id]: a } };
    setState(next);
    store.set(next);
  }

  function submit() {
    const next: SessionState = { ...state!, submittedAt: Date.now() };
    store.set(next);
    setState(next);
    router.push(`/mock/${sessionId}/results`);
  }

  return (
    <div className="min-h-screen pb-32">
      <header className="sticky top-0 z-20 border-b border-paper-rule bg-paper">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div>
            <div className="font-sans text-xs uppercase tracking-wide text-paper-muted">
              WJEC GCSE Physics — Higher
            </div>
            <div className="text-sm font-semibold">Candidate: __________________________</div>
          </div>
          <div className="font-sans text-sm">
            Time remaining: <Timer remainingSec={remainingSec} onExpire={submit} />
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl gap-8 px-4 py-8">
        <div className="flex-1">
          <QuestionBlock number={`${current + 1}.`} marks={q.marks}>
            <QuestionCard question={q} answer={state.answers[q.id]} onChange={persistAnswer} />
          </QuestionBlock>
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setCurrent((i) => Math.max(0, i - 1))}
              disabled={current === 0}
              className="rounded border border-paper-rule px-3 py-1.5 font-sans text-sm disabled:opacity-50"
            >
              ← Previous
            </button>
            {current < questions.length - 1 ? (
              <button
                onClick={() => setCurrent((i) => Math.min(questions.length - 1, i + 1))}
                className="rounded bg-paper-ink px-3 py-1.5 font-sans text-sm font-semibold text-paper"
              >
                Next →
              </button>
            ) : (
              <SubmitConfirm unansweredCount={unanswered} onConfirm={submit} />
            )}
          </div>
        </div>
        <QuestionNavigator
          total={questions.length}
          current={current}
          answered={answered}
          onJump={setCurrent}
        />
      </main>

      <DataBookletDrawer />
      <Calculator />
    </div>
  );
}

function isAnswered(a: UserAnswer | undefined): boolean {
  if (!a) return false;
  switch (a.kind) {
    case 'mcq': return a.index !== null;
    case 'numeric': return a.value !== null;
    case 'written': return a.text.trim().length > 0;
    case 'qer6': return a.text.trim().length > 0;
  }
}
