import { commandExit } from "./commands";
import { sanitizeInput } from "./helpers";
import { State } from "./state";
import { Command } from "./types";

const startRepl = (state: State) => {
  const { rl, commands } = state;
  rl.prompt();
  rl.on("line", async (line) => {
    const userInput: string = sanitizeInput(line);
    try {
      if (!commands[userInput as Command]) {
        throw new Error(
          "Invalid command, for help, input 'help' to the console."
        );
      }
      await commands[userInput as Command].callback(state);
    } catch (err) {
      console.error(
        err instanceof Error ? err.message : "Unexpected error, try again."
      );
    } finally {
      rl.prompt();
    }
  }).on("close", () => {
    commandExit();
  });
};

export { startRepl };
