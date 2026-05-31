'use client';
import { clsx } from 'clsx';
import { BAND_DESCRIPTORS, BAND_MARKS } from '@/lib/grading';

type Band = 0 | 1 | 2 | 3;

interface Props {
  band: Band;
  onSelect: (b: Band) => void;
}

export function BandPicker({ band, onSelect }: Props) {
  return (
    <div className="mt-4 border-l-2 border-paper-accent bg-paper p-4">
      <div className="mb-3 font-sans text-sm uppercase tracking-wide text-paper-muted">
        Self-mark — which band best describes your answer?
      </div>
      <div className="space-y-2">
        {[0, 1, 2, 3].map((b) => {
          const isSelected = band === b;
          return (
            <button
              key={b}
              type="button"
              onClick={() => onSelect(b as Band)}
              className={clsx(
                'block w-full rounded border border-paper-rule p-3 text-left text-sm',
                isSelected && 'border-paper-ink bg-paper-rule/30',
              )}
            >
              <div className="flex items-baseline justify-between font-semibold">
                <span>Band {b}</span>
                <span className="font-sans tabular-nums">{BAND_MARKS[b as Band]} marks</span>
              </div>
              <div className="mt-1 text-paper-ink">{BAND_DESCRIPTORS[b as Band]}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
