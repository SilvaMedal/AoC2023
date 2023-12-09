import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

const maps = {};
const mapKeys = [];
let currentMapType = "";
let locations = [];

// find the seeds, and start our map with their values
let seeds = input[0].replace("seeds: ", "").split(" ").map(Number);

for (const line of input) {
  // first time I've used .endWith()!
  if (line.endsWith(" map:")) {
    currentMapType = line.replace(":", ""); // Extract the map type
    maps[currentMapType] = []; // Initialize an empty array for the current map type
    mapKeys.push(currentMapType);
  } else if (line.trim() !== "") {
    // If the line is not empty, split the values and add them to the current map type
    const values = line.split(" ").map(Number);
    maps[currentMapType]?.push(values);
  }
}
const moreSeeds = [];

for (let i = 0; i < seeds.length; i += 2) {
  const seed = seeds[i];

  const count = seeds[i + 1];
  for (let j = 0; j < count; j++) {
    moreSeeds.push(seed + j);
  }
}

// changed the recursive function to for...loops to help prevent stack overflow
for (const seed of moreSeeds) {
  let seedTracker = seed;
  for (let counter = 0; counter < mapKeys.length; counter++) {
    const currentMap = maps[mapKeys[counter]];
    for (const map of currentMap) {
      const srcStart = map[1];
      const srcEnd = map[1] + (map[2] - 1);
      const destStart = map[0];
      if (seedTracker >= srcStart && seedTracker <= srcEnd) {
        seedTracker = seedTracker - srcStart + destStart;
        break;
      }
    }
  }
  locations.push(seedTracker);
}

console.log(Math.min(...locations));
