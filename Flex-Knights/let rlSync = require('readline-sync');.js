let rlSync = require('readline-sync');

const player = {
  name: '' ,
  graphic: '╰༼⇀︿⇀༽つ-]═──',
  health: 10,
  attack: 3,
  flex: 1,
  maxFlex: 2,
  pauseparry: 0,
  pauseflex: 0,
  parryChance: 0.6,
  attackLog: '',

}
'──═[-ᑫ`Ĺ̯´ᑷ/'

let flex = '❚█══█❚';
const goblin = {
  name: 'goblin',
  graphic: 'ლ(｀ー´ლ) ',
  health: 18,
  attack: 2,
  flex: 1,
  maxFlex: 2,
  pauseparry: 0,
  pauseflex: 0,
  parryChance: 0.5,
  attackLog: '',

}
  if( player.pauseflex === 1) {
    player.flex = player.maxFlex;
    playerMove = 'attack'
    player.attackLog = 'Using your flex attack'
  } else if ( playerMove === 'flex' && player.pauseflex === 0) {
    player.pauseflex = 2
  }
  if (goblin.pauseflex === 1) {
    goblin.flex = goblin.maxFlex;
    goblinMove = 'attack'
    goblin.attackLog = 'goblin using flex attack'
  } else if (goblinMove === 'flex' && goblin.pauseflex === 0) {
    goblin.pauseflex = 2
  }


  const flexAttackCheck = char => {
    if( char.pauseflex === 1) {
      char.flex = char.maxFlex;
      char.attackLog = 'Using your flex attack'
      return 'attack'
    } else if ( move === 'flex' && char.pauseflex === 0) {
      char.pauseflex = 2
    }
  }

  playermove = flexAttackCheck(player);


  if((player.move === 'parry' && goblin.move === 'attack') && chance(player.parryChance)) {
    goblin.pauseparry = 2;
    goblin.move = 'unset';
    player.attackLog += ' succesful'
    } else if ((player.move === 'parry' && goblin.move === 'attack') && !chance(player.parryChance)) {
      player.attackLog += ' unsuccesful'

    }
  
  if((goblin.move === 'parry' && player.move === 'attack') && chance(goblin.parryChance)) {
    player.pauseparry = 2
    player.move = 'unset'
    goblin.attackLog += ' succesful '
    } else if ((goblin.move === 'parry' && player.move === 'attack') && !chance(goblin.parryChance)) {
      goblin.attackLog += ' unsuccesful'

    }


    const parryCheck = (char, enemy) => {
      if((char.move === 'parry' && enemy.move === 'attack') && chance(char.parryChance)) {
        enemy.pauseparry = 2;
        enemy.move = 'unset';
        char.attackLog += ' succesful'
        } else if ((char.move === 'parry' && enemy.move === 'attack') && !chance(char.parryChance)) {
          char.attackLog += ' unsuccesful'
    
        }
    }
    parryCheck(player,goblin)
    parryCheck(goblin,player)

    if (player.pauseflex !== 1 && player.pauseparry !== 1) {
      player.move = playerMovePick();
      player.attackLog = `You picked ${player.move}`
    }
    if (goblin.pauseflex !== 1 && goblin.pauseparry !== 1) {
      goblin.move = goblinMovePick();
      goblin.attackLog = ( `${goblin.name} picked ${goblin.move}`)
    }

    const getMove = char => {
      if (char.pauseflex !== 1 && char.pauseparry !== 1) {
        char.move = playerMovePick();
        char.attackLog = `You picked ${char.move}`
      }
    }
    getMove(player);
    getMove(goblin);

//chec



const attackSim = (player, opponent) =>{
  let win;
  if(player.move === 'attack') opponent.health -= (player.attack * player.flex)
  if (opponent.health <= 0) {
    win = true
    roundWin = win
    return;
  }
  if(opponent.move === 'attack') player.health -= (opponent.attack * opponent.flex)
  if(player.health <= 0) {
    win = false
    roundWin = win
    return
  }
}
let roundWin;
attackSim(player, enemy)
if(roundWin === false) {
    logLine(1);
    logYourStats(player);
    logLine(1);
    console.log(`Well fought ${player.name}, however you have been bested. Game Over.`)
    logLine(1);
    return
  
  }


