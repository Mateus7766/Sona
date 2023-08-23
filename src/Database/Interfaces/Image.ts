import { Types } from "mongoose"

interface IImage {
    name: string,
    image: Buffer,
    category: string,
    path: string
}

export {
    IImage
}