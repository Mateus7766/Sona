import { Player } from "vulkava";
import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";


export default new Command({
    data: new SlashCommandBuilder()
        .setName(English.commands.resume.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.resume.name
        })
        .setDescription(English.commands.resume.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.resume.description
        }),
    options: { inVoiceChannel: true, isPlaying: true, sameVoiceChannel: true },
    async execute({ interaction, formatMessage, client, language }) {
        if (!interaction.inCachedGuild()) return 0;
        const player = client.player.players.get(interaction.guild.id) as Player

        if (!player.paused) {
            const embed = new EmbedBuilder()
                .setAuthor({
                    iconURL: client.user?.displayAvatarURL(),
                    name: formatMessage(language.default.defaultEmbedTitle, client.user?.username)
                })
                .setColor('Yellow')
                .setDescription(language.resume.responses.errEmbed)
                .setTimestamp()

            interaction.editReply({
                embeds: [embed]
            })
        } else {
            player.pause(false)
            const embed = new EmbedBuilder()
                .setAuthor({
                    iconURL: client.user?.displayAvatarURL(),
                    name: formatMessage(language.default.defaultEmbedTitle, client.user?.username)
                })
                .setColor('Green')
                .setDescription(language.resume.responses.successEmbed)
                .setTimestamp()

            interaction.editReply({
                embeds: [embed]
            })
        }
    }
})