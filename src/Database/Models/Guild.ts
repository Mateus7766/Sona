import { Schema, model, Model, HydratedDocument } from 'mongoose';
import { IGuild } from '../Interfaces/Guild';

class GuildModel {
    schema: Schema
    model: Model<IGuild>
    constructor(){
        this.schema = new Schema<IGuild>({
            guildId: {
                type: Schema.Types.String,
                required: true,
                unique: true
            },
        })
        this.model = model<IGuild>("Guild", this.schema)
    }

    async create(data: IGuild){
        const guild = new this.model({
            ...data
        })
        await guild.save()
        return guild
    }

    async delete(guildId: string){
        const guild = await this.model.deleteOne({
            guildId
        })
        return guild
    }

    async get(guildId: string){
        const guild = await this.model.findOne({
            guildId,
        })
        return guild
    }
}

export const Guild = new GuildModel()