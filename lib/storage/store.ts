import type { ZodTypeAny, z } from 'zod';

export interface TypedStore<T> {
  get(): T | null;
  set(value: T): void;
  clear(): void;
}

export function createTypedStore<S extends ZodTypeAny>(
  key: string,
  schema: S,
): TypedStore<z.infer<S>> {
  return {
    get() {
      if (typeof window === 'undefined') return null;
      const raw = window.localStorage.getItem(key);
      if (raw === null) return null;
      try {
        return schema.parse(JSON.parse(raw)) as z.infer<S>;
      } catch {
        return null;
      }
    },
    set(value) {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    clear() {
      if (typeof window === 'undefined') return;
      window.localStorage.removeItem(key);
    },
  };
}
