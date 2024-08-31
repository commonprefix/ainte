export type AssistantResponse = {
    type: "command" | "question" | "rejection",
    result: string
};