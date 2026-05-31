'use client';
import { clsx } from 'clsx';

interface Props {
  total: number;
  current: number;
  answered: Set<number>;
  onJump: (i: number) => void;
}

export function QuestionNavigator({ total, current, answered, onJump }: Props) {
  return (
    <aside className="sticky top-16 hidden self-start lg:block">
      <div className="font-sans text-xs uppercase tracking-wide text-paper-muted">Questions</div>
      <div className="mt-2 grid grid-cols-5 gap-1">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onJump(i)}
            className={clsx(
              'h-8 w-8 rounded border text-xs tabular-nums',
              current === i && 'ring-2 ring-paper-ink',
              answered.has(i)
                ? 'border-paper-ink bg-paper-ink text-paper'
                : 'border-paper-rule bg-paper text-paper-ink',
            )}
            aria-label={`Go to question ${i + 1}${answered.has(i) ? ', answered' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </aside>
  );
}
