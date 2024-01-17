import { Event } from "../Sructures/Event";
import { ApplicationCommand, Events, Message, User } from "discord.js"
import { Debug } from "../Sructures/Debug";

const messagesList: Message[] = []
class MessageCreateEvent extends Event {
    name = Events.MessageCreate
    async execute(msg: Message) {
        if(!msg.inGuild()) return;

        this.setLanguage = msg.guild.preferredLocale

        if(msg.author.id == this.client.user?.id) {
            setTimeout(() => {
                if(msg.deletable) msg.delete().catch(e => {
                    console.log('Não consegui apagar a mensagem.')
                })
            }, 120 * 1000)
        }
        if(msg.author.bot || msg.author.system) return 0;
        try {
            if (msg.mentions.has(this.client.user as User) && msg.guild) {
                const command = await this.client.application?.commands.fetch() as Map<string, ApplicationCommand> || []
                const values = Array.from(command.values())
                const _command = values.find(value => value.name == 'help')
                
                
                await msg.reply(this.t(this.language.messageCreate.mention, msg.author, this.client.user, _command ? `</${_command.name}:${_command.id}>` : '/help'))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export default MessageCreateEvent