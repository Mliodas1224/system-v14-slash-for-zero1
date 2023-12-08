const { Events } = require('discord.js');
const config = require("../../JSON/config.json");
const mongoose = require('mongoose');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {

        await mongoose.connect(config.mongodb || '');

        if (mongoose.connect) {
            console.log('MongoDB connection succesful.')
        }


        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};