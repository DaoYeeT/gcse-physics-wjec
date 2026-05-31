import { describe, it, expect } from 'vitest';
import { loadSpec, loadQuestions } from '@/lib/content/loader';

describe('content loader', () => {
  it('loads and validates spec', () => {
    const spec = loadSpec();
    expect(spec.board).toBe('WJEC');
    expect(spec.units.length).toBeGreaterThan(0);
  });
  it('loads and validates question bank', () => {
    const qs = loadQuestions();
    expect(qs.length).toBeGreaterThan(0);
    expect(qs[0].id).toMatch(/^q-/);
  });
});
