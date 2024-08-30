import { Anthropic } from "@anthropic-ai/sdk";
import { getPrompt } from "./utils";
import type { AssistantResponse } from "./types";

export class AssistantClaude {
    private key = "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" 
    private anthropic: Anthropic 

    constructor() {
        this.anthropic = new Anthropic({
            apiKey: this.key
        });
    }
    
    async ask(question: string): Promise<AssistantResponse> {
        const msg = await this.anthropic.messages.create({
            model: "claude-3-opus-20240229",
            max_tokens: 1000,
            temperature: 0,
            system: getPrompt(),
            messages: [
              {
                "role": "user",
                "content": [
                  {
                    "type": "text",
                    "text": question
                  }
                ]
              }
            ]
          });

        // @ts-ignore
        const result =  msg.content[0].text
        const parsed = result.replace(/(\r\n|\n|\r)/gm, "")

        try {
            return JSON.parse(parsed) as AssistantResponse
        }
        catch (e) {
            console.error("Error parsing response", e)
            throw new Error("Invalid response from assistant: " + result);
        }
    }

    async correct(code: string, issue: string): Promise<AssistantResponse> {
        const msg = `${code}. The issue is ${issue}. Give me a correction that will fix the issue and make sure that the code runs properly without unix errors. Just the code inside the json, no explanations`
        return await this.ask(msg)
    }
}