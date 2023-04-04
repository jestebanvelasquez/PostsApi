import User from "../models/User";
import jwt from "jsonwebtoken";
import { MyRequest } from '../interfaces/expressInterface';
import { NextFunction, Response } from 'express';


export const authorization = {
    token: async (req:MyRequest, res:Response, next:NextFunction) => {
        try {
            
            const headerToken = req.headers.authorization  
           
            if(!headerToken) return res.status(400).json({succes: false, error: 'Token no valido'})
            const token = headerToken.replace('Bearer ', '');

            jwt.verify(token, process.env.SECRET_TOKEN!, (error, decoded) => {
                if(error) return res.status( 400).json({message: error.message, error})
                else{
                    req.user_id = decoded
                    next()
                }
            })
        } catch (error:any) {
            return res.status(400).json({error:error.message})   
        }
    }
}