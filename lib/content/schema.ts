import { z } from 'zod';

export const VariableSchema = z.object({
  symbol: z.string().min(1),
  name: z.string().min(1),
  unit: z.string(),
});

export const EquationSchema = z.object({
  name: z.string().min(1),
  latex: z.string().min(1),
  variables: z.array(VariableSchema),
  higher_only: z.boolean().optional().default(false),
});

export const ConstantSchema = z.object({
  symbol: z.string().min(1),
  value: z.number(),
  unit: z.string(),
  context: z.string().optional(),
});

export const SubTopicSchema = z.object({
  id: z.string().regex(/^\d-\d+-\d+$/),
  title: z.string().min(1),
  higher_only: z.boolean(),
});

export const TopicSchema = z.object({
  id: z.string().regex(/^\d-\d+$/),
  title: z.string().min(1),
  weight: z.number().min(0).max(1),
  higher_only: z.boolean(),
  sub_topics: z.array(SubTopicSchema).min(1),
});

export const UnitSchema = z.object({
  id: z.string().regex(/^unit-\d+$/),
  title: z.string().min(1),
  duration_min: z.number().int().positive(),
  total_marks: z.number().int().positive(),
  topics: z.array(TopicSchema).min(1),
});

export const AOWeightsSchema = z
  .object({ AO1: z.number(), AO2: z.number(), AO3: z.number() })
  .refine(
    (w) => Math.abs(w.AO1 + w.AO2 + w.AO3 - 1) < 0.001,
    { message: 'AO weights must sum to 1.0' },
  );

export const SpecSchema = z.object({
  board: z.literal('WJEC'),
  qualification: z.string().min(1),
  specCode: z.string().min(1),
  units: z.array(UnitSchema).min(1),
  equations_sheet: z.array(EquationSchema),
  constants: z.array(ConstantSchema),
  ao_weights: AOWeightsSchema,
});

export type Spec = z.infer<typeof SpecSchema>;
export type Unit = z.infer<typeof UnitSchema>;
export type Topic = z.infer<typeof TopicSchema>;
export type SubTopic = z.infer<typeof SubTopicSchema>;
export type Equation = z.infer<typeof EquationSchema>;
export type Constant = z.infer<typeof ConstantSchema>;

export const MarkPointSchema = z.object({
  point: z.string().min(1),
  marks: z.number().int().min(1),
  accept: z.array(z.string()).optional(),
  reject: z.array(z.string()).optional(),
});

export const FigureSchema = z.object({
  ref: z.string().min(1),
  alt: z.string().min(1),
});

const QuestionBase = z.object({
  id: z.string().regex(/^q-[a-z0-9-]+$/),
  topic_id: z.string().regex(/^\d-\d+-\d+$/),
  higher_only: z.boolean(),
  prompt: z.string().min(1),
  marks: z.number().int().min(1),
  assessment_objective: z.enum(['AO1', 'AO2', 'AO3']),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  data_provided: z.record(z.string()).optional(),
  figures: z.array(FigureSchema).optional(),
  part_of: z.string().optional(),
  answer_lines: z.number().int().min(1).optional(),
});

const McqSchema = QuestionBase.extend({
  type: z.literal('mcq'),
  options: z.array(z.string().min(1)).length(4),
  correct_index: z.number().int().min(0).max(3),
});

const NumericSchema = QuestionBase.extend({
  type: z.literal('numeric'),
  answer_value: z.number(),
  answer_unit: z.string(),
  tolerance_pct: z.number().min(0).max(20),
  requires_unit: z.boolean().optional().default(true),
  working_steps: z.array(z.string()).optional(),
});

const ShortSchema = QuestionBase.extend({
  type: z.literal('short'),
  mark_scheme: z.array(MarkPointSchema).min(1),
});

const StructuredSchema = QuestionBase.extend({
  type: z.literal('structured'),
  mark_scheme: z.array(MarkPointSchema).min(1),
});

const Qer6Schema = QuestionBase.extend({
  type: z.literal('qer6'),
  marks: z.literal(6),
  mark_scheme: z.array(MarkPointSchema).min(1),
});

export const QuestionSchema = z.discriminatedUnion('type', [
  McqSchema, NumericSchema, ShortSchema, StructuredSchema, Qer6Schema,
]);

export const QuestionBankSchema = z.array(QuestionSchema).superRefine((qs, ctx) => {
  const seen = new Set<string>();
  for (const q of qs) {
    if (seen.has(q.id)) {
      ctx.addIssue({ code: 'custom', message: `duplicate question id: ${q.id}`, path: [q.id] });
    }
    seen.add(q.id);
  }
});

export type Question = z.infer<typeof QuestionSchema>;
export type QuestionBank = z.infer<typeof QuestionBankSchema>;
export type MarkPoint = z.infer<typeof MarkPointSchema>;
export type Figure = z.infer<typeof FigureSchema>;
