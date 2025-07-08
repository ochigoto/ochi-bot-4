// commands/guess.js
import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('guess')
    .setDescription('Guess a number between 1 and 10!')
    .addIntegerOption(option =>
      option.setName('number')
        .setDescription('Your guess')
        .setMinValue(1)
        .setMaxValue(10)
        .setRequired(true)
    ),

  async execute(interaction) {
    const userGuess = interaction.options.getInteger('number');
    const correctNumber = Math.floor(Math.random() * 10) + 1;

    if (userGuess === correctNumber) {
      await interaction.reply(`🎉 You guessed it! It was **${correctNumber}**!`);
    } else {
      await interaction.reply(`❌ Nope! It was **${correctNumber}**. Try again!`);
    }
  }
};
