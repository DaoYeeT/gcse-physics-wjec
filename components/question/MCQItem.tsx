'use client';
import { clsx } from 'clsx';
import { QuestionPrompt } from '@/components/ui/QuestionPrompt';
import type { Question } from '@/lib/content/schema';

interface Props {
  question: Extract<Question, { type: 'mcq' }>;
  selectedIndex: number | null;
  onSelect: (i: number) => void;
  disabled?: boolean;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export function MCQItem({ question, selectedIndex, onSelect, disabled }: Props) {
  return (
    <div>
      <QuestionPrompt text={question.prompt} />
      <ul className="mt-4 space-y-2">
        {question.options.map((opt, i) => {
          const selected = selectedIndex === i;
          return (
            <li key={i}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onSelect(i)}
                className={clsx(
                  'flex w-full items-start gap-3 rounded border border-paper-rule p-3 text-left',
                  selected && 'border-paper-ink bg-paper-rule/30',
                  disabled && 'cursor-not-allowed opacity-70',
                )}
              >
                <span
                  className={clsx(
                    'mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-paper-rule font-sans text-sm font-semibold',
                    selected && 'border-paper-ink bg-paper-ink text-paper',
                  )}
                >
                  {LETTERS[i]}
                </span>
                <QuestionPrompt text={opt} className="flex-1" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
