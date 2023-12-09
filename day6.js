import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

const time = Number(
  input[0].replace("Time:", "").trim().match(/\d+/g).join("")
);
const distance = Number(
  input[1].replace("Distance:", "").trim().match(/\d+/g).join("")
);
// console.log(time, distance);

let ways = 0;
let hold = 0;

for (let i = 0; i < time; i++) {
  let timeToTravel = time - hold;
  if (timeToTravel * hold > distance) {
    ways++;
  }
  hold++;
}

console.log(ways);
