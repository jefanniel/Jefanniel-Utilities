import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
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
const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log(`🤖 Bot aktif sebagai ${client.user.tag}`);

  const activities = [
    { name: 'as a Jefanniel Assistant 💻', type: 0 },        // Playing
    { name: 'as a Software Engineer', type: 0 },
    { name: 'as a Content Creator', type: 0 },
    { name: 'as a Digital Artist', type: 0 },
    //{ name: 'Giantical Community', type: 3 },                 // Watching
    { name: '/jefhelp', type: 2 },                          // Listening
  ];

  let i = 0;
  setInterval(() => {
    const activity = activities[i % activities.length];
    client.user.setPresence({ activities: [activity], status: 'online' });
    i++;
  }, 7000); // ganti tiap 10 detik
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

client.login(TOKEN);
