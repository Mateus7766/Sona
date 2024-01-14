import { Event } from "../Sructures/Event";
import { Events, ChatInputCommandInteraction, Message, User } from "discord.js"
import { Debug } from "../Sructures/Debug";

const debug = new Debug()

class MessageCreateEvent extends Event {
    name = Events.MessageCreate
    async execute(msg: Message) {
        if(msg.author.bot || msg.author.system) return 0;
        try {
            if (msg.mentions.has(this.client.user as User) && msg.guild) {
                await msg.reply(`:flag_us: Hi ${msg.author}, I'm ${this.client.user}. To see my commands type \`/\` on chat.\n\n:flag_br: Olá ${msg.author}, Eu sou a ${this.client.user}. Para ver meus comandos digite uma \`/\` no chat.`)
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export default MessageCreateEvent