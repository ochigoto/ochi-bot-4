// commands/hug.js
import { SlashCommandBuilder } from 'discord.js';
import fetch from 'node-fetch';

export default {
  data: new SlashCommandBuilder()
    .setName('hug')
    .setDescription('Give a virtual hug to someone!')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user you want to hug')
        .setRequired(true)
    ),

  async execute(interaction) {
    const target = interaction.options.getUser('user');

    try {
      const res = await fetch('https://nekos.best/api/v2/hug');
      const data = await res.json();
      const gifUrl = data.results[0].url;

      await interaction.reply({
        content: `💖 ${interaction.user} gives a warm hug to ${target}!`,
        files: [gifUrl]
      });
    } catch (error) {
      console.error('Error fetching hug gif:', error);
      await interaction.reply({
        content: '🥲 Failed to fetch a hug gif.',
        ephemeral: true
      });
    }
  }
};
