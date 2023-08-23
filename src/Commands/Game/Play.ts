import { Command } from "../../Sructures/Command";
import { AttachmentBuilder, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, User } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { Image } from "../../Database/Models/Image";
import { distance } from "fastest-levenshtein";
import { Guild } from "../../Database/Models/Guild";
import { string } from "yup";

const GuildsCache = new Map<string, boolean>()

class PlayCommand extends Command {
    data = new SlashCommandBuilder()
        .setName(English.commands.play.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.play.name,
        })
        .setDescription(English.commands.play.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.play.description,
        })
    async execute(interaction: ChatInputCommandInteraction) {
        if(GuildsCache.has(interaction.guild?.id as string)) return interaction.reply("❌ Já tem um jogo acontecendo nesse servidor")
        else GuildsCache.set(interaction.guild?.id as string, true)
        await interaction.deferReply()
        const guildDocument = await Guild.get(interaction.guild?.id as string)
        if(!guildDocument) return;

        const embed = new EmbedBuilder()
        .setColor("Blue")
            .setAuthor({
                iconURL: this.client.user?.displayAvatarURL({
                    size: 1024,
                }),
                name: "INICIANDO O JOGO, PREPARE-SE!"
            })
            .addFields({
                name: "Tema:", value: "Geral", inline: true
            }, {
                name: "Maior sequencia:", value: `**${guildDocument.drawingRecord}** acertos`, inline: true
            })
            .setFooter({
                text: `O ${this.client.user?.username} é de código aberto, confira em: https://github.com/VOTRON157/Sona`
            })
            .setThumbnail("https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F1073130442254987384.png%3Fv%3D1&w=64&q=75")
        await interaction.followUp({
            embeds: [embed],
        })


        const leaders = new Map<User, number>()
        let RODADA = 1
        const usedImages = new Set()

        async function startGame(){
            const image = await Image.randomImage("General", usedImages)
            if(!image) {
                interaction.channel?.send("Eita! Parece que os desenhos acabaram 😢.\n> Você sabe desenhar e quer que as outras pessoas tentem adivinhar oque você fez? otimo! você pode contribuir para o banco de dados de desenhos, contate <@792527247566307348> no privado.")
                endGame()
                return
            }
            const attachment = new AttachmentBuilder(Buffer.from(image.image.toString("base64"), "base64"), {
                name: image.path
            })

            usedImages.add(image._id.toString())

            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setAuthor({name: `${RODADA}º RODADA`, iconURL: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F961406973860020305.png%3Fv%3D1&w=64&q=75"})
            .setImage(`attachment://${image.path}`)
            .setFooter({
                iconURL: 'https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F1103852175827927060.png%3Fv%3D1&w=64&q=75',
                text: "Vocês tem 90 segs para acertar o desenho!"
            })

            interaction.channel?.send({
                files: [attachment],
                embeds: [embed]
            })

            const collector = interaction.channel?.createMessageCollector({ filter: (message) => message.author.id != process.env.CLIENTID && !message.author.bot, time: 90000 })
            .on("collect", (message) => {
                if(message.content.toLocaleLowerCase() == image.name.toLowerCase()){
                    if(leaders.has(message.author)) leaders.set(message.author, leaders.get(message.author) as number + 1)
                    else leaders.set(message.author, 1)
                    message.reply({
                        content: "⭐ Acertou!\n\n> **❗ Preparem-se para o proximo desenho em 5 segundos!**"
                    })
                    collector?.stop("1")
                } else if(distance(message.content.toLocaleLowerCase(), image.name.toLocaleLowerCase()) < 2) {
                    message.reply({
                        content: "🐼 Chegou perto!",
                    })
                }
            })
            .on("end", async (collected, reason) => {
                if(reason == "1"){
                    RODADA++
                    setTimeout(startGame, 5000) // acertou e começa de novo
                } else {
                    await endGame() // ngm acertou e acabou o tempo
                }
            })
        }

        startGame()

        async function endGame(){
            GuildsCache.delete(interaction.guild?.id as string)

            if(!guildDocument) return;

            const ordened = new Map([...leaders.entries()].sort())
            const acertos = Array.from(leaders.values()).reduce((soma, atual) => soma + atual, 0)

            if(guildDocument.drawingRecord || 0 < acertos) {
                guildDocument.drawingRecord = acertos
                await guildDocument.save()
                interaction.channel?.send("O recorde foi batido! 🏆")
            }

            let leadersMessage = ''
            ordened.forEach((points, user) => leadersMessage += `${user} - ${points} acerto(s)\n`)

        
            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setAuthor({
                name: "FIM DE RODADA"
            })
            .setDescription(`**Rank da rodada**\n${leadersMessage.length ? leadersMessage : "Niguém acertou nada 🥹"}`)
            .addFields({
                name: "Recorde do servidor", value: `**${guildDocument.drawingRecord}** acertos`, inline: true
            }, {
                name: "Acertos da ultima rodada", value: `**${acertos}** acertos`, inline: true
            })
            interaction.channel?.send({
                embeds: [embed]
            })

        }
    }
}

export default PlayCommand