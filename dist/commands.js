import { getCommands } from "./helpers.js";
const commandExit = async () => {
  console.log("\nClosing the Pokedex...");
  process.exit(0);
};
const commandHelp = async (state) => {
  console.log("\nWelcome to the Pokedex! \nUsage:\n");
  for (const usage of Object.values(getCommands())) {
    console.log(`${usage.name}: ${usage.description}`);
  }
};
const commandMap = async (state) => {
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
const commandMapBack = async (state) => {
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
const commandExplore = async (state, locationName) => {
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
const commandCatch = async (state, pokemonName) => {
  try {
    console.log(await state.pokeApi.catchPokemon(pokemonName));
    return;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Unexpected error, try again."
    );
  }
};
const commandInspect = async (state, pokemonName) => {
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
