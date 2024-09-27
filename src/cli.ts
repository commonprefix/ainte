import inquirer from "inquirer";
import ora, { type Ora } from "ora";
import chalk from "chalk";
import type { Assistant } from "./assistants";
import { runShellScript } from "./bash";
import type { AnswerType, AssistantResponse } from "./types";
import { spawnSync } from "child_process";
import type { CustomCommandProcessor } from "./customCommand";
import { stripAnsiCodes } from "./utils";

export class Cli {
    private static MAX_COMMAND_ATTEMPTS = 3;

    constructor(private assistant: Assistant, private customCommand: CustomCommandProcessor) {}

    async spawn(): Promise<void> {
        this.introMessage();
        while (true) {
            const { userInput } = await inquirer.prompt([
                {
                    type: "input",
                    name: "userInput",
                    message: "Ainte::",
                } as any,
            ]);

            if (await this.customCommand.isCustomCommand(userInput)) {
                await this.customCommand.processCommand(userInput);
                continue
            }

            await this.handleRequest(userInput);
        }
    }

    private async handleRequest(question: string): Promise<void> {
        const spinner = ora("Asking assistant").start();
        let answer: AssistantResponse | null = null;

        try {
            answer = await this.assistant.ask(question);
            spinner.succeed("Assistant responded");
            await this.processAnswer(answer);
        } catch (error) {
            this.handleError(spinner, error);
        }
    }

    private async processAnswer(answer: AssistantResponse): Promise<void> {
        const handlers: Record<AnswerType, (result: string) => Promise<void>> =
            {
                command: (r) => this.handleCommand(r),
                answer: (r) => this.logAnswer(r),
                question: (r) => this.logQuestion(r),
                rejection: (r) => this.logRejection(r),
            };

        const handler =
            handlers[answer.type] || this.logUnknownResponse.bind(this);
        await handler(answer.result);
    }

    private async handleCommand(initialCommand: string): Promise<void> {
        this.logCommand(initialCommand);

        let currentCommand = initialCommand;

        for (let i = 0; i < Cli.MAX_COMMAND_ATTEMPTS; i++) {
            const result = await runShellScript(currentCommand);
            if (!result.error) {
                await this.logCommandResult(result.output);
                this.assistant.appendOutput(stripAnsiCodes(result.output)); // Do not await this, it will block the main thread
                return;
            }

            console.log(
                chalk.redBright("Error running command:", result.error),
                chalk.greenBright(
                    `Will make attempt ${i + 1} of ${Cli.MAX_COMMAND_ATTEMPTS}`,
                ),
            );

            // Ask assistant for a correction
            const correction = await this.assistant.correct(
                currentCommand,
                result.error,
            );
            currentCommand = correction.result;
            this.logCommand(currentCommand);
        }

        console.log(
            chalk.redBright("Max attempts reached. Command execution failed."),
        );
    }

    private async logAnswer(result: string): Promise<void> {
        console.log("\n" + chalk.greenBright("Assistant has an answer"));
        this.logWithGlow(result);
    }

    private async logQuestion(result: string): Promise<void> {
        console.log("\n" + chalk.magentaBright("Assistant has a question"));
        console.log(result);
    }

    private async logRejection(result: string): Promise<void> {
        console.log("\n" + chalk.redBright("Assistant rejected the command"));
        console.log(result);
    }

    private async logUnknownResponse(result: string): Promise<void> {
        console.log("\n" + chalk.yellowBright("Assistant broke character"));
        console.log(result);
    }

    private async logCommandResult(result: string): Promise<void> {
        console.log("\n" + chalk.greenBright("Command result"));
        this.logWithLess(result);
    }

    // TODO: Use shfmt
    private async logCommand(command: string) {
        const beautifulScript = command
            .replace(/(curl)/g, chalk.cyan("$1")) // Highlighting 'curl' command
            .replace(/(-[sxX])/g, chalk.blue("$1")) // Highlighting options like -s, -X .replace(/(https?:\/\/[^\s]+)/g, chalk.magenta("$1")) // Highlighting URLs
            .replace(
                /(-H 'Content-Type: application\/json')/g,
                chalk.yellow("$1"),
            ) // Highlighting headers
            .replace(/(\{.*?\})/g, chalk.green("$1")) // Highlighting JSON data
            .replace(/(\| jq '.*?')/g, chalk.red("$1")) // Highlighting jq command
            .replace(/(\bfor\b|\bdo\b|\bdone\b)/g, chalk.blue("$1")) // Highlighting loop keywords
            .replace(/;/g, ";\n") // Insert newlines after semicolons
            .replace(/\b(do|then)\b/g, "$1\n  ") // Indent after 'do' or 'then'
            .replace(/\bdone\b/g, "\n$&\n") // Newline before and after 'done'
            .replace(/\n\s*(\b[a-zA-Z_]+\b)/g, "\n  $1") // Indent other commands inside loops
            .replace(/\|/g, "\n|") // Add new line before pipes
            .replace(/\n\|/g, "\n  |"); // Indent pipes

        console.log(
            `\n${chalk.greenBright("Assistant wants to execute")}\n${beautifulScript}\n`,
        );
    }

    private handleError(spinner: Ora, error: unknown): void {
        spinner.fail("Assistant failed to respond");
        console.log(chalk.redBright(JSON.stringify(error)));
    }

    private logWithLess(input: string) {
        spawnSync("less", ["-X", "-S"], {
            stdio: ["pipe", "inherit", "inherit"],
            input: input,
        });
    }

    private logWithGlow(input: string) {
        spawnSync("glow", {
            stdio: ["pipe", "inherit", "inherit"],
            input: input,
        });
    }

    private introMessage() {
        console.log(
            chalk.magentaBright(`
    █████╗  ██╗███╗   ██╗████████╗███████╗
    ██╔══██╗██║████╗  ██║╚══██╔══╝██╔════╝
    ███████║██║██╔██╗ ██║   ██║   █████╗
    ██╔══██║██║██║╚██╗██║   ██║   ██╔══╝
    ██║  ██║██║██║ ╚████║   ██║   ███████╗
    ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

Welcome! Ask me anything related to Ethereum.
Please be kind and patient, I'm just an experiment intersecting LLMs with Bash!
            `),
        );
    }
}