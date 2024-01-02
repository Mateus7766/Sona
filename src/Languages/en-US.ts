export const English = {
    commands: {
        forca: {
            name: 'hangman',
            description: '🎈 Fun ≫ Hangman game.',
            responses: {
                error: 'Something went wrong, sorry...',
                hint: 'No hint.',
                lostMessage: '😭 Too bad! Time ran out or you just didn\'t guess it. (`{{}}`)',
                winMessage: '🥳 Congratulations! You guessed the word. (`{{}}`)',
                embedTitle: 'Hangman Game',
                embedLetter: 'Letters',
                embedHint: 'Hint',
                embedTryss: 'Attempts',
                embedNone: 'None',
                embedForca: 'Hangman'
            }
        },        
        cat: {
            name: 'cat',
            description: '🎈 Fun ≫ Shows a random cat.'
        },        
        dog: {
            name: 'dog',
            description: '🎈 Fun ≫ Shows a random dog.'
        },        
        info: {
            name: 'info',
            description: '💻 Normal ≫ Displays information about the Bot.',
            responses: {
                embedDescription: 'Nice to meet you {{}}. My name is **{{}}**, and I was developed using TypeScript with lots of love :heart:! All of this is possible thanks to my creator: <@792527247566307348>',
                embedTitle: "Information about me",
                fields: {
                    os: 'Operating System',
                    core: 'Processor',
                    versionts: 'TypeScript Version',
                    versionnode: 'Node.js Version',
                    versionds: 'discord.js Version',
                    cmdstotal: 'Total Commands',
                    versionapi: 'API Version',
                    src: 'Source Code'
                }
            }
        },        
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