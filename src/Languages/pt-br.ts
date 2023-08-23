export const Portuguese = {
    commands: {
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
        }
    }
}