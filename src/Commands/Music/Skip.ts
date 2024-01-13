import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { Player } from "vulkava";

class SkipCommand extends Command {
    data = new SlashCommandBuilder()
        .setName(English.commands.skip.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.skip.name
        })
        .setDescription(English.commands.skip.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.skip.description
        })
        .addNumberOption(option =>
            option.setName(English.commands.skip.options[0].name)
                .setNameLocalizations({
                    "pt-BR": Portuguese.commands.skip.options[0].name
                })
                .setDescription(English.commands.skip.options[0].description)
                .setDescriptionLocalizations({
                    "pt-BR": Portuguese.commands.skip.options[0].description
                })
                .setRequired(false))
    options = { inVoiceChannel: true, isPlaying: true, sameVoiceChannel: true };
    async execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.inCachedGuild()) return 0;
        const player = this.client.player.players.get(interaction.guild.id) as Player


        let amount = interaction.options.getNumber(English.commands.skip.options[0].name, false) || 1
        if (amount < 1) amount = 1
        await player.skip(amount)
        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: this.client.user?.displayAvatarURL(),
                name: this.t(this.language.default.defaultEmbedTitle, this.client.user?.username)
            })
            .setColor('White')
            .setDescription(amount > 1 ? this.t(this.language.skip.responses.more, amount) : this.language.skip.responses.less)
            .setTimestamp()

        interaction.editReply({
            embeds: [embed]
        })

    }
}

export default SkipCommand