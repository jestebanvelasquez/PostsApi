import { Response, NextFunction } from "express";
import { MyRequest } from "../interfaces/expressInterface";
import joi from "joi";
import Post from '../models/Post';
import { formatDate } from '../utils/formatDate';



const postValidate = joi.object({
    title: joi.string().required(),
    desc: joi.string().required(),
    image:joi.string(),
    cat:joi.string().required()
})

export const postController = {
    create: async ( req:MyRequest, res:Response, next:NextFunction) => {
        try {
            const {user_id} = req.user_id
            const {error, value} = postValidate.validate(req.body)
            
            if (error) return res.status(400).send(error);

            const date = new Date()
            const dateFormat = formatDate(date)

            const post = await Post.create({
                ...value, 
                userId: user_id,
                publish: dateFormat
            })
            const savePost = await post.save()
            const posts = await Post.find()
            return  res.status(200).json({ data: posts })
        } catch (error:any) {
            return res.status(500).json({error:error.message})
        }
    },
    update: async( req:MyRequest, res:Response, next:NextFunction) => {
        try {
            const {user_id} = req.user_id
            const {id} = req.params
            const {title, image, desc, cat} = req.body

            const date = new Date()
            const dateFormat = formatDate(date)

            const post = await Post.findById(id);
            if(post?.userId !== user_id) return res.status(400).json({error: 'No tienes permisos para modificar este campo'})
            const updatePost = await Post.findByIdAndUpdate(
                post?._id,
                {
                    title,
                    image,
                    desc,
                    cat,
                    publish:dateFormat
                },
                {new:true}
            )
            return res.status(200).json({data: updatePost})
        } catch (error:any) {
            return res.status(500).json({error:error.message})
        }
    },
    disable : async( req:MyRequest, res:Response, next:NextFunction)=> {
        try {

            const {user_id} = req.user_id
            const {id} = req.params

            const post = await Post.findById(id)
            if(post?.userId !== user_id) return res.status(400).json({error: 'No tienes permisos para modificar este campo'})

            const disablePost = await Post.findByIdAndUpdate(id, {avaliable: !post?.avaliable})

            return res.status(200).json({data: disablePost})

        } catch (error:any) {
            return res.status(500).json({error:error.message})
        }
    },
    getAlls:async( req:MyRequest, res:Response, next:NextFunction)=>{
        try {
            const posts = await Post.find()
            return res.status(200).json({data:posts})
        } catch (error:any) {
            return res.status(500).json({error:error.message})
        }
    },
    getPostId:async( req:MyRequest, res:Response, next:NextFunction)=>{
        try {
            const {id} = req.params;
            const post = await Post.findById(id)
            return res.status(200).json({data:post})
        } catch (error:any) {
            return res.status(500).json({error:error.message})
        }
    }
}
