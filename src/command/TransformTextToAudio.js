const googleTTS = require('google-tts-api');
const Discord = require('discord.js');

module.exports = async (message, command) => {
    const text = message.content.split(/\s/)
    const textToTransformAudio = text.slice(1).join(" ")
    const audioBase64 = await googleTTS
        .getAudioBase64(textToTransformAudio, { lang: "pt", slow: true });
    const buffer = Buffer.from(audioBase64, "base64");
    return new Discord.MessageAttachment(buffer, "audio.mp3")
}
