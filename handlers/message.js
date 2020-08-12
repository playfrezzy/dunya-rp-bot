const {bot} = require('../server');
const ayarlar = require('../ayarlar.json');
const fs = require('fs');
const Discord = require('discord.js');

bot.on('message', async message => {

  if(message.channel.id === "709070484662124606" && message.member.id != message.guild.me.id && message.member.roles.has("709069494705848430")) {
    if(message.content.split("").length >= 100) {
      message.member.removeRole("709069494705848430");
      message.member.addRole("710091474133581865");
    }
    else return message.reply("Lütfen 100 harf veya daha fazla harften oluşan bir tanıtım yapınız!");
  }

  if(message.content.includes("<#718789759819841566>")) {

    //Ülke Değerleri
    let p1 = message.guild.roles.find(role => role.id === "709345162479796246");
    let p2 = message.guild.roles.find(role => role.id === "709344645078974475");

    let country = [];

    let countries = message.guild.roles.filter(role => role.position > p1.position && role.position < p2.position)

    countries.forEach(c => {
      if(message.member.roles.has(c.id)) country.push(c);
    })
    ////////////////

    let embed = new Discord.RichEmbed()
      .setTitle("Haber İstendi")
      .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
      .addField("Kişi",message.member, true)
      .addField("Ülke", country[0], true)
      .addField("Kanal", message.channel, true)
      .addField("Mesaj", message.content)

    let channel = message.guild.channels.find(c => c.id === "724744309139570809");
    channel.send(embed)

  }

  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));

  if(!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: ayarlar.prefix
    };
  }

  let prefix = prefixes[message.guild.id].prefixes;
  let msg = message.content.toUpperCase();
  let args = message.content.slice(prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();
  let command;

  if (!msg.startsWith(prefix.toUpperCase())) return;

  if (bot.commands.has(cmd)) {
    command = bot.commands.get(cmd);
  } else if (bot.aliases.has(cmd)) {
    command = bot.commands.get(bot.aliases.get(cmd));
  } else return;

  console.log(message.author.username + ', şu komutu çalıştırdı: ' + cmd)

  let functions = require('../util/functions.js')

  if (command) command.run(bot, message, args, functions);

});
