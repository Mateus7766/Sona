import { Event } from "../Sructures/Event";
import { Events, ChatInputCommandInteraction, BaseInteraction } from "discord.js"
import { Debug } from "../Sructures/Debug";

const debug = new Debug()

class InteractionCreateEvent extends Event {
    name = Events.InteractionCreate
    async execute(interaction: BaseInteraction) {
        if(interaction instanceof ChatInputCommandInteraction){
            const command = this.client.commandsManager.commands.get(interaction.commandName)
            if(!command) return interaction.reply("desculpa, mas eu não sei oque aconteceu.")
            if(interaction.user.id != "792527247566307348") return interaction.reply("é o minino de papai é")
            debug.Log(`O comando "${interaction.commandName}" foi usado por ${interaction.user.tag}.`)
            command.setLanguage = interaction.locale
            command.execute(interaction)
        }
    }
}

export default InteractionCreateEvent