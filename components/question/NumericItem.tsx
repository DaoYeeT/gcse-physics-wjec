'use client';
import { QuestionPrompt } from '@/components/ui/QuestionPrompt';
import type { Question } from '@/lib/content/schema';

interface Props {
  question: Extract<Question, { type: 'numeric' }>;
  value: number | null;
  unit: string;
  working: string;
  onChange: (a: { value: number | null; unit: string; working: string }) => void;
  disabled?: boolean;
}

export function NumericItem({ question, value, unit, working, onChange, disabled }: Props) {
  const requiresUnit = question.requires_unit ?? true;
  const workingLines = Math.max(3, Math.min(8, question.marks));

  return (
    <div>
      <QuestionPrompt text={question.prompt} />
      <div className="mt-4 space-y-3">
        <div>
          <label className="block font-sans text-xs uppercase tracking-wide text-paper-muted">Working</label>
          <textarea
            value={working}
            disabled={disabled}
            onChange={(e) => onChange({ value, unit, working: e.target.value })}
            spellCheck={false}
            rows={workingLines}
            className="lined-area mt-1 w-full border border-paper-rule bg-paper p-2 font-serif text-paper-base outline-none focus:border-paper-ink"
          />
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block font-sans text-xs uppercase tracking-wide text-paper-muted">Answer</label>
            <input
              type="number"
              inputMode="decimal"
              step="any"
              value={value ?? ''}
              disabled={disabled}
              onChange={(e) => {
                const raw = e.target.value;
                onChange({ value: raw === '' ? null : Number(raw), unit, working });
              }}
              className="mt-1 w-40 border-b border-paper-ink bg-transparent px-1 py-1 font-serif text-paper-base outline-none"
            />
          </div>
          {requiresUnit && (
            <div>
              <label className="block font-sans text-xs uppercase tracking-wide text-paper-muted">Unit</label>
              <input
                type="text"
                value={unit}
                disabled={disabled}
                onChange={(e) => onChange({ value, unit: e.target.value, working })}
                spellCheck={false}
                className="mt-1 w-32 border-b border-paper-ink bg-transparent px-1 py-1 font-serif text-paper-base outline-none"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
