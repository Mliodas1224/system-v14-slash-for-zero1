const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { COOLDOWN } = require('D:/Downloads/V14-Slash/JSON/config.json');
module.exports = {
  cooldown: COOLDOWN,
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Avatar A User.')
        .addUserOption(option =>
            option.setName('user').setDescription('User to get his Avatar.')
            .setRequired(false)
        ),

        async execute(interaction, client) {
            const UserName = interaction.options.getMember('user') || interaction.member;
            const Response = new EmbedBuilder()
            .setTitle(`${UserName.user.tag}'s Avatar`)
            .setImage(`${UserName.user.displayAvatarURL({ dynamic: true, size: 1024 })}`)
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
            .setColor('#2e2e2e');
    
            await interaction.reply({embeds: [Response]})
    

    }

}