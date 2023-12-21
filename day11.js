import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

const grid = input.map((line) => line.split(""));
const galaxyRegex = /\#/;
let counter = 0;
const spaceGap = 1000000;

// test for empty rows
const newRows = [];

// Now, for gaps, instead of pushing further "empty" rows, we push a single
// identifier row.  Later, we'll check for crossing one of these gaps, and
// add it's quantity to the total.

for (let i = 0; i < grid.length; i++) {
  if (galaxyRegex.test(input[i])) {
    newRows.push(grid[i]);
  } else {
    let gap = new Array(grid[i].length).fill("x");
    newRows.push(gap);
  }
}
const rotatedGrid = [];
for (let col = 0; col < newRows[0].length; col++) {
  rotatedGrid.push([]);
  for (let row = 0; row < newRows.length; row++) {
    rotatedGrid[col].unshift(newRows[row][col]);
  }
  rotatedGrid[col] = rotatedGrid[col];
}
const newGrid = [];
for (let i = 0; i < rotatedGrid.length; i++) {
  if (galaxyRegex.test(rotatedGrid[i])) {
    newGrid.push(rotatedGrid[i]);
  } else {
    let gap = new Array(rotatedGrid[i].length).fill("x");
    newGrid.push(gap);
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
while (map.length > 1) {
  for (let i = 1; i < map.length; i++) {
    let x = map[i][0];
    let y = map[i][1];
    while (x !== map[0][0]) {
      if (x > map[0][0]) {
        x--;
        if (newGrid[x][y] === "x") {
          counter += spaceGap;
        } else {
          counter++;
        }
      } else {
        x++;
        if (newGrid[x][y] === "x") {
          counter += spaceGap;
        } else {
          counter++;
        }
      }
    }
    while (y !== map[0][1]) {
      if (y > map[0][1]) {
        y--;
        if (newGrid[x][y] === "x") {
          counter += spaceGap;
        } else {
          counter++;
        }
      } else {
        y++;
        if (newGrid[x][y] === "x") {
          counter += spaceGap;
        } else {
          counter++;
        }
      }
    }
  }
  map.shift();
}

console.log(counter);
