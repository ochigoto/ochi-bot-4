// commands/commands.js
import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('commands')
    .setDescription('List all available commands and what they do.'),

  async execute(interaction) {
    await interaction.reply({
      content: `✨ **Available Commands** ✨\n
/ping — Check bot latency  
/cat — Get a random cat picture 🐱  
/hug @user — Send a warm hug 🤗  
/pat @user — Give a headpat 🫶  
/ask question — Ask something and get a random answer 🎱  
/meme — Random fun meme 😆  
/guess — Try to guess the secret number 🎮  
/commands — Show this help message 📋`,
      ephemeral: true
    });
  }
};
