import chalk from 'chalk';
import fs from 'fs';

const PROMPT_FILE = "prompt.md";

export function getEnv(key: string, _default?: string) {;
    const value = process.env[key];
    if (!value && !_default) {
        throw new Error(`Missing environment variable ${key}`);
    }
    return value || _default || "";
}

export function getPrompt(): string {
    return fs.readFileSync(PROMPT_FILE, 'utf8');
}

// beautify bash command
export async function logCommand(command: string) {
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