import { CustomClient } from "./Client"
import { Debug } from "./Debug"

abstract class PlayerEvents {
    client: CustomClient
    debug = new Debug()
    constructor(client: CustomClient){
        this.client = client

    }
    abstract name: string
    abstract execute(...args: any): any
}

export {
    PlayerEvents
}