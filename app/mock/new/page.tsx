import { loadSpec } from '@/lib/content/loader';
import { PaperPage } from '@/components/ui/PaperPage';
import { NewMockForm } from '@/components/mock/NewMockForm';

export default function NewMockPage() {
  const spec = loadSpec();
  return (
    <PaperPage>
      <h1 className="text-3xl font-bold">Start a mock paper</h1>
      <p className="mt-2 text-paper-muted">
        You will sit a timed exam under WJEC conditions: no feedback until you hand in the paper.
        A data booklet and calculator are available throughout.
      </p>
      <NewMockForm spec={spec} />
    </PaperPage>
  );
}
