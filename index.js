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

            client.on("messageCreate", message => {
                if (message.content.startsWith(prefix + "ping")) {
                  let time = Date.now() - message.createdTimestamp
                const em = new Discord.MessageEmbed()
                  .setTitle(`**Bot Ping**`)
                    .setColor("RANDOM") 
                    .setDescription(`**:stopwatch: WS : ${client.ws.ping}
              :hourglass: Time : ${time}**`)
              .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setTimestamp()
                 message.channel.send({ embeds: [em] });
                }
              });

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
//lock and unlock
client.on('messageCreate', async RAIDxCoder => {
  if (RAIDxCoder.content.startsWith(prefix + 'help')) {
    const EMBED = new Discord.MessageEmbed()
      .setDescription(`
**
- .user     : View About of Yourself or User
- .banner   : View Banner of Yourself or User
- .server   : View Information About the Server
- .bot      : View Information About ProManager Prime
- .avatar   : View Avatar of Yourself or User
- .members  : To Show Members Status
- .ban      : Ban User from the Server
- .unban    : Remove Ban from the Server
- .clear    : Clean Chat Messages
- .come     : Invite Member to your Own Channel
- .lock     : Lock Text/Channel Channel
- .unlock   : Unlock Text/Voice Channel
- .calc     : to Use Calculator
- .hide     : Hide Text/Voice Channel 
- .show     : Show Text/Voice Channel
- .roles    : View Server Roles
- .nick     : Change Member Nickname
**`)
      .setFooter(`Requested by ${RAIDxCoder.author.tag}`, RAIDxCoder.author.displayAvatarURL({ dynamic: true }))
    RAIDxCoder.channel.send({ embeds: [EMBED] })
  }
})
/////Server Code

client.on('messageCreate', async RAIDxCoder => {
  if (RAIDxCoder.content.startsWith(prefix + 'server')) {
    let Verification = { NONE: '0', LOW: '1', MEDIUM: '2', HIGH: '3', VERY_HIGH: '4' }
    let Text = await RAIDxCoder.guild.channels.cache.filter(Ch => Ch.type === 'GUILD_TEXT').size;
    let Voice = await RAIDxCoder.guild.channels.cache.filter(Ch => Ch.type === 'GUILD_VOICE').size;
    let Category = await RAIDxCoder.guild.channels.cache.filter(Ch => Ch.type === 'GUILD_CATEGORY').size;
    let Embed = new Discord.MessageEmbed()
    Embed.setThumbnail(RAIDxCoder.guild.iconURL({ dynamic: true }))
    Embed.setColor()
    Embed.addField(':id: Server ID', RAIDxCoder.guild.id, true)
    Embed.addField(':calendar: Created On', `**<t:${parseInt(RAIDxCoder.guild.createdAt / 1000)}:R>**`, true)
    Embed.addField(':crown: Owned by', `<@${RAIDxCoder.guild.ownerId}>`, true)
    Embed.addField(`:busts_in_silhouette: Members (${RAIDxCoder.guild.memberCount})`, `**${RAIDxCoder.guild.members.cache.filter(users => ['dnd', 'online', 'idle'].includes(users.presence?.status)).size}** Online\n**${RAIDxCoder.guild.premiumSubscriptionCount}** Boosts :sparkles:`, true)
    Embed.addField(`:speech_balloon: Channels (${RAIDxCoder.guild.channels.cache.size})`, `**${Text}** Text | **${Voice}** Voice\n**${Category}** Categories`, true)
    Embed.addField(':earth_africa: Others', `**Verification Level:** ${Verification[RAIDxCoder.guild.verificationLevel]}`, true)
    Embed.addField(`:closed_lock_with_key: Roles (${RAIDxCoder.guild.roles.cache.size})`, `To see a list with all roles use **${prefix}roles**`)
    RAIDxCoder.channel.send({ embeds: [Embed] })
  }
})
///User Code

client.on('messageCreate', async RAIDxCoder => {
  if (RAIDxCoder.content.startsWith(prefix + 'user')) {
    const args = await RAIDxCoder.content.split(' ').slice(1)
    const User = await RAIDxCoder.mentions.members.first() || await RAIDxCoder.guild.members.cache.get(args[0])
    const Yourself = new Discord.MessageEmbed()
    Yourself.setAuthor(RAIDxCoder.author.tag, RAIDxCoder.author.displayAvatarURL({ dynamic: true }))
    Yourself.setThumbnail(RAIDxCoder.author.displayAvatarURL({ dynamic: true }))
    Yourself.addField('Joined Discord', `**<t:${parseInt(RAIDxCoder.author.createdAt / 1000)}:f>**`, true)
    Yourself.addField('Joined Server', `**<t:${parseInt(RAIDxCoder.member.joinedAt / 1000)}:f>**`, true)
    Yourself.setFooter(`Requested by ${RAIDxCoder.author.tag}`, RAIDxCoder.author.displayAvatarURL({ dynamic: true }))
    if (!User) return RAIDxCoder.channel.send({ embeds: [Yourself] })
    const Member = new Discord.MessageEmbed()
    Member.setAuthor(User.user.tag, User.user.displayAvatarURL({ dynamic: true }))
    Member.setThumbnail(User.user.displayAvatarURL({ dynamic: true }))
    Member.addField('Joined Discord', `**<t:${parseInt(User.user.createdAt / 1000)}:f>**`, true)
    Member.addField('Joined Server', `**<t:${parseInt(User.joinedAt / 1000)}:f>**`, true)
    Member.setFooter(`Requested by ${RAIDxCoder.author.tag}`, RAIDxCoder.author.displayAvatarURL({ dynamic: true }))
    if (User) return RAIDxCoder.channel.send({ embeds: [Member] })
  }
})
// Clear

client.on('messageCreate', async RAIDxCoder => {
  if (RAIDxCoder.content.startsWith(prefix + 'clear')) {
    if (!RAIDxCoder.member.permissions.has('MANAGE_MESSAGES')) return RAIDxCoder.channel.send({ content: `**${RAIDxCoder.author}, You Don't have any Permissions**` })
    const args = await RAIDxCoder.content.slice(prefix.length).trim().split(/ +/g)
    if (!args[1]) args[1] = 100;
    let Channel = await RAIDxCoder.channel;
    await Channel.bulkDelete(args[1]).then(async message => {
      client.channels.cache.get(Channel.id).send(`\`\`\`I Cleared ${message.size} Message in this Channel!\`\`\``).then(msg => setTimeout(() => { msg.delete(), 20000 }))
    })
  }
})
// Lock 

client.on('messageCreate', async message => {
  if (message.content.startsWith(prefix + 'lock')) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) return;
    const Channel = message.mentions.channels.first() || message.channel;
    if (!Channel) return;


    if (Channel.type === 'GUILD_TEXT') {
      Channel.permissionOverwrites.edit(message.guild.id, {
        SEND_MESSAGES: false
      })
    }

    if (Channel.type === 'GUILD_VOICE') {
      Channel.permissionOverwrites.edit(message.guild.id, {
        CONNECT: false
      })
    }

    message.channel.send({ content: `:lock: ${Channel} has been Locked!` })
  }
})

///Unlock Code

client.on('messageCreate', async message => {
  if (message.content.startsWith(prefix + 'unlock')) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) return;
    const Channel = message.mentions.channels.first() || message.channel;
    if (!Channel) return;


    if (Channel.type === 'GUILD_TEXT') {
      Channel.permissionOverwrites.edit(message.guild.id, {
        SEND_MESSAGES: true
      })
    }

    if (Channel.type === 'GUILD_VOICE') {
      Channel.permissionOverwrites.edit(message.guild.id, {
        CONNECT: true
      })
    }

    message.channel.send({ content: `:unlock: ${Channel} has been Unlocked!` })
  }
})
///Avatar Code

client.on('messageCreate', async RAIDxCoder => {
  if (RAIDxCoder.content.startsWith(prefix + 'avatar')) {
    const args = RAIDxCoder.content.slice(prefix.length).trim().split(' ')
    if (args[0] === 'server') {
      const Embed = new Discord.MessageEmbed()
        .setTitle('Avatar URL')
        .setURL(RAIDxCoder.guild.iconURL({ dynamic: true, size: 4096 }))
        .setImage(RAIDxCoder.guild.iconURL({ dynamic: true, size: 4096 }))
        .setFooter(`Requested By ${RAIDxCoder.author.tag}`, RAIDxCoder.author.displayAvatarURL({ dynamic: true }))
      RAIDxCoder.channel.send({ embeds: [Embed] })
    } else {
      const user = RAIDxCoder.mentions.users.first() || RAIDxCoder.author;
      const Embed = new Discord.MessageEmbed()
        .setTitle('Avatar URL')
        .setURL(user.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setFooter(`Requested By ${RAIDxCoder.author.tag}`, RAIDxCoder.author.displayAvatarURL({ dynamic: true }))
      RAIDxCoder.channel.send({ embeds: [Embed] })
    }
  }
})

///Banner Code

client.on('messageCreate', async RAIDxCoder => {
  if (RAIDxCoder.content.startsWith(prefix + 'banner')) {
    const user = RAIDxCoder.mentions.users.first() || RAIDxCoder.author;
    try {
      await client.users.fetch(user)
    } catch (error) {
      return console.log(error)
    }

    const fetchUser = await client.users.fetch(user)
    await fetchUser.fetch()
    if (user.bot) return RAIDxCoder.channel.send({ content: 'Bots Dont Have Banners' })
    const Embed = new Discord.MessageEmbed()
      .setTitle('Banner URL')
      .setImage(fetchUser.bannerURL({ dynamic: true, size: 4096 }))
      .setURL(fetchUser.bannerURL({ dynamic: true, size: 4096 }))
      .setFooter(`Requested By ${RAIDxCoder.author.tag}`, RAIDxCoder.author.displayAvatarURL({ dynamic: true }))
    RAIDxCoder.channel.send({ embeds: [Embed] })
  }
});
//ban
client.on("messageCreate", async message => {
  if (message.author.bot) return;
  let c = message.content.split(' ')
  if (c[0] == prefix + 'ban') {

    if (!message.member.permissions.has("BAN_ROLES")) return message.reply(`** 😕 You don't have permission **`);
    if (!message.guild.me.permissions.has('BAN_ROLES')) return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position. **`);

    let argss = message.content.split(' ')
    let user = message.guild.members.cache.get(argss[1]) || message.mentions.members.first();
    if (!user) return message.reply(`** 😕 Please mention or id **`);
    if (user.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.fetchOwner().id) return message.reply(`** ❌ You can't ban this user**`);

    if (!user.bannable) return message.reply(`** ❌ You can't ban this user**`);
    await user.ban().catch(err => { console.log(err) });
    await message.reply(`✅ **${user.user.tag} banned from the serve.**✈️`);
  }
})
// unban
client.on("messageCreate", async message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'unban')) {

    if (!message.member.permissions.has("BAN_ROLES")) return message.reply(`** 😕 You don't have permission **`);
    if (!message.guild.me.permissions.has('BAN_ROLES')) return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position. **`);

    let args = message.content.split(' ')
    let id = args[1];
    if (!id) return message.reply(`** 😕 Please mention or id **`);
    if (isNaN(id)) {
      return message.reply(`** 😕 Please mention or id **`);
    } else {
      message.guild.members.unban(id).then(mmm => {
        message.reply(`✅ ** ${mmm.tag} unbanned!**`)
      }).catch(err => message.reply(`**I can't find this member in bans list**`));
    }
  }
})
// Nick
client.on('messageCreate', async RAIDxCoder => {
  if (RAIDxCoder.content.startsWith(prefix + 'nick')) {
    if (!RAIDxCoder.member.permissions.has('MANAGE_NICKNAMES')) return await RAIDxCoder.channel.send({ content: `**${RAIDxCoder.author}, You Don't have any Permissions**` })
    const Args = await RAIDxCoder.content.slice(prefix.length).trim().split(/ +/g)
    const User = await RAIDxCoder.mentions.members.first()
    if (!User) return await RAIDxCoder.channel.send({ content: `**${RAIDxCoder.author}, Please Mention a Member**` })
    const Nickname = await Args.slice(2).join(' ')
    if (!Nickname) return await RAIDxCoder.channel.send({ content: `**${RAIDxCoder.author}, Please Enter a new Nickname**` })
    const Member = await RAIDxCoder.guild.members.cache.get(User.id)
    await Member.setNickname(Nickname)
    await RAIDxCoder.channel.send({ content: `**${User.user.username}'s** Nick has been Changed to ${Nickname}!` })
  }
})
///Server Roles Code

client.on('messageCreate', async RAIDxCoder => {
  if (RAIDxCoder.content.startsWith(prefix + 'roles')) {
    let Roles = '```';
    let RoleName = await RAIDxCoder.guild.roles.cache.map(Role => Role.name)
    let Space = await RoleName.reduce((long, str) => Math.max(long, str.length), 0)
    RAIDxCoder.guild.roles.cache.forEach(Role => {
      Roles += `${Role.name}${' '.repeat(Space - Role.name.length)} : ${Role.members.size} Member\n`;
    })
    Roles += '```';
    RAIDxCoder.channel.send(Roles)
  }
})

///Bot Information Code

client.on('messageCreate', RAIDxCoder => {
  if (RAIDxCoder.content.startsWith(prefix + 'bot')) {
    const Embed = new Discord.MessageEmbed()
      .setColor()
      .setTitle('About Bot')
      .addField('Bot Name', `**${client.user.username}**`)
      .addField('Prefix', `**${prefix}**`)
      .addField('Developers ', `<@961013398693380169> `)
    RAIDxCoder.channel.send({ embeds: [Embed] })
  }
})

///come code

client.on('messageCreate', async RAIDxCoder => {
  if (RAIDxCoder.content.startsWith(prefix + 'come')) {
    const User = await RAIDxCoder.mentions.members.first()
    if (!User) return RAIDxCoder.channel.send({ content: '**Mention a User**' })
    if (User.id === RAIDxCoder.author.id) return RAIDxCoder.react('❌')
    RAIDxCoder.react('✅')
    User.send({ content: `**Hello , ${User.user.username}, Please Come to ${RAIDxCoder.channel} for ${RAIDxCoder.author}**` })
  }
})
///Calculator Code

client.on('messageCreate', message => {
  if (message.content.startsWith(prefix + 'calc')) {
    simplydjs.calculator(message)
  }
})
// show hide
client.on("messageCreate", message => {
  if (message.content === prefix + "hide") {
    if (message.author.bot || !message.guild) return;
    if (!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply(`** 😕 You don't have permissions **`);

    if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`);

    let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
    message.channel.permissionOverwrites.edit(everyone, {
      VIEW_CHANNEL: false
    }).then(() => {
      message.reply(`**✅ ${message.channel} Done hide this room.**`)
    })
  }
});

client.on("messageCreate", message => {
  if (message.content === prefix + "show") {
    if (message.author.bot || !message.guild) return;
    if (!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply(`** 😕 You don't have permissions **`);

    if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`);

    let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
    message.channel.permissionOverwrites.edit(everyone, {
      VIEW_CHANNEL: true
    }).then(() => {
      message.reply(`**✅ ${message.channel} Done show this room.**`)
    })
  }
});


// members
client.on('messageCreate', async message => {
  if (message.content == prefix + 'members') {
    let online = message.guild.members.cache.filter(members => members.user.bot === false && members.presence?.status === 'online').size
    let dnd = message.guild.members.cache.filter(members => members.user.bot === false && members.presence?.status === 'dnd').size
    let offline = message.guild.members.cache.filter(members => members.user.bot === false && members.presence?.status === 'offline').size
    let idle = message.guild.members.cache.filter(members => members.user.bot === false && members.presence?.status === 'idle').size
    let members = message.guild.members.cache.filter(members => members.user.bot === false).size
    const embed = new Discord.MessageEmbed()
      .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) })
      .setColor('BLUE')
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addField('Members', `**\`${members}\`**`, true)
      .addField('Online', `**\`${online}\`**`, true)
      .addField('DND', `**\`${dnd}\`**`, true)
      .addField('Idle', `**\`${idle}\`**`, true)
      .addField('Offline', `**\`${offline}\`**`, true)
      .setTimestamp()
    message.reply({ embeds: [embed] })
  }
});


 
client.on('messageCreate', async message => {
  if (message.content == prefix + 'invite') {
const row = new MessageActionRow().addComponents(
      new MessageButton()        
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=999418236108017744&permissions=8&scope=bot%20applications.commands`)
        .setLabel("ProManager Prime Invite")
            .setStyle("LINK")
    )
    const row1 = new MessageActionRow().addComponents(
      new MessageButton()        
        .setURL(`https://discord.gg/yZxDXbysVz`)
        .setLabel("ProManager Prime Support")
            .setStyle("LINK")
    )   

    message.reply({ content: `My prefix is \`.\` 
    Commands list at https://promanager.tk/commands
    Dashboard at https://promanager.tk/
    Looking for support? https://discord.gg/yZxDXbysVz`, components: [row, row1] })
  }
  });

client.login(token);