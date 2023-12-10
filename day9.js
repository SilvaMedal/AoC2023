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
    adders.unshift(sequence[sequence.length - 1]);

    const differences = [];
    for (let i = 1; i < sequence.length; i++) {
      differences.push(sequence[i] - sequence[i - 1]);
    }
    if (differences.every((diff) => diff === 0)) {
      break;
    }
    sequence = differences;
  }

  return adders.reduce((a, b) => a + b);
}

let sum = 0;
newInput.forEach((history) => {
  const nextValue = findNextValue(history);
  sum += nextValue;
});

console.log(sum);
