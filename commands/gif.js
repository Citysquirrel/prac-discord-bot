const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gif')
    .setDescription('Sends a random gif!')
    .addStringOption(
      (option) =>
        option
          .setName('category')
          .setDescription('The gif category')
          .setRequired(true)
          .addChoice('Funny', 'gif_funny')
      // .addChoices([
      //   ['Funny', 'gif_funny'],
      //   ['Meme', 'gif_meme'],
      //   ['Movie', 'gif_movie'],
      // ])
    ),
  async execute(interaction) {
    await interaction.reply('ㅎㅇ');
  },
};
