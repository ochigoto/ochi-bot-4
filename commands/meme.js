// commands/meme.js
import { SlashCommandBuilder } from 'discord.js';
import fetch from 'node-fetch';

export default {
  data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Show a random meme from Reddit'),

  async execute(interaction) {
    try {
      const res = await fetch('https://meme-api.com/gimme');
      const data = await res.json();

      await interaction.reply({
        content: `🤣 ${data.title}`,
        files: [data.url]
      });
    } catch (error) {
      console.error('Error fetching meme:', error);
      await interaction.reply({
        content: '😭 Could not fetch a meme.',
        ephemeral: true
      });
    }
  }
};
