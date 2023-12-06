import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

const noCard = /\:(.*)/;
const numReg = /\d+/g;
let games = [];

for (let i = 0; i < input.length; i++) {
  let string = input[i].match(noCard)[0];
  games.push(string.match(numReg));
}

// an array to track card count of each game
const cardMap = Array(games.length).fill(1);

// for each game...
for (let i = 0; i < games.length; i++) {
  let j = i;
  // ...find the number of wins
  let wins = [...games[i].filter((x, index) => games[i].indexOf(x) !== index)]
    .length;
  // find out how many cards of this game you have
  let numCards = cardMap[i];
  // use this loop to add cards for each win
  while (wins > 0) {
    cardMap[j + 1] += numCards;
    console.log(cardMap);
    j++;
    wins--;
  }
}
// sum the total cards in array
const cards = cardMap.reduce((a, b) => a + b);

console.log(cards);
