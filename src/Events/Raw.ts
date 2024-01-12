import { Event } from "../Sructures/Event";
import { Events } from "discord.js"
import { Debug } from "../Sructures/Debug";

const debug = new Debug()

class Raw extends Event {
    name = Events.Raw
    async execute(packet: any) {
        this.client.player.handleVoiceUpdate(packet)
    }
}

export default Raw