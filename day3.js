import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

const numReg = /\d/;
// const nonSymbol = /\d|\./;
const gear = /\*/;
let gearSum = 0;
const pad = ".";
const gearMap = new Map();

// pads the input with '.', to create an invisible wall,
// this nullifies the need for making edge-case exceptions.
let paddedInput = [...input];
paddedInput.push(pad.repeat(input[0].length));
paddedInput.unshift(pad.repeat(input[0].length));
for (let i = 0; i < paddedInput.length; i++) {
  paddedInput[i] = pad + paddedInput[i] + pad;
}

/* 
[i-1,j-1] [i-1,j] [i-1,j+1]
[i,j-1]   [i,j]   [i,j+1]
[i+1,j-1] [i+1,j] [i+1,j+1]
*/

// starts looping through the 'padded' 2D array
for (let i = 1; i < paddedInput.length - 1; i++) {
  for (let j = 1; j < paddedInput[i].length - 1; j++) {
    let tempNum = "";

    // if we have a number...
    if (numReg.test(paddedInput[i][j])) {
      // ...check around the number for gears
      for (let a = i - 1; a < i + 2; a++) {
        for (let b = j - 1; b < j + 2; b++) {
          let isGear = gear.test(paddedInput[a][b]);
          // if we find a gear...
          if (isGear) {
            // ...start tracking the number
            tempNum += paddedInput[i][j];
            // test for numbers left of the number passing as a part
            if (numReg.test(paddedInput[i][j - 1])) {
              let prev = true;
              let x = 1;

              while (prev) {
                let prevNum = paddedInput[i][j - x];
                tempNum = prevNum + tempNum;
                x++;
                if (!numReg.test(paddedInput[i][j - x])) {
                  prev = false;
                }
              }
            }
            // test for numbers right of the number passing as a part
            if (numReg.test(paddedInput[i][j + 1])) {
              let next = true;
              let y = 1;
              let jump = 0;
              while (next) {
                let nextNum = paddedInput[i][j + y];
                tempNum = tempNum + nextNum;
                y++;
                jump++;
                if (!numReg.test(paddedInput[i][j + y])) {
                  next = false;
                  j += jump;
                }
              }
            }
            // console.log(tempNum, [a, b]);

            // make a key using the gear coordinates as a string...
            let key = `${a}+${b}`;
            // ...then check if we have logged a part here yet.
            if (!gearMap.get(key)) {
              // if not, make an entry (with the value in an array)
              gearMap.set(key, [Number(tempNum)]);
            } else {
              // if so, add to the gear's array
              gearMap.get(key).push(Number(tempNum));
            }
          }
        }
      }
    }
  }
}

// function parameters order is (value, key, map)
// with the latter 2 not being needed here.
function findTwoPartGears(value) {
  if (value.length === 2) {
    gearSum += value[0] * value[1];
  }
}
// Map.prototype.forEach() executes a provided function once
// per each key/value pair in this map, in insertion order (value, key, map);
gearMap.forEach(findTwoPartGears);

console.log(gearSum);
