const { Client, SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction, ActivityType, CommandInteraction } = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName("setstatus")
    .setDescription("Set custom status for your bot")
        .addStringOption(
            option =>
            option.setName("options")
            .setDescription("Select an option")
            .setRequired(true)
            .addChoices(
                { name: "Watching", value: "Watching" },
                { name: "Listening", value: "Listening" },
                { name: "Playing", value: "Playing" },
                { name: "Competing", value: "Competing" },
            )
        )
  .addStringOption(
        option =>
        option.setName("activity")
        .setDescription("Activity content")
        .setRequired(true)),
  
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction = new CommandInteraction(), client = new Client()) {
        const { options } = interaction;
       
            // Check if the user has permission to ban members
            if (!interaction.member.permissions.has("Administrator")) {
                return await interaction.reply({content: "Just for owners -_-.", ephemeral: true});
            }

client.user.setActivity(`${options.getString("activity")}`, { type: ActivityType[`${options.getString("options")}`] })

/*
      client.user.setPresence({
        activities: [{ name: `${options.getString("activity")}`, type: ActivityType[`${options.getString("options")}`] }],
        status: 'Idle',
      });


      */
       await interaction.reply({content: "✅ Status updated successfully", ephemeral: true})
    },
    developer: true
}
