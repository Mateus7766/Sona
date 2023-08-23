export const English = {
    commands: {
        ping: {
            name: "ping",
            description: "💻 Normal ≫ Show my ping.",
            responses: {
                embedTitle: "Bot Latency",
                pingMessage: `🏓 Response time was **{{}}ms**\n🐢 API latency is **{{}}ms**`
            }
        },
        adddrawing: {
            name: "adddrawing",
            description: "👑 Owner ≫ Append a new drawing in the drawings base of the bot.",
            responses: {
                downloading: "Downloading the image...",
                success: "The drawing as ben sucefily added!\nID: {{}}\ntotal: {{}} Documents"
            },
            options: [{
                name: "image",
                description: "The file of picture for add."
            }, {
                name: "response",
                description: "The response for tghe image."
            }, {
                name: "category",
                description: "The category of image."
            }]
        },
        play: {
            name: "play",
            description: "🎲 Game ≫ Guess the drawing game begins."
        },
        rank: {
            name: "scoreboard",
            description: "🏆 Game ≫ Shows the servers with the correct answers",
            responses: {
                embedTitle: "🏆 SERVER WITH THE MOST CORRECT ANSWERS",
                embedDescription: "{{}} - **{{}}** correct answers"
            }
          }
    }
}