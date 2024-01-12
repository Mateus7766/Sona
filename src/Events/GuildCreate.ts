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
        .setDescription("🇧🇷 Obrigado por adicionar-me no seu servidor! Lembre-se que meus comandos funcionam apenas através dos slash commands (comandos em barra), se os comandos não aparecerem automaticamente em seu servidor, trate de me adicionar novamente com essa permisão!\n\n🇺🇸 Thanks for adding me to your server! Remember that my commands only work through slash commands, if the commands do not appear automatically on your server, try adding me again with this permission!")
        .addFields({
            name: 'Use this link to add me / Use esse link para me adicionar',
            value: '[Clique aqui](https://discord.com/api/oauth2/authorize?client_id=1142875508175015977&permissions=8&scope=bot+applications.commands)\n\n🇧🇷 Esse link já me adiciona com as permisões corretas\n🇺🇸 This link add me with correct permissions.\n\n[Github](https://github.com/VOTRON157/Sona)'
        })
        .setImage('https://cdn.discordapp.com/attachments/1142875125063110759/1195230562806407258/Earth_A_very_simple_Discord_bot.gif')
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