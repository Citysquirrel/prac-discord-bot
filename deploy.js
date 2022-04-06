const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');

// const commands = [
//   new SlashCommandBuilder()
//     .setName('테스트')
//     .setDescription('테스트 명령어 발생'),
//   new SlashCommandBuilder().setName('서버').setDescription('서버정보 출력'),
//   new SlashCommandBuilder().setName('내정보').setDescription('내정보 출력'),
// ].map((cm) => cm.toJSON());

const commands = [];
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const com = require(`./commands/${file}`);
  commands.push(com.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('명령어 적용 성공!'))
  .catch(console.error);
