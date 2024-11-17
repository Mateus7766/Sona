import { PlayerEvents } from "../../Sructures/PlayerEvents";
import { Debug } from "../../Sructures/Debug";
import { Player } from "vulkava";
import { EmbedBuilder, REST, TextChannel } from "discord.js";


class QueueEnd extends PlayerEvents {
    name = 'queueEnd'
    async execute(player: Player) {
        await this.client.utils.setVoiceChannelStatus(player, '');


        const guild = this.client.guilds.cache.get(player.guildId)
        if (!guild) return 0;
        this.setLanguage = guild.preferredLocale

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
            if (channel instanceof TextChannel) {
                channel.send({
                    embeds: [embed]
                })
            }
        }
    }
}

export default QueueEnd