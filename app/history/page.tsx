import { PaperPage } from '@/components/ui/PaperPage';
import { HistoryList } from '@/components/history/HistoryList';

export default function HistoryPage() {
  return (
    <PaperPage>
      <h1 className="text-3xl font-bold">History</h1>
      <p className="mt-2 text-paper-muted">Your past topic drills and mock papers (stored on this device).</p>
      <HistoryList />
    </PaperPage>
  );
}
