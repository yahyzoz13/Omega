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
  client.user.setActivity(`@${client.user.username}`)
})



// voice
const { joinVoiceChannel } = require('@discordjs/voice');
client.on('ready', () => {
    
    setInterval( async () => {
    client.channels.fetch("1025146306353696788") 
     .then((channel) => { 
      const VoiceConnection = joinVoiceChannel({
       channelId: channel.id, 
       guildId: channel.guild.id, 
       adapterCreator: channel.guild.voiceAdapterCreator 
       });
    }).catch((error) => { return; });
    }, 1000)
});

client.login(process.env.token);
