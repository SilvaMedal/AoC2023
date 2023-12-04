import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

const numReg = /\d/;
const nonSymbol = /\d|\./;
let partSum = 0;
const pad = ".";

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

// maybe look at noting the indices of numbers and symbols by line and
// see where they lap/meet?

for (let i = 1; i < paddedInput.length - 1; i++) {
  for (let j = 1; j < paddedInput[i].length - 1; j++) {
    let tempNum = "";
    let partBool = false;

    if (numReg.test(paddedInput[i][j])) {
      if (
        !nonSymbol.test(paddedInput[i - 1][j - 1]) ||
        !nonSymbol.test(paddedInput[i - 1][j]) ||
        !nonSymbol.test(paddedInput[i - 1][j + 1]) ||
        !nonSymbol.test(paddedInput[i][j - 1]) ||
        !nonSymbol.test(paddedInput[i][j + 1]) ||
        !nonSymbol.test(paddedInput[i + 1][j - 1]) ||
        !nonSymbol.test(paddedInput[i + 1][j]) ||
        !nonSymbol.test(paddedInput[i + 1][j + 1])
      ) {
        partBool = true;
        tempNum += paddedInput[i][j];
      }
      // test numbers left of the number passing as a part
      if (partBool && numReg.test(paddedInput[i][j - 1])) {
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
      // test numbers right of the number passing as a part
      if (partBool && numReg.test(paddedInput[i][j + 1])) {
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
    }
    //
    // console.log(tempNum);
    partSum += Number(tempNum);
  }
}

console.log(partSum);
