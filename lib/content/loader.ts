import { SpecSchema, QuestionBankSchema, type Spec, type QuestionBank } from './schema';
import specJson from '@/content/spec.json';
import questionsJson from '@/content/questions.json';

let cachedSpec: Spec | null = null;
let cachedQuestions: QuestionBank | null = null;

export function loadSpec(): Spec {
  if (cachedSpec) return cachedSpec;
  cachedSpec = SpecSchema.parse(specJson);
  return cachedSpec;
}

export function loadQuestions(): QuestionBank {
  if (cachedQuestions) return cachedQuestions;
  cachedQuestions = QuestionBankSchema.parse(questionsJson);
  return cachedQuestions;
}

export function getQuestionById(id: string) {
  return loadQuestions().find((q) => q.id === id);
}

export function getQuestionsByTopic(topicId: string) {
  return loadQuestions().filter((q) => q.topic_id.startsWith(topicId));
}

export function getSubTopicById(subTopicId: string) {
  for (const unit of loadSpec().units) {
    for (const topic of unit.topics) {
      const st = topic.sub_topics.find((s) => s.id === subTopicId);
      if (st) return { unit, topic, subTopic: st };
    }
  }
  return null;
}
