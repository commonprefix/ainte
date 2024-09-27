import type { AssistantResponse } from "../types";

export interface Assistant {
    ask(question: string): Promise<AssistantResponse>;
    correct(code: string, issue: string): Promise<AssistantResponse>;
    appendOutput(output: string): Promise<void>;
    getLastOutput(): string;
}
