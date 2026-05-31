'use client';
import { useState } from 'react';
import type { Question } from '@/lib/content/schema';
import type { UserAnswer } from '@/lib/grading';
import { gradeQuestion } from '@/lib/grading';
import { QuestionCard } from '@/components/question/QuestionCard';
import { MarkSchemeReveal } from '@/components/question/MarkSchemeReveal';
import { BandPicker } from '@/components/question/BandPicker';
import { QuestionBlock } from '@/components/ui/PaperPage';
import { recordTopicAttempt } from '@/lib/storage/progress';

interface Props {
  questions: Question[];
  topicId: string;
}

export function DrillRunner({ questions, topicId }: Props) {
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState<UserAnswer | undefined>(undefined);
  const [revealed, setRevealed] = useState(false);
  const q = questions[idx];

  function next() {
    setIdx((i) => Math.min(i + 1, questions.length - 1));
    setAnswer(undefined);
    setRevealed(false);
  }

  function reveal() {
    if (!answer) return;
    const result = gradeQuestion(q, answer);
    recordTopicAttempt(topicId, result.awarded === result.total);
    setRevealed(true);
  }

  const result = revealed && answer ? gradeQuestion(q, answer) : null;

  return (
    <div className="mt-6">
      <div className="mb-4 font-sans text-sm text-paper-muted">
        Question {idx + 1} of {questions.length}
      </div>
      <QuestionBlock number={`${idx + 1}.`} marks={q.marks}>
        <QuestionCard question={q} answer={answer} onChange={setAnswer} disabled={revealed} />
      </QuestionBlock>

      {revealed && q.type === 'mcq' && (
        <div className="mt-4 rounded border-l-2 border-paper-accent bg-paper p-4 font-sans text-sm">
          Correct answer: <strong>{String.fromCharCode(65 + q.correct_index)}</strong> —{' '}
          {q.options[q.correct_index]}
        </div>
      )}

      {revealed && q.type === 'numeric' && (
        <div className="mt-4 rounded border-l-2 border-paper-accent bg-paper p-4 font-serif text-sm">
          <div>
            <strong>Expected:</strong> {q.answer_value} {q.answer_unit} (±{q.tolerance_pct}%)
          </div>
          {q.working_steps && q.working_steps.length > 0 && (
            <ol className="mt-2 list-decimal pl-5 text-paper-ink">
              {q.working_steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          )}
        </div>
      )}

      {revealed &&
        (q.type === 'short' || q.type === 'structured') &&
        answer?.kind === 'written' && (
          <MarkSchemeReveal
            markScheme={q.mark_scheme}
            ticks={answer.ticks}
            onToggle={(i) => {
              const next = new Set(answer.ticks);
              if (next.has(i)) next.delete(i);
              else next.add(i);
              setAnswer({ kind: 'written', text: answer.text, ticks: [...next].sort() });
            }}
            totalMarks={q.marks}
          />
        )}

      {revealed && q.type === 'qer6' && answer?.kind === 'qer6' && (
        <BandPicker
          band={answer.band}
          onSelect={(b) => setAnswer({ kind: 'qer6', text: answer.text, band: b })}
        />
      )}

      <div className="mt-6 flex items-center gap-3">
        {!revealed ? (
          <button
            type="button"
            disabled={!answer}
            onClick={reveal}
            className="rounded bg-paper-ink px-4 py-2 font-sans text-sm font-semibold text-paper disabled:opacity-50"
          >
            Show mark scheme
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            disabled={idx >= questions.length - 1}
            className="rounded bg-paper-ink px-4 py-2 font-sans text-sm font-semibold text-paper disabled:opacity-50"
          >
            Next question →
          </button>
        )}
        {result && (
          <span className="font-sans text-sm text-paper-muted">
            Awarded:{' '}
            <strong className="text-paper-ink">
              {result.awarded} / {result.total}
            </strong>
          </span>
        )}
      </div>
    </div>
  );
}
