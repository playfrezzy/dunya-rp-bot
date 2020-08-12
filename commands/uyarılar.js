const Discord = require('discord.js');
const fs = require('fs');
const ms = require('ms');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
var uyari = new db.table('uyari');
module.exports.run = async (bot, message, args) => {
  let wUser = message.guild.member(message.mentions.users.first());
  if(!wUser) return message.reply(`Lütfen birisini etiketleyiniz.\nKullanım: +${this.help.usage}`);

  var i = [];
  for(var d in uyari.all().find(m => m.ID === wUser.id).data) {
    i.push({ "zaman": uyari.fetch(`${wUser.id}.${d}.zaman`), "sebep": uyari.fetch(`${wUser.id}.${d}.sebep`) });
  }

  let embed = new Discord.RichEmbed()
    .setTitle("Uyarılar")
    .setDescription(`**${wUser}** Kişisinin Uyarı Sayısı: ${i.length}`)
    .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
    .setThumbnail(wUser.user.avatarURL)

  i.forEach(u => {
    embed.addField(u.zaman, u.sebep)
  })

};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "uyarılar",
  usage: "uyarılar <kişi>",
  category: "Kullanıcı"
}
