import { Player } from "vulkava";
import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";


class ResumeCommand extends Command {
    data = new SlashCommandBuilder()
        .setName(English.commands.resume.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.resume.name
        })
        .setDescription(English.commands.resume.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.resume.description
        })
    options = { inVoiceChannel: true, isPlaying: true, sameVoiceChannel: true }
    async execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.inCachedGuild()) return 0;
        const player = this.client.player.players.get(interaction.guild.id) as Player

        if (!player.paused) {
            const embed = new EmbedBuilder()
                .setAuthor({
                    iconURL: this.client.user?.displayAvatarURL(),
                    name: this.t(this.language.default.defaultEmbedTitle, this.client.user?.username)
                })
                .setColor('Yellow')
                .setDescription(this.language.resume.responses.errEmbed)
                .setTimestamp()

            interaction.editReply({
                embeds: [embed]
            })
        } else {
            player.pause(false)
            const embed = new EmbedBuilder()
                .setAuthor({
                    iconURL: this.client.user?.displayAvatarURL(),
                    name: this.t(this.language.default.defaultEmbedTitle, this.client.user?.username)
                })
                .setColor('Green')
                .setDescription(this.language.resume.responses.successEmbed)
                .setTimestamp()

            interaction.editReply({
                embeds: [embed]
            })
        }

    }
}

export default ResumeCommand;