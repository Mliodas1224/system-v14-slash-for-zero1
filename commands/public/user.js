const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { COOLDOWN } = require('../../JSON/config.json');
module.exports = {
    cooldown: COOLDOWN,
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Shows user information.')
        .addUserOption(option =>
            option.setName('user').setDescription('User to get his information.')
            .setRequired(false)
        ),

    async execute(interaction, client) {

        const mentionedMember = interaction.options.getMember('user') || interaction.member;

        let Embed = new EmbedBuilder()
            .setAuthor({ name: `${mentionedMember.user.tag}'s Information`, iconURL: interaction.guild.iconURL({ dynamic: true, size: 1024, format: 'png' }) })
            .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024, format: 'png' }))
            .addFields(
                { name: 'Joined Discord:', value: `**<t:${Math.floor(mentionedMember.user.createdTimestamp / 1000)}:R>**`, inline: true },
                { name: 'Joined Server:', value: `**<t:${Math.floor(mentionedMember.joinedAt / 1000)}:R>**`, inline: true },
            )
        await interaction.reply({ embeds: [Embed] });

    }

}