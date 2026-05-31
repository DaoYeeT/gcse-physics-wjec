'use client';
import { QuestionPrompt } from '@/components/ui/QuestionPrompt';
import type { Question } from '@/lib/content/schema';

interface Props {
  question: Extract<Question, { type: 'short' | 'structured' }>;
  text: string;
  onChange: (text: string) => void;
  disabled?: boolean;
}

export function WrittenItem({ question, text, onChange, disabled }: Props) {
  const lines = question.answer_lines ?? Math.max(2, question.marks);
  return (
    <div>
      <QuestionPrompt text={question.prompt} />
      <textarea
        value={text}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        rows={lines}
        className="lined-area mt-4 w-full border border-paper-rule bg-paper p-2 font-serif text-paper-base outline-none focus:border-paper-ink"
        style={{ minHeight: `${lines * 22 + 8}px` }}
      />
    </div>
  );
}
