const Discord = require('discord.js');
const bot = new Discord.Client();
let isReady = true;

const chokidar = require('chokidar');
const watcher = chokidar.watch('./speech.mp3');


//Bot Login Token
const token = '';

bot.on('ready', () => {
    console.log('This bot is online!');
});

bot.on('message', async msg => {
    if (isReady && msg.content === '/join') {
        isReady = false;
        if (msg.member.voice.channel) { // If person who sent /join is in a channel...
            const connection = await msg.member.voice.channel.join(); // Joins channel
            const getGame = require('./get-riotapi.js');
            getGame.gatherEvents;

            watcher.on('change', path => {
                console.log("Speech.mp3 file was changed!")
                const dispatcher = connection.play('./speech.mp3', { volume: 1 });
                dispatcher.resume();
            })
        } else {
            msg.reply("Join a voice channel you dumb bitch!");
        }
    }

    if (msg.content === '/leave') {
        isReady = false;
        if (msg.member.voice.channel) { // If person who sent /leave is in a channel...
            await msg.member.voice.channel.leave(); // Leaves channel
        } else {
            msg.reply("For some reason, I can't leave. Learn how to code Arshia!");
        }
    }

    if (msg.content === "HELLO") {
        msg.reply('HELLO FRIEND!');
    }
})

bot.login(token);