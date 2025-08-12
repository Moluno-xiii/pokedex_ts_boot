import { createInterface, type Interface } from "readline";
import { PokeAPI } from "./pokeApi";

type CLICommand = {
  name: Command;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

interface State {
  rl: Interface;
  commands: Record<Command, CLICommand>;
  pokeApi: PokeAPI;
  nextLocationsURL: string | null;
  previousLocationsURL: string | null;
}

type Command = "help" | "exit" | "map" | "mapb" | "explore";

type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
};

type Location = {
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

export type { CLICommand, Command, ShallowLocations, Location, State };
