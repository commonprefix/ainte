import fs from "fs";
import path from "path";
import { OpenAI } from "openai";
import { getEnv, getPrompt } from "../utils";
import chalk from "chalk";
import ora from "ora";

/**
 * This script creates a new GPT assistant with data from the local knowledge base.
 * It uses the OpenAI API to create the assistant, upload the files, create the vector store, and create the assistant.
 * Before running the script, make sure to set the OPENAI_API_KEY in the .env file.
 */

type KnowledgeBase = Record<string, fs.ReadStream>

const KNOWLEDGE_BASE_PATH = "./knowledge_base";
const VECTOR_STORE_NAME = "Ainte Knowledge Base";
const API_KEY = getEnv("OPENAI_API_KEY");
const openai = new OpenAI({ apiKey: API_KEY });

async function main() {
    let spinner = ora("Getting knowledge base").start();
    const knowledgeBase = await getKnowledgeBase();
    spinner.succeed();

    spinner = ora("Uploading knowledge base").start();
    const fileIds = await uploadKnowledgeBase(knowledgeBase);
    spinner.succeed();

    spinner = ora("Creating vector store").start();
    const vectorStore = await createVectorStore(fileIds);
    spinner.succeed();

    spinner = ora("Creating assistant").start();
    const assistantId = await createAssistant("Ainte Assistant", vectorStore);
    spinner.succeed();

    console.log(chalk.greenBright(`Put OPENAI_ASSISTANT_ID=${assistantId} in your .env file and you're all set!`));
}

/**
 * Create a new assistant with the given name and vector store id
 * @param name The name of the assistant
 * @param vectorStoreId The id of the vector store
 * @returns The id of the created assistant
 */
async function createAssistant(name: string, vectorStoreId: string): Promise<string> {
    const assistants = await openai.beta.assistants.list();
    console.log(assistants);
    const assistantFound = assistants.data.find((assistant) => assistant.name === name);
    if (assistantFound) {
        console.log(chalk.yellowBright(`Assistant already exists: ${name}.\nIf there are changes in the knowledge base, delete the assistant [https://platform.openai.com/assistants] and rerun the script`));
        return assistantFound.id;
    }

    const assistant = await openai.beta.assistants.create({
        name,
        instructions: getPrompt(),
        model: "gpt-4o",
        tool_resources: {
            file_search: {
                vector_store_ids: [vectorStoreId],
            }
        },
        tools: [{ type: "file_search" }],
    });

    console.log(chalk.greenBright(`Created assistant with id: ${assistant.id}`));
    return assistant.id;
}

/**
 * Get the knowledge base from the local file system
 * @returns The knowledge base
 */
async function getKnowledgeBase(): Promise<KnowledgeBase> {
    const files: KnowledgeBase = {};
    for (const folder of fs.readdirSync(KNOWLEDGE_BASE_PATH)) {
        for (const file of fs.readdirSync(path.join(KNOWLEDGE_BASE_PATH, folder))) {
            const filePath = path.join(KNOWLEDGE_BASE_PATH, folder, file);
            files[file] = fs.createReadStream(filePath);
        }
    }
    return files;
}

/**
 * Upload the knowledge base to the OpenAI API
 * @param knowledgeBase The knowledge base to upload
 * @returns The ids of the uploaded files
 */
async function uploadKnowledgeBase(knowledgeBase: KnowledgeBase) {
    const alreadyUploaded = await openai.files.list({ purpose: "assistants" });
    const alreadyUploadedFilenames = alreadyUploaded.data.map((file) => file.filename);

    for (const [name, file] of Object.entries(knowledgeBase)) {
        if (alreadyUploadedFilenames.includes(name)) {
            // console.log(chalk.yellowBright(`Skipping file: ${name} since it's already uploaded`));
            continue;
        }

        await openai.files.create({
            file,
            purpose: "assistants",
        });
    }

    const uploadedFiles = await openai.files.list({ purpose: "assistants" });
    return uploadedFiles.data.map((file) => file.id);
}

/**
 * Create a new vector store with the uploaded files
 * @param fileIds The ids of the uploaded files
 * @returns The id of the created vector store
 */
async function createVectorStore(fileIds: string[]): Promise<string> {
    const vectorStores = await openai.beta.vectorStores.list();
    const vectorStoreFound = vectorStores.data.find((store) => store.name === VECTOR_STORE_NAME);
    if (vectorStoreFound) {
        console.log(chalk.yellowBright(`\nVector store already exists: ${VECTOR_STORE_NAME}.\nIf there are changes in the knowledge base, delete the vector store [https://platform.openai.com/storage/vector_stores] and rerun the script`));
        return vectorStoreFound.id;
    }

    const vectorStore = await openai.beta.vectorStores.create({
        name: VECTOR_STORE_NAME,
        file_ids: fileIds,
    });

    return vectorStore.id;
}

main();