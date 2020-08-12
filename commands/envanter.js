const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
module.exports.run = async (bot, message, args) => {
    let user = message.mentions.users.first() || message.author;
    let embed = new Discord.RichEmbed()
        .setAuthor(user.username, user.avatarURL)
        .setTimestamp()
        .setFooter('Sayfa 1/1')
        .setThumbnail("https://cdn.glitch.com/3d7c98a7-38ef-4cd6-8e01-f217fcfd1dde%2Fd%C3%BCnya-rp-bot.gif?v=1589291857266")
    fs.readdir("./items/", (err, files) => {
      let jsonfiles = files.filter(f => f.split(".").pop() == "json");
      jsonfiles.forEach(f => {
        let urun = JSON.parse(fs.readFileSync(`./items/${f}`, "utf8"));
        let esya = db.fetch(`inventory_${user.id}_${f.split(".")[0]}`);
        if(esya == null) esya = 0;
        if(esya > 0) {
          embed.addField("​ ​", `${urun.ad}: ${esya} adet`)
        }
      })
      message.channel.send(embed);
    })
};

module.exports.conf = {
    aliases: ["inventory"],
    enabled: 'yes',
    guild: true
}

module.exports.help = {
    name: "envanter",
    usage: "envanter [kişi]",
    category: "Kullanıcı"
}