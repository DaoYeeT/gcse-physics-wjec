'use client';
import { useState } from 'react';
import { clsx } from 'clsx';
import { loadSpec } from '@/lib/content/loader';
import { Math } from '@/components/ui/Math';

export function DataBookletDrawer() {
  const [open, setOpen] = useState(false);
  const spec = loadSpec();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-30 rounded bg-paper-ink px-3 py-2 font-sans text-xs font-semibold text-paper shadow-lg"
      >
        Data booklet
      </button>
      <div
        className={clsx(
          'fixed inset-x-0 bottom-0 z-40 max-h-[70vh] overflow-auto border-t border-paper-rule bg-paper transition-transform',
          open ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <div className="mx-auto max-w-paper p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Data booklet</h2>
            <button onClick={() => setOpen(false)} className="rounded border border-paper-rule px-3 py-1 font-sans text-xs">
              Close
            </button>
          </div>
          <h3 className="mt-6 font-semibold">Equations</h3>
          <ul className="mt-2 space-y-1">
            {spec.equations_sheet.map((eq, i) => (
              <li key={i} className="flex flex-wrap items-baseline gap-x-3 font-serif">
                <Math tex={eq.latex} />
                <span className="text-sm text-paper-muted">{eq.name}</span>
                {eq.higher_only && (
                  <span className="rounded bg-paper-accent px-1.5 py-0.5 font-sans text-[0.65rem] uppercase text-paper">H</span>
                )}
              </li>
            ))}
          </ul>
          <h3 className="mt-6 font-semibold">Constants</h3>
          <ul className="mt-2 space-y-1 font-serif">
            {spec.constants.map((c, i) => (
              <li key={i} className="font-serif">
                <Math tex={`${c.symbol} = ${c.value}`} />
                {' '}
                <span>{c.unit}</span>
                {c.context && <span className="text-paper-muted"> — {c.context}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
