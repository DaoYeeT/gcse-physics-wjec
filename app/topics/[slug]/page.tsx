import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSubTopicById } from '@/lib/content/loader';
import { PaperPage } from '@/components/ui/PaperPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const found = getSubTopicById(slug);
  if (!found) notFound();
  const { unit, topic, subTopic } = found;

  let Knowledge: React.ComponentType | null = null;
  try {
    const mod = await import(`@/content/knowledge/${slug}.mdx`);
    Knowledge = mod.default;
  } catch {
    Knowledge = null;
  }

  return (
    <PaperPage>
      <div className="text-xs font-mono text-paper-muted">
        {unit.title} › {topic.title}
      </div>
      <h1 className="mt-1 text-3xl font-bold">
        {subTopic.id} {subTopic.title}
      </h1>
      <article className="prose prose-paper mt-6 max-w-none">
        {Knowledge ? (
          <Knowledge />
        ) : (
          <p className="text-paper-muted">Knowledge card not yet authored for this sub-topic.</p>
        )}
      </article>
      <div className="mt-8 flex gap-3">
        <Link
          href={`/practice/${slug}`}
          className="rounded bg-paper-ink px-4 py-2 font-sans text-sm font-semibold text-paper"
        >
          Start drill
        </Link>
        <Link
          href="/topics"
          className="rounded border border-paper-rule px-4 py-2 font-sans text-sm"
        >
          ← All topics
        </Link>
      </div>
    </PaperPage>
  );
}
