const Discord = require('discord.js');
const math = require('math-expression-evaluator');
const fs = require('fs');
let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
module.exports.run = (bot, message, args, functions) => {
  
  let prefix = prefixes[message.guild.id].prefixes;

  // Delete the message that the user sends
  message.delete();
  
  if(!args) {
    return functions.hook(message.channel, 'Hook Usage', `${prefix}hook <title>, <message>, [HEXcolor], [avatarURL]\n\n**<> is required\n[] is optional**`,'FC8469','https://cdn4.iconfinder.com/data/icons/global-logistics-3/512/129-512.png') // Remeber that \n means new line. This is also using a custom HEX id, and an image.
  }
  
  let hookArgs = message.content.slice(prefix.length + 4).split(","); // This slices the first 6 letters (prefix & the word hook) then splits them by 'commas'

  functions.hook(message.channel, hookArgs[0], hookArgs[1], hookArgs[2], hookArgs[3], hookArgs[4]); // This is where it actually calls the hook.
  
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: 'hook', 
  usage: 'hook',
  category: "Eğlence"
}