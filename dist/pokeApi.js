export class PokeAPI {
  static baseURL = "https://pokeapi.co/api/v2";
  constructor() {}
  async fetchLocations(pageURL) {
    try {
      const request = await fetch(
        pageURL ?? `${PokeAPI.baseURL}/location-area`
      );
      if (!request.ok) {
        console.log("REQUEST", request);
        throw new Error("Network error, try again.");
      }
      return request.json();
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Unexpected error, try again"
      );
    }
  }
  async fetchLocation(locationName) {
    try {
      const request = await fetch(
        `${PokeAPI.baseURL}/location-area/${locationName}`
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
