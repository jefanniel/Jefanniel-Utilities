import { REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config as dotenvConfig } from 'dotenv';

// Load environment variables
dotenvConfig();
const { CLIENT_ID, GUILD_ID } = process.env;

const __dirname = dirname(fileURLToPath(import.meta.url));
const commands = [];

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

// Import all command modules
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// Setup REST client
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

try {
  console.log('📦 Mengirim perintah ke Discord...');

  // Guild-based commands (instantly available)
  await rest.put(
    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
    { body: commands }
  );
  console.log(`✅ Guild command berhasil didaftarkan di GUILD_ID: ${GUILD_ID}`);

  // Global commands (available in all servers, delay 1–60 mins)
  await rest.put(
    Routes.applicationCommands(CLIENT_ID),
    { body: commands }
  );
  console.log('🌐 Global command berhasil didaftarkan (muncul dalam 1-60 menit)');
} catch (err) {
  console.error('❌ Gagal mendaftarkan command:', err);
}
