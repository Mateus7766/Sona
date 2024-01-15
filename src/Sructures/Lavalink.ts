import { Vulkava } from "vulkava";
import { CustomClient } from "./Client";
import config from "../config";

class Player extends Vulkava {
    constructor(readonly client: CustomClient) {
        super({
            nodes: [
                {
                    id: 'Produtos do renato cariani',
                    hostname: config.lava_host1,
                    port: 443,
                    password: config.lava_password1,
                    secure: true,
                    region: 'USA'
                },
                {
                    id: 'Jogo do tigrinho',
                    hostname: config.lava_host2,
                    port: 443,
                    password: config.lava_password2,
                    secure: true,
                    region: 'USA'
                },
            ], sendWS(guildId, payload) {
                client.guilds.cache.get(guildId)?.shard.send(payload);
            },
            spotify: {
                clientId: config.spotifyId,
                clientSecret: config.spotifySecret,
                market: 'BR'
            }
        })
    }
}

export {
    Player
}