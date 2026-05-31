import Link from 'next/link';
import { loadSpec } from '@/lib/content/loader';
import { PaperPage } from '@/components/ui/PaperPage';
import { Math } from '@/components/ui/Math';

export const metadata = {
  title: 'Formulas · WJEC GCSE Physics',
  description: 'The full WJEC GCSE Physics equation sheet and constants — printed on every exam paper.',
};

export default function FormulasPage() {
  const spec = loadSpec();
  const foundation = spec.equations_sheet.filter((e) => !e.higher_only);
  const higher = spec.equations_sheet.filter((e) => e.higher_only);

  return (
    <PaperPage>
      <div className="font-sans text-xs uppercase tracking-wide text-paper-muted">WJEC GCSE Physics · Higher Tier</div>
      <h1 className="mt-2 text-3xl font-bold">Formulas</h1>
      <p className="mt-2 text-paper-muted">
        Every WJEC GCSE Physics paper prints this equation list at the front — you don&apos;t have to memorise them, but you do have to know how to pick the right one and use it.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Equation sheet</h2>
        <ul className="mt-4 divide-y divide-paper-rule rounded border border-paper-rule">
          {foundation.map((eq, i) => (
            <li key={`f-${i}`} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-4 py-3">
              <Math tex={eq.latex} className="text-lg" />
              <span className="font-sans text-sm text-paper-muted">{eq.name}</span>
            </li>
          ))}
        </ul>

        {higher.length > 0 && (
          <>
            <h3 className="mt-8 flex items-center gap-2 text-lg font-semibold">
              Higher Tier additions
              <span className="rounded bg-paper-accent px-1.5 py-0.5 font-sans text-xs uppercase tracking-wide text-paper">H</span>
            </h3>
            <ul className="mt-3 divide-y divide-paper-rule rounded border border-paper-rule">
              {higher.map((eq, i) => (
                <li key={`h-${i}`} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-4 py-3">
                  <Math tex={eq.latex} className="text-lg" />
                  <span className="font-sans text-sm text-paper-muted">{eq.name}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Constants</h2>
        <ul className="mt-4 divide-y divide-paper-rule rounded border border-paper-rule">
          {spec.constants.map((c, i) => (
            <li key={i} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-4 py-3">
              <span className="text-lg">
                <Math tex={`${c.symbol} = ${c.value}`} />
                {' '}
                <span className="font-serif text-paper-ink">{c.unit}</span>
              </span>
              {c.context && <span className="font-sans text-sm text-paper-muted">{c.context}</span>}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10">
        <Link href="/" className="font-sans text-sm text-paper-muted hover:text-paper-ink">← Back to home</Link>
      </div>
    </PaperPage>
  );
}
