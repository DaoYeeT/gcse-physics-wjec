'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProgress, type ProgressState } from '@/lib/storage/progress';

export function HistoryList() {
  const [progress, setProgress] = useState<ProgressState | null>(null);
  useEffect(() => { setProgress(getProgress()); }, []);
  if (!progress) return null;

  if (progress.attempts.length === 0) {
    return <p className="mt-6 text-paper-muted">No past attempts yet.</p>;
  }

  return (
    <ul className="mt-6 space-y-2">
      {progress.attempts.slice().reverse().map((a) => (
        <li key={a.sessionId} className="flex items-center justify-between rounded border border-paper-rule p-3">
          <div>
            <div className="font-sans text-xs uppercase tracking-wide text-paper-muted">{a.mode}</div>
            <div className="font-semibold">{new Date(a.finishedAt).toLocaleString()}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-mono text-lg tabular-nums">{Math.round(a.scorePct)}%</div>
            {a.mode === 'mock' && (
              <Link
                href={`/mock/${a.sessionId}/results`}
                className="rounded border border-paper-rule px-3 py-1 font-sans text-xs"
              >
                View
              </Link>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
