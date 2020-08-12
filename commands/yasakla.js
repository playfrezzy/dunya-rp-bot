const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');
module.exports.run = async (bot, message, args , prefix) => { 
  let hedef = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let sebep = args.slice(1).join(' ');
  let logs = message.guild.channels.find('name', ayarlar.channels.logs);
  
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('Yetkin Yok!') 
  if (!hedef) return message.reply('Lütfen birini etiketle!\nKullanım: +ban <üye> <sebep>');
  if (!sebep) return message.reply('Lütfen sebep belirt!\nKullanım: +ban <üye> <sebep>');
  if (!logs) return message.reply(`Lütfen ${ayarlar.channels.logs} adlı bir kanal oluşturunuz!`);
  
  if(hedef.highestRole.comparePositionTo(message.member.highestRole) >= 0) return message.reply("Yasaklayacağın kişi senden üstün ya da eşit!");
  
  const ban = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail(hedef.user.avatarURL)
    .setTitle('Banlanma')
    .addField('Banlanan Kişi: ', `${hedef.user.username}, IDsi: ${hedef.user.id}`)
    .addField('Banlayan Kişi: ', `${message.author.username}, IDsi: ${message.author.id}`)
    .addField('Banladığı Zamanı: ', message.createdAt)
    .addField('Banlandığı Kanal: ', message.channel)
    .addField('Banlanma Sebebi: ', sebep)
    .setFooter('Banlanan Kişinin Bilgileri', hedef.user.displayAvatarURL)
  
  const ban2 = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail(hedef.user.avatarURL)
    .setTitle('Banlanma')
    .addField('Banlanan Kişi: ', `${message.member.username}, IDsi: ${message.member.id}`)
    .addField('Banlayan Kişi: ', `${message.guild.me.username}, IDsi: ${message.guild.me.id}`)
    .addField('Banladığı Zamanı: ', message.createdAt)
    .addField('Banlandığı Kanal: ', message.channel)
    .addField('Banlanma Sebebi: ', "Trollemeye çalıştı.")
    .setFooter('Banlanan Kişinin Bilgileri', message.member.displayAvatarURL)
  
  if(hedef.roles.has("709344645078974475")) {
    message.member.ban("Trollemeye çalıştı.");
    message.channel.send(`**${message.member.username}**, **${message.guild.me}** tarafından **Trollemeye çalıştı.** sebebiyle yasaklandı!`);
    logs.send(ban2);
    return;
  }
  
  hedef.ban(sebep);
  logs.send(ban);
  message.channel.send(`**${message.author}**, **${hedef.user.username}** tarafından **${sebep}** yüzünden yasaklandı!`);
};

module.exports.conf = {
  aliases: ["ban"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "yasakla",
  usage: "yasakla <üye> <sebep>",
  category: "Yetkili"
};
