const getHelpCommands = (commands) => {
    let help = ""
    Object.keys(commands).map(key => {
        help += `**Command**: ${key} | **${commands[key].description}** \n`
    })

    return help
}

module.exports = (commands) => {
    const commandsMapped = {}

    commands.map(item => {
        commandsMapped[item.command] = item
    })

    commandsMapped["!help"] = getHelpCommands(commandsMapped);

    return commandsMapped
}