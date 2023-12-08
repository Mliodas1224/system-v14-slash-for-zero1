const ascii = require("ascii-table");
const table = new ascii().setHeading('#','user', 'id');
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { COOLDOWN } = require('../../JSON/config.json');
module.exports = {
    cooldown: COOLDOWN,
    data: new SlashCommandBuilder()
        .setName("listban")
        .setDescription("list Ban."),
    async execute(interaction, client) {

        // Permission
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("You don't have `ManageGuild` permission.")
            ], ephemeral: true
        });

        const message = (n) => { return new EmbedBuilder() .setDescription(n) .setColor(0x8302fa).setTimestamp().setFooter({ text: `by ${interaction.user.tag}`}) };
        const words_shorter = (text, limit=5, more='..') => {
            if(text.length > limit){
                let newText = text.substr(0, limit)
                newTextTrem = newText.trim()
                return newTextTrem+more
            }else{
                return text
            }
        }
        await interaction.deferReply({ephemeral:true});
        interaction.guild.bans.fetch()
            .then(banned => {
                x = 1;
                table.clearRows()
                banned.map(ban => table.addRow(x++,words_shorter(ban.user.username), ban.user.id));
                if(table.toString().length > 3500) return interaction.editReply(
                    { 
                        embeds: [
                            message(`⚠️ | The number of banned people is more than 800, so this number cannot be viewed by the bot. Use the basic method through the control panel.`)
                        ]
                    }
                );
                if (banned.size == 0) return interaction.editReply({ embeds: [message(`⚠️ | No member is banned`)]});
                interaction.editReply(
                    { 
                        embeds: 
                        [message(`👥  **List of banned members count ${banned.size}**\n\`\`\`${table.toString()}\`\`\``)] 
                    }
                );
            });
    },
};