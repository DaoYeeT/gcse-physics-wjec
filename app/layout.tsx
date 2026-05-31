import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WJEC GCSE Physics Mock Exam',
  description: 'Interactive mock exam practice for WJEC GCSE Physics Higher Tier',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-serif text-paper-ink">{children}</body>
    </html>
  );
}
