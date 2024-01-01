import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";

class CatCommand extends Command {
    data = new SlashCommandBuilder()
    .setName(English.commands.cat.name)
    .setNameLocalizations({
        "pt-BR": Portuguese.commands.cat.name,
    })
    .setDescription(English.commands.cat.description)
    .setDescriptionLocalizations({
        "pt-BR": Portuguese.commands.cat.description,
    })
    async execute(interaction: ChatInputCommandInteraction) {
        let res = await (await fetch('https://api.thecatapi.com/v1/images/search')).json();
        const embed = new EmbedBuilder()
        .setTitle('🐱')
        .setColor("Blue")
        .setImage(res[0].url)  
        .setTimestamp()
        .setFooter({
            text: this.client.user?.tag as string,
            iconURL: this.client.user?.displayAvatarURL()
        })
        await interaction.editReply({ embeds: [embed] })
    }
}

export default CatCommand