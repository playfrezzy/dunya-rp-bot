const Discord = require("discord.js");
const bot = new Discord.Client();
const db = require("quick.db");
const ms = require("ms");
const fs = require("fs");
var xp = new db.table('xp');

const ayarlar = require("./ayarlar.json");

var logs = ayarlar.channels.logs;
var sınır1 = ayarlar.channels.sınır;

require("./functions")(bot);

//Command Handler
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.haberler = new Map();

let agirkufur = ["oç", "orospu", "anan", "amına", "piç"];

let kufur = ["amq", "amk", "sik"];

bot.on("message", async message => {
  
  let embed = new Discord.RichEmbed()
  .setThumbnail("https://cdn.glitch.com/3d7c98a7-38ef-4cd6-8e01-f217fcfd1dde%2FHEYYAT.png?v=1589118965429");
  
  let curxp = await xp.fetch(`${message.author.id}.xp`);
  if (curxp == null) curxp = 0;

  let curlvl = await xp.fetch(`${message.author.id}.level`);
  if (curlvl == null) curlvl = 0;
  
  let randomxp = Math.floor(Math.random() * message.content.length * 2);
  xp.add(`${message.author.id}.xp`, randomxp);
  
  let nxtlvl = curlvl * 300 * curlvl;
  
  if(nxtlvl <= curxp) xp.add(`${message.author.id}.level`, 1);
});

bot.on("message", async message => {
  if (message.content.toLowerCase().includes(agirkufur)) {
    const embed = new Discord.RichEmbed()
      .setColor(
        message.member.displayHexColor === "#000000"
          ? "#ffffff"
          : message.member.displayHexColor
      )
      .setTimestamp()
      .setTitle("Küfür")
      .addField("Küfür Edilen Mesaj", message)
      .setAuthor(message.author.username, message.author.displayAvatarURL);
    logs.send(embed);
  }

  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));

  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: ayarlar.prefix
    };
  }

  let prefix = prefixes[message.guild.id].prefixes;

  let kullanıcı = message.mentions.users.first() || message.author;
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`);
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`);
  let sebep = afkkullanıcı;

  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;

  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(
        `✔️ **${message.author.tag}** adlı kullanıcı artık AFK degil...`
      );
      db.delete(`afk_${message.author.id}`);
    }
    if (afkkullanıcı) {
      message.delete();
      message.channel.send(
        `:x: **${kullanıcı.tag}** şu anda AFK.\n Sebep : **${sebep}**`
      );
      return;
    }
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(
        `✔️ **${message.author.tag}** adlı kullanıcı artık AFK değil.`
      );
      db.delete(`afk_${message.author.id}`);
    }
  }
});

module.exports = {
  bot: bot
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.

// our default array of dreams
// const dreams = [
//   "Find and count some sheep",
//   "Climb a really tall mountain",
//   "Wash the dishes"
// ];

// // make all the files in 'public' available
// // https://expressjs.com/en/starter/static-files.html
// app.use(express.static("public"));

// // https://expressjs.com/en/starter/basic-routing.html
// app.get("/", (request, response) => {
//   response.sendFile(__dirname + "/views/index.html");
//   console.log("Botu açık tutmak için yeniden bağlandım!");
//   response.sendStatus(200);
// });

// // send the default array of dreams to the webpage
// app.get("/dreams", (request, response) => {
//   // express helps us take JS objects and send them as JSON
//   response.json(dreams);
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////

  // "scripts": {
  //   "start": "node server.js"
  // },
