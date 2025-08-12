import { Cache, CacheEntry } from "./pokeCache";
import { ShallowLocations, Location, Pokemon } from "./types";
export class PokeAPI {
  static readonly #baseURL = "https://pokeapi.co/api/v2";
  #cache = new Cache(60000);
  #pokemons = new Map<string, Pokemon>();

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const apiURL =
      pageURL ?? `${PokeAPI.#baseURL}/location-area?offset=0&limit=20`;
    try {
      const cachedResult =
        this.#cache.get<CacheEntry<ShallowLocations>>(apiURL);
      if (cachedResult) {
        return cachedResult.val;
      }
      const request = await fetch(apiURL);
      if (!request.ok) {
        throw new Error("Network error, try again.");
      }

      const data: ShallowLocations = await request.json();
      this.#cache.add<ShallowLocations>(apiURL, data);
      return data;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Unexpected error, try again"
      );
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const apiURL = `${PokeAPI.#baseURL}/location-area/${locationName}`;
    try {
      console.log(`Getting data for ${locationName}...`);
      if (!locationName) {
        throw new Error(
          "No location name provided command is : 'explore <location_name>'"
        );
      }
      const cachedResult =
        this.#cache.get<CacheEntry<ShallowLocations>>(apiURL);
      if (cachedResult) {
        return cachedResult.val;
      }
      const request = await fetch(apiURL);
      if (!request.ok) {
        throw new Error(
          `${request.status} Error fetching '${locationName}' : ${request.statusText}`
        );
      }

      const data = await request.json();
      this.#cache.add<Location>(apiURL, data);
      return data;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Unexpected error, try again"
      );
    }
  }

  async catchPokemon(pokemonName: string): Promise<string> {
    const hasUserCapturedPokemon = this.#pokemons.has(pokemonName);
    if (hasUserCapturedPokemon) {
      return "You have already captured " + pokemonName;
    }
    try {
      console.log(`Throwing a Pokeball at ${pokemonName}...\n`);
      const pokemon = await this.#fetchPokemon(pokemonName);
      const randomNumber = Math.floor(
        Math.random() *
          (Math.floor(pokemon.base_experience * 1.5) -
            Math.ceil(Math.sqrt(pokemon.base_experience)))
      );
      if (pokemon.base_experience > randomNumber) {
        return `${pokemonName} escaped!`;
      }
      this.#pokemons.set(pokemonName, pokemon);
      return `${pokemonName} was caught and added to your inventory!`;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Unexpected error, try again."
      );
    }
  }

  async #fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const apiURL = `${PokeAPI.#baseURL}/pokemon/${pokemonName}`;
    const cachedResult = this.#cache.get<CacheEntry<Pokemon>>(apiURL);
    if (cachedResult) return cachedResult.val;
    try {
      if (!pokemonName)
        throw new Error(
          "You didn't enter a pokemon name. Enter a pokemon name to continue.\nFor help, input 'help'."
        );
      const request = await fetch(apiURL);
      if (!request.ok) {
        throw new Error(
          `Error getting '${pokemonName} : ${request.statusText}.\nCheck your input and make sure pokemon exists.`
        );
      }
      const data: Pokemon = await request.json();
      this.#cache.add<Pokemon>(apiURL, data);
      return data;
    } catch (err) {
      throw new Error(
        err instanceof Error
          ? err.message
          : "Error getting pokemon, try again later."
      );
    }
  }

  inspectPokemon(pokemonName: string): Pokemon {
    const pokemon = this.#pokemons.get(pokemonName);
    if (!pokemon) {
      throw new Error("you have not caught that pokemon");
    }

    return pokemon;
  }

  pokedex(): Map<string, Pokemon> {
    return this.#pokemons;
  }
}
