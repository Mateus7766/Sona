import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { Player } from "vulkava";

class VolumeCommand extends Command {
    data = new SlashCommandBuilder()
        .setName(English.commands.volume.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.volume.name
        })
        .setDescription(English.commands.volume.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.volume.description
        })
        .addNumberOption(option =>
            option.setName(English.commands.volume.options[0].name)
                .setNameLocalizations({
                    "pt-BR": Portuguese.commands.volume.options[0].name
                })
                .setDescription(English.commands.volume.options[0].description)
                .setDescriptionLocalizations({
                    "pt-BR": Portuguese.commands.volume.options[0].description
                })
                .setRequired(true))
    options = { inVoiceChannel: true, isPlaying: true, sameVoiceChannel: true };
    async execute(interaction: ChatInputCommandInteraction<any>) {
        if (!interaction.inCachedGuild()) return 0;
        const player = this.client.player.players.get(interaction.guild.id) as Player


        let volume = interaction.options.getNumber(English.commands.volume.options[0].name, true)
        if (volume > 100) volume = 100
        if (volume < 0) volume = 0

        player.node?.send({
            op: 'volume',
            guildId: player.guildId,
            volume: volume
        })

        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: this.client.user?.displayAvatarURL(),
                name: this.t(this.language.default.defaultEmbedTitle, this.client.user?.username)
            })
            .setColor('White')
            .setDescription(this.t(this.language.volume.responses.volume, volume))
            .setTimestamp()

        interaction.editReply({
            embeds: [embed]
        })

    }
}

export default VolumeCommand