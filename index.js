// Require the necessary discord.js classes
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');
const dotenv = require('dotenv');
dotenv.config();

const fs = require('node:fs');

// Create a new clinet instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// commands 폴더 컨트롤링
client.commands = new Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const com = require(`./commands/${file}`);
  // Set a new item in the Collection.
  // With the key as the command name and the value as the exported module
  client.commands.set(com.data.name, com);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const com = client.commands.get(interaction.commandName);

  if (!com) return;

  try {
    await com.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }

  // const { commandName } = interaction;
  //
  // if (commandName === '테스트') {
  //   await interaction.reply('테스트 성공!');
  // } else if (commandName === '서버') {
  //   await interaction.reply(
  //     `서버이름: ${interaction.guild.name}\n총 인원: ${interaction.guild.memberCount}`
  //   );
  // } else if (commandName === '내정보') {
  //   await interaction.reply(
  //     `태그: ${interaction.user.tag}\nID: ${interaction.user.id}`
  //   );
  // }
});

// Login to Discord with ur client's token
// if (!token) token = process.env.DISCORD_TOKEN;
client.login(token);
