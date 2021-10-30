const axios = require("axios")

module.exports = async (message, command) => {
    const text = message.content.split(/\s/)
    const url = text[1]
    await axios.get(url)
    return command.reply || `Webhook to ${url} has triggered!!!`
}