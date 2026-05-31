'use client';
import { QuestionPrompt } from '@/components/ui/QuestionPrompt';
import type { Question } from '@/lib/content/schema';

interface Props {
  question: Extract<Question, { type: 'qer6' }>;
  text: string;
  onChange: (text: string) => void;
  disabled?: boolean;
}

export function QER6Item({ question, text, onChange, disabled }: Props) {
  return (
    <div>
      <div className="mb-2 inline-block rounded bg-paper-ink px-2 py-0.5 font-sans text-xs uppercase tracking-wide text-paper">
        Quality of extended response — 6 marks
      </div>
      <QuestionPrompt text={question.prompt} />
      <textarea
        value={text}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        rows={8}
        className="lined-area mt-4 w-full border border-paper-rule bg-paper p-2 font-serif text-paper-base outline-none focus:border-paper-ink"
        style={{ minHeight: '184px' }}
      />
    </div>
  );
}
