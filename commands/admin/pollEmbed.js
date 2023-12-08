const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pollembed")
        .setDescription("Create a poll Embed and send it to a certain channel")
        .addStringOption(option =>
            option.setName("title")
                .setDescription("title the poll Embed.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Describe the poll Embed.")
                .setRequired(true)
        )
        
        .addStringOption(option =>
            option.setName("msg")
                .setDescription("msg for the message, not embed.")
                .setRequired(true)
        )
        .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("choose color")
        .setRequired(true)
        .addChoices(
          { name: "Red", value: "Red" },
          { name: "Blue", value: "Blue" },
          { name: "Green", value: "Green" },
          { name: "Yellow", value: "Yellow" },
          { name: "White", value: "White" },
          { name: "Default", value: "Default" },
          { name: "Fuchsia", value: "Fuchsia" },
          { name: "Gold", value: "Gold" },
          { name: "Grey", value: "Grey" },
          { name: "Greyple", value: "Greyple" },
          { name: "LightGrey", value: "LightGrey" },
          { name: "LuminousVividPink", value: "LuminousVividPink" },
          { name: "Navy", value: "Navy" },
          { name: "NotQuiteBlack", value: "NotQuiteBlack" },
          { name: "Orange", value: "Orange" },
          { name: "Purple", value: "Purple" },
          { name: "Random", value: "Random" },
          { name: "NeonGreen", value: "#00ff00" },
          { name: "DeepOrange", value: "#ff5722" },
          { name: "Lime", value: "#cddc39" },
          { name: "Teal", value: "#009688" },
          { name: "Indigo", value: "#3f51b5" },
          { name: "Amber", value: "#ffc107" },
          { name: "Black", value: "Black" }
        )
    )
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("Where do you want to send the poll Embed to?")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        ),
    async execute(interaction) {

        //permissions
        if (!interaction.member.permissions.has(PermissionFlagsBits.SendMessages)) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("You don't have `SendMessages` permission.")
            ], ephemeral: true
        });

        const channel = interaction.options.getChannel("channel");
        const description = interaction.options.getString("description");
        const title = interaction.options.getString("title");
        const Msg = interaction.options.getString("msg");
        let color = interaction.options.getString("color");

        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle(title)
            .setDescription(description)
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
            .setTimestamp();

        try {
            const m = await channel.send({ content: `${Msg}`, embeds: [embed] });
            await m.react("✅");
            await m.react("🤔");
            await m.react("❌");
            await interaction.reply({ content: `The message was sent in Channel ${channel}.`, ephemeral: false });
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