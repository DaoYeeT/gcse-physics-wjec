'use client';
import { useEffect, useState } from 'react';

interface Props {
  remainingSec: number;
  onExpire: () => void;
}

function format(s: number): string {
  const m = Math.floor(Math.max(0, s) / 60);
  const sec = Math.max(0, s) % 60;
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

export function Timer({ remainingSec, onExpire }: Props) {
  const [sec, setSec] = useState(remainingSec);

  useEffect(() => { setSec(remainingSec); }, [remainingSec]);

  useEffect(() => {
    if (sec <= 0) { onExpire(); return; }
    const id = setInterval(() => setSec((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [sec, onExpire]);

  return (
    <span className="tabular-nums font-mono" role="timer" aria-live="off">
      {format(sec)}
    </span>
  );
}
