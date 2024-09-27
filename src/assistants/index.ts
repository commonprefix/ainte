import type { AssistantResponse, MessageHistory } from "../types";

export interface Assistant {
    ask(question: string): Promise<AssistantResponse>;
    correct(code: string, issue: string): Promise<AssistantResponse>;
    appendOutput(output: string): Promise<void>;
    getLastOutput(): string;
    getHistory(): Promise<MessageHistory>;
}
