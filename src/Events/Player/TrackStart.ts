import { PlayerEvents } from "../../Sructures/PlayerEvents";
import { Debug } from "../../Sructures/Debug";
import { Player, Track } from "vulkava";
import { EmbedBuilder, REST } from "discord.js";

const debug = new Debug()

class TrackStart extends PlayerEvents {
    name = 'trackStart'
    async execute(player: Player, track: Track) {

        const rest = new REST()
        .setToken(process.env.TOKEN as string)
        rest.put(`/channels/${player.voiceChannelId}/voice-status`, {
            body: {
                status: `<a:tocando:1195456765362442330> ${track.title}`,
            }
        }).catch(e => {
            console.log(e)
        })
        

        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: this.client.user?.displayAvatarURL(),
                name: `${this.client.user?.displayName} | Sistema de música` || 'undefined'
            })
            .setColor('White')
            .setDescription(`Começando a tocar \`${track.title}\`.`)
            .setTimestamp()

        if (player.textChannelId) {
            const channel = this.client.channels.cache.get(player.textChannelId)
            if (!channel) return 0;
            channel.isTextBased() ? channel.send({
                embeds: [embed]
            }) : null
        }
    }
}

export default TrackStart