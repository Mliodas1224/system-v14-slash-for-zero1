const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warn To The Member & User.")
        .addUserOption(option =>
            option.setName("target")
                .setDescription("User To Warn")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for the Warn.")
                .setRequired(false)
        ),
    async execute(interaction) {
        const { options } = interaction;

        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("You don't have `Administrator` permission.")
            ], ephemeral: true
        });

        const reason = options.getString("reason") || `You' been Warred in **${interaction.guild.name}**`;
        const target = interaction.options.getMember('target');
        const targetMember = target.user
        const Moderator = interaction.member

        const EmbedWarn = new EmbedBuilder()
            .setTitle("⚠ **You have been warned!**")
            .setAuthor({ name: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true, size: 1024, format: 'png' }) })
            .addFields(
                { name: ' 🔨 ┆ Warn ', value: `> **${reason}**`, inline: true },
                { name: ' 👤 ┆ Moderator ', value: `> **${Moderator}**`, inline: true },
            )
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
            .setColor(0xfdee00)
            .setTimestamp();

        try {
            await targetMember.send({ embeds: [EmbedWarn] });

            const Embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle('Succesfully')
            .addFields(
                { name: ` User :`, value: `> **${targetMember}**`, inline: true },
                { name: `Reason :`, value: `> **${reason}**`, inline: true }
            )
            .setTimestamp();
            
            await interaction.reply({ embeds: [Embed], ephemeral: false });
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