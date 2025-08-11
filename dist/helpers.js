import {
  commandExit,
  commandHelp,
  commandMap,
  commandMapBack,
} from "./commands.js";
const sanitizeInput = (input) => {
  return input.trim().toLowerCase();
};
const getCommands = () => {
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
  };
};
const cleanInput = (input) => {
  return input.trim().toLowerCase().split(/\s+/);
};
export { sanitizeInput, getCommands, cleanInput };
