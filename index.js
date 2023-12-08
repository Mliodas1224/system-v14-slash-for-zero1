const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('This bot is running CorwinDev\'s  <a href="https://github.com/CorwinDev/Discord-Bot">Discord-Bot</a>')
})

app.listen(3000)
const { Client, GatewayIntentBits } = require('discord.js');
const { TOKEN } = require('./JSON/config.json');
const { readdirSync } = require('node:fs');

const prefix = "s!";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
    ]
});

readdirSync('./handlers').forEach(handler => {
    require(`./handlers/${handler}`)(client);
});





// Giveaway

const { GiveawaysManager } = require('discord-giveaways');
const manager = new GiveawaysManager(client, {
    storage: './JSON/giveaways.json',
    default: {
        botsCanWin: false,
        embedColor: 0x0FFF00,
        embedColorEnd: 0xFF0004,
        reaction: '🎉'
    }
});

client.giveawaysManager = manager;




// Distube

const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');


// Distube LogIn

client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin]
})







client.login(TOKEN);