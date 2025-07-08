// commands/ask.js
import { SlashCommandBuilder } from 'discord.js';

const responses = [
  "Yes.", "No.", "Maybe...", "Definitely!", "I don't think so.",
  "Ask again later.", "For sure!", "Hmm... not sure 🐾"
];

export default {
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Ask the bot a question and get a mysterious answer.')
    .addStringOption(option =>
      option.setName('question')
        .setDescription('What do you want to ask?')
        .setRequired(true)
    ),

  async execute(interaction) {
    const answer = responses[Math.floor(Math.random() * responses.length)];
    await interaction.reply(`🎱 ${answer}`);
  }
};
