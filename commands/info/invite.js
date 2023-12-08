const { SlashCommandBuilder, ChatInputCommandInteraction, Client } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Replies with Invite link'),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) { 
        await interaction.reply('https://discord.com/api/oauth2/authorize?client_id=1180485275445645332&permissions=8&scope=bot+applications.commands');
    },
};
