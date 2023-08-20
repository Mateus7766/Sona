import {
    Events
} from "discord.js"
import { CustomClient } from "./Client"
import { Debug } from "./Debug"

abstract class Event {
    client: CustomClient
    debug = new Debug()
    constructor(client: CustomClient){
        this.client = client
    }
    abstract name: Events
    abstract execute(...args: any): any
}

export {
    Event
}