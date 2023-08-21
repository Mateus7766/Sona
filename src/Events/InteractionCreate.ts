import { Event } from "../Sructures/Event";
import { Events, ChatInputCommandInteraction, BaseInteraction } from "discord.js"

class InteractionCreateEvent extends Event {
    name = Events.InteractionCreate
    async execute(interaction: BaseInteraction) {
        if(interaction instanceof ChatInputCommandInteraction){
            const command = this.client.commandsManager.commands.get(interaction.commandName)
            if(!command) return interaction.reply("desculpa, mas eu não sei oque aconteceu.")
            command.setLanguage = interaction.locale
            command.execute(interaction)
        }
    }
}

export default InteractionCreateEvent