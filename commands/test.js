const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('테스트')
    .setDescription('테스트용 명령어')
    .addStringOption((option) =>
      option.setName('input').setDescription('Enter a string')
    )
    .addIntegerOption((option) =>
      option.setName('int').setDescription('Enter an integer')
    )
    .addNumberOption((option) =>
      option.setName('num').setDescription('Enter a number')
    )
    .addBooleanOption((option) =>
      option.setName('choice').setDescription('Select a boolean')
    )
    .addUserOption((option) =>
      option.setName('target').setDescription('Select a user')
    )
    .addChannelOption((option) =>
      option.setName('destination').setDescription('Select a channel')
    )
    .addRoleOption((option) =>
      option.setName('muted').setDescription('Select a role')
    )
    .addMentionableOption((option) =>
      option.setName('mentionable').setDescription('Mention something')
    ),
  // .addChoices([
  //   ['Funny', 'gif_funny'],
  //   ['Meme', 'gif_meme'],
  //   ['Movie', 'gif_movie'],
  // ])
  async execute(interaction) {
    const string = interaction.options.getString('input');
    await interaction.reply(string);
    await interaction.followUp({
      content: '팔로우업 테스트 성공!',
      ephemeral: true,
    });
  },
};
