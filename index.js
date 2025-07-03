import { Client, Collection, GatewayIntentBits, ActivityType } from 'discord.js';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import express from 'express';

// Load environment variables
config();
const { TOKEN } = process.env;

// Express web server for uptime
const app = express();
app.get('/', (req, res) => res.send('Bot aktif dan berjalan!'));
app.listen(3000, () => console.log('🌐 Web server untuk uptime aktif'));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const __dirname = dirname(fileURLToPath(import.meta.url));
client.commands = new Collection();

// load command files
const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

(async () => {
  for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    console.log(`✅ Loaded command: ${command.data.name}`);
  }

  client.login(TOKEN);
})();

client.once('ready', () => {
  console.log(`🤖 Bot aktif sebagai ${client.user.tag}`);

  const customStatuses = [
    "I'm Jefanniel's assistant bot",
    "Use /h to get started",
    "Developed by @jefanniel"
  ];

  let i = 0;
  setInterval(() => {
    client.user.setPresence({
      activities: [{
        name: customStatuses[i % customStatuses.length],
        type: ActivityType.Custom,
        state: customStatuses[i % customStatuses.length],
      }],
      status: 'online'
    });
    i++;
  }, 3000);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const allowedChannelId = '1389246671485009950'; // #talk-to-jefanniel
  const allowedUserId = '598802827590238208'; // @jefanniel

  if (interaction.channelId !== allowedChannelId && interaction.user.id !== allowedUserId) {
    return await interaction.reply({
      content: `This command can only be used in <#${allowedChannelId}>.`,
      ephemeral: true
    });
  }

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({
      content: 'An error occurred while executing the command.',
      ephemeral: true
    });
  }
});

// bot respons 
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.mentions.has(client.user)) return;

  const allowedChannelId = '1389246671485009950'; // #talk-to-jefanniel
  const allowedUserId = '598802827590238208'; // @jefanniel

  if (message.channel.id !== allowedChannelId && message.author.id !== allowedUserId) {
    return message.reply(`Please mention me in <#${allowedChannelId}> to keep things organized. Thank you!`);
  }

  return message.reply(`Hi, there! I'm here to assist you. Use \`/h\` to get started.`);
});
