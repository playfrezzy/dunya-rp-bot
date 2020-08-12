const {bot} = require('../server');
const ayarlar = require('../ayarlar.json');
const fs = require('fs');
const ms = require('ms');
let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
bot.login(ayarlar.token);
bot.on('ready', async function() {
  console.log(`Bot, ${bot.user.username} ismi ile hazır!`);
  bot.user.setStatus(ayarlar.activity.status);
  let states = [
    `Evde Kal!`
    // `+yardım`,
    // `${bot.users.size} kişi ile birlikte!`,
    // `#evdekaltürkiye`
  ]
  
  let guild = bot.guilds.find(g => g.id === "709008979824738384");
  let member = guild.members.find(m => m.id === "184691558409437184");
  
  setInterval(function() {
    let state = states[Math.floor(Math.random() * states.length)];
    if (ayarlar.activity.mode == 0) {
      bot.user.setActivity(state, {type: 'PLAYING'})
    } else
      if (ayarlar.activity.mode == 2) {
        bot.user.setActivity(state, {type: 'LISTENING'})
      } else
        if (ayarlar.activity.mode == 3) {
          bot.user.setActivity(state, {type: 'WATCHING'})
        } 
  }, 5000)
});