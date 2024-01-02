import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, EmbedBuilder, GuildMember, Message, MessageCollector, SlashCommandBuilder, TextChannel, User } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";

class ForcaCommand extends Command {
    data = new SlashCommandBuilder()
        .setName(English.commands.forca.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.forca.name,
        })
        .setDescription(English.commands.forca.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.forca.description,
        })
    async execute(interaction: ChatInputCommandInteraction) {

        /* Quando eu escrevi isso só eu e Deus sabia como funcionava, agora só ele sabe */
        const word = await this.client.utils.getRandomWord(this.languagePrefix)
        if (!word) return await interaction.followUp(this.language.forca.responses.error)
        let clone = Array.from(word);
        const hint = (await this.client.utils.getDefinition(word, this.languagePrefix)) || this.language.forca.responses.hint;

        let display = new Array(word.length).fill('_');
        let wrongs = 0;
        let useds: string[] = []
        let stop = false;

        const filter = (message: Message) => message.author.id == interaction.user.id

        const loseMessage = () =>{
            const embed = new EmbedBuilder()
            .setColor('Red')
            .setDescription(this.t(this.language.forca.responses.lostMessage, word))
            interaction.followUp({
                embeds: [embed]
            })
        }
        const winMessage = () => {
            const embed = new EmbedBuilder()
            .setColor('Green')
            .setDescription(this.t(this.language.forca.responses.winMessage, word))
            interaction.followUp({
                embeds: [embed]
            })
        }

        const sendForca = () => {

            const embed = new EmbedBuilder()
                .setTitle(this.language.forca.responses.embedTitle)
                .setColor('Blue')
                .addFields({
                    name: this.language.forca.responses.embedLetter,
                    value: `\`${display.join(' ')}\``
                }, {
                    name: this.language.forca.responses.embedHint,
                    value: `\`${hint}\``
                }, {
                    name: this.language.forca.responses.embedTryss,
                    value: `\`${useds.length > 0 ? useds.join(', ') : this.language.forca.responses.embedNone}\``
                }, {
                    name: this.language.forca.responses.embedForca,
                    value: `\`\`\`
                    ___________
                   |     |
                   |     ${wrongs > 0 ? 'O' : ''}
                   |    ${wrongs > 2 ? '—' : ' '}${wrongs > 1 ? '|' : ''}${wrongs > 3 ? '—' : ''}
                   |    ${wrongs > 4 ? '/' : ''} ${wrongs > 5 ? '\\' : ''}
                   |
                   \`\`\``
                })
                

            interaction.followUp({
                embeds: [embed]
            })
        }

        while (!stop) { // Jogo
            if(display.join('') == word) {
                winMessage()
                stop = true
                continue
            }

            if(wrongs == 6) {
                loseMessage()
                stop = true;
                continue
            }

            sendForca()
            const collected = await interaction.channel?.awaitMessages({ filter, max: 1, time: 30 * 1000 }) // 30 segundos
            if (collected?.size) {
                const _try = collected.first()?.content;
                useds.push(_try as string)
                if (_try == word) {
                    winMessage()
                    stop = true;
                    continue;
                } else if (_try?.length == 1 && word.includes(_try)) {
                    while (clone.indexOf(_try) != -1) {
                        const index = clone.indexOf(_try);
                        display[index] = _try
                        clone[index] = '';
                    }
                } else {
                    wrongs++;
                }
            } else {
                loseMessage()
                stop = true
            }
        }
    }
}

export default ForcaCommand