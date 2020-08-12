const Discord = require('discord.js');
const db = require('quick.db');
var haberler = new db.table('haberler');
const ayarlar = require('../ayarlar.json');
module.exports.run = async (bot, message, args, functions) => {

  if(!message.member.roles.has("709009556499333141") && !message.member.roles.has("709009569095090217") && !message.member.roles.has("709009568490848316")) return message.reply("Bunun için yetkin yok!");

  let name = args.join(" ");
  let embed = new Discord.RichEmbed()
    .setTitle(name)
    .setTimestamp()
    .setAuthor(message.member.nickname ? message.member.nickname : message.author.username, message.author.avatarURL)
    .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
  let msg = await message.channel.send("Lütfen bu haberin konusunu ve içeriğini ve etiketlenecek kişileri sırasıyla giriniz!(120 Saniye Süreniz Var)");
  let filter = m => m.author.id === message.author.id && m.channel.id === message.channel.id;
  const collector = msg.channel.createMessageCollector(filter, { max: 2, time: 120000 });

  const collected = [];

  collector.on('collect', m => {
    if(m.length > 1024) return message.reply("Lütfen 1024 harften kısa giriniz!");
    collected.push(m.content)
  })

  collector.on('end', c => {
    if(c.size < 2) return message.reply("Süre doldu!");
    embed.setDescription(`Konu: ${collected[0]}`)
    embed.addField("Haber İçeriği", collected[1])
    message.channel.send(embed)

    haberler.set(`${Date.now()}`, embed)

    if(message.member.roles.has("709009569095090217") || message.member.roles.has("709009568490848316")) {
        let newsChannel = message.guild.channels.find(c => c.id === ayarlar.channels.cnn);

        functions.hook(newsChannel, "CNN News", name, `Konu: ${collected[0]}\n\nİçerik: ${collected[1]}`, "cc1417", "https://cdn.glitch.com/53b0ce8e-c068-4ee2-992c-fae66c836038%2Fccn-news.png?v=1592051373835");
    }

    else if(message.member.roles.has("709009556499333141")) {
      let newsChannel = message.guild.channels.find(c => c.id === ayarlar.channels.bbc);

      functions.hook(newsChannel, "BBC News", name, `Konu: ${collected[0]}\n\nİçerik: ${collected[1]}`, "bb1819", "https://cdn.glitch.com/53b0ce8e-c068-4ee2-992c-fae66c836038%2Fbbc-news.jpg?v=1591447569926");
    }
  })

};

module.exports.conf = {
  aliases: ["haberyap", "haber-yap"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "haber",
  usage: "haber <Başlık>",
  category: "Yetkili"
}
