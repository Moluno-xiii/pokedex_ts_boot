import { commandExit } from "./commands.js";
import { sanitizeInput } from "./helpers.js";
const startRepl = (state) => {
  const { rl, commands } = state;
  rl.prompt();
  rl.on("line", async (line) => {
    const userInput = sanitizeInput(line);
    const command = userInput.split(" ")[0];
    const argument = userInput.split(" ").slice(1);
    console.log("argument gotten", argument);
    try {
      if (!commands[command]) {
        throw new Error(
          "Invalid command, for help, input 'help' to the console."
        );
      }
      await commands[command].callback(state, ...argument);
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
