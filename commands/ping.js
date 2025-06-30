import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Bot balas "pong!"');

export async function execute(interaction) {
  await interaction.reply('Pong 🏓 dari guwejh!');
}
