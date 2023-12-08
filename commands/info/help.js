const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Are you feeling lost ??'),
    async execute(interaction) {
        const messages = [
            '**__ General Commands__**\n**All commands that anyone can use.**\n/help - Feeling lost ?\n/ping - See the ping of the bot\n/avatar - Displays your avatar or someone else avatar\n/dice-roll - Roll a dice from 1 to 6\n/listban - Show the list of banned users from the guild\n/membercount - Shows how many members and bots are on the server\n/meme - Gets a random meme\n/rpc - 🪨 📜 ✂️\n/translate - Translates a word to another language\n/uptime - Show how much time bot working since the last run\n/user - Gets a user info\n**__Admin Commands__**\n**Commands for admins**\n/ban - To ban somebody\n/change - To delete a channel and make another one same name\n/clear - To clear some messages\n/hide - To hide a room\n/join - To make the bot join the voice room you are in\n/kick - To kick somebody from the server\n/lock - To lock a channel\n/move - To move somebody from the voice room to another one\n/pollEmbed - To create a message and send it to a selected channel\n/rolegive - To mute someone\n/show - To create a poll Embed and send it to a certain channel\n/ban - To give a selected role to somebody\n/unban - To unban a user\n/unlock - To unlock channel\n/unmute - To unmute some muted body\n/warn - To warn someone\n**__Giveaway Commands__**\n**giveaway commands to manage giveaways**\n/start - Starts a giveaway\n/edit - Edits a giveaway\n/end - Ends a giveaway\n/reroll - Rechoose a new winner\n**__Owner Commands__**\n**Commands for owner**\n/come - To invite someone to a channel\n/setstatus - To set a custom status for the bot ```',
        ];

        for (const message of messages) {
            await interaction.channel.send(message);


                 
        }
    },
};
