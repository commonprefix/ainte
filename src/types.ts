import fs from "fs";

export type AnswerType = "command" | "answer" | "question" | "rejection";

export type AssistantResponse = {
    type: AnswerType;
    result: string;
};

export type CommandResult = {
    command: string;
    output: string;
    error: string;
};

export type MessageHistory = {
    role: "user" | "assistant";
    content: string;
}[];

export type KnowledgeBase = Record<string, fs.ReadStream>