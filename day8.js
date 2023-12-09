import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

// Initialize instructions, and convert "L", "R" to indexes [0,1]
const instructions = input[0].replaceAll("L", 0).replaceAll("R", 1);
const map = {};

// Initialize map w/ format:  matches[0]: [matches[1], matches[2]]
for (let i = 2; i < input.length; i++) {
  let matches = input[i].match(/\w+/g);
  map[matches[0]] = [matches[1], matches[2]];
  //   console.log(matches);
}

let key = "AAA";
let end = "ZZZ";
let step = 0;
let totalSteps = 0;
while (key !== end) {
  if (step === instructions.length) {
    step = 0;
  }
  let dest = Number(instructions[step]);
  key = map[key][dest];
  totalSteps++;
  step++;
}

console.log(totalSteps);
