const { Client, SlashCommandBuilder, ChatInputCommandInteraction, version, PermissionFlagsBits } = require('discord.js')
const { EmbedBuilder } = require('@discordjs/builders')
const ms = require("ms")
const { COOLDOWN } = require('../../JSON/config.json');
module.exports = {
  cooldown: COOLDOWN,
    data: new SlashCommandBuilder()
    .setName("edit")
    .setDescription("edit a giveaway")
    .addStringOption((option) => option.setName('giveaway').setDescription('The giveaway to end (message ID)').setRequired(true))
      .addStringOption((option) => option.setName('duration').setDescription('Setting time of mentioned giveaway. Eg. 1h sets the current giveaway to end after an hour!').setRequired(true))
      .addIntegerOption((option) => option.setName('winners').setDescription('How many winners the giveaway should have').setRequired(true))
      .addStringOption((option) => option.setName('prize').setDescription('What the prize of the giveaway should be').setRequired(true)),
    
  async execute(interaction, client, messages, args, message) {

    //permissions
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("You don't have `Administrator` permission.")
            ], ephemeral: true
        });
    
     const gid = interaction.options.getString('giveaway');
     const time = interaction.options.getString('duration');
     const winnersCount = interaction.options.getInteger('winners');
     const prize = interaction.options.getString('prize');

    await interaction.deferReply({
         ephemeral: true
        })
        try {
        await client.giveawaysManager.edit(gid, {
            newWinnersCount: winnersCount,
            newPrize: prize,
            addTime: time
        })
        } catch(e) {
return interaction.editReply({
            content:
                `No giveaway found with the given message ID: \`${gid}\``,
            ephemeral: true
        });
        }
        interaction.editReply({
            content:
                `This giveaway has now been edited!`,
            ephemeral: true
        });
    
    }
}