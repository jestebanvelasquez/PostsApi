import { Document,Schema, model } from 'mongoose';
import { PostInterface } from '../interfaces/PostInterface';


const PostSchema: Schema = new Schema({

    userId : {
        type : String,
        require: true
    },
    title: String,
    desc: String,
    image:String,
    publish: String,
    cat:String,
    avaliable: {
        type: Boolean,
        default: true
    }
},
    {timestamps: true, }
)


export default model <PostInterface>('Post', PostSchema)