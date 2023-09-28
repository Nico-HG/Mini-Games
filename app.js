import inquirer from 'inquirer'
import chalk from 'chalk'

inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
let number = 0.23200000000004

console.log(chalk.bgGreen(number.toFixed(2)))

function getName(){
  const anwsers = inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    

})
.then()
playername = anwsers.player_name;
}

await getName()