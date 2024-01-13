export const English = {
    commands: {
        default: {
            stageChannel: "This channel type is not supported.",
            inVoiceChannel: 'You need to be connected to a voice channel.',
            isPlaying: 'There is no music playing.',
            sameVoiceChannel: 'You are in a different voice channel than mine.',
            defaultEmbedTitle: '{{}} | Music System'
        },
        lavalink: {
            name: 'lavalink',
            description: '🎶 Music ≫ Show informations about music servers.'
        },
        join: {
            name: 'join',
            description: '🎶 Music ≫ Switches to the channel where the music is playing or joins a channel.',
            responses: {
                sameChannel: 'I am already in this channel.',
                diferentChannel: 'Leaving channel {{}} and joining channel {{}}.',
                noChannel: 'Joining channel {{}}.'
            }
        },
        stop: {
            name: 'stop',
            description: '🎶 Music ≫ Stop playing and leave the voice channel.',
            responses: {
                stop: '💥 The music player has been destroyed.'
            }
        },
        nowplaying: {
            name: 'nowplaying',
            description: '🎶 Music ≫ Displays the current song.'
        },
        pause: {
            name: 'pause',
            description: '🎶 Music ≫ Pauses the current song.',
            responses: {
                errEmbed: 'The music is already paused.',
                successEmbed: '⏸ Music paused.'
            }
        },
        resume: {
            name: 'resume',
            description: '🎶 Music ≫ Resumes playing the current song.',
            responses: {
                errEmbed: 'The music is already playing.',
                successEmbed: '▶ Resuming playback.'
            }
        },
        shuffle: {
            name: 'shuffle',
            description: '🎶 Music ≫ Shuffles the order of songs.',
            responses: {
                errEmbed: 'Oops, there are no other songs in the queue, only the one you are currently listening to...',
                successEmbed: 'The queue has been shuffled.'
            }
        },
        queue: {
            name: 'queue',
            description: '🎶 Music ≫ Shows the list of songs in this server.',
            responses: {
                noMusic: 'Oops, there are no other songs in the queue, only the one you are currently listening to...',
                nextPage: 'Next page',
                prevPage: 'Previous page',
                pages: 'Page {{}}',
                noTime: 'The time to interact has ended.'
            }
        },
        play: {
            name: 'play',
            description: "🎶 Music ≫ Plays a song.",
            responses: {
                failed: 'Something went wrong, sorry.',
                matches: 'No results found for your search.',
                playlist: 'The playlist `{{}}` has been added to the queue.',
                song: 'The song `{{}}` has been added to the queue.'
            },
            options: [{
                name: 'song',
                description: '⭐ Option ≫ The song to play.'
            }]
        },
        skip: {
            name: "skip",
            description: "🎶 Music ≫ Skips the current song.",
            responses: {
                more: '{{}} songs have been skipped.',
                less: 'The song has been skipped.'
            },
            options: [{
                name: 'quantity',
                description: '⭐ Option ≫ The number of songs you want to skip.'
            }]
        },
        volume: {
            name: "volume",
            description: "🎶 Music ≫ Change the volume of the music",
            responses: {
                volume: 'Volume changed to `{{}}%`.'
            },
            options: [{
                name: 'volume',
                description: '⭐ Option ≫ New volume.'
            }]
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
    }
}