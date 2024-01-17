import { Command } from "../../Sructures/Command";
import { SlashCommandBuilder, EmbedBuilder, ApplicationCommand, Locale } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";

export default new Command({
    data: new SlashCommandBuilder()
        .setName(English.commands.help.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.help.name
        })
        .setDescription(English.commands.help.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.help.description
        }),
    options: {
        inVoiceChannel: false,
        isPlaying: false,
        sameVoiceChannel: false
    },
    async execute({ interaction, language, client, formatMessage }) {
        if (!interaction.inCachedGuild()) return;


        let desc = ''
        const _language = interaction.locale == Locale.PortugueseBR ? Locale.PortugueseBR : Locale.EnglishUS
        const guildLanguage = interaction.guild.preferredLocale == Locale.PortugueseBR ? Locale.PortugueseBR : Locale.EnglishUS

        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: client.user?.displayAvatarURL(),
                name: formatMessage(language.help.responses.embedTitle, client.user?.username)
            })
            .setColor('White')
            .addFields({
                name: language.help.responses.fieldTitle,
                value: formatMessage(language.help.responses.fieldValue, client.user?.username,_language, guildLanguage)
            })
            .setTimestamp()

        const commands = await client.application?.commands.fetch() as Map<string, ApplicationCommand> || []

        let i = 0;
        commands.forEach((command) => {
            desc += `${++i}. </${command.name}:${command.id}> - ${eval('language[command.name].description.split("≫")[1]')}\n`
        })
        embed.setDescription(desc)

        await interaction.editReply({
            embeds: [embed]
        })

    }
})