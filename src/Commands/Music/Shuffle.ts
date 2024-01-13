import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { DefaultQueue, Player } from "vulkava";

class ShuffleCommand extends Command {
    data = new SlashCommandBuilder()
        .setName(English.commands.shuffle.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.shuffle.name
        })
        .setDescription(English.commands.shuffle.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.shuffle.description
        })
    options = { inVoiceChannel: true, isPlaying: true, sameVoiceChannel: true, };
    async execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.inCachedGuild()) return 0;
        const player = this.client.player.players.get(interaction.guild.id) as Player

        const queue = ((player.queue) as DefaultQueue)
        if (queue.size == 0) {
            const embed = new EmbedBuilder()
                .setAuthor({
                    iconURL: this.client.user?.displayAvatarURL(),
                    name: this.t(this.language.default.defaultEmbedTitle, this.client.user?.username)
                })
                .setColor('Yellow')
                .setDescription(this.language.shuffle.responses.errEmbed)
                .setTimestamp()
            await interaction.editReply({
                embeds: [embed]
            })
            return 0;
        }
        queue.shuffle()
        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: this.client.user?.displayAvatarURL(),
                name: this.t(this.language.default.defaultEmbedTitle, this.client.user?.username)
            })
            .setColor('White')
            .setDescription(this.language.shuffle.responses.successEmbed)
            .setTimestamp()
        await interaction.editReply({
            embeds: [embed]
        })
    }
}

export default ShuffleCommand