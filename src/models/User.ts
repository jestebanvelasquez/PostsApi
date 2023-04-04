import { Schema, model } from "mongoose";
import { UserInterface } from '../interfaces/UserInterface';

const UserSchema : Schema = new Schema({
    username:String,
    image:String,
    email:String,
    password:String
},
    {timestamps: true}
)

export default model<UserInterface>('User', UserSchema);