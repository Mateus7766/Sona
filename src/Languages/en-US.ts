export const English = {
    events: {
        messageCreate: {
            mention: "Hi {{}}, I'm {{}}. To see my commands type {{}} on chat."
        },
        default: {
            defaultEmbedTitle: '{{}} | Music System'
        },
        trackStart: {
            success: 'Starting to play `{{}}`.'
        },
        queueEnd: {
            success: 'The song queue is empty, leaving the voice channel and destroying the player...'
        }
    },
    commands: {
        default: {
            stageChannel: "This channel type is not supported.",
            inVoiceChannel: 'You need to be connected to a voice channel.',
            isPlaying: 'There is no music playing.',
            sameVoiceChannel: 'You are in a different voice channel than mine.',
            defaultEmbedTitle: '{{}} | Music System'
        },
        playlist: {
            name: 'playlist',
            description: '🎶 Music ≫ Search for a playlist.',
            responses: {
                failed: 'Something went wrong, sorry.',
                matches: 'No results found for your search.',
                playlist: 'A playlist with `{{}}` songs has been added to the queue.',
            },
            options: [{
                name: 'playlist',
                description: '⭐ Opção ≫ The playlist name.'
            }]
        },
        clearqueue: {
            name: 'clearqueue',
            description: '🎶 Music ≫ Clears the music queue.',
            responses: {
                noMusic: 'Oops, there are no other songs in the queue, only the one you are currently listening to...',
                success: 'The song queue has been cleared.'
            }
        },
        help: {
            name: 'help',
            description: '💻 Normal ≫ Show my commands.',
            responses: {
                embedTitle: '{{}} | Help Command',
                fieldTitle: 'How i change the bot language?',
                fieldValue: 'It is not possible to change the language. **{{}}** automatically detects the correct language to respond to you and other members of the server.\n\nLanguage set for you: `{{}}`\nLanguage set for global messages: `{{}}`'
            }
        },
        remove: {
            name: 'remove',
            description: '🎶 Music ≫ Removes a song from the queue.',
            responses: {
                err: 'There is no song at that position.',
                success: 'The song `{{}}` has been removed from the queue.'
            },
            options: [{
                name: 'song_position',
                description: '⭐ Option ≫ the position of the song in the queue.'
            }]

        },
        filters: {
            name: 'filters',
            description: '🎶 Music ≫ Adds or removes an effect from the music.',
            responses: {
                disableMessage: 'If there was any filter, it has been removed.',
                enable: '🔊 The **{{}}** filter has been activated. If another one was active, it has been deactivated.\n\n```yaml\n{{}}```',
                welcome: 'Welcome to the filters panel. Please select the filter you want to activate, paying attention to their descriptions.',
                choice: 'Choice a filter.',
                disableDescr: 'Disable audio filters.',
                karaokeDescr: 'Removes the singer\'s voice, creating a karaoke effect on the audio.',
                tremoloDescr: 'Applies a tremolo effect to the audio, altering the amplitude of the sound waves.',
                vibratoDescr: 'Applies a vibrato effect to the audio, modulating the frequency of the sound waves.',
                bassboostDescr: 'Boosts the low tones in the audio for a bass boost effect.',
                nightcoreDescr: 'Speeds up the audio and adjusts the pitch to create a Nightcore effect, popular in electronic music.',
                superfastDescr: 'Adjusts the speed, pitch, and rate of the audio to create a super-fast playback effect.',
                errapeDescr: 'Applies an equalization effect specific to a style called "errape".',
                darthvaderDescr: 'Adjusts the speed, pitch, and rate of the audio to create an effect similar to Darth Vader\'s voice.',
                loveNightcoreDescr: 'Applies a Love Nightcore effect, a smoother variation of the Nightcore effect.',
                vaporewaveDescr: 'Applies a set of effects, including equalization and tremolo, to create a "Vaporewave" style.',
                partyDescr: 'Applies a specific equalizer effect to create a festive atmosphere in the audio.',
                disable: 'Disable',
                karaoke: 'Karaoke',
                tremolo: 'Tremolo',
                vibrato: 'Vibrato',
                bassboost: 'Bassboost',
                nightcore: 'Nightcore',
                superfast: 'Superfast',
                errape: 'Errape',
                darthvado: 'Darthvado',
                lovenightcore: 'Lovenightcore',
                vaporewave: 'Vaporewave',
                party: 'Party'
            }
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