import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

const times = input[0].replace("Time:", "").trim().match(/\d+/g).map(Number);
const distances = input[1]
  .replace("Distance:", "")
  .trim()
  .match(/\d+/g)
  .map(Number);

const recordPerDistance = [];
const waysToWin = [];

for (let i = 0; i < times.length; i++) {
  recordPerDistance.push([times[i], distances[i]]);
}

recordPerDistance.forEach((record) => {
  let ways = 0;
  let time = record[0];
  let distance = record[1];
  let hold = 0;
  for (let i = 0; i < time; i++) {
    let timeToTravel = time - hold;
    if (timeToTravel * hold > distance) {
      ways++;
    }
    hold++;
  }
  waysToWin.push(ways);
});

console.log(waysToWin.reduce((a, b) => a * b));
