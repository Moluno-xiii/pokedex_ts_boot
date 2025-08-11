import { createInterface, type Interface } from "readline";
import { Command, CLICommand } from "./types";
import { getCommands } from "./helpers";
import { PokeAPI } from "./pokeApi";

interface State {
  rl: Interface;
  commands: Record<Command, CLICommand>;
  pokeApi: PokeAPI;
  nextLocationsURL: string | null;
  previousLocationsURL: string | null;
}

const initState = (): State => {
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

export type { State };
export default initState;
