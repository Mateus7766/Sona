import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

class PingCommand extends Command {
    data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Mostra o ping')
    async execute(interaction: ChatInputCommandInteraction) {
        interaction.reply("Pong! 💀💀☠️😭")
    }
}

export default PingCommand