import {
  commandExit,
  commandHelp,
  commandMap,
  commandMapBack,
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
      // callback: (pageUrl: string) => commandMapBack(pageUrl),
      callback: commandMapBack,
    },
  };
};

const cleanInput = (input: string): string[] => {
  return input.trim().toLowerCase().split(/\s+/);
};

export { sanitizeInput, getCommands, cleanInput };
