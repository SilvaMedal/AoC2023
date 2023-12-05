import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

const noCard = /\:(.*)/;
const numReg = /\d+/g;
let games = [];
let filteredGame = [];
let points = 0;

for (let i = 0; i < input.length; i++) {
  let string = input[i].match(noCard)[0];
  games.push(string.match(numReg));
}

for (let i = 0; i < games.length; i++) {
  filteredGame.push(
    ...games[i].filter((x, index) => games[i].indexOf(x) !== index)
  );
  if (filteredGame.length !== 0) {
    let wins = filteredGame.length;
    let tempPoints = 1;
    // console.log(wins);
    while (wins > 1) {
      tempPoints *= 2;
      wins--;
    }
    points += tempPoints;
  }
  filteredGame = [];
}

console.log(points);
