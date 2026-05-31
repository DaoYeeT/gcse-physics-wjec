'use client';
import type { SessionResult } from '@/lib/mock-paper/grade-session';

export function ResultsBreakdown({ result }: { result: SessionResult }) {
  const pct = result.totalMarks === 0 ? 0 : Math.round((result.totalAwarded / result.totalMarks) * 100);
  return (
    <div className="mt-6 rounded border border-paper-rule p-6">
      <div className="text-5xl font-bold tabular-nums">{result.totalAwarded} <span className="text-paper-muted">/ {result.totalMarks}</span></div>
      <div className="text-sm text-paper-muted">{pct}%</div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="font-sans text-xs uppercase tracking-wide text-paper-muted">By topic</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {Object.entries(result.byTopic).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => (
              <li key={k} className="flex justify-between font-mono">
                <span>{k}</span>
                <span className="tabular-nums">{v.awarded} / {v.total}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-sans text-xs uppercase tracking-wide text-paper-muted">By assessment objective</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {(['AO1','AO2','AO3'] as const).map((ao) => (
              <li key={ao} className="flex justify-between">
                <span>{ao}</span>
                <span className="font-mono tabular-nums">{result.byAO[ao].awarded} / {result.byAO[ao].total}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
