import { describe, it, expect } from 'vitest';
import { createRng } from '@/lib/mock-paper/rng';

describe('createRng', () => {
  it('same seed → same sequence', () => {
    const a = createRng(42); const b = createRng(42);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });
  it('different seed → different sequence', () => {
    const a = createRng(1); const b = createRng(2);
    expect(a()).not.toEqual(b());
  });
  it('values in [0,1)', () => {
    const r = createRng(7);
    for (let i = 0; i < 100; i++) {
      const v = r();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});
