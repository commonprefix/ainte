import inquirer from "inquirer";
import { type Assistant } from "./assistants/.";
import { commandRun } from "./command";
import { ClaudeAssistant } from "./assistants/Claude";
import GPTAssistant from "./assistants/Gpt";

async function main() {
  // const assistant = new ClaudeAssistant();
  const assistant = new GPTAssistant();
  await assistant.initSession();

  askQuestion(assistant);
}

main();

function askQuestion(assistant: Assistant) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'userInput',
        message: 'Enter something:',
      } as any,
    ])
    .then(async (question: any) => {
      await handleRequest(assistant, question.userInput);
      askQuestion(assistant);
    });
}

async function handleRequest(assistant: Assistant, question: string) {
  const answer = await assistant.ask(question);
  
  switch (answer.type) {
      case "command":
          await handleCommand(assistant, answer.result);
          break;
      case "question":
          console.log("Question:", answer);
          break;
      case "rejection":
          console.log("Rejection:", answer);
          break;
      default:
          console.log("The assistant broke character", answer);
  }
}

async function handleCommand(assistant: Assistant, command: string, attempts = 0) {
  const MAX_ATTEMPTS = 3;
  
  try {
      const res = await commandRun(command);
      console.log(res);
  } catch (e: unknown) {
      if (attempts >= MAX_ATTEMPTS - 1) {
          console.error("Error running command. Giving up", e);
          return;
      }
      
      console.error(`Error running command. Attempt ${attempts + 1}/${MAX_ATTEMPTS}. Correcting`);
      // @ts-ignore
      const correction = await assistant.correct(command, e.message);
      console.log("Correction:", correction.result);
      await handleCommand(assistant, correction.result, attempts + 1);
  }
}