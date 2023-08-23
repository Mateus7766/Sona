import { Schema, model, Model } from 'mongoose';
import { IImage } from '../Interfaces/Image';

class ImageModel {
    schema: Schema
    model: Model<IImage>
    constructor() {
        this.schema = new Schema<IImage>({
            name: {
                type: Schema.Types.String,
                required: true,
            },
            image: {
                type: Buffer,
                required: true
            },
            category: {
                type: Schema.Types.String,
                required: true
            },
            path: {
                type: Schema.Types.String,
                required: true
            }
        })
        this.model = model<IImage>("Image", this.schema)
    }
    async add(imageName: string, imageCategory: string, binary: Buffer, path: string) {
        const image = new this.model({
            name: imageName,
            category: imageCategory,
            image: binary, path
        })
        await image.save()
        return image
    }

    async randomImage(category: string, usedImages: Set<any>) {
        let images = await this.model.find({})
        images = images.filter(image => !usedImages.has(image._id.toString()))
        const image = images[Math.floor(Math.random() * images.length)]
        return image
    }
}

export const Image = new ImageModel()