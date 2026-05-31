'use client';
import { useState } from 'react';

interface Props {
  unansweredCount: number;
  onConfirm: () => void;
}

export function SubmitConfirm({ unansweredCount, onConfirm }: Props) {
  const [showing, setShowing] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowing(true)}
        className="rounded bg-paper-accent px-4 py-2 font-sans text-sm font-semibold text-paper"
      >
        Hand in paper
      </button>
      {showing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-paper-ink/40 p-4">
          <div className="max-w-md rounded bg-paper p-6 shadow-2xl">
            <h2 className="text-xl font-bold">Hand in paper?</h2>
            <p className="mt-3 text-sm text-paper-ink">
              This will end the exam. You cannot make changes after submitting.
            </p>
            {unansweredCount > 0 && (
              <p className="mt-2 rounded bg-paper-accent/10 p-2 font-sans text-xs text-paper-accent">
                You have {unansweredCount} unanswered question{unansweredCount === 1 ? '' : 's'}.
              </p>
            )}
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowing(false)}
                className="rounded border border-paper-rule px-3 py-1.5 font-sans text-sm"
              >
                Keep working
              </button>
              <button
                onClick={onConfirm}
                className="rounded bg-paper-accent px-3 py-1.5 font-sans text-sm font-semibold text-paper"
              >
                Submit final
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
