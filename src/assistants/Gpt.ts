import OpenAI from "openai";
import { getEnv, getPrompt } from "../utils";
import type { AssistantResponse } from "../types";
import type { Assistant } from ".";

export default class GPTAssistant implements Assistant {
  private openai: OpenAI;
  private assistantId?: string;
  private threadId?: string;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async initSession(assistantName: string) {
    // Uncomment to create new assistant from Prompt.MD if the assistant does not exist
    //this.assistantId = await this.createAssistantIfNeeded(NAME)
    const assistantId = await this.assistantExists(assistantName);
    if (!assistantId) {
      throw new Error("Assistant not found");
    }
    console.log(
      `Initialized assistant with assistantId: ${assistantId} and name: ${assistantName}`,
    );
    this.assistantId = assistantId;

    const thread = await this.openai.beta.threads.create();
    this.threadId = thread.id;
  }

  async assistantExists(name: string): Promise<string | null> {
    const assistants = await this.openai.beta.assistants.list();
    const relevant = assistants.data.filter((a) => a.name == name).pop();
    return relevant ? relevant.id : null;
  }

  async createAssistantIfNeeded(name: string): Promise<string> {
    const assistandId = await this.assistantExists(name);
    if (assistandId) {
      console.log("Assistant already exists", name);
      return assistandId;
    }

    console.log("Creating new assistant with name", name);

    const assistant = await this.openai.beta.assistants.create({
      name,
      instructions: getPrompt(),
      model: "gpt-4o",
    });

    return assistant.id;
  }

  async ask(question: string): Promise<AssistantResponse> {
    if (!this.assistantId || !this.threadId) {
      throw new Error("Assistant not initialized");
    }

    await this.openai.beta.threads.messages.create(this.threadId, {
      role: "user",
      content: question,
    });

    let run = await this.openai.beta.threads.runs.createAndPoll(this.threadId, {
      assistant_id: this.assistantId,
    });

    if (run.status != "completed") {
      throw Error("Run not completed");
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
}
