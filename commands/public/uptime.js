const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, client } = require("discord.js")
const { COOLDOWN } = require('../../JSON/config.json');
module.exports = {
  cooldown: COOLDOWN,
  data: new SlashCommandBuilder()
  .setName("uptime")
  .setDescription("Replies with the bot uptime"),
  /**
  *
  * @param {ChatInputCommandInteraction} interaction
*/
  execute(interaction, client) {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 23
    let minutes = Math.floor(client.uptime / 60000) % 60
    let seconds = Math.floor(client.uptime / 1000) % 60
    const embed = new EmbedBuilder()
    .setTitle("Uptime")
    .setDescription(`My uptime is \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds`)
    interaction.reply({ embeds: [embed]})
  }
}