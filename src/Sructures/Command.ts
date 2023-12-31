import { ChatInputCommandInteraction, SlashCommandBuilder, Locale } from "discord.js"
import { CustomClient } from "./Client"
import { Language } from "../Database/Interfaces/Guild"
import { Portuguese } from "../Languages/pt-BR"
import { English } from "../Languages/en-US"

abstract class Command {
    client: CustomClient
    language = Portuguese.commands || English.commands
    constructor(client: CustomClient) {
        this.client = client
    }
    abstract readonly data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    abstract execute(interaction: ChatInputCommandInteraction): Promise<any>

    set setLanguage(language: any) {

        const langObj = {
            "pt-BR": Portuguese,
            "en-US": English
        }

        if (Object.keys(langObj).includes(language)) {
            this.language = langObj[language as Language].commands
        } else this.language = langObj["en-US"].commands
    }

    t(message: string, ...args: any[]) {
        for (let text of args) {
            message = message.replace("{{}}", text)
        }
        return message
    }
}

export {
    Command
}