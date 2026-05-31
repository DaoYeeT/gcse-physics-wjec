import type { ComponentType } from 'react';
import Knowledge_1_1_1 from './1-1-1.mdx';

const KNOWLEDGE_CARDS: Record<string, ComponentType> = {
  '1-1-1': Knowledge_1_1_1,
};

export function getKnowledgeCard(slug: string): ComponentType | null {
  return KNOWLEDGE_CARDS[slug] ?? null;
}
