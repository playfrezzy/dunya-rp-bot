const {bot} = require('../server');
const Discord = require('discord.js');
const fs = require('fs');
const ayarlar = require('../ayarlar.json');
bot.on('guildMemberAdd', member => {
  let sınır = member.guild.channels.find('id', ayarlar.channels.sınır);
  sınır.send('**<@' + member.user.id + '>** roleplay sunucumuza giriş yaptı!🎉🎉🎉')
  member.addRole("709345162479796246")
  member.addRole("709009559443734588")
  member.addRole("709344509791699014")
  member.addRole("713338525340139570")
  member.addRole("709069494705848430")
  if(member.id === "292657706173595648") {
    member.addRole("709009558089236550")
    member.addRole("709344645078974475")
    //member.ban("Orospu Çocuğu")
  }
  const giris = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('🎉Hoşgeldin!🎉')
    .setTimestamp()
    .addField("😉Merhaba😉", `<@${member.user.id}>! Seninle birlikte ${member.guild.memberCount} kişiyiz.`, true)
    .addField("👫Vatandaşlık Almak👫", "Vatandaş Olabilmek için Kayıt Olman Gerekiyor!.", true)
    .addField('👥Aile Ortamı gibi👥', "Kendini Aile Ortamında Hissedebilirsin, Buradaki Oyuncular Çok Sıcakkanlıdır.", true)
  member.send(giris)
})