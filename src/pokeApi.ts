import { Cache, CacheEntry } from "./pokeCache";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache = new Cache(6000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const apiURL = pageURL ?? `${PokeAPI.baseURL}/location-area`;
    try {
      const cachedResult = this.cache.get<CacheEntry<ShallowLocations>>(apiURL);
      if (cachedResult) {
        return cachedResult.val;
      }
      const request = await fetch(apiURL);
      if (!request.ok) {
        throw new Error("Network error, try again.");
      }

      const data: ShallowLocations = await request.json();
      this.cache.add<ShallowLocations>(apiURL, data);
      return data;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Unexpected error, try again"
      );
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const apiURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
    try {
      const cachedResult = this.cache.get<CacheEntry<ShallowLocations>>(apiURL);
      if (cachedResult) {
        return cachedResult.val;
      }
      const request = await fetch(apiURL);
      if (!request.ok) {
        throw new Error("Network error, try again.");
      }

      const data = await request.json();
      this.cache.add<Location>(apiURL, data);
      return data;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Unexpected error, try again"
      );
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};
