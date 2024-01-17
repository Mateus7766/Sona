import { Command } from "../../Sructures/Command";
import {  SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { DefaultQueue, Player } from "vulkava";

export default new Command({
    data: new SlashCommandBuilder()
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
                .setRequired(true)),
    options: { inVoiceChannel: true, isPlaying: true, sameVoiceChannel: true },
    async execute({ interaction, language, client, formatMessage }) {
        if (!interaction.inCachedGuild()) return 0;
        const player = client.player.players.get(interaction.guild.id) as Player;
        let position = interaction.options.getNumber(English.commands.remove.options[0].name, true);
        const queue = player.queue as DefaultQueue;
        const track = queue.tracks[position - 1];

        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: client.user?.displayAvatarURL(),
                name: formatMessage(language.default.defaultEmbedTitle, client.user?.username)
            })
            .setColor('Yellow')
            .setDescription(formatMessage(language.resume.responses.errEmbed))
            .setTimestamp();

        if (!track) embed.setDescription(formatMessage(language.remove.responses.err));
        else {
            queue.tracks.splice(position - 1, 1);
            embed.setDescription(formatMessage(language.remove.responses.success, track.title));
        }

        await interaction.editReply({
            embeds: [embed]
        });
    }
});
