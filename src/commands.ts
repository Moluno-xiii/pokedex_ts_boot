import { getCommands } from "./helpers";
import { PokeAPI } from "./pokeApi";
const pokeAPI = new PokeAPI();
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

const commandMap = () => {
  try {
    return pokeAPI.fetchLocations();
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Unexpected error, try agian."
    );
  }
};

const commandMapBack = (pageURL: string) => {
  try {
    return pokeAPI.fetchLocations(pageURL);
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Unexpected error, try agian."
    );
  }
};

export { commandExit, commandHelp, commandMap, commandMapBack };
