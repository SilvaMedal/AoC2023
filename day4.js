import { readFileSync } from "fs";

const input = readFileSync("./example.txt", "utf-8").split("\n");

const noCard = /\:(.*)/;
const numReg = /\d+/g;
let games = [];
let points = 0;

for (let i = 0; i < input.length; i++) {
  let string = input[i].match(noCard)[0];
  games.push(string.match(numReg));
}

for (let i = 0; i < games.length; i++) {
  let wins = games[i].filter((x, index) => games[i].indexOf(x) !== index);

  if (wins.length !== 0) {
    points += 2 ** (wins.length - 1);
  }
}

console.log(points);
