import { clsx } from 'clsx';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function PaperPage({ children, className }: Props) {
  return (
    <div className={clsx('mx-auto max-w-paper px-6 py-10 text-paper-base', className)}>
      {children}
    </div>
  );
}

export function QuestionBlock({ number, parts, marks, children }: {
  number: string; parts?: string; marks: number; children: React.ReactNode;
}) {
  return (
    <section className="border-t border-paper-rule pt-6 mt-8 first:border-t-0 first:mt-0 first:pt-0">
      <div className="flex items-baseline gap-3">
        <span className="font-semibold tabular-nums">{number}{parts ? ` ${parts}` : ''}</span>
        <div className="flex-1">{children}</div>
        <span className="text-paper-muted tabular-nums whitespace-nowrap" aria-label={`${marks} marks`}>
          [{marks}]
        </span>
      </div>
    </section>
  );
}
