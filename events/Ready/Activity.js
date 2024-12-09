module.exports = (client) => {
  const { ActivityType } = require("discord.js");

  
  client.user.setPresence({
    activities: [{
      name: "Discord.js v14",
      type: ActivityType.Playing,
      // url: "URL HERE"
    }],
    status: "online",
  });
};