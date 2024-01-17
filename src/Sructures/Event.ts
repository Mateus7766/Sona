import {
    Events
} from "discord.js"
import { CustomClient } from "./Client"
import { Debug } from "./Debug"
import { Portuguese } from "../Languages/pt-BR"
import { English } from "../Languages/en-US"
import { Language } from "../Database/Interfaces/Guild"
abstract class Event {
    language = Portuguese.events || English.events
    client: CustomClient
    debug = new Debug()
    constructor(client: CustomClient) {
        this.client = client
    }
    abstract name: Events
    abstract execute(...args: any): any

    set setLanguage(language: any) {
        const langObj = {
            "pt-BR": Portuguese,
            "en-US": English
        }

        if (Object.keys(langObj).includes(language)) {
            this.language = langObj[language as Language].events
        } else this.language = langObj["en-US"].events
    }

    t(message: string, ...args: any[]) {
        for (let text of args) {
            message = message.replace("{{}}", text)
        }
        return message
    }
}

export {
    Event
}