import { $ } from "bun";

export async function runCommand(command: string) {
  try {
    // Hacky way to capture both stdout and stderr
    const { stdout } = await $`/bin/sh -c "{ ${command}; } 2>&1"`;
    const output = stdout.toString().trim();
    
    // Check if the output contains an error message
    if (output.toLowerCase().includes("error")) {
      throw new Error(output);
    }
    
    return output;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
