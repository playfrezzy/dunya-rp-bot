const Discord = require('discord.js');
const fs = require('fs');
const ms = require('ms');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const moment = require('moment');
var uyari = new db.table('uyari');
module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("KICK_MEMBERS") && !message.member.roles.has("719631541575090250")) return message.reply('Yetkin yok!');
  let reason = args.join(" ").slice(22);
  if(!reason) return message.reply('Lütfen bir sebep belirt!\nKullanım: +uyarı <kişi> <sebep>');
  let wUser = message.guild.member(message.mentions.users.first());
  if(!wUser) return message.reply('Lütfen birini etiketle!');
  if(wUser.id === message.author.id) return message.reply('Kendini uyaramazsın 😀');
  let logs = message.guild.channels.find('name', ayarlar.channels.logs);
  let uyarı = message.guild.channels.find('id', ayarlar.channels.uyarı);
  let muterole = message.guild.roles.find('id', ayarlar.roles.muted);
  let yz = message.guild.roles.find('id', ayarlar.roles.yapayzeka);
  if(wUser.id === message.guild.me.id) return message.reply('Botları uyaramazsın 😀');
  if(wUser.id === "292657706173595648") message.member.ban("mal ya");
  if(wUser.highestRole.comparePositionTo(message.member.highestRole) >= 0) return message.reply("Uyaracağın kişi senden üstün ya da eşit!");

  let zaman = moment().toISOString();

  uyari.set(`${wUser.id}.${zaman}.zaman`, zaman.substring(0, 10))
  uyari.set(`${wUser.id}.${zaman}.sebep`, reason)

  let logEmbed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail(wUser.user.avatarURL)
    .setTitle('Uyarma')
    .addField('Uyarılan Kişi: ', `${wUser.user.username}, IDsi: ${wUser.user.id}`)
    .addField('Uyaran Kişi: ', `${message.author.username}, IDsi: ${message.author.id}`)
    //.addField('Uyarılma Sayısı: ', warns[wUser.id].warns)
    .addField('Uyarıldığı Zamanı: ', message.createdAt)
    .addField('Uyarıldığı Kanal: ', message.channel)
    .addField('Uyarılma Sebebi: ', reason)
    .setFooter('Uyarılan Kişinin Bilgileri', wUser.user.displayAvatarURL);

  message.channel.send(`✅ <@${wUser.id}> uyarıldı!`)
  logs.send(logEmbed)

  let warnEmbed = new Discord.RichEmbed()
    .setColor('#B22222')
    .addField(`Kişi`, `**${wUser.user.username}**`, true)
    .addField(`Sebep`, `**${reason}**`,true)
    .setThumbnail("https://cdn.glitch.com/3d7c98a7-38ef-4cd6-8e01-f217fcfd1dde%2Fwarning.gif?v=1589209213931")
    .setTimestamp()
    .setFooter("​", wUser.user.displayAvatarURL)
    .setTitle("**Bir Kişi Uyarıldı**")

  /*if(warns[wUser.id].warns == 5) {
    let mutetime = "15m";
    await(wUser.addRole(muterole.id));
    warnEmbed.addField(`${wUser.user.username}`, `3 kez uyarıldığı için 15 dakikalığına susturuldu.`)
    setTimeout(function(){
      wUser.removeRole(muterole.id)
      uyarı.send(`<@${wUser.id}>\'nın susturulma süresi bitti.`)
    }, ms(mutetime))
  }
  else if(warns[wUser.id].warns == 10) {
    let mutetime = "30m";
    await(wUser.addRole(muterole.id));
    warnEmbed.addField(`${wUser.user.username}`, `6 kez uyarıldığı için 30 dakikalığına susturuldu.`)
    setTimeout(function(){
      wUser.removeRole(muterole.id)
      uyarı.send(`<@${wUser.id}>\'nın susturulma süresi bitti.`)
    }, ms(mutetime))
  }
  else if(warns[wUser.id].warns == 15) {
    message.guild.member(wUser).kick('9 Kez uyarıldığın için atıldın!');
    warnEmbed.addField(`${wUser.user.username}`, `9 kez uyarıldığı için atıldı!`)
  }
  else if(warns[wUser.id].warns == 20) {
    message.guild.member(wUser).ban('12 Kez uyarıldığın için yasaklandın!');
    warnEmbed.addField(`${wUser.user.username}`, `12 kez uyarıldığı için yasaklandı!`)
  }*/
  uyarı.send(warnEmbed)

};

module.exports.conf = {
  aliases: ["warn"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "uyarı",
  usage: "uyarı <kişi>",
  category: "Yetkili"
}
