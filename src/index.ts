import inquirer from "inquirer";
import { type Assistant } from "./assistants/.";
import { commandRun } from "./command";
import { ClaudeAssistant } from "./assistants/Claude";
import GPTAssistant from "./assistants/Gpt";
import ora from "ora";
import chalk from "chalk";
import { getEnv, logCommand } from "./utils";

const OPENAI_API_KEY = getEnv("OPEN_AI_KEY");
const ASSISTANT_NAME = getEnv("ASSISTANT_NAME");

async function main() {
  const assistant = new GPTAssistant(OPENAI_API_KEY);
  try {
    await assistant.initSession(ASSISTANT_NAME);
  } catch (e: any) {
    console.log(chalk.redBright(e.message));
    return;
  }

  askQuestion(assistant);
}

main();

function askQuestion(assistant: Assistant) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "userInput",
        message: "Ainte::",
      } as any,
    ])
    .then(async (question: any) => {
      await handleRequest(assistant, question.userInput);
      askQuestion(assistant);
    });
}

async function handleRequest(assistant: Assistant, question: string) {
  const spinner = ora("Asking assistant").start();
  let answer = null;
  try {
    answer = await assistant.ask(question);
  } catch (e: any) {
    spinner.fail("Assistant failed to respond");
    console.log(chalk.redBright(e.message));
    return;
  }

  spinner.succeed("Assistant responded");

  switch (answer.type) {
    case "command":
      console.log("\n" + chalk.greenBright("Assistant wants to execute"));
      logCommand(answer.result);
      const res = await handleCommand(assistant, answer.result, 0);
      console.log(chalk.bgGreen("Output:"));
      console.log(res);
      break;
    case "answer":
      console.log("\n" + chalk.greenBright("Assistant has an answer"));
      console.log(answer.result);
      break;
    case "question":
      console.log("\n" + chalk.magentaBright("Assistant has a question"));
      console.log(answer.result);
      break;
    case "rejection":
      console.log("\n" + chalk.redBright("Assistant rejected the command"));
      console.log(answer.result);
      console.log("Rejection:", answer);
      break;
    default:
      console.log("\n" + chalk.yellowBright("Assistant broke character"));
      console.log(answer.result);
  }
}

async function handleCommand(
  assistant: Assistant,
  command: string,
  attempts = 0,
) {
  const MAX_ATTEMPTS = 3;

  try {
    return await commandRun(command);
  } catch (e: unknown) {
    if (attempts >= MAX_ATTEMPTS - 1) {
      console.error("Error running command. Giving up", e);
      return;
    }

    console.error(
      `Error running command. Attempt ${attempts + 1}/${MAX_ATTEMPTS}. Correcting`,
    );

    // @ts-ignore
    const correction = await assistant.correct(command, e.message);
    console.log("Correction:", correction.result);
    await handleCommand(assistant, correction.result, attempts + 1);
  }
}
