import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('contact')
  .setDescription('Business inquiries and contact links for Jefanniel');

export async function execute(interaction) {
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel('Instagram')
      .setStyle(ButtonStyle.Link)
      .setURL('https://instagram.com/jefanniel'),

    new ButtonBuilder()
      .setLabel('YouTube')
      .setStyle(ButtonStyle.Link)
      .setURL('https://www.youtube.com/@jefanniel'),

    new ButtonBuilder()
      .setLabel('TikTok')
      .setStyle(ButtonStyle.Link)
      .setURL('https://tiktok.com/@jefanniel'),

    new ButtonBuilder()
      .setLabel('GitHub')
      .setStyle(ButtonStyle.Link)
      .setURL('https://github.com/jefanniel')
  );

  await interaction.reply({
    embeds: [{
      title: "Contact Jefanniel",
      description: "For collaborations, inquiries, or professional connections, feel free to reach out via the following platforms.",
      fields: [
        { name: "Email", value: "`jefanniel.business@gmail.com`" },
        { name: "Discord", value: "`@jefanniel`" }
      ],
      color: 0x017301,
      footer: { text: "Available for freelance, creative projects, and partnerships" },
      timestamp: new Date().toISOString()
    }],
    components: [row]
  });
}
