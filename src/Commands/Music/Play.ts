import { Command } from "../../Sructures/Command";
import { SlashCommandBuilder, EmbedBuilder, ColorResolvable } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { DefaultQueue } from "vulkava";
import { getVideo } from 'ytubes'

export default new Command({
    data: new SlashCommandBuilder()
        .setName(English.commands.play.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.play.name
        })
        .setDescription(English.commands.play.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.play.description
        })
        .addStringOption(option =>
            option.setName(English.commands.play.options[0].name)
                .setNameLocalizations({
                    "pt-BR": Portuguese.commands.play.options[0].name
                })
                .setDescription(English.commands.play.options[0].description)
                .setDescriptionLocalizations({
                    "pt-BR": Portuguese.commands.play.options[0].description
                })
                .setRequired(true)
                .setAutocomplete(true)),
    options: { inVoiceChannel: true, isPlaying: false, sameVoiceChannel: true, },
    async autoComplete({ interaction }) {
        if(interaction.responded) return
        // const value = interaction.options.getFocused() || 'Music'
        // const videos = await getVideo(value, {
        //     max: 20
        // })
        await interaction.respond([])
    },
    async execute({ interaction, formatMessage, client, language }) {
        const query = interaction.options.getString(English.commands.play.options[0].name, true)
        const res = await client.player.search(query);
        if (!interaction.inCachedGuild()) return console.log('wtf')

        if (res.loadType === "LOAD_FAILED") {
            return interaction.editReply({
                embeds: [sendEmbed(language.play.responses.failed, 'Red')]
            });
        } else if (res.loadType === "NO_MATCHES") {
            return interaction.editReply({
                embeds: [sendEmbed(language.play.responses.matches, 'Yellow')]
            });
        }

        const player = client.player.createPlayer({
            guildId: interaction.guild.id,
            voiceChannelId: interaction.member.voice.channelId as string,
            textChannelId: interaction.channel?.id,
            selfDeaf: true,
            queue: new DefaultQueue()
        });

        player.connect()

        if (res.loadType === 'PLAYLIST_LOADED') {
            for (const track of res.tracks) {
                track.setRequester(interaction.user);
                player.queue.add(track);
            }

            interaction.editReply({
                embeds: [sendEmbed(formatMessage(language.play.responses.playlist, res.playlistInfo.name), 'Green')]
            });

        } else {
            const track = res.tracks[0];
            track.setRequester(interaction.user);
            player.queue.add(track);
            interaction.editReply({
                embeds: [sendEmbed(formatMessage(language.play.responses.song, track.title), 'Green')]
            });
        }

        if (!player.playing) await player.play();

        function sendEmbed(desc: string, color?: ColorResolvable) {
            const embed = new EmbedBuilder()
                .setAuthor({
                    iconURL: client.user?.displayAvatarURL(),
                    name: formatMessage(language.default.defaultEmbedTitle, client.user?.username)
                })
                .setColor(color || 'White')
                .setDescription(desc)
                .setTimestamp()
            return embed;
        }

    },

})