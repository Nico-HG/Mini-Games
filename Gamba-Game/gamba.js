/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line no-unused-vars
import Rlsync from 'readline-sync';

let balance = 300;

// calculations here need to be changed( research how the best slot machines do it then copy)
const gamble = (wagerAmount) => {
  let multiplier;
  const count = Math.ceil((Math.random() * 7));
  switch (count) {
    case 1: case 2: case 3: case 4: case 5:
      multiplier = 0;
      break;
    case 6:
      multiplier = 1.5;
      break;
    case 7:
      multiplier = 4;
      break;
    default:
  }
  return Math.round(multiplier * wagerAmount);
};

const playerWager = () => {
  let wager;
  do {
    wager = Rlsync.question(`$${balance} in funds. Place your bet! \n┏━━━✦❘༻༺❘✦━━━┓━━━✦❘༻༺❘✦━━━┓\n`);
  } while (isNaN(wager) || wager > balance || wager < 1);
  balance -= wager;
  const gambleReturn = gamble(wager);
  let newBalance = gambleReturn + balance;
  if (gambleReturn > wager) {
    newBalance += '+';
  } else {
    newBalance += '-';
  }
  return newBalance;
};

const playGame = () => {
  if (balance === 0) {
    console.log('You have run out of funds better luck next time :)');
    return;
  }
  const balanceWithTag = playerWager();
  balance = parseInt(balanceWithTag);
  if (balanceWithTag[balanceWithTag.length - 1] === '+') {
    console.log('===============WINNNNNNNNNNNNN=================\n$$$$$$(^o^)~≪☆*CONGRATULATIONS*☆≫~(^o^)／$$$$$$\n');
  }

  let repeatGameOrNot;
  do {
    repeatGameOrNot = Rlsync.question(`New balance is $${balance}\nWould you like to keep playing? Press enter\nIf not please type in caps 'EXIT CASINO AND STOP PLAYING AND HAVING FUN'\n`);
  } while (repeatGameOrNot !== '' && repeatGameOrNot !== 'EXIT CASINO AND STOP PLAYING AND HAVING FUN');

  repeatGameOrNot ? console.log(`Your final balance is $${balance}! Be sure to play again!`) : playGame();
};

playGame();

// make the maths bhind it better + variable with balance
// add to browser
