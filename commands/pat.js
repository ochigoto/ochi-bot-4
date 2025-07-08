// commands/pat.js
import { SlashCommandBuilder } from 'discord.js';
import fetch from 'node-fetch';

export default {
  data: new SlashCommandBuilder()
    .setName('pat')
    .setDescription('Give a head pat to someone!')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user you want to pat')
        .setRequired(true)
    ),

  async execute(interaction) {
    const target = interaction.options.getUser('user');

    try {
      const res = await fetch('https://nekos.best/api/v2/pat');
      const data = await res.json();
      const gifUrl = data.results[0].url;

      await interaction.reply({
        content: `🫶 ${interaction.user} pats ${target} on the head!`,
        files: [gifUrl]
      });
    } catch (error) {
      console.error('Error fetching pat gif:', error);
      await interaction.reply({
        content: '😵 Could not fetch a pat gif.',
        ephemeral: true
      });
    }
  }
};
