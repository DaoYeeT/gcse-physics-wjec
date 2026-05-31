import { describe, it, expect } from 'vitest';
import { SpecSchema } from '@/lib/content/schema';

describe('SpecSchema', () => {
  const valid = {
    board: 'WJEC',
    qualification: 'GCSE Physics (Higher Tier)',
    specCode: '3420QS',
    units: [{
      id: 'unit-1',
      title: 'Electricity, Energy and Waves',
      duration_min: 105,
      total_marks: 80,
      topics: [{
        id: '1-1',
        title: 'Electric circuits',
        weight: 0.10,
        higher_only: false,
        sub_topics: [{ id: '1-1-1', title: 'Current, p.d. and resistance', higher_only: false }],
      }],
    }],
    equations_sheet: [{ name: "Ohm's law", latex: 'V = IR', variables: [{ symbol: 'V', name: 'voltage', unit: 'V' }] }],
    constants: [{ symbol: 'g', value: 10, unit: 'N/kg', context: 'WJEC convention' }],
    ao_weights: { AO1: 0.40, AO2: 0.40, AO3: 0.20 },
  };

  it('parses a valid spec', () => {
    expect(() => SpecSchema.parse(valid)).not.toThrow();
  });

  it('rejects ao_weights that do not sum to 1', () => {
    expect(() => SpecSchema.parse({ ...valid, ao_weights: { AO1: 0.5, AO2: 0.5, AO3: 0.5 } })).toThrow();
  });

  it('rejects topic weights outside [0,1]', () => {
    const bad = { ...valid, units: [{ ...valid.units[0], topics: [{ ...valid.units[0].topics[0], weight: 1.5 }] }] };
    expect(() => SpecSchema.parse(bad)).toThrow();
  });
});
