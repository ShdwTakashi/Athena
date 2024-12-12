const {
    SlashCommandBuilder,
  } = require("discord.js");

  module.exports = {
    data: new SlashCommandBuilder()
      .setName("observe")
      .setDescription("What the bot has the ability to do"),
  
    async run(interaction) {
      const channel = interaction.channel;

      const permissions = channel.permissionsFor(interaction.guild.members.me);

      const permissionList = permissions.toArray().filter(perm => permissions.has(perm));

      let permissionString = `In channel ${channel.name}, I have the following permissions:\n`;
      if (permissionList.length > 0) {
        permissionString += permissionList.join(', ');
      } else {
        permissionString += 'None';
      }

      await interaction.reply(permissionString);
    },
  };