const ayarlar = require('../ayarlar.json');
const Discord = require('discord.js');
module.exports.run = async (bot, message, args, functions) => {


  let logs = message.guild.channels.find('name', ayarlar.channels.logs);
  let user = message.mentions.members.first();
  let role = message.mentions.roles.first();

  if (!message.member.hasPermission('MANAGE_ROLES')) return;
  if (!role) {

    let roleString = args.slice(1).join(" ");
    let role2 = functions.similarity_role(message, roleString);

    if(role2.comparePositionTo(message.member.highestRole) >= 0) return message.reply("Alacağın Rol senden üstün ya da eşit!");

    user.removeRole(role2)
    message.channel.send(`Başarıyla **${user}** kişisinden **${role2}** rolü alındı!`)
    const embed1 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(user.user.avatarURL)
      .setTitle('Rol Alma')
      .addField('Rolü Alınan Kişi: ', `${user.user.username}, IDsi: ${user.user.id}`)
      .addField('Rolü Alan Kişi: ', `${message.author.username}, IDsi: ${message.author.id}`)
      .addField('Rol Alınan Zamanı: ', message.createdAt)
      .addField('Rol Alınan Kanal: ', message.channel)
      .addField('Alınan Rol:', `${role2}, IDsi: ${role2.id}`)
      .setFooter('Rolü Alınan Kişinin Bilgileri', user.user.displayAvatarURL);
    logs.send(embed1);
  } else {
    if(role.comparePositionTo(message.member.highestRole) >= 0) return message.reply("Alacağın Rol senden üstün ya da eşit!");
    user.removeRole(role)
    message.channel.send(`Başarıyla **${user}** kişisinden **${role}** rolü alındı!`)
    const embed2 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(user.user.avatarURL)
      .setTitle('Rol Alma')
      .addField('Rolü Alınan Kişi: ', `<@${user.user.id}>, IDsi: ${user.user.id}`)
      .addField('Rolü Alan Kişi: ', `<@${message.author.id}>, IDsi: ${message.author.id}`)
      .addField('Rol Alınan Zamanı: ', message.createdAt)
      .addField('Rol Alınan Kanal: ', `<@${message.channel.id}>, IDsi: ${message.channel.id}`)
      .addField('Alınan Rol:', `${role}, IDsi: ${role.id}`)
      .setFooter('Rolü Alınan Kişinin Bilgileri', user.user.displayAvatarURL);
    logs.send(embed2);
  }
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "rolal",
  usage: "rolal <üye> <rol>",
  category: "Yetkili"
}
