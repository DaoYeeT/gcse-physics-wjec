'use client';
import type { Question } from '@/lib/content/schema';
import type { UserAnswer } from '@/lib/grading';
import { MCQItem } from './MCQItem';
import { NumericItem } from './NumericItem';
import { WrittenItem } from './WrittenItem';
import { QER6Item } from './QER6Item';

interface Props {
  question: Question;
  answer: UserAnswer | undefined;
  onChange: (a: UserAnswer) => void;
  disabled?: boolean;
}

export function QuestionCard({ question, answer, onChange, disabled }: Props) {
  switch (question.type) {
    case 'mcq':
      return (
        <MCQItem
          question={question}
          selectedIndex={answer?.kind === 'mcq' ? answer.index : null}
          onSelect={(i) => onChange({ kind: 'mcq', index: i })}
          disabled={disabled}
        />
      );
    case 'numeric': {
      const a = answer?.kind === 'numeric' ? answer : { kind: 'numeric' as const, value: null, unit: '', working: '' };
      return (
        <NumericItem
          question={question}
          value={a.value}
          unit={a.unit}
          working={a.working}
          onChange={(v) => onChange({ kind: 'numeric', ...v })}
          disabled={disabled}
        />
      );
    }
    case 'short':
    case 'structured': {
      const text = answer?.kind === 'written' ? answer.text : '';
      const ticks = answer?.kind === 'written' ? answer.ticks : [];
      return (
        <WrittenItem
          question={question}
          text={text}
          onChange={(t) => onChange({ kind: 'written', text: t, ticks })}
          disabled={disabled}
        />
      );
    }
    case 'qer6': {
      const text = answer?.kind === 'qer6' ? answer.text : '';
      const band = answer?.kind === 'qer6' ? answer.band : 0;
      return (
        <QER6Item
          question={question}
          text={text}
          onChange={(t) => onChange({ kind: 'qer6', text: t, band })}
          disabled={disabled}
        />
      );
    }
  }
}
