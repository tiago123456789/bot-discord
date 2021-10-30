const axios = require("axios")

module.exports = {

    getCommands() {
        return axios.get(
            process.env.API_URL_GET_COMMANDS,
            {
                headers: {
                    "apikey": process.env.API_KEY
                }
            }
        ).then(({ data }) => data)
    }
}