const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { COOLDOWN } = require('../../JSON/config.json');
module.exports = {
  cooldown: COOLDOWN,
    data: new SlashCommandBuilder()
        .setName("getrole")
        .setDescription("Get A Get Roles To A Member.")
        .addUserOption(option =>
            option.setName("target")
                .setDescription("User to be Get Roles.")
                .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName("role")
                .setDescription("Role.")
                .setRequired(true)
        ),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("You don't have `ManageRoles` permission.")
            ], ephemeral: true
        });

        const { channel, options } = interaction;

        const roles = interaction.options.getRole('role');
        const member = interaction.options.getMember('target');

        const errEmbed = new EmbedBuilder()
            .setDescription(`I could not assign roles ${roles} to a member ${member}.`)
            .setColor(0xc72c3b);

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.roles.add(roles);

        const embed = new EmbedBuilder()
            .setDescription(`
            > The rank is given to the member: ${member}

            > Roles : ${roles}
            `)
            .setColor(0x5fb041)
            .setTimestamp()

        await interaction.reply({
            embeds: [embed]
        });
    }
}