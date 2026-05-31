import { describe, it, expect } from 'vitest';
import { calc } from '@/lib/calc/eval';

describe('calc', () => {
  it.each([
    ['2+3', 5],
    ['2*3+4', 10],
    ['(2+3)*4', 20],
    ['10/4', 2.5],
    ['2^3', 8],
    ['sqrt(9)', 3],
    ['sin(0)', 0],
    ['cos(0)', 1],
    ['pi', Math.PI],
    ['e', Math.E],
    ['log(1000)', 3],
    ['ln(e)', 1],
    ['9.81*0.5', 4.905],
  ])('evaluates %s → %f', (expr, expected) => {
    expect(calc(expr)).toBeCloseTo(expected, 10);
  });

  it('throws on syntax error', () => {
    expect(() => calc('2++')).toThrow();
  });
});
