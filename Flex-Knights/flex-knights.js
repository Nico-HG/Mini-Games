/* eslint-disable consistent-return */
/* eslint-disable arrow-parens */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import rlSync from 'readline-sync'
import inquirer from 'inquirer'

const game = {};
game.continue = true;
game.doubleScreen = 0; 

//factory function for every characther (I CANT FUCKING SPELL ITS WRONG I CAN SEE IT)
function Char(name, graphic, startHealth, health, attack, maxFlex, parryChance) {
  this.attackLog = '';
  this.move = '';
  this.pauseparry = 0;
  this.pauseflex = 0;
  this.flex = 1;
  this.movePick = () => basicmove(Math.ceil(Math.random() * 3));
  //
  this.name = name;
  this.graphic = graphic;
  this.startHealth = startHealth;
  this.health = health;
  this.attack = attack;
  this.maxFlex = maxFlex;
  this.parryChance = parryChance;
}
//creating each char in the game
const player = new Char('', '╰༼⇀︿⇀༽つ-]═──', 24, 24, 3, 3, 0.55);
const goblin = new Char('goblin', '──═[-ᑫ`Ĺ̯´ᑷ/', 10, 10, 2, 2, 0.3);
const goblinrager = new Char('RAGED GOBLIN', '──═[-ᑫ`O´ᑷ/', 12, 12, 3, 2, 0.1);
goblinrager.movePick = () => {
  if (chance(0.7)) return 'attack';
  if (chance(0.5)) return 'flex';
  return 'parry';
};
const level3 = new Char('TESTTTTT', '--)<(^_^<)', 18, 18, 4, 2, 0.4);
level3.movePick = classicMove
const level4 = new Char('Sir SLATT', 'GRAPHIC', 18, 18, 4, 2, 0.5);
level4.movePick = classicMove
const level5 = new Char('Sir POPPAA', 'GRAPHIC', 20, 20, 4, 2, 0.6);
level5.movePick = classicMove
const level6 = new Char('Sir MAGAZINEE', 'GRAPHIC', 24, 24, 5, 2, 0.7);
level6.movePick = classicMove
const level7 = new Char('Sir RALPHY', 'GRAPHIC', 24, 24, 4, 3, 0.75);
level7.movePick = classicMove
const level8 = new Char('Lord LORDINGTON', 'GRAPHIC', 26, 26, 5, 3, 0.8);
level8.movePick = classicMove





//Player picks name
const basicKeys = (input) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const element of input) {
    if (!/[a-z]/.test(element)) {
      return false;
    }
  }
};
const pickPlayerName = () => {
  let name;
  do {
    name = rlSync.question('What is your Knight name? (no numbers, no caps and less than ten characthers)\n');
  } while (name.length > 9 || basicKeys(name) !== undefined || !name);
  name = name[0].toUpperCase() + name.slice(1);
  player.name = `Sir ${name}`;
};
//player inputs move and gets move from enemy
function basicmove(input){
  switch (input) {
    case 1: case '1': return 'attack';
    case 2: case '2': return 'parry';
    case 3: case '3': return 'flex';
    default:
  }
};
function classicMove() {
  if (player.pauseparry === 1) return 'attack';
  if (player.pauseflex === 1) return 'parry';
  else {
    return basicmove(Math.ceil(Math.random() * 3));
  }
}
const playerMovePick = () => {
  let move;
  do {
    move = rlSync.question('Type number to: \nAttack (1) \nparry (2) \nflex (3)\n');
  } while (move !== '1' && move !== '2' && move !== '3');
  return basicmove(move);
};
const getMovePlayer = char => {
  if (char.pauseflex !== 1 && char.pauseparry !== 1) {
    char.move = playerMovePick();
    char.attackLog = `${char.name} picked ${char.move}`;
  } else {
    game.doubleScreen = 2;
    char.attackLog = `...`;
  }
};
const getMoveEnemy = char => {
  if (char.pauseflex !== 1 && char.pauseparry !== 1) {
    // right now its basic enemy move but we change this to allow for more tpyes of move picks
    char.move = char.movePick();
    char.attackLog = `${char.name} picked ${char.move}`;
  } else {
    char.attackLog = `...`;
  }
};
const chance = num => Math.random() <= num ? true : false;

// Get the game info the player needs and logs it
const logYourStats = (char) => {
  console.log(`${char.name} ${char.graphic} stats:\nhealth: ${char.health}, attack: ${char.attack}, flex: ${char.maxFlex} parry chance: ${char.parryChance.toFixed(2)}`);
  if (char.pauseparry === 1) console.log('**STUNNED FROM PARRY**');
  if (char.pauseflex === 1) console.log('**FLEXING MUSCLES!!**');
}; 
const logLine = (num) => {
  for (let i = num; i > 0; i -= 1) {
    console.log('=================================================================');
  }
};
const gameStateLog = (enemy) => {
  logLine(2);
  logYourStats(player);
  logLine(1);
  logYourStats(enemy);
  logLine(2);
};
const logAttacks = (enemy) => console.log(`▂ ▄ ▅ ${player.attackLog} ♥╣[-_-]╠♥ ${enemy.attackLog} ▅ ▄ ▂`);
const gameOverScreen = () => {
  logLine(1);
  logYourStats(player);
  logLine(1);
  console.log(`Well fought ${player.name}, however you have been bested. Game Over.`);
  logLine(2);
  game.continue = false;
};
const gameRoundWinScreen = () => {
  logLine(1);
  logYourStats(player);
  logLine(1);
  console.log(`Well fought ${player.name},you have bested your opponent.`);
  logLine(2);
};
// Reset counters after a round and attacklog
const resetFlex = char => char.flex = 1;
const resetAttackLog = char => char.attackLog = '';
const toZeroPauseParry = char => {
  if (char.pauseparry > 0) char.pauseparry -= 1;
};
const toZeroPauseFlex = char => {
  if (char.pauseflex > 0) char.pauseflex -= 1;
};
const resetStats = (enemy) => {
  resetFlex(player);
  resetFlex(enemy);
  toZeroPauseFlex(player);
  toZeroPauseParry(player);
  toZeroPauseFlex(enemy);
  toZeroPauseParry(enemy);
  if (game.doubleScreen > 0) game.doubleScreen -= 1;
};
const resetLogs = (enemy) => {
  resetAttackLog(player);
  resetAttackLog(enemy);
}

//different outcomes for game options
const flexAttackCheck = char => {
  if (char.pauseflex === 1) {
    char.flex = char.maxFlex;
    char.attackLog = 'FLEX ATTACK';
    char.move = 'attack';
  } else if (char.move === 'flex' && char.pauseflex === 0) {
    char.pauseflex = 2;
  }
};
const parryCheck = (char, enemy) => {
  const parry = chance(char.parryChance);
  if ((char.move === 'parry' && enemy.move === 'attack') && parry) {
    enemy.pauseparry = 2;
    enemy.move = '';
    char.attackLog += ' (succesful)';
  // eslint-disable-next-line no-dupe-else-if
  } else if ((char.move === 'parry' && enemy.move === 'attack') && !parry) {
    char.attackLog += ' (unsuccesful)';
  }
};
const attackSim = (player, enemy) => {
  if (player.move === 'attack') enemy.health -= (player.attack * player.flex);
  if (enemy.health <= 0) enemy.move = '';

  if (enemy.move === 'attack') player.health -= (enemy.attack * enemy.flex);
  
  resetStats(enemy);
  // THIS CAN BE REWRITTEN TO AVOID THIS ISSUE
  // eslint-disable-next-line no-use-before-define

};
//different game functions 
const playRound = enemy => {

  if (game.doubleScreen !== 1) {
    console.clear();
  } 
 
  logAttacks(enemy);
  gameStateLog(enemy);
  getMovePlayer(player);
  getMoveEnemy(enemy);
  flexAttackCheck(player);
  flexAttackCheck(enemy);
  parryCheck(player, enemy);
  parryCheck(enemy, player);
  attackSim(player, enemy);
  // here i could continue
};
const pickUpgrade = () => {
  let choice;
  do {
    choice = rlSync.question('Pick your upgrade: \nRegen to max health (1)\n+1 attack (2)\n+0.05 parry chance (3)\n');
  } while (choice !== '1' && choice !== '2' && choice !== '3');
  switch (choice) {
    case '1': player.health = player.startHealth;
      break;
    case '2': player.attack += 1;
      break;
    case '3': player.parryChance += 0.05;
      break;
    default:
  }
};
const levelUp = () => {
  pickUpgrade();
};

function playNewEnemy(enemy) {
  player.attackLog = `You prepare for a new foe`;  
  do {
    playRound(enemy);
  } while (enemy.health > 0 && player.health > 0);
  if (enemy.health <= 0) enemyDeath(enemy);
  if (player.health <= 0) playerDeath(enemy);
}

function enemyDeath(enemy) {
  enemy.attackLog = 'RIP';
  logAttacks(enemy);
  gameRoundWinScreen();
  resetStats(enemy);
}
function playerDeath(enemy) {
  logAttacks(enemy);
  resetStats(enemy);
  gameOverScreen();
}

//game
const play = () => {
  pickPlayerName();

  playNewEnemy(goblin);
  if (!game.continue) return;
  levelUp();

  playNewEnemy(goblinrager);
  if (!game.continue) return;
  levelUp();

  playNewEnemy(level3);
  if (!game.continue) return;
  levelUp();
  
  playNewEnemy(level4);
  if (!game.continue) return;
  levelUp();

  playNewEnemy(level5);
  if (!game.continue) return;
  levelUp();

  playNewEnemy(level6);
  if (!game.continue) return;
  levelUp();

  playNewEnemy(level7);
  if (!game.continue) return;
  levelUp();
  
  playNewEnemy(level8);
  if (!game.continue) return;
  levelUp();
};

play();


