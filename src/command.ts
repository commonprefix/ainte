import { exec } from "child_process";
import { promisify } from "util";
import chalk from "chalk";

const execPromise = promisify(exec);

export async function commandRun(command: string): Promise<string | void> {
  const { stdout, stderr } = await execPromise(command);

  if (stderr) {
    throw new Error(stderr);
  }

  return stdout;
}
