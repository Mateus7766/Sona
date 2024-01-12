import { Vulkava } from "vulkava";
import { CustomClient } from "./Client";

class Player extends Vulkava {
    constructor(readonly client: CustomClient){
        super({
            nodes: [
                {
                    id: 'First Node',
                    hostname: '127.0.0.1',
                    port: 80,
                    password: 'asuperpassword'
                }
            ], sendWS(guildId, payload) {
                client.guilds.cache.get(guildId)?.shard.send(payload);
            }
        })
    }
}

export {
    Player
}