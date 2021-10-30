require("dotenv").config()

const Sentry = require("./config/Sentry")

const Discord = require('discord.js');
const client = new Discord.Client()
const commandRepository = require("./respository/Command")
const commandMapper = require("./mapper/Command")
const actionCommands = require("./command/index")

let commands = {}

setInterval(() => {
    commandRepository.getCommands()
    .then(values => {
        commands = commandMapper(values)
    })
    .catch(Sentry.captureException)
}, 60000)

commandRepository.getCommands()
    .then(values => {
        commands = commandMapper(values)
    })
    .then(() => {
        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);
        });

        client.on('message', async message => {
            const command = message.content.split(/\s/)[0]
            if (command == "!help") {
                await message.channel.send(commands[command])
                return;
            }
            if (commands[command]) {
                const item = commands[command];
                const textReturned = await actionCommands[item.typeAction](message, item)
                await message.channel.send(textReturned)
            }
        });

        client.login(process.env.DISCORD_TOKEN);
    })
    .catch(Sentry.captureException)
