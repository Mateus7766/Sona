import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, Message } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { Guild } from "../../Database/Models/Guild";

class RankCommand extends Command {
    data = new SlashCommandBuilder()
    .setName(English.commands.rank.name)
    .setNameLocalizations({
        "pt-BR": Portuguese.commands.rank.name,
    })
    .setDescription(English.commands.rank.description)
    .setDescriptionLocalizations({
        "pt-BR": Portuguese.commands.rank.description,
    })
    async execute(interaction: ChatInputCommandInteraction) {
        const guilds = await Guild.topGuilds()

        let medalhas = ["🥇", "🥈", "🥉"]
        let message = ''

        guilds.forEach(async (data, i) => {
            const guild = this.client.guilds.cache.get(data.guildId)
            message += this.t(this.language.rank.responses.embedDescription, (medalhas[i] || `${i+1}º`) + ` ${guild?.name}`, data.drawingRecord) + "\n"
        })

        const embed = new EmbedBuilder()
        .setTitle(this.language.rank.responses.embedTitle)
        .setThumbnail('https://media.discordapp.net/attachments/1144005725086023720/1144011323609460856/8742-level-10.png')
        .setColor("Blue")
        .setDescription(message)
        .setTimestamp()
        .setFooter({
            text: this.client.user?.tag as string,
            iconURL: this.client.user?.displayAvatarURL()
        })
        interaction.reply({ embeds: [embed] })
    }
}

export default RankCommand