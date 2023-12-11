import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

const compass = {
  N: [-1, 0],
  E: [0, 1],
  S: [1, 0],
  W: [0, -1],
};

const cameFromMap = {
  N: "S",
  S: "N",
  E: "W",
  W: "E",
};

/*
| is a vertical pipe connecting north and south.
- is a horizontal pipe connecting east and west.
L is a 90-degree bend connecting north and east.
J is a 90-degree bend connecting north and west.
7 is a 90-degree bend connecting south and west.
F is a 90-degree bend connecting south and east.
. is ground; there is no pipe in this tile.
S is the starting position of the animal; 
    there is a pipe on this tile, 
    but your sketch doesn't show what shape the pipe has.
*/
// Remember, when coming from the W or E, need to check for the opposite
// in the receiving pipe.
const pipeMap = {
  "|": ["N", "S"],
  "-": ["W", "E"],
  L: ["N", "E"],
  J: ["N", "W"],
  7: ["S", "W"],
  F: ["S", "E"],
  S: ["N", "S", "E", "W"],
};

let startX, startY;
for (let x = 0; x < input.length; x++) {
  if (input[x].indexOf("S") !== -1) {
    startX = x;
    startY = input[x].indexOf("S");
    break;
  }
}
let cameFrom = "";
let currentPipe = "S";
let counter = 0;
let nextLocation = [startX, startY];

/* N, E, S, W coordinates around start, 
    check these for the first connecting pipe!
          [i-1,j] 
[i,j-1]   [i,j]   [i,j+1]
          [i+1,j] 
*/

// When checking adjacent pipes, check for opposite direction connection

while (currentPipe === "S") {
  // check N coordinate, and for a pipe that accepts S
  if (
    input[startX - 1][startY] in pipeMap &&
    Object.values(pipeMap[input[startX - 1][startY]]).includes("S")
  ) {
    nextLocation[0] += compass["N"][0];
    nextLocation[1] += compass["N"][1];
    currentPipe = input[startX - 1][startY];
    cameFrom = "S";
    break;
  }
  // check E coordinate, and for a pipe that accepts W
  if (
    input[startX][startY + 1] in pipeMap &&
    Object.values(pipeMap[input[startX][startY + 1]]).includes("W")
  ) {
    nextLocation[0] += compass["E"][0];
    nextLocation[1] += compass["E"][1];
    currentPipe = input[startX][startY + 1];
    cameFrom = "W";
    break;
  }
  // check S coordinate, and for a pipe that accepts N
  if (
    input[startX + 1][startY] in pipeMap &&
    Object.values(pipeMap[input[startX + 1][startY]]).includes("N")
  ) {
    nextLocation[0] += compass["S"][0];
    nextLocation[1] += compass["S"][1];
    currentPipe = input[startX + 1][startY];
    cameFrom = "N";
    break;
  }
  // check W coordinate, and for a pipe that accepts E
  if (
    input[startX][startY - 1] in pipeMap &&
    Object.values(pipeMap[input[startX][startY - 1]]).includes("E")
  ) {
    nextLocation[0] += compass["W"][0];
    nextLocation[1] += compass["W"][1];
    currentPipe = input[startX][startY - 1];
    cameFrom = "E";
    break;
  }
}
counter++;
while (currentPipe !== "S") {
  //
  console.log(
    "start loop",
    currentPipe,
    cameFrom,
    nextLocation[0],
    nextLocation[1]
  );

  if (cameFrom === pipeMap[currentPipe][0]) {
    nextLocation[0] += compass[pipeMap[currentPipe][1]][0];
    nextLocation[1] += compass[pipeMap[currentPipe][1]][1];
  } else {
    nextLocation[0] += compass[pipeMap[currentPipe][0]][0];
    nextLocation[1] += compass[pipeMap[currentPipe][0]][1];
  }

  cameFrom =
    cameFrom === pipeMap[currentPipe][0]
      ? cameFromMap[pipeMap[currentPipe][1]]
      : cameFromMap[pipeMap[currentPipe][0]];

  currentPipe = input[nextLocation[0]][nextLocation[1]];

  counter++;
  console.log(
    "end loop",
    currentPipe,
    cameFrom,
    nextLocation[0],
    nextLocation[1],
    `counter: ${counter}`
  );
}

console.log(counter / 2);
