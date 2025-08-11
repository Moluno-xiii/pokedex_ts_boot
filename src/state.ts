import { createInterface, type Interface } from "readline";
import { Command, CLICommand } from "./types";
import { getCommands } from "./helpers";
import { PokeAPI } from "./pokeApi";

interface State {
  state: Interface;
  commands: () => Record<Command, CLICommand>;
  pokeApi: PokeAPI;
  nextLocationsURL: string | null;
  previousLocationsURL: string | null;
}

const initState = (): State => {
  const state = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Input a command! \nFor help, input 'help' > ",
  });

  return {
    state,
    commands: getCommands,
    nextLocationsURL: null,
    previousLocationsURL: null,
    pokeApi: new PokeAPI(),
  };
};

export type { State };
export { initState };
