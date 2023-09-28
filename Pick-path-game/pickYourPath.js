/* eslint-disable no-console */

// eslint-disable-next-line import/no-extraneous-dependencies

const gameOptionSize = 6;
let gameDifficulty;
do {
  gameDifficulty = Number(rlSync.question('Pick your path (Type 1, 2 or 3) \nFORGIVING (1) \nREALISTIC (2) \nCHALLENGING (3)\n'));
} while (gameDifficulty !== 1 && gameDifficulty !== 2 && gameDifficulty !== 3);

const setGameDifficulty = (difficulty, size) => {
  let trapPercentage;
  switch (difficulty) {
    case 1: trapPercentage = 1 / 8;
      break;
    case 2: trapPercentage = 1 / 3;
      break;
    case 3: trapPercentage = 1 / 2;
      break;
    default: trapPercentage = 1 / 3;
  }
  return Math.ceil(size * trapPercentage);
};
gameDifficulty = setGameDifficulty(gameDifficulty, gameOptionSize);

const trapGenerator = (optionSize) => Math.floor(Math.random() * optionSize);

// The size of the game can be changed easier for further development..
const gameSizeArray = [];
const setGameSize = (optionSize) => {
  for (let i = optionSize; i > 0; i -= 1) {
    gameSizeArray.push(i);
  }
};
setGameSize(gameOptionSize);

let gameTrapsArray = [];
const setGameTraps = (trapAmount) => {
  let trap;
  for (let i = 0; i < trapAmount; i += 1) {
    do {
      trap = trapGenerator(gameOptionSize);
    } while (gameTrapsArray.includes(trap));
    gameTrapsArray.push(trap);
  }
};
// eslint-disable-next-line no-return-assign
const unsetGameTraps = () => gameTrapsArray = [];

const playerPath = () => {
  let chosenPath;
  do {
    chosenPath = Number(rlSync.question(`...${gameOptionSize} doors ahead...${gameDifficulty} of them traps...No going back.\n        Type from 1-${gameOptionSize} to pick your path.      \n`));
  } while (!gameSizeArray.includes(chosenPath));
  return chosenPath;
};
const playgame = (difficulty, levelsCleared = 0) => {
  setGameTraps(difficulty);
  if (gameTrapsArray.includes(playerPath())) {
    console.log(`${levelsCleared} rooms in, you hit a trap.\nDoes it ever end?`);
  } else {
    unsetGameTraps();
    // eslint-disable-next-line no-param-reassign
    levelsCleared += 1;
    console.log(`--------${levelsCleared} Rooms cleared. BUT ANOTHER AWAITS---------\n`);
    playgame(difficulty, levelsCleared);
  }
};
playgame(gameDifficulty);

// Make it playable in browser
