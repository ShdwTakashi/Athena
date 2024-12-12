 const { Events } = require('discord.js');
 
 module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    // This assumes you have a way to store and retrieve paired IDs.
    // Replace this with your actual logic.
    const pairedIDs = {}; 

    if (message.channel.type === 0 && !message.author.bot) {
      const clientID = message.content; 
      pairedIDs[message.author.id] = clientID;
      
      await message.author.send('Hello World');
    } catch (error) {
        console.error(`Failed to send DM to ${message.author.tag}:`, error);
    }
  },
 };

console.log('AuthDM Automation Loaded');+  
