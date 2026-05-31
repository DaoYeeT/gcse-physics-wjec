import { describe, it, expect } from 'vitest';
import { normalizeUnit, unitsEqual } from '@/lib/grading/units';

describe('normalizeUnit', () => {
  it.each([
    ['m/s', 'm s^-1'],
    ['m s-1', 'm s^-1'],
    ['ms^-1', 'm s^-1'],
    ['ms⁻¹', 'm s^-1'],
    ['kg m s^-2', 'kg m s^-2'],
    ['N', 'N'],
    ['  Ω  ', 'ohm'],
    ['ohms', 'ohm'],
    ['Ω', 'ohm'],
    ['m^2', 'm^2'],
    ['m²', 'm^2'],
    ['', ''],
  ])('normalizes %s → %s', (input, expected) => {
    expect(normalizeUnit(input)).toBe(expected);
  });
});

describe('unitsEqual', () => {
  it('treats equivalent forms as equal', () => {
    expect(unitsEqual('m/s', 'm s^-1')).toBe(true);
    expect(unitsEqual('Ω', 'ohm')).toBe(true);
  });
  it('distinguishes different units', () => {
    expect(unitsEqual('N', 'J')).toBe(false);
  });
});
