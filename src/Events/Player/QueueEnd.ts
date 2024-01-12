import { PlayerEvents } from "../../Sructures/PlayerEvents";
import { Debug } from "../../Sructures/Debug";
import { Player } from "vulkava";
import { EmbedBuilder, REST } from "discord.js";

const debug = new Debug()

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
                name: `${this.client.user?.displayName} | Sistema de música` || 'undefined'
            })
            .setColor('Yellow')
            .setDescription(`A fila de músicas está vazia, saindo do canal de voz e destruindo o player...`)
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