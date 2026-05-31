import { describe, it, expect, beforeEach } from 'vitest';
import { z } from 'zod';
import { createTypedStore } from '@/lib/storage/store';

const Schema = z.object({ count: z.number(), label: z.string() });

describe('createTypedStore', () => {
  beforeEach(() => { localStorage.clear(); });

  it('returns null when key absent', () => {
    const store = createTypedStore('test:thing', Schema);
    expect(store.get()).toBeNull();
  });
  it('round-trips a value', () => {
    const store = createTypedStore('test:thing', Schema);
    store.set({ count: 3, label: 'x' });
    expect(store.get()).toEqual({ count: 3, label: 'x' });
  });
  it('returns null on invalid data', () => {
    localStorage.setItem('test:thing', JSON.stringify({ count: 'oops', label: 'x' }));
    const store = createTypedStore('test:thing', Schema);
    expect(store.get()).toBeNull();
  });
  it('clear removes the key', () => {
    const store = createTypedStore('test:thing', Schema);
    store.set({ count: 1, label: 'a' });
    store.clear();
    expect(store.get()).toBeNull();
  });
});
