import { Command } from "../../Sructures/Command";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { Player } from "vulkava";

export default new Command({
    data: new SlashCommandBuilder()
        .setName(English.commands.stop.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.stop.name
        })
        .setDescription(English.commands.stop.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.stop.description
        }),
    options: { inVoiceChannel: true, isPlaying: true, sameVoiceChannel: true },
    async execute({ interaction, language, client, formatMessage }) {
        if (!interaction.inCachedGuild()) return 0;
        const player = client.player.players.get(interaction.guild.id) as Player;

        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: client.user?.displayAvatarURL(),
                name: formatMessage(language.default.defaultEmbedTitle, client.user?.username)
            })
            .setColor('White')
            .setDescription(language.stop.responses.stop)
            .setTimestamp();

        interaction.editReply({
            embeds: [embed]
        });

        player.destroy();
    }
});
