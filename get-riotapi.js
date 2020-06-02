process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const getSound = require('./amazon-polly-file.js');
const friends = require('./friends.json');

const Discord = require('discord.js');
const bot = new Discord.Client();

const https = require('https');
const localgame = {
    hostname: 'localhost',
    port: 2999,
    path: '/liveclientdata/eventdata',
    method: 'GET'
}

let jsonData;
let currentEventsLength;
let eventsLength = 0;

function request() {
    https.request(localgame, response => {
        console.log(`statusCode: ${response.statusCode}`)
        let data = '';

        response.on('data', chunk => {
            data += chunk;
        })

        //Data coming back
        response.on('end', () => {
            jsonData = JSON.parse(data);
            currentEventsLength = JSON.parse(data).Events.length;
            console.log(currentEventsLength);
        })
    }).on('error', error => {
        console.error(error)
    }).end();
}

function getNewEvents() {
    request();
    if (currentEventsLength > eventsLength) {
        console.log("Event happened!");
        // console.log(jsonData);
        eventsLength = currentEventsLength;
        if (jsonData.Events[eventsLength - 1].EventName == "ChampionKill") {
            let VictimName = jsonData.Events[eventsLength - 1].VictimName;
            console.log(VictimName + " has died. What a loser.");
            if (friends.friends.includes(VictimName)) {
                let realNameIndex = friends.friends.indexOf(VictimName) + 1;
                let realFriendName = friends.friends[realNameIndex];
                console.log("Your friend " + realFriendName + " has died!");
                getSound.pollySound(realFriendName); //Takes times
            }
        } else if (jsonData.Events[eventsLength - 1].EventName == "FirstBlood") {
            console.log("First Blood Event Happened!")
            let VictimName = jsonData.Events[eventsLength - 2].VictimName;
            console.log(VictimName + " has died. What a loser.");
            if (friends.friends.includes(VictimName)) {
                let realNameIndex = friends.friends.indexOf(VictimName) + 1;
                let realFriendName = friends.friends[realNameIndex];
                console.log("Your friend " + realFriendName + " has died!");
                getSound.pollySound(realFriendName, true); //Takes times

                // } else if (jsonData.Events[eventsLength-1].EventName == "Ace") {
                //     console.log("Ace Event Happened!")
            } else {
                console.log("Some other event happened")
            }
        }
    }
}
exports.gatherEvents = setInterval(getNewEvents, 1200);