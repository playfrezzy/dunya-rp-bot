var Jimp = require("jimp");
const Discord = require('discord.js');
module.exports.run = (bot, message, args) => {
    let img = Jimp.read(message.mentions.users.first() ? message.mentions.users.first().avatarURL : message.author.avatarURL),
    moldura = Jimp.read("../Fotolar/Saydam Logo.png");
    Promise.all([img, moldura]).then(imgs => {
    let moldura = imgs[1],
        img    = imgs[0];
    moldura.resize(670, 476);  
    img.resize(800, 800)
    img.composite(moldura, 60, 330).getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        if (!err) 
        message.channel.send(new Discord.Attachment(buffer));        
    });
});
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: false
}

module.exports.help = {
  name: "pp",
  usage: "pp [kişi]",
  category: "Kullanıcı"
}