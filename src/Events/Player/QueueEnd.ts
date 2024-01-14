import { PlayerEvents } from "../../Sructures/PlayerEvents";
import { Debug } from "../../Sructures/Debug";
import { Player } from "vulkava";
import { EmbedBuilder, REST } from "discord.js";


class QueueEnd extends PlayerEvents {
    name = 'queueEnd'
    async execute(player: Player) {

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
            .setColor('Yellow')
            .setDescription(this.language.queueEnd.success)
            .setTimestamp()

            player.destroy()

        if (player.textChannelId) {
            const channel = this.client.channels.cache.get(player.textChannelId)
            if (!channel) return 0;
            channel.isTextBased() ? channel.send({
                embeds: [embed]
            }) : null
        }
    }
}

export default QueueEnd