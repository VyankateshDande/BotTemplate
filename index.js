// Init env variables & import other libs
require('dotenv').config();
const fs = require('fs');

// Create Bot 
const { Client } = require('discord.js');

const bot = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"],
    allowedMentions: {
        repliedUser: false,
        roles: false,
        users: false
    },
    failIfNotExists: false,
});

// Import commands
const commandFolder = fs.readdirSync('./commands').filter(commandFile => commandFile.endsWith('.js'));
console.log(commandFolder);
bot.commands = new Map();
for (const commandFile of commandFolder) {
    const commandData = require(`./commands/${commandFile}`);
    bot.commands.set(commandData.name, commandData);
};

// Import other data
const dataFolder = fs.readdirSync('./data').filter(commandFile => commandFile.endsWith('.js'));

for (const dataFile of dataFolder) {
    const data = require(`./commands/${dataFile}`);
    bot[data.name] = data.data;
};

// Import handlers
const handlersFolder = fs.readdirSync('./handlers').filter(commandFile => commandFile.endsWith('.js'));

for (const handlerFile of handlersFolder) {
    const handlerData = require(`./handlers/${handlerFile}`);
    bot[handlerData.name] = handlerData.execute;
};

// Import other modules
bot.commontags = require('common-tags');
bot.ms = require('ms');

// Event handlers
bot.on('interactionCreate', interaction => {
    bot.commandHandler(interaction, bot)
});

bot.on('error', error => {
    console.log(error);
});

// Login
bot.login(process.env.TOKEN);