const Discord = require('discord.js');
const db = require('quick.db');
var haberler = new db.table('haberler');
module.exports.run = async (bot, message, args) => {
  
  haberler.all().forEach(h => {
    if(Date.now() - h.ID >= 86400000) haberler.delete(`${h.ID}`);
  })
  
  for(var i = 0; i < 3; i++) {
    let random = Math.floor(Math.random() * haberler.all().length);
    let embed = new Discord.RichEmbed()
      .setTitle(haberler.fetch(`${haberler.all()[random].ID}.title`))
      .setDescription(haberler.fetch(`${haberler.all()[random].ID}.description`))
      .setTimestamp(haberler.fetch(`${haberler.all()[random].ID}.timestamp`))
      .setColor(haberler.fetch(`${haberler.all()[random].ID}.color`))
      // .addField(haberler.fetch(`${haberler.all()[random].ID}.fields`)[0].name, haberler.fetch(`${haberler.all()[random].ID}.fields`)[0].value)
    console.log(haberler.fetch(`${haberler.all()[random].ID}`))
    message.channel.send(embed)
  }
  
};

module.exports.conf = {
  aliases: ["news"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "haberler",
  usage: "haberler",
  category: "Yetkili"
}