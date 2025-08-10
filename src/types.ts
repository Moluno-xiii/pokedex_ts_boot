type CLICommand = {
  name: Command;
  description: string;
  //   callback: (commands: Record<string, CLICommand>) => void;
  callback: () => void;
};

type Command = "help" | "exit";

export type { CLICommand, Command };
