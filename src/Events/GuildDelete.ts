import { Event } from "../Sructures/Event";
import { EmbedBuilder, Events, Guild, ChannelType, TextChannel } from "discord.js"
import { Guild as Guilds } from "../Database/Models/Guild";
import { Debug } from "../Sructures/Debug";

const debug = new Debug()

class InteractionCreateEvent extends Event {
    name = Events.GuildDelete
    async execute(guild: Guild) {
        debug.Log(`O Bot foi removido de um servidor: ${guild.name}`)
        const document = await Guilds.get(guild.id)
        if(document){
            await Guilds.delete(guild.id)
            debug.Log(`O servidor foi removido do banco de dados: ${guild.name} [ GuildDelete.ts ]`)
        }
    }
}

export default InteractionCreateEvent