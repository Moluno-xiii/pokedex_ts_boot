import { State } from "./state";

type CLICommand = {
  name: Command;
  description: string;
  callback: (state: State) => Promise<void>;
};

type Command = "help" | "exit" | "map" | "mapb";

export type { CLICommand, Command };
