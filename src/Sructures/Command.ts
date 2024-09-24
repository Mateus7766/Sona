import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder} from "discord.js";
import { English } from "../Languages/en-US";
import { Portuguese } from "../Languages/pt-BR";
import { CustomClient } from "./Client";

interface AutoCompleteOptions {
    interaction: AutocompleteInteraction,
    language: typeof English.commands | typeof Portuguese.commands
    client: CustomClient
    formatMessage: (message: string, ...args: any[]) => string
}

interface ExecuteOptions {
    interaction: ChatInputCommandInteraction
    language: typeof English.commands | typeof Portuguese.commands
    client: CustomClient
    formatMessage: (message: string, ...args: any[]) => string
}

interface CommandData {
    data: SlashCommandOptionsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    autoComplete?(data: AutoCompleteOptions): Promise<any>
    execute: (data: ExecuteOptions) => Promise<any>
    options?: {
        inVoiceChannel: boolean,
        isPlaying: boolean,
        sameVoiceChannel: boolean,
    }
}

class Command {
    data: SlashCommandOptionsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    execute: (data: ExecuteOptions) => Promise<any>
    autoComplete?: (data: AutoCompleteOptions) => Promise<any>
    options?: {
        inVoiceChannel: boolean,
        isPlaying: boolean,
        sameVoiceChannel: boolean,
    }
    constructor(_data: CommandData) {
        this.data = _data.data
        this.autoComplete = _data.autoComplete
        this.execute = _data.execute
        this.options = _data.options
    }

    formatMessage(message: string, ...args: any[]): string {
        for (const argument of args) {
            message = message.replace("{{}}", argument);
        }
        return message;
    }
}

export {
    Command
}