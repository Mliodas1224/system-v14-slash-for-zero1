const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { COOLDOWN } = require('../../JSON/config.json');
module.exports = {
  cooldown: COOLDOWN,
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unban a user from the discord server.")
        .addStringOption(option =>
            option.setName("userid")
                .setDescription("Discord ID of the user you want to unban.")
                .setRequired(true)
        ),

    async execute(interaction) {
        //permissions
        if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("You don't have `BanMembers` permission.")
            ],  ephemeral: true
        });
        const { channel, options } = interaction;

        const userId = options.getString("userid");

        try {
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
                .setDescription(`Succesfully unbanned id ${userId} from the guild.`)
                .setColor(0x5fb041)
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
            });
        } catch (err) {
            console.log(err);
            const EmbedError = new EmbedBuilder()
            .setTitle("Error")
            .setDescription("Something went wrong. Please contact the developers")
            .setColor("Red")
            .setTimestamp()

            await interaction.reply({ embeds: [EmbedError], ephemeral: true });
        }
    }
}