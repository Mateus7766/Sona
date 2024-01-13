import { Command } from "../../Sructures/Command";
import { Spotify } from 'canvafy'
import { ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { Player, Track } from 'vulkava';

class PauseCommand extends Command {
    data = new SlashCommandBuilder()
        .setName(English.commands.nowplaying.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.nowplaying.name
        })
        .setDescription(English.commands.nowplaying.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.nowplaying.description
        })
    options = { inVoiceChannel: true, isPlaying: true, sameVoiceChannel: false }
    async execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.inCachedGuild()) return 0;

        const player = this.client.player.players.get(interaction.guildId) as Player
       
        const track = player.current as Track

        const card = await new Spotify()
        .setAuthor(track.author)
        .setImage(track.thumbnail || 'https://prestashop.com/sites/default/files/wysiwyg/404_not_found.png')
        .setTimestamp(player.exactPosition, track.duration)
        .setTitle(track.title)
        .setBlur(15)
        .setOverlayOpacity(0.7)
        .setSpotifyLogo(false)
        .build()

        await interaction.editReply({
            files: [card],
        })
    }
}

export default PauseCommand;