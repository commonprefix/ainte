import OpenAI from "openai";
import { stripString } from "../utils";
import type { AssistantResponse, MessageHistory } from "../types";
import type { Assistant } from ".";
import chalk from "chalk";
import { logGreen, logRed, logYellow } from "../logger";
import { GPTAssistantCreator } from "./GPTCreator";

export default class GPTAssistant implements Assistant {
    private openai: OpenAI;
    private assistantId?: string;
    private threadId?: string;
    private outputs: string[] = [];

    constructor(apiKey: string) {
        this.openai = new OpenAI({ apiKey });
    }

    async initSession(assistantId: string | undefined) {
        if (!assistantId) {
            logYellow("No assistant id provided, creating a new assistant");
            const creator = new GPTAssistantCreator(this.openai);
            assistantId = await creator.create();
        }

        logGreen(`Using assistant with id: ${assistantId}`);

        this.assistantId = assistantId;
        const thread = await this.openai.beta.threads.create();
        this.threadId = thread.id;
    }

    async ask(question: string): Promise<AssistantResponse> {
        if (!this.assistantId || !this.threadId) {
            throw new Error("Assistant not initialized");
        }

        await this.openai.beta.threads.messages.create(this.threadId, {
            role: "user",
            content: question,
        });

        let run = await this.openai.beta.threads.runs.createAndPoll(
            this.threadId,
            {
                assistant_id: this.assistantId,
            },
        );

        if (run.status != "completed") {
            throw Error("Run not completed: " + run.status);
        }

        const messages = await this.openai.beta.threads.messages.list(
            run.thread_id,
        );

        const message = messages.data[0];
        const content = message.content[0];
        // @ts-ignore
        const response = content["text"]["value"];

        try {
            return JSON.parse(response) as AssistantResponse;
        } catch (e) {
            throw new Error("Invalid response from assistant: " + response);
        }
    }

    async correct(code: string, issue: string): Promise<AssistantResponse> {
        const msg = `${code}. The issue is ${issue}. Give me a correction that will fix the issue and make sure that the code runs properly without unix errors. Just the code inside the json, no explanations`;
        return await this.ask(msg);
    }

    async appendOutput(output: string): Promise<void> {
        this.outputs.push(output);

        if (!this.threadId) {
            throw new Error("Assistant not initialized");
        }

        const msg = `Here is the output of the previous command you posted:\n${output}`;
        try {
            await this.openai.beta.threads.messages.create(this.threadId, {
                role: "user",
                content: msg,
            });
        } catch (e: any) {
            // TODO: Fix error handling
            logRed("Will not append output, because it is too long");
        }
    }

    async getHistory(): Promise<MessageHistory> {
        if (!this.threadId) {
            throw new Error("Assistant not initialized");
        }

        const messages = await this.openai.beta.threads.messages.list(this.threadId)

        return messages.data.reverse().map((m) => ({
            role: m.role,
            // @ts-ignore
            content: stripString(m.content[0]?.text?.value ?? "")
        }));
    }

    getLastOutput(): string {
        return this.outputs[this.outputs.length - 1];
    }

    private async assistantExists(name: string): Promise<string | null> {
        const assistants = await this.openai.beta.assistants.list();
        const relevant = assistants.data.filter((a) => a.name == name).pop();
        return relevant ? relevant.id : null;
    }
}
