import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('jefhelp')
  .setDescription('View all available commands and how to use them');

export async function execute(interaction) {
  await interaction.reply({
    embeds: [
      {
        title: '📖 Help Menu',
        description: 'Here are the available commands you can use:',
        fields: [
          {
            name: '🧠 General',
            value: [
              '`/about` — About Jefanniel and background',
              '`/contact` — Business inquiries and contact links',
              '`/portfolio` — Showcase of dev & creative works',
              '`/info` — Bot status and developer info',
            ].join('\n')
          },
          {
            name: '⚙️ Utility & More',
            value: 'More features will be added soon. Stay tuned!'
          }
        ],
        color: 0x3498DB,
        footer: { text: 'Need help? Reach out to @jefanniel on Discord' },
        timestamp: new Date().toISOString()
      }
    ]
  });
}
