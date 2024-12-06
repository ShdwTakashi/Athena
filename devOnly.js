module.exports = (interaction, commandObj) => {
    const { devIds } = require('../config');
    if (commandObj.devOnly) {
      if (interaction.member.id !== devIds[0] && interaction.member.id !== devIds[1]){
        interaction.reply('This command is for developers only.');
        return true; // This must be added to stop the command from being executed.
      }
    }
  };