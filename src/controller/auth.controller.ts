import User from '../models/User';
import bcrypt from 'bcrypt';
import JwT from 'jsonwebtoken';
import { MyRequest } from '../interfaces/expressInterface';
import { Response ,NextFunction } from 'express';
import joi from 'joi';
import { UserInterface } from '../interfaces/UserInterface';




export const authController = {
    register: async (req:MyRequest, res:Response, next:NextFunction) => {
        try {
            
            const { email, password, username, image} = req.body

            const isEmail = await User.findOne({email: email});
            if(isEmail) return res.status(400).json({error: 'ya existe el usuario con ese email'})
            const salt = await bcrypt.genSalt()
            const passHass = await bcrypt.hash(password, salt)

            const user = new User({
                email,
                username,
                image, 
                password: passHass
            });
            const userSave = await user.save()
            const accessToken =  JwT.sign({user_id: userSave._id}, process.env.SECRET_TOKEN!)
            return res.status(200).json({data:userSave, token: accessToken})
        } catch (error:any) {
            return res.status(500).json({error:error.message})
        }
    },
    login: async (req:MyRequest, res:Response, next:NextFunction) => {
        try {
            const {email, password} = req.body;
            if(!email || !password) return res.status(400).json({error: 'credenciales necesarias'})
            const user = await User.findOne({email})
            if(!user) return res.status(400).json({error: 'usuario no existe'})
            const comparePass = await bcrypt.compare(password, user.password);
            if(!comparePass) return res.status(400).json({error: 'credenciales incorrectas'})
            const accessToken = JwT.sign({user_id:user._id}, process.env.SECRET_TOKEN!)
            return res.status( 200).json({data:user, token: accessToken})
        } catch (error:any) {
            return res.status(500).json({error:error.message})
        }
    }
}