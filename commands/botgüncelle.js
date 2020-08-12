const Discord = require('discord.js');
const math = require('math-expression-evaluator');
const fs = require('fs');
let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
module.exports.run = (bot, message, args, functions) => {
  
  let prefix = prefixes[message.guild.id].prefixes;

  // Delete the message that the user sends
  message.delete();
  
  let hookArgs = message.content.slice(prefix.length + 4).split(","); // This slices the first 6 letters (prefix & the word hook) then splits them by 'commas'

  functions.hook(message.channel, "Arda Kaya", hookArgs[1], hookArgs[2], "752662", "https://cdn.glitch.com/53b0ce8e-c068-4ee2-992c-fae66c836038%2FArda.jpg?v=1591452511499"); // This is where it actually calls the hook.
  
};

module.exports.conf = {
  aliases: ["botgüncelleme", "botgüncellemeleri"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: 'botgüncelle', 
  usage: 'botgüncelle',
  category: "Yetkili"
}