import inquirer from "inquirer";
import { type Assistant } from "./assistants/.";
import { commandRun } from "./command";
import { ClaudeAssistant } from "./assistants/Claude";
import GPTAssistant from "./assistants/Gpt";
import ora from "ora";
import chalk from "chalk";

async function main() {
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
        message: 'Ainte::',
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
  }
  catch (e: any) {
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

async function handleCommand(assistant: Assistant, command: string, attempts = 0) {
  const MAX_ATTEMPTS = 3;
  
  try {
      return await commandRun(command);
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

// beautify bash command
async function logCommand(command: string) {
   const beautifulScript = command
     .replace(/(curl)/g, chalk.cyan('$1')) // Highlighting 'curl' command
     .replace(/(-[sxX])/g, chalk.blue('$1')) // Highlighting options like -s, -X
     .replace(/(https?:\/\/[^\s]+)/g, chalk.magenta('$1')) // Highlighting URLs
     .replace(/(-H 'Content-Type: application\/json')/g, chalk.yellow('$1')) // Highlighting headers
     .replace(/(\{.*?\})/g, chalk.green('$1')) // Highlighting JSON data
     .replace(/(\| jq '.*?')/g, chalk.red('$1')) // Highlighting jq command
     .replace(/(\bfor\b|\bdo\b|\bdone\b)/g, chalk.blue('$1')) // Highlighting loop keywords
     .replace(/;/g, ';\n') // Insert newlines after semicolons
     .replace(/\b(do|then)\b/g, '$1\n  ') // Indent after 'do' or 'then'
     .replace(/\bdone\b/g, '\n$&\n') // Newline before and after 'done'
     .replace(/\n\s*(\b[a-zA-Z_]+\b)/g, '\n  $1'); // Indent other commands inside loops

   // Log the beautifully formatted Bash script
   console.log(beautifulScript);
   console.log("\n")
  }