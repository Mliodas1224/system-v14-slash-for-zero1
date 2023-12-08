const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { COOLDOWN } = require('../../JSON/config.json');
module.exports = {
  cooldown: COOLDOWN,
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a user from the discord server.")
        .addUserOption(option =>
            option.setName("target")
                .setDescription("User to be kicked.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for the kick.")
                .setRequired(false)
        ),

    async execute(interaction) {
        //permissions
        if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("You don't have `KickMembers` permission.")
            ], ephemeral: true
        });
        const { channel, options } = interaction;

        const user = options.getUser("target");
        const reason = options.getString("reason") || "No reason provided";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`You can't take action on ${user.username} since they have a higher role.`)
            .setColor(0xc72c3b)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.kick(reason);

        const embed = new EmbedBuilder()
            .setDescription(`Succesfully kicked ${user} with reason: ${reason}`);

        await interaction.reply({embeds: [embed] });
    }
}