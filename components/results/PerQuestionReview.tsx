'use client';
import { useState } from 'react';
import type { SessionResult } from '@/lib/mock-paper/grade-session';
import { QuestionPrompt } from '@/components/ui/QuestionPrompt';
import { MarkSchemeReveal } from '@/components/question/MarkSchemeReveal';
import { BandPicker } from '@/components/question/BandPicker';

export function PerQuestionReview({ result }: { result: SessionResult }) {
  return (
    <div className="mt-10 space-y-10">
      <h2 className="text-xl font-bold">Per-question review</h2>
      {result.perQuestion.map(({ question, answer, result: r }, i) => (
        <QuestionReviewItem key={question.id} index={i} question={question} answer={answer} result={r} />
      ))}
    </div>
  );
}

function QuestionReviewItem({ index, question, answer, result }: {
  index: number;
  question: SessionResult['perQuestion'][number]['question'];
  answer: SessionResult['perQuestion'][number]['answer'];
  result: SessionResult['perQuestion'][number]['result'];
}) {
  const [ticks, setTicks] = useState<number[]>(answer?.kind === 'written' ? answer.ticks : []);
  const [band, setBand] = useState(answer?.kind === 'qer6' ? answer.band : 0);

  return (
    <section className="border-t border-paper-rule pt-6">
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold">Question {index + 1}</h3>
        <span className="font-mono text-sm tabular-nums">{result.awarded} / {result.total}</span>
      </div>
      <div className="mt-3"><QuestionPrompt text={question.prompt} /></div>

      {question.type === 'mcq' && (
        <div className="mt-3 font-sans text-sm">
          Your answer: {answer?.kind === 'mcq' && answer.index !== null ? String.fromCharCode(65 + answer.index) : '—'}
          {' · '}
          Correct: <strong>{String.fromCharCode(65 + question.correct_index)}</strong> — {question.options[question.correct_index]}
        </div>
      )}

      {question.type === 'numeric' && (
        <div className="mt-3 font-sans text-sm">
          Your answer: {answer?.kind === 'numeric' && answer.value !== null ? `${answer.value} ${answer.unit}` : '—'}
          {' · '}
          Expected: <strong>{question.answer_value} {question.answer_unit}</strong> (±{question.tolerance_pct}%)
          {question.working_steps && (
            <ol className="mt-2 list-decimal pl-5">
              {question.working_steps.map((s, k) => <li key={k}>{s}</li>)}
            </ol>
          )}
        </div>
      )}

      {(question.type === 'short' || question.type === 'structured') && (
        <>
          <pre className="mt-3 whitespace-pre-wrap rounded border border-paper-rule bg-white p-3 font-serif text-sm">
            {answer?.kind === 'written' ? answer.text || '(blank)' : '(blank)'}
          </pre>
          <MarkSchemeReveal
            markScheme={question.mark_scheme}
            ticks={ticks}
            onToggle={(i) => setTicks((t) => t.includes(i) ? t.filter((x) => x !== i) : [...t, i].sort())}
            totalMarks={question.marks}
          />
        </>
      )}

      {question.type === 'qer6' && (
        <>
          <pre className="mt-3 whitespace-pre-wrap rounded border border-paper-rule bg-white p-3 font-serif text-sm">
            {answer?.kind === 'qer6' ? answer.text || '(blank)' : '(blank)'}
          </pre>
          <BandPicker band={band} onSelect={setBand} />
        </>
      )}
    </section>
  );
}
