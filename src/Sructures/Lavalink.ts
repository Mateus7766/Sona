import { Vulkava } from "vulkava";
import { CustomClient } from "./Client";

class Player extends Vulkava {
    constructor(readonly client: CustomClient) {
        super({
            nodes: [
                {
                    id: 'Jogo do tigrinho',
                    hostname: process.env['LAVASERVERHOST1'] as string,
                    port: 443,
                    password: process.env['LAVASERVERPASSWD1'],
                    secure: true,
                    region: 'USA'
                },
                {
                    id: 'Gelo agachando',
                    hostname: process.env['LAVASERVERHOST2'] as string,
                    port: 443,
                    password: process.env['LAVASERVERPASSWD2'],
                    secure: true,
                    region: 'USA'
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