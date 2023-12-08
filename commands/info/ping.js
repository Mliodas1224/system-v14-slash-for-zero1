const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { COOLDOWN } = require('../../JSON/config.json');
module.exports = {
  cooldown: COOLDOWN,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('pong.'),

        async execute(interaction, client) {
            const Embed = new EmbedBuilder()
            .setTitle(`Bot Ping`)
            .setDescription(`> Ping **${client.ws.ping}** Ms`)
            .setColor("DarkRed");
    
          interaction.reply({ embeds: [Embed], ephemeral: true });
    

    }

}