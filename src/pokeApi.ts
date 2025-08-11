export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    try {
      const request = await fetch(
        pageURL ?? `https://pokeapi.co/api/v2/location-area`
      );
      if (!request.ok) {
        throw new Error("Network error, try again.");
      }
      return request.json();
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Unexpected error, try again"
      );
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    try {
      const request = await fetch(
        `https://pokeapi.co/api/v2/location/${locationName}`
      );
      if (!request.ok) {
        throw new Error("Network error, try again.");
      }
      return request.json();
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
  areas: Array<{ name: string; url: string }>;
  game_indices: Array<{
    game_index: number;
    generation: {
      name: string;
      url: string;
    };
  }>;
  id: number;
  name: string;
  names: Array<{
    language: {
      name: string;
      url: string;
    };
    name: string;
  }>;
  region: {
    name: string;
    url: string;
  };
};
