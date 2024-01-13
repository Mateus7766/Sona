import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, REST } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { Player} from "vulkava";

class StopCommand extends Command {
    data = new SlashCommandBuilder()
        .setName(English.commands.stop.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.stop.name
        })
        .setDescription(English.commands.stop.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.stop.description
        })
    options = { inVoiceChannel: true, isPlaying: true, sameVoiceChannel: true, };
    async execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.inCachedGuild()) return 0;
        const player = this.client.player.players.get(interaction.guild.id) as Player

        const rest = new REST()
        .setToken(process.env.TOKEN as string)
        rest.put(`/channels/${player.voiceChannelId}/voice-status`, {
            body: {
                status: ``,
            }
        }).catch(e => {
            console.log(e)
        })

        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: this.client.user?.displayAvatarURL(),
                name: this.t(this.language.default.defaultEmbedTitle, this.client.user?.username)
            })
            .setColor('White')
            .setDescription(this.language.stop.responses.stop)
            .setTimestamp()

            interaction.editReply({
                embeds: [embed]
            })

        player.destroy()

    }
}

export default StopCommand