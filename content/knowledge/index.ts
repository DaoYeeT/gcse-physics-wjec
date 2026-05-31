import type { ComponentType } from 'react';
import K_1_1_1 from './1-1-1.mdx';
import K_1_2_1 from './1-2-1.mdx';
import K_1_3_1 from './1-3-1.mdx';
import K_1_4_1 from './1-4-1.mdx';
import K_1_5_1 from './1-5-1.mdx';
import K_1_6_1 from './1-6-1.mdx';
import K_1_7_1 from './1-7-1.mdx';
import K_1_8_1 from './1-8-1.mdx';
import K_1_9_1 from './1-9-1.mdx';
import K_2_1_1 from './2-1-1.mdx';
import K_2_2_1 from './2-2-1.mdx';
import K_2_3_1 from './2-3-1.mdx';
import K_2_4_1 from './2-4-1.mdx';
import K_2_5_1 from './2-5-1.mdx';
import K_2_6_1 from './2-6-1.mdx';
import K_2_7_1 from './2-7-1.mdx';
import K_2_8_1 from './2-8-1.mdx';
import K_2_9_1 from './2-9-1.mdx';

export const KNOWLEDGE: Record<string, ComponentType> = {
  '1-1-1': K_1_1_1,
  '1-2-1': K_1_2_1,
  '1-3-1': K_1_3_1,
  '1-4-1': K_1_4_1,
  '1-5-1': K_1_5_1,
  '1-6-1': K_1_6_1,
  '1-7-1': K_1_7_1,
  '1-8-1': K_1_8_1,
  '1-9-1': K_1_9_1,
  '2-1-1': K_2_1_1,
  '2-2-1': K_2_2_1,
  '2-3-1': K_2_3_1,
  '2-4-1': K_2_4_1,
  '2-5-1': K_2_5_1,
  '2-6-1': K_2_6_1,
  '2-7-1': K_2_7_1,
  '2-8-1': K_2_8_1,
  '2-9-1': K_2_9_1,
};

export function getKnowledgeCard(slug: string): ComponentType | null {
  return KNOWLEDGE[slug] ?? null;
}
