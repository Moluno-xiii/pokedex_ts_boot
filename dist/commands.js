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
    const result = await state.pokeApi.catchPokemon(pokemonName);
    console.log(result);
    return;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Unexpected error, try again."
    );
  }
};
const commandInspect = async (state, pokemonName) => {
  try {
    const pokemon = state.pokeApi.inspectPokemon(pokemonName);
    console.dir(pokemon, { depth: null });
    return;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Unexpected error, try again."
    );
  }
};
const commandPokedex = async (state) => {
  try {
    const pokemons = state.pokeApi.pokedex();
    if (pokemons.size < 1) {
      console.log("You haven't caught any pokemons yet.");
      return;
    }
    console.log("Your pokedex:");
    for (const [name, details] of pokemons) {
      console.log(`-${name}`);
    }
    // console.dir(pokemon, { depth: null });
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
  commandPokedex,
};
