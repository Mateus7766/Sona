import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";

export default new Command({
    data: new SlashCommandBuilder()
        .setName(English.commands.ping.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.ping.name,
        })
        .setDescription(English.commands.ping.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.ping.description,
        }),
    async execute({ interaction, client, language, formatMessage }) {
        const embed = new EmbedBuilder()
            .setTitle(language.ping.responses.embedTitle)
            .setThumbnail('https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F933761289824657439.png%3Fv%3D1&w=64&q=75')
            .setColor("Blue")
            .setDescription(formatMessage(language.ping.responses.pingMessage, Math.abs((new Date()).getMilliseconds() - interaction.createdAt.getMilliseconds()), Math.abs(client.ws.ping)))
            .setTimestamp()
            .setFooter({
                text: client.user?.tag as string,
                iconURL: client.user?.displayAvatarURL()
            })
        await interaction.editReply({ embeds: [embed] })
    },
})