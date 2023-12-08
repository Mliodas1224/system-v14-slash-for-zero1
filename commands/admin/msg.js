const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const { COOLDOWN } = require('../../JSON/config.json');
module.exports = {
  cooldown: COOLDOWN,
    data: new SlashCommandBuilder()
        .setName("msg")
        .setDescription("Create a msg and send it to a certain channel")
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Describe the msg.")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("Where do you want to send the msg to?")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        ),
    async execute(interaction) {
        const { options } = interaction;

        //permissions
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("You don't have `Administrator` permission.")
            ], ephemeral: true
        });

        const channel = options.getChannel("channel");
        const description = options.getString("description");

        const embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(description)
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });

        try {
            const m = await channel.send({ embeds: [embed] });
            
            await interaction.reply({ content: `The message was sent to ${channel} successfully`, ephemeral: true });
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