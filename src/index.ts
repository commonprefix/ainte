import GPTAssistant from "./assistants/Gpt";
import chalk from "chalk";
import { getEnv} from "./utils";
import { Cli } from "./cli";

const OPENAI_API_KEY = getEnv("OPEN_AI_KEY");
const ASSISTANT_NAME = getEnv("ASSISTANT_NAME");

async function main() {
  const assistant = new GPTAssistant(OPENAI_API_KEY);
  await assistant.initSession(ASSISTANT_NAME);

  const cli = new Cli(assistant);
  await cli.spawn()
}

main().catch((e: any) => {
  console.log(chalk.redBright(e.message));
});