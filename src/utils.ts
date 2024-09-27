import chalk from "chalk";
import type { MessageHistory } from "./types";

export function getEnv(key: string, _default?: string) {
    const value = process.env[key];
    if (!value && !_default) {
        throw new Error(`Missing environment variable ${key}. Please set it in the .env file.`);
    }
    return value || _default || "";
}
export function stripAnsiCodes(output: string) {
    return output.replace(/\u001b\[\d+;?\d*m/g, '');
}

export function stripString(input: string) {
    return input.replace(/\\n|\\r|\\t/g, '').replace(/\\"/g, '"');
}

export function markdownify(history: MessageHistory): string {
let content = "# Conversation History\n";
    content += history.map((message: any) => {
        return `${message.role === "user" ? "- `You`" : "- `Assistant`"}: ${message.content}`;
    }).join("\n");

    return content;
}

// TODO: Use shfmt
export function parseBashScript(command: string): string {
    return command
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
}