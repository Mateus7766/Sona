import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

class PingCommand extends Command {
    data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Mostra o ping')
    async execute(interaction: ChatInputCommandInteraction) {
        interaction.reply(`🏓 Pong!\n\n🚀 Ping do websocket: \`\`${this.client.ws.ping}ms\`\`\n⌚ Seu comando levou cerca de \`\`${Math.abs((new Date()).getMilliseconds() - interaction.createdAt.getMilliseconds())}ms\`\` para ser respondido`)
    }
}

export default PingCommand