import { notFound } from 'next/navigation';
import { getQuestionsByTopic, getSubTopicById } from '@/lib/content/loader';
import { PaperPage } from '@/components/ui/PaperPage';
import { DrillRunner } from '@/components/practice/DrillRunner';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PracticePage({ params }: Props) {
  const { slug } = await params;
  const found = getSubTopicById(slug);
  if (!found) notFound();
  const questions = getQuestionsByTopic(slug);
  if (questions.length === 0) {
    return (
      <PaperPage>
        <h1 className="text-3xl font-bold">{found.subTopic.title}</h1>
        <p className="mt-4 text-paper-muted">No questions yet for this sub-topic.</p>
      </PaperPage>
    );
  }
  return (
    <PaperPage>
      <div className="text-xs font-mono text-paper-muted">Practice — {found.unit.title}</div>
      <h1 className="mt-1 text-3xl font-bold">{found.subTopic.title}</h1>
      <DrillRunner questions={questions} topicId={slug} />
    </PaperPage>
  );
}
