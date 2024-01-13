import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR";
import { English } from "../../Languages/en-US";
import { Player, DefaultQueue } from 'vulkava';

class JoinCommand extends Command {
    data = new SlashCommandBuilder()
        .setName(English.commands.join.name)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.join.name
        })
        .setDescription(English.commands.join.description)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.join.name
        })
    options = { inVoiceChannel: true, isPlaying: false, sameVoiceChannel: false }
    async execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.inCachedGuild()) return 0;


        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: this.client.user?.displayAvatarURL(),
                name: this.t(this.language.default.defaultEmbedTitle, this.client.user?.username)
            })
            .setColor('White')
            .setTimestamp()

        if (interaction.guild.members.me?.voice.channel) {
            const player = this.client.player.players.get(interaction.guildId) as Player
            if (interaction.member.voice.channelId == interaction.guild.members.me.voice.channel.id) {
                embed.setDescription(this.language.join.responses.sameChannel)
            } else if(player) {
                embed.setDescription(this.t(this.language.join.responses.diferentChannel, interaction.guild.members.me.voice.channel, interaction.member.voice.channel))
                player.setVoiceChannel(interaction.member.voice.channelId as string)
                player.pause(true)
                player.pause(false)
            } else {
                embed.setDescription(this.t(this.language.join.responses.noChannel, interaction.member.voice.channel))
                const player = this.client.player.createPlayer({
                    guildId: interaction.guild.id,
                    voiceChannelId: interaction.member.voice.channelId as string,
                    textChannelId: interaction.channel?.id,
                    selfDeaf: true,
                    queue: new DefaultQueue()
                })
                player.connect()
                // player.pause(false)
            }
        } else {
            embed.setDescription(this.t(this.language.join.responses.noChannel, interaction.member.voice.channel))
            const player = this.client.player.createPlayer({
                guildId: interaction.guild.id,
                voiceChannelId: interaction.member.voice.channelId as string,
                textChannelId: interaction.channel?.id,
                selfDeaf: true,
                queue: new DefaultQueue()
            });
            player.connect()
            // player.pause(false)
        }

        await interaction.editReply({
            embeds: [embed]
        })
    }
}

export default JoinCommand;