import { Client, Collection, GatewayIntentBits, ActivityType } from 'discord.js';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import express from 'express';

// Load environment variables
config();
const { TOKEN } = process.env;

// Express web server for uptime
const app = express();
app.get('/', (req, res) => res.send('Bot aktif dan berjalan!'));
app.listen(3000, () => console.log('🌐 Web server untuk uptime aktif'));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const __dirname = dirname(fileURLToPath(import.meta.url));
client.commands = new Collection();

// Load command files
const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
(async () => {
  for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    console.log(`✅ Loaded command: ${command.data.name}`);
  }

  client.login(TOKEN);
})();

client.once('ready', () => {
  console.log(`🤖 Bot aktif sebagai ${client.user.tag}`);

  const customStatuses = [
    "I'm Jefanniel's assistant bot",
    "Use /h to get started",
    "Developed by @jefanniel"
  ];

  let i = 0;
  setInterval(() => {
    client.user.setPresence({
      activities: [{
        name: customStatuses[i % customStatuses.length],
        type: ActivityType.Custom,
        state: customStatuses[i % customStatuses.length],
      }],
      status: 'online'
    });
    i++;
  }, 300);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const allowedChannelId = '1389246671485009950'; // #talk-to-jefanniel
  const allowedUserId = '598802827590238208'; // owner @jefanniel

  if (interaction.channelId !== allowedChannelId && interaction.user.id !== allowedUserId) {
    return await interaction.reply({
      content: `Ups! Gunakan command ini di <#${allowedChannelId}>.`,
      ephemeral: true
    });
  }

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({
      content: '❌ Terjadi kesalahan saat menjalankan command.',
      ephemeral: true
    });
  }
});

// 👇 Mention + AI-Like Response + Typing Simulation
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const isMentioned = message.mentions.has(client.user);
  if (!isMentioned) return;

  const msg = message.content.toLowerCase();

  // Simulasikan bot sedang mengetik...
  message.channel.sendTyping();
  await new Promise(resolve => setTimeout(resolve, 1200));

  // 1. Help / Bantuan
  if (msg.includes('help') || msg.includes('bantu')) {
    return message.reply(`📌 Sepertinya kamu butuh bantuan nih, ${message.author.username}!\nGunakan command \`/h\` untuk mulai.`);
  }

  // 2. Siapa Kamu?
  if (msg.includes('siapa') || msg.includes('kamu siapa')) {
    return message.reply({
      embeds: [{
        title: 'Tentang Aku 🤖',
        description: "Aku adalah bot asisten pribadi milik **Jefanniel**.\nPakai `/about` atau `/h` buat kenalan lebih jauh~",
        color: 0x5865F2,
        footer: {
          text: `Mentioned by ${message.author.username}`,
          icon_url: message.author.displayAvatarURL()
        }
      }]
    });
  }

  // 3. Apa Kabar?
  if (msg.includes('kabar') || msg.includes('apa kabar')) {
    const moods = ['baik banget!', 'sedikit ngelag, tapi masih semangat!', 'lelah... tapi tetap online 😴', 'siap membantu!'];
    const mood = moods[Math.floor(Math.random() * moods.length)];
    return message.reply(`Aku ${mood} Kamu gimana, ${message.author.username}?`);
  }

  // 4. Salam
  const greetings = ['halo', 'hai', 'assalamualaikum', 'selamat pagi', 'selamat siang', 'selamat sore', 'selamat malam'];
  if (greetings.some(greet => msg.includes(greet))) {
    const replies = [
      `Halo juga, ${message.author.username}! 👋`,
      `Wa'alaikumussalam, ${message.author.username}! ✨`,
      `Selamat datang! Ada yang bisa kubantu? 🤖`,
      `Semangat terus ya, ${message.author.username}! 💪`
    ];
    return message.reply(replies[Math.floor(Math.random() * replies.length)]);
  }

  // 5. Terima kasih
  const thanks = ['makasih', 'terima kasih', 'thanks', 'thank you'];
  if (thanks.some(word => msg.includes(word))) {
    const replies = [
      `Sama-sama, ${message.author.username}! 😄`,
      `You're welcome~ Anytime! 💜`,
      `Gitu doang udah bikin aku senang hehe 😚`,
      `Siap bantu kapan aja, ${message.author.username}!`
    ];
    return message.reply(replies[Math.floor(Math.random() * replies.length)]);
  }

  // 6. Default AI-Like Random Reply
  const templates = [
    `Halo, ${message.author.username}! Kamu manggil aku ya? 😄`,
    `Yo ${message.author.username}, ada yang bisa kubantu?`,
    `Aku di sini, ${message.author.username}! Ada perlu apa nih? 🤖`,
    `Hey ${message.author.username}, kamu mention aku barusan. Ada yang urgent?`,
    `Waduh... ada mention masuk dari ${message.author.username}, siap sedia! 💡`,
    `Hai juga, ${message.author.username}! Aku baru aja selesai reboot hehe`
  ];

  const response = templates[Math.floor(Math.random() * templates.length)];
  message.reply(response);
});
