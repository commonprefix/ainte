import GPTAssistant from "./assistants/Gpt";
import chalk from "chalk";
import { getEnv } from "./utils";
import { Cli } from "./cli";

const OPENAI_API_KEY = getEnv("OPENAI_API_KEY");
const OPENAI_ASSISTANT_ID = getEnv("OPENAI_ASSISTANT_ID", undefined);

async function main() {
    const assistant = new GPTAssistant(OPENAI_API_KEY);
    await assistant.initSession(OPENAI_ASSISTANT_ID);

    const cli = new Cli(assistant);
    await cli.spawn();
}

main().catch((e: any) => {
    console.log(chalk.redBright(e.message));
});
