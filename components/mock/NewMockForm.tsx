'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Spec } from '@/lib/content/schema';
import { buildMockPaper } from '@/lib/mock-paper/build';
import { loadQuestions } from '@/lib/content/loader';
import { sessionStore } from '@/lib/storage/session';

interface Props { spec: Spec }

export function NewMockForm({ spec }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(spec.units.map((u) => u.id));

  function toggle(id: string) {
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  }

  function start() {
    if (selected.length === 0) return;
    const seed = Math.floor(Math.random() * 1_000_000);
    const paper = buildMockPaper({ spec, bank: loadQuestions(), unitIds: selected, seed });
    sessionStore(paper.sessionId).set({
      sessionId: paper.sessionId,
      mode: 'mock',
      unitIds: paper.unitIds,
      questionIds: paper.questionIds,
      answers: {},
      startedAt: Date.now(),
      durationSec: paper.durationSec,
    });
    router.push(`/mock/${paper.sessionId}`);
  }

  return (
    <div className="mt-6 space-y-4">
      <div>
        <div className="font-sans text-sm uppercase tracking-wide text-paper-muted">Include units</div>
        <div className="mt-2 space-y-2">
          {spec.units.map((u) => (
            <label key={u.id} className="flex items-start gap-3 rounded border border-paper-rule p-3">
              <input
                type="checkbox"
                checked={selected.includes(u.id)}
                onChange={() => toggle(u.id)}
                className="mt-1 h-4 w-4 accent-paper-ink"
              />
              <div>
                <div className="font-semibold">{u.title}</div>
                <div className="text-sm text-paper-muted">
                  {u.duration_min} min · {u.total_marks} marks
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
      <button
        onClick={start}
        disabled={selected.length === 0}
        className="rounded bg-paper-accent px-4 py-2 font-sans text-sm font-semibold text-paper disabled:opacity-50"
      >
        Start exam
      </button>
    </div>
  );
}
