const ayarlar = require('../ayarlar.json');
const Discord = require('discord.js');
exports.run = async (bot, message, args , prefix) => {
  let hedef = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let sebep = args.slice(1).join(' ');
  let logs = message.guild.channels.find('name', ayarlar.channels.logs);
  
  if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('Yetkin Yok!');
  if (!hedef) return message.reply('Lütfen birini etiketle!\nKullanım: +kick <üye> <sebep>');
  if (!sebep) return message.reply('Lütfen sebep belirt!\nKullanım: +kick <üye> <sebep>');
  if (!logs) return message.reply(`Lütfen ${ayarlar.logsChannel} adlı bir kanal oluşturunuz!`);
  
  if(hedef.highestRole.comparePositionTo(message.member.highestRole) >= 0) return message.reply("Atacağın kişi senden üstün ya da eşit!");
  
  const kick = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail("https://cdn.glitch.com/3d7c98a7-38ef-4cd6-8e01-f217fcfd1dde%2Fd%C3%BCnya-rp-bot.gif?v=1589291857266")
    .setTitle('Kicklenme')
    .addField('Kicklenen Kişi: ', `${hedef.user.username}, IDsi: ${hedef.user.id}`)
    .addField('Kickleyen Kişi: ', `${message.author.username}, IDsi: ${message.author.id}`)
    .addField('Kicklendiği Zamanı: ', message.createdAt)
    .addField('Kicklendiği Kanal: ', message.channel)
    .addField('Kicklenme Sebebi: ', sebep)
    .setFooter('Kicklenen Kişinin Bilgileri', hedef.user.displayAvatarURL)
  
  const kick2 = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail("https://cdn.glitch.com/3d7c98a7-38ef-4cd6-8e01-f217fcfd1dde%2Fd%C3%BCnya-rp-bot.gif?v=1589291857266")
    .setTitle('Kicklenme')
    .addField('Kicklenen Kişi: ', `${message.member.username}, IDsi: ${message.member.id}`)
    .addField('Kickleyen Kişi: ', `${message.guild.me.username}, IDsi: ${message.guild.me.id}`)
    .addField('Kicklendiği Zamanı: ', message.createdAt)
    .addField('Kicklendiği Kanal: ', message.channel)
    .addField('Kicklenme Sebebi: ', "Trollemeye çalıştı.")
    .setFooter('Kicklenen Kişinin Bilgileri', message.member.displayAvatarURL)
  
  if(hedef.roles.has("709344645078974475")) {
    message.member.kick("Trollemeye çalıştı.");
    message.channel.send(`**${message.member.username}**, **${message.guild.me}** tarafından **Trollemeye çalıştı.** sebebiyle kicklendi!`);
    logs.send(kick2);
    return;
  }
  
  message.channel.send(`**${hedef.user.username}**, **${message.author}** tarafından **${sebep}** sebebiyle kicklendi!`);
  hedef.kick(sebep);
  logs.send(kick);
};

module.exports.conf = {
  aliases: ['kick'],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "at",
  usage: "at <üye> <sebep>",
  category: "Yetkili"
};