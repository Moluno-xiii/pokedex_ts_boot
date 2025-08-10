import { createInterface } from "readline";
import { commandExit } from "./commands";
import { getCommands, sanitizeInput } from "./helpers";
import { Command } from "./types";

const startRepl = () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Input a command! \nFor help, input 'help' > ",
  });

  rl.prompt();
  rl.on("line", (line) => {
    const userInput: string = sanitizeInput(line);
    try {
      if (userInput in getCommands()) {
        getCommands()[userInput as Command].callback();
      } else {
        throw new Error("Invalid command, try again.");
      }
    } catch (err) {
      err instanceof Error
        ? console.error(err.message)
        : console.error("Unexpected error, try again!");
    } finally {
      rl.prompt();
    }
    // if (!sanitizeInput(line).length) {
    //   rl.prompt();
    // } else if (sanitizeInput(line) === "help") {
    //   getCommands().help.callback();
    // } else if (sanitizeInput(line) === "exit") {
    //   getCommands().exit.callback();
    // }

    // rl.prompt();
  }).on("close", () => {
    commandExit();
  });
};

export { startRepl };

// faith
// you deserve its
