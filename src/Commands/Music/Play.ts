import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, CommandInteraction, ClientUser, User, ColorResolvable } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { DefaultQueue } from "vulkava";

class PlayCommand extends Command {
    data = new SlashCommandBuilder()
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
                .setRequired(true))
    options = { inVoiceChannel: true, isPlaying: false, sameVoiceChannel: true,};
    async execute(interaction: ChatInputCommandInteraction) {

        const query = interaction.options.getString(English.commands.play.options[0].name, true)
        const res = await this.client.player.search(query);
        if (!interaction.inCachedGuild()) return console.log('wtf')

        if (res.loadType === "LOAD_FAILED") {
            return interaction.editReply({
                embeds: [this.sendEmbed(this.language.play.responses.failed, 'Red')]
            });
        } else if (res.loadType === "NO_MATCHES") {
            return interaction.editReply({
                embeds: [this.sendEmbed(this.language.play.responses.matches, 'Yellow')]
            });
        }

        const player = this.client.player.createPlayer({
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
                embeds: [this.sendEmbed(this.t(this.language.play.responses.playlist, res.playlistInfo.name), 'Green')]
            });

        } else {
            const track = res.tracks[0];
            track.setRequester(interaction.user);
            player.queue.add(track);
            interaction.editReply({
                embeds: [this.sendEmbed(this.t(this.language.play.responses.song, track.title), 'Green')]
            });
        }

        if (!player.playing) await player.play();
    }

    sendEmbed(desc: string, color?: ColorResolvable) {
        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: this.client.user?.displayAvatarURL(),
                name: this.t(this.language.default.defaultEmbedTitle, this.client.user?.username)
            })
            .setColor(color || 'White')
            .setDescription(desc)
            .setTimestamp()
        return embed;
    }
}

export default PlayCommand