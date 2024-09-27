import chalk from "chalk";
import fs from "fs";

const PROMPT_FILE = "prompt.md";

export function getEnv(key: string, _default?: string) {
    const value = process.env[key];
    if (!value && !_default) {
        throw new Error(`Missing environment variable ${key}`);
    }
    return value || _default || "";
}

export function getPrompt(): string {
    return fs.readFileSync(PROMPT_FILE, "utf8");
}

export function stripAnsiCodes(output: string) {
    return output.replace(/\u001b\[\d+;?\d*m/g, '');
}