import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

const newInput = [];

for (let i = 0; i < input.length; i++) {
  let newLine = input[i].split(" ").map((num) => Number(num));
  newInput.push(newLine);
}

function findNextValue(history) {
  let adders = [];
  let sequence = [...history];

  //   Not happy with this loop
  while (true) {
    // minor change for part2
    adders.unshift(sequence[0]);

    const differences = [];
    for (let i = 1; i < sequence.length; i++) {
      differences.push(sequence[i] - sequence[i - 1]);
    }
    if (differences.every((diff) => diff === 0)) {
      adders.unshift(0);
      break;
    }
    sequence = differences;
  }
  // minor change for part2
  return adders.reduce((a, b) => b - a);
}

let sum = 0;
newInput.forEach((history) => {
  const nextValue = findNextValue(history);
  sum += nextValue;
});

console.log(sum);

// b-a = c
// b-c = a
