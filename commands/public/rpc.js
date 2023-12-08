const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Rock Paper Scissors")
    .addStringOption((options) =>
      options
        .setName("action")
        .setDescription("Rock Paper Scissors?")
        .addChoices(
          { name: "Rock", value: "Rock" },
          { name: "Paper", value: "Paper" },
          { name: "Scissors", value: "Scissors" }
        )
        .setRequired(true)
    ),
  /**
   *
   * @param { ChatInputCommandInteraction } interaction
   * @param { Client } clien
   */
  execute(interaction) {
    const action = ["Rock", "Paper", "Scissors"];
    let done = `${action[Math.floor(Math.random() * action.length)]}`;
    console.log(done);
    const { options } = interaction;
    const rps = options.getString("action");
    if (rps == "Rock") {
      if (done == "Paper")
        return interaction.reply({
          content: `You Lose!, I chose ${done}`,
          ephemeral: true,
        });
      if (done == "Rock")
        return interaction.reply({
          content: `TIE!, I chose ${done}`,
          ephemeral: true,
        });
      if (done == "Scissors")
        return interaction.reply({
          content: `You Win!, I chose ${done}`,
          ephemeral: true,
        });
    }
    if (rps == "Paper") {
      if (done == "Paper")
        return interaction.reply({
          content: `TIE!, I chose ${done}`,
          ephemeral: true,
        });
      if (done == "Rock")
        return interaction.reply({
          content: `You Win!, I chose ${done}`,
          ephemeral: true,
        });
      if (done == "Scissors")
        return interaction.reply({
          content: `You Lose!, I chose ${done}`,
          ephemeral: true,
        });
    }
    if (rps == "Scissors") {
      if (done == "Paper")
        return interaction.reply({
          content: `You Win!, I chose ${done}`,
          ephemeral: true,
        });
      if (done == "Rock")
        return interaction.reply({
          content: `You Lose!, I chose ${done}`,
          ephemeral: true,
        });
      if (done == "Scissors")
        return interaction.reply({
          content: `TIE!, I chose ${done}`,
          ephemeral: true,
        });
    }
  },
};