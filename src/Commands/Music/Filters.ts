import { Command } from "../../Sructures/Command";
import {  SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ComponentType } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { Player } from "vulkava";

// Configurações dos filtros: https://github.com/Codes-nopr/erela.js-custom-filters/blob/main/plugin/plugin.js

export default new Command({
    data: new SlashCommandBuilder()
        .setName(English.commands.filters.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.filters.name
        })
        .setDescription(English.commands.filters.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.filters.description
        }),
    options: {
        inVoiceChannel: true,
        sameVoiceChannel: true,
        isPlaying: true
    },
    async execute({ interaction, language, client, formatMessage }) {
        if (!interaction.inCachedGuild()) return;
        const player = client.player.players.get(interaction.guildId) as Player

        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: client.user?.displayAvatarURL(),
                name: formatMessage(language.default.defaultEmbedTitle, client.user?.username)
            })
            .setColor('White')
            .setDescription(language.filters.responses.welcome)
            .setTimestamp()

        const select = new StringSelectMenuBuilder()
            .setCustomId('starter')
            .setPlaceholder(language.filters.responses.choice)
            .setMaxValues(1)
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel(language.filters.responses.disable)
                    .setValue('disable')
                    .setDescription(language.filters.responses.disableDescr)
                    .setEmoji('❌'),

                new StringSelectMenuOptionBuilder()
                    .setLabel(language.filters.responses.karaoke)
                    .setValue('karaoke')
                    .setDescription(language.filters.responses.karaokeDescr)
                    .setEmoji('🎤'),

                new StringSelectMenuOptionBuilder()
                    .setLabel(language.filters.responses.tremolo)
                    .setValue('tremolo')
                    .setDescription(language.filters.responses.tremoloDescr)
                    .setEmoji('🎸'),

                new StringSelectMenuOptionBuilder()
                    .setLabel(language.filters.responses.vibrato)
                    .setValue('vibrato')
                    .setDescription(language.filters.responses.vibratoDescr)
                    .setEmoji('🎶'),

                new StringSelectMenuOptionBuilder()
                    .setLabel(language.filters.responses.bassboost)
                    .setValue('bassboost')
                    .setDescription(language.filters.responses.bassboostDescr)
                    .setEmoji('🔊'),

                new StringSelectMenuOptionBuilder()
                    .setLabel(language.filters.responses.nightcore)
                    .setValue('nightcore')
                    .setDescription(language.filters.responses.nightcoreDescr)
                    .setEmoji('⚡'),

                new StringSelectMenuOptionBuilder()
                    .setLabel(language.filters.responses.superfast)
                    .setValue('superfast')
                    .setDescription(language.filters.responses.superfastDescr)
                    .setEmoji('⏩'),

                new StringSelectMenuOptionBuilder()
                    .setLabel(language.filters.responses.errape)
                    .setValue('errape')
                    .setDescription(language.filters.responses.errapeDescr)
                    .setEmoji('🎛️'),

                new StringSelectMenuOptionBuilder()
                    .setLabel(language.filters.responses.darthvado)
                    .setValue('darthvado')
                    .setDescription(language.filters.responses.darthvaderDescr)
                    .setEmoji('🌑'),

                new StringSelectMenuOptionBuilder()
                    .setLabel(language.filters.responses.lovenightcore)
                    .setValue('lovenightcore')
                    .setDescription(language.filters.responses.loveNightcoreDescr)
                    .setEmoji('💖'),

                new StringSelectMenuOptionBuilder()
                    .setLabel(language.filters.responses.vaporewave)
                    .setValue('vaporewave')
                    .setDescription(language.filters.responses.vaporewaveDescr)
                    .setEmoji('🌊'),

                new StringSelectMenuOptionBuilder()
                    .setLabel(language.filters.responses.party)
                    .setValue('party')
                    .setDescription(language.filters.responses.partyDescr)
                    .setEmoji('🎉')
            );
        const row = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(select);


        const message = await interaction.editReply({
            embeds: [embed],
            components: [row]
        })

        message.createMessageComponentCollector({
            componentType: ComponentType.StringSelect, time: 100 * 1000, filter: (i) => i.user.id == interaction.user.id
        })
            .on('collect', async (i) => {
                await i.deferReply()

                player.filters.clear()
                switch (i.values[0]) {
                    case 'disable':
                        player.filters.clear()
                        break
                    case 'karaoke':
                        player.filters.setKaraoke({
                            level: 1.0,
                            monoLevel: 1.0,
                            filterBand: 220.0,
                            filterWidth: 100.0,
                        })
                        break
                    case 'tremolo':
                        player.filters.setTremolo({
                            frequency: 10,
                            depth: 0.5
                        })
                        break
                    case 'vibrato':
                        player.filters.setVibrato({
                            frequency: 10,
                            depth: 0.9
                        })
                        break
                    case 'bassboost':
                        player.filters.setEqualizer([0.1875, 0.375, -0.375, -0.1875, 0, -0.0125, -0.025, -0.0175, 0, 0, 0.0125, 0.025, 0.375, 0.125, 0.125])
                        break
                    case 'nightcore':
                        player.filters.setTimescale({
                            speed: 1.3,
                            pitch: 1.3,
                            rate: 1.0
                        })
                        break
                    case 'superfast':
                        player.filters.setTimescale({
                            speed: 1.5010,
                            pitch: 1.2450,
                            rate: 1.9210
                        })
                        break
                    case 'errape':
                        player.filters.setEqualizer([0.25, 0.5, -0.5, -0.25, 0, -0.025, -0.0175, 0, 0, 0.0125, 0.025, 0.375, 0.125, 0.125])
                        break
                    case 'darthvado':
                        player.filters.setTimescale({
                            speed: 0.975,
                            pitch: 0.5,
                            rate: 0.8
                        })
                        break
                    case 'lovenightcore':
                        player.filters.setTimescale({
                            speed: 1.1,
                            pitch: 1.2,
                            rate: 1.0
                        })
                        break
                    case 'vaporewave':
                        player.filters.set({
                            equalizer: [0.3, 0.3],
                            timescale: { pitch: 0.5 },
                            tremolo: { depth: 0.3, frequency: 14 }
                        })
                        break
                    case 'party':
                        player.filters.setEqualizer([-1.16, 0.28, 0.42, 0.5, 0.36, 0, -0.3, -0.21, -0.21])
                        break
                }
                const desc = i.component.toJSON().options.find(option => option.value == i.values[0])?.description
                if (i.values[0] == 'desativar') await i.followUp(language.filters.responses.disableMessage)
                else await i.followUp(formatMessage(language.filters.responses.enable, i.values[0], desc))
            })
            .on('end', async () => {
                row.components[0].setDisabled(true)
                await interaction.editReply({
                    embeds: [embed],
                    components: [row]
                })
            })
    },
})