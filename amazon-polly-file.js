// Load the SDK
const AWS = require('aws-sdk')
const Fs = require('fs')

// Create an Polly client
const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-west-1'
})

function Roast(VictimName, FirstBlood) {
    const roasts = [
        `${VictimName}, I suggest you go to Practice Mode to learn how to play. PLEASE! You suck balls my guy!`,
        `${VictimName}, go back to playing C S GO. Wait. Are you even good at C S GO?`,
        `${VictimName}, Can you like do something with your life other than League? You are legit trash`,
        "Oh my God. I cannot watch this game anymore. All of you are terrible.",
        `${VictimName} Just stop playing. Please.`,
        `Holy shit ${VictimName}. Can you land anything? Next game, kick ${VictimName}`,
        `God damn you are so fucking trash ${VictimName}`,
        `Wow ${VictimName}. You know it's a shame you play so much League but you are still trash.`,
        `${VictimName}, play any other game other than League, please.`,
        `Just don't play League again ${VictimName} Just please. I hate watching you play like shit.`,
        `You're a fucking piece of shit ${VictimName} . You know that?`,
        `Literally I can win in a one v one against you ${VictimName}. You are shit.`,
        `YOU. ARE. SHIT ${VictimName}`,
        `${VictimName}. Do something else with your life. Just not League.`,
        `${VictimName} Just stop. PLEASEEEEEE.`,
        `Get shit on ${VictimName}`,
        `God damn. you suck ${VictimName}`,
        `Get your kills up for crying out loud ${VictimName}`,
        `You are so... fucking... shit ${VictimName}`,
        `${VictimName} Stop playing. Just leave. The rest of your team does better without you feeding.`,
        `${VictimName} YOU. ARE. SHIT.`,
        `You have a peanut brain ${VictimName}`,
    ]
    const firstBloodRoast = "First Blood? Really? Wow you really suck. You fucking lost."

    if (FirstBlood) return firstBloodRoast

    return roasts[Math.floor(Math.random() * roasts.length)]
}

exports.pollySound = function pollySound(realFriendName, FirstBlood) {
    let newSound = false;

    let params = {
        'Text': Roast(realFriendName, FirstBlood),
        'OutputFormat': 'mp3',
        'VoiceId': 'Joanna'
    }

    console.log('Before Polly: ' + newSound);
    function getSound() {
        Polly.synthesizeSpeech(params, (err, data) => {
            if (err) {
                console.log(err.code)
            } else if (data) {
                if (data.AudioStream instanceof Buffer) {
                    Fs.writeFile("./speech.mp3", data.AudioStream, function (err) {
                        if (err) {
                            return console.log(err)
                        }
                        console.log("The file was saved!")
                        newSound = true;
                        console.log("After file saved: " + newSound)
                    })
                }
            }
        })
    }
    new Promise(getSound).then(() => {
        console.log("After Polly: " + newSound);
        return newSound;
    }).catch(err => console.log(err));
}