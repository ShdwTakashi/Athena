const { Client, GatewayIntentBits, IntentsBitField } = require('discord.js');
const { CommandHandler } = require('djs-commander');
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

// Initialize the CommandHandler from djs-commander
new CommandHandler({
  client,
  commandsPath: path.join(__dirname, 'commands'),
  eventsPath: path.join(__dirname, 'events'),
  validationsPath: path.join(__dirname, 'validations'),
  testServer: '1270894006896951326',
});

// Log commands to verify they are loaded
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log('Loaded commands:', Array.from(client.commands.keys()));
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