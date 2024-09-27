import { Anthropic } from "@anthropic-ai/sdk";
import { getEnv, getPrompt } from "../utils";
import type { AssistantResponse } from "../types";

export class ClaudeAssistant {
    private anthropic: Anthropic;
    private history: Anthropic.MessageParam[] = [];

    constructor() {
        this.anthropic = new Anthropic({
            apiKey: getEnv("ANTHROPIC_API_KEY"),
        });
    }

    async ask(question: string): Promise<AssistantResponse> {
        const msg = await this.anthropic.messages.create({
            model: "claude-3-sonnet-20240229",
            max_tokens: 1000,
            temperature: 0,
            system: getPrompt(),
            messages: [
                ...this.history,
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `${question}. Only json response as discussed please`,
                        },
                    ],
                },
            ],
        });

        // @ts-ignore
        const result = msg.content[0].text;
        const parsed = result.replace(/(\r\n|\n|\r)/gm, "");

        this.pushToHistory(question, "user");
        this.pushToHistory(result, "assistant");

        try {
            return JSON.parse(parsed) as AssistantResponse;
        } catch (e) {
            console.error("Error parsing response", e);
            throw new Error("Invalid response from assistant: " + result);
        }
    }

    async correct(code: string, issue: string): Promise<AssistantResponse> {
        const msg = `${code}. The issue is ${issue}. Give me a correction that will fix the issue and make sure that the code runs properly without unix errors. Just the code inside the json, no explanations`;
        return await this.ask(msg);
    }

    async appendOutput(output: string): Promise<void> {
        const msg = `Here is the output of the code: ${output}`;
        this.history.push({
            role: "user",
            content: [
                {
                    type: "text",
                    text: msg,
                },
            ],
        });
    }

    async getLastOutput(): Promise<string> {
        // @ts-ignore
        return this.history[this.history.length - 1].content[0].text;
    }

    private pushToHistory(messageStr: string, from: "user" | "assistant") {
        this.history.push({
            role: from,
            content: [
                {
                    type: "text",
                    text: messageStr,
                },
            ],
        });
    }
}
