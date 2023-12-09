import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8").split("\n");

const cardRegex = /^(\S+)/;
const wagerRegex = /(\d+)$/;
const newInput = [];
const handByStrength = Array.from({ length: 7 }, () => []);

const cardStrength = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

/* 
Object hand-to-numberVariations-to-power(to be assigned) chart:
Five of a kind - 1 - (6)
Four of a kind - 2 - (5)
Full House - 2 - (4)
Three of a kind - 3 - (3)
Two Pair - 3 - (2)
One Pair - 4 - (1)
High Card - 5 - (0)
*/

input.forEach((line) => {
  newInput.push([line.match(cardRegex)[0], Number(line.match(wagerRegex)[0])]);
});

// Determining the size of this object helps determine the strength of the hand
newInput.forEach((hand) => {
  const handVariations = {};
  for (let i = 0; i < 5; i++) {
    if (!Object.hasOwn(handVariations, hand[0][i])) {
      handVariations[hand[0][i]] = 1;
    } else {
      handVariations[hand[0][i]]++;
    }
  }

  // This switch() then separates the type of hand into an Array
  switch (Object.keys(handVariations).length) {
    case 5:
      handByStrength[0].push(hand);
      break;
    case 4:
      handByStrength[1].push(hand);
      break;
    case 3:
      // To determine between "3 of a kind" and "Two Pair"
      if (Object.values(handVariations).includes(3)) {
        handByStrength[3].push(hand);
      } else {
        handByStrength[2].push(hand);
      }
      break;
    case 2:
      // To determine between "Four of a kind" and "Full House"
      if (Object.values(handVariations).includes(4)) {
        handByStrength[5].push(hand);
      } else {
        handByStrength[4].push(hand);
      }
      break;
    case 1:
      handByStrength[6].push(hand);
      break;
  }

  // console.log(handVariations, Object.keys(handVariations).length);
});

// Now sort each type of hand by strength, weakest to strongest
handByStrength.forEach((typeOfHand) => {
  typeOfHand.sort((a, b) => {
    for (let i = 0; i < 5; i++) {
      const aValue = cardStrength[a[0][i]];
      const bValue = cardStrength[b[0][i]];

      if (aValue !== bValue) {
        return aValue - bValue;
      }
    }
    // If all card values are equal, compare the cards themselves
    for (let i = 0; i < 5; i++) {
      if (a[0][i] !== b[0][i]) {
        return cardStrength[a[0][i]] - cardStrength[b[0][i]];
      }
    }
    return 0; // Hands are equal
  });
});

const allHandsSorted = handByStrength.flat();
let totalWinnings = 0;

for (let i = 0; i < allHandsSorted.length; i++) {
  // Add hand wager * strength to winnings
  totalWinnings += allHandsSorted[i][1] * (i + 1);
}

console.log(totalWinnings);
