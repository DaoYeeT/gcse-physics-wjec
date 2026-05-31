import { loadQuestions } from '@/lib/content/loader';
import { MockRunner } from '@/components/mock/MockRunner';

interface Props { params: Promise<{ sessionId: string }> }

export default async function MockPage({ params }: Props) {
  const { sessionId } = await params;
  const bank = loadQuestions();
  return <MockRunner sessionId={sessionId} bank={bank} />;
}
