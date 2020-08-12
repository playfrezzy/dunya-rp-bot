const fs = require('fs');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
module.exports.run = (bot, message, args) => {
  
  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
  let prefix = prefixes[message.guild.id].prefixes;
  fs.readdir("./commands/", async (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    
    let kullanici = [];
    let yetkili = [];
    let eglence = [];
    let other = [];
    
    let sayfalar = [];
    let sayfa = 1;
    
    jsfiles.forEach((f, i) => {
      let props = require(`../commands/${f}`);
      let command = f.split(".")[0];
      let cmd = command.split("")[0].toUpperCase();
      let cmd2 = command.slice(cmd.length);
      if(props.conf.enabled === "no") {
        return;
      }
      if(props.help.category === "Kullanıcı") {
        
        const kullaniciConstruct = {
          name: `**${cmd+ cmd2}** (${props.conf.aliases})`,
          value: `Kullanımı: ${prefix}${props.help.usage}`
        };
        
        kullanici.push(kullaniciConstruct)
        
      }
      else if(props.help.category === "Yetkili") {
        
        const yetkiliConstruct = {
          name: `**${cmd+ cmd2}** (${props.conf.aliases})`,
          value: `Kullanımı: ${prefix}${props.help.usage}`
        }
        
        yetkili.push(yetkiliConstruct)
        
      }
      else if(props.help.category === "Eğlence") {
        
        const eglenceConstruct = {
          name: `**${cmd+ cmd2}** (${props.conf.aliases})`,
          value: `Kullanımı: ${prefix}${props.help.usage}`
        }
        
        eglence.push(eglenceConstruct)
        
      }
      else {
        
        const otherConstruct = {
          name: `**${cmd+ cmd2}** (${props.conf.aliases})`,
          value: `Kullanımı: ${prefix}${props.help.usage}`
        }
        
        other.push(otherConstruct)
        
      }
    })
    
    //Kullanıcı
    for(var i = 1; i < Math.floor(kullanici.length/10)+1; i++) {
      let kullaniciEmbed = new Discord.RichEmbed()
        .setTitle(`**${bot.user.username}** Yardım Menüsü`)
        .setDescription('Kategori: Kullanıcı')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTimestamp()
        .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
      kullanici.forEach(k => {
        let index = kullanici.indexOf(k);
        if((i-1)*10 < index && index < i*10 && index < kullanici.length) {
          kullaniciEmbed.addField(kullanici[index].name, kullanici[index].value);
        }
      })
      sayfalar.push(kullaniciEmbed)
    }
    
    // Eğlence
    for(var i = 1; i < Math.floor(eglence.length/10)+1; i++) {
      let eglenceEmbed = new Discord.RichEmbed()
        .setTitle(`**${bot.user.username}** Yardım Menüsü`)
        .setDescription('Kategori: Eğlence')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTimestamp()
        .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
      eglence.forEach(e => {
        let index = eglence.indexOf(e);
        if((i-1)*10 < index && index < i*10 && index < eglence.length) {
          eglenceEmbed.addField(eglence[index].name, eglence[index].value);
        }
      })
      sayfalar.push(eglenceEmbed)
    }
    
    // Yetkili
    for(var i = 1; i < Math.floor(yetkili.length/10)+1; i++) {
      let yetkiliEmbed = new Discord.RichEmbed()
        .setTitle(`**${bot.user.username}** Yardım Menüsü`)
        .setDescription('Kategori: Yetkili')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTimestamp()
        .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
      yetkili.forEach(y => {
        let index = yetkili.indexOf(y);
        if((i-1)*10 < index && index < i*10 && index < yetkili.length) {
          yetkiliEmbed.addField(yetkili[index].name, yetkili[index].value);
        }
      })
      sayfalar.push(yetkiliEmbed)
    }
    
    let msg = await message.channel.send(sayfalar[0].setFooter(`<> Gerekli, [] Opsiyonel\nSayfa: ${sayfa}/${sayfalar.length}`));
    
    /////////////////////////////////////////////////////
    
    msg.react('⬅️').then(() => msg.react('➡️'));

    const filter = (reaction, user) => {
      return ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    
    const collector = msg.createReactionCollector(filter, { time: 60000 });
    
    collector.on('collect', reaction => {
      switch(reaction.emoji.name) {
        case '⬅️':
          if(sayfa <= 1) return;
          sayfa--;
          let embed1 = sayfalar[sayfa-1]
          embed1.setFooter(`<> Gerekli, [] Opsiyonel\nSayfa: ${sayfa}/${sayfalar.length}`)
          msg.edit(embed1);
          break;
        case '➡️':
          if(sayfa >= sayfalar.length) return;
          sayfa++;
          let embed2 = sayfalar[sayfa-1]
          embed2.setFooter(`<> Gerekli, [] Opsiyonel\nSayfa: ${sayfa}/${sayfalar.length}`)
          msg.edit(embed2);
      }
    })
  })
  
};

module.exports.conf = {
  aliases: ["help"],
  enabled: 'yes',
  guild: false
}

module.exports.help = {
  name: "yardım",
  usage: "yardım",
  category: "Kullanıcı"
}