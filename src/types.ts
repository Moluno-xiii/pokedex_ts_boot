import { type Interface } from "readline";
import { PokeAPI } from "./pokeApi";

type CLICommand = {
  name: string;
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

interface Pokemon {
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: Array<{ name: string; url: string }>;
  game_indices: Array<{
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }>;
  height: number;
  held_items: Array<any>;
  // change this
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      order: number | null;
      version_group: {
        name: string;
        url: string;
      };
    }>;
  }>;
  name: string;
  order: number;
  past_abilities: Array<{
    abilities: Array<{
      ability: null | string;
      is_hidden: boolean;
      slot: number;
    }>;
    generation: {
      name: string;
      url: string;
    };
  }>;
  past_types: Array<any>;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: string | null;
  };
  weight: number;
}

type Command =
  | "help"
  | "exit"
  | "map"
  | "mapb"
  | "explore"
  | "catch"
  | "inspect"
  | "pokedex";

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

export type { CLICommand, Command, ShallowLocations, Location, State, Pokemon };
