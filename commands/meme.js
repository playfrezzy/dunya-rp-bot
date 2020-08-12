const randomPuppy = require("random-puppy");

module.exports.run = async (bot, message, args) => {
  let reddit = [
    "burdurland",
    "TurkeyJerky",
    "ShitPostTC",
    "KGBTR",
    "BGY",
    "TarihselMizah",
    "TarihMemes",
    "AzerbaijanJerky",
    "amci",
    "hayirlicumalar",
    "tamamahbapengelli",
    "ZargoryanGalaksisi"
  ];

  let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

  randomPuppy(subreddit)
    .then(async url => {
      await message.channel.send({
          files: [
            {
              attachment: url,
              name: `${subreddit}.png`
            }
          ]
        });
    }).catch(err => {
    console.error(err);
    message.channel.send("Bir hata oluştu, tekrar deneyiniz.");
  })
};

module.exports.conf = {
  aliases: ["memes", "gırgır"],
  enabled: "yes",
  guild: false
};

module.exports.help = {
  name: "meme",
  usage: "meme",
  category: "Eğlence"
};
