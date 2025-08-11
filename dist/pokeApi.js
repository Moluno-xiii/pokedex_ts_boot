import { Cache } from "./pokeCache.js";
export class PokeAPI {
  static baseURL = "https://pokeapi.co/api/v2";
  cache = new Cache(6000);
  constructor() {}
  async fetchLocations(pageURL) {
    const apiURL = pageURL ?? `${PokeAPI.baseURL}/location-area`;
    try {
      const cachedResult = this.cache.get(apiURL);
      console.log("cached result", cachedResult);
      if (cachedResult) {
        return cachedResult.val;
      }
      const request = await fetch(apiURL);
      if (!request.ok) {
        throw new Error("Network error, try again.");
      }
      const data = await request.json();
      this.cache.add(apiURL, data);
      console.log("adding to cache", apiURL);
      return data;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Unexpected error, try again"
      );
    }
  }
  async fetchLocation(locationName) {
    const apiURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
    try {
      const cachedResult = this.cache.get(apiURL);
      if (cachedResult) {
        return cachedResult.val;
      }
      const request = await fetch(apiURL);
      if (!request.ok) {
        throw new Error("Network error, try again.");
      }
      const data = await request.json();
      this.cache.add(apiURL, data);
      return data;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Unexpected error, try again"
      );
    }
  }
}
