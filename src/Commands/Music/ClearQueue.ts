import { Command } from "../../Sructures/Command";
import { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ComponentType } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { Player } from "vulkava";

export default new Command({
    data: new SlashCommandBuilder()
        .setName(English.commands.clearqueue.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.clearqueue.name
        })
        .setDescription(English.commands.clearqueue.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.clearqueue.description
        }),
    options: {
        inVoiceChannel: true,
        sameVoiceChannel: true,
        isPlaying: true
    },
    async execute({ interaction, language, client, formatMessage }) {
        if (!interaction.inCachedGuild()) return;
        const player = client.player.players.get(interaction.guildId) as Player
        const queue = player.queue

        if (queue.size == 0) {
            const embed = new EmbedBuilder()
                .setAuthor({
                    iconURL: client.user?.displayAvatarURL(),
                    name: formatMessage(language.default.defaultEmbedTitle, client.user?.username)
                })
                .setColor('Yellow')
                .setDescription(formatMessage(language.clearqueue.responses.noMusic))
                .setTimestamp();
            await interaction.editReply({
                embeds: [embed]
            });
            return 0;
        }
        await queue.clear()
        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: client.user?.displayAvatarURL(),
                name: formatMessage(language.default.defaultEmbedTitle, client.user?.username)
            })
            .setColor('Green')
            .setDescription(formatMessage(language.clearqueue.responses.success))
            .setTimestamp();
        await interaction.editReply({
            embeds: [embed]
        });
    },
})