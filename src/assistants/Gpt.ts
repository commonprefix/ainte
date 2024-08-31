import OpenAI from "openai";
import { getEnv, getPrompt } from "../utils";
import type { AssistantResponse } from "../types";
import type { Assistant } from ".";

const OPENAI_API_KEY = getEnv("OPEN_AI_KEY");
const NAME = getEnv("ASSISTANT_NAME");

export default class GPTAssistant implements Assistant {
    private openai: OpenAI;
    private assistantId?: string;
    private threadId?: string;

    constructor() {
        this.openai = new OpenAI({
            apiKey: OPENAI_API_KEY
        });
    }

    async initSession() {
        this.assistantId = await this.createAssistantIfNeeded(NAME)

        const thread = await this.openai.beta.threads.create();
        this.threadId = thread.id;
    }

    async createAssistantIfNeeded(name: string): Promise<string> {
        const assistants = await this.openai.beta.assistants.list();
        const relevant = assistants.data.filter(a => a.name == name).pop();
        if (relevant) {
            console.log("Assistant already exists", name)
            return relevant.id;
        }


        console.log("Creating new assistant with name")

        const assistant = await this.openai.beta.assistants.create({
            name,
            instructions: getPrompt(),
            model: "gpt-4o"
        });

        return assistant.id;
    }

    async ask(question: string): Promise<AssistantResponse> {
        if (!this.assistantId || !this.threadId) {
            throw new Error("Assistant not initialized");
        }

        await this.openai.beta.threads.messages.create(
            this.threadId,
            {
                role: "user",
                content: question
            }
        );

        let run = await this.openai.beta.threads.runs.createAndPoll(
            this.threadId,
            {
                assistant_id: this.assistantId,
            }
        );

        if (run.status != 'completed') {
            throw Error("Run not completed");
        }

        const messages = await this.openai.beta.threads.messages.list(
            run.thread_id
        );

        const message = messages.data[0];
        const content = message.content[0];
        // @ts-ignore
        const response = content["text"]["value"]

        try {
            return JSON.parse(response) as AssistantResponse;
        }
        catch (e) {
            throw new Error("Invalid response from assistant: " + response);
        }
    }

    async correct(code: string, issue: string): Promise<AssistantResponse> {
        const msg = `${code}. The issue is ${issue}. Give me a correction that will fix the issue and make sure that the code runs properly without unix errors. Just the code inside the json, no explanations`
        return await this.ask(msg)
    }
}