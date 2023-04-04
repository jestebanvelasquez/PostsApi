import User from '../models/User';
import bcrypt from 'bcrypt';
import JwT from 'jsonwebtoken';
import { MyRequest } from '../interfaces/expressInterface';
import { Response ,NextFunction } from 'express';
import Post from '../models/Post';




export const userController = {
    getProfile: async (req:MyRequest, res:Response, next:NextFunction) => {
        try {
            const {user_id} = req.user_id
            const user =  await User.findById(user_id);
            const post = await Post.findOne({userId: user_id})

            return res.status(200).json({user:user, post:post})
        } catch (error:any) {
            return res.status(400).json({error:error.message})
        }
    },
    getAll: async (req:MyRequest, res:Response, next:NextFunction) => {
        return res.status(200).json({data: await User.find()})
    }

}