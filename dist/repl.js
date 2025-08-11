import { commandExit } from "./commands.js";
import { sanitizeInput } from "./helpers.js";
const startRepl = (state) => {
  const { rl, commands } = state;
  rl.prompt();
  rl.on("line", async (line) => {
    const userInput = sanitizeInput(line);
    try {
      if (!commands[userInput]) {
        throw new Error(
          "Invalid, command, for help, input 'help' to the console"
        );
      }
      await commands[userInput].callback(state);
    } catch (err) {
      console.error(err.message ?? "Unexpected error, try again.");
    } finally {
      rl.prompt();
    }
  }).on("close", () => {
    commandExit();
  });
};
export { startRepl };
