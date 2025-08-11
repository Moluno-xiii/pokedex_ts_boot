import { ShallowLocations } from "./pokeApi";
import { State } from "./state";

type CLICommand = {
  name: Command;
  description: string;
  //   callback: (commands: Record<string, CLICommand>) => void;
  callback: (state: State) => Promise<void>;
  // callback: MapB | Map | (() => void);
  // | void
  // | Promise<void | ShallowLocations | Location>
  //  ((pageUrl: string) => Promise<ShallowLocations>);
};

type MapB = (pageUrl: string) => Promise<ShallowLocations>;
type Map = () => Promise<Location>;
type Command = "help" | "exit" | "map" | "mapb";

export type { CLICommand, Command };
