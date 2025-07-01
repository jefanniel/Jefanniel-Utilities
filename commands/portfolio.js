import {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('portfolio')
  .setDescription("View Jefanniel's creative and development portfolio");

export async function execute(interaction) {
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel('Website')
      .setStyle(ButtonStyle.Link)
      .setURL('https://jefanniel.vercel.app'),

    new ButtonBuilder()
      .setLabel('GitHub')
      .setStyle(ButtonStyle.Link)
      .setURL('https://github.com/jefanniel'),

    new ButtonBuilder()
      .setLabel('YouTube')
      .setStyle(ButtonStyle.Link)
      .setURL('https://youtube.com/@jefanniel'),

    new ButtonBuilder()
      .setLabel('TikTok')
      .setStyle(ButtonStyle.Link)
      .setURL('https://tiktok.com/@jefanniel')
  );

  await interaction.reply({
    embeds: [{
      title: "Jefanniel's Portfolio",
      description: "Explore a curated selection of my work in software development and visual content creation.",
      fields: [
        {
          name: 'Dev Works',
          value: [
            'Website: [jefanniel.com](https://jefanniel.vercel.app)',
            'GitHub: [github.com/jefanniel](https://github.com/jefanniel)',
            'Experimental: [codepen.io/jefanniel](https://codepen.io/jefanniel)'
          ].join('\n')
        },
        {
          name: 'Creative Works',
          value: [
            'YouTube: [@jefanniel](https://youtube.com/@jefanniel)',
            'TikTok: [@jefanniel](https://tiktok.com/@jefanniel)',
            'Instagram (Photo): [@shotbyjefa](https://instagram.com/shotbyjefa)',
            'Instagram (Art): [@masjefa](https://instagram.com/masjefa)'
          ].join('\n')
        }
      ],
      color: 0x9B59B6,
      footer: { text: "Crafted by Jefanniel" },
      timestamp: new Date().toISOString()
    }],
    components: [row]
  });
}
