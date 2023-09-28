const chance = num => {
  if(Math.random() <= num) {
    return true;
  } else return false;
}

console.log(chance(0.2));
let move;
let rng = Math.ceil(Math.random() * 3);
  switch(rng){
    case 1: move = 'attack';
      break;
    case 2: move = 'flex';
      break;
    case 3: move = 'parry';
      break;
  } 



  const basicmove = (oneToThree) => {
    switch(oneToThree){
      case 1: return 'attack';
      case '1': return 'attack';
      case 2: return 'parry';
      case '2': return 'parry';
      case 3: return 'flex';
      case '3': return 'flex';
    }
  }
let rlSync = require('readline-sync');

 

  const goblinMovePick = () => {
    let rng = Math.ceil(Math.random() * 3);
    return basicmove(rng);
  }

  const playerMovePick = () => {
    let move;
    do { move = rlSync.question('Would you like to attack parry or flex?')
    } while (move !== '1' && move !== '2' && move !== '3')
    return basicmove(move);
  }

const player = {
  name: '',
  water: 'loo',

} 
let Regex = '/^[^a-zA-Z]*$/';
const regex = /[A-Z]/g



  const pickPlayerName = () => {
    player.name = rlSync.question('What is yoour player name?\n')
    if (player.name.length > 9) {
      console.log('less than 10 characters');
      pickPlayerName()
    } 

  }
console.log(player.name);
pickPlayerName()
console.log(player.name);
