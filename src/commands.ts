import { getCommands } from "./helpers";
import { PokeAPI } from "./pokeApi";
import { State } from "./state";
// const pokeAPI = new PokeAPI();
const commandExit = async () => {
  console.log("\nClosing the Pokedex...");
  process.exit(0);
};

const commandHelp = async (state: State) => {
  console.log("\nWelcome to the Pokedex! \nUsage:\n");
  for (const usage of Object.values(getCommands())) {
    console.log(`${usage.name}: ${usage.description}`);
  }
};

const commandMap = async (state: State) => {
  try {
    const locations = await state.pokeApi.fetchLocations(
      state.nextLocationsURL ?? undefined
    );

    state.nextLocationsURL = locations.next;
    state.previousLocationsURL = locations.previous;

    for (const location of locations.results) {
      console.log(location.name);
    }
    return;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Unexpected error, try agian."
    );
  }
};

const commandMapBack = async (state: State) => {
  try {
    if (!state.previousLocationsURL)
      throw new Error("You're on the first page, run 'map' and try again.");
    const locations = await state.pokeApi.fetchLocations(
      state.previousLocationsURL
    );
    state.nextLocationsURL = locations.next;
    state.previousLocationsURL = locations.previous;

    for (const location of locations.results) {
      console.log(location.name);
    }
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Unexpected error, try agian."
    );
  }
};

export { commandExit, commandHelp, commandMap, commandMapBack };
