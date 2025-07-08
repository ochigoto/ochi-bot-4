// index.js
import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.DISCORD_TOKEN;
const clientId = '1391759018149548043';
const guildId = '638374935240376331';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const commands = [];
const commandFiles = fs
  .readdirSync(path.join(__dirname, 'commands'))
  .filter(file => file.endsWith('.js'));

// Cargar comandos
for (const file of commandFiles) {
  try {
    const { default: command } = await import(`./commands/${file}`);
    commands.push(command.data.toJSON());
  } catch (err) {
    console.error(`❌ Failed to load command ${file}:`, err);
  }
}

// Registrar slash commands en Discord
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('🔃 Registering slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );
    console.log('✅ Commands registered successfully.');
  } catch (error) {
    console.error('❌ Failed to register commands:', error);
  }
})();

// Activar el bot
client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Escuchar interacciones
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const commandFile = commandFiles.find(f => f.replace('.js', '') === interaction.commandName);
  if (!commandFile) return;

  try {
    const { default: command } = await import(`./commands/${commandFile}`);
    await command.execute(interaction);
  } catch (error) {
    console.error(`❌ Error executing ${interaction.commandName}:`, error);
    await interaction.reply({ content: 'Something went wrong 😿', ephemeral: true });
  }
});

client.login(token);
