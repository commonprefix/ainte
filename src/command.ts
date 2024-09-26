import { spawn } from 'child_process';
import type { CommandResult } from "./types";

export function runCommand(command: string): Promise<CommandResult> {
  return new Promise((resolve, reject) => {
      const childProcess = spawn('/bin/sh', ['-c', command]);
      let stdout = '';
      let stderr = '';

      childProcess.stdout.on('data', (data: Buffer) => {
          stdout += data.toString();
      });

      childProcess.stderr.on('data', (data: Buffer) => {
          stderr += data.toString();
      });

      childProcess.on('close', (code: number) => {
          resolve({ command, output: stdout, error: stderr });
      });

      childProcess.on('error', (error: Error) => {
          reject({ command, output: '', error: error.message });
      });
  });
}