const Discord = require('discord.js');
const Jimp = require('jimp');

module.exports.run = (bot, message, args) => {
  // Jimp.read("https://cdn.glitch.com/53b0ce8e-c068-4ee2-992c-fae66c836038%2Findir.png?v=1590748481239")
  //   .then(image => {
  //     Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font1 => {
  //       image.print(font1, 40, 95, args.join(" "))
  //       Jimp.loadFont(Jimp.FONT_SANS_14_BLACK).then(font2 => {
  //         image.print(font2, 110, 58, message.member.nickname ? message.member.nickname : message.member.user.username)
  //         image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
  //         if(err) throw(err);
  //           message.channel.send(new Discord.Attachment(buffer));
  //         })
  //       })
  //     })
  //   })
  //   .catch(err => {
  //     if(err) throw(err);
  //   })
};  

module.exports.conf = {
  aliases: [],
  enabled: 'no',
  guild: true
};

module.exports.help = {
  name: 'twitter', 
  usage: 'twitter <mesaj>',
  category: "Kullanıcı"
};