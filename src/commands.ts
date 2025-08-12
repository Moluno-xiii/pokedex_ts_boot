import { getCommands } from "./helpers";
import { State } from "./types";

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

const commandMapBack = async (state: State): Promise<void> => {
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
    return;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Unexpected error, try agian."
    );
  }
};

const commandExplore = async (
  state: State,
  locationName: string
): Promise<void> => {
  try {
    const locationInfo = await state.pokeApi.fetchLocation(locationName);
    console.dir(locationInfo, { depth: null });
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? err.message
        : `Error getting ${locationName}, check your input nd try again.`
    );
  }
};

const commandCatch = async (
  state: State,
  pokemonName: string
): Promise<void> => {
  try {
    const result = await state.pokeApi.catchPokemon(pokemonName);
    console.log(result);
    return;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Unexpected error, try again."
    );
  }
};

const commandInspect = async (
  state: State,
  pokemonName: string
): Promise<void> => {
  try {
    return;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Unexpected error, try again."
    );
  }
};

export {
  commandExit,
  commandHelp,
  commandMap,
  commandMapBack,
  commandExplore,
  commandCatch,
  commandInspect,
};
