import {
  commandCatch,
  commandExit,
  commandExplore,
  commandHelp,
  commandInspect,
  commandMap,
  commandMapBack,
  commandPokedex,
} from "./commands";
import { Command, CLICommand } from "./types";

const sanitizeInput = (input: string): string => {
  return input.trim().toLowerCase();
};

const getCommands = (): Record<Command, CLICommand> => {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex.",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Shows help instructions.",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description:
        "Displays the names of 20 location areas in the Pokemon world. Each subsequent call displays the next 20 locations and so on.",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Get the previous page of locations.",
      callback: commandMapBack,
    },
    explore: {
      name: "explore <location>",
      description: "Gets the location information of a given location.",
      callback: commandExplore,
    },
    catch: {
      name: "catch <pokemon_name>",
      description: "Catches a pokemon and adds them to your inventory.",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect <pokemon_name>",
      description: "Shows the details of a given pokemon in your inventory.",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Displays the names of all pokemon's in your inventory.",
      callback: commandPokedex,
    },
  };
};

const cleanInput = (input: string): string[] => {
  return input.trim().toLowerCase().split(/\s+/);
};

export { sanitizeInput, getCommands, cleanInput };
