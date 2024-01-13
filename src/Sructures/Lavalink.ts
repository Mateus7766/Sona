import { Vulkava } from "vulkava";
import { CustomClient } from "./Client";

class Player extends Vulkava {
    constructor(readonly client: CustomClient){
        super({
            nodes: [
                {
                    id: 'Jogo do tigrinho',
                    hostname: '3d5a209a-c0f1-4161-af42-d57fbf69095e-00-e9tb3hcc1wig.kirk.replit.dev',
                    port: 443,
                    password: process.env['LAVASERVERPASSWD1'],
                    secure: true
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