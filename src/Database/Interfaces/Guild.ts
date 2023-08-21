import { Document, Types } from "mongoose"

enum Language {
    Portuguese = "pt-BR",
    English = "en-US"
}
interface IGuild {
    guildId: string,
}

export {
    IGuild,
    Language
}