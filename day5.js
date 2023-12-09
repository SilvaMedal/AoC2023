import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

const maps = {};
const mapKeys = [];
let currentMapType = "";
const locations = [];

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
//  Traverse the maps for each seed
seeds.forEach((seed) => {
  let maxCount = mapKeys.length;
  let counter = 0;
  // Push our locations into one array
  locations.push(findLocation(seed, maps[mapKeys[counter]], counter, maxCount));
});

function findLocation(seedTracker, map, counter, maxCount) {
  for (let x = 0; x < map.length; x++) {
    let srcStart = map[x][1];
    let srcEnd = map[x][1] + (map[x][2] - 1);
    let destStart = map[x][0];
    // Check if the seedTracker is in the current range
    if (seedTracker >= srcStart && seedTracker <= srcEnd) {
      seedTracker = seedTracker - srcStart + destStart;
      // Necessary to prevent checking the same map with the new number
      break;
    }
  }
  counter++; // To keep track of which map we're currently on
  //   If there are maps left
  if (counter < maxCount) {
    return findLocation(seedTracker, maps[mapKeys[counter]], counter, maxCount);
  }
  return seedTracker;
}

// Find the lowest location
console.log(Math.min(...locations));
