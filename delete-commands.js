import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';
config();

const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;
const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('🧹 Menghapus semua command guild lama...');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: [] }
    );

    console.log('✅ Semua command guild telah dihapus.');
  } catch (error) {
    console.error('❌ Gagal menghapus command:', error);
  }
})();
