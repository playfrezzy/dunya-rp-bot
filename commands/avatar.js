const Discord = require('discord.js');
module.exports.run = async (bot, message) => {
  const embed = new Discord.RichEmbed()
  let kisi = message.mentions.members.first() || message.member;
  embed.setAuthor(kisi.user.username)
  embed.setImage(kisi.user.avatarURL)
  embed.setThumbnail("https://cdn.glitch.com/3d7c98a7-38ef-4cd6-8e01-f217fcfd1dde%2Fd%C3%BCnya-rp-bot.gif?v=1589291857266")
  message.channel.send(embed)
};

module.exports.conf = {
  aliases: ['avatarım'],
  enabled: 'yes',
  guild: false
}

module.exports.help = {
  name: 'avatar', 
  usage: 'avatar',
  category: "Kullanıcı"
};