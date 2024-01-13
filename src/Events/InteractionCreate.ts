import { Event } from "../Sructures/Event";
import { Events, ChatInputCommandInteraction, BaseInteraction, EmbedBuilder, ColorResolvable, ChannelType } from "discord.js"
import { Debug } from "../Sructures/Debug";

const debug = new Debug()

class InteractionCreateEvent extends Event {
    name = Events.InteractionCreate
    async execute(interaction: BaseInteraction) {
        if (interaction instanceof ChatInputCommandInteraction) {
            try {
                await interaction.deferReply({ fetchReply: true })
                if (!interaction.inCachedGuild()) await interaction.editReply('Desculpa, não era pra isso acontecer :(')
                const command = this.client.commandsManager.commands.get(interaction.commandName)
                if (!command) return interaction.editReply("Desculpa, mas eu não sei oque aconteceu.")
                debug.Log(`O comando "${interaction.commandName}" foi usado por ${interaction.user.tag}.`)
                command.setLanguage = interaction.locale
                if (command.options) {
                    const player = this.client.player.players.get(interaction.guildId)
                  
                    if (command.options.inVoiceChannel && !interaction.member.voice.channelId) {
                        return interaction.followUp({
                            embeds: [this.sendEmbed(command.language.default.inVoiceChannel, 'Red', command.t(command.language.default.defaultEmbedTitle, this.client.user?.username))]
                        })
                    }

                    if (command.options.isPlaying && !player) {
                        return interaction.followUp({
                            embeds: [this.sendEmbed(command.language.default.isPlaying, 'Yellow', command.t(command.language.default.defaultEmbedTitle, this.client.user?.username))]
                        })
                    }

                    if (command.options.sameVoiceChannel && player && this.client.channels.cache.get(player.voiceChannelId)?.id != interaction.member.voice.channel?.id) {
                        return interaction.followUp({
                            embeds: [this.sendEmbed(command.language.default.sameVoiceChannel, 'Red', command.t(command.language.default.defaultEmbedTitle, this.client.user?.username))]
                        })
                    }

                    if(interaction.member.voice.channel?.type != ChannelType.GuildVoice) {
                        return interaction.followUp({
                            embeds: [this.sendEmbed(command.language.default.stageChannel, 'Red', command.t(command.language.default.defaultEmbedTitle, this.client.user?.username))]
                        })
                    }
                }

                await command.execute(interaction)
            } catch (e) {
                await interaction.channel?.send(`Um erro aconteceu:\n\`\`\`bash\n${e}\`\`\`A ${this.client.user?.username} está reportando o problema...`)
            }
        }
    }

    sendEmbed(desc: string, color: ColorResolvable, title: string) {
        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: this.client.user?.displayAvatarURL(),
                name: title
            })
            .setColor(color)
            .setDescription(desc)
            .setTimestamp()
        return embed;
    }
}

export default InteractionCreateEvent