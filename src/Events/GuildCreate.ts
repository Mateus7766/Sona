import { Event } from "../Sructures/Event";
import { EmbedBuilder, Events, Guild, ChannelType, TextChannel } from "discord.js"
import { Guild as Guilds } from "../Database/Models/Guild";
import { Debug } from "../Sructures/Debug";

const debug = new Debug()

class InteractionCreateEvent extends Event {
    name = Events.GuildCreate
    async execute(guild: Guild) {
        debug.Log(`O Bot foi adicionado em um novo servidor: ${guild.name}`)

        await Guilds.create({
            drawingRecord: 0,
            guildId: guild.id
        })

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription("🇧🇷 Obrigado por adicionar a Sona no seu servidor! 💞\n🇺🇸 Thanks for adding Sona to your server! 💞")
        .setTimestamp()
        .setFooter({
            text: this.client.user?.tag as string,
            iconURL: this.client.user?.displayAvatarURL()
        })

        const channel = guild.channels.cache.filter(ch => ch.type == ChannelType.GuildText).first()
        if(channel instanceof TextChannel){
            channel.send({
                embeds: [embed]
            })
        }
    }
}

export default InteractionCreateEvent