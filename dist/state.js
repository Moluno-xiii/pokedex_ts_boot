import { createInterface } from "readline";
import { getCommands } from "./helpers.js";
const initState = () => {
  const state = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Input a command! \nFor help, input 'help' > ",
  });
  return {
    state,
    commands: getCommands,
  };
};
export { initState };
