import fs from 'fs';

const PROMPT_FILE = "prompt.md";

export const getEnv = (key: string, _default?: string): string => {;
    const value = process.env[key];
    if (!value && !_default) {
        throw new Error(`Missing environment variable ${key}`);
    }
    return value || _default || "";
}

export const getPrompt = (): string => {
    return fs.readFileSync(PROMPT_FILE, 'utf8');
}