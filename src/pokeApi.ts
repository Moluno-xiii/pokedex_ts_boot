import { Cache, CacheEntry } from "./pokeCache";
import { ShallowLocations, Location } from "./types";
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache = new Cache(60000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const apiURL =
      pageURL ?? `${PokeAPI.baseURL}/location-area?offset=0&limit=20`;
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
      console.log(`Getting dat for ${locationName}...`);
      if (!locationName) {
        throw new Error(
          "No location name provided command is : 'explore <location_name>'"
        );
      }
      const cachedResult = this.cache.get<CacheEntry<ShallowLocations>>(apiURL);
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
      this.cache.add<Location>(apiURL, data);
      return data;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Unexpected error, try again"
      );
    }
  }
}
