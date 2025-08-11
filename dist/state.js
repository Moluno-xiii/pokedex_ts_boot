import { createInterface } from "readline";
import { getCommands } from "./helpers.js";
import { PokeAPI } from "./pokeApi.js";
const initState = () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Input a command! \nFor help, input 'help' > ",
  });
  return {
    rl,
    commands: getCommands(),
    pokeApi: new PokeAPI(),
    nextLocationsURL: null,
    previousLocationsURL: null,
  };
};
export default initState;
