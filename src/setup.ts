import ora from "ora";
import { runShellScript } from "./bash";
import { logGreen } from "./logger";
import chalk from "chalk";

export const setup = async () => {
    logGreen("🕵🏽‍♀️ Setting up...");
    await installJq();
    await installFoundry();
    logGreen("🎉 Setup complete\n");
}

const installJq = async () => {
    const spinner = ora("Installing jq").start();

    const jqExists = await runShellScript("which jq");
    if (jqExists.output === "") {
        await runShellScript("curl -sS https://webi.sh/jq | sh", true);
        spinner.succeed(chalk.green("JQ installed"));
    }
    else {
        spinner.succeed(chalk.green("jq is aleady installed"));
    }
}

const installFoundry = async () => {
    const spinner = ora("Installing Foundry (this might take a while)").start();

    const foundryExists = await runShellScript("which cast");
    if (foundryExists.output === "") {
        await runShellScript("curl -L https://foundry.paradigm.xyz | bash && export PATH=~/.foundry/bin:$PATH && foundryup");
        spinner.succeed(chalk.green("foundry installed"));
    }
    else {
        spinner.succeed(chalk.green("foundry is aleady installed"));
    }
}