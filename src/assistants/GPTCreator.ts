import fs from "fs";
import path from "path";
import { OpenAI } from "openai";
import ora, { type Ora } from "ora";
import { logGreen, logYellow } from "../logger";
import type { KnowledgeBase } from "../types";
import chalk from "chalk";

const KNOWLEDGE_BASE_PATH = "ai/knowledge_base";
const PROMPT_PATH = "ai/prompt.md";
const VECTOR_STORE_NAME = "Ainte Knowledge Base";

/**
 * This script creates a new GPT assistant with data from the local knowledge base.
 * It uses the OpenAI API to create the assistant, upload the files, create the vector store, and create the assistant.
 * Before running the script, make sure to set the OPENAI_API_KEY in the .env file.
 */

export class GPTAssistantCreator {
    constructor(private openai: OpenAI) {}

    async create() {
        let spinner = ora("Getting knowledge base").start();
        const knowledgeBase = await this.getKnowledgeBase(spinner);

        spinner = ora("Uploading knowledge base").start();
        const fileIds = await this.uploadKnowledgeBase(spinner, knowledgeBase);

        spinner = ora("Creating vector store").start();
        const vectorStore = await this.createVectorStore(spinner, fileIds);

        spinner = ora("Creating assistant").start();
        const assistantId = await this.createAssistant(spinner, "Ainte Assistant", vectorStore);

        logYellow(`\nRemember to put OPENAI_ASSISTANT_ID=${assistantId} in your .env file.\nThat way you won't create new assistants every time you run ainte!`);

        return assistantId;
    }

    /**
     * Create a new assistant with the given name and vector store id
     * @param name The name of the assistant
     * @param vectorStoreId The id of the vector store
     * @returns The id of the created assistant
     */
    private async createAssistant(spinner: Ora, name: string, vectorStoreId: string): Promise<string> {
        const assistants = await this.openai.beta.assistants.list();
        let assistant = assistants.data.find((assistant) => assistant.name === name);
        if (assistant) {
            spinner.succeed(chalk.yellowBright(`Assistant with the name ${name} already exists`))
            return assistant.id;
        }

        assistant = await this.openai.beta.assistants.create({
            name,
            instructions: this.getPrompt(),
            model: "gpt-4o",
            tool_resources: {
                file_search: {
                    vector_store_ids: [vectorStoreId],
                }
            },
            tools: [{ type: "file_search" }],
        });

        spinner.succeed(chalk.greenBright(`Created assistant with id: ${assistant.id}`));
        return assistant.id;
    }

    /**
     * Get the knowledge base from the local file system
     * @returns The knowledge base
     */
    private async getKnowledgeBase(spinner: Ora): Promise<KnowledgeBase> {
        const files: KnowledgeBase = {};
        for (const folder of fs.readdirSync(KNOWLEDGE_BASE_PATH)) {
            for (const file of fs.readdirSync(path.join(KNOWLEDGE_BASE_PATH, folder))) {
                const filePath = path.join(KNOWLEDGE_BASE_PATH, folder, file);
                files[file] = fs.createReadStream(filePath);
            }
        }

        spinner.succeed("Knowledge base loaded from files");
        return files;
    }

    /**
     * Upload the knowledge base to the OpenAI API
     * @param knowledgeBase The knowledge base to upload
     * @returns The ids of the uploaded files
     */
    private async uploadKnowledgeBase(spinner: Ora, knowledgeBase: KnowledgeBase) {
        const alreadyUploaded = await this.openai.files.list({ purpose: "assistants" });
        const alreadyUploadedFilenames = alreadyUploaded.data.map((file) => file.filename);

        for (const [name, file] of Object.entries(knowledgeBase)) {
            if (alreadyUploadedFilenames.includes(name)) {
                // console.log(chalk.yellowBright(`Skipping file: ${name} since it's already uploaded`));
                continue;
            }

            await this.openai.files.create({
                file,
                purpose: "assistants",
            });
        }

        spinner.succeed("Knowledge base uploaded to OpenAI");
        const uploadedFiles = await this.openai.files.list({ purpose: "assistants" });
        return uploadedFiles.data.map((file) => file.id);
    }

    /**
     * Create a new vector store with the uploaded files
     * @param fileIds The ids of the uploaded files
     * @returns The id of the created vector store
     */
    private async createVectorStore(spinner: Ora, fileIds: string[]): Promise<string> {
        const vectorStores = await this.openai.beta.vectorStores.list();
        const vectorStoreFound = vectorStores.data.find((store) => store.name === VECTOR_STORE_NAME);
        if (vectorStoreFound) {
            spinner.succeed(chalk.yellowBright(`Vector store already exists: ${VECTOR_STORE_NAME}`));
            return vectorStoreFound.id;
        }

        const vectorStore = await this.openai.beta.vectorStores.create({
            name: VECTOR_STORE_NAME,
            file_ids: fileIds,
        });

        spinner.succeed("Vector store created");
        return vectorStore.id;
    }

    private getPrompt(): string {
        return fs.readFileSync(PROMPT_PATH, "utf8");
    }
}
