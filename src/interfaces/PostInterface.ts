import { Document } from "mongoose"

export interface PostInterface extends Document {
    userId:string;
    title: string;
    image:string;
    desc: string;
    cat:string;
    publish: string;
    avaliable: boolean;

}

