import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, APIVersion, version } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import os from "os";
import typescript from 'typescript'

class InfoCommand extends Command {
    data = new SlashCommandBuilder()
    .setName(English.commands.info.name)
    .setNameLocalizations({
        "pt-BR": Portuguese.commands.info.name,
    })
    .setDescription(English.commands.info.description)
    .setDescriptionLocalizations({
        "pt-BR": Portuguese.commands.info.description,
    })
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply()
        const embed = new EmbedBuilder()
        .setTitle(this.language.info.responses.embedTitle)
        .setThumbnail(this.client.user?.displayAvatarURL() as string)
        .setColor("Blue")
        .setDescription(this.t(this.language.info.responses.embedDescription, interaction.user, this.client.user?.username))
        .addFields(
            {
                name: this.language.info.responses.fields.os,
                value: `\`\`\`${os.type()}\`\`\``,
                inline: true
            },
            {
                name:  this.language.info.responses.fields.core,
                value: `\`\`\`${os.cpus()[0].model}\`\`\``,
                inline: true
            },
            {
                name:  this.language.info.responses.fields.versionts,
                value: `\`\`\`${typescript.version}\`\`\``,
                inline: true
            },
            {
                name:  this.language.info.responses.fields.versionnode,
                value: `\`\`\`${process.version}\`\`\``,
                inline: true
            },
            {
                name:  this.language.info.responses.fields.versionapi,
                value: `\`\`\`${APIVersion}\`\`\``,
                inline: true
            },
            {
                name:  this.language.info.responses.fields.versionds,
                value: `\`\`\`${version}\`\`\``,
                inline: true
            },
            {
                name:  this.language.info.responses.fields.cmdstotal,
                value: `\`\`\`${this.client.commandsManager.commands.size.toString()}\`\`\``,
                inline: true
            }, {
                name: this.language.info.responses.fields.src,
                value: `\`\`\`https://github.com/VOTRON157/sona\`\`\``,
                inline: true
            }
        )        
        .setTimestamp()
        .setFooter({
            text: this.client.user?.tag as string,
            iconURL: this.client.user?.displayAvatarURL()
        })
        await interaction.editReply({ embeds: [embed] })
    }
}

export default InfoCommand