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
        if (!word) return await interaction.followUp('Algo deu errado, desculpa...')
        let clone = Array.from(word);
        const hint = (await this.client.utils.getDefinition(word, this.languagePrefix)) || 'Sem dica.';
        let display = new Array(word.length).fill('_');
        let wrongs = 0;
        let useds: string[] = []
        let stop = false;
        const filter = (message: Message) => message.author.id == interaction.user.id

        // sendForca()

        while (!stop) {
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
            if (collected) {
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


        function loseMessage(){
            const embed = new EmbedBuilder()
            .setColor('Red')
            .setDescription(`😭 Que pena! O tempo esgotou ou você só não acertou mesmo (\`${word}\`).`)
            interaction.followUp({
                embeds: [embed]
            })
        }
        function winMessage() {
            const embed = new EmbedBuilder()
            .setColor('Green')
            .setDescription(`🥳 Parabeńs! Você acertou a palavra (\`${word}\`).`)
            interaction.followUp({
                embeds: [embed]
            })
        }

        function sendForca() {

            const embed = new EmbedBuilder()
                .setTitle(`Jogo da forca`)
                .setColor('Blue')
                .addFields({
                    name: 'Letras',
                    value: `\`${display.join(' ')}\``
                }, {
                    name: 'Dica',
                    value: `\`${hint}\``
                }, {
                    name: 'Tentativas',
                    value: `\`${useds.length > 0 ? useds.join(', ') : 'Nenhuma.'}\``
                }, {
                    name: 'Forca',
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
    }
}

export default ForcaCommand