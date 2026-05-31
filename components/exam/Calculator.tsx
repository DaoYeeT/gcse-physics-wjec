'use client';
import { useState } from 'react';
import { clsx } from 'clsx';
import { calc } from '@/lib/calc/eval';

const KEYS: { label: string; insert?: string; action?: 'eq' | 'clear' | 'back' }[] = [
  { label: 'C', action: 'clear' }, { label: '⌫', action: 'back' }, { label: '(', insert: '(' }, { label: ')', insert: ')' },
  { label: 'sin', insert: 'sin(' }, { label: 'cos', insert: 'cos(' }, { label: 'tan', insert: 'tan(' }, { label: '^', insert: '^' },
  { label: 'ln', insert: 'ln(' }, { label: 'log', insert: 'log(' }, { label: '√', insert: 'sqrt(' }, { label: 'π', insert: 'pi' },
  { label: '7', insert: '7' }, { label: '8', insert: '8' }, { label: '9', insert: '9' }, { label: '/', insert: '/' },
  { label: '4', insert: '4' }, { label: '5', insert: '5' }, { label: '6', insert: '6' }, { label: '*', insert: '*' },
  { label: '1', insert: '1' }, { label: '2', insert: '2' }, { label: '3', insert: '3' }, { label: '-', insert: '-' },
  { label: '0', insert: '0' }, { label: '.', insert: '.' }, { label: '=', action: 'eq' }, { label: '+', insert: '+' },
];

export function Calculator() {
  const [open, setOpen] = useState(false);
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState<string>('');

  function press(k: typeof KEYS[number]) {
    if (k.action === 'clear') { setExpr(''); setResult(''); return; }
    if (k.action === 'back') { setExpr((e) => e.slice(0, -1)); return; }
    if (k.action === 'eq') {
      try { setResult(String(calc(expr))); } catch { setResult('Error'); }
      return;
    }
    setExpr((e) => e + (k.insert ?? ''));
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-32 z-30 rounded bg-paper-ink px-3 py-2 font-sans text-xs font-semibold text-paper shadow-lg"
      >
        Calculator
      </button>
      {open && (
        <div className="fixed bottom-16 right-4 z-40 w-72 rounded border border-paper-rule bg-paper p-3 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="font-sans text-xs uppercase tracking-wide text-paper-muted">Calculator</div>
            <button onClick={() => setOpen(false)} className="font-sans text-xs">✕</button>
          </div>
          <div className="mt-2 min-h-[3rem] rounded border border-paper-rule bg-white p-2 text-right font-mono">
            <div className="text-sm text-paper-muted">{expr || ' '}</div>
            <div className="text-lg font-semibold">{result || '0'}</div>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-1">
            {KEYS.map((k) => (
              <button
                key={k.label}
                type="button"
                onClick={() => press(k)}
                className={clsx(
                  'rounded border border-paper-rule px-2 py-2 font-mono text-sm hover:bg-paper-rule/30',
                  k.action === 'eq' && 'bg-paper-ink text-paper hover:bg-paper-ink',
                )}
              >
                {k.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
