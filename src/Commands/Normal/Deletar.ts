import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Guild } from "../../Database/Models/Guild";

class PingCommand extends Command {
    data = new SlashCommandBuilder()
    .setName('deletar')
    .setDescription('faz o fodase')
    async execute(interaction: ChatInputCommandInteraction) {
        if(!interaction.guild) return;
        await interaction.deferReply()
        interaction.followUp("fdp! 💀💀☠️😭")
        const document = await Guild.get(interaction.guild.id)
        if(!document) return interaction.editReply("ESSE DOCUMENTO NEM EXISTE LOL!")
        const guild = await Guild.delete(interaction.guild.id)
        interaction.editReply(`DELETADO NAOOOOOOOOOOOOOOOOOOOOOOOOO`)
    }
}

export default PingCommand