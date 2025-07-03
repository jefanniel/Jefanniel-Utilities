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

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const __dirname = dirname(fileURLToPath(import.meta.url));

client.commands = new Collection();

// Load command files
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
    "Hi, there. I'm Jefanniel Assistant",
    "Type /h to get started",
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

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({ content: '❌ Terjadi kesalahan.', ephemeral: true });
  }
});
