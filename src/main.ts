import { startRepl } from "./repl";
import { initState } from "./state";

function main() {
  const state = initState();
  console.log("Hello, world!");
  startRepl(state);
}

main();
