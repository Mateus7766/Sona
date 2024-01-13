export const Portuguese = {
    commands: {
        default: {
            stageChannel: 'Esse tipo de canal de voz não é suportado.',
            inVoiceChannel: 'Você precisa estar conectado em um canal de voz.',
            isPlaying: 'Não tem nenhuma música tocando.',
            sameVoiceChannel: 'Você está em um canal de voz diferente do meu.',
            defaultEmbedTitle: '{{}} | Sistema de música'
        },
        lavalink: {
            name: 'lavalink',
            description: '🎶 Música ≫ mostra informações sobre os servidores de música.'
        },
        join: {
            name: 'entrar',
            description: '🎶 Música ≫ Troca o canal onde a música ta tocando ou entra em um canal.',
            responses: {
                sameChannel: 'Eu já estou nesse canal.',
                diferentChannel: 'Saindo do canal {{}} e indo para o canal {{}}.',
                noChannel: 'Entrando no canal {{}}.'
            }
        },
        stop: {
            name: 'parar',
            description: '🎶 Música ≫ Para de tocar e sai do canal de voz.',
            responses: {
                stop: '💥 O player de música foi destruido.'
            }
        },
        nowplaying: {
            name: 'tocandoagora',
            description: '🎶 Música ≫ Mostra a música atual.'
        },
        pause: {
            name: 'pausar',
            description: '🎶 Música ≫ Pausa a música atual.',
            responses: {
                errEmbed: 'A música já está parada.',
                successEmbed: '⏸ Musica pausada.'
            }
        },
        resume: {
            name: 'retomar',
            description: '🎶 Música ≫ Retoma a tocar a música atual.',
            responses: {
                errEmbed: 'A música já está tocando.',
                successEmbed: '▶ Voltando a tocar'
            }
        },
        shuffle: {
            name: 'embaralhar',
            description: '🎶 Música ≫ Embaralha a ordem das músicas',
            responses: {
                errEmbed: 'Eita, não tem nenhuma música na fila, só essa que você ta ouvindo agora...',
                successEmbed: 'A fila foi embaralhada.'
            }
        },
        queue: {
            name: 'queue',
            description: '🎶 Música ≫ Mostra a lista de músicas deste servidor.',
            responses: {
                noMusic: 'Eita, não tem nenhuma música na fila, só essa que você ta ouvindo agora...',
                nextPage: 'Proxima página',
                prevPage: 'Página anterior',
                pages: 'Página {{}}',
                noTime: 'O tempo para interagir acabou.'
            }
        },
        play: {
            name: 'tocar',
            description: "🎶 Música ≫ Toca uma musica.",
            responses: {
                failed: 'Algo deu errado, perdão',
                matches: 'Não foi encontrado nenhum resultado para sua busca.',
                playlist: 'A playlist `{{}}` foi adicionada a fila.',
                song: 'A música `{{}}` foi adicionada a fila.'
            },
            options: [{
                name: 'musica',
                description: '⭐ Opção ≫ A musica que irá tocar.'
            }]
        },
        skip: {
            name: "pular",
            description: "🎶 Musica ≫ pula a música atual.",
            responses: {
                more: 'Foram puladas `{{}}` músicas.',
                less: 'A música foi pulada'
            },
            options: [{
                name: 'quatidade',
                description: '⭐ Opção ≫ A quantidade de músicas que você quer pular.'
            }]
        },
        volume: {
            name: "volume",
            description: "🎶 Music ≫ Troque o volume da música",
            responses: {
                volume: 'Volume alterado para `{{}}%`.'
            },
            options: [{
                name: 'volume',
                description: '⭐ Option ≫ Novo volume.'
            }]
        },
        info: {
            name: 'info',
            description: '💻 Normal ≫ Mostra informações sobre o Bot.',
            responses: {
                embedDescription: 'Prazer {{}}. Eu me chamo **{{}}**, fui desenvolvida usando TypeScript com muito amor :heart:! Tudo isso é possivel graças ao meu criador: <@792527247566307348>',
                embedTitle: "Informaçẽos sobre mim",
                fields: {
                    os: 'Sistema operacional',
                    core: 'Processador',
                    versionts: 'Versão do TypeScript',
                    versionnode: 'Versão do NodeJS',
                    versionds: 'Versão do discord.js',
                    cmdstotal: 'Total de comandos',
                    versionapi: 'Versão da API',
                    src: 'Código fonte'
                }
            }
        },
        ping: {
            name: "ping",
            description: "💻 Normal ≫ Mostra o meu ping.",
            responses: {
                embedTitle: "Latência do Bot",
                pingMessage: `🏓 O tempo de resposta foi de **{{}}ms**\n🐢 A latência da API é **{{}}ms**`
            }
        },
    }
}