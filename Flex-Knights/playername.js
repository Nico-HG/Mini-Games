let rlSync = require('readline-sync');

const player = {
  name: undefined,
  water: 'loo',

} 
let Regex = '/^[^a-zA-Z]*$/';
const regex = /[A-Z]/g

//could split into array and test that each matches basic letters or just use forEach. or let of
const basicKeys = (input) => {
  for (let element of input) {
    if (!/[A-Za-z]/.test(element)) {
      return false
    }
  }
}
const pickPlayerName = () => {
    let name;
    do { name = rlSync.question('What is your Knight name? (Must include no numbers and less than ten characthers)\n') 
    }  while (name.length > 9 || basicKeys(name) !== undefined || !name)
    name = name[0].toUpperCase() + name.slice(1);
    player.name = 'Sir ' + name;
}



pickPlayerName()
console.log(player.name);

