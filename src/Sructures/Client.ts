import { Client, ClientOptions, GatewayIntentBits } from "discord.js"
import { CommandManager } from "./CommandManager"
import { Utils } from "./Utils"
import { EventsManager } from "./EventsManager"
import { Player } from "./Lavalink"
import config from "../config"

class CustomClient extends Client {
    commandsManager: CommandManager
    eventsManager: EventsManager
    player = new Player(this)
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
        await this.eventsManager.loadClientEvents()
        // await client.utils.getSpotifyToken()
        super.login(token)
    }
}

const client = new CustomClient({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });
client.init(config.token)


export {
    CustomClient,
    client
}