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

let aKeys = Object.keys(map).filter((key) => key.endsWith("A"));

let zSteps = [];

// Determine how many steps for each "A" key to get to a "Z" key
aKeys.forEach((key) => {
  let step = 0;
  let totalSteps = 0;
  while (!key.endsWith("Z")) {
    if (step === instructions.length) {
      step = 0;
    }
    let dest = Number(instructions[step]);
    key = map[key][dest];
    totalSteps++;
    step++;
  }
  zSteps.push(totalSteps);
});

// Sort low to high
zSteps = zSteps.sort((a, b) => a - b);

// Find the LCM of the step values in the array
function leastCommonMultiple(array) {
  function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
  }

  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

  let multiple = array[0];
  array.forEach((n) => {
    multiple = lcm(multiple, n);
  });

  return multiple;
}

console.log(leastCommonMultiple(zSteps));
