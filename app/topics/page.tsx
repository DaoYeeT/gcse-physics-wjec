import Link from 'next/link';
import { loadSpec } from '@/lib/content/loader';
import { PaperPage } from '@/components/ui/PaperPage';

export default function TopicsPage() {
  const spec = loadSpec();
  return (
    <PaperPage>
      <h1 className="text-3xl font-bold">Topics</h1>
      <p className="mt-2 text-paper-muted">Pick a sub-topic to revise and drill.</p>
      <div className="mt-8 space-y-10">
        {spec.units.map((unit) => (
          <section key={unit.id}>
            <h2 className="text-xl font-semibold">{unit.title}</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {unit.topics.flatMap((t) =>
                t.sub_topics.map((st) => (
                  <li key={st.id}>
                    <Link
                      href={`/topics/${st.id}`}
                      className="block rounded border border-paper-rule p-3 hover:border-paper-ink"
                    >
                      <span className="font-mono text-xs text-paper-muted">{st.id}</span>{' '}
                      <span className="font-semibold">{st.title}</span>
                      {st.higher_only && (
                        <span className="ml-2 rounded bg-paper-accent px-1.5 py-0.5 font-sans text-xs uppercase tracking-wide text-paper">
                          Higher only
                        </span>
                      )}
                    </Link>
                  </li>
                )),
              )}
            </ul>
          </section>
        ))}
      </div>
    </PaperPage>
  );
}
