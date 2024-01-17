import { Command } from "../../Sructures/Command";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { Player } from "vulkava";

export default new Command({
    data: new SlashCommandBuilder()
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
                .setRequired(true)),
    options: { inVoiceChannel: true, isPlaying: true, sameVoiceChannel: true },
    async execute({ interaction, language, client, formatMessage }) {
        if (!interaction.inCachedGuild()) return 0;
        const player = client.player.players.get(interaction.guild.id) as Player;

        let volume = interaction.options.getNumber(English.commands.volume.options[0].name, true);
        if (volume > 100) volume = 100;
        if (volume < 0) volume = 0;

        player.node?.send({
            op: 'volume',
            guildId: player.guildId,
            volume: volume
        });

        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: client.user?.displayAvatarURL(),
                name: formatMessage(language.default.defaultEmbedTitle, client.user?.username)
            })
            .setColor('White')
            .setDescription(formatMessage(language.volume.responses.volume, volume))
            .setTimestamp();

        interaction.editReply({
            embeds: [embed]
        });
    }
});
