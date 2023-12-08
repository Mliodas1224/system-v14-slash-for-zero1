const { Client, SlashCommandBuilder, ChatInputCommandInteraction, version, ChannelType, PermissionFlagsBits } = require('discord.js')
const { EmbedBuilder } = require('@discordjs/builders')
const ms = require("ms")
const { COOLDOWN } = require('../../JSON/config.json');
module.exports = {
  cooldown: COOLDOWN,
    data: new SlashCommandBuilder()
    .setName("start")
    .setDescription("Start a giveaway")
    .addStringOption((option) => option.setName('duration').setDescription('How long the giveaway should last for. Example values: 1m, 1h, 1d').setRequired(true))
      .addIntegerOption((option) => option.setName('winners').setDescription('How many winners the giveaway should have').setRequired(true))
      .addStringOption((option) => option.setName('prize').setDescription('What the prize of the giveaway should be').setRequired(true))
      .addChannelOption((option) => option.setName('channel').setDescription('The channel to start the giveaway in').setRequired(true).addChannelTypes(ChannelType.GuildText)),
  
  async execute(interaction, client, messages, args, message) {

    //permissions
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("You don't have `Administrator` permission.")
            ], ephemeral: true
        });
    
    const duration = interaction.options.getString('duration');
    const winnerCount = interaction.options.getInteger('winners');
    const giveawayprize = interaction.options.getString(`prize`);
    const giveawayChannel = interaction.options.getChannel('channel');

   if(isNaN(ms(duration))) {
    return interaction.reply({
      content: ':x: Please select a valid duration!',
      ephemeral: true
    });
  }
    if (winnerCount < 1) {
      return interaction.reply({
        content: ':x: Please select a valid winner count! greater or equal to one.',
        ephemeral: true
      })
    }
 interaction.reply({
   content: `Giveaway started ` ,
        ephemeral: true
 })
  
    
  await client.giveawaysManager.start(giveawayChannel, {

 duration: ms(duration),
    
  prize: giveawayprize,
    
  inviteToParticipate: `React with 🎉 to enter\n`,
                                      
  drawing:  `Ends: **{timestamp}**\n`,

  HostedBy:`{interaction.author}`,

  winnerCount: parseInt(winnerCount),

  winMessage: "Congratulations, {winners}! You won **{this.prize}**!",

  noWinner: "Giveaway cancelled, no valid participations."
    
  }).then((data) => {
                console.log(data); 
            });
   //giveawayChannel.send({content: `Giveaway started in ${giveawayChannel}! `, ephemeral: true});

      
  }
}
