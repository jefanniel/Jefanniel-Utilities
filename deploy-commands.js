import { REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config as dotenvConfig } from 'dotenv';

// Load environment variables
dotenvConfig();
const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;

const __dirname = dirname(fileURLToPath(import.meta.url));
const commands = [];

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
  console.log('📦 Mengirim slash command...');
  await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
  console.log('✅ Slash command berhasil didaftarkan!');
} catch (err) {
  console.error('❌ Gagal daftar command:', err);
}
