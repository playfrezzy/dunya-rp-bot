const fs = require('fs');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const moment = require('moment');
const parseMs = require('parse-ms');
const db = require('quick.db');
var maas = new db.table('maas');
var myP = new db.table('myProjects');
var uyari = new db.table('uyari');
module.exports.run = (bot, message, args) => {

  if(message.author.id != ayarlar.sahip1) return message.reply("Sen bot sahibi değilsin!");

  let wUser = message.guild.members.find(m => m.id == "455470403779952680");
  let country = message.mentions.roles.first();
  console.log(uyari.all())

};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: false
}

module.exports.help = {
  name: "deneme",
  usage: "deneme",
  category: "Kullanıcı"
}
