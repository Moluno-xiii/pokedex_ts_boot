import { commandExit, commandHelp } from "./commands.js";
const sanitizeInput = (input) => {
  return input.trim().toLowerCase();
};
const getCommands = () => {
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
const cleanInput = (input) => {
  return input.trim().toLowerCase().split(/\s+/);
};
export { sanitizeInput, getCommands, cleanInput };
