export type AnswerType = 'command' | 'answer' | 'question' | 'rejection';

export type AssistantResponse = {
  type: AnswerType;
  result: string;
};
