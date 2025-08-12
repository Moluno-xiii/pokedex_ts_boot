import { commandExit } from "./commands";
import { sanitizeInput } from "./helpers";
import { Command, State } from "./types";

const startRepl = (state: State) => {
  const { rl, commands } = state;
  rl.prompt();
  rl.on("line", async (line) => {
    const userInput: string = sanitizeInput(line);
    const command = userInput.split(" ")[0];
    const argument = userInput.split(" ").slice(1);
    try {
      if (!commands[command as Command]) {
        throw new Error(
          "Invalid command, for help, input 'help' to the console."
        );
      }
      await commands[command as Command].callback(state, ...argument);
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
