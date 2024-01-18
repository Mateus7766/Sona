import { Command } from "../../Sructures/Command";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import { musicCard } from "musicard";
import {  SlashCommandBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { Player, Track } from 'vulkava';

dayjs.extend(duration)

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

        const current = dayjs.duration(player.exactPosition).format("DD:HH:mm:ss").split(':').filter(el => el != '00')
        const end = dayjs.duration(track.duration).format("DD:HH:mm:ss").split(':').filter(el => el != '00')
        if(end.length < 2) end.unshift('00')
        if(current.length < 2) current.unshift('00')
        

        const card = await new musicCard()
            .setAuthor(track.author)
            .setThumbnail(track.thumbnail || 'https://prestashop.com/sites/default/files/wysiwyg/404_not_found.png')
            .setColor('auto')
            .setName(track.title)
            .setBrightness(50)
            .setProgress((100*(player.exactPosition || 0)) / track.duration)
            .setStartTime(current.join(':'))
            .setEndTime(end.join(':'))
            .build();

        await interaction.editReply({
            files: [card],
        });
    }
});
