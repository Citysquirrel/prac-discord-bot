const { SlashCommandBuilder } = require('@discordjs/builders');
const Youtube = require('youtube-node');
const youtube = new Youtube();
const { youtube_key } = require('../config.json');
youtube.setKey(youtube_key);

const ytdl = require('discord-ytdl-core');
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} = require('@discordjs/voice');
// const { join } = require('path');
// const player = createAudioPlayer();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('음악')
    .setDescription('사용법: /음악 (검색어 or 유튜브 주소)')
    .addStringOption((option) =>
      option
        .setName('검색')
        .setDescription('검색어나 유튜브 주소를 적어줘요!')
        .setRequired(true)
    ),
  async execute(interaction) {
    let keyword = interaction.options._hoistedOptions[0].value;
    let url = '';

    // 검색 옵션줄
    youtube.addParam('type', 'video');

    // 검색 실행
    youtube.search(keyword, 1, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      let title = res['items'][0]['snippet']['title'];
      let thumbnail = `https://i.ytimg.com/vi/${res['items'][0]['id']['videoId']}/hq720.jpg`;
      url = `https://www.youtube.com/watch?v=${res['items'][0]['id']['videoId']}`;
      let stream = ytdl(url, {
        filter: 'audioonly',
        opusEncoded: true,
        encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200'],
      });

      const connection = joinVoiceChannel({
        channelId: interaction.member.voice.channel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });

      const player = createAudioPlayer();
      let resource = createAudioResource(stream);
      player.play(resource);
      connection.subscribe(player);

      const youtubeInfo_embed = {
        color: '#00ffff',
        title: '재생목록 추가됨!',
        description: title,
        image: {
          url: thumbnail,
        },
      };

      interaction.channel.send({ embeds: [youtubeInfo_embed] });
      interaction.reply(`음악 재생할개오..`);
    });
  },
};
