import { Event } from "../Sructures/Event";
import { Events, ChatInputCommandInteraction, BaseInteraction } from "discord.js"
import { Debug } from "../Sructures/Debug";

const debug = new Debug()

class InteractionCreateEvent extends Event {
    name = Events.InteractionCreate
    async execute(interaction: BaseInteraction) {
        if (interaction instanceof ChatInputCommandInteraction) {
            try {
                await interaction.deferReply({ fetchReply: true})
                const command = this.client.commandsManager.commands.get(interaction.commandName)
                if (!command) return interaction.editReply("Desculpa, mas eu não sei oque aconteceu.")
                // if(interaction.user.id != "792527247566307348") return interaction.reply("é o minino de papai é")
                debug.Log(`O comando "${interaction.commandName}" foi usado por ${interaction.user.tag}.`)
                command.setLanguage = interaction.locale
                await command.execute(interaction)
            } catch (e) {
                await interaction.channel?.send(`Um erro aconteceu:\n\`\`\`bash\n${e}\`\`\`A ${this.client.user?.username} está reportando o problema...`)
            }
        }
    }
}

export default InteractionCreateEvent