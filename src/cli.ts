import inquirer, { type QuestionMap } from "inquirer";
import ora, { type Ora } from "ora";
import chalk from "chalk";
import type { Assistant } from "./assistants";
import { runShellScript } from "./bash";
import type { AnswerType, AssistantResponse } from "./types";
import { spawnSync } from "child_process";
import { writeFileSync } from "fs";
import { markdownify, parseBashScript, stripAnsiCodes } from "./utils";
import clipboard from "clipboardy";

export class Cli {
    private static MAX_COMMAND_ATTEMPTS = 3;

    constructor(private assistant: Assistant) {}

    async spawn(): Promise<void> {
        this.introMessage();
        while (true) {
            let { userInput } = await inquirer.prompt({
                type: "input",
                name: "userInput",
                // @ts-ignore
                message: "Ainte::"
            });

            if (await this.handleCustomCommand(userInput)) {
                continue;
            }

            await this.handleRequest(userInput);
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

    private handleError(spinner: Ora, error: unknown): void {
        spinner.fail("Assistant failed to respond");
        console.log(chalk.redBright(JSON.stringify(error)));
    }

    /**
     * Loggers
     */

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

        spawnSync("less", ["-X", "-S"], {
            stdio: ["pipe", "inherit", "inherit"],
            input: result,
        });
    }

    private async logAnswer(result: string): Promise<void> {
        console.log("\n" + chalk.greenBright("Assistant has an answer"));
        spawnSync("glow", {
            stdio: ["pipe", "inherit", "inherit"],
            input: result,
        });
    }

    private async logCommand(command: string) {
        const beautifulScript = parseBashScript(command);
        console.log(
            `\n${chalk.greenBright("Assistant wants to execute")}\n${beautifulScript}\n`,
        );
    }

    /**
     * Custom commands
     */

    async handleCustomCommand(input: string): Promise<boolean> {
        switch (input) {
            case "/cmd":
            case "/commands":
            case "/menu":
                await this.handleCmdMenu();
                return true;
            case "/copy":
                this.handleCopy();
                return true
            case "/save":
                await this.handleSave();
                return true;
            case "/retry":
                await this.tryMore(input);
                return true;
            case "/exit":
                await this.handleExit();
                return true;
            default:
                return false
        }
    }

    private async tryMore(command: string): Promise<void> {
        console.log(chalk.greenBright("Retrying command..."))
        const correction = await this.assistant.correct(command, "The previous command failed");
        await this.handleCommand(correction.result);
    }

    private handleCopy(): void {
        const lastResponse = this.assistant.getLastOutput();
        console.log(chalk.greenBright("Last answer copied to clipboard"));
        clipboard.writeSync(lastResponse);
    }

    async handleSave(): Promise<void> {
        const history = await this.assistant.getHistory();
        const markdown = markdownify(history);
        writeFileSync("conversation.md", markdown);
        console.log(chalk.greenBright("Conversation saved to conversation.md"));
    }

    async handleExit(): Promise<void> {
        console.log(chalk.greenBright("Bye!"));
        process.exit(0);
    }

    private async handleCmdMenu() {
        let choices = [
            { name: `${chalk.magentaBright("/copy")}: Copy last answer to clipboard`, value: "/copy" },
            { name: `${chalk.magentaBright("/save")}: Save conversation to markdown file`, value: "/save" },
            { name: `${chalk.magentaBright("/exit")}: Exit the program`, value: "/exit" },
            { name: `${chalk.magentaBright("/retry")}: Keep trying to fix the command 3 times`, value: "/retry" },
        ]
        const { command } = await inquirer.prompt({
            type: "list",
            name: "command",
            message: "Choose a command" as any,
            choices,
        })

        this.handleCustomCommand(command);
    }

    /**
     * CLI specific utils
     */

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