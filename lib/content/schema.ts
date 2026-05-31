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
