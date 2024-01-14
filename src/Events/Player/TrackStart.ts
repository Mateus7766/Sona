import { PlayerEvents } from "../../Sructures/PlayerEvents";
import { Debug } from "../../Sructures/Debug";
import { Player, Track } from "vulkava";
import { EmbedBuilder, Guild, REST } from "discord.js";

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
        
        const guild = this.client.guilds.cache.get(player.guildId)
        if(!guild) return 0;

        this.setLanguage = guild.preferredLocale

        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: this.client.user?.displayAvatarURL(),
                name: this.t(this.language.default.defaultEmbedTitle, this.client.user?.username)
            })
            .setColor('White')
            .setDescription(this.t(this.language.trackStart.success, track.title))
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