import Link from 'next/link';
import { PaperPage } from '@/components/ui/PaperPage';

export default function Home() {
  return (
    <PaperPage>
      <div className="font-sans text-xs uppercase tracking-wide text-paper-muted">WJEC GCSE Physics · Higher Tier</div>
      <h1 className="mt-2 text-5xl font-bold leading-tight">Sit the paper.</h1>
      <p className="mt-4 max-w-prose text-paper-base text-paper-muted">
        Practice WJEC GCSE Physics topic-by-topic, then sit a generated mock paper under exam conditions —
        timer, data booklet, calculator. No feedback until you hand it in.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link href="/mock/new" className="block rounded border border-paper-rule p-6 hover:border-paper-ink">
          <div className="font-sans text-xs uppercase tracking-wide text-paper-muted">Full mock paper</div>
          <div className="mt-2 text-xl font-semibold">Timed exam, 80–160 marks</div>
          <p className="mt-2 text-sm text-paper-muted">
            WJEC paper layout, marks in margin, lined answer boxes, hand-in confirmation.
          </p>
        </Link>
        <Link href="/topics" className="block rounded border border-paper-rule p-6 hover:border-paper-ink">
          <div className="font-sans text-xs uppercase tracking-wide text-paper-muted">Topic practice</div>
          <div className="mt-2 text-xl font-semibold">Drill one sub-topic</div>
          <p className="mt-2 text-sm text-paper-muted">
            Instant feedback, mark scheme reveal, knowledge cards.
          </p>
        </Link>
      </div>
      <div className="mt-10 text-sm">
        <Link href="/history" className="font-sans text-paper-muted hover:text-paper-ink">View past attempts →</Link>
      </div>
    </PaperPage>
  );
}
