import { PlayerEvents } from "../../Sructures/PlayerEvents";
import { Player, Track } from "vulkava";
import { EmbedBuilder, TextChannel } from "discord.js";

class TrackStart extends PlayerEvents {
    name = 'trackStart'
    async execute(player: Player, track: Track) {

        await this.client.utils.setVoiceChannelStatus(player, `<a:disco:759835872690044988> ${track.title}`);


        const guild = this.client.guilds.cache.get(player.guildId)
        if (!guild) return 0;

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
            if(channel instanceof TextChannel) {
                channel.send({
                    embeds: [embed]
                })
            }
        }
    }
}

export default TrackStart