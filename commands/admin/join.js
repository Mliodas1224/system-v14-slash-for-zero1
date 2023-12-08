const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("Join To Voice Channel.")
        .addChannelOption(option =>
            option.setName('channel')
            .setDescription('Voice channel mention to Join.')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildVoice)
        ),
    async execute(interaction) {
        const { options } = interaction;

        if (!interaction.member.permissions.has(PermissionFlagsBits.Connect)) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("You don't have `Connect` permission.")
            ], ephemeral: true
        });

        const VoiceChannelJoin = interaction.options.getChannel('channel');

        try {
            joinVoiceChannel({
                channelId: VoiceChannelJoin.id,
                guildId: VoiceChannelJoin.guild.id,
                adapterCreator: VoiceChannelJoin.guild.voiceAdapterCreator,
            });

            const Embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle('Succesfully')
            .setDescription(`💨 **Voice Channel successfully logged in**`)
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