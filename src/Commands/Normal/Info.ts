import { Command } from "../../Sructures/Command";
import { SlashCommandBuilder, EmbedBuilder, APIVersion, version } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import os from "os";
import typescript from 'typescript';

export default new Command({
    data: new SlashCommandBuilder()
        .setName(English.commands.info.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.info.name,
        })
        .setDescription(English.commands.info.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.info.description,
        }),
    async execute({ interaction, language, client, formatMessage }) {
        const embed = new EmbedBuilder()
            .setTitle(language.info.responses.embedTitle)
            .setThumbnail(client.user?.displayAvatarURL() as string)
            .setColor("Blue")
            .setDescription(formatMessage(language.info.responses.embedDescription, interaction.user, client.user?.username))
            .addFields(
                {
                    name: language.info.responses.fields.os,
                    value: `\`\`\`${os.type()}\`\`\``,
                    inline: true
                },
                {
                    name: language.info.responses.fields.core,
                    value: `\`\`\`${os.cpus()[0].model}\`\`\``,
                    inline: true
                },
                {
                    name: language.info.responses.fields.versionts,
                    value: `\`\`\`${typescript.version}\`\`\``,
                    inline: true
                },
                {
                    name: language.info.responses.fields.versionnode,
                    value: `\`\`\`${process.version}\`\`\``,
                    inline: true
                },
                {
                    name: language.info.responses.fields.versionapi,
                    value: `\`\`\`${APIVersion}\`\`\``,
                    inline: true
                },
                {
                    name: language.info.responses.fields.versionds,
                    value: `\`\`\`${version}\`\`\``,
                    inline: true
                },
                {
                    name: language.info.responses.fields.cmdstotal,
                    value: `\`\`\`${client.commandsManager.commands.size.toString()}\`\`\``,
                    inline: true
                },
                {
                    name: language.info.responses.fields.src,
                    value: `\`\`\`https://github.com/VOTRON157/sona\`\`\``,
                    inline: true
                }
            )
            .setTimestamp()
            .setFooter({
                text: client.user?.tag as string,
                iconURL: client.user?.displayAvatarURL()
            });

        await interaction.editReply({ embeds: [embed] });
    }
});
