import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { Image } from "../../Database/Models/Image";
import fetch from "node-fetch"

class AddDrawingCommand extends Command {
    data = new SlashCommandBuilder()
        .setName(English.commands.adddrawing.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.adddrawing.name
        })
        .setDescription(English.commands.adddrawing.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.adddrawing.description
        })
        .addAttachmentOption(option =>
            option.setName(English.commands.adddrawing.options[0].name)
                .setNameLocalizations({
                    "pt-BR": Portuguese.commands.adddrawing.options[0].name
                })
                .setDescription(English.commands.adddrawing.options[0].description)
                .setDescriptionLocalizations({
                    "pt-BR": Portuguese.commands.adddrawing.options[0].description
                })
                .setRequired(true))
        .addStringOption(option =>
            option.setName(English.commands.adddrawing.options[1].name)
                .setNameLocalizations({
                    "pt-BR": Portuguese.commands.adddrawing.options[1].name
                })
                .setDescription(English.commands.adddrawing.options[1].description)
                .setDescriptionLocalizations({
                    "pt-BR": Portuguese.commands.adddrawing.options[1].description
                })
                .setRequired(true))
        .addStringOption(option =>
            option.setName(English.commands.adddrawing.options[2].name)
                .setNameLocalizations({
                    "pt-BR": Portuguese.commands.adddrawing.options[2].name
                })
                .setDescription(English.commands.adddrawing.options[2].description)
                .setDescriptionLocalizations({
                    "pt-BR": Portuguese.commands.adddrawing.options[2].description
                })
                .setRequired(true))
    async execute(interaction: ChatInputCommandInteraction) {
        if(interaction.user.id != "792527247566307348") return interaction.reply("⛔")
        await interaction.deferReply()
        const attachment = interaction.options.getAttachment(English.commands.adddrawing.options[0].name, true)
        const resposta = interaction.options.getString(English.commands.adddrawing.options[1].name, true)
        const category = interaction.options.getString(English.commands.adddrawing.options[2].name, true)
        await interaction.followUp(this.language.adddrawing.responses.downloading)
        const response = await fetch(attachment.proxyURL)
        const imageBuffer = await response.arrayBuffer()
        const image = await Image.add(resposta, category, Buffer.from(imageBuffer), attachment.name)
        await interaction.editReply({
            content: this.t(this.language.adddrawing.responses.success, image._id),
            files: [Buffer.from(imageBuffer)]
        })
    }
}

export default AddDrawingCommand