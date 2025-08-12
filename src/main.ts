import { startRepl } from "./repl";
import initState from "./state";

async function main() {
  const state = await initState();
  startRepl(state);
}

main();
