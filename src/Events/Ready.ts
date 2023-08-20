import { Event } from "../Sructures/Event";
import { Events } from "discord.js"

class ReadyEvent extends Event {
    name = Events.ClientReady
    execute() {
        this.debug.Emphasis(`Logado no Bot: ${this.client.user?.tag}`)
    }
}

export default ReadyEvent