const { RichEmbed } = require('discord.js');
const fetch = require('snekfetch');
const newsAPI = process.env.NEWS_API;
module.exports.run = async (bot, message, args) => {
  
  /*fetch.get("http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=6d1691fd2e4d4b1aa694a32e6b34ad14").then(r => {
    let body = r.body;
    console.log(body.articles)
  })*/
  
  // powered by NewsAPI.org
  try {
    const response = await fetch.get(
      `http://newsapi.org/v2/top-headlines?country=tr&apiKey=${newsAPI}`
    );
    const articleArr = response.body.articles;
    
    let processArticle = article => {
      const embed = new RichEmbed()
        .setColor('#FF4F00')
        .setTitle(article.title)
        .setURL(article.url)
        .setAuthor(article.author)
        .setDescription(article.description)
        .setThumbnail(article.urlToImage)
        .setTimestamp(article.publishedAt)
        .setFooter('powered by NewsAPI.org');
      return embed;
    };
    var i = 0;
    async function processArray(array) {
      for(var i = 0; i < 3; i++) {
        let random = Math.floor(Math.random() * array.length);
        const msg = await processArticle(array[random])
        message.channel.send(msg);
      }
    }
    await processArray(articleArr);
  } catch (e) {
    message.channel.send('Something failed along the way');
    return console.error(e);
  }
};

module.exports.conf = {
  aliases: ["ooc-haberler"],
  enabled: 'yes',
  guild: true
}

module.exports.help = {
  name: "oochaberler",
  usage: "haberler",
  category: "Eğlence"
}