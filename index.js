//installed the discord.js lib
const Discord = require('discord.js');
//crete a new object aka the bot
const clbot = new Discord.Client();
//token for logging into bot
const token = process.env.token;
//need the ! so the bot knows you'r talking to it
const botstart = "!";
//package.json for variables
const pkg = require('./package.json');

//when bot in ready say this msg
clbot.on('ready', () => {
  console.log("It's on boy")
})
//an array of compliments now for anyone who asked for it
let compliments = ["you'r so cool", "you'r so handsome", "End me", "you'r ok", "you'r so smart", "Eveything I said before was a lie"]
//var to keep track of size of compliments array
const size = compliments.length;
//Created this random function to give a diffrent Compliment each time for the Compliment FUnction
function randoNum(myMin) {
  return Math.floor(Math.random() * (size - myMin + 1)) + myMin;
}

//If you type in "Compliment" in discord it will respond with a random compliment from array
clbot.on('message', msg => {
  // $ plus compliment and not case sensative anymore
  if (msg.content.toLowerCase() == botstart + "compliment") {
    msg.reply(compliments[randoNum(0)]);
  }
})

//Created a switch statment for multiple commands
clbot.on('message', msg => {
  //breaks message apart so i can have 2 or more in a command
  let dprefix = msg.content.toLowerCase().substring(botstart.length).split(" ");
  switch (dprefix[0]) {
    case 'commands':
    case 'command':
      msg.reply('Every bot command needs an "!"" before it');
      msg.reply('"!"Compliments = Gives a random Compliment');
      msg.reply('"!"Author = Tells you who the cutest man alive is');
      break;
      //Delete a certain amount of messages
    case 'delete':
      if (dprefix[1]) {
        msg.channel.bulkDelete(dprefix[1]);
      } else {
        msg.reply('Specify the number of messages to delete')
      }
      break;
      //A fun get to know
    case 'author':
      msg.channel.send('I was created by' + " " + pkg.homepage);
      break;


  }
})



//bot login token
clbot.login(token);