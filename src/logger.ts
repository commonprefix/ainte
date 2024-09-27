import chalk from "chalk";

export function logGreen(message: string, ...args: any[]) {
    console.log(chalk.green(message, ...args));
}

export function logRed(message: string, ...args: any[]) {
    console.log(chalk.red(message, ...args));
}

export function logYellow(message: string, ...args: any[]) {
    console.log(chalk.yellow(message));
}

export function logBlue(message: string, ...args: any[]) {
    console.log(chalk.blue(message, ...args));
}

export function logMagenta(message: string, ...args: any[]) {
    console.log(chalk.magenta(message, ...args));
}
