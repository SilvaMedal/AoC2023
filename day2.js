import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

/* MAX VALUES USED FOR PART 1 COMPARISON */
// const maxRed = 12;
// const maxGreen = 13;
// const maxBlue = 14;

const redReg = /(\d+) red/g;
const greenReg = /(\d+) green/g;
const blueReg = /(\d+) blue/g;

let gameSum = 0;

for (let i = 0; i < input.length; i++) {
  let pulledRed = input[i].match(redReg);
  if (pulledRed !== null) {
    pulledRed = Math.max(
      ...pulledRed.map((x) => Number(x.replace(" red", "")))
    );
  } else {
    pulledRed = 0;
  }
  let pulledGreen = input[i].match(greenReg);
  if (pulledGreen !== null) {
    pulledGreen = Math.max(
      ...pulledGreen.map((x) => Number(x.replace(" green", "")))
    );
  } else {
    pulledGreen = 0;
  }
  let pulledBlue = input[i].match(blueReg);
  if (pulledBlue !== null) {
    pulledBlue = Math.max(
      ...pulledBlue.map((x) => Number(x.replace(" blue", "")))
    );
  } else {
    pulledBlue = 0;
  }
  let power = pulledRed * pulledGreen * pulledBlue;
  gameSum += power;

  /* THE FOLLOWING SNIPPET OF CODE IS TO SOLVE PART 1 */
  //   if (pulledRed <= maxRed && pulledGreen <= maxGreen && pulledBlue <= maxBlue) {
  //     gameSum += i + 1;
  //   }
}

console.log(gameSum);
