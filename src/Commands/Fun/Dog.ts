import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";

class DogCommand extends Command {
    data = new SlashCommandBuilder()
    .setName(English.commands.dog.name)
    .setNameLocalizations({
        "pt-BR": Portuguese.commands.dog.name,
    })
    .setDescription(English.commands.dog.description)
    .setDescriptionLocalizations({
        "pt-BR": Portuguese.commands.dog.description,
    })
    async execute(interaction: ChatInputCommandInteraction) {
        let res = await (await fetch('https://api.thedogapi.com/v1/images/search')).json();
        const embed = new EmbedBuilder()
        .setTitle('🐶')
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

export default DogCommand