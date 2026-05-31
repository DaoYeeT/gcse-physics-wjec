import { loadQuestions } from '@/lib/content/loader';
import { ResultsClient } from './ResultsClient';

interface Props { params: Promise<{ sessionId: string }> }

export default async function ResultsPage({ params }: Props) {
  const { sessionId } = await params;
  const bank = loadQuestions();
  return <ResultsClient sessionId={sessionId} bank={bank} />;
}
