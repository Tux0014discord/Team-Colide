const Discord = require('discord.js');

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

const prefix = '-';

const fs = require('fs');
const { CLIENT_RENEG_WINDOW } = require('tls');

const memberCounter = require('./counters/member-counter');     

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Venour Bot is ONLINE!');
    memberCounter(client);
});

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === '• Community | #Emerge •');

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('912252569521385478').messageCreate(`Welcome <@${guildMember.user.id}> to Team Emerge we hope you enjoy your stay!`)
})

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
      client.commands.get('ping').execute(message, args);
    } else if (command === 'youtube'){
       client.commands.get('youtube').execute(message, args);
    } else if (command === 'kick'){
        client.commands.get('kick').execute(message, args);
    } else if (command === 'ban'){
        client.commands.get('ban').execute(message, args);
    } 
});


client.login('OTEyMjU1NzM0MDI3Mjc2MzE5.YZtSWw.yIwsIE184J4QLy04ideA46Kwkro');