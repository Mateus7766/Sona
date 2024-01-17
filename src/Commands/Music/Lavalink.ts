import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";


export default new Command({
    data: new SlashCommandBuilder()
        .setName(English.commands.lavalink.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.lavalink.name
        })
        .setDescription(English.commands.lavalink.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.lavalink.description
        }),
    options: {
        inVoiceChannel: false,
        isPlaying: false,
        sameVoiceChannel: false
    },
    async execute({ client, interaction, formatMessage, language }) {
        if (!interaction.inCachedGuild()) return;
        const nodes = client.player.nodes
        let desc = ''

        const states = {
            1: 'Online',
            2: 'Offline',
            0: 'Starting'
        }


        for (const node of nodes) {
            const ping = await node.ping()
            desc += `\`\`\`yaml\nNode: ${node.identifier}\nState: ${states[node.state]}\nPlayers: ${node.stats.playingPlayers}\nPing: ${ping}ms\nJVM: ${node.versions?.JVM}\nBuild: ${node.versions?.BUILD}\nRegion: ${node.options.region}\`\`\``
        }

        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: client.user?.displayAvatarURL(),
                name: formatMessage(language.default.defaultEmbedTitle, client.user?.username)
            })
            .setColor('White')
            .setDescription(desc)
            .setTimestamp()

        interaction.editReply({
            embeds: [embed]
        })
    },
})