import { REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import 'dotenv/config';

const { CLIENT_ID, TOKEN } = process.env;

const __dirname = dirname(fileURLToPath(import.meta.url));
const commands = [];

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('📦 Mengirim global slash command...');
    await rest.put(
      Routes.applicationCommands(CLIENT_ID), // deploy global
      { body: commands }
    );
    console.log('✅ Slash command global berhasil didaftarkan! (Butuh waktu ±1 jam untuk muncul)');
  } catch (err) {
    console.error('❌ Gagal daftar command:', err);
  }
})();
