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
            drawingRecord: {
                type: Schema.Types.Number,
                default: 0
            }
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

    async topGuilds(){
        const guilds = await this.model.find({}).sort({
            drawingRecord: -1
        })
        .limit(10)
        return guilds
    }

    async getAll(){
        const guilds = await this.model.find({})
        return guilds
    }

}

export const Guild = new GuildModel()