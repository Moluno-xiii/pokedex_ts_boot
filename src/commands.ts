import { getCommands } from "./helpers";

const commandExit = () => {
  console.log("\nClosing the Pokedex...");
  process.exit(0);
};

const commandHelp = () => {
  console.log("\nWelcome to the Pokedex! \nUsage:\n");
  for (const usage of Object.values(getCommands())) {
    console.log(`${usage.name}: ${usage.description}`);
  }
};

export { commandExit, commandHelp };
