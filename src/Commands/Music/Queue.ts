import { Command } from "../../Sructures/Command";
import { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { DefaultQueue, Player, Track, UnresolvedTrack } from "vulkava";

export default new Command({
    data: new SlashCommandBuilder()
        .setName(English.commands.queue.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.queue.name
        })
        .setDescription(English.commands.queue.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.queue.description
        }),
    options: { inVoiceChannel: false, isPlaying: true, sameVoiceChannel: false },
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
                .setDescription(formatMessage(language.queue.responses.noMusic))
                .setTimestamp();
            await interaction.editReply({
                embeds: [embed]
            });
            return 0;
        }

        let pages: (Track | UnresolvedTrack)[][] = [];
        for (let i = 0; i < queue.size; i += 10) {
            const tracks = queue.tracks.slice(i, i + 10);
            pages.push(tracks);
        }

        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: client.user?.displayAvatarURL(),
                name: formatMessage(language.default.defaultEmbedTitle, client.user?.username)
            })
            .setColor('White')
            .setDescription(pages[0].map((track, i) => `${i + 1}º - ${track.title}`).join('\n'))
            .setTimestamp()
            .setFooter({
                text: formatMessage(language.queue.responses.pages, `1/${pages.length}`)
            });

        const nextPage = new ButtonBuilder()
            .setEmoji('⏩')
            .setLabel(language.queue.responses.nextPage)
            .setStyle(ButtonStyle.Primary)
            .setCustomId('1');

        const previousPage = new ButtonBuilder()
            .setEmoji('⏪')
            .setLabel(language.queue.responses.prevPage)
            .setStyle(ButtonStyle.Primary)
            .setCustomId('2');

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(previousPage, nextPage);

        const message = await interaction.editReply({
            embeds: [embed],
            components: pages.length > 1 ? [row] : undefined
        });

        const collector = message.createMessageComponentCollector({
            filter: (i) => i.user.id === interaction.user.id,
            time: 60 * 1000,
            componentType: ComponentType.Button
        });

        let page = 0; // First page;

        collector.on('collect', async (i) => {
            await i.deferUpdate();
            if (i.customId == '1') page++;
            else if (i.customId == '2') page--;

            if (page > pages.length - 1) page = 0;
            else if (page < 0) page = pages.length - 1;

            embed.setDescription(pages[page].map((track, i) => `${((page + 1) * 10) - 10 + i + 1}º - ${track.title}`).join('\n'))
                .setFooter({
                    text: formatMessage(language.queue.responses.pages, `${page + 1}/${pages.length}`)
                });

            await interaction.editReply({
                embeds: [embed],
                components: [row]
            });
        })

            .on('end', async (collected, reason) => {
                row.components[0].setDisabled(true);
                row.components[1].setDisabled(true);

                await interaction.editReply({
                    embeds: [embed],
                    components: [row],
                    content: formatMessage(language.queue.responses.noTime)
                });
            });
    }
});
