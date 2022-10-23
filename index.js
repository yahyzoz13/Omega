const { Client, Intents } = require('discord.js');
const { token, prefix } = require('./config.json');
const Discord = require("discord.js");
const { MessageActionRow, MessageButton, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const simplydjs = require('simply-djs')
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
});

client.on("ready", async () => {
  console.log(`${client.user.username} Is Online`);
  client.user.setStatus('idle')
  client.user.setActivity(`Storm Team ✨`)
})



// voice

client.login(process.env.token);
