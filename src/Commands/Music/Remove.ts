import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { DefaultQueue, Player } from "vulkava";

class SkipCommand extends Command {
    data = new SlashCommandBuilder()
        .setName(English.commands.remove.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.remove.name
        })
        .setDescription(English.commands.remove.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.remove.description
        })
        .addNumberOption(option =>
            option.setName(English.commands.remove.options[0].name)
                .setNameLocalizations({
                    "pt-BR": Portuguese.commands.remove.options[0].name
                })
                .setDescription(English.commands.remove.options[0].description)
                .setDescriptionLocalizations({
                    "pt-BR": Portuguese.commands.remove.options[0].description
                })
                .setRequired(false))
    options = { inVoiceChannel: true, isPlaying: true, sameVoiceChannel: true };
    async execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.inCachedGuild()) return 0;
        const player = this.client.player.players.get(interaction.guild.id) as Player
        let position = interaction.options.getNumber(English.commands.remove.options[0].name, true)
        const queue = player.queue as DefaultQueue
        const track = queue.tracks[position - 1]

        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: this.client.user?.displayAvatarURL(),
                name: this.t(this.language.default.defaultEmbedTitle, this.client.user?.username)
            })
            .setColor('Yellow')
            .setDescription(this.language.resume.responses.errEmbed)
            .setTimestamp()

        if (!track) embed.setDescription(this.language.remove.responses.err)
        else {
            queue.tracks.splice(position - 1, 1)
            embed.setDescription(this.t(this.language.remove.responses.success, track.title))
        }

        await interaction.editReply({
            embeds: [embed]
        })
    }
}

export default SkipCommand