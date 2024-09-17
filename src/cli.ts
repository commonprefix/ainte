import inquirer from 'inquirer';
import ora, { type Ora } from 'ora';
import chalk from 'chalk';
import type { Assistant } from './assistants';
import { runCommand } from './command';
import type { AnswerType, AssistantResponse } from './types';

export class Cli {
  private static MAX_COMMAND_ATTEMPTS = 3;

  constructor(private assistant: Assistant) {}

  async spawn(): Promise<void> {
    while (true) {
      const { userInput } = await inquirer.prompt([
        {
          type: 'input',
          name: 'userInput',
          message: 'Ainte::',
        } as any,
      ]);
      await this.handleRequest(userInput);
    }
  }

  private async handleRequest(question: string): Promise<void> {
    const spinner = ora('Asking assistant').start();
    let answer: AssistantResponse | null = null;

    try {
      answer = await this.assistant.ask(question);
      spinner.succeed('Assistant responded');
      await this.processAnswer(answer);
    } catch (error) {
      this.handleError(spinner, error);
    }
  }

  private async processAnswer(answer: AssistantResponse): Promise<void> {
    const handlers: Record<AnswerType, (result: string) => Promise<void>> = {
      command: r => this.handleCommand(r),
      answer: r => this.logAnswer(r),
      question: r => this.logQuestion(r),
      rejection: r => this.logRejection(r),
    };

    const handler = handlers[answer.type] || this.logUnknownResponse.bind(this);
    await handler(answer.result);
  }

  private async handleCommand(command: string, attempts = 0): Promise<void> {
    console.log('\n' + chalk.greenBright('Assistant wants to execute'));
    this.logCommand(command);

    try {
      const output = await runCommand(command);
      await this.assistant.appendOutput(output);
    } catch (error) {
      await this.handleCommandError(command, error, attempts);
    }
  }

  private async handleCommandError(command: string, error: unknown, attempts: number): Promise<void> {
    if (attempts >= Cli.MAX_COMMAND_ATTEMPTS - 1) {
      console.error('Error running command. Giving up', error);
      return;
    }

    console.error(`Error running command. Attempt ${attempts + 1}/${Cli.MAX_COMMAND_ATTEMPTS}. Correcting`);
    const correction = await this.assistant.correct(command, (error as Error).message);
    console.log('Correction:', correction.result);
    await this.handleCommand(correction.result, attempts + 1);
  }

  private async logAnswer(result: string): Promise<void> {
    console.log('\n' + chalk.greenBright('Assistant has an answer'));
    console.log(result);
  }

  private async logQuestion(result: string): Promise<void> {
    console.log('\n' + chalk.magentaBright('Assistant has a question'));
    console.log(result);
  }

  private async logRejection(result: string): Promise<void> {
    console.log('\n' + chalk.redBright('Assistant rejected the command'));
    console.log(result);
  }

  private async logUnknownResponse(result: string): Promise<void> {
    console.log('\n' + chalk.yellowBright('Assistant broke character'));
    console.log(result);
  }

    // beautify bash command
    private async logCommand(command: string) {
    const beautifulScript = command
        .replace(/(curl)/g, chalk.cyan("$1")) // Highlighting 'curl' command
        .replace(/(-[sxX])/g, chalk.blue("$1")) // Highlighting options like -s, -X .replace(/(https?:\/\/[^\s]+)/g, chalk.magenta("$1")) // Highlighting URLs
        .replace(/(-H 'Content-Type: application\/json')/g, chalk.yellow("$1")) // Highlighting headers
        .replace(/(\{.*?\})/g, chalk.green("$1")) // Highlighting JSON data
        .replace(/(\| jq '.*?')/g, chalk.red("$1")) // Highlighting jq command
        .replace(/(\bfor\b|\bdo\b|\bdone\b)/g, chalk.blue("$1")) // Highlighting loop keywords
        .replace(/;/g, ";\n") // Insert newlines after semicolons
        .replace(/\b(do|then)\b/g, "$1\n  ") // Indent after 'do' or 'then'
        .replace(/\bdone\b/g, "\n$&\n") // Newline before and after 'done'
        .replace(/\n\s*(\b[a-zA-Z_]+\b)/g, "\n  $1"); // Indent other commands inside loops

        // Log the beautifully formatted Bash script
        console.log(beautifulScript);
        console.log("\n");
    }

  private handleError(spinner: Ora, error: unknown): void {
    spinner.fail('Assistant failed to respond');
    console.log(chalk.redBright((error as Error).message));
  }
}