import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline";

export class Chat {
  private rl: readline.Interface;
  private stopQueries: string[];

  constructor(stopQueries: string[] = []) {
    this.rl = readline.createInterface(input, output);
    this.stopQueries = stopQueries;
  }

  /**
   * Prompts the user with a question and returns their input.
   * @param query The question prompt to display to the user
   * @returns A promise that resolves with the user's input string
   */
  async askQuestion(query: string): Promise<string> {
    return new Promise(resolve => this.rl.question(query, resolve));
  }

  /**
   * Checks if the input matches any of the stop queries.
   * @param input The user input string to check
   * @returns True if the input matches a stop query (case-insensitive), false otherwise
   */
  isStopQueries(input: string): boolean {
    return this.stopQueries.includes(input.toLowerCase());
  }

  /**
   * Closes the readline interface and releases resources.
   */
  close(): void {
    this.rl.close();
  }
}
