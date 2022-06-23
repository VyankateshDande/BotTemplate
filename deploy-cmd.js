const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const clientId = process.env.CLIENT_ID

const commandFolder = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

let commands = []

for (const commandFile of commandFolder) {
    const { structure } = require(`./commands/${commandFile}`)
    commands.push(structure)
}

commands.map(command => command.toJSON())

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);