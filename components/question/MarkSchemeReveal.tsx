'use client';
import { clsx } from 'clsx';
import type { MarkPoint } from '@/lib/content/schema';

interface Props {
  markScheme: MarkPoint[];
  ticks: number[];
  onToggle: (i: number) => void;
  totalMarks: number;
}

export function MarkSchemeReveal({ markScheme, ticks, onToggle, totalMarks }: Props) {
  const ticked = new Set(ticks);
  const awarded = markScheme.reduce((a, p, i) => a + (ticked.has(i) ? p.marks : 0), 0);
  return (
    <div className="mt-4 border-l-2 border-paper-accent bg-paper p-4">
      <div className="mb-3 flex items-center justify-between font-sans text-sm">
        <span className="uppercase tracking-wide text-paper-muted">Mark scheme — tick what you wrote</span>
        <span className="font-semibold">{Math.min(awarded, totalMarks)} / {totalMarks}</span>
      </div>
      <ul className="space-y-2">
        {markScheme.map((p, i) => (
          <li key={i} className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={ticked.has(i)}
              onChange={() => onToggle(i)}
              className="mt-1 h-4 w-4 accent-paper-accent"
              id={`ms-${i}`}
            />
            <label htmlFor={`ms-${i}`} className={clsx('flex-1', ticked.has(i) && 'text-paper-ink')}>
              <div className="font-serif">{p.point} <span className="text-paper-muted">[{p.marks}]</span></div>
              {p.accept && p.accept.length > 0 && (
                <div className="mt-0.5 text-xs text-paper-muted">accept: {p.accept.join(' / ')}</div>
              )}
              {p.reject && p.reject.length > 0 && (
                <div className="text-xs text-paper-muted">reject: {p.reject.join(' / ')}</div>
              )}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
