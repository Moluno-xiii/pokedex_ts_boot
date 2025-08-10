import { createInterface } from "readline";
const cleanInput = (input) => {
  return input.trim().toLowerCase().split(/\s+/);
};
const startRepl = () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Input a sentence > ",
  });
  rl.prompt();
  rl.on("line", (line) => {
    // switch (line.trim()) {
    //   case "hello":
    //     console.log("world");
    //     break;
    //   case "world":
    //     console.log("hello");
    //     break;
    //   default:
    //     console.log("default string");
    // }
    if (!line.trim().length) {
      rl.prompt();
    } else {
      const userInput = cleanInput(line);
      console.log(`Your command was: "${userInput[0]}"`);
    }
    rl.prompt();
  }).on("close", () => {
    console.log("\n have a great day");
    process.exit(0);
  });
  //   const input = process.stdin;
  //   console.log(input);
};
export { cleanInput, startRepl };
