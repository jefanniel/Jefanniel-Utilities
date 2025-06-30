import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('about')
  .setDescription('About Jefanniel');

export async function execute(interaction) {
  await interaction.reply({
    embeds: [{
      title: "👤 About Jefanniel",
      description: "Hi, I’m **Jefanniel** — a full-stack web developer, software engineer, content creator, and digital artist based in Indonesia.",
      fields: [
        { name: "🌐 Website", value: "[jefanniel.vercel.app](https://jefanniel.vercel.app)" },
        { name: "📍 Location", value: "Jakarta, Indonesia", inline: true },
        { name: "🎓 Education", value: "Informatics, Gunadarma University (starting August 2025)", inline: true },
        {
          name: "💻 Dev Tech Stack",
          value: "React, React Native, Next.js, Express, MongoDB, MySQL, PostgreSQL"
        },
        {
          name: "🎨 Creative Tools",
          value: "Premiere Pro, After Effects, Lightroom, Photoshop, DaVinci Resolve, Clip Studio Paint, Blender"
        }
      ],
      color: 0x5865F2,
      footer: { text: "Open for collaboration & creative projects" },
      timestamp: new Date().toISOString()
    }]
  });
}
