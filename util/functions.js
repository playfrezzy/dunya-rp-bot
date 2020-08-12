module.exports = {
  getMention: function(message, args, boolean) {
    if (!message.mentions) return;
    let mentions = [];
    for (var i = 0; i < args.length; i++) {
      if (args[i].startsWith("<@") && args[i].endsWith(">")) {
        mentions.push(args[i]);
      }
    }
    if (boolean == true) return mentions.map(mention => mention.slice(3, -1));
    else return mentions;
  },

  getIDMention: function(mention) {
    if (!mention) return;
    return mention.slice(3, -1);
  },

  similarity_member: function(message, string) {
    const sm = require("string-similarity");

    if (!string) return;

    let members = [];
    let indexes = [];

    message.guild.members.forEach(function(member) {
      members.push(member.user.username);
      indexes.push(member.id);
    });

    let match = sm.findBestMatch(string, members);
    let username = match.bestMatch.target;
    let member = message.guild.members.get(indexes[members.indexOf(username)]);

    return member;
  },

  similarity_role: function(message, string) {
    const sm = require("string-similarity");

    if (!string) return;

    let roles = [];
    let indexes = [];

    message.guild.roles.forEach(function(role) {
      roles.push(role.name);
      indexes.push(role.id);
    });

    let match = sm.findBestMatch(string, roles);
    let name = match.bestMatch.target;
    let role = message.guild.roles.get(indexes[roles.indexOf(name)]);

    return role;
  },

  hook: function(channel, title, message1, message2, color, avatar) {
    const Discord = require("discord.js");
    // This function uses quite a few options. The last 2 are optional.

    // Reassign default parameters - If any are blank.
    if (!channel) return;
    if (!title) return;
    if (!message1) return;
    if (!message2) return;
    if (!color) color = "d9a744"; // This is an optional variable. Therefore the default HEX color will be whatever you post there. Mine will be d9a744
    if (!avatar)
      avatar =
        "https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png"; // This is also an optional variable, you can change the default to any icon.

    // We want to remove spaces from color & url, since they might have it on the sides.
    color = color.replace(/\s/g, "");
    avatar = avatar.replace(/\s/g, "");

    // This is the start of creating the webhook
    channel
      .fetchWebhooks() // This gets the webhooks in the channel
      .then(webhook => {
        // Fetches the webhook we will use for each hook
        let foundHook = webhook.find("name", "Webhook"); // You can rename 'Webhook' to the name of your bot if you like, people will see if under the webhooks tab of the channel.

        // This runs if the webhook is not found.
        if (!foundHook) {
          channel
            .createWebhook(
              "Webhook",
              "https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png"
            ) // Make sure this is the same thing for when you search for the webhook. The png image will be the default image seen under the channel. Change it to whatever you want.
            .then(webhook => {
              // Finally send the webhook
              webhook
                .send("", {
                  username: title,
                  avatarURL: avatar,
                  embeds: [
                    {
                      color: parseInt(`0x${color}`),
                      description: message2,
                      title: message1,
                      timestamp: Date.now()
                    }
                  ]
                })
                .catch(error => {
                  // We also want to make sure if an error is found, to report it in chat.
                  console.log(error);
                  return channel.send("Bir hata oluştu!");
                });
            });
        } else {
          // That webhook was only for if it couldn't find the original webhook
          foundHook
            .send("", {
              // This means you can just copy and paste the webhook & catch part.
              username: title,
              avatarURL: avatar,
              embeds: [
                {
                  color: parseInt(`0x${color}`),
                  description: message2,
                  title: message1
                }
              ]
            })
            .catch(error => {
              // We also want to make sure if an error is found, to report it in chat.
              console.log(error);
              return channel.send("Bir hata oluştu!");
            });
        }
      });
  },

  hook_string: function(channel, title, message1, color, avatar) {
    const Discord = require("discord.js");
    // This function uses quite a few options. The last 2 are optional.

    // Reassign default parameters - If any are blank.
    if (!channel) return;
    if (!title) return;
    if (!message1) return;
    if (!color) color = "d9a744"; // This is an optional variable. Therefore the default HEX color will be whatever you post there. Mine will be d9a744
    if (!avatar)
      avatar =
        "https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png"; // This is also an optional variable, you can change the default to any icon.

    // We want to remove spaces from color & url, since they might have it on the sides.
    color = color.replace(/\s/g, "");
    avatar = avatar.replace(/\s/g, "");

    // This is the start of creating the webhook
    channel
      .fetchWebhooks() // This gets the webhooks in the channel
      .then(webhook => {
        // Fetches the webhook we will use for each hook
        let foundHook = webhook.find("name", "Webhook"); // You can rename 'Webhook' to the name of your bot if you like, people will see if under the webhooks tab of the channel.

        // This runs if the webhook is not found.
        if (!foundHook) {
          channel
            .createWebhook(
              "Webhook",
              "https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png"
            ) // Make sure this is the same thing for when you search for the webhook. The png image will be the default image seen under the channel. Change it to whatever you want.
            .then(webhook => {
              // Finally send the webhook
              webhook
                .send(message1, {
                  username: title,
                  avatarURL: avatar
                })
                .catch(error => {
                  // We also want to make sure if an error is found, to report it in chat.
                  console.log(error);
                  return channel.send("Bir hata oluştu!");
                });
            });
        } else {
          // That webhook was only for if it couldn't find the original webhook
          foundHook
            .send(message1, {
              // This means you can just copy and paste the webhook & catch part.
              username: title,
              avatarURL: avatar
            })
            .catch(error => {
              // We also want to make sure if an error is found, to report it in chat.
              console.log(error);
              return channel.send("Bir hata oluştu!");
            });
        }
      });
  }
};
