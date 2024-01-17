import { Command } from "../../Sructures/Command";
import {  SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { DefaultQueue, Player } from "vulkava";

export default new Command({
    data: new SlashCommandBuilder()
        .setName(English.commands.shuffle.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.shuffle.name
        })
        .setDescription(English.commands.shuffle.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.shuffle.description
        }),
    options: { inVoiceChannel: true, isPlaying: true, sameVoiceChannel: true },
    async execute({ interaction, language, client, formatMessage }) {
        if (!interaction.inCachedGuild()) return 0;
        const player = client.player.players.get(interaction.guild.id) as Player;

        const queue = player.queue as DefaultQueue;
        if (queue.size == 0) {
            const embed = new EmbedBuilder()
                .setAuthor({
                    iconURL: client.user?.displayAvatarURL(),
                    name: formatMessage(language.default.defaultEmbedTitle, client.user?.username)
                })
                .setColor('Yellow')
                .setDescription(language.shuffle.responses.errEmbed)
                .setTimestamp();

            await interaction.editReply({
                embeds: [embed]
            });

            return 0;
        }

        queue.shuffle();
        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: client.user?.displayAvatarURL(),
                name: formatMessage(language.default.defaultEmbedTitle, client.user?.username)
            })
            .setColor('White')
            .setDescription(language.shuffle.responses.successEmbed)
            .setTimestamp();

        await interaction.editReply({
            embeds: [embed]
        });
    }
});
