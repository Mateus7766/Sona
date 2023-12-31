export const Portuguese = {
    commands: {
        cat: {
            name: 'cat',
            description: '🎈 Diversão ≫ Mostra um gato aleatório.'
        },
        dog: {
            name: 'dog',
            description: '🎈 Diversão ≫ Mostra um cachorro aleatório.'
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
        adddrawing: {
            name: "adddesenho",
            description: "👑 Dono ≫ Adiciona um novo desenho a base de desenhos do bot.",
            responses: {
                downloading: "Baixando a foto...",
                success: "O desenho foi adicionado!\nID: {{}}\n total: {{}} Documentos"
            },
            options: [{
                name: "imagem",
                description: "O arquivo do desenho pra ser adicionado."
            }, {
                name: "resposta",
                description: "A resposta para essa imagem."
            }, {
                name: "categoria",
                description: "A categoria em que a foto sem encaixa."
            }]
        },
        play: {
            name: "iniciar",
            description: "👑 Jogo ≫ Iniciar uma partida de acerto do desenho."
        },
        rank: {
            name: "placar",
            description: "🏆 Jogo ≫ Mostra os servidores com mais acertos",
            responses: {
                embedTitle: "🏆 SERVIDORES COM MAIS ACERTOS",
                embedDescription: "{{}} - **{{}}** Acertos"
            }
        }
    }
}