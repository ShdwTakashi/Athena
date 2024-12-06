module.exports = (client) => {
    const { ActivityType } = require("discord.js");
    const pogger = require("pogger");
  
    pogger.success(
      " ",
      `
  
     █████ ▓█████ ███▄    █ ▄▄▄█████▓
   ▓██     ▓█   ▀ ██ ▀█   █ ▓  ██▒ ▓▒
   ▒████   ▒███  ▓██  ▀█ ██▒▒ ▓██░ ▒░
   ░▓█▒    ▒▓█  ▄▓██▒  ▐▌██▒░ ▓██▓ ░ 
  ▒░▒█░   ▒░▒████▒██░   ▓██░  ▒██▒ ░ 
  ░ ▒ ░   ░░░ ▒░ ░ ▒░   ▒ ▒   ▒ ░░   
  ░ ░     ░ ░ ░  ░ ░░   ░ ▒░    ░    
    ░ ░       ░     ░   ░ ░   ░      
  ░       ░   ░           ░          
                              
       
                                    
                                    
  
  
      `,
    );
    client.user.setPresence({
      activities: [
        {
          name: "Discord.js v14",
          type: ActivityType.Playing,
          // url: "URL HERE",
        },
      ],
      status: "online",
    });
  };