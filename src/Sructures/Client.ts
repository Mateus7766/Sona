import { Client, ClientOptions, GatewayIntentBits } from "discord.js"
import { CommandManager } from "./CommandManager"
import { Utils } from "./Utils"
import { EventsManager } from "./EventsManager"

class CustomClient extends Client {
    commandsManager: CommandManager
    eventsManager: EventsManager
    utils = new Utils()
    constructor(
        options: ClientOptions
    ){
        super(options)
        this.commandsManager = new CommandManager("Commands", this)
        this.eventsManager = new EventsManager("Events", this)
    }
    async init(token?: string) {
        await this.commandsManager.loadCommand()
        await this.commandsManager.registryCommands()
        await this.eventsManager.loadEvents()
        super.login(token)
    }
}

const client = new CustomClient({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.init(process.env["TOKEN"])


export {
    CustomClient
}