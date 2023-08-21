import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Guild } from "../../Database/Models/Guild";

class PingCommand extends Command {
    data = new SlashCommandBuilder()
    .setName('criar')
    .setDescription('faz o fodase')
    async execute(interaction: ChatInputCommandInteraction) {
        if(!interaction.guild) return;
        await interaction.deferReply()
        interaction.followUp("fdp! 💀💀☠️😭")
        const guild = await Guild.create({
            guildId: interaction.guild.id
        })
        interaction.editReply(`Id da sua guild ☠️☠️☠️☠️ ${guild.guildId}`)
    }
}

export default PingCommand