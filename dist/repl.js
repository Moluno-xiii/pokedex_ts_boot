import { commandExit } from "./commands.js";
import { sanitizeInput } from "./helpers.js";
const startRepl = (initState) => {
  const { state, commands } = initState;
  state.prompt();
  state
    .on("line", (line) => {
      const userInput = sanitizeInput(line);
      try {
        commands()[userInput].callback();
      } catch (err) {
        console.error(
          "Invalid command, for help, input 'help' to the console."
        );
      } finally {
        state.prompt();
      }
    })
    .on("close", () => {
      commandExit();
    });
};
export { startRepl };
