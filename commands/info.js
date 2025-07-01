import { SlashCommandBuilder } from 'discord.js';
import os from 'os';

export const data = new SlashCommandBuilder()
  .setName('info')
  .setDescription('Display bot information');

export async function execute(interaction) {
  const uptimeSeconds = process.uptime();
  const uptimeStr = new Date(uptimeSeconds * 1000).toISOString().substr(11, 8); // HH:mm:ss

  await interaction.reply({
    embeds: [
      {
        title: '🤖 Bot Information',
        color: 0x5865F2,
        fields: [
          { name: '📛 Bot Name', value: interaction.client.user.username, inline: true },
          { name: '👨‍💻 Developer', value: 'Jefanniel', inline: true },
        ],
        footer: {
          text: "Crafted by Jefanniel — Full-Stack Developer & Content Creator" ,
        },
        timestamp: new Date().toISOString()
      }
    ]
  });
}
