import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

const grid = input.map((line) => line.split(""));
const galaxyRegex = /\#/;
let counter = 0;

// test for empty rows
const newRows = [];
for (let i = 0; i < grid.length; i++) {
  if (galaxyRegex.test(input[i])) {
    newRows.push(grid[i]);
  } else {
    newRows.push(grid[i]);
    newRows.push(grid[i]);
  }
}
const rotatedGrid = [];
for (let col = 0; col < newRows[0].length; col++) {
  rotatedGrid.push([]);
  for (let row = 0; row < newRows.length; row++) {
    rotatedGrid[col].unshift(newRows[row][col]);
  }
  rotatedGrid[col] = rotatedGrid[col].join("");
}
const newGrid = [];
for (let i = 0; i < rotatedGrid.length; i++) {
  if (galaxyRegex.test(rotatedGrid[i])) {
    newGrid.push(rotatedGrid[i]);
  } else {
    newGrid.push(rotatedGrid[i]);
    newGrid.push(rotatedGrid[i]);
  }
}
const map = [];

for (let x = 0; x < newGrid.length; x++) {
  for (let y = 0; y < newGrid[x].length; y++) {
    if (newGrid[x][y] === "#") {
      map.push([x, y]);
    }
  }
}
let iterations = 1;
let sub = 0;
while (map.length > 1) {
  for (let i = 1; i < map.length; i++) {
    let dist =
      Math.abs(map[i][0] - map[0][0]) + Math.abs(map[i][1] - map[0][1]);
    counter += dist;
    sub++;
  }
  map.shift();
  iterations++;
}

console.log(counter);
