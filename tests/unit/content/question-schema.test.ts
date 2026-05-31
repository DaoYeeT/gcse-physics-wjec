import { describe, it, expect } from 'vitest';
import { QuestionSchema, QuestionBankSchema } from '@/lib/content/schema';

const mcq = {
  id: 'q-elec-001', topic_id: '1-1-1', higher_only: false, type: 'mcq',
  prompt: 'Which has lowest resistance?', marks: 1,
  assessment_objective: 'AO1', difficulty: 1,
  options: ['copper', 'iron', 'nichrome', 'tungsten'], correct_index: 0,
};
const numeric = {
  id: 'q-elec-002', topic_id: '1-1-1', higher_only: true, type: 'numeric',
  prompt: 'Calculate the resistance.', marks: 3,
  assessment_objective: 'AO2', difficulty: 2,
  answer_value: 12, answer_unit: 'ohm', tolerance_pct: 2, requires_unit: true,
  working_steps: ['R = V/I', 'R = 24/2 = 12 Ω'],
};
const qer6 = {
  id: 'q-elec-099', topic_id: '1-3-1', higher_only: true, type: 'qer6',
  prompt: 'Compare conduction in metals vs non-metals.', marks: 6,
  assessment_objective: 'AO3', difficulty: 3,
  mark_scheme: [{ point: 'Mentions delocalised electrons', marks: 1 }],
};

describe('QuestionSchema', () => {
  it('accepts mcq', () => { expect(() => QuestionSchema.parse(mcq)).not.toThrow(); });
  it('accepts numeric', () => { expect(() => QuestionSchema.parse(numeric)).not.toThrow(); });
  it('accepts qer6', () => { expect(() => QuestionSchema.parse(qer6)).not.toThrow(); });
  it('rejects mcq missing correct_index', () => {
    const bad = { ...mcq, correct_index: undefined };
    expect(() => QuestionSchema.parse(bad)).toThrow();
  });
  it('rejects numeric missing answer_value', () => {
    const bad = { ...numeric, answer_value: undefined };
    expect(() => QuestionSchema.parse(bad)).toThrow();
  });
  it('rejects marks > 6 for qer6', () => {
    const bad = { ...qer6, marks: 8 };
    expect(() => QuestionSchema.parse(bad)).toThrow();
  });
});

describe('QuestionBankSchema', () => {
  it('rejects duplicate ids', () => {
    expect(() => QuestionBankSchema.parse([mcq, { ...numeric, id: 'q-elec-001' }])).toThrow();
  });
});
