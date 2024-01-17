import { Command } from "../../Sructures/Command";
import {  SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { Player } from "vulkava";

export default new Command({
    data: new SlashCommandBuilder()
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
                .setRequired(false)),
    options: { inVoiceChannel: true, isPlaying: true, sameVoiceChannel: true },
    async execute({ interaction, language, client, formatMessage }) {
        if (!interaction.inCachedGuild()) return 0;
        const player = client.player.players.get(interaction.guild.id) as Player;

        let amount = interaction.options.getNumber(English.commands.skip.options[0].name, false) || 1;
        if (amount < 1) amount = 1;
        await player.skip(amount);

        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: client.user?.displayAvatarURL(),
                name: formatMessage(language.default.defaultEmbedTitle, client.user?.username)
            })
            .setColor('White')
            .setDescription(amount > 1 ? formatMessage(language.skip.responses.more, amount) : language.skip.responses.less)
            .setTimestamp();

        interaction.editReply({
            embeds: [embed]
        });
    }
});
