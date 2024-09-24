import { Types } from "mongoose";
import { Track } from "vulkava";

interface IUser extends Document {
    user_id: string,
    last_songs: Track[],
}

export {
    IUser
}