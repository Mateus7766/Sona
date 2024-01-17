import { Command } from "../../Sructures/Command";
import { SlashCommandBuilder, EmbedBuilder, ColorResolvable } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { DefaultQueue } from "vulkava";
import { getPlaylist } from 'ytubes'

export default new Command({
    data: new SlashCommandBuilder()
        .setName(English.commands.playlist.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.playlist.name
        })
        .setDescription(English.commands.playlist.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.playlist.description
        })
        .addStringOption(option =>
            option.setName(English.commands.playlist.options[0].name)
                .setNameLocalizations({
                    "pt-BR": Portuguese.commands.playlist.options[0].name
                })
                .setDescription(English.commands.playlist.options[0].description)
                .setDescriptionLocalizations({
                    "pt-BR": Portuguese.commands.playlist.options[0].description
                })
                .setAutocomplete(true)
                .setRequired(true)),
    options: { inVoiceChannel: true, isPlaying: false, sameVoiceChannel: true },
    async autoComplete({ interaction }) {
        const value = (interaction.options.getFocused() || 'Music ')
        const videos = await getPlaylist(value, {
            max: 20
        })
        await interaction.respond(videos.map((playlist,i) => ({ name: `[${++i}] ${playlist.title} [${playlist.videoCount} tracks]`.slice(0, 98), value: playlist.link })))
    },
    async execute({ interaction, language, client, formatMessage }) {
        const query = interaction.options.getString(English.commands.playlist.options[0].name, true);
        const res = await client.player.search(query);

        if (!interaction.inCachedGuild()) return console.log('wtf');

        if (res.loadType === "LOAD_FAILED") {
            return interaction.editReply({
                embeds: [sendEmbed(formatMessage(language.playlist.responses.failed), 'Red')]
            });
        } else if (res.loadType === "NO_MATCHES") {
            return interaction.editReply({
                embeds: [sendEmbed(formatMessage(language.playlist.responses.matches), 'Yellow')]
            });
        }

        const player = client.player.createPlayer({
            guildId: interaction.guild.id,
            voiceChannelId: interaction.member.voice.channelId as string,
            textChannelId: interaction.channel?.id,
            selfDeaf: true,
            queue: new DefaultQueue()
        });

        player.connect();

        for (const track of res.tracks) {
            track.setRequester(interaction.user);
            player.queue.add(track);
        }

        interaction.editReply({
            embeds: [sendEmbed(formatMessage(language.playlist.responses.playlist, res.tracks.length), 'Green')]
        });

        if (!player.playing) await player.play();

        function sendEmbed(desc: string, color?: ColorResolvable) {
            const embed = new EmbedBuilder()
                .setAuthor({
                    iconURL: client.user?.displayAvatarURL(),
                    name: formatMessage(language.default.defaultEmbedTitle, client.user?.username)
                })
                .setColor(color || 'White')
                .setDescription(desc)
                .setTimestamp();
            return embed;
        }
    }
});
