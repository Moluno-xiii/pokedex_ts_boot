import { commandExit } from "./commands";
import { sanitizeInput } from "./helpers";
import { State } from "./state";
import { Command } from "./types";

const startRepl = (initState: State) => {
  const { state, commands } = initState;
  state.prompt();
  state
    .on("line", (line) => {
      const userInput: string = sanitizeInput(line);
      try {
        commands()[userInput as Command].callback();
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
