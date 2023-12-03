import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");
// \/ for first part
// const regLast = /(\d|one|two|three|four|five|six|seven|eight|nine)$(?=[a-z]*$)/;

// .* looks for everything BEFORE the group
const firstNumReg = /(\d|one|two|three|four|five|six|seven|eight|nine)/;
const lastNumReg = /.*(\d|one|two|three|four|five|six|seven|eight|nine)/;

// \/ ugly way to do this...
// const lastNumReg = /\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/;
let sum = 0;
const numMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};
for (let i = 0; i < input.length; i++) {
  let nums = [];

  // part of the ugly process
  // let reverseInput = input[i].split("").reverse().join("");

  // the index of a group is a "1" with match
  nums.push(input[i].match(firstNumReg)[1]);
  nums.push(input[i].match(lastNumReg)[1]);
  //   let last = input[i].match(regLast)[0];
  // nums = [nums[0], nums[nums.length - 1];
  console.log(nums);
  if (nums[0].length > 1) {
    nums[0] = numMap[nums[0]];
  }
  if (nums[1].length > 1) {
    nums[1] = numMap[nums[1]];
  }
  //   console.log(nums);
  let num = Number(nums[0] + nums[1]);
  sum += num;
  //   console.log(sum);
  //   console.log(nums[0], nums[1]);
}

console.log(input.length);
console.log(sum);
