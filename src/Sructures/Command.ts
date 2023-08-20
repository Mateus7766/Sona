import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { CustomClient } from "./Client"

abstract class Command {
    client: CustomClient
    constructor(client: CustomClient){
        this.client = client
    }
    abstract readonly data: SlashCommandBuilder
    abstract execute(interaction: ChatInputCommandInteraction): void
}

export {
    Command
}