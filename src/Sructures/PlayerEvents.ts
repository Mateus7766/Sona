import { CustomClient } from "./Client"
import { Debug } from "./Debug"
import { Portuguese } from "../Languages/pt-BR";
import { English } from "../Languages/en-US";
import { Language } from "../Database/Interfaces/Guild";

abstract class PlayerEvents {
    client: CustomClient
    debug = new Debug()
    language = Portuguese.events || English.events
    constructor(client: CustomClient) {
        this.client = client
    }
    abstract name: string
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
    PlayerEvents
}