import { Cache } from "./pokeCache.js";
export class PokeAPI {
  static baseURL = "https://pokeapi.co/api/v2";
  cache = new Cache(60000);
  constructor() {}
  async fetchLocations(pageURL) {
    const apiURL =
      pageURL ?? `${PokeAPI.baseURL}/location-area?offset=0&limit=20`;
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
  async fetchLocation(locationName) {
    const apiURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
    try {
      console.log("location name", locationName);
      if (!locationName) {
        throw new Error(
          "No location name provided command is : 'explore <location_name>'"
        );
      }
      const cachedResult = this.cache.get(apiURL);
      if (cachedResult) {
        return cachedResult.val;
      }
      const request = await fetch(apiURL);
      if (!request.ok) {
        throw new Error(
          `${request.status} Error : ${locationName} ${request.statusText}`
        );
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
