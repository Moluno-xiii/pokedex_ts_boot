import { commandExit, commandHelp } from "./commands";
import { Command, CLICommand } from "./types";

const sanitizeInput = (input: string): string => {
  return input.trim().toLowerCase();
};

const getCommands = (): Record<Command, CLICommand> => {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Shows help instructions",
      callback: commandHelp,
    },
  };
};

const cleanInput = (input: string): string[] => {
  return input.trim().toLowerCase().split(/\s+/);
};

export { sanitizeInput, getCommands, cleanInput };
