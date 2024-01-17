import { Command } from "../../Sructures/Command";
import { Spotify } from 'canvafy';
import {  SlashCommandBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { Player, Track } from 'vulkava';

export default new Command({
    data: new SlashCommandBuilder()
        .setName(English.commands.nowplaying.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.nowplaying.name
        })
        .setDescription(English.commands.nowplaying.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.nowplaying.description
        }),
    options: { inVoiceChannel: true, isPlaying: true, sameVoiceChannel: false },
    async execute({ interaction, client }) {
        if (!interaction.inCachedGuild()) return;

        const player = client.player.players.get(interaction.guildId) as Player;

        const track = player.current as Track;

        const card = await new Spotify()
            .setAuthor(track.author)
            .setImage(track.thumbnail || 'https://prestashop.com/sites/default/files/wysiwyg/404_not_found.png')
            .setTimestamp(player.exactPosition, track.duration)
            .setTitle(track.title)
            .setBlur(15)
            .setOverlayOpacity(0.7)
            .setSpotifyLogo(false)
            .build();

        await interaction.editReply({
            files: [card],
        });
    }
});
