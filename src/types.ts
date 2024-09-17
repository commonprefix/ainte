export type AssistantResponse = {
  type: "command" | "question" | "rejection" | "answer";
  result: string;
};
