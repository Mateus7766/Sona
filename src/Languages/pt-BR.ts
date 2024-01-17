export const Portuguese = {
    events: {
        default: {
            defaultEmbedTitle: '{{}} | Sistema de música'
        },
        trackStart: {
            success: 'Começando a tocar `{{}}`.'
        },
        queueEnd: {
            success: 'A fila de músicas está vazia, saindo do canal de voz e destruindo o player...'
        }
    },
    commands: {
        default: {
            stageChannel: 'Esse tipo de canal de voz não é suportado.',
            inVoiceChannel: 'Você precisa estar conectado em um canal de voz.',
            isPlaying: 'Não tem nenhuma música tocando.',
            sameVoiceChannel: 'Você está em um canal de voz diferente do meu.',
            defaultEmbedTitle: '{{}} | Sistema de música'
        },
        playlist: {
            name: 'playlist',
            description: 'Procura por uma playlist',
            responses: {
                failed: 'Algo deu errado, perdão',
                matches: 'Não foi encontrado nenhum resultado para sua busca.',
                playlist: 'Uma playlist com `{{}}` músicas foi adicionada a fila.',
            },
            options: [{
                name: 'playlist',
                description: '⭐ Opção ≫ A musica que irá tocar.'
            }]
        },
        remove: {
            name: 'remover',
            description: '🎶 Música ≫ Remove uma música da fila.',
            responses: {
                err: 'Não tem nenhuma música nessa posição.',
                success: 'A música `{{}}` foi removida da fila.'
            },
            options: [{
                name: 'posicao_musica',
                description: '⭐ Option ≫ a posição da música na fila.'
            }]
        },
        filters: {
            name: 'filtros',
            description: '🎶 Música ≫ Adiciona ou remove um efeito da música.',
            responses: {
                disableMessage: 'Se tinha algum filtro, ele foi removido.',
                enable: 'O filtro **{{}}** foi ativado, se tinha outro ativo ele foi desativado.\n\n`{{}}`',
                welcome: 'Bem vindo ao painel de filtros, selecione o filtro que deseja ativar, preste atenção na descrição deles.',
                choice: 'Escolha um filtro',
                disableDescr: 'Desativar filtros de áudio.',
                karaokeDescr: 'Remove a voz do cantor, criando um efeito de karaoke no áudio.',
                tremoloDescr: 'Aplica um efeito de tremolo ao áudio, alterando a amplitude das ondas sonoras.',
                vibratoDescr: 'Aplica um efeito de vibrato ao áudio, modulando a frequência das ondas sonoras.',
                bassboostDescr: 'Aumenta os tons graves (baixos) no áudio para um efeito de reforço de graves.',
                nightcoreDescr: 'Acelera o áudio e ajusta o pitch para criar um efeito Nightcore, popular em músicas eletrônicas.',
                superfastDescr: 'Ajusta a velocidade, pitch e taxa do áudio para criar um efeito de reprodução super rápida.',
                errapeDescr: 'Aplica um efeito de equalização específico para um estilo chamado "errape".',
                darthvaderDescr: 'Ajusta a velocidade, pitch e taxa do áudio para criar um efeito similar à voz de Darth Vader.',
                loveNightcoreDescr: 'Aplica um efeito Love Nightcore, uma variação mais suave do efeito Nightcore.',
                vaporewaveDescr: 'Aplica um conjunto de efeitos, incluindo equalização e tremolo, para criar um estilo "Vaporewave".',
                partyDescr: 'Aplica um efeito equalizador específico para criar uma atmosfera festiva no áudio.',
                disable: 'Desativar',
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
                name: 'quantidade',
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