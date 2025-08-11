import { startRepl } from "./repl.js";
import { initState } from "./state.js";
function main() {
  const state = initState();
  console.log("Hello, world!");
  startRepl(state);
}
main();
