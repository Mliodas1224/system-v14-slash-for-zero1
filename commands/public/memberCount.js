const {
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder
} = require("discord.js");
const { COOLDOWN } = require('../../JSON/config.json');
module.exports = {
  cooldown: COOLDOWN,
    data: new SlashCommandBuilder()
    .setName("membercount")
    .setDescription("Shows you the membercount of the server."),


    async execute(interaction) {
        const { guild } = interaction;
        const { members } = guild;
        
        const botCount = members.cache.filter(member => member.user.bot).size;

        interaction.reply({ embeds: [
            new EmbedBuilder()
                .setColor("Green")
                .setTitle(`${guild.name}'s Membercount`)
                .setThumbnail(guild.iconURL({ size: 1024 }))
                .setImage(guild.bannerURL({ size: 1024 }))
                .setFooter({ text: "Membercount Command" })
                .addFields(
                    {
                        name: `User (${guild.memberCount})`,
                        value: [
                            `👨‍👩‍👧‍👦 **Member** ${guild.memberCount - botCount}`,
                            `🤖 **Bots** ${botCount}`
                        ].join("\n"),
                        inline: true
                    }
                )
        ] });
    }
}