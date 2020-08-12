const fs = require('fs');
const Discord = require('discord.js');
const db = require('quick.db');
var xp = new db.table('xp');
module.exports.run = async (bot, message, args) => {
  let user = message.mentions.members.first() || message.member;
  
  let curxp = await xp.fetch(`${message.author.id}.xp`);
  let curlvl = await xp.fetch(`${message.author.id}.level`);
  
  let embed = new Discord.RichEmbed()
    .setTitle("Deneyim")
    .setAuthor(user.nickname ? user.nickname : user.user.username, user.user.displayAvatarURL)
    .addField("Deneyiminiz", `${curxp} Xp`, true)
    .addField("Deneyim Seviyeniz", `${curlvl} Level`, true)
  
  message.channel.send(embed)
};

module.exports.conf = {
  aliases: ["xp", "lvl", "seviye", "deneyim"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "level",
  usage: "level",
  category: "Kullanıcı"
}