import { startRepl } from "./repl.js";
import initState from "./state.js";
async function main() {
  const state = await initState();
  console.log("Hello, world!");
  startRepl(state);
}
main();
