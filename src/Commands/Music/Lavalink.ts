import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { NodeState } from "vulkava";

class LavalinkCommand extends Command {
    data = new SlashCommandBuilder()
        .setName(English.commands.lavalink.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.lavalink.name
        })
        .setDescription(English.commands.lavalink.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.lavalink.name
        })
    options = { inVoiceChannel: false, isPlaying: false, sameVoiceChannel: false }
    async execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.inCachedGuild()) return 0;
        const nodes = this.client.player.nodes
        let desc = ''

        const states = {
            1: 'Online',
            2: 'Offline',
            0: 'Starting'
        }


        for(const node of nodes) {
            const ping = await node.ping()
            desc += `\`\`\`yaml\nNode: ${node.identifier}\nState: ${states[node.state]}\nPlayers: ${node.stats.playingPlayers}\nPing: ${ping}ms\nJVM: ${node.versions?.JVM}\nBuild: ${node.versions?.BUILD}\`\`\``
        }

        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: this.client.user?.displayAvatarURL(),
                name: this.t(this.language.default.defaultEmbedTitle, this.client.user?.username)
            })
            .setColor('White')
            .setDescription(desc)
            .setTimestamp()

        interaction.editReply({
            embeds: [embed]
        })
    }
}

export default LavalinkCommand;