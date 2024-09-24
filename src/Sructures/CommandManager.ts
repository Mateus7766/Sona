import { readdirSync } from "fs";
// import { Command } from "./Command";
import { join } from "path";
import { Debug } from "./Debug";
import { REST, Routes, SlashCommandOptionsOnlyBuilder, SlashCommandBuilder } from "discord.js"
import { CustomClient } from "./Client";
import config from "../config";
import { Command } from "./Command";

const debug = new Debug()

class CommandManager {
    commands = new Map<string, Command>()
    protected commandsData = new Array<SlashCommandOptionsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">>()
    constructor(readonly commandsFolder: string, readonly client: CustomClient) {

    }


    async loadCommand() {
        try {
            debug.Alert("Começando a carregar os comandos em barra.")
            const categorys = readdirSync(join(__dirname, '..', this.commandsFolder))
            for (const category of categorys) {
                const commandsName = readdirSync(join(__dirname, '..', this.commandsFolder, category))
                for (const commandName of commandsName) {
                    const { default: command } = await import(join(__dirname, '..', this.commandsFolder, category, commandName))
                    if (command instanceof Command) {
                        this.commands.set(command.data.name, command)
                        this.commandsData.push(command.data)
                        debug.Log(`O comando "${command.data.name}" foi carregado.`)
                    }
                }
            }
        } catch (error) {
            if (error instanceof Error) debug.Error(`Ocorreu um erro ao carregar os comandos em barra. Erro: ${error.stack}`)
        }
    }

    async registryCommands() {
        try {
            debug.Alert('Começando a registrar os comandos em barra na API.')
            const rest = new REST().setToken(config.token);
            const data = await rest.put(
                Routes.applicationCommands(config.clientid),
                { body: this.commandsData },
            ) as any;
            debug.Log(`Foram registrados ${data.length}/${this.commandsData.length} comando(s) em barra na API.`)
        } catch (error) {
            if (error instanceof Error) debug.Error(`Ocorreu um erro ao registrar os comandos na API do Discord. Erro: ${error.stack}`)
        }
    }

}

export {
    CommandManager
}