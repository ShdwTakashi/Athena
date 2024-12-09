const { Client, GatewayIntentBits, IntentsBitField } = require('discord.js');
// const { CommandHandler } = require('djs-commander');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');
const pogger = require('pogger');
require('dotenv').config();

const token = process.env.token;
const ALLOWED_SERVER_IDS = ['1195005537734119516', '1270894006896951326']; // Allowed Server IDs

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildIntegrations,
    
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

// Initialize commands map
client.commands = new Map();

// Import commands dynamically
const fs = require('node:fs');
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'run' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "run" property.`);
  }
}

// Log commands to verify they are loaded
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log('Loaded commands:', Array.from(client.commands.keys()));
    require('./events/Ready/Activity')(client); // Import and execute Activity.js
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  // Check if the interaction originated from the allowed servers
  if (!ALLOWED_SERVER_IDS.includes(interaction.guild.id)) {
    console.log("This is a Cloud one Bot only! Refrain from any new modification's. If you're a Developer of Cloud One or Are apart of a project, Please proceed.");
    return interaction.reply({ content: 'This is a Cloud One bot only! Refrain from any new modifications. If you\'re a developer of Cloud One or are part of a project, please proceed.', ephemeral: true });
  }

  const command = client.commands.get(interaction.commandName);
  
  if (!command) {
    console.error(`No command found for ${interaction.commandName}`);
    return interaction.reply({ content: 'Unknown command.', ephemeral: true });
  }

  try {
    await command.run(interaction);
  } catch (error) {
    console.error('Interaction Error:', error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error executing the command.', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error executing the command.', ephemeral: true });
    }
  }
});

client.login(token).catch(error => {
  pogger.error('[CRASH]', 'Failed to login: ' + error);
});

// ShdwTakahi was here lol