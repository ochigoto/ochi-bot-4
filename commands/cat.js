// commands/cat.js
import { SlashCommandBuilder } from 'discord.js';
import fetch from 'node-fetch';

export default {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Sends a random cute cat picture.'),
    
  async execute(interaction) {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const [data] = await response.json();

      await interaction.reply({
        content: '🐾 Meow~ Here’s a random cat!',
        files: [data.url]
      });
    } catch (error) {
      console.error('Error fetching cat image:', error);
      await interaction.reply({
        content: '😿 Could not fetch a cat picture.',
        ephemeral: true
      });
    }
  }
};
